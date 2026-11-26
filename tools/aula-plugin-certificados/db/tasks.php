<?php
// Tarea programada que procesa la cola cada minuto.
defined('MOODLE_INTERNAL') || die();

$tasks = [
    [
        'classname'   => 'local_certificados\task\emitir_pendientes',
        'blocking'    => 0,
        'minute'      => '*',
        'hour'        => '*',
        'day'         => '*',
        'month'       => '*',
        'dayofweek'   => '*',
        'disabled'    => 0,
    ],
];
