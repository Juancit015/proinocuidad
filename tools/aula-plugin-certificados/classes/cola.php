<?php
namespace local_certificados;

defined('MOODLE_INTERNAL') || die();

/**
 * Cola de emisión: una fila por (curso, alumno).
 *
 * El observer solo llama a encolar(); la tarea programada es la única que
 * cambia el estado y la única que habla con el endpoint.
 */
class cola {

    const PENDIENTE  = 'pendiente';
    const EMITIDA    = 'emitida';
    const SALTADA    = 'saltada';
    const FALLADA    = 'fallada';
    const DUPLICADO  = 'duplicado';

    /**
     * Encola un completado. Idempotente por (courseid, userid).
     *
     * @return bool true si insertó, false si ya existía
     */
    public static function encolar(int $courseid, int $userid, int $timecompleted = 0): bool {
        global $DB;

        if ($courseid <= 0 || $userid <= 0) {
            return false;
        }
        if ($DB->record_exists('local_certificados_cola', ['courseid' => $courseid, 'userid' => $userid])) {
            return false;
        }
        if ($timecompleted <= 0) {
            $timecompleted = (int)$DB->get_field('course_completions', 'timecompleted', [
                'course' => $courseid,
                'userid' => $userid,
            ]);
        }

        $fila = (object)[
            'courseid'      => $courseid,
            'userid'        => $userid,
            'timecompleted' => $timecompleted,
            'estado'        => self::PENDIENTE,
            'motivo'        => null,
            'codigo'        => null,
            'intentos'      => 0,
            'timemodified'  => time(),
        ];

        try {
            $DB->insert_record('local_certificados_cola', $fila);
            return true;
        } catch (\dml_exception $e) {
            // Carrera con otro completado del mismo par: el índice único manda.
            return false;
        }
    }

    /**
     * Pendientes en orden FIFO.
     *
     * @return \stdClass[]
     */
    public static function pendientes(int $limite = 20): array {
        global $DB;
        return $DB->get_records('local_certificados_cola', ['estado' => self::PENDIENTE], 'id ASC', '*', 0, $limite);
    }

    /**
     * Marca el resultado de un pendiente.
     */
    public static function marcar(int $id, string $estado, ?string $motivo = null, ?string $codigo = null, bool $sumarIntento = false): void {
        global $DB;

        $fila = $DB->get_record('local_certificados_cola', ['id' => $id], '*', MUST_EXIST);
        $fila->estado = $estado;
        $fila->motivo = $motivo;
        $fila->codigo = $codigo;
        $fila->timemodified = time();
        if ($sumarIntento) {
            $fila->intentos = (int)$fila->intentos + 1;
        }
        $DB->update_record('local_certificados_cola', $fila);
    }
}
