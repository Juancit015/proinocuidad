<?php
namespace local_certificados\task;

defined('MOODLE_INTERNAL') || die();

use local_certificados\cola;
use local_certificados\emisor;

/**
 * Procesa la cola de certificados pendientes.
 *
 * Una falla transitoria (HTTP, JSON) vuelve a dejar la fila pendiente hasta
 * 3 intentos; un salto (sin mapeo, sin nota, endpoint 422) es definitivo.
 */
class emitir_pendientes extends \core\task\scheduled_task {

    public function get_name(): string {
        return get_string('tarea_nombre', 'local_certificados');
    }

    public function execute(): void {
        $pendientes = cola::pendientes(20);

        foreach ($pendientes as $fila) {
            $resultado = emisor::emitir($fila);
            $estado = $resultado['estado'];

            // Corrida en seco: no se toca la fila.
            if ($estado === cola::PENDIENTE) {
                mtrace('  [seco] cola ' . $fila->id . ': ' . $resultado['motivo']);
                continue;
            }

            if ($estado === cola::FALLADA) {
                $intentos = (int)$fila->intentos + 1;
                if ($intentos < 3) {
                    cola::marcar((int)$fila->id, cola::PENDIENTE, $resultado['motivo'], null, true);
                    mtrace('  [reintento ' . $intentos . '/3] cola ' . $fila->id . ': ' . $resultado['motivo']);
                } else {
                    cola::marcar((int)$fila->id, cola::FALLADA, $resultado['motivo'], $resultado['codigo'], true);
                    mtrace('  [fallada] cola ' . $fila->id . ': ' . $resultado['motivo']);
                }
                continue;
            }

            cola::marcar((int)$fila->id, $estado, $resultado['motivo'], $resultado['codigo']);
            mtrace('  [' . $estado . '] cola ' . $fila->id . ' curso ' . $fila->courseid . ' alumno ' . $fila->userid
                . ($resultado['codigo'] ? ' -> ' . $resultado['codigo'] : '') . ': ' . $resultado['motivo']);
        }
    }
}
