# Design

## Context

See `proposal.md` - Why. El hallazgo se detectó midiendo `scrollWidth` vs `clientWidth` a 360px con Playwright: la sección `.cta-home` de Inicio desbordaba 24px por la derecha. El resto de la página ya estaba auditado a 360px (specs `diseno-responsive`); este bloque quedó fuera de auditorías anteriores.

## Goals / Non-Goals

**Goals:**
- Eliminar el desplazamiento horizontal en `.cta-grid` a 360, 390 y 412px (y tableta).
- Mantener la disposición de dos columnas en escritorio (≥861px) sin cambios visuales.
- No tocar HTML ni contenido (cumple "Contenido sin cambios").

**Non-Goals:**
- No rediseñar la sección CTA ni cambiar sus textos/colores.
- No aplicar `overflow-x: hidden` global (prohibido por el proyecto: rompe `position: sticky`).

## Decisions

1. **Causa raíz**: `.cta-grid` usaba `grid-template-columns: 1.1fr 0.9fr` sin `minmax(0, ...)`. Los ítems de grid tienen `min-width: auto` por defecto, igual al min-content. El correo largo (`formacion_academica@proinocuidad.com`) es un token inpartible, por lo que la columna se ensanchaba hasta ~370px dentro de un contenedor de 331px.
   - **Decisión**: cambiar a `minmax(0, 1.1fr) minmax(0, 0.9fr)` y añadir `min-width: 0` a `.cta-info`, `.cta-items` y `.cta-item`, más `overflow-wrap: anywhere` en el texto del ítem.
   - **Alternativa considerada**: reducir el correo a un enlace corto. Rechazada: cambia el contenido (violación de "Contenido sin cambios") y no resuelve el problema estructural para otros tokens largos.

2. **Apilado en móvil**: la media query `@media (max-width: 860px) { .cta-grid { grid-template-columns: 1fr; } }` ya existía, pero el track `1fr` equivale a `minmax(auto, 1fr)`, que también se ensancha por min-content. Cambiado a `minmax(0, 1fr)`.
   - **Alternativa**: `overflow-x: hidden` en `.cta-home`. Rechazada por la restricción del proyecto.

3. **Verificación**: medir `scrollWidth === clientWidth` con Playwright a 360, 390, 412 y 768px, y revisar visualmente la sección.

## Risks / Trade-offs

- [Riesgo] Otros bloques con grids de 2 columnas sin `minmax(0, ...)` pueden tener el mismo problema → Mitigación: la auditoría Playwright a 360px ya cubre toda la página; si aparece otro desborde, se añade la misma regla.
- [Trade-off] `overflow-wrap: anywhere` puede partir el correo en mitad de una línea en móvil muy estrecho; aceptable, ya que el enlace sigue siendo clickeable y el texto legible.

## Migration Plan

1. Editar `assets/css/main.css` (reglas `.cta-grid`, `.cta-info`, `.cta-items`, `.cta-item`, `.cta-item > span`).
2. Verificar con Playwright (scrollWidth == clientWidth) a 360/390/412/768px.
3. Commit y deploy vía `tools/publicar.sh` (la lista blanca incluye `assets/`).

## Open Questions

(none)