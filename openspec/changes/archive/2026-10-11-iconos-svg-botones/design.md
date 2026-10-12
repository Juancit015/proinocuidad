# Design

## Context

- `.btn` (main.css ~110) define la base de botones; `.btn-sm` usa 0.85rem. Las tarjetas usan `.btn.btn-rojo.btn-sm` y `.btn.btn-whatsapp.btn-sm` dentro de `.card-acciones` (main.css 326-327, ya en columna desde `tarjetas-botones-apilados`).
- Templates inline de tarjetas: `index.html` (~357-358) y `cursos/index.html` (~235-236). Generan el mismo marcado.
- Hero de Inicio: `index.html` línea 156 ("Ver cursos", `.btn.btn-rojo`) y 157 ("Consultar por WhatsApp", `.btn.btn-blanco`).
- Menú: `a.btn-aula-nav` "Aula Virtual" en la cabecera de todas las páginas (ej. `index.html` 138, `cursos/index.html` 114). Regla en main.css ~133-137 y `.nav-menu .btn-aula-nav`.
- Glifo oficial de WhatsApp: ya existe inline en `index.html` línea 337 (`.flotante-whatsapp`, viewBox 0 0 24 24, `fill="currentColor"`). Se reutiliza; no hay descargas.
- Ver proposal.md y specs/cursos/spec.md.

## Goals / Non-Goals

**Goals:**
- Ícono SVG de 18px antes del texto en: "Más información" (+), "WhatsApp" (tarjetas), "Consultar por WhatsApp", "Ver cursos" (→), "Aula Virtual" (birrete o flecha).
- Mismo marcado de tarjetas en `index.html` y `cursos/index.html`.

**Non-Goals:**
- No cambiar tipografía, colores, `border-radius`, sombras, tamaños ni posiciones de botones.
- No tocar el enlace "Aula Virtual" del footer ni otros `.btn`.
- No modificar el botón flotante de WhatsApp.

## Decisions

**1. Reglas de SVG compartidas por clase, no por botón.**
Se añade una regla en main.css: `.btn svg { width: 18px; height: 18px; flex: none; }` con `fill: currentColor` en el SVG de WhatsApp y `stroke: currentColor` en los trazos (+, →, birrete). Alternativa: estilos inline por SVG, descartada por repetición.

**2. Display en los botones afectados.**
`display: inline-flex; align-items: center; justify-content: center; gap: 8px;` solo en `.card-acciones .btn`, `.hero-acciones .btn` (los dos del hero) y `.btn-aula-nav`. Evita tocar `.btn` global, que es la base de otros botones. Si `.btn` ya es `inline-flex` en su base, no se repite.

**3. "+" como SVG reemplaza el texto "+".**
El texto actual (en change archivado) es "+ Más información"; con SVG el "+" de texto se elimina para no duplicar. El SVG va con `aria-hidden="true"`; el texto "Más información" sigue siendo el nombre accesible. Requiere ajustar el spec (MODIFIED en specs/cursos).

**4. Ícono de "Aula Virtual".**
Birrete SVG (trazo, stroke currentColor) para coherencia con el rol académico. Flecha queda como alternativa si el birrete compite visualmente en el menú.

**5. WhatsApp en el hero.**
Usa el mismo glifo que el flotante, `fill: currentColor`, para que tome el color del botón blanco.

## Risks / Trade-offs

- [Riesgo] El menú "Aula Virtual" aparece en todas las páginas; un error de marcado afecta a 13 páginas. → Mitigación: cambio en un único patrón repetido; verificar con grep que el conteo es el mismo en todas.
- [Riesgo] `inline-flex` en botones de ancho variable puede mover el texto. → Mitigación: `gap` y centrado; QA visual en escritorio y móvil.
- [Riesgo] Hay 2 templates de tarjeta duplicados. → Mitigación: verificar con `diff` que ambos quedan idénticos salvo rutas.

## Migration Plan

Publicar `main.css`, `index.html` y `cursos/index.html` juntos. Rollback con respaldos previos a editar (`/tmp/opencode/respaldo-iconos-svg/`).

## Open Questions

Ninguna. Supuestos registrados: (a) el "+" de texto se reemplaza por el SVG; (b) "Aula Virtual" se refiere solo al enlace del menú de cabecera, no al del footer; (c) el glifo WhatsApp se reutiliza del flotante existente.
