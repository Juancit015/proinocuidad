# Proposal

## Why

Los banners ampliados quedaron grandes para títulos ahora más largos (dos líneas con palabra clave): hay que compactarlos un 15% y reescalar el título en la misma proporción para mantener la jerarquía sin que el texto toque los bordes.

## What Changes

- `min-height` de banners en escritorio: `clamp(360px, 55vh, 520px)` → `clamp(306px, 46.75vh, 442px)` (−15% exacto en los tres términos).
- Título del banner: `clamp(2.4rem, 4vw, 3.2rem)` → `clamp(2.04rem, 3.4vw, 2.72rem)` (−15% exacto).
- Solo escritorio (`min-width: 861px`); móvil, overlay, efecto fijo y textos intactos.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `banners-paginas`: MODIFIED valores de tamaño del banner y del título (−15%). Depende de `cta-home-banners-sticky-pc` (implementado, pendiente de archivar): este change SHALL archivarse después de aquel, y su sync asume el texto ya fusionado de aquel delta.

## Impact

- `assets/css/main.css`: dos valores en el bloque `@media (min-width: 861px)` de banners.
- Sin cambios de HTML, textos, overlay, attachment, móvil ni producción (trabajo en local).
