# Design

## Context

- El formulario tiene dos vías de envío existentes en `assets/js/main.js`:
  AJAX a `/ajax/` (sin voucher, JSON) y POST clásico multipart a un iframe
  oculto con `form.target` (con voucher, el único que entrega adjuntos).
  Ambas vías ya marcan `aria-busy` y cambian el texto del botón a
  "Enviando…", pero el CSS no reacciona a `aria-busy`: no hay indicador visual.
- El campo voucher (`input[name="voucher"]`, `accept="image/*,.pdf"`,
  `required`) nace del generador (`tools/generar-fichas.mjs`); no existe
  ninguna validación de tipo o peso en JS. El `accept` solo filtra el
  selector de archivos; una vez elegido, cualquier cosa pasa al envío.
- Estado del repo SIN commit antes de este change: (a) el fix del envío
  ya desplegado queda comprometido en `5ab6263`; (b) hay ediciones locales
  pendientes en `assets/css/main.css` (bolita con `aria-busy`),
  `.htaccess` (`no-cache` solo para `main.js`), `AGENTS.md` y
  `CHANGELOG.md` (doctrina del formulario). Este change se apoya en ellas
  y las completa; los commits se dividen por tema (código vs docs, regla
  del repo).
- Caché: LiteSpeed sirve HTML, `main.js` y `main.css` con
  `Cache-Control: max-age=604800`. El HTML cacheado es el que volvió a
  mandar JS viejo al navegador del dueño (aunque el server ya tuviera el
  fix), y escondería también esta mejora tras el deploy.

## Goals

- Feedback visible de "está enviando" en ambas vías, con cortes limpios al
  confirmar o fallar.
- Rechazo inmediato de adjuntos no-imagen/no-PDF y de > 5 MB, sin enviar
  nada y sin dejar el botón pegado en carga.
- Que los despliegues sean visibles en la recarga normal del navegador
  (no requiere reiniciar ni hard-reload a futuro).

## Non-Goals

- Validación del lado dueño (FormSubmit no la expone); la del voucher es
  solo cliente.
- Cambios de markup de los campos de texto, ni de pagos/factura
  (`Comprobante de pago condicional` queda igual).
- Versionado `?v=` de assets: con HTML `no-cache` no hace falta mantener
  un número de versión a mano (decisión abajo).
- Cachear más largo o más corto otros ficheros (imágenes, PDFs de
  descarga): hoy no hay motivo.

## Decisions

1. **Bolita con pseudo-elemento CSS sobre `aria-busy`, texto "Cargando…"**.
   `.btn[aria-busy="true"]::before` gira con `currentColor` (adaptándose al
   fondo del botón; el real es rojo, bolita igual que su texto blanco) y
   `cursor: wait` en el botón. El JS cambia ambas pantallas del estado
   ("Enviando…" → "Cargando…"). Alternativas descartadas: SVG/GIF inline
   desde JS (más bytes y duplicaría la señal que ya da el atributo) y un
   spinner GLOBAL de página (demasiado ruidoso para 3–8 s de envío).
   `prefers-reduced-motion` la deja estática via el bloque global de
   accessibility ya existente en `main.css` (línea de regla nueva dentro del
   `@media` que ya desactiva animaciones). No se reutiliza el rótulo
   "Enviando…" porque el dueño pidió literalmente "cargando…".

2. **Validación del voucher en un listener `change` + revisión en `submit`**,
   con constantes en JS: `PESO_MAXIMO = 5 * 1024 * 1024` bytes y tipos
   aceptados `image/*` o `application/pdf` (con fallback por extensión
   `.pdf` si el navegador no informa `type`). Mensaje en un `<p
   class="campo-error" hidden>` NUEVO dentro del `<label>` del voucher,
   añadido al generador (regeneración de las 8 fichas con el guard del
   proyecto, `404.html` intacto). Alternativa descartada: reutilizar el
   `.campo-error` del fieldset de comprobante (queda geográficamente lejos
   del voucher y está atado a la lógica de factura). Al detectar archivo
   inválido: mensaje visible + `input.value = ""` (borra la selección y el
   `required` queda pendiente, así el envío no pasa ni por el iframe ni por
   el AJAX) y el error permanece hasta elegir un archivo válido (evento
   `change` lo reevalúa). En `submit` hay una segunda pasada por si el
   cambio echó fuera de la vista (reserva de comportamiento).

3. **Caché: `no-cache, must-revalidate` para `index.html` (todas las
   rutas), `main.js` y `main.css` en `.htaccess`** vía `Files` +
   `IfModule mod_headers.c`. Con HTML no cacheado, la siguiente visita
   pide SIEMPRE el HTML fresco y las referencias nuevas de JS/CSS salen
   en limpio: no hace falta `?v=` a mano en ningún despliegue futuro.
   Alternativa descartada: bajar el max-age a 300s (sigue mostrando
   versiones desalineadas y gasta revalidaciones sin resolver el caso
   límite). El trade-off: cada visita pide revalidar 3 ficheros (~40 KB),
   coste marginalmente menor que el bug ya visto por el dueño. Nota
   honesta: los
   navegadores que ya CACHEARON el HTML con el max-age de 7 días NO lo
   revalidarán hasta expirar (la cabecera nueva sólo afecta respuestas
   nuevas); el dueño ya lo resolvió reiniciando, y los visitantes de hoy
   están igual que con el contadores existente. A futuro ya no.

4. **Commits separados por tema** (regla del repo): (1) docs del fix
   anterior (`AGENTS.md` + `CHANGELOG.md` editados sin commit), (2) este
   change de código (JS + CSS + .htaccess + fichas regeneradas + docs
   nuevas de este change en CHANGELOG).

## Risks / Trade-offs

- Un voucher de 4.9 MB pasa y FormSubmit igual podría tardar en procesarlo;
  el límite informático vale a partir del octavo byte, nada intermedio.
- HEIC de iOS: entra por `image/*` y puede pesar > 5 MB desde cámaras
  modernas — el límite de 5 MB rechazará esas fotos y el usuario perderá
  tiempo; alternativa (comprimir con canvas) queda fuera de scope.
- LiteSpeed: si el hosting ignora `Header set` en `.htaccess` (mod_headers
  no cargado), las cabeceras seguirán cacheando 7 días; verificación
  post-deploy con `curl -I` obligada (exit 0 no basta) y plan B documentado
  en tasks si falla.
- `input.value = ""` para limpiar file inputs: soportado en los navegadores
  vivos (Chrome, Firefox, Safari modernos); fallback seguro si fallara:
  `form.reset()` del campo solamente con `new InputFileReplacement`
  — fallback: se resuelve con `replaceWith(clon)` del input si se detecta el caso.

## Migration Plan

N/A — el repo es el despliegue (commit → push → publicar.sh); todo este
change sale por el flujo de despliegue existente.

## Implementación pendiente a considerar en este design

- El `AGENTS.md` y el `CHANGELOG.md` pendientes de commit (docs del fix
  anterior) describen el flujo del `5ab6263` y quedan como fuente única.
- `openspec/specs/inscripcion` sigue pendiente de sincronizar con el
  change implementado `validacion-formulario-inscripcion` (otro tema, no
  de este change).
