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

    /** Normaliza un nombre igual que la página de verificación. */
    public static function normalizar(string $s): string {
        $s = \core_text::strtolower(trim($s));
        $s = preg_replace('/[\x{0300}-\x{036f}]/u', '', $s);
        return preg_replace('/\s+/u', ' ', $s);
    }

    /**
     * Lee las fichas.
     *
     * @return array
     */
    public static function leer(): array {
        $ruta = self::ruta();
        if (!is_file($ruta)) {
            return [];
        }
        $crudo = file_get_contents($ruta);
        if ($crudo === false || $crudo === '') {
            return [];
        }
        $datos = json_decode($crudo, true);
        return is_array($datos) ? $datos : [];
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
            $datos = self::leer();

            foreach ($datos as $f) {
                if (isset($f['codigo']) && $f['codigo'] === $ficha['codigo']) {
                    throw new \moodle_exception('motivo_codigo_usado', 'local_certificados', '', $ficha['codigo']);
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
