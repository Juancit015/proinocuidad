<?php
namespace local_certificados;

defined('MOODLE_INTERNAL') || die();

/**
 * Lectura y escritura de assets/data/certificados.json.
 *
 * El JSON lo consulta en vivo la página de verificación, así que se escribe
 * con bloqueo y rename atómico: nunca queda un archivo a medio escribir.
 */
class fichas {

    /** Ruta del JSON de fichas. */
    public static function ruta(): string {
        return rtrim((string)get_config('local_certificados', 'rutasitio'), '/') . '/assets/data/certificados.json';
    }

    /** Ruta del directorio de PDFs. */
    public static function dirpdf(): string {
        return rtrim((string)get_config('local_certificados', 'rutasitio'), '/') . '/certificados';
    }

    /**
     * Normaliza un nombre igual que la página de verificación.
     *
     * La página usa NFD + borrado de diacríticos. En PHP ese borrado no toca
     * las vocales precompuestas (í = U+00ED), así que "Díaz" se quedaba con
     * tilde y la búsqueda por "diaz" no encontraba la ficha. El mapa cubre el
     * español y no depende de intl.
     */
    public static function normalizar(string $s): string {
        $s = \core_text::strtolower(trim($s));
        $s = strtr($s, array(
            'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u',
            'ü' => 'u', 'ñ' => 'n', 'à' => 'a', 'è' => 'e', 'ì' => 'i',
            'ò' => 'o', 'ù' => 'u', 'â' => 'a', 'ê' => 'e', 'ô' => 'o',
        ));
        $s = preg_replace('/[\x{0300}-\x{036f}]/u', '', $s);
        return preg_replace('/\s+/u', ' ', $s);
    }

    /**
     * Lee las fichas.
     *
     * Con $estricto, un archivo que existe pero no se puede decodificar lanza
     * en vez de devolver []. Sin eso, agregar() reescribía el JSON con una
     * sola ficha y borraba las demás.
     *
     * @return array
     */
    public static function leer(bool $estricto = false): array {
        $ruta = self::ruta();
        if (!is_file($ruta)) {
            return [];
        }
        $crudo = file_get_contents($ruta);
        if ($crudo === false || $crudo === '') {
            if ($estricto && is_file($ruta)) {
                throw new \moodle_exception('motivo_json', 'local_certificados', '', 'certificados.json vacio o ilegible');
            }
            return [];
        }
        $datos = json_decode($crudo, true);
        if (!is_array($datos)) {
            if ($estricto) {
                throw new \moodle_exception('motivo_json', 'local_certificados', '', 'certificados.json no es JSON valido');
            }
            return [];
        }
        return $datos;
    }

    /**
     * Añade una ficha con escritura atómica.
     *
     * @throws \moodle_exception si no se puede escribir
     */
    public static function agregar(array $ficha): void {
        $ruta = self::ruta();
        $dir  = dirname($ruta);
        if (!is_dir($dir) || !is_writable($dir)) {
            throw new \moodle_exception('motivo_json', 'local_certificados', '', 'directorio no escribible');
        }

        // Lock aparte: el rename cambia el inodo del JSON.
        $lock = fopen($ruta . '.lock', 'c');
        if (!$lock) {
            throw new \moodle_exception('motivo_json', 'local_certificados', '', 'no se pudo abrir el lock');
        }
        flock($lock, LOCK_EX);

        try {
            // Estricto: un JSON corrupto no se puede sobrescribir con una
            // sola ficha, porque eso borraría todas las anteriores.
            $datos = self::leer(true);

            // El duplicado se comprueba DENTRO del lock: el chequeo previo de
            // emisor::emitir() queda fuera y dos procesos concurrentes podían
            // pasar los dos y escribir dos fichas de la misma persona.
            $sufijo = '';
            if (preg_match('/-([^-]+)$/', (string)($ficha['codigo'] ?? ''), $m)) {
                $sufijo = $m[1];
            }

            foreach ($datos as $f) {
                if (isset($f['codigo']) && $f['codigo'] === $ficha['codigo']) {
                    throw new \moodle_exception('motivo_codigo_usado', 'local_certificados', '', $ficha['codigo']);
                }
                if (($f['nombre_normalizado'] ?? '') !== ($ficha['nombre_normalizado'] ?? '')) {
                    continue;
                }
                if (($f['programa'] ?? '') === ($ficha['programa'] ?? '')) {
                    throw new \moodle_exception('motivo_duplicado', 'local_certificados', '', $ficha['nombre_normalizado']);
                }
                if ($sufijo !== ''
                    && preg_match('/-\s*' . preg_quote($sufijo, '/') . '\s*$/', (string)($f['codigo'] ?? ''))) {
                    throw new \moodle_exception('motivo_duplicado', 'local_certificados', '', $ficha['nombre_normalizado']);
                }
            }

            // Respaldo de la versión anterior antes de tocar nada.
            if (is_file($ruta)) {
                @copy($ruta, $ruta . '.bak');
            }

            $datos[] = $ficha;
            $json = json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            if ($json === false) {
                throw new \moodle_exception('motivo_json', 'local_certificados', '', 'json_encode fallo');
            }

            $tmp = $ruta . '.tmp' . getmypid();
            if (file_put_contents($tmp, $json . "\n") === false) {
                throw new \moodle_exception('motivo_json', 'local_certificados', '', 'no se pudo escribir el temporal');
            }
            if (!rename($tmp, $ruta)) {
                @unlink($tmp);
                throw new \moodle_exception('motivo_json', 'local_certificados', '', 'rename fallo');
            }
        } finally {
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    /**
     * ¿Ya hay ficha para esta persona y programa?
     *
     * El nombre del programa puede cambiar de redacción entre la emisión manual
     * y la del aula, así que además se compara el sufijo del código
     * (`NNN-AAAA-MM-INI-SUFIJO`), que identifica el curso.
     */
    public static function existe(string $nombreNormalizado, string $programa, string $sufijo = ''): bool {
        foreach (self::leer() as $f) {
            if (($f['nombre_normalizado'] ?? '') !== $nombreNormalizado) {
                continue;
            }
            if (($f['programa'] ?? '') === $programa) {
                return true;
            }
            if ($sufijo !== ''
                && preg_match('/-\s*' . preg_quote($sufijo, '/') . '\s*$/', (string)($f['codigo'] ?? ''))) {
                return true;
            }
        }
        return false;
    }

    /**
     * Números correlativos ya usados (fichas + PDFs).
     *
     * @return int[]
     */
    public static function numerosUsados(): array {
        $nums = [];

        foreach (self::leer() as $f) {
            if (preg_match('/^(\d{3,4})-/u', (string)($f['codigo'] ?? ''), $m)) {
                $nums[] = (int)$m[1];
            }
        }
        foreach (glob(self::dirpdf() . '/*.pdf') ?: [] as $pdf) {
            $base = basename($pdf, '.pdf');
            if (preg_match('/^(\d{3,4})-/u', $base, $m)) {
                $nums[] = (int)$m[1];
            }
        }

        return $nums;
    }
}
