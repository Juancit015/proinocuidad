# Design

## Context

- `.card-acciones { display: flex; gap: 8px; margin-top: auto; }` + `.card-acciones .btn { flex: 1; justify-content: center; }` (main.css 326-327): fila horizontal, mitad cada uno.
- `.btn` base: Outfit 600, 0.95rem; `.btn-sm`: 0.85rem. Los botones de tarjeta usan `btn-sm`.
- Los 2 templates inline (`index.html` línea ~356, `cursos/index.html` línea ~235) generan el mismo marcado; `cursos-data.js` solo aporta datos (flyer, títulos), no botones.
- El change de radio 4px sigue activo pero solo toca `border-radius`; sin conflicto.
- Ver `proposal.md` y `specs/cursos/spec.md`.

## Goals / Non-Goals

**Goals:**
- Botones apilados al 100% en tarjetas, "+" en Más información, tipografía regular ~16px en una línea.
- Mismo resultado en Inicio y Cursos, desktop y móvil.

**Non-Goals:**
- No cambian colores, radios, sombras, `href`, ni el botón WhatsApp (salvo posición/ancho).
- No se tocan otras secciones ni otros `.btn` fuera de tarjetas.

## Decisions

**1. Columna con `flex-direction: column` + `align-items: stretch`.**
`.card-acciones { flex-direction: column; align-items: stretch; }` da 100% a ambos sin tocar cada botón. Se conserva `gap: 8px` y `margin-top: auto` (alineación inferior de tarjetas). Alternativa (`width: 100%` por botón) descartada: más reglas para lo mismo.

**2. Tipografía solo en ámbito `.card-acciones .btn`.**
`font-weight: 500; font-size: 1rem; white-space: nowrap; text-align: center; justify-content: center;` Vence a `.btn-sm` (0.85rem) por especificidad posterior. No se toca `.btn` global. `nowrap` + misma línea garantizados; en 200px de tarjeta "+ Más información" (~16 caracteres a 16px) cabe sin desborde.

**3. "+" como texto del enlace en los 2 templates.**
`>Más información</a>` → `>+ Más información</a>` en ambos inline (1 línea cada uno). Alternativa (`::before` con "+") descartada: el lector de pantalla debe anunciar el mismo texto visible; como texto es indexable y accesible.

## Risks / Trade-offs

- [Riesgo] `nowrap` en tarjetas angostas (<200px) podría desbordar. → Mitigación: la grilla mínima es 2 columnas (~250px por tarjeta); QA móvil lo confirma.
- [Riesgo] Duplicación de templates (2 archivos generan lo mismo). → Mitigación: cambio de 1 línea en cada uno; la verificación exige ambos idénticos.

## Migration Plan

- Publicar `main.css` + `index.html` + `cursos/index.html` juntos. Rollback: respaldos (tarea 1.1).

## Open Questions

Ninguna.
