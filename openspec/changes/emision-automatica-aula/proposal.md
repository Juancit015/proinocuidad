# Proposal

## Why

Hoy la emisión de certificados funciona (change `generador-certificado-acroform` archivado y en producción), pero es **manual**: el operador arma a mano la URL del generador para cada alumno aprueba un curso, y otra vez a mano escribe la ficha en `assets/data/certificados.json`. Con 50 alumnos en el aula y varios cursos, ese doble trabajo manual es la parte lenta y propensa a errores (códigos olvidados, fichas sin crear, el alumno termina y no puede verificarse nada). El hito siguiente del sitio es que terminar un curso en el aula deje el certificado y su ficha **listos sin intervención**: emitidos, verificables y descargables.

## What Changes

- Nuevo **plugin local de Moodle `local_certificados`** en `/aula/local/` (fuera del repo, código fuente en el repo en `tools/aula-plugin-certificados/` con deploy y verificación md5 como el endpoint): un **observer** del evento `core\event\course_completed` encola el pendiente y una **tarea programada** de Moodle procesa la cola cada pocos minutos (la emisión no se hace dentro del observer para no bloquear la acción que completa el curso).
- La tarea programada llama al pipeline de emisión existente por **HTTP loopback** (`curl` del server al endpoint `generar-certificado.php` con los parámetros derivados del aula: nombre del alumno, programa, fecha de término = fecha de completado, horas, nota del curso) y reutiliza así sus guardas (400/422) sin duplicar la lógica del PDF.
- Alta **automática de la ficha** en `assets/data/certificados.json` (opcional `certificado_url` apuntando al PDF del propio sitio `https://proinocuidad.com/certificados/<codigo>.pdf`), con escritura atómica (`flock` + backup) porque el JSON es consultado en vivo por la página de verificación.
- **Código de registro con correlativo automático** del formato `NNN-YYYY-MM-INI-CURSO`: `NNN` = consecutivo global (lee los códigos ya usados en `certificados.json` y en `certificados/*.pdf`), `YYYY-MM` = año/mes de término, `INI` = iniciales del alumno derivadas del nombre, `CURSO` = sufijo del curso en el mapeo (hoy `CIABPPH` para BPM+HACCP).
- **Mapeo de cursos administrable**: ajustes del plugin (`admin_settingpage`) donde el operador registra qué curso de Moodle emite certificado: id del curso, nombre del programa tal como va al PDF, horas, créditos, sufijo `CURSO` y sílabo correspondiente.
- **Comportamiento de salto documentado y logueado**: curso sin mapeo/sílabo, nota ausente o 0, DNI sin fuente en el aula, PDF no generado o ficha ya existente → la cola marca el pendiente como saltado/duplicado con su motivo en el log del plugin; NADA se emite mal por silencio.
- Comportamiento que NO cambia: el endpoint público sigue igual para uso manual del operador, la página de verificación consume el mismo JSON sin cambios, plantilla/librerías siguen fuera del docroot y fuera del deploy.

## Capabilities

### New Capabilities

(ninguna)

### Modified Capabilities

- `emision-certificados`: nuevos requisitos de emisión **automática desde el aula** (disparo por curso completado, cola + tarea programada, correlativo del código, alta de la ficha en `certificados.json` con URL del PDF del sitio, y las condiciones de salto con log). Los requisitos vigentes (URL pública, llenado por nombre de campo, derivación única, QR, guardas) no cambian; el endpoint sigue siendo el mismo.

## Impact

- **Server**: nuevo directorio `/aula/local/certificados/` (plugin Moodle 4.5: `classes/observer.php`? `classes/task/emitir_pendientes.php`, `settings.php`, `db/access.php`, table `local_certificados_cola`), tabla propia en la BD del aula; escritura sobre `~/proinocuidad.com/assets/data/certificados.json` y `~/proinocuidad.com/certificados/` (ya escribibles por PHP web).
- **Repo**: código fuente del plugin en `tools/aula-plugin-certificados/` (se sincroniza al server con md5; no entra a la lista blanca de `publicar.sh`), OPENspec delta y docs.
- **Sin cambios de dependencias**: el plugin usa APIs core de Moodle (task, observer, settings) y `curl`/loopback HTTPS; no librerías nuevas.
- **Riesgos**: fichas automáticas sin DNI (el aula no tiene campo de perfil DNI hoy) — quedan buscables por nombre y código; retomas de un curso ya emitido se detectan como duplicado y quedan a decisión del operador.
