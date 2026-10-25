# Tasks

## 1. Endpoint server-side `ajax/envio-inscripcion.php`

- [x] 1.1 Crear el endpoint PHP 8.3 vanilla: negociación JSON/HTML por `Accept`, lector común de errores, constantes de límites (3/10 min, 10/día, 5 MB) arriba del fichero. Sin frameworks, sin secretos embebidos (FormSubmit no necesita API key).
- [x] 1.2 Rate limit por IP: fichero JSON por IP (hash md5) en `~/datos-formularios/`, ventana deslizante de 3 por 10 min + contador diario (día natural de America/Lima), escritura con `flock` + `rename()` atómico. Excedido → 429 con mensaje que indique cuándo reintentar. Extraer IP de `REMOTE_ADDR` y `X-Forwarded-For` (primera IP si existe).
- [x] 1.3 Dedup DNI + curso: registro `sha1(dni_norm + curso_norm)` con fecha; duplicado → 409 con mensaje "Ya registramos una inscripción con este DNI para este curso". Misma IP u otra, mismo resultado.
- [x] 1.4 Validación server-side del voucher: `finfo_file` (solo `image/*` y `application/pdf`), extensión coherente con el MIME, shape de SVG prohibido explícito, tamaño ≤ 5 MB con `filesize` del tmp del POST. Fallo → error con el mismo texto que usa el cliente ("Solo se aceptan imágenes o PDF (máximo 5 MB)."). Vía sin voucher con `required` exento solo por el AJAX: tratar como fallo (igual que la validación de cliente).
- [x] 1.5 Honeypot: `_honey` relleno → 200 HTML neutro (o JSON `success:false` genérico sin detalle del mecanismo) y NO reenviar nada a FormSubmit.
- [x] 1.6 Proxy a FormSubmit vía cURL multipart (CURLFile con MIME real detectado), campos `_subject`/`_template`/`_captcha` conservados, `_honey` excluido. Tiempo límite 30s y fallo de red de FormSubmit → error genérico SIN consumir cupo por IP ni dedup. Éxito → registrar cupo + dedup, justo después de confirmar el envío.
- [x] 1.7 Respuestas: JSON `{"success":true|false,"message":…}` (vía AJAX) o HTML mínimo con `data-resultado` y el mensaje (vía iframe/clásica), cumpliendo los espacios de la spec (429, 409, error de voucher, honeypot neutro).

## 2. Capa cliente (`assets/js/main.js` + generador)

- [x] 2.1 `assets/js/main.js`: quitar la reescritura de action a `formsubmit.co/ajax/` (el action YA es el endpoint propio); vía AJAX interpreta `res.status` 429/409 → aviso de error rojo con el mensaje del servidor y botón restaurado; éxito → flujo verde igual que hoy.
- [x] 2.2 Vía iframe/multipart (con voucher): parsear la página HTML de la respuesta same-origin (`data-resultado` + mensaje) para decidir aviso verde/rojo; conservar la distinción about:blank. Vía clásica sin JS: la página de resultado HTML se ve directamente (igual de legible que hoy la de FormSubmit).
- [x] 2.3 Cooldown UX: tras un envío exitoso, marcar `localStorage["inscripcion-cd-<idform>"]=ahora` y deshabilitar el botón con cuenta regresiva de 60 s ("Espera NNs"); al terminar, restaurar `textoBotonBase`. La marca vive en el mismo bloque de estado compartido del `forEach` (el fix de reenvío de `inscripcion-reenvio-indicador-estancado` no se rompe).
- [x] 2.4 `tools/generar-fichas.mjs`: `action` del form → `/ajax/envio-inscripcion.php`. REGENERAR las 8 fichas con el guard obligatorio: limpiar `/tmp/cursos-antes`, `cp -r`, correr el generador y `diff -rq` con exit 0 (prefijos `ruta`/`cursos` intactos).
- [x] 2.5 `tools/publicar.sh`: lista blanca incluye `ajax/` (endpoint). Verificar que el deploy NO borre ni toque `~/datos-formularios/` (fuera del docroot, nada que hacer) ni `/aula/`.

## 3. Verificación local (Playwright + curl contra el endpoint probado con PHP propio o mock)

- [x] 3.1 Suite previa del formulario (mock de FormSubmit con latencia) sin regresiones: AJAX ok/fallo/reintento, voucher MP4/PNG6MB rechazados en cliente, indicador de reenvío (2 envíos con voucher verdes), reduced-motion, sin desborde 1280/390.
- [x] 3.2 Pruebas directas al endpoint (curl o PHP server local, sin JS de por medio): voucher de 5 MB exactos ACEPTADO; de 6 MB RECHAZADO; `.png` con contenido no-imagen (MIME disfrazado) RECHAZADO; honeypot relleno → neutro sin correo.
- [x] 3.3 Rate limit: 3 envíos seguidos válidos OK → el 4.º seguido → 429 con mensaje; tras simular la ventana (espera o retroceso del timestamp en el JSON del IP), el envío vuelve a pasar; 11.º del día → 429 diario. Dedup: mismo DNI + curso → 409; mismo DNI + otro curso → pasa.
- [x] 3.4 Fail-open del proxy simulado: FormSubmit caído (timeout/curl error) → error genérico, contador de cupo NO incrementado, y un reenvío inmediato posterior exitoso sí pasa.

## 4. Despliegue y cierre

- [ ] 4.1 Commit (asunto corto + por qué + `Verificado:`), push con confirmación de Juan, `git_snapshot` antes del deploy, lista blanca con `ajax/`, deploy al docroot (md5 del endpoint y del `main.js` idénticos repo/server).
- [ ] 4.2 Pruebas reales en producción: curl de voucher 5 MB ok / 6 MB rechazado / 4.º envío → 429 / DNI duplicado → 409; envío real desde la ficha (asunto `PRUEBA-FA-limite-…`) llega a la bandeja vía FormSubmit como hoy.
- [ ] 4.3 CHANGELOG; `openspec validate <change> --strict`; `openspec archive --yes` verificando que el sync de specs no trunca la spec principal.
