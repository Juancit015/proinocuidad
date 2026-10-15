# Proposal

## Why

En las fichas de curso queda un espacio blanco incoherente entre el final del contenido (tarjeta del formulario) y el footer. La estructura HTML está limpia (sin elementos vacíos), por lo que es un remanente de estilos de fixes anteriores: hay que aislar la causa y eliminarla.

## What Changes

- Se aísla la causa del espacio pre-footer (bisección por secciones con capturas, como en diagnósticos anteriores) y se elimina con un ajuste mínimo de CSS.
- El footer queda a distancia coherente del contenido (padding de `.ficha-cuerpo` + margen de última sección, ~70px) en desktop y móvil.
- Solo CSS en `assets/css/main.css`; sin cambios de contenido, markup ni diseño.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: la ficha de curso no SHALL dejar espacio residual entre el fin de su contenido y el footer, en desktop ni en móvil.

## Impact

- `assets/css/main.css` (ajuste puntual).
- Sin impacto en el generador, listados, otras páginas ni responsive ya verificado.
