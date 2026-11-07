<?php
namespace local_certificados;

defined('MOODLE_INTERNAL') || die();

/**
 * Observer de course_completed.
 *
 * Solo encola. No se llama al endpoint aquí: la acción que completa el curso
 * no debe quedar esperando un HTTP de ~10 s (ni duplicarse si la UI reintenta).
 */
class observer {

    public static function course_completed(\core\event\course_completed $event): void {
        cola::encolar((int)$event->courseid, (int)$event->relateduserid);
    }
}
