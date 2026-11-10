<?php
namespace local_certificados;

defined('MOODLE_INTERNAL') || die();

/**
 * Deriva los parámetros del certificado y llama al endpoint público.
 *
 * El endpoint es la única fuente de verdad del PDF y de sus guardas: aquí no
 * se reimplementa la composición, solo se interpretan sus respuestas.
 */
class emisor {

    /** Mapeo courseid => entrada. */
    public static function mapeo(): array {
        $crudo = (string)get_config('local_certificados', 'mapeo_cursos');
        $datos = json_decode($crudo, true);
        if (!is_array($datos)) {
            // Sin este aviso, un JSON mal pegado se veía como "todos los
            // cursos sin mapeo" y no quedaba rastro de la causa.
            if (trim($crudo) !== '') {
                debugging('local_certificados: mapeo_cursos no es JSON valido', DEBUG_DEVELOPER);
            }
            return [];
        }
        $porcurso = [];
        foreach ($datos as $entrada) {
            if (is_array($entrada) && !empty($entrada['courseid'])) {
                $porcurso[(int)$entrada['courseid']] = $entrada;
            }
        }
        return $porcurso;
    }

    /** Nota con la que se certifica: la del examen mapeado o la total del curso. */
    public static function nota(int $courseid, int $userid, array $map): float {
        global $CFG, $DB;

        // En cron (y en CLI) gradelib no viene cargado: la tarea muere con
        // "Class grade_item not found" si se asume que sí.
        require_once($CFG->libdir . '/gradelib.php');

        if (!empty($map['gradecmid'])) {
            $cm = get_coursemodule_from_id('quiz', (int)$map['gradecmid'], $courseid, false, IGNORE_MISSING);
            if ($cm && $cm->modname === 'quiz') {
                $item = \grade_item::fetch([
                    'courseid'     => $courseid,
                    'itemtype'     => 'mod',
                    'itemmodule'   => 'quiz',
                    'iteminstance' => $cm->instance,
                ]);
                if ($item) {
                    $final = $item->get_final($userid);
                    if ($final && $final->finalgrade !== null) {
                        return (float)$final->finalgrade;
                    }
                }
            }
            return 0.0;
        }

        $item = \grade_item::fetch_course_item($courseid);
        if (!$item) {
            return 0.0;
        }
        $final = $item->get_final($userid);
        return ($final && $final->finalgrade !== null) ? (float)$final->finalgrade : 0.0;
    }

    /**
     * DNI del perfil del alumno (campo 'dni'), tal cual y normalizado.
     *
     * El DNI NO se imprime en el PDF: solo viaja a la ficha para que la página
     * de verificación lo encuentre. Si el alumno no lo tiene cargado se emite
     * igual, con los dos campos vacíos; la ficha sigue siendo localizable por
     * nombre y por código.
     *
     * @return array{0:string,1:string} [original, solo dígitos]
     */
    public static function dni(\stdClass $user): array {
        global $CFG;

        require_once($CFG->dirroot . '/user/profile/lib.php');
        profile_load_data($user);
        $original = isset($user->profile_field_dni) ? trim((string)$user->profile_field_dni) : '';

        return [$original, preg_replace('/\D+/', '', $original)];
    }

    /** Iniciales del alumno: nombre + apellidos, máximo 3. */
    public static function iniciales(\stdClass $user): string {
        // Partículas y conjunciones no aportan a las iniciales: "Luis de la
        // Cruz" debe dar "LDC", no "LDL".
        $particulas = ['de', 'del', 'la', 'las', 'los', 'y', 'e', 'da', 'das', 'do', 'dos'];
        $ini = mb_substr(trim($user->firstname), 0, 1);
        foreach (preg_split('/\s+/u', trim($user->lastname)) as $palabra) {
            if ($palabra !== '' && !in_array(mb_strtolower($palabra), $particulas, true)) {
                $ini .= mb_substr($palabra, 0, 1);
            }
        }
        return mb_strtoupper(mb_substr($ini, 0, 3));
    }

    /**
     * ¿El archivo en disco es un PDF completo?
     *
     * TCPDF escribe "%PDF-" al inicio y "%%EOF" al final. Comprobar solo
     * is_file() daba por bueno un archivo truncado o un error HTML guardado
     * con extensión .pdf.
     */
    private static function pdfValido(string $ruta): bool {
        if (!is_file($ruta)) {
            return false;
        }
        $tam = filesize($ruta);
        if ($tam === false || $tam < 100) {
            return false;
        }
        $fh = fopen($ruta, 'rb');
        if (!$fh) {
            return false;
        }
        $cabecera = (string)fread($fh, 5);
        fseek($fh, max(0, $tam - 1024), SEEK_SET);
        $cola = (string)fread($fh, 1024);
        fclose($fh);

        return $cabecera === '%PDF-' && strpos($cola, '%%EOF') !== false;
    }

    /** Siguiente correlativo global. */
    public static function siguienteNumero(): int {
        $usados = fichas::numerosUsados();
        return ($usados ? max($usados) : 0) + 1;
    }

    /**
     * Procesa una fila de la cola.
     *
     * @return array{estado:string,motivo:?string,codigo:?string}
     */
    public static function emitir(\stdClass $fila): array {
        global $DB;

        $courseid = (int)$fila->courseid;
        $userid   = (int)$fila->userid;

        $map = self::mapeo()[$courseid] ?? null;
        if (!$map) {
            return ['estado' => cola::SALTADA, 'motivo' => get_string('motivo_sin_mapeo', 'local_certificados'), 'codigo' => null];
        }

        $course = $DB->get_record('course', ['id' => $courseid], '*', IGNORE_MISSING);
        $user   = $DB->get_record('user', ['id' => $userid, 'deleted' => 0], '*', IGNORE_MISSING);
        if (!$course || !$user) {
            return ['estado' => cola::SALTADA, 'motivo' => 'Curso o alumno inexistente', 'codigo' => null];
        }

        $timecompleted = (int)$fila->timecompleted;
        if ($timecompleted <= 0) {
            return ['estado' => cola::SALTADA, 'motivo' => get_string('motivo_sin_completado', 'local_certificados'), 'codigo' => null];
        }

        // La nota ya no se imprime en el certificado (decisión del cliente):
        // la emisión gatilla solo por la finalización del curso, que ya implica
        // haber aprobado el examen. `nota()` se conserva por compatibilidad.

        $nombre = fullname($user);
        $nombreNorm = fichas::normalizar($nombre);
        [$dniOriginal, $dniNorm] = self::dni($user);
        $programa = (string)$map['programa'];
        $sufijo = (string)($map['sufijo'] ?? 'CERT');

        if (fichas::existe($nombreNorm, $programa, $sufijo)) {
            return ['estado' => cola::DUPLICADO, 'motivo' => get_string('motivo_duplicado', 'local_certificados'), 'codigo' => null];
        }

        $seco = (bool)get_config('local_certificados', 'modo_seco');

        // Un intento anterior pudo dejar el código fijado antes de caerse.
        $codigo = trim((string)($fila->codigo ?? ''));
        if ($codigo === '') {
            $codigo = sprintf('%03d', self::siguienteNumero())
                . '-' . date('Y-m', $timecompleted)
                . '-' . self::iniciales($user)
                . '-' . $sufijo;
            // Persistirlo ANTES del HTTP: si el proceso muere después de que
            // el endpoint escriba el PDF, el reintento pide otro código y el
            // primero queda huérfano. En seco no se ensucia la fila.
            if (!$seco) {
                cola::guardar_codigo((int)$fila->id, $codigo);
            }
        }

        $pdf = fichas::dirpdf() . '/' . $codigo . '.pdf';
        clearstatcache(true, $pdf);

        $fechaFin = date('Y-m-d', $timecompleted);
        $fechaIni = !empty($map['fecha_inicio'])
            ? (string)$map['fecha_inicio']
            : date('Y-m-d', strtotime('-7 days', $timecompleted));

        // Corrida en seco: se calcula todo y no se toca nada.
        if ($seco) {
            return ['estado' => cola::PENDIENTE, 'motivo' => "SECO: {$codigo}", 'codigo' => $codigo];
        }

        $endpoint = (string)get_config('local_certificados', 'endpoint_url');

        // Si el PDF ya está en disco (reintento tras morir entre la
        // generación y el alta de la ficha), no se vuelve a llamar al
        // endpoint: responde 409 y lo único que falta es la ficha.
        if (!self::pdfValido($pdf)) {
            $params = [
                'nombre'       => $nombre,
                'programa'     => $programa,
                'fecha'        => $fechaFin,
                'fecha_inicio' => $fechaIni,
                'horas'        => (string)$map['horas'],
                'codigo'       => $codigo,
                'creditos'     => (string)($map['creditos'] ?? '2'),
                'lugar'        => (string)($map['lugar'] ?? 'Trujillo'),
            ];

            [$http, $cuerpo, $ubicacion, $errno, $errtexto] = self::http($endpoint, $params);

            if ($errno) {
                return ['estado' => cola::FALLADA, 'motivo' => get_string('motivo_http', 'local_certificados', $errtexto), 'codigo' => $codigo];
            }
            if ($http === 409) {
                // Ya existe un PDF con este código. Solo sirve si está
                // completo; si está truncado, un reintento no lo arregla y
                // hace falta revisarlo a mano.
                clearstatcache(true, $pdf);
                if (!self::pdfValido($pdf)) {
                    return ['estado' => cola::FALLADA, 'motivo' => 'El endpoint dice que el PDF existe pero no es un PDF valido', 'codigo' => $codigo];
                }
            } else if ($http === 400 || $http === 422) {
                $json = json_decode($cuerpo, true);
                $msg = is_array($json) && !empty($json['error']) ? $json['error'] : "HTTP {$http}";
                return ['estado' => cola::SALTADA, 'motivo' => get_string('motivo_endpoint', 'local_certificados', $msg), 'codigo' => $codigo];
            } else if ($http !== 302) {
                return ['estado' => cola::FALLADA, 'motivo' => "HTTP inesperado {$http}", 'codigo' => $codigo];
            } else if (strpos((string)$ubicacion, '/certificados/' . $codigo . '.pdf') === false) {
                return ['estado' => cola::FALLADA, 'motivo' => "Redireccion inesperada: {$ubicacion}", 'codigo' => $codigo];
            }

            clearstatcache(true, $pdf);
            if (!self::pdfValido($pdf)) {
                return ['estado' => cola::FALLADA, 'motivo' => get_string('motivo_sin_pdf', 'local_certificados'), 'codigo' => $codigo];
            }
        }

        $base = preg_replace('#/generar-certificado\.php.*$#', '', $endpoint);
        $ficha = [
            'codigo'              => $codigo,
            'nombre'              => $nombre,
            'nombre_normalizado'  => $nombreNorm,
            'dni_original'        => $dniOriginal,
            'dni_normalizado'     => $dniNorm,
            'programa'            => $programa,
            'fecha_inicio'        => $fechaIni,
            'fecha_termino'       => $fechaFin,
            'horas'               => (string)$map['horas'],
            'estado'              => 'VÁLIDO',
            'certificado_url'     => $base . '/certificados/' . $codigo . '.pdf',
        ];

        try {
            fichas::agregar($ficha);
        } catch (\moodle_exception $e) {
            // Duplicado detectado dentro del lock de fichas::agregar(), o
            // código ya usado: no es una falla transitoria, reintentar no
            // cambia nada. El estado lo deja fuera de la cola.
            if (in_array($e->errorcode, ['motivo_duplicado', 'motivo_codigo_usado'], true)) {
                return ['estado' => cola::DUPLICADO, 'motivo' => get_string('motivo_duplicado', 'local_certificados'), 'codigo' => $codigo];
            }
            return ['estado' => cola::FALLADA, 'motivo' => $e->getMessage(), 'codigo' => $codigo];
        }

        return ['estado' => cola::EMITIDA, 'motivo' => get_string('motivo_ok', 'local_certificados'), 'codigo' => $codigo];
    }

    /**
     * Llamada HTTP sin seguir redirecciones (el 302 es la señal de éxito).
     *
     * @return array{0:int,1:string,2:?string,3:int,4:string}
     */
    private static function http(string $endpoint, array $params): array {
        // Moodle fija arg_separator.output = '&amp;': sin el tercer argumento
        // http_build_query() escribe `&amp;programa=` y el endpoint responde
        // "Falta el parametro programa".
        $url = $endpoint . '?' . http_build_query($params, '', '&');
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_CONNECTTIMEOUT => 15,
            CURLOPT_TIMEOUT        => 90,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
        ]);
        $respuesta = curl_exec($ch);
        $errno     = curl_errno($ch);
        $errtexto  = curl_error($ch);
        $http      = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $tamCab    = (int)curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);

        if ($respuesta === false) {
            return [0, '', null, $errno ?: 1, $errtexto];
        }

        $cabeceras = substr($respuesta, 0, $tamCab);
        $cuerpo    = substr($respuesta, $tamCab);
        $ubicacion = null;
        if (preg_match('/^Location:\s*(.+)$/mi', $cabeceras, $m)) {
            $ubicacion = trim($m[1]);
        }

        return [$http, $cuerpo, $ubicacion, 0, ''];
    }
}
