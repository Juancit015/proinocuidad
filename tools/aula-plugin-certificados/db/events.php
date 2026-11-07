<?php
// El observer solo encola: la emisión real corre en la tarea programada.
defined('MOODLE_INTERNAL') || die();

$observers = [
    [
        'eventname' => '\core\event\course_completed',
        'callback'  => '\local_certificados\observer::course_completed',
        'internal'  => false,
        'priority'  => 0,
    ],
];
