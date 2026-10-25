# Proposal

## Why

El formulario de inscripción en producción funciona (commit `5ab6263`), pero el
dueño reportó dos carencias de uso:

1. **Sin indicador de envío**: al tocar "Enviar inscripción" el botón solo
   cambia de texto ("Enviando…") sin ninguna señal visual de carga; si la
   conexión tarda, el usuario no sabe si algo está pasando y re-toca el botón
   (el botón sí queda deshabilitado, pero no se ve como "ocupado").
2. **Adjuntos sin límite**: el campo voucher acepta cualquier archivo que el
   selector de sistema deje elegir (incluidos vídeos). Un vídeo pesado de
   decenas de MB se queda "Enviando…" indefinidamente y el correo de
   FormSubmit puede pasar del límite de adjunto (5 MB en su plan actual);
   FormSubmit no aplica ninguna validación de tipo o tamaño por nosotros.

Además, el dueño confirmó (2026-10-25, tras reiniciar el navegador) que el fix
del aviso verde ya sale; la razón de que NO lo viera antes es el **caché**:
LiteSpeed sirve HTML/JS/CSS con `max-age=604800` (7 días) y un navegador
cacheado revive bugs corregidos y no ve mejoras nuevas sin reiniciar. Sin
frenar ese caché, este mismo cambio sería invisible para navegadores que ya
visitaron el sitio: el `no-cache` de `main.js` ya está editado en el repo sin
commit (ver design), pero el HTML sigue cacheado.

## What Changes

- **Indicador de envío visible**: durante el envío (ambas vías: AJAX sin
  voucher y POST clásico con voucher en iframe) el botón muestra una bolita
  giratoria (`aria-busy`) junto al texto de carga y `cursor: wait`. El texto
  pasa de "Enviando…" a "Cargando…" (palabra del dueño). La bolita gira hasta
  la confirmación (aviso verde o error) en ambas vías. Con
  `prefers-reduced-motion` la bolita queda estática (arco fijo, sin giro).
- **Límite del voucher en el cliente**: solo se aceptan imágenes (jpg, png,
  gif, webp, heic) y PDF; tamaño máximo **5 MB** validado al elegir archivo y
  en el submit. Un archivo inválido NO se envía: mensaje inline junto al campo
  (reutilizando el patrón `.campo-error`), el botón nunca queda en
  "Cargando…", y la selección se limpia. La validación corre también tras
  `change` del archivo (antes de la marca del botón), de modo que el usuario
  ve el error al instante sin esperar tocar "Enviar".
- **El caché deja de esconder despliegues**: `.htaccess` marca `no-cache,
  must-revalidate` para `index.html` (todas las carpetas) y para `main.js`;
  con el HTML no cacheado, el navegador refresca el JS/CSS/contenido en la
  primera recarga tras cada despliegue y este cambio es visible sin reiniciar.
- **Fuente única**: la validación y el texto "Cargando…" corren en
  `assets/js/main.js` (nadie edita 8 fichas a mano); el HTML del voucher no
  cambia: el `accept` existente solo filtra el selector de archivos del
  sistema, no valida nada por sí solo.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `inscripcion`: requisito "Formulario de inscripción en ficha" gana dos
  exigencias nuevas: indicador de envío visible durante el POST (bolita +
  texto, habilitado al volver la confirmación o el error) y validación
  local del voucher (imagen/PDF ≤ 5 MB, rechazo inline sin enviar el
  formulario). Los escenarios vigentes del requisito se conservan.

## Impact

- `assets/js/main.js`: texto "Cargando…" en ambas vías; validación del voucher
  (cambio de tipo/tamaño en `input[name="voucher"]` y en submit) con mensaje
  en el contenedor de error del formulario; el POST con voucher no parte con
  adjunto inválido.
- `assets/css/main.css`: estilos de la bolita ya editados en el repo sin
  commit (este change los formaliza y verifica, ver design), con el caso
  `prefers-reduced-motion`.
- `.htaccess`: sustituye el `max-age` actual de `index.html` y `main.js`
  por `no-cache`.
- `CHANGELOG.md`: entrada con los resultados medidos.
- Sin specs nuevas: lo que cambia es el requisito `inscripcion` (MODIFIED);
  no se toca la vía FormSubmit ni el flujo clásico sin JS.
