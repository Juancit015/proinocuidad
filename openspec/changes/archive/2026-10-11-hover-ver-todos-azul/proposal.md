# Proposal

## Why

Al pasar el cursor sobre "Ver todos los cursos" y "Ver todos los servicios" dentro de los submenús, el fondo cambia a rojo. El pedido es mantener la identidad azul del botón y usar solo un oscurecimiento sutil como señal de hover. La flecha "→" debe verse de forma consistente en todos los estados y tener un desplazamiento leve al pasar el cursor.

## What Changes

- En `assets/css/main.css`, reglas de `.mega-panel .mega-cta` (los botones "Ver todos los cursos" y "Ver todos los servicios" de los dos submenús, en las 13 páginas):
  - El hover deja de usar `--rojo`. El fondo en reposo se mantiene en `--azul` (#101477, decisión del usuario, en lugar del #0f1a6b del pedido).
  - Hover: fondo `#0b1257`, un tono más oscuro, sin rojo.
  - La flecha `→` se muestra en todos los estados: color `#fff`, opacidad 1, `font-size: 16px`, `display: inline-block`.
  - La flecha se desplaza `transform: translateX(4px)` al pasar el cursor, con `transition: transform .2s ease`.
- Sin cambios de tamaño, padding, texto ni enlaces del botón. Sin cambios en otras secciones ni en el resto de botones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `navegacion-global`: el requisito "Mega-menú al hover" describe el comportamiento visual de los botones "Ver todos" del submenú (sin rojo al hover, flecha visible con desplazamiento).

## Impact

- `assets/css/main.css`: reglas de `.mega-panel .mega-cta` y su hover.
- Sin cambios HTML ni en `tools/generar-fichas.mjs` (solo CSS, ya compartido por todas las páginas).
- Delta spec en `specs/navegacion-global/spec.md`.
- Sin cambios SEO.
