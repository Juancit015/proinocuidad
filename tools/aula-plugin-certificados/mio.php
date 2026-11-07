<?php
// Descarga del certificado del alumno autenticado.
// Una URL por curso: /aula/local/certificados/mio.php?course=<id>
require_once('../../config.php');

use local_certificados\emisor;
use local_certificados\fichas;

require_login();

$courseid = required_param('course', PARAM_INT);
$course   = $DB->get_record('course', ['id' => $courseid], '*', MUST_EXIST);
require_course_login($course);

$PAGE->set_url('/local/certificados/mio.php', ['course' => $courseid]);
$PAGE->set_context(context_course::instance($courseid));
$PAGE->set_title(get_string('descargar', 'local_certificados'));
$PAGE->set_heading($course->fullname);

$completado = $DB->get_record('course_completions', ['course' => $courseid, 'userid' => $USER->id]);

if (!$completado || empty($completado->timecompleted)) {
    echo $OUTPUT->header();
    echo $OUTPUT->notification(get_string('curso_no_completado', 'local_certificados'), 'warning');
    echo $OUTPUT->continue_button(new moodle_url('/course/view.php', ['id' => $courseid]));
    echo $OUTPUT->footer();
    exit;
}

$map = emisor::mapeo()[$courseid] ?? null;
$nombreNorm = fichas::normalizar(fullname($USER));
$ficha = null;

if ($map) {
    foreach (fichas::leer() as $f) {
        if (($f['nombre_normalizado'] ?? '') === $nombreNorm
            && ($f['programa'] ?? '') === (string)$map['programa']
            && !empty($f['certificado_url'])) {
            $ficha = $f;
            break;
        }
    }
}

if ($ficha) {
    redirect($ficha['certificado_url']);
}

echo $OUTPUT->header();
echo $OUTPUT->notification(get_string('sin_certificado', 'local_certificados'), 'info');
echo $OUTPUT->continue_button(new moodle_url('/course/view.php', ['id' => $courseid]));
echo $OUTPUT->footer();
