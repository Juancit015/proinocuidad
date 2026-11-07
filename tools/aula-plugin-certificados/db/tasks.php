<?php
// Tarea programada que procesa la cola cada 5 minutos.
defined('MOODLE_INTERNAL') || die();

$tasks = [
    [
        'classname'   => 'local_certificados\task\emitir_pendientes',
        'blocking'    => 0,
        'minute'      => '*/5',
        'hour'        => '*',
        'day'         => '*',
        'month'       => '*',
        'dayofweek'   => '*',
        'disabled'    => 0,
    ],
];
