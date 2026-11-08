<?php
/**
 * Emisión de certificados (capacidad emision-certificados).
 *
 * GET público: /generar-certificado.php?nombre&programa&fecha&horas&codigo[&fecha_inicio&lugar&nota&creditos]
 * Responde con redirect a certificados/<codigo>.pdf.
 *
 * Pipeline (PHP puro; el server no tiene pdftk/qpdf/gs ni python útil):
 *   1) TCPDF+FPDI (alias `pdf`) importan las 2 o 3 páginas de la plantilla editable:
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
$RUTA_PLANTILLA = '/home/guanbhctsy/tmp/CERTIFICADO-EDITABLE-3P.pdf';
$RUTA_TCPDF     = $RUTA_DOCROOT . '/aula/lib/tcpdf/tcpdf.php';
$RUTA_FPDI      = $RUTA_DOCROOT . '/aula/mod/assign/feedback/editpdf/fpdi/autoload.php';

// md5 de la plantilla editable normalizada (xref único, sin ObjStm; con el QR
// de ejemplo de posición que el script tapa y reemplaza). Si cambia el fichero,
// la emisión se detiene: re-verificar coords/mf5 de CAMPOS.
$PLANTILLA_MD5 = '3321ad84b2b92d48de08bad1b2132e4b';

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
    // Página 3 (continuación del sílabo): solo si el programa tiene más de 3 módulos.
    // Los rects son los de la página 2; la plantilla de 3 páginas duplica la tabla.
    'modulo4'      => array('pag' => 3, 'rect' => array(46.0,  404.1, 209.0, 454.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'modulo5'      => array('pag' => 3, 'rect' => array(62.0,  258.1, 193.0, 311.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'modulo6'      => array('pag' => 3, 'rect' => array(47.0,  128.1, 209.0, 163.1), 'align' => 'C', 'style' => '',  'size' => 11.5, 'min' => 7,   'lh' => 1.3,  'color' => array(0, 0, 0)),
    'contenido4'   => array('pag' => 3, 'rect' => array(235.0, 352.1, 548.0, 492.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
    'contenido5'   => array('pag' => 3, 'rect' => array(235.0, 212.1, 548.0, 342.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
    'contenido6'   => array('pag' => 3, 'rect' => array(235.0,  74.1, 548.0, 202.1), 'align' => 'L', 'style' => '',  'size' => 11,   'min' => 6.5, 'lh' => 1.35, 'color' => array(0, 0, 0)),
);

// Sílabo por programa. Se elige por los tokens de 'coincide': todos tienen que
// aparecer (sin acentos, en mayúsculas) en el nombre del programa. El orden
// importa solo cuando dos entradas podrían encajar en el mismo nombre.
// Un programa con modulo4..6 usa además la página 3 del reverso.
$PROGRAMAS = array(
    // Diplomado (6 módulos: usa también la página 3)
    'diplomado' => array(
        'coincide' => array('GESTION', 'CALIDAD', 'INOCUIDAD'),
        // La plantilla trae grabado "CURSO ESPECIALIZADO"; el diplomado usa
        // otra línea. Se tapa con blanco y se redibuja (ver composición).
        'tipo' => 'DIPLOMADO ESPECIALIZADO',
        'modulo1' => "Módulo I:\nContexto nacional e internacional",
        'modulo2' => "Módulo II:\nProgramas prerrequisitos",
        'modulo3' => "Módulo III:\nSistema HACCP",
        'modulo4' => "Módulo IV:\nISO 9001 e ISO 22000",
        'modulo5' => "Módulo V:\nBRCGS Food Safety V.9",
        'modulo6' => "Módulo VI:\nAuditoría de sistemas integrados",
        'contenido1' => "• Inocuidad global y cadenas de suministro\n• ETAS y su impacto en salud pública\n• DIGESA, SANIPES, SENASA y COMPIAL\n• Regulación nacional vs. Codex\n• Exigencias para exportación: FDA y UE\n• Principios Generales de Higiene CAC/RCP 1-1969",
        'contenido2' => "• BPM como cimiento de ISO 22000 y BRCGS\n• Infraestructura y diseño higiénico\n• Higiene del personal y capacitación\n• MIP: manejo integrado de plagas\n• Mantenimiento, calibración y agua\n• Prevención de la contaminación cruzada",
        'contenido3' => "• Los 7 principios del HACCP\n• 5 pasos preliminares\n• Análisis de peligros\n• Árbol de decisiones y PCC\n• Límites críticos y vigilancia\n• Verificación y registros",
        'contenido4' => "• Enfoque por procesos\n• Pensamiento basado en riesgos\n• PPR operativos vs. PCC\n• Comunicación en la cadena alimentaria\n• Tendencias 2026",
        'contenido5' => "• Alcance GFSI/BRCGS\n• Requisitos y no conformidades\n• Liderazgo y cultura de inocuidad\n• Plan de seguridad y proveedores\n• Operaciones y control de alérgenos\n• Food Defense y Food Fraud",
        'contenido6' => "• Principios de la auditoría ISO 19011\n• Competencias del auditor\n• Programa y plan de auditoría\n• Muestreo y evidencias\n• No conformidades e informe\n• Acciones correctivas y seguimiento",
    ),
    // Cursos 4 y 6 (mismo temario, dos productos distintos)
    'bpm-poes-haccp' => array(
        'coincide' => array('POES', 'POE', 'HACCP'),
        'modulo1' => "Módulo I:\nInocuidad, peligros y BPM",
        'modulo2' => "Módulo II:\nHigiene y Saneamiento, POES y POE",
        'modulo3' => "Módulo III:\nSistema HACCP y auditoría",
        'contenido1' => "• Introducción a la inocuidad alimentaria\n• Peligros en los alimentos\n• Proyecto y construcción de instalaciones\n• Control de operaciones\n• Higiene y salud del personal",
        'contenido2' => "• POES 1 a 8: agua, superficies, personal\n• Limpieza y desinfección\n• Plan de higiene y saneamiento\n• Verificación y validación\n• POE: reclamos, trazabilidad, mantenimiento\n• Etiquetado e información al consumidor",
        'contenido3' => "• Generalidades del Sistema HACCP\n• 7 principios y 12 pasos\n• Análisis de peligros y medidas de control\n• Determinación de PCC y límites críticos\n• Documentación y registros\n• Auditoría del Sistema HACCP",
    ),
    // Curso 10: HACCP según FSSC 22000
    'haccp-fssc' => array(
        'coincide' => array('FSSC'),
        'modulo1' => "Módulo I:\nFundamentos, ISO 22000 y FSSC 22000",
        'modulo2' => "Módulo II:\nHACCP según ISO 22000 y Codex",
        'contenido1' => "• Generalidades del Sistema HACCP\n• ISO 22000:2018 y pensamiento basado en riesgos\n• Programas prerrequisitos ISO/TS 22002-1\n• FSSC 22000 V6: resumen del esquema\n• Edificios, servicios, equipos y limpieza\n• Control de plagas e higiene personal",
        'contenido2' => "• Definiciones ISO 22000\n• Los 12 pasos del HACCP\n• Análisis de peligros y medidas de control\n• Determinación de PCC y PPR operativos\n• Vigilancia de PCC y PPRO\n• Talleres prácticos",
    ),
    // Curso 5: HACCP DIGESA/SENASA
    'haccp-digesa' => array(
        'coincide' => array('HACCP', 'DIGESA'),
        'modulo1' => "Módulo I:\nFundamentos y marco normativo peruano",
        'modulo2' => "Módulo II:\nDiseño e implementación del HACCP",
        'modulo3' => "Módulo III:\nValidación, certificación y auditoría",
        'contenido1' => "• Inocuidad vs. calidad\n• Los 7 principios del HACCP\n• Rol de DIGESA y SENASA\n• Codex Alimentarius e ISO 22000\n• PPR: BPM, POES y trazabilidad",
        'contenido2' => "• Etapas preliminares y equipo HACCP\n• Descripción del producto y uso esperado\n• Diagrama de flujo y confirmación in situ\n• Análisis de peligros y medidas de control\n• Determinación de PCC: árbol de decisiones\n• Límites críticos, vigilancia y acciones correctivas",
        'contenido3' => "• Validación vs. verificación\n• Auditorías internas y externas\n• Manejo de no conformidades\n• Certificación DIGESA y SENASA\n• Mejora continua y cultura de inocuidad",
    ),
    // Curso 11: auditor interno HACCP
    'auditor-haccp' => array(
        'coincide' => array('AUDITOR', 'INTERNO'),
        'modulo1' => "Módulo I:\nHACCP e introducción a la auditoría",
        'modulo2' => "Módulo II:\nPlaneación y ejecución de la auditoría",
        'modulo3' => "Módulo III:\nHallazgos, informe y seguimiento",
        'contenido1' => "• ¿Qué es el HACCP?\n• Programas prerrequisitos\n• Repaso de 7 principios y 12 pasos\n• Objetivo y tipos de auditoría\n• Principios y competencias del auditor\n• Etapas de la auditoría (PHVA)",
        'contenido2' => "• Gestión del programa de auditoría\n• Riesgos y oportunidades del programa\n• Selección del equipo auditor\n• Plan de auditoría y listas de verificación\n• Reunión de apertura y comunicación\n• Revisión documentaria y entrevistas",
        'contenido3' => "• Verificación in situ y auditoría de PPR\n• Auditoría de los PCC\n• Generación y clasificación de hallazgos\n• Elementos de una no conformidad\n• Reunión de cierre e informe\n• Seguimiento y acciones correctivas",
    ),
    // Curso 2: BPM y prerrequisitos Codex 2022 / ISO 22002-1
    'bpm-codex' => array(
        'coincide' => array('BPM', 'PRERREQUISITOS'),
        'modulo1' => "Módulo I:\nIntroducción a las BPM y prerrequisitos",
        'modulo2' => "Módulo II:\nProgramas prerrequisitos · Parte II",
        'modulo3' => "Módulo III:\nProgramas prerrequisitos · Parte III",
        'contenido1' => "• Definiciones, contaminantes y peligros\n• Tipos de peligros y control\n• PPR: exterior y diseño de procesos\n• Estructura de instalaciones\n• Instalaciones para el personal y servicios",
        'contenido2' => "• Equipos, mantenimiento y calibración\n• Control de contaminación química y física\n• Gestión de plagas y proveedores\n• Recepción, almacenamiento y transporte\n• Trazabilidad y retiro de producto\n• Gestión de alérgenos",
        'contenido3' => "• Personal: formación, higiene y salud\n• Indumentaria y normas de higiene\n• Control de las operaciones\n• Limpieza y saneamiento\n• Actualización Codex 2022 (CXC 1-1969)",
    ),
    // Curso 8: legislación sanitaria
    'legislacion' => array(
        'coincide' => array('LEGISLACION'),
        'modulo1' => "Módulo I:\nAspectos generales y marco nacional",
        'modulo2' => "Módulo II:\nNormativa internacional y talleres",
        'contenido1' => "• Ley de Inocuidad (DL 1062-2008) y reglamento\n• Reglamento sanitario DS 007-98\n• Modificatoria DS 004-2014\n• Alimentos de alto riesgo (RM 624-2015)\n• Norma HACCP (RM 449-2006)\n• Criterios microbiológicos y agua",
        'contenido2' => "• Codex Alimentarius\n• Regulación sanitaria de Estados Unidos\n• Normativas voluntarias\n• Rastreabilidad (RM 106-2023)\n• Talleres prácticos",
    ),
    // Curso 9: higiene y saneamiento (temario único en 3 bloques)
    'higiene-saneamiento' => array(
        'coincide' => array('PROGRAMAS', 'HIGIENE'),
        'modulo1' => "Módulo I:\nFundamentos y control del agua",
        'modulo2' => "Módulo II:\nProgramas operativos",
        'modulo3' => "Módulo III:\nVerificación y documentación",
        'contenido1' => "• Terminología y aspectos regulatorios\n• Importancia de la higiene y saneamiento\n• Control de abastecimiento y suministro de agua\n• Programa y monitoreo de agua",
        'contenido2' => "• Limpieza y desinfección\n• Higiene y salud del personal\n• Gestión de plagas\n• Manejo y disposición de residuos\n• Control de productos químicos",
        'contenido3' => "• Validación de los programas\n• Vigilancia y verificación\n• Gestión documentaria\n• Principales entregables\n• Talleres prácticos",
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
    $i = (int)$n;
    // Sin la guarda, un mes fuera de rango devolvía un warning y null dentro
    // del párrafo del certificado.
    return isset($meses[$i]) ? $meses[$i] : '';
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
                if ($pdf->GetStringWidth($palabra) > $w) {
                    // Una palabra más ancha que el rect no se partía nunca: el
                    // tamaño bajaba hasta el mínimo y se dibujaba igual, fuera
                    // del rect. Se corta por caracteres.
                    $trozo = '';
                    foreach (preg_split('//u', $palabra, -1, PREG_SPLIT_NO_EMPTY) as $ch) {
                        if ($pdf->GetStringWidth($trozo . $ch) <= $w) {
                            $trozo .= $ch;
                        } else {
                            if ($trozo !== '') { $salida[] = $trozo; }
                            $trozo = $ch;
                        }
                    }
                    $cur = $trozo;
                } else {
                    $cur = $palabra;
                }
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

// Un parámetro repetido (?nombre[]=x) llega como array y revienta trim() con un
// fatal sin JSON. Se exige escalar y se acota la longitud: el PDF no puede
// crecer sin límite porque alguien mande un nombre de 10.000 caracteres.
$limites = array(
    'nombre' => 120, 'programa' => 300, 'fecha' => 10, 'fecha_inicio' => 10,
    'horas' => 6, 'codigo' => 60, 'creditos' => 4, 'nota' => 6, 'lugar' => 80,
);
$param = function (string $k, string $def = '') use ($limites): string {
    if (!isset($_GET[$k])) { return $def; }
    if (!is_string($_GET[$k])) { json_error(400, 'Parametro invalido: ' . $k . '.'); }
    $v = trim($_GET[$k]);
    if (isset($limites[$k]) && mb_strlen($v) > $limites[$k]) {
        json_error(400, 'Parametro demasiado largo: ' . $k . '.');
    }
    return $v;
};

$pNombre   = $param('nombre');
$pPrograma = $param('programa');
$pFecha    = $param('fecha');
$pHoras    = $param('horas');
$pCodigo   = $param('codigo');
$pIni      = $param('fecha_inicio');
$pLugar    = $param('lugar', 'Trujillo');
$pNota     = $param('nota');
$pCred     = $param('creditos', '2');

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
if ($pIni !== '' && (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $pIni)
        || !checkdate((int)substr($pIni, 5, 2), (int)substr($pIni, 8, 2), (int)substr($pIni, 0, 4)))) {
    // Solo se comprobaba el formato: "2026-13-40" pasaba y mktime lo
    // normalizaba a otra fecha, que acababa impresa en el párrafo.
    json_error(400, 'La fecha de inicio es invalida (formato AAAA-MM-DD).');
}

$tsFin = mktime(12, 0, 0, (int)substr($pFecha, 5, 2), (int)substr($pFecha, 8, 2), (int)substr($pFecha, 0, 4));
$tsIni = ($pIni === '')
    ? strtotime('-7 days', $tsFin)
    : mktime(12, 0, 0, (int)substr($pIni, 5, 2), (int)substr($pIni, 8, 2), (int)substr($pIni, 0, 4));
$fechaIni = date('Y-m-d', $tsIni);

// Mapa de programa: normalizar sin acentos en MAYUSCULAS y buscar un registro
// cuyos tokens 'coincide' aparezcan todos en el nombre del programa.
$norm = strtr(mb_strtoupper($pPrograma), array('Á' => 'A', 'É' => 'E', 'Í' => 'I', 'Ó' => 'O', 'Ú' => 'U', 'Ü' => 'U'));
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

if (!is_file($RUTA_TCPDF) || !is_file($RUTA_FPDI)) {
    error_log('[certificados] Faltan las librerias TCPDF/FPDI en ' . $RUTA_TCPDF . ' / ' . $RUTA_FPDI);
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
    // Página 2 (sílabo): se añaden abajo solo los módulos que el programa tenga.
    'horas'        => $pHoras,
    'creditos'     => $pCred,
    'nota'         => $pNota,
    'registro'     => $pCodigo,
);

// Módulos del reverso: solo los que el programa tenga. Un curso de 2 módulos
// deja la fila 3 vacía; uno de 6 usa además la página 3.
foreach (array('modulo1', 'modulo2', 'modulo3', 'contenido1', 'contenido2', 'contenido3',
               'modulo4', 'modulo5', 'modulo6', 'contenido4', 'contenido5', 'contenido6') as $k) {
    if (!empty($silabo[$k])) {
        $valores[$k] = $silabo[$k];
    }
}

/* ------------------------------------------------------------------ */
/* Composición: 2 o 3 páginas importadas + campos dibujados + QR       */
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
    $tpl3 = !empty($valores['modulo4']) ? $pdf->importPage(3, '/CropBox') : null;

    $pdf->addPage('L', array($PAGINA_W, $PAGINA_H));
    $pdf->useTemplate($tpl1);

    // La plantilla trae grabada la línea "CURSO ESPECIALIZADO" (AmazingSlab 27,
    // #091172). Si el programa pide otra (el diplomado), se tapa el texto fijo
    // con blanco y se redibuja en la misma posición y color. Se hace antes de
    // los campos para que el nombre del programa quede encima.
    $tipoCurso = isset($silabo['tipo']) ? $silabo['tipo'] : 'CURSO ESPECIALIZADO';
    if ($tipoCurso !== 'CURSO ESPECIALIZADO') {
        $pdf->SetFillColor(255, 255, 255);
        $pdf->rect(378.0, 264.0, 246.0, 30.0, 'F');
        $pdf->SetFont('times', 'B', 27);
        $pdf->SetTextColor(9, 17, 114);
        $pdf->SetXY(378.0, 262.0);
        $pdf->Cell(246.0, 32.0, $tipoCurso, 0, 0, 'C');
    }

    foreach ($CAMPOS as $nombreCampo => $def) {
        if ($def['pag'] !== 1 || !isset($valores[$nombreCampo])) { continue; }
        dibuja_campo($pdf, $def, $valores[$nombreCampo], $PAGINA_H);
    }

    $pdf->addPage('L', array($PAGINA_W, $PAGINA_H));
    $pdf->useTemplate($tpl2);
    foreach ($CAMPOS as $nombreCampo => $def) {
        if ($def['pag'] !== 2 || !isset($valores[$nombreCampo])) { continue; }
        dibuja_campo($pdf, $def, $valores[$nombreCampo], $PAGINA_H);
    }

    // Página 3: continuación del sílabo (módulos IV–VI), sin QR ni panel.
    if ($tpl3 !== null) {
        $pdf->addPage('L', array($PAGINA_W, $PAGINA_H));
        $pdf->useTemplate($tpl3);
        foreach ($CAMPOS as $nombreCampo => $def) {
            if ($def['pag'] !== 3 || !isset($valores[$nombreCampo])) { continue; }
            dibuja_campo($pdf, $def, $valores[$nombreCampo], $PAGINA_H);
        }
    }

    // El QR vive siempre en la página 2, aunque el sílabo continúe en la 3.
    $pdf->setPage(2);

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

// Un certificado ya emitido no se regenera. Sin esta guarda, cualquiera que
// conozca un código (los códigos son públicos en certificados.json) podía
// pedir el mismo código con otro nombre y pisar el PDF legítimo.
if (is_file($salida)) {
    json_error(409, 'El certificado ya existe.');
}

// Escritura atómica: TCPDF escribe a un temporal y el rename publica el PDF
// entero. Antes se escribía directo al destino, así que dos peticiones con el
// mismo código podían dejar un archivo a medias.
$tmp = $salida . '.tmp' . getmypid();
try {
    $pdf->Output($tmp, 'F');
    if (!is_file($tmp) || filesize($tmp) <= 0 || !rename($tmp, $salida)) {
        @unlink($tmp);
        throw new RuntimeException('no se pudo publicar el PDF');
    }
} catch (Throwable $e) {
    @unlink($tmp);
    error_log('[certificados] Escritura del PDF fallo: ' . $e->getMessage() . ' (codigo ' . $pCodigo . ')');
    json_error(500, 'Error interno generando el certificado.');
}
if (!is_file($salida)) {
    error_log('[certificados] No se escribio el PDF final (codigo ' . $pCodigo . ')');
    json_error(500, 'Error interno generando el certificado.');
}

header('Location: ' . $RUTA_BASE_URL . '/certificados/' . $pCodigo . '.pdf');
exit;
