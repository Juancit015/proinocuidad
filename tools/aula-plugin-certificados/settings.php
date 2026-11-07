<?php
// Ajustes del plugin: mapeo de cursos, nota mínima y corrida en seco.
defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage(
        'local_certificados',
        get_string('pluginname', 'local_certificados')
    );
    $ADMIN->add('localplugins', $settings);

    $ejemplo = <<<JSON
[
  {
    "courseid": 6,
    "programa": "CURSO \"IMPLEMENTACIÓN Y AUDITORÍA DE LAS BPM, HIGIENE Y SANEAMIENTO (BPM, POES, POE, PLAN HACCP)\"",
    "horas": 32,
    "creditos": 2,
    "sufijo": "CIABPPH",
    "nota_minima": 14,
    "gradecmid": 0
  }
]
JSON;

    $settings->add(new admin_setting_configtextarea(
        'local_certificados/mapeo_cursos',
        get_string('mapeo_cursos', 'local_certificados'),
        get_string('mapeo_cursos_desc', 'local_certificados'),
        $ejemplo,
        PARAM_RAW,
        80,
        16
    ));

    $settings->add(new admin_setting_configtext(
        'local_certificados/nota_minima_default',
        get_string('nota_minima_default', 'local_certificados'),
        get_string('nota_minima_default_desc', 'local_certificados'),
        '14',
        PARAM_FLOAT
    ));

    $settings->add(new admin_setting_configcheckbox(
        'local_certificados/modo_seco',
        get_string('modo_seco', 'local_certificados'),
        get_string('modo_seco_desc', 'local_certificados'),
        0
    ));

    $settings->add(new admin_setting_configtext(
        'local_certificados/endpoint_url',
        get_string('endpoint_url', 'local_certificados'),
        get_string('endpoint_url_desc', 'local_certificados'),
        'https://proinocuidad.com/generar-certificado.php',
        PARAM_URL
    ));

    $settings->add(new admin_setting_configtext(
        'local_certificados/rutasitio',
        get_string('rutasitio', 'local_certificados'),
        get_string('rutasitio_desc', 'local_certificados'),
        '/home/guanbhctsy/proinocuidad.com',
        PARAM_PATH
    ));
}
