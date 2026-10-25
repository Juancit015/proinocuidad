# Tasks

## 1. Indicador de envío (bolita + "Cargando…")

- [x] 1.1 Revisar las bolitas ya editadas sin commit en `assets/css/main.css` (`.btn[aria-busy="true"]::before`, `@keyframes giro-envio`, `cursor: wait` y la línea dentro del bloque global `@media (prefers-reduced-motion: reduce)`): confirmar que existen, que usan `currentColor` y que la media luna queda legible sobre el rojo (medir `getComputedStyle(el, '::before')` `animation-name` y `border-color`).
- [x] 1.2 Cambiar en `assets/js/main.js` los dos `boton.innerHTML = "Enviando…"` a `"Cargando…"` (vía AJAX y vía iframe con voucher) y verificar que `aria-busy` ya queda en ambas (el CSS solo depende del atributo).
- [x] 1.3 Medir con Playwright (FormSubmit simulado en local): al enviar por AJAX el botón muestra bolita + "Cargando…", `disabled` y `cursor: wait` mientras corre; al llegar el aviso verde el botón vuelve a su texto e icono originales e `aria-busy` desaparece. Repetir para la vía con voucher: el indicador se corta exactamente al `load` del iframe con el aviso de confirmación, y al fallar el AJAX (simulando 500) se corta con el aviso de error.
- [x] 1.4 Con `prefers-reduced-motion: reduce` (contexto de Playwright `reducedMotion: 'reduce'`): la pseudo-bolita se sirve sin animación (`animation-name: none` desde el bloque reduce) y el aviso de confirmación sigue apareciendo igual.

## 2. Validación del voucher (solo imagen/PDF, hasta 5 MB)

- [x] 2.1 Añadir al generador (`tools/generar-fichas.mjs`, dentro del `<label>` del voucher) un `<p class="campo-error" hidden></p>` propio para los mensajes del voucher; regenerar las 8 fichas con el guard obligatorio del repo (`cp -r cursos /tmp/cursos-antes && node tools/generar-fichas.mjs 2>&1 | tail -1 && diff -rq /tmp/cursos-antes cursos` — exit 0; solo difieren las fichas con el nuevo párrafo, `404.html` sin cambios de bytes).
- [x] 2.2 En `assets/js/main.js`, bloque del voucher dentro del listener del form: constantes `PESO_MAXIMO = 5 * 1024 * 1024` y tipo válido (`file.type` que empiece por `image/` o sea `application/pdf`, con fallback por extensión `.pdf` si `type` viene vacío).
- [x] 2.3 Listener `change` de `input[name="voucher"]`: archivo inválido → mostrar el `.campo-error` con el texto correspondiente del motivo ("Solo se aceptan imágenes o PDF" / "El archivo supera 5 MB"), limpiar `input.value = ""` (con fallback `replaceWith(clon)` si el navegador no limpia) y devolver el foco al campo; archivo válido → ocultar el error y seguir normal.
- [x] 2.4 En el `submit`, la revisión del voucher corre ANTES de las vías de envío (y junto al gate de `checkValidity` del form): si queda un adjunto inválido por cualquier motivo, bloquear el envío, mostrar el error y salir sin entrar al AJAX ni al iframe. (Nunca dejar el botón en estado de carga.)
- [x] 2.5 Verificar que sin JS las fichas siguen funcionando: el `accept` y el `required` quedan como hoy; el nuevo `<p>` oculto no altera el flujo clásico de FormSubmit.

## 3. Caché: HTML, JS y CSS frescos tras cada despliegue

- [x] 3.1 Completar el bloque `.htaccess` ya editado: `no-cache, must-revalidate` para `main.js` (ya está) + `index.html` (todas las carpetas via `<Files "index.html">`) + `main.css` (extraer del `max-age=604800` de LiteSpeed). Sin tocar otras reglas del fichero (ErrorDocument, DirectoryIndex).
- [x] 3.2 Tras el deploy: `curl -I https://proinocuidad.com/`, `.../cursos/legislacion-sanitaria-alimentos/`, `/assets/js/main.js` y `/assets/css/main.css` muestran `Cache-Control: no-cache, must-revalidate`; si LiteSpeed lo ignorara (sin mod_headers), plan B: añadir versionado `?v=` a mano en el generador y 22 HTML (tarea que se abre solo si el plan A falla).
- [x] 3.3 Pedir a Juan una recarga dura (Ctrl+F5 o reinicio) UNA vez para el despliegue de este change: los navegadores que ya guardaron HTML con el max-age viejo de 7 días no lo revalidan solos; a futuro el `no-cache` hace que cualquier despliegue se vea en la recarga normal.

## 4. Verificación integral (Playwright contra producción con mocks)

- [x] 4.1 Casos AJAX: mensaje de error visible e inmediato al elegir un `.mp4` de ~200 KB y al elegir una imagen generada de 6 MB (archivo artificial con cabecera PNG); en ambos, input vacío tras el rechazo, sin POST a formsubmit y sin estado de carga; elegir un PDF válido después limpia el error; el envío sale con el adjunto válido.
- [x] 4.2 Casos con voucher: agregar el voucher inválido al formulario completo y verificar el bloqueo en el submit (sin navegación al iframe ni aviso verde falso); repetir el flujo con voucher válido de ~1,2 MB y confirmar el comportamiento ya desplegado (iframe oculto, aviso verde, POST multipart con voucher).
- [x] 4.3 El flujo clásico sin JS sigue útil (`accept` + `required` nativos); el `.campo-error` nuevo queda oculto por defecto en todas las fichas regeneradas (grep en las 8 fichas).
- [x] 4.4 Sin desborde horizontal a 1280 y 390px con el mensaje de voucher visible (medir `document.documentElement.scrollWidth <= innerWidth` en ambos anchos), estilo del mensaje unificado con el patrón `.campo-error` existente.

## 5. Cierre

- [x] 5.1 Commits separados por tema: (a) `AGENTS.md` + `CHANGELOG.md` pendientes del fix 5ab6263; (b) código de este change (`main.js` + `main.css` + `.htaccess` + fichas regeneradas) con mensaje en español que explique el "por qué" y bloque `Verificado:`; push solo con confirmación explícita de Juan.
- [x] 5.2 Entrada en `CHANGELOG.md` de este change con los resultados medidos (bolita medida con getComputedStyle, archivos rechazados/aceptados con tamaños, cabeceras de caché post-deploy).
- [ ] 5.3 `openspec validate formulario-envio-indicador-limite-adjunto --strict` y `openspec archive` al cerrar.
