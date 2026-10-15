# Proposal

## Why

En las fichas de cursos (`cursos/*/index.html`) aparece una banda blanca a la derecha en varios anchos, también en móvil: la página desborda horizontalmente. Los fixes anteriores cubrieron móvil (archivado) e intermedio 681–1040px (tareas completas, sin archivar), pero el síntoma persiste, y hay dos changes activos tocando la misma ficha (`rediseno-fichas-cursos` a medio aplicar, `ficha-sin-espacio-prefooter`).

## What Changes

- La ficha de curso no SHALL generar desplazamiento horizontal en ningún ancho: escritorio ancho (>1040px), rango intermedio (681–1040px) y móvil (≤680px, incluidos 360/390px).
- Se aísla la causa por bisección (ocultar secciones/bloques de a uno con capturas hasta que la banda derecha desaparezca) y se elimina con el ajuste mínimo, solo CSS en `assets/css/main.css` salvo que la causa sea markup (entonces `tools/generar-fichas.mjs` + regenerar las 8 fichas).
- Sin cambios de contenido, textos, enlaces, datos, precios ni SEO. Layout de 2 columnas + sticky en escritorio ancho y apilado en ≤1040px intactos.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: el requisito "Ficha de dos columnas sin desplazamiento horizontal" (hoy limitado a móvil) se extiende a todos los anchos, incluidos escritorio ancho y rango intermedio.

## Impact

- `assets/css/main.css` (media queries y reglas de contención de la ficha).
- Solo si la causa es markup: `tools/generar-fichas.mjs` + las 8 fichas regeneradas.
- Coordinación: convive con `ficha-sin-desborde-intermedio` (fix intermedio completo sin archivar), `ficha-sin-espacio-prefooter` (aire vertical, no horizontal) y `rediseno-fichas-cursos` (centrado a medio aplicar, 2/6). Este change no rediseña ni centra: solo elimina el desborde.
