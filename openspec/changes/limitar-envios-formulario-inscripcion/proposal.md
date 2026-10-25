# Proposal

## Why

El formulario de inscripción (`action="https://formsubmit.co/formacion_academica@proinocuidad.com"`, presente en las 8 fichas via `tools/generar-fichas.mjs`) se envía a un tercero (FormSubmit) sin ninguna barrera del lado nuestro: cualquier usuario (o script) puede enviar inscriptos ilimitados, con adjuntos que solo valida el JS del navegador. El honeypot `_honey` existe pero solo se revisa en cliente (`main.js:456`). El hosting (cPanel, LiteSpeed/Apache, PHP 8.3 con cURL y fileinfo) SÍ permite un endpoint propio: la decisión de Juan (2026-10-25) es **PHP proxy → FormSubmit**: nuestro PHP valida y limita, y solo si pasa reenvía a FormSubmit, conservando su entregabilidad y el adjunto.

## What Changes

- **Endpoint nuevo** `ajax/envio-inscripcion.php` (PHP 8.3 vanilla, sin frameworks): recibe el POST del formulario en las 8 fichas.
  - **Rate limit por IP** (torre de ficheros JSON con `flock`, fuera del docroot): máx. **3 envíos cada 10 minutos** y **10 por día**. Excedido → **HTTP 429** con mensaje claro.
  - **Dedup por DNI + curso**: una inscripción por combinación nombre-curso; repetida → **HTTP 409** con mensaje claro.
  - **Validación de voucher en servidor** (no solo JS): `finfo` MIME de verdad (solo `image/*` y `application/pdf`), extensión coherente y **tamaño ≤ 5 MB** → si falla, rechazo con mensaje de error.
  - **Honeypot en servidor**: `_honey` relleno → no envía nada (respuesta neutra).
  - **Proxy a FormSubmit**: reenvío multipart vía cURL, se propagan `_subject`/`_template`/`_captcha`; respuesta traducida al navegador.
- **`assets/js/main.js`**: las tres vías (AJAX, iframe multipart, clásico sin JS) ahora apuntan al PHP; la respuesta del iframe (hoy diagnóstica) se lee para distinguir éxito/bloqueo; **capa cliente UX**: cooldown con `localStorage` (botón deshabilitado con cuenta regresiva tras cada envío) y aviso claro al recibir 429/409 (sin reintentos ciegos).
- **`tools/generar-fichas.mjs`**: cambia el `action` del form (una sola fuente, las 8 fichas regeneradas con el guard).
- **`tools/publicar.sh`**: lista blanca incluye el fichero PHP (no hay dato sensible en él; nada de secretos embebidos).
- CHANGELOG.md actualizado.

## Capabilities

(ninguna)**New Capabilities**

Ninguna nueva: el formulario de inscripción ya vive en la capability `inscripcion`.

**Modified Capabilities**

- `inscripcion`: añade los comportamientos server-side del envío (rate limit + 429, dedup DNI+curso + 409, validación MIME/peso en servidor, honeypot serv-side, cooldown cliente). Los requisitos existentes de `inscripcion` (validación cliente del voucher desde `SPEC-Validación del voucher`, indicador de envío, flujo sin JS) **no cambian**: se portan del navegador al PHP sin alterar lo que el usuario ve cuando todo va bien.

## Impact

- **Función**: `ajax/envio-inscripcion.php` (nuevo, ~150 líneas PHP vanilla), `assets/js/main.js` (acción + lectura del iframe + cooldown), `tools/generar-fichas.mjs` (solo el `action`), `.htaccess` sin cambios, `tools/publicar.sh` (lista blanca).
- **Datos**: directorio nuevo **fuera del docroot** (`~/datos-formularios/`) con contadores por IP y dedup; es el único estado mutable del sitio (hoy no tiene ninguno).
- **Riesgo operacional**: la entregabilidad de FormSubmit no cambia (sigue siendo FormSubmit quien manda el correo); lo único nuevo del lado correo es la ruta de reenvío del adjunto vía cURL multipart.
- **Pruebas**: 5 MB aceptado / 6 MB rechazado (curl directo al PHP, sin pasar por el JS), 4.º envío seguido → 429, reenvío mismo DNI+curso → 409, suite Playwright existente sin regresiones.
