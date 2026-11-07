# Design

## Context

El pipeline de emisión vigente (`generar-certificado.php`, md5 `bd6c066f…` idéntico repo/server, desplegado el 2026-10-31) compone el PDF desde la plantilla AcroForm y publica `certificados/<codigo>.pdf`; los datos de verificación viven en `assets/data/certificados.json` (28 fichas, esqueta: `codigo/nombre/nombre_normalizado/dni_original/dni_normalizado/programa/fecha_inicio/fecha_termino/horas/estado/certificado_url`). El aula es Moodle 4.5.15 LTS en `/aula/` (PHP 8.3 con curl, MariaDB), **sin plugins locales propios** (`aula/local/` solo tiene lean_default `readme.txt`), sin objetos de perfil personalizados (`mdl_user_info_field` vacío) y con **0 cursos completados aún** (123 registros de completado en estado inicial, 0 `timecompleted`). El código del aula NO vive en el repo ni entra en la lista blanca de `tools/publicar.sh`; el deploy del aula se hace vía MCP (fs/git_snapshot) como se hizo con el endpoint.

**Dato medido hoy:** no hay campo DNI en el aula — la ficha automática llevará DNI vacío (búsqueda por nombre y por código; el operador podrá completar el DNI a mano más adelante en la ficha JSON si quiere, es un dato editable sin romper nada).

## Goals / Non-Goals

**Goals:**
- Terminar un curso en el aula → certificado emitido + ficha VÁLIDA verificable, sin intervención.
- Reutilizar el pipeline vigente (misma URL, mismos parámetros, mismas guardas) en vez de un segundo generador.
- Trazabilidad: toda decisión de la cola (emitida/saltada/duplicada/fallada) logueada con motivo; corrida en seco para el operador.

**Non-Goals:**
- Diplomado SGCIA (240 h): su plantilla y sílabo siguen pendientes de Juan; queda fuera de este change (curso sin mapeo → se salta).
- Emitir y NOTIFICAR al alumno por correo/WhatsApp (queda como change futuro si Juan lo pide).
- Sustituir `certificados.json` por BD: el JSON sigue siendo la fuente de la página de verificación.
- Cambiar el endpoint público ni la página de verificación: contratos intactos.

## Decisions

1. **Arquitectura: cola en BD del aula (tabla del plugin `local_certificados_cola`) + tarea programada (`\task\` scheduled cada 5 min).** El observer del evento `course_completed` SOLO inserta el pendiente (curso, usuario, fecha de completado, estado `pendiente`); la tarea procesa la cola. No se emite dentro del handler: la acción de completado podría quedar colgada ~10 s detrás de la llamada HTTP y duplicarse si la UI reintenta. La tarea da reintento gratis y corrida en seco.

2. **Emisión por HTTP loopback al endpoint vigente** (curl del server a `https://proinocuidad.com/generar-certificado.php?...`, con los parámetros derivados del mapeo). Alternativa descartada: refactorizar el endpoint para extraer una librería interna — tocaría el production file recién estable y duplicaría el punto de verdad de las guardas; con loopback los códigos 400/422 del endpoint son justamente las señales de la decisión 4. El PDF resultante se comprueba con `is_file` + tamaño > 0 antes de dar la ficha por buena.

3. **Mapeo de cursos en settings del plugin** (`local_certificados` admin tree de Moodle): lista JSON administrada por el operador — `[{ courseid, programa, horas, creditos: 2, sufijo: "CIABPPH", nota_minima }]`. Un solo lugar a la vista; cursos sin registro → salto con log. El mapeo de sílabo del lado del PDF sigue siendo el `PROGRAMAS` del endpoint por nombre de programa: el mapeo del plugin debe escribir el nombre de programa EXACTO ya configurado en el endpoint (hoy solo BPM+HACCP; sílabo sin confirmar para otros → el propio endpoint responde 422 y el pendiente queda saltado con motivo).

4. **Semánticas de salto (sin nada silencioso):** curso sin mapeo / programa 422 del generador / nota ausente-0-o-menor-a-mínimo / código colisionado → `saltado` (immutable en la cola con motivo; el operador lo ve en el log y decide). Fallas transitorias (curl sin respuesta, JSON no escribible) → `fallada` (reintento en la siguiente corrida). Duplicado (ya existe ficha misma persona+programa, o PDF mismo par) → `duplicado`.

5. **Correlativo:** `NNN` = máximo entre `^\d{3,4}-` de las fichas y de `certificados/*.pdf` **+ 1** (formato `%03d`, 4 dígitos past 999); `YYYY-MM` de la fecha de completado; `INI` = iniciales derivadas del nombre en el aula (primera letra del nombre y apellidos, hasta 3); `CURSO` del mapeo. Colisión comprobada contra fichas+archivos antes de llamar al generador.

6. **Ficha:** escritura atómica en `assets/data/certificados.json` — `flock` exclusivo, lectura, insert al final, `json_encode` con `JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT`, write temporal + `rename` + backup `certificados.bak.json` previo. `certificado_url` = `https://proinocuidad.com/certificados/<codigo>.pdf` (decisión de Juan). `dni_original/dni_normalizado` = `""` mientras el aula no tenga DNI. La sincronización repo↔server del JSON queda como acción posterior del flujo (commit del ficha tras verificar emisión real), no parte del emitir automático.

7. **Fuente del plugin en el repo** (`tools/aula-plugin-certificados/`): mirror del árbol `/aula/local/certificados/` con verificación md5 al deploy, mismo patrón repo↔server que el endpoint; NO entra a la lista blanca de `publicar.sh` (el aula es territorio server, tocado solo por MCP con `git_snapshot` del dominio antes).

## Risks / Trade-offs

- **Loopback HTTPS desde el server puede fallar** (SSL de CA, DNS interno): la primera corrida en seco lo prueba; si falla, fallback documentado = llamada por `curl --resolve` al IP del server (no cambio de diseño).
- **Nota final del curso** depende de que el docente cargue la evaluación con calificación; un curso completado sin nota queda saltado (no emitido sin nota, requerimiento del pipeline vigente: 422) — operador decide re-encolar tras cargar nota en el aula.
- **Fichas sin DNI** débiles de búsqueda: mitigada porque el QR y el nombre buscar igual; los DNIs se completan a mano cuando el operador quiera.
- **Escribir JSON en docroot** desde PHP del aula: ya escribible (el endpoint crea `certificados/`), riesgo bajo; con respaldo `.bak` y bloqueo cada escritura.
- **El endpoint público sigue abusable en solitario** (preexistente): un PDF huérfano sin ficha muere como "no encontrada" en verificación; evaluar en change futuro un token por origen de llamada.
