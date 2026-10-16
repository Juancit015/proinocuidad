# Proposal

## Why

En móvil la cabecera se desplaza con el contenido: al bajar, el logo y el botón de menú se van y hay que subir hasta arriba para volver a abrirlos. En un teléfono eso son varios scrolls largos en páginas como las fichas de curso. La cabecera ya es `sticky` en escritorio y el motivo que impedía serlo también en móvil —el contexto de anclaje del panel desplegable— ya no aplica, porque `position: sticky` también es un valor posicionado.

## What Changes

- La cabecera (`.site-header`) pasa a ser `sticky` en todas las pantallas, sin diferencia entre escritorio y móvil. Se elimina la regla `.site-header { position: relative; }` del bloque `@media (max-width: 860px)`.
- El panel del menú móvil sigue anclado a la cabecera y sigue abriendo y cerrando con normalidad, porque `sticky` conserva el contexto de posicionamiento para sus descendientes absolutos.
- El requisito de la spec `navegacion-global` que hoy se llama "Cabecera fija solo en escritorio" pasa a describir el comportamiento real, con su nombre y sus escenarios actualizados.

**Fuera de alcance (no objetivos):** no se cambia el diseño, la altura ni el contenido de la cabecera; no se toca el menú móvil ni su animación, ni el botón de cerrar, ni los botones «+» de los acordeones; no se añade JavaScript nuevo para detectar el scroll; no se modifica el comportamiento de escritorio, que ya es sticky; no se toca ninguna otra regla del bloque móvil ni el `max-height` del panel.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `navegacion-global`: la cabecera SHALL ser fija también en móvil, y el requisito deja de estar condicionado al ancho de pantalla.

## Impact

- `assets/css/main.css` (una línea eliminada dentro de `@media (max-width: 860px)`).
- `openspec/specs/navegacion-global/spec.md` (al archivar).
- `CHANGELOG.md`.
- Sin cambios de HTML: las 18 páginas comparten la misma clase `.site-header` y la regla base ya dice `position: sticky`. Sin JavaScript nuevo, sin dependencias y sin efecto en el SEO.