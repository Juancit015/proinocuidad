# Proposal

## Why

En móvil (360–390px) la ficha del diplomado permite arrastre horizontal con espacios blancos a los lados: filas como la del CCI en monospace y el padding del temario desbordan el viewport. Hay que eliminarlo sin romper el resto del diseño.

## What Changes

- La fila copiable de pago (`.pago-copiable`, caso CCI + botón) se envuelve en móvil sin empujar el ancho.
- El padding izquierdo del temario (`.modulo-lista`) se reduce en móvil.
- Los hijos de los grids de ficha llevan `min-width: 0` para que ninguna fila larga estire la página.
- Solo CSS en `assets/css/main.css`; sin cambios de textos, enlaces, datos ni markup.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: la ficha de curso de dos columnas (`.ficha-layout`) no SHALL tener desplazamiento horizontal en 360/390px, manteniendo el sidebar sticky en escritorio.

## Impact

- `assets/css/main.css` (media queries existentes de la ficha).
- Sin impacto en el generador, listados, otras páginas ni desktop.
