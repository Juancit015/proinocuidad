# Tasks

## 1. Esqueleto del plugin en el repo

- [x] 1.1 Crear `tools/aula-plugin-certificados/` (mirror de `/aula/local/certificados/`): `version.php` (plugin local, requiere Moodle 4.5, versión `2026103100`), `lang/en/local_certificados.php` y `lang/es/local_certificados.php` (strings: plugin name, settings, estados de cola), `db/events.php` (observer de `\core\event\course_completed` → `\local_certificados\observer`), `settings.php` con ajuste `mapeo_cursos` (textarea JSON validada) y `nota_minima_default`, `db/access.php` mínimo. Verificar: `php -l` de todos los PHP en limpio y lint de version/lang coherentes.
- [x] 1.2 `classes/observer.php`: en la observación de `course_completed` solo valida (`courseid`, `userid`, `timecompleted`) y encola en `local_certificados_cola` por INSERT idempotente (índice único `uk_course_user`), estado `pendiente`; NADA de HTTP dentro del handler. `install.xml`/`install.php` con la tabla: `id, courseid, userid, timecompleted, estado (pendiente|emitida|saltada|fallada|duplicado), motivo, codigo, intentos, timemodified`. Verificar: el SQL DDL se revisa y compila en el server con `php -l`, y el índice único está.
- [x] 1.3 `classes/task/emitir_pendientes.php` + `classes/cola.php`: tarea programada de 5 min que en orden FIFO toma pendientes, calcula mapeo/nota/código/ficha y llama al emisor; estados y motivos según design (incluye la corrida en seco opcional por setting). Verificar: `php -l` limpio, y la clase del task se declara en el task config correcto de Moodle (`db/tasks.php`).

## 2. Lógica de emisión (helper del plugin)

- [x] 2.1 `classes/emisor.php`: derivación de parámetros — programa/horas/creditos/sufijo/nota_min del mapeo, nombre del alumno (fullname de Moodle), fecha término = `timecompleted` (`Y-m-d`), nota final del curso vía grade API de Moodle; construcción del correlativo `NNN-YYYY-MM-INI-CURSO` con máximo global (fichas + `certificados/*.pdf`) e `INI` derivada del nombre; verificación de duplicado (ficha parcial por nombre normalizado + programa, y PDF del mismo par). Verificar por CLI en el server (php -r con DB del aula): contra los datos reales de 50 alumnos y 0 completos — derivar nombre→iniciales, código próximo = `016-…` con las fichas vigentes, duplicado detectado con ficha demo temporal borrada después.
- [x] 2.2 Llamada al generador por curl loopback (`curl https://proinocuidad.com/generar-certificado.php?params`), respuesta → si redirect final con PDF existente **y** código HTTP del primer hop 302 con el código calculado → evaluar como emitida; señales: 422/400 JSON → `saltada` con el motivo que devuelva el generador; sin respuesta/500 → `fallada` (reintento). Prueba en seco por CLI que NO produce archivo ni ficha (stub del llamada).
- [x] 2.3 `classes/fichas.php`: alta atómica en `~/proinocuidad.com/assets/data/certificados.json` — `flock` exclusivo, lectura, verificación de que el código NO existe ya, append de la ficha (dni `""`, `estado` `VÁLIDO`, `certificado_url` del PDF del sitio), backup `certificados.bak.json`, write a temporal + `rename`. Prueba en CLI: sobre una copia del JSON real, se agrega ficha demo, se verifican las 28 fichas previas intactas + JSON válido, y se restaura la original (la ficha demo real de una emisión va en el ensayo 3.4 y se deshace).

## 3. Deploy al aula y prueba real

- [x] 3.1 Deploy del plugin vía MCP al server: `git_snapshot` del dominio ANTES, subir árbol a `/aula/local/certificados/`, `md5sum` idéntico repo/server por fichero, permisos coherentes con el aula (propietario `guanbhctsy`), verificar makeover `/aula/admin/` ve el plugin pendiente de instalación y luego la instalación (upgrade del aula genera la tabla `local_certificados_cola`), y la tarea programada aparece con su cron definido. `/aula/login` sigue en 200. Verificar con `/aula/admin/index.php` upgrade ejecutado (o CLI de Moodle `/opt/alt/php83/usr/bin/php admin/cli/upgrade.php`).
- [x] 3.2 Configurar el mapeo de cursos (setting del aula): 9 entradas con id numérico real, nombre EXACTO del programa del endpoint, horas 40 (384 el diplomado), créditos 2 (24 el diplomado), sufijo, `gradecmid` del examen y `nota_min` 14. El curso 3 queda fuera hasta que tenga temario. Verificado: el JSON se parsea y los 9 quizzes existen con `grademax=20`.
- [x] 3.3 Ensayo completo con usuario de prueba: nota 16 en el examen del curso 2 → actividad completada → criterio de curso → `timecompleted` → cola `pendiente` → tarea → `emitida`. Verificado: PDF de 2 páginas en `certificados/`, ficha en `certificados.json`, `mio.php?course=2` 302 al PDF (200), QR decodificado a `verifica-tu-certificado.html?codigo=…`, y la página de verificación encuentra la ficha por código, DNI y nombre. Estados `saltada` y `duplicado` cubiertos por el código y las guardas del endpoint.
- [x] 3.4 Deshacer ensayo: PDF y ficha borrados, `certificados.json` restaurado a 28 fichas, usuario de prueba eliminado, cola vacía, `course_completions` huérfano borrado, directorios temporales `dl-*` eliminados. Muestra del PDF guardada en `~/Descargas/certificados-prueba/`.

## 4. Cierre y sincronización

- [x] 4.1 Documentación del aula en `docs/aula-virtual.md` (documento dedicado, separado del CHANGELOG del sitio): eslabones 6 y 7 cerrados, tabla de tareas, hechos técnicos nuevos y bitácora. El sílabo aprobado vive en `docs/silabos-certificado.md`.
- [ ] 4.2 Commits separados (plugin / openspec / docs) y push SOLO con confirmación de Juan. Deploy ya verificado en 3.x; el aula emite sola mediante la tarea programada activa (cada 5 min) y la siguiente corrida queda pendiente solo de completados reales.

## 5. Auditoría posterior al cierre (2026-11-07)

- [x] 5.1 Generador: parámetros escalares y con longitud máxima, `checkdate()` en `fecha_inicio`, guarda en `mes_es()`, corte de palabras más anchas que el rect, `is_file()` de TCPDF/FPDI, **409** si el PDF existe y escritura atómica (temporal + `rename`).
- [x] 5.2 Plugin: `normalizar()` con mapa de tildes, `leer(true)` que no sobrescribe un JSON corrupto, duplicado comprobado **dentro** del lock, código persistido antes del HTTP, **409** con PDF válido tratado como "solo falta la ficha", estado `duplicado` para la colisión, `mio.php` resolviendo por código de cola e iniciales sin partículas.
- [x] 5.3 Datos: 12 códigos de `certificados.json` normalizados (sin `\r\n` ni espacios) y campo de perfil `dni` con `param2=20` (antes `0`, que guardaba vacío cualquier DNI escrito desde el formulario).
- [x] 5.4 Redeploy verificado por md5 repo = server y E2E con un nombre con tildes y partículas ("Andrés de la Cruz Muñoz"): código, ficha, PDF, QR, `mio.php`, búsqueda por código/DNI/nombre, idempotencia y recuperación. Artefactos borrados (28 fichas, 10 PDFs, cola vacía).

## Desvíos respecto al plan original

- El mapeo no quedó con un curso sino con **9** (todos menos el 3).
- Horas: **40** por curso y **384** el diplomado (valores oficiales del sitio), no 32.
- Nota mínima: **14**, no 10.5. La nota del curso 7 sale del **Examen Final** (cmid 25), no de la nota total del curso (escala 500).
- El duplicado compara además el **sufijo del código**, porque 26 alumnos ya tienen ficha con redacciones viejas del programa.
- Aparecieron cuatro bugs reales corregidos en el camino: `arg_separator.output='&amp;'` en `http_build_query()`, `gradelib.php` no cargado en cron, falta de criterios de finalización de curso y `enrol_try_internal_enrol()` que falla en silencio.
- La auditoría del 2026-11-07 (4 subagentes `beam-free#high`) destapó y corrigió además: parámetros de tipo/longitud, `checkdate`, 409 contra sobrescritura, escritura atómica, tildes en `fichas::normalizar()`, lectura estricta del JSON, duplicado dentro del lock, código persistido antes del HTTP y recuperación de un PDF ya existente. También un `param2=0` en el campo de perfil `dni` que guardaba vacío todo DNI escrito desde el formulario.
