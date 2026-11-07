<?php
// Capacidad mínima para administrar la cola y el mapeo.
defined('MOODLE_INTERNAL') || die();

$capabilities = [
    'local/certificados:gestionar' => [
        'captype'      => 'write',
        'contextlevel' => CONTEXT_SYSTEM,
        'archetypes'   => [
            'manager' => CAP_ALLOW,
        ],
    ],
];
