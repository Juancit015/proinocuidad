# Proposal

## Why

En desktop redimensionado (ancho intermedio ~681–1040px) la ficha del diplomado muestra una barra de desplazamiento horizontal sin sentido: el fix anterior (`ficha-sin-desborde-movil`) solo cubrió ≤680px y los bloques de 2–3 columnas siguen desbordando en el rango intermedio.

## What Changes

- Los grids de ficha de 2–3 columnas (pagos, metodología, stats) colapsan o contienen su contenido en el rango 681–1040px sin generar desplazamiento horizontal.
- Las filas flex no envolventes (`.pago-copiable`, `.pago-card-top`, `.pago-qr-destacado`) se envuelven en el rango intermedio.
- El `min-width: 0` de hijos de grids se extiende al rango intermedio.
- Solo CSS en `assets/css/main.css`; sin cambios de textos, enlaces, datos ni markup.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: la ficha de curso no SHALL tener desplazamiento horizontal en el rango intermedio (681–1040px), manteniendo el apilado a una columna y el sidebar no-sticky ya definidos para ≤1040px.

## Impact

- `assets/css/main.css` (media queries de la ficha).
- Sin impacto en el generador, listados, otras páginas ni desktop ancho (el layout de 2 columnas + sticky se conserva por encima de 1040px).
