<?php
// Plugin local de emisión automática de certificados desde el aula.
// Mirror de /aula/local/certificados/ en el server (ver README.md).
defined('MOODLE_INTERNAL') || die();

$plugin->component = 'local_certificados';
$plugin->version   = 2026103100;
$plugin->requires  = 2024100700; // Moodle 4.5 LTS.
$plugin->maturity  = MATURITY_ALPHA;
$plugin->release   = '0.1.0';
