<?php
// Strings del plugin (español).
defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Certificados automáticos';
$string['certificados:gestionar'] = 'Gestionar la cola de certificados';

$string['mapeo_cursos'] = 'Mapeo de cursos';
$string['mapeo_cursos_desc'] = 'Lista JSON. Cada entrada: courseid, programa (nombre exacto que espera el endpoint), horas, creditos, sufijo, nota_minima y gradecmid (0 = nota total del curso).';
$string['nota_minima_default'] = 'Nota mínima por defecto';
$string['nota_minima_default_desc'] = 'Se usa cuando una entrada del mapeo no define nota_minima.';
$string['modo_seco'] = 'Corrida en seco';
$string['modo_seco_desc'] = 'Si está activo, la tarea calcula todo pero no llama al endpoint ni escribe la ficha.';
$string['endpoint_url'] = 'URL del endpoint';
$string['endpoint_url_desc'] = 'Generador público que recibe los parámetros del certificado.';

$string['estado_pendiente'] = 'pendiente';
$string['estado_emitida'] = 'emitida';
$string['estado_saltada'] = 'saltada';
$string['estado_fallada'] = 'fallada';
$string['estado_duplicado'] = 'duplicado';

$string['motivo_sin_mapeo'] = 'Curso sin mapeo';
$string['motivo_sin_nota'] = 'Sin nota o nota por debajo del mínimo';
$string['motivo_sin_completado'] = 'Sin fecha de completado';
$string['motivo_duplicado'] = 'Ya existe una ficha para esta persona y programa';
$string['motivo_codigo_usado'] = 'El código calculado ya existe';
$string['motivo_endpoint'] = 'El endpoint rechazó la petición: {$a}';
$string['motivo_sin_pdf'] = 'El endpoint no dejó un PDF para el código';
$string['motivo_json'] = 'No se pudo escribir certificados.json: {$a}';
$string['motivo_http'] = 'Error HTTP llamando al endpoint: {$a}';
$string['motivo_ok'] = 'Emitida';

$string['tarea_nombre'] = 'Emitir certificados pendientes';
$string['descargar'] = 'Descargar certificado';
$string['sin_certificado'] = 'Todavía no hay un certificado emitido para este curso.';
$string['curso_no_completado'] = 'Debes completar el curso antes de descargar el certificado.';
$string['rutasitio'] = 'Ruta del sitio';
$string['rutasitio_desc'] = 'Directorio raíz del sitio (donde viven certificados.json y certificados/).';
