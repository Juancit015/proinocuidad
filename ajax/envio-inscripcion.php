<?php
/**
 * Endpoint único de inscripción: puerta de entrada del formulario de las
 * 8 fichas. Valida y limita en el servidor ANTES de reenviar a FormSubmit,
 * que sigue siendo quien entrega el correo con el voucher adjunto.
 *
 * Flujo: honeypot → voucher (MIME real + peso + extensión) → límites por IP
 * → dedup DNI+curso → reenvío a FormSubmit (cURL multipart) → registrar
 * cupo y dedup SOLO si FormSubmit confirma.
 *
 * Estado: ficheros JSON en ~/datos-formularios/ (fuera del docroot),
 * escrituras con flock + rename atómico. Sin frameworks, sin secretos.
 */
declare(strict_types=1);

date_default_timezone_set('America/Lima');

// URL de entrega. El override por entorno es SOLO para los arneses de
// prueba (el apuntar a un mock local evita correos reales); en producción
// la variable no existe y queda la URL real.
define('FORMSUBMIT_URL', getenv('FORMSUBMIT_URL_OVERRIDE') ?: 'https://formsubmit.co/formacion_academica@proinocuidad.com');
const MAX_RAFAGA       = 3;      // envíos por IP
const VENTANA_RAFAGA   = 600;    // ... cada 600 segundos
const MAX_DIA          = 10;     // envíos por IP por día natural de Lima
const MAX_PESO         = 5242880; // 5 MB en bytes

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

/* ---------- estado: ficheros JSON con flock + rename atómico ---------- */

function mapa_cargar(string $fich): array {
    if (!is_file($fich)) return array();
    $c = file_get_contents($fich);
    $d = json_decode((string)$c, true);
    return is_array($d) ? $d : array();
}

function mapa_escribir(string $fich, array $datos): void {
    // Escritura atómica SIN lock de .lock: la usa solo el que YA sostiene
    // el flock del fichero .lock (registrar_envio). Un flock anidado al
    // mismo .lock se auto-bloquea (flock es por open-file-description).
    if (!is_dir(dirname($fich))) @mkdir(dirname($fich), 0755, true);
    $tmp = $fich . '.' . uniqid('', true) . '.tmp';
    file_put_contents($tmp, json_encode($datos, JSON_UNESCAPED_UNICODE), LOCK_EX);
    rename($tmp, $fich); // atómico dentro del mismo directorio
}

function ip_cliente(): string {
    // LiteSpeed pone la IP real en REMOTE_ADDR; si hay X-Forwarded-For, la
    // primera de la lista es el cliente original (cadena de proxies).
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = trim(explode(',', (string)$_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
        if ($ip !== '') return $ip;
    }
    return (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

/* ---------- límite por IP: ráfaga deslizante + tope diario ---------- */

function limite_ok(string $datos_dir, string $ip, bool $json, array &$respuesta): bool {
    $fich = $datos_dir . '/' . md5($ip) . '.json';
    $k = fopen($fich . '.lock', 'c+');
    if ($k === false) { $respuesta = array(false, 'No pudimos procesar tu inscripción. Inténtalo de nuevo en unos minutos.', 500); return false; }
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich);
    $ahora = time();
    $hoy = date('Ymd');
    if (($d['dia'] ?? '') !== $hoy) { $d['dia'] = $hoy; $d['enviados_dia'] = 0; }
    $d['rafaga'] = array_values(array_filter($d['rafaga'] ?? array(), function ($t) use ($ahora) { return $t > $ahora - VENTANA_RAFAGA; }));
    $espera_logra = (int)(($d['rafaga'][0] ?? $ahora) + VENTANA_RAFAGA - $ahora);
    if (count($d['rafaga']) >= MAX_RAFAGA) {
        flock($k, LOCK_UN); fclose($k);
        $min = max(1, (int)ceil($espera_logra / 60));
        $respuesta = array(false, 'Has enviado varias inscripciones seguidas. Espera unos ' . $min . ' minuto' . ($min === 1 ? '' : 's') . ' y vuelve a intentarlo.', 429);
        return false;
    }
    if (($d['enviados_dia'] ?? 0) >= MAX_DIA) {
        flock($k, LOCK_UN); fclose($k);
        $respuesta = array(false, 'Llegaste al límite de inscripciones por hoy. Inténtalo de nuevo mañana.', 429);
        return false;
    }
    flock($k, LOCK_UN); fclose($k);
    return true;
}

function registrar_envio(string $datos_dir, string $ip, string $clave_dedup, string $dni_norm, string $curso_norm): void {
    $ahora = time();
    $hoy = date('Ymd');
    $fich_ip = $datos_dir . '/' . md5($ip) . '.json';
    $k = fopen($fich_ip . '.lock', 'c+');
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich_ip);
    if (($d['dia'] ?? '') !== $hoy) { $d['dia'] = $hoy; $d['enviados_dia'] = 0; }
    $d['rafaga'] = array_values(array_filter($d['rafaga'] ?? array(), function ($t) use ($ahora) { return $t > $ahora - VENTANA_RAFAGA; }));
    $d['rafaga'][] = $ahora;
    $d['enviados_dia'] = ($d['enviados_dia'] ?? 0) + 1;
    mapa_escribir($fich_ip, $d);
    flock($k, LOCK_UN); fclose($k);

    $fich_dedup = $datos_dir . '/inscripciones.json';
    $k = fopen($fich_dedup . '.lock', 'c+');
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich_dedup);
    foreach ($d as $clave => $ts) { if ($ts < $ahora - 90 * 86400) unset($d[$clave]); } // poda
    $d[$clave_dedup] = $ahora;
    mapa_escribir($fich_dedup, $d);
    flock($k, LOCK_UN); fclose($k);
}

/* ---------- dedup DNI + curso ---------- */

function clave_dedup(string $dni, string $curso): string {
    $solo = preg_replace('/\D/', '', $dni);
    $c = preg_replace('/\s+/', ' ', strtolower(trim($curso)));
    return hash('sha1', $solo . '|' . $c);
}

function ya_inscrito(string $datos_dir, string $clave, bool $json, array &$respuesta): bool {
    $fich = $datos_dir . '/inscripciones.json';
    $k = fopen($fich . '.lock', 'c+');
    flock($k, LOCK_EX);
    $d = mapa_cargar($fich);
    flock($k, LOCK_UN); fclose($k);
    if (isset($d[$clave])) {
        $respuesta = array(false, 'Ya registramos una inscripción con este DNI para este curso. Te escribiremos al correo para completar la matrícula.', 409);
        return true;
    }
    return false;
}

/* ---------- voucher: MIME real + peso + extensión ---------- */

function voucher_valido(array $f, array &$respuesta): bool {
    if (($f['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return true; // sin voucher: vía AJAX
    if ($f['error'] !== UPLOAD_ERR_OK) { $respuesta = array(false, 'El voucher no se pudo leer. Inténtalo de nuevo.', 422); return false; }
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

/* ---------- reenvío a FormSubmit ---------- */

function reenviar_formsubmit(array $campos, array $f): array {
    // Reconstrucción explícita del multipart: los campos de texto de
    // FormSubmit (_subject, _template, _captcha…) se conservan; _honey
    // quedó filtrado antes. El adjunto se re-carga con CURLFile y el
    // MIME real detectado por finfo.
    $post = array();
    foreach ($campos as $clave => $texto) {
        if (!is_scalar($texto)) continue;
        $post[$clave] = (string)$texto;
    }
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
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_USERAGENT => 'proinocuidad-endpoint/1.0',
    ));
    $cuerpo = (string)curl_exec($ch);
    $codigo = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error_red = curl_errno($ch) !== 0;
    curl_close($ch);
    if ($error_red || $codigo === 0) return array(false, 'red');
    return array($codigo === 200, (string)$cuerpo);
}

/* ---------- la puerta ---------- */

$respuesta = array(true, '', 200);
$ip = ip_cliente();

// 1) Honeypot relleno: respuesta neutra (parece éxito, NADA sale).
$honey = trim((string)($_POST['_honey'] ?? ''));
if ($honey !== '') {
    responder(true, 'Gracias. Tu inscripción se recibió.', 200, $quiere_json);
    exit;
}

// 2) Voucher: MIME/peso/extensión de verdad, al margen del JS del cliente.
if (!voucher_valido($_FILES['voucher'] ?? array(), $respuesta)) {
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 3) Límite de envíos por IP (ráfaga y día).
if (!limite_ok($datos_dir, $ip, $quiere_json, $respuesta)) {
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 4) Una inscripción por DNI + curso.
$dni_norm  = (string)($_POST['dni'] ?? '');
$curso_norm = (string)($_POST['curso'] ?? '');
if ($dni_norm !== '' && $curso_norm !== '') {
    $clave = clave_dedup($dni_norm, $curso_norm);
    if (ya_inscrito($datos_dir, $clave, $quiere_json, $respuesta)) {
        responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
        exit;
    }
} else {
    $clave = '';
}

// 5) Reenvío a FormSubmit: quien entrega el correo con el adjunto.
$campos = &$_POST;
$ok_envio = reenviar_formsubmit($campos, $_FILES['voucher'] ?? array());

if (!$ok_envio[0]) {
    // FormSubmit no confirmó: error genérico y SIN consumir cupo ni dedup.
    $respuesta = array(false, 'No se pudo enviar. Pruébalo de nuevo en unos minutos o escríbenos directo al WhatsApp.', $ok_envio[1] === 'red' ? 502 : 502);
    responder($respuesta[0], $respuesta[1], $respuesta[2], $quiere_json);
    exit;
}

// 6) Confirmado por FormSubmit: recién aquí se cuentan ráfaga/día/dedup.
if ($clave !== '') registrar_envio($datos_dir, $ip, $clave, $dni_norm, $curso_norm);
else registrar_envio($datos_dir, $ip, hash('sha1', $ip . '|' . microtime(true)), $dni_norm, $curso_norm);

responder(true, 'Tu inscripción se envió. Te escribiremos al correo para completar la matrícula.', 200, $quiere_json);
exit;
