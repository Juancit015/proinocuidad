# Design

## Context

El form de inscripción (8 fichas, fuente única `tools/generar-fichas.mjs:389`) envía hoy
directo a FormSubmit: AJAX JSON (`formsubmit.co/ajax/`) sin voucher, o multipart clásico
en un iframe oculto con voucher (`main.js`, bloque `iframe[data-inscripcion]`), y flujo
clásico sin JS. Sin backend, las barras anti-abuso son solo de JS; el honeypot `_honey`
(m. 515 de la ficha) se mira solo en cliente (`main.js:456`). El hosting tiene
**PHP 8.3.36 (cgi-fcgi) con cURL y fileinfo** (verificado en vivo por ejecución), cPanel
writable en `$HOME`. El `.htaccess` ya sirve el docroot con reglas conservadoras.

## Goals / Non-Goals

- **Goal**: portón único server-side (validación + límites + honeypot) antes de que el
  correo salga a FormSubmit; UX idéntica cuando todo pasa.
- **Non-Goal**: no reemplaza FormSubmit (sigue siendo quien envía el correo con adjunto).
- **Non-Goal**: sin frameworks, sin Composer, sin base de datos (ficheros planos).
- **Non-Goal**: no tocar páginas, CSS ni formularios ajenos a las 8 fichas.

## Decisions

1. **Endpoint único `ajax/envio-inscripcion.php`** (ruta ya reservada para "internos":
   hoy el AJAX concatenaba `/ajax/` al host de FormSubmit; nuestro endpoint vive en el
   propio docroot bajo `/ajax/`). El `action` del form pasa a ese path, y `main.js`
   deja de reescribir la URL (la acción YA es la nuestra).
2. **Proxy a FormSubmit con cURL multipart**: el PHP reenvía el POST completo a
   `https://formsubmit.co/formacion_academica@proinocuidad.com`, quitando campos
   internos nuestros (`_honey`) y conservando `_subject`/`_template`/`_captcha`.
   El MIME del adjunto regenerado con CURLFile y el MIME real detectado.
3. **Negociación de contenido por vía**: si la petición espera JSON (vía AJAX de
   `main.js`, header `Accept: application/json`) → respuesta JSON `{"success":…}` que
   `main.js` ya sabe interpretar (y añadiendo el manejo de códigos 429/409). Si es vía
   iframe/clásica (HTML) → página mínima HTML con `data-resultado="exito|error"` y el
   mensaje, que el handler del iframe lee ahora que la respuesta es **same-origin**
   (sigue distinguiendo about:blank vs respuesta; sin JS, el usuario ve la página de
   resultado directamente, misma UX de hoy con la página "Thanks" de FormSubmit).
4. **Estado en ficheros planos fuera del docroot** (`~/datos-formularios/`): contador
   por IP en un JSON por IP (3/10min en slide window, 10/día por día natural de America/Lima),
   dedup por `sha1(DNI + curso)` con registro de fecha/hora. Escrituras atómicas con
   `flock` (un solo visitante a la vez por fichero, colisiones raras y baratas).
   *Alternativa descartada*: SQLite (ext disponible pero es más batería de la necesaria
   para ~decenas de envíos/día) y Redis (no existe en el hosting).
5. **Honeypot serv-side**: `_honey` no vacío → 200 con HTML neutro "Gracias" (sin
   detalle del mecanismo), nada se reenvía a FormSubmit. El chequeo de cliente de
   `main.js:456` se conserva (ahorra el POST del bot honesto).
6. **Cooldown cliente**: tras cada éxito del form, `localStorage["inscripcion-cd-<form>"]=ts`
   y el botón se deshabilita con cuenta regresiva de 60s (texto "Espera NNs"),
   restaurando su HTML base al final. En éxito se actualiza la marca ANTES del aviso
   verde. El handler del servidor (429/409) NO activa cooldown (botón restaurado).
7. **MIME real con finfo + extensión coherente**: `finfo_file` para contentType
   (`image/*` o `application/pdf`), y la extensión del nombre (o el suffix magistral
   del tipo) dentro de {jpg,jpeg,png,gif,webp,svg?,pdf} — svg NO (riesgo XSS en
   webmail), se agrega a un bloqueo explícito. Peso ≤ 5 MB con `filesize` del tmp.
8. **IP**: `REMOTE_ADDR` de LiteSpeed si es confiable; si `X-Forwarded-For` existe y
   es la del frente LiteSpeed → primera IP de la lista. Rate limit por fichero por IP
   hash (`ip2long`-independiente, ipv6 ok): `md5(ip)`.

## Risks / Trade-offs

- [HTML del iframe ahora same-origin: el chequeo viejo usaba SecurityError para
  distinguir respuesta] → el chequeo se conserva (about:blank vs lo demás) y se AÑADE
  la lectura del contenido para mensaje/resultado; la respuesta de error (429 página)
  también same-origin, se lee igual.
- [FormSubmit puede rechazar el reenvío (fallo transitorio de su lado)] → el proxy
  traduce a error genérico "No pudimos procesar tu inscripción, inténtalo de nuevo
  en unos minutos" y NO consume el cupo por IP en ese caso (solo se cuenta cuando
  FormSubmit confirma).
- [Dos ficheros JSON muy concurrentes para mismos IPs] → `flock` exclusivo + escritura
  con `rename()` atómico; bajo esta escala (mail de nicho) no hay contención real.
- [El limite de carpeta fuera del docroot depende de que cPanel no la borre] → el
  directorio queda en la raíz del hosting junto a `moodledata` (no tocado); en
  deploy no se borra nunca (la lista blanca copia, no sincroniza).
- [Cooldown de 60s: el guardián server-side es inmediato] → coherente con "1 inscripción
  por DNI+curso" ya de por sí; el cooldown es solo usabilidad.
- [.user.ini de /aula/ es Moodle (lado aula); NADA de esto toca /aula/] → el endpoint
  vive solo en `/ajax/` del docroot del sitio estático.

## Migration Plan

1. Crear `ajax/envio-inscripcion.php` + `~/datos-formularios/` (interpretación: el
   directorio de estado se crea ON DEMAND desde el PHP si no existe, 0755).
2. `main.js`: action directa al PHP, JSON 429/409, lectura de iframe HTML, cooldown.
3. `generar-fichas.mjs`: action del form → regenerar las 8 fichas + 404 con guard diff.
4. Suite de Playwright (mock del FormSubmit offline) + pruebas directas contra producción
   con curl (5 MB ok / 6 MB rechazado / 4.º envío → 429 / mismo DNI+curso → 409 /
   honeypot relleno silencioso).
5. Deploy: lista blanca de `tools/publicar.sh` incluye `ajax/`; snapshot previo
   (`git_snapshot`) para rollback. `.htaccess` sin cambios (PHP corre igual).
6. CHANGELOG.

## Open Questions

- Ninguno bloqueante. La referencia del HTML de resultado y el cooldown exacto (60s)
  son decisiones cerradas de este diseño; si Juan quiere otro valor de cooldown se
  ajusta en implementación sin tocar la spec.
