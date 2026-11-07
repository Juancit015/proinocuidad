<?php
// Strings del plugin (inglés).
defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Automatic certificates';
$string['certificados:gestionar'] = 'Manage the certificate queue';

$string['mapeo_cursos'] = 'Course mapping';
$string['mapeo_cursos_desc'] = 'JSON list. Each entry: courseid, programa (exact program name used by the endpoint), horas, creditos, sufijo, nota_minima and gradecmid (0 = course total).';
$string['nota_minima_default'] = 'Default minimum grade';
$string['nota_minima_default_desc'] = 'Used when a mapping entry does not define nota_minima.';
$string['modo_seco'] = 'Dry run';
$string['modo_seco_desc'] = 'If enabled, the task computes everything but does not call the endpoint nor write the JSON record.';
$string['endpoint_url'] = 'Endpoint URL';
$string['endpoint_url_desc'] = 'Public generator that receives the certificate parameters.';

$string['estado_pendiente'] = 'pending';
$string['estado_emitida'] = 'issued';
$string['estado_saltada'] = 'skipped';
$string['estado_fallada'] = 'failed';
$string['estado_duplicado'] = 'duplicate';

$string['motivo_sin_mapeo'] = 'Course without mapping';
$string['motivo_sin_nota'] = 'No grade or grade below the minimum';
$string['motivo_sin_completado'] = 'No completion date';
$string['motivo_duplicado'] = 'A record already exists for this person and program';
$string['motivo_codigo_usado'] = 'Generated code already exists';
$string['motivo_endpoint'] = 'Endpoint rejected the request: {$a}';
$string['motivo_sin_pdf'] = 'The endpoint did not leave a PDF for the code';
$string['motivo_json'] = 'Could not write certificados.json: {$a}';
$string['motivo_http'] = 'HTTP error calling the endpoint: {$a}';
$string['motivo_ok'] = 'Issued';

$string['tarea_nombre'] = 'Issue pending certificates';
$string['descargar'] = 'Download certificate';
$string['sin_certificado'] = 'There is no certificate issued for this course yet.';
$string['curso_no_completado'] = 'You must complete the course before downloading the certificate.';
$string['rutasitio'] = 'Site path';
$string['rutasitio_desc'] = 'Site root directory (where certificados.json and certificados/ live).';
