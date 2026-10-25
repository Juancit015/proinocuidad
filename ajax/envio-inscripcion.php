<?php
/**
 * Endpoint único de inscripción: puerta de entrada del formulario de las
 * 8 fichas. Valida y limita en el servidor ANTES de reenviar a FormSubmit,
 * que sigue siendo quien entrega el correo con el voucher adjunto.
 *
 * Flujo: honeypot → control de POST vacío (post_max_size) → voucher
 * (MIME real + peso + extensión) → campos → reservar cupo por IP y
 * dedup DNI+curso (bajo lock, ANTES del cURL; se liberan si FormSubmit
 * falla) → reenvío a FormSubmit (cURL multipart).
 *
 * Estado: ficheros JSON en ~/datos-formularios/ (fuera del docroot),
 * escrituras atómicas con rename. Cada fichero .lock se toca desde UN
 * solo punto (registrar READ+WRITE con el flock sostenido): un flock
 * anidado al mismo .lock se auto-bloquea (flock es por open-file-
 * description) — por eso existe mapa_escribir() sin lock.
 *
 * IP: SOLO REMOTE_ADDR. X-Forwarded-For NO se mira (el cliente la
 * controla y anularía el rate limit). Cloudflare-Connecting-IP se usa
 * únicamente cuando REMOTE_ADDR pertenece a los rangos de Cloudflare:
 * hoy no aplica (el dominio resuelve directo al hosting, sin CF delante;
 * la rama queda declarativa para si algún día se pone CF).
 */
declare(strict_types=1);

date_default_timezone_set('America/Lima');

// URL de entrega. El override por entorno es SOLO para los arneses de
// prueba (apuntar a un mock local evita correos reales); en producción
// la variable no existe y queda la URL real.
define('FORMSUBMIT_URL', getenv('FORMSUBMIT_URL_OVERRIDE') ?: 'https://formsubmit.co/ajax/formacion_academica@proinocuidad.com');
const MAX_RAFAGA       = 3;      // envíos por IP
const VENTANA_RAFAGA   = 600;    // ... cada 600 segundos
const MAX_DIA          = 10;     // envíos por IP por día natural de Lima
const MAX_PESO         = 5242880; // 5 MB en bytes
const EDAD_LIMPIEZA    = 172800;  // 2 días: limpieza de contadores viejos
const RETENCION_DEDUP  = 86400;   // 24 h: pasado esto, mismo DNI+curso puede reenviar

// Campos que se reenvían a FormSubmit (lista cerrada). Es la lista de
// name de tools/generar-fichas.mjs; todo lo demás (_cc, _next,
// razon_social, ruc, extra inyectados…) se descarta.
const CAMPOS_PERMITIDOS = array(
    'nombre', 'dni', 'empresa', 'cargo', 'celular', 'correo', 'pais', 'curso',
    '_subject', '_template', '_captcha',
    // bloque comprobante de pago y aceptación (name reales del form)
    'desea_comprobante', 'tipo_comprobante', 'ruc', 'razon_social', 'conformidad',
);

$datos_dir = getenv('DATOS_FORMULARIO_DIR') ?: dirname(__DIR__, 2) . '/datos-formularios';
if (!is_dir($datos_dir)) @mkdir($datos_dir, 0755, true); // único estado mutable del sitio

/* ---------- respuesta ---------- */

$quiere_json = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

function responder(bool $exito, string $mensaje, int $codigo, bool $json): void {
    http_response_code($codigo);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('success' => $exito ? 'true' : 'false', 'message' => $mensaje), JSON_UNESCAPED_UNICODE);
        return;
    }
    header('Content-Type: text/html; charset=utf-8');
    $r = $exito ? 'exito' : 'error';
    $icono = $exito ? '✓' : '✕';
    echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inscripción</title></head><body><p class="resultado" data-resultado="' . $r . '">' . $icono . ' <span class="mensaje">' . htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8') . '</span></p></body></html>';
}

/* ---------- estado: ficheros JSON; UN lock por fichero ---------- */

function mapa_cargar(string $fich): array {
    if (!is_file($fich)) return array();
    $c = file_get_contents($fich);
    $d = json_decode((string)$c, true);
    return is_array($d) ? $d : array();
}

function mapa_escribir(string $fich, array $datos): void {
    // Escritura atómica SIN lock de .lock: solo quien YA sostiene el
    // flock del fichero .lock la llama. Un flock anidado al mismo .lock
    // se auto-bloquea (flock es por open-file-description): esa fue la
    // causa de que cada envío exitoso colgara (pagina sin responder).
    if (!is_dir(dirname($fich))) @mkdir(dirname($fich), 0755, true);
    $tmp = $fich . '.' . uniqid('', true) . '.tmp';
    file_put_contents($tmp, json_encode($datos, JSON_UNESCAPED_UNICODE), LOCK_EX);
    rename($tmp, $fich); // atómico dentro del mismo directorio
}

function ip_grupo(string $ip): string {
    // Base del contador por IP. IPv4 pasa tal cual. IPv6 se agrupa por
    // /64: los vecinos de la misma subred comparten límite (los operadores
    // móviles entregan un /64 por cliente). IPv4-mapped (::ffff:x.y.z.w)
    // no existe en LiteSpeed como REMOTE_ADDR, pero si apareciera queda
    // agrupado con su /64.
    $b = @inet_pton($ip);
    if ($b === false || strlen($b) === 4) return $ip;
    return inet_ntop(substr($b, 0, 8) . str_repeat("\0", 8));
}

function ip_cf_ya_en_rango(string $ip): bool {
    // Rangos oficiales de Cloudflare (www.cloudflare.com/ips-v4). Solo
    // si REMOTE_ADDR está aquí se acepta CF-Connecting-IP como la IP del
    // visitante. Hoy el dominio NO está detrás de CF: rama muerta.
    $rangos = array(
        '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
        '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
        '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
        '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
    );
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) === false) return false;
    $ipL = ip2long($ip);
    foreach ($rangos as $rango) {
        list($red, $masc) = explode('/', $rango);
        if (($ipL >> (32 - (int)$masc)) === (ip2long($red) >> (32 - (int)$masc))) return true;
    }
    return false;
}

function ip_cliente(): string {
    // SOLO REMOTE_ADDR: es la única IP en la que el servidor disciplinado
    // puede fiarse. X-Forwarded-For la controla el cliente y anula el
    // límite (basta con mandar uno distinto por ronda). CF-Connecting-IP
    // solo si el REMOTE_ADDR es Cloudflare (rama inerte hoy).
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP']) && ip_cf_ya_en_rango((string)($_SERVER['REMOTE_ADDR'] ?? ''))) {
        $cf = trim((string)$_SERVER['HTTP_CF_CONNECTING_IP']);
        if ($cf !== '') return $cf;
    }
    return (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

/* ---------- limpieza de contadores viejos (2 días) ---------- */

function limpiar_viejos(string $datos_dir): void {
    $ahora = time();
    foreach (scandir($datos_dir) ?: array() as $f) {
        $p = $datos_dir . '/' . $f;
        if ($f === '.' || $f === '..') continue;
        if (preg_match('/^[a-f0-9]{32}\.json(\.lock)?$/', $f) || preg_match('/\.tmp$/', $f)) {
            $fuente = str_ends_with($f, '.json.lock') ? substr($p, 0, -5) : $p; // estado por .json fuente
            if (@filemtime($p) < $ahora - EDAD_LIMPIEZA && @filemtime($fuente) < $ahora - EDAD_LIMPIEZA) @unlink($p);
        }
    }
    // Nota: se llama con probabilidad 1/50 desde la puerta (mt_rand), no
    // en cada petición: es una poda domesticada, no una tarea por envío.
}

/* ---------- reservar/liberar cupo por IP y dedup CORS ---------- */

// Reserva cupo por IP + clave dedup (ANTES del cURL, bajo lock). Incluye
// en $ts_reserva la marca de la reserva para poder liberar EXACTO eso si
// FormSubmit no confirma.
function reservar_envio(string $datos_dir, string $ip, string $clave, array &$respuesta, int &$ts_reserva): bool {
    $ahora = time();
    $hoy = date('Ymd');
    $fich_ip = $datos_dir . '/' . md5(ip_grupo($ip)) . '.json';
    $k = fopen($fich_ip . '.lock', 'c+');
    if ($k === false) { $respuesta = array(false, 'No pudimos procesar tu inscripción. Inténtalo de nuevo en unos minutos.', 500); return false; }
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich_ip);
    if (($d['dia'] ?? '') !== $hoy) { $d['dia'] = $hoy; $d['enviados_dia'] = 0; }
    $d['rafaga'] = array_values(array_filter($d['rafaga'] ?? array(), function ($t) use ($ahora) { return $t > $ahora - VENTANA_RAFAGA; }));
    $esprimo = (int)(($d['rafaga'][0] ?? $ahora) + VENTANA_RAFAGA - $ahora);
    if (count($d['rafaga']) >= MAX_RAFAGA) {
        flock($k, LOCK_UN); fclose($k);
        $min = max(1, (int)ceil($esprimo / 60));
        $respuesta = array(false, 'Has enviado varias inscripciones seguidas. Espera unos ' . $min . ' minuto' . ($min === 1 ? '' : 's') . ' y vuelve a intentarlo.', 429);
        return false;
    }
    if (($d['enviados_dia'] ?? 0) >= MAX_DIA) {
        flock($k, LOCK_UN); fclose($k);
        $respuesta = array(false, 'Llegaste al límite de inscripciones por hoy. Inténtalo de nuevo mañana.', 429);
        return false;
    }
    // RESERVA (aún sin enviar): ráfaga + día. Queda registrada DESDE aquí,
    // antes del cURL, para que rachas concurrentes no la ganen.
    $ts_reserva = $ahora;
    $d['rafaga'][] = $ahora;
    $d['enviados_dia'] = ($d['enviados_dia'] ?? 0) + 1;
    mapa_escribir($fich_ip, $d);
    flock($k, LOCK_UN); fclose($k);

    // dedup DNI+curso bajo su propio lock: 2 peticiones simultáneas,
    // la primera toma el hueco; la segunda ve la clave y sale por 409.
    if ($clave !== '') {
        $fich_dedup = $datos_dir . '/inscripciones.json';
        $k = fopen($fich_dedup . '.lock', 'c+');
        if ($k === false) { liberar_reserva($datos_dir, $ip, $ts_reserva); $respuesta = array(false, 'No pudimos procesar tu inscripción. Inténtalo de nuevo en unos minutos.', 500); return false; }
        flock($k, LOCK_EX);
        $d = mapa_cargar($fich_dedup);
        if (isset($d[$clave])) {
            flock($k, LOCK_UN); fclose($k);
            liberar_reserva($datos_dir, $ip, $ts_reserva);
            $respuesta = array(false, 'Ya registramos una inscripción con este DNI para este curso. Te escribiremos al correo para completar la matrícula.', 409);
            return false;
        }
        foreach ($d as $c => $ts) { if ($ts < $ahora - RETENCION_DEDUP) unset($d[$c]); } // poda 24 h
        $d[$clave] = $ahora;
        mapa_escribir($fich_dedup, $d);
        flock($k, LOCK_UN); fclose($k);
    }
    return true;
}

function liberar_reserva(string $datos_dir, string $ip, int $ts): void {
    // FormSubmit no confirmó: se libera EXACTO lo reservado (el $ts de
    // reservar_envio en el ráfaga y el +1 de enviados_dia).
    $ahora = time();
    $hoy = date('Ymd');
    $fich_ip = $datos_dir . '/' . md5(ip_grupo($ip)) . '.json';
    $k = fopen($fich_ip . '.lock', 'c+');
    if ($k === false) return;
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich_ip);
    if (($d['dia'] ?? '') !== $hoy) { $d['dia'] = $hoy; $d['enviados_dia'] = 0; }
    $d['rafaga'] = array_values(array_filter($d['rafaga'] ?? array(), function ($t) use ($ahora) { return $t > $ahora - VENTANA_RAFAGA; }));
    $i = array_search($ts, $d['rafaga'], true);
    if ($i !== false) { unset($d['rafaga'][$i]); $d['rafaga'] = array_values($d['rafaga']); }
    if ($ts > ($ahora - VENTANA_RAFAGA) && ($d['enviados_dia'] ?? 0) > 0) $d['enviados_dia'] = $d['enviados_dia'] - 1;
    mapa_escribir($fich_ip, $d);
    flock($k, LOCK_UN); fclose($k);
}

function liberar_dedup(string $datos_dir, string $clave): void {
    if ($clave === '') return;
    $fich = $datos_dir . '/inscripciones.json';
    $k = fopen($fich . '.lock', 'c+');
    if ($k === false) return;
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich);
    unset($d[$clave]);
    mapa_escribir($fich, $d);
    flock($k, LOCK_UN); fclose($k);
}

/* ---------- dedup DNI + curso ---------- */

function clave_dedup(string $dni, string $curso): string {
    // Solo letras y números, en mayúsculas, sin espacios ni guiones: un
    // pasaporte "AB123456" y "ab 123-456" caen en la misma clave, y dos
    // pasaportes distintos con los mismos dígitos NO caen juntos.
    $doc = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $dni));
    $c = preg_replace('/\s+/', ' ', strtolower(trim($curso)));
    return hash('sha1', $doc . '|' . $c);
}

/* ---------- voucher: MIME real + peso + extensión ---------- */

function voucher_valido(array $f, array &$respuesta): bool {
    $e = $f['error'] ?? UPLOAD_ERR_NO_FILE;
    if ($e === UPLOAD_ERR_NO_FILE) {
        $respuesta = array(false, 'El voucher es obligatorio: adjunta la captura o el PDF del pago.', 422); return false;
    }
    // upload_max_filesize (6M) y post_max_size (8M) en ajax/.user.ini
    // están por encima del límite de 5 MB del formulario: CUALQUIERA de
    // los dos códigos nativos (INI_SIZE y FORM_SIZE) aquí en el POST
    // significa "excede el máximo que PHP admite subir" y se reporta con
    // el mensaje del límite del formulario, no como un error técnico.
    if ($e === UPLOAD_ERR_INI_SIZE || $e === UPLOAD_ERR_FORM_SIZE) {
        $respuesta = array(false, 'El archivo supera el máximo de 5 MB.', 422); return false;
    }
    if ($e !== UPLOAD_ERR_OK) { $respuesta = array(false, 'El voucher no se pudo leer. Inténtalo de nuevo.', 422); return false; }
    $peso = (int)($f['size'] ?? 0);
    if ($peso > MAX_PESO) { $respuesta = array(false, 'El archivo supera el máximo de 5 MB.', 422); return false; }
    $tmp = (string)$f['tmp_name'];
    if ($tmp === '' || !is_uploaded_file($tmp)) { $respuesta = array(false, 'Solo se aceptan imágenes o PDF (máximo 5 MB).', 422); return false; }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = (string)$finfo->file($tmp);
    $permitidos = array(
        'image/jpeg' => array('jpg', 'jpeg'),
        'image/png'  => array('png'),
        'image/gif'  => array('gif'),
        'image/webp' => array('webp'),
        'application/pdf' => array('pdf'),
    );
    if (!isset($permitidos[$mime])) { // SVG y todo lo demás, fuera: riesgo XSS en webmail
        $respuesta = array(false, 'Solo se aceptan imágenes o PDF (máximo 5 MB).', 422); return false;
    }
    $ext = strtolower(pathinfo((string)($f['name'] ?? ''), PATHINFO_EXTENSION));
    if ($ext !== '' && !in_array($ext, $permitidos[$mime], true)) {
        $respuesta = array(false, 'Solo se aceptan imágenes o PDF (máximo 5 MB).', 422); return false;
    }
    return true;
}

/* ---------- campos: presentes y bien formados ---------- */

function campos_validos(array $post, array &$respuesta): bool {
    $t = static function (string $k) use ($post): string { return trim((string)($post[$k] ?? '')); };
    if ($t('nombre') === '' || $t('celular') === '' || $t('curso') === '') {
        $respuesta = array(false, 'Completa los datos de la inscripción (nombre, celular y curso).', 422); return false;
    }
    $pais = $t('pais');
    // Documento por país: Perú exige DNI de 8 dígitos; Extranjero acepta
    // pasaporte de 5–20 alfanuméricos (se normaliza: sin espacios ni
    // guiones, en mayúsculas, igual que la clave dedup).
    $doc = strtoupper(preg_replace('/[\s\-\.]/', '', $t('dni')));
    if ($pais === 'Extranjero') {
        if (!preg_match('/^[A-Z0-9]{5,20}$/', $doc)) {
            $respuesta = array(false, 'Ingresa un número de pasaporte o documento válido (5 a 20 letras o números).', 422); return false;
        }
    } else {
        if (!preg_match('/^[0-9]{8}$/', $doc)) {
            $respuesta = array(false, 'El DNI tiene 8 dígitos.', 422); return false;
        }
    }
    if (filter_var($t('correo'), FILTER_VALIDATE_EMAIL) === false) {
        $respuesta = array(false, 'Ingresa un correo válido.', 422); return false;
    }
    return true;
}

/* ---------- reenvío a FormSubmit ---------- */

function reenviar_formsubmit(array $campos, array $f, string $curso): array {
    // Lista blanca de campos (CAMPOS_PERMITIDOS): lo demás (_cc, _next,
    // extras inyectados…) NO se reenvía. El adjunto se recarga con
    // CURLFile y el MIME real detectado por finfo.
    $post = array();
    foreach ($campos as $clave => $texto) {
        if (!in_array($clave, CAMPOS_PERMITIDOS, true)) continue;
        if (!is_scalar($texto)) continue;
        $post[$clave] = (string)$texto;
    }
    // _subject / _template / _captcha los FIJA el servidor, a partir de
    // los valores actuales del form: _subject se recompone con el campo
    // curso (readonly, no editable en cliente) y los otros dos son
    // constantes. Lo que venga del cliente en esos tres campos se ignora.
    unset($post['_subject'], $post['_template'], $post['_captcha']);
    $post['_subject'] = 'Inscripción web — ' . $curso;
    $post['_template'] = 'table';
    $post['_captcha'] = 'false';
    if (($f['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
        $post['voucher'] = new CURLFile($f['tmp_name'], (string)$mime, (string)$f['name']);
    }
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => FORMSUBMIT_URL,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $post,
        CURLOPT_RETURNTRANSFER => true,
        // La variante /ajax/ devuelve JSON cuando se negocia Accept; la
        // URL básica redirige (302) y la petición se vería como fallida.
        CURLOPT_HTTPHEADER => array('Accept: application/json'),
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_USERAGENT => 'proinocuidad-endpoint/1.0',
    ));
    $cuerpo = (string)curl_exec($ch);
    $codigo = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $tipo = (string)curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    $error_red = curl_errno($ch) !== 0;
    curl_close($ch);
    if ($error_red || $codigo === 0) return array(false, 'red');
    if ($codigo < 200 || $codigo >= 300) return array(false, 'no2xx');
    // Si FormSubmit contesta JSON se respeta su success; si no, basta 2xx.
    if (strpos($tipo, 'application/json') !== false) {
        $d = json_decode($cuerpo, true);
        if (is_array($d) && isset($d['success']) && ($d['success'] === true || $d['success'] === 'true')) return array(true, $cuerpo);
        if (is_array($d) && isset($d['success']) && ($d['success'] === false || $d['success'] === 'false')) return array(false, 'no2xx');
        return array(true, $cuerpo); // JSON sin expected shape: 2xx gana
    }
    return array(true, $cuerpo);
}

/* ---------- la puerta ---------- */

$respuesta = array(true, '', 200);
$ip = ip_cliente();
if (mt_rand(1, 50) === 1) limpiar_viejos($datos_dir); // ~1/50 de peticiones: poda de contadores viejos

// 1) Honeypot relleno: respuesta neutra (parece éxito, NADA sale).
$honey = trim((string)($_POST['_honey'] ?? ''));
if ($honey !== '') {
    responder(true, 'Gracias. Tu inscripción se recibió.', 200, $quiere_json);
    exit;
}

// 2) $_POST vacío con body => post_max_size sobrepasado (voucher enorme
// que ni siquiera llegó): error claro, NADA se reenvía.
$cl = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($cl > 0 && empty($_POST) && empty($_FILES)) {
    responder(false, 'La inscripción llegó demasiado grande para el servidor (voucher demasiado pesado). Adjunta un archivo de hasta 5 MB.', 413, $quiere_json);
    exit;
}

// 3) Voucher: MIME/peso/extensión de verdad; también es OBLIGATORIO aquí,
// no solo en el navegador.
if (!voucher_valido($_FILES['voucher'] ?? array(), $respuesta)) {
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 4) Campos: nombre, celular y curso presentes; documento según país
// (DNI 8 dígitos Perú / pasaporte 5–20 alfanuméricos Extranjero); correo.
if (!campos_validos($_POST, $respuesta)) {
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 5) Reserva ANTES del cURL (cupo IP + dedup), bajo lock: si FormSubmit
// falla, se libera después.
$dni_norm = (string)($_POST['dni'] ?? '');
$curso_norm = (string)($_POST['curso'] ?? '');
$clave = clave_dedup($dni_norm, $curso_norm);
$ts_reserva = 0;
if (!reservar_envio($datos_dir, $ip, $clave, $respuesta, $ts_reserva)) {
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 6) Reenvío a FormSubmit: quien entrega el correo con el adjunto.
$ok_envio = reenviar_formsubmit($_POST, $_FILES['voucher'] ?? array(), $curso_norm);

if (!$ok_envio[0]) {
    // FormSubmit no confirmó: se SUELTAN cupo y dedup; el intento NO cuenta.
    liberar_reserva($datos_dir, $ip, $ts_reserva);
    liberar_dedup($datos_dir, $clave);
    responder(false, 'No se pudo enviar. Pruébalo de nuevo en unos minutos o escríbenos directo al WhatsApp.', 502, $quiere_json);
    exit;
}

responder(true, 'Tu inscripción se envió. Te escribiremos al correo para completar la matrícula.', 200, $quiere_json);
exit;
