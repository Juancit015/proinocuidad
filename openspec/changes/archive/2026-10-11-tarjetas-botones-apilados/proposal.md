# Proposal

## Why

Las tarjetas de curso muestran sus dos botones lado a lado y "Más información" sin prefijo. Apilarlos al 100% con "+" y tipografía regular mejora el escaneo visual en grillas de 2-4 columnas y en móvil, siguiendo la referencia Food Consulting. Solo tarjetas de curso; nada más cambia.

## What Changes

- En `assets/css/main.css`, `.card-acciones` pasa a `flex-direction: column; gap: 8px` (conserva `margin-top: auto`) y `.card-acciones .btn` a ancho total, `font-weight: 500`, `font-size: 1rem` (~16px), `white-space: nowrap`, texto centrado. Vale en desktop y móvil (sin media queries).
- En los 2 templates inline que generan tarjetas (`index.html` e `cursos/index.html`), el enlace pasa de "Más información" a "+ Más información". El botón WhatsApp no cambia (solo posición/ancho por el apilado).
- Sin cambios de colores, `border-radius` (rige el change de 4px), sombras, `href`, textos de cursos, ni otras secciones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `cursos`: las tarjetas SHALL mostrar los dos botones apilados verticalmente a ancho completo, con "+ Más información" (MODIFIED: disposición y etiqueta del primer botón).

## Impact

- `assets/css/main.css` (reglas `.card-acciones`) + los 2 bloques JS inline (1 línea cada uno).
- Delta spec en `specs/cursos/spec.md`.
- Sin cambios SEO (mismos destinos y contenido indexable).
