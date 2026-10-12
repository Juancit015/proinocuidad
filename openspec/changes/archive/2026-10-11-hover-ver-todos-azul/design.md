# Design

## Context

- Reglas actuales en `assets/css/main.css`:
  - `.mega-panel .mega-cta` (línea ~236): `display: flex; justify-content: space-between; background: var(--azul); color: var(--blanco); padding: 13px 18px;`.
  - `.mega-panel .mega-cta:hover` (línea ~241): `background: var(--rojo)`. Este es el cambio a rojo que se quita.
  - `.mega-panel-compacto .mega-cta` (línea ~250): `font-size: 13px; padding: 10px 16px;`. No se toca.
  - `.mega-panel .mega-cta strong` (línea ~253): `color: inherit`.
- La flecha es `<span aria-hidden="true">→</span>` dentro de `.mega-cta` en las 13 páginas y en la plantilla del generador. No hay reglas que la oculten; el pedido solo fija sus propiedades.
- `--azul` = #101477 (en reposo). `--azul-oscuro` = #0b0e56 existe, pero el pedido indica #0b1257 para el hover.

## Goals / Non-Goals

**Goals:**
- Hover sin rojo; fondo `#0b1257`.
- Flecha visible en todos los estados y con desplazamiento de 4px en hover.

**Non-Goals:**
- No cambiar tamaño, padding, texto ni enlaces del botón.
- No cambiar el color de reposo (#101477, decisión del usuario).
- No tocar otras secciones, botones ni el menú principal.
- No añadir reglas a HTML ni a `tools/generar-fichas.mjs`.

## Decisions

**1. Cambio solo en CSS, sobre las reglas existentes.**
Se reemplaza `.mega-panel .mega-cta:hover { background: var(--rojo); }` por `background: #0b1257`, y se añade la flecha con selector `.mega-panel .mega-cta > span[aria-hidden="true"]` (no depende de clases nuevas, ya que el HTML no cambia). Así el alcance es el mismo que el de los botones "Ver todos" en las 13 páginas.

**2. Desplazamiento de la flecha.**
`display: inline-block; transition: transform .2s ease;` en reposo; `transform: translateX(4px)` en `.mega-cta:hover > span`. La transición se define en reposo para que el retorno también sea suave.

**3. Color y opacidad de la flecha.**
`color: #fff; opacity: 1; font-size: 16px;` en todos los estados (no se usa `:hover` para la opacidad).

**4. Especificidad.**
`.mega-panel .mega-cta` tiene la misma especificidad que `.mega-panel .mega-cta:hover` (más pseudoclase), por lo que el hover prevalece sin `!important`.

## Risks / Trade-offs

- [Riesgo] El pedido indicaba #0f1a6b para reposo, pero el sitio usa #101477. → Decisión del usuario: se mantiene #101477. Se registra aquí.
- [Riesgo] Un `span` sin clase depende de `aria-hidden`. → Si el marcado cambia, el selector no aplica; se verifica en las 13 páginas con grep.
- [Riesgo] `inline-block` con `font-size: 16px` puede alterar la altura del botón (13px del texto). → Se mide en el navegador que la altura no cambie respecto al estado actual (45px).

## Migration Plan

Actualizar `assets/css/main.css` (un bloque). No requiere regenerar fichas ni cambiar HTML. Rollback con `/tmp/opencode/respaldo-submenu-compacto/main.css`.

## Open Questions

Ninguna.
