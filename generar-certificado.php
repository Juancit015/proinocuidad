<?php
/**
 * Emisión de certificados (capacidad emision-certificados).
 *
 * GET público: /generar-certificado.php?nombre&programa&fecha&horas&codigo[&fecha_inicio&lugar&nota&creditos]
 * Responde con redirect a certificados/<codigo>.pdf.
 *
 * Pipeline (PHP puro; el server no tiene pdftk/qpdf/gs ni python útil):
 *   1) TCPDF+FPDI (alias `pdf`) importan las 2 páginas de la plantilla editable:
 *      el contenido llega SIN los campos AcroForm (FPDI no arrastra anotaciones),
 *      o sea las cajas quedan limpias.
 *   2) Los 15 valores se dibujan DENTRO de los rects que definen los campos del
 *      AcroForm (lectura del campo por NOMBRE; las coordenadas/nombre quedan en
 *      la tabla CAMPOS de este fichero, medida sobre la plantilla y congelada por
 *      el md5 de la plantilla: si Juan edita la plantilla, el md5 cambia y la
 *      emisión se detiene hasta re-verificar). Nada de texto dibujado a ojo.
 *   3) En la página 2 se tapa el QR de ejemplo de Juan (tapa blanca sobre toda su
 *      huella) y se estampa el QR real (QRCODE,H) apuntando a la página de
 *      verificación con el codigo del alumno.
 *   4) Se escribe certificados/<codigo>.pdf y se redirige al PDF.
 *
 * La plantilla vive fuera del docroot (~/tmp/) y no entra al despliegue; las
 * librerías TCPDF/FPDI se reutilizan del aula. Errores públicos = JSON genérico
 * sin rutas; el detalle va a error_log.
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

$RUTA_DOCROOT   = '/home/guanbhctsy/proinocuidad.com';
$RUTA_BASE_URL  = 'https://proinocuidad.com';
$RUTA_PLANTILLA = '/home/guanbhctsy/tmp/CERTIFICADO-EDITABLE.pdf';
$RUTA_TCPDF     = $RUTA_DOCROOT . '/aula/lib/tcpdf/tcpdf.php';
$RUTA_FPDI      = $RUTA_DOCROOT . '/aula/mod/assign/feedback/editpdf/fpdi/autoload.php';

// md5 de la plantilla editable normalizada (xref único, sin ObjStm; con el QR
// de ejemplo de posición que el script tapa y reemplaza). Si cambia el fichero,
// la emisión se detiene: re-verificar coords/mf5 de CAMPOS.
$PLANTILLA_MD5 = '1438241f691bf4dc6154bc475fbbc729';

// Tamaño de página de la plantilla en puntos (medido sobre el fichero real).
$PAGINA_W = 842.25;
$PAGINA_H = 604.08;

// Coordenadas del QR (página 2), medidas sobre render (design.md):
// huella del ejemplo ≈ x 612–772 pt, y desde abajo 84–242 pt.
// Origen TCPDF: arriba-izquierda.
$QR_TAPA = array('x' => 612, 'y' => 362, 'w' => 162, 'h' => 162);
$QR_RECT = array('x' => 618, 'y' => 366, 'w' => 150, 'h' => 150);

/**
 * Definición de los 15 campos AcroForm de la plantilla.
 * 'rect' en PUNTOS, y medidos DESDE ABAJO (como los /Rect del PDF): [x1, y_abajo, x2, y_arriba].
 * 'multi' = el texto admite varias líneas; 'size'/'min' = tamaño inicial/mínimo de
 * fuente en el ajuste auto; 'lh' = interlineado relativo; 'color' rgb.
 */
$CAMPOS = array(
    // Página 1 (certificado)
    'nombre'       => array('pag' => 1, 'rect' => array(230.0, 372.1, 765.0, 408.1), 'align' => 'C', 'style' => 'B', 'size' => 20,   'min' => 11,  'lh' => 1.25, 'color' => array(15, 15, 15)),
    'programa'     => array('pag' => 1, 'rect' => array(170.0, 268.1, 840.0, 318.1), 'align' => 'C', 'style' => '',  'size' => 15,   'min' => 8,   'lh' => 1.35, 'color' => array(16, 20, 119)),
    'parrafo'      => array('pag' => 1, 'rect' => array(205.0, 206.1, 835.0, 263.1), 'align' => 'C', 'style' => '',  'size' => 12,   'min' => 8,   'lh' => 1.32, 'color' => array(61, 61, 61)),
    'calificacion' => array('pag' => 1, 'rect' => array(440.0, 170.1, 560.0, 188.1), 'align' => 'C', 'style' => '',  'size' => 12,   'min' => 7,   'lh' => 1.15, 'color' => array(2, 2, 2)),
    'lugar_fecha'  => array('pag' => 1, 'rect' => array(560.0, 151.1, 805.0, 168.1), 'align' => 'R', 'style' => '',  'size' => 12,   'min' => 7,   'lh' => 1.15, 'color' => array(4, 4, 4)),
    // Página 2 (sílabo)
    'modulo1'      => array('pag' => 2, 'rect' => array(46.0,  404.1, 209.0, 454.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'modulo2'      => array('pag' => 2, 'rect' => array(62.0,  258.1, 193.0, 311.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'modulo3'      => array('pag' => 2, 'rect' => array(47.0,  128.1, 209.0, 163.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'contenido1'   => array('pag' => 2, 'rect' => array(235.0, 352.1, 548.0, 492.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
    'contenido2'   => array('pag' => 2, 'rect' => array(235.0, 212.1, 548.0, 342.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
    'contenido3'   => array('pag' => 2, 'rect' => array(235.0,  74.1, 548.0, 202.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
    'horas'        => array('pag' => 2, 'rect' => array(728.0, 514.1, 772.0, 536.1), 'align' => 'C', 'style' => '',  'size' => 14,   'min' => 8,   'lh' => 1.15, 'color' => array(0, 0, 0)),
    'creditos'     => array('pag' => 2, 'rect' => array(728.0, 444.1, 772.0, 466.1), 'align' => 'C', 'style' => '',  'size' => 14,   'min' => 8,   'lh' => 1.15, 'color' => array(0, 0, 0)),
    'nota'         => array('pag' => 2, 'rect' => array(722.0, 374.1, 778.0, 396.1), 'align' => 'C', 'style' => '',  'size' => 14,   'min' => 8,   'lh' => 1.15, 'color' => array(0, 0, 0)),
    'registro'     => array('pag' => 2, 'rect' => array(688.0, 308.1, 796.0, 334.1), 'align' => 'C', 'style' => '',  'size' => 10.5, 'min' => 5,   'lh' => 1.15, 'color' => array(11, 18, 121)),
);

// Sílabo por programa (página 2). Único registro inicial: curso BPM + HACCP,
// letra por letra de la plantilla. Los demás programas se agregan cuando llegue
// su sílabo confirmado (design.md, decisión 7).
$PROGRAMAS = array(
    'bpm-haccp' => array(
        'coincide' => array('BPM', 'HACCP'),
        'modulo1'    => "Módulo I:\nIntroducción a la inocuidad alimentaria, peligros y BPM",
        'modulo2'    => "Módulo II: Higiene y Saneamiento, POES y POE",
        'modulo3'    => "Módulo III:\nSistema HACCP y auditoría",
        'contenido1' => "• Introducción a la inocuidad alimentaria\n• Peligros en los alimentos\n• Buenas Prácticas de Manufactura\n• Proyecto y construcción de las instalaciones\n• Control de operaciones\n• Higiene y salud del personal",
        'contenido2' => "• Procedimientos Operativos Estandarizados de Saneamiento (POES)\n• Higiene y saneamiento\n• Procedimientos Operativos Estandarizados (POE)",
        'contenido3' => "• Generalidades Sistema HACCP\n• 7 principios y 12 pasos\n• Auditoría del Sistema HACCP",
    ),
);

function json_error(int $status, string $msg): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('success' => false, 'error' => $msg));
    exit;
}

/** Mes en español (uso peruano como en la plantilla: Setiembre). */
function mes_es(string $n): string {
    $meses = array(1 => 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'Setiembre', 'octubre', 'noviembre', 'diciembre');
    return $meses[(int)$n];
}

/**
 * Rango legible para el párrafo: "17 al 21 de marzo del 2026" (mismo mes),
 * "30 de marzo al 2 de abril del 2026" (meses distintos) o "21 de marzo del 2026".
 */
function rango_fechas(string $ini, string $fin): string {
    $a = array('g' => (int)substr($ini, 8, 2), 'm' => (int)substr($ini, 5, 2), 'y' => (int)substr($ini, 0, 4));
    $b = array('g' => (int)substr($fin, 8, 2), 'm' => (int)substr($fin, 5, 2), 'y' => (int)substr($fin, 0, 4));
    if ($ini === $fin) {
        return sprintf('%d de %s del %d', $a['g'], mes_es($a['m']), $a['y']);
    }
    if ($a['m'] === $b['m'] && $a['y'] === $b['y']) {
        return sprintf('%d al %d de %s del %d', $a['g'], $b['g'], mes_es($a['m']), $a['y']);
    }
    return sprintf('%d de %s al %d de %s del %d', $a['g'], mes_es($a['m']), $b['g'], mes_es($b['m']), $b['y']);
}

/**
 * Corta $texto en líneas de ancho ≤ $w con la fuente activa: respeta los saltos
 * de línea del valor y reparte las palabras.
 */
function lineas_ajustadas(TCPDF $pdf, string $texto, float $w): array {
    $salida = array();
    foreach (preg_split('/\R/u', $texto) as $parrafo) {
        if (trim($parrafo) === '') { $salida[] = ''; continue; }
        $cur = '';
        foreach (preg_split('/\s+/u', $parrafo) as $palabra) {
            $prueba = ($cur === '') ? $palabra : $cur . ' ' . $palabra;
            if ($pdf->GetStringWidth($prueba) <= $w) {
                $cur = $prueba;
            } else {
                if ($cur !== '') { $salida[] = $cur; }
                $cur = $palabra;
            }
        }
        if ($cur !== '') { $salida[] = $cur; }
    }
    return $salida;
}

/**
 * Dibuja el valor de un campo dentro del rect definido en $CAMPOS:
 * ajusta el tamaño hacia abajo hasta que quepa (ancho y alto) y alinea.
 */
function dibuja_campo(TCPDF $pdf, array $def, string $valor, float $pagH): void {
    list($x1, $yAbajo, $x2, $yArriba) = $def['rect'];
    $x   = $x1 + 2.0;
    $w   = max(2.0, $x2 - $x1 - 4.0);
    $h   = $yArriba - $yAbajo;
    $yTop = $pagH - $yArriba;

    $size = $def['size'];
    $pdf->SetTextColor($def['color'][0], $def['color'][1], $def['color'][2]);

    $lineas = null;
    for (;;) {
        $pdf->SetFont('helvetica', $def['style'], $size);
        $lineas = lineas_ajustadas($pdf, $valor, $w);
        $altoUsado = count($lineas) * $size * $def['lh'];
        if ($size <= $def['min'] || ($altoUsado <= $h && max_strlen_linea($pdf, $lineas) <= $w)) {
            break;
        }
        $size -= 0.5;
    }

    $altoLinea = $size * $def['lh'];
    if (count($lineas) === 1) {
        // una sola línea: centrada verticalmente dentro del rect
        $y = $yTop + max(0, ($h - $altoLinea) / 2);
        $pdf->SetXY($x, $y);
        $pdf->Cell($w, $altoLinea, trim($lineas[0]), 0, 1, $def['align']);
        return;
    }
    // varias líneas: pegadas al tope del rect, como el render del AcroForm
    $y = $yTop;
    foreach ($lineas as $linea) {
        $pdf->SetXY($x, $y);
        $pdf->Cell($w, $altoLinea, $linea, 0, 1, $def['align']);
        $y += $altoLinea;
    }
}

function max_strlen_linea(TCPDF $pdf, array $lineas): float {
    $max = 0.0;
    foreach ($lineas as $l) {
        $w = $pdf->GetStringWidth($l);
        if ($w > $max) { $max = $w; }
    }
    return $max;
}

/* ------------------------------------------------------------------ */
/* Parámetros y validación (guardas)                                   */
/* ------------------------------------------------------------------ */

$pNombre   = isset($_GET['nombre'])   ? trim($_GET['nombre'])   : '';
$pPrograma = isset($_GET['programa']) ? trim($_GET['programa']) : '';
$pFecha    = isset($_GET['fecha'])    ? trim($_GET['fecha'])    : '';
$pHoras    = isset($_GET['horas'])    ? trim($_GET['horas'])    : '';
$pCodigo   = isset($_GET['codigo'])   ? trim($_GET['codigo'])   : '';
$pIni      = isset($_GET['fecha_inicio']) ? trim($_GET['fecha_inicio']) : '';
$pLugar    = isset($_GET['lugar'])    ? trim($_GET['lugar'])    : 'Trujillo';
$pNota     = isset($_GET['nota'])     ? trim($_GET['nota'])     : '';
$pCred     = isset($_GET['creditos']) ? trim($_GET['creditos']) : '2';

foreach (array('nombre' => $pNombre, 'programa' => $pPrograma, 'fecha' => $pFecha, 'horas' => $pHoras, 'codigo' => $pCodigo) as $k => $v) {
    if ($v === '') {
        json_error(400, 'Falta el parametro ' . $k . '.');
    }
}
if (!preg_match('/^[A-Za-z0-9_\-]{1,60}$/', $pCodigo)) {
    json_error(400, 'El codigo es invalido.');
}
if ($pNota === '' || floatval($pNota) <= 0) {
    json_error(422, 'El certificado requiere una nota mayor de 0.');
}
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $pFecha) || !checkdate((int)substr($pFecha, 5, 2), (int)substr($pFecha, 8, 2), (int)substr($pFecha, 0, 4))) {
    json_error(400, 'La fecha es invalida (formato AAAA-MM-DD).');
}
if ($pIni !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $pIni)) {
    json_error(400, 'La fecha de inicio es invalida (formato AAAA-MM-DD).');
}

$tsFin = mktime(12, 0, 0, (int)substr($pFecha, 5, 2), (int)substr($pFecha, 8, 2), (int)substr($pFecha, 0, 4));
$tsIni = ($pIni === '')
    ? strtotime('-7 days', $tsFin)
    : mktime(12, 0, 0, (int)substr($pIni, 5, 2), (int)substr($pIni, 8, 2), (int)substr($pIni, 0, 4));
$fechaIni = date('Y-m-d', $tsIni);

// Mapa de programa: normalizar sin acentos en MAYUSCULAS y buscar un registro
// cuyos tokens 'coincide' aparezcan todos en el nombre del programa.
$norm = mb_strtoupper(strtr($pPrograma, array('Á' => 'A', 'É' => 'E', 'Í' => 'I', 'Ó' => 'O', 'Ú' => 'U', 'Ü' => 'U')));
$silabo = null;
foreach ($PROGRAMAS as $pr) {
    $ok = true;
    foreach ($pr['coincide'] as $tok) {
        if (mb_strpos($norm, $tok) === false) { $ok = false; break; }
    }
    if ($ok) { $silabo = $pr; break; }
}
if ($silabo === null) {
    // El sílabo (página 2) solo existe para programas configurados: sin config
    // no se emite un certificado con un sílabo que no es el suyo.
    json_error(422, 'El programa no tiene silabo configurado para el certificado.');
}

$mesFin  = (int)substr($pFecha, 5, 2);
$anioFin = (int)substr($pFecha, 0, 4);

// Texto guía del párrafo: misma frase que trae la plantilla por defecto
// (fuente única de verdad de los datos del certificado).
$parrafo = sprintf(
    'Organizado por Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L., en el período del %s, con una duración de %s horas académicas.',
    rango_fechas($fechaIni, $pFecha),
    $pHoras
);

/* ------------------------------------------------------------------ */
/* Guardas de plantilla y librerías                                    */
/* ------------------------------------------------------------------ */

if (md5_file($RUTA_PLANTILLA) !== $PLANTILLA_MD5) {
    error_log('[certificados] La plantilla en ' . $RUTA_PLANTILLA . ' no coincide con el md5 registrado; no se emite.');
    json_error(500, 'Error interno generando el certificado.');
}

require_once($RUTA_TCPDF);
require_once($RUTA_FPDI);
if (!class_exists('pdf')) {
    class_alias('TCPDF', 'pdf');
}

/* ------------------------------------------------------------------ */
/* Valores por campo (15): recibidos / derivados                       */
/* ------------------------------------------------------------------ */

$valores = array(
    // Página 1 (certificado)
    'nombre'       => $pNombre,
    'programa'     => $pPrograma,
    'parrafo'      => $parrafo,
    'calificacion' => 'Calificación: ' . $pNota,
    'lugar_fecha'  => $pLugar . ', ' . mes_es($mesFin) . ' del ' . $anioFin,
    // Página 2 (sílabo)
    'modulo1'      => $silabo['modulo1'],
    'modulo2'      => $silabo['modulo2'],
    'modulo3'      => $silabo['modulo3'],
    'contenido1'   => $silabo['contenido1'],
    'contenido2'   => $silabo['contenido2'],
    'contenido3'   => $silabo['contenido3'],
    'horas'        => $pHoras,
    'creditos'     => $pCred,
    'nota'         => $pNota,
    'registro'     => $pCodigo,
);

/* ------------------------------------------------------------------ */
/* Composición: 2 páginas importadas + campos dibujados + QR           */
/* ------------------------------------------------------------------ */

try {
    $pdf = new setasign\Fpdi\Tcpdf\Fpdi('L', 'pt', array(0, 0, $PAGINA_W, $PAGINA_H), true, 'UTF-8', false);
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->setMargins(0, 0, 0);
    $pdf->setAutoPageBreak(false);
    $pdf->setCellHeightRatio(1);

    $pdf->setSourceFile($RUTA_PLANTILLA);
    $tpl1 = $pdf->importPage(1, '/CropBox');
    $tpl2 = $pdf->importPage(2, '/CropBox');

    $pdf->addPage('L', array($PAGINA_W, $PAGINA_H));
    $pdf->useTemplate($tpl1);
    foreach ($CAMPOS as $nombreCampo => $def) {
        if ($def['pag'] !== 1) { continue; }
        dibuja_campo($pdf, $def, $valores[$nombreCampo], $PAGINA_H);
    }

    $pdf->addPage('L', array($PAGINA_W, $PAGINA_H));
    $pdf->useTemplate($tpl2);
    foreach ($CAMPOS as $nombreCampo => $def) {
        if ($def['pag'] !== 2) { continue; }
        dibuja_campo($pdf, $def, $valores[$nombreCampo], $PAGINA_H);
    }

    // Tapa blanca sobre toda la huella del QR de ejemplo (design.md, decisión 4)
    $pdf->SetFillColor(255, 255, 255);
    $pdf->Rect($QR_TAPA['x'], $QR_TAPA['y'], $QR_TAPA['w'], $QR_TAPA['h'], 'F', array(), array(255, 255, 255));

    // QR real del alumno → página de verificación
    $qrUrl = $RUTA_BASE_URL . '/verifica-tu-certificado.html?codigo=' . $pCodigo;
    $pdf->write2DBarcode(
        $qrUrl, 'QRCODE,H',
        $QR_RECT['x'], $QR_RECT['y'], $QR_RECT['w'], $QR_RECT['h'],
        array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => array(255, 255, 255)),
        'N'
    );
} catch (Throwable $e) {
    error_log('[certificados] Composicion fallo: ' . $e->getMessage() . ' (codigo ' . $pCodigo . ')');
    json_error(500, 'Error interno generando el certificado.');
}

/* ------------------------------------------------------------------ */
/* Publicar certificados/<codigo>.pdf y redirigir                      */
/* ------------------------------------------------------------------ */

$dirSalida = $RUTA_DOCROOT . '/certificados';
if (!is_dir($dirSalida)) {
    @mkdir($dirSalida, 0755, true);
}

$salida = $dirSalida . '/' . $pCodigo . '.pdf';
try {
    $pdf->Output($salida, 'F');
} catch (Throwable $e) {
    error_log('[certificados] Escritura del PDF fallo: ' . $e->getMessage() . ' (codigo ' . $pCodigo . ')');
    json_error(500, 'Error interno generando el certificado.');
}
if (!is_file($salida)) {
    error_log('[certificados] No se escribio el PDF final (codigo ' . $pCodigo . ')');
    json_error(500, 'Error interno generando el certificado.');
}

header('Location: ' . $RUTA_BASE_URL . '/certificados/' . $pCodigo . '.pdf');
exit;
