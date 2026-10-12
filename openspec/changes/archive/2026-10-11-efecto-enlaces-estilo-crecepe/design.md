# Design

## Context

- Proinocuidad (`assets/css/main.css`): `a { color: var(--azul); text-decoration: none; }`, `a:hover { text-decoration: underline; }`. `.card .card-link { color: var(--rojo); font-weight: 600; font-size: 0.9rem; }` sin `display`, sin transición, sin regla `:hover` propia: hereda el subrayado global.
- Referencia Crecepe (`crecepe/assets/css/styles.css`, líneas 917-927): `.service-link { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--accent-dark); font-size: 0.95rem; transition: gap 0.3s ease; }` + `.service-link:hover { gap: 13px; }`. Sin subrayado, sin `::after`; la flecha es un SVG inline que se desplaza por el cambio de gap. En móvil no hay hover pegajoso problemático porque el gap solo anima con puntero; no usa media query.
- Proinocuidad usa "→" como carácter de texto, no SVG. El gap entre texto y flecha no existe como tal (es un solo nodo de texto). Para replicar el desplazamiento hay que separar la flecha o animar otra propiedad.
- Alcance real: hoy solo `index.html` tiene `.card-link` (5 enlaces). El resto de `.btn`, `.mega-cta`, nav y footer quedan fuera.
- Ver `proposal.md` para motivación y respuesta SEO resumida.

## Goals / Non-Goals

**Goals:**
- Replicar la micro-interacción Crecepe (flecha que se desplaza al hover, sin subrayado) en `.card-link` con la paleta Proinocuidad.
- Cambio solo-CSS, sin tocar `href`, textos, ni SEO.

**Non-Goals:**
- No se convierten los "→" a SVG ni se reescriben textos ancla.
- No se tocan botones, mega-menú, nav, footer, ni el subrayado global para el resto de enlaces.
- No se añaden `aria-label` descriptivos (mejora SEO opcional, fuera de alcance).

## Decisions

**1. Selector único `.card .card-link` como punto de aplicación.**
Todo enlace "similar" hoy usa esa clase. Una sola regla cubre los 5 enlaces actuales y los futuros que usen la misma clase, sin lista de URLs. Alternativa (reglas por página) descartada: frágil y duplicada.

**2. Replicar el efecto con `gap` + `span` para la flecha, sin `::after` subrayado.**
Crecepe anima `gap` de un flex con SVG. En Proinocuidad la flecha es texto ("→"), así que el `gap` no aplica directo. Opción elegida: en CSS, `.card .card-link { display: inline-flex; align-items: center; gap: 8px; transition: gap 0.3s ease; text-decoration: none; }` y `.card .card-link:hover { gap: 13px; text-decoration: none; }`, con la flecha como elemento flex separado para que el gap la desplace. La flecha es un SVG inline de 16 px (`stroke: currentColor`, grosor 2.5), igual que `.service-link` de Crecepe, con `aria-hidden="true"`. Alternativa (solo `transition: transform` sobre el enlace completo) descartada: movería también el texto, no solo la flecha como en Crecepe. Alternativa (`::after` con línea) descartada: es el efecto antiguo que el usuario quiere quitar, no el de Crecepe. Alternativa (mantener "→" de texto) descartada por el usuario: el glifo es delgado y no iguala el grosor de Crecepe.
- El SVG lleva `aria-hidden` para no alterar la lectura por lector de pantalla.
- Se mantiene `color: var(--rojo)`, `font-weight: 700` y se sube `font-size` a 0.95rem para igualar a Crecepe (0.9rem → 0.95rem). Regla `.card .card-link svg { width: 16px; height: 16px; flex: 0 0 auto; }`.

**3. Excluir `.card-link` del subrayado global en hover y foco.**
Añadir `.card .card-link:hover { text-decoration: none; }` (y equivalente en `:focus-visible`). Sin esto, la regla global `a:hover { text-decoration: underline; }` seguiría subrayando. No se toca la regla global: el resto de enlaces conserva su comportamiento.

**4. Respetar `prefers-reduced-motion` y el foco de teclado.**
Envolver la transición en `@media (hover: hover)` y añadir `@media (prefers-reduced-motion: reduce) { .card .card-link { transition: none; } }`. En `:focus-visible` mantener color y sin subrayado, sin exigir el desplazamiento. Alternativa (sin estas medias) descartada: el drawer móvil y usuarios con movimiento reducido verían animación residual.

**5. Sin cambios SEO por construcción.**
Solo cambian propiedades CSS de `:hover`/`:focus` y un `span aria-hidden` decorativo. No cambian `href`, texto ancla indexable, canonical, OG, JSON-LD, sitemap ni robots. El crawler ve el mismo DOM de enlaces.

## Risks / Trade-offs

- [Riesgo] El "→" como carácter puede partir de línea dejando la flecha sola (viuda). → Mitigación: el `span` + `white-space` no se fuerza; si aparece, se acepta por ser decorativo y raro en textos cortos.
- [Riesgo] `gap` en flex inline no anima en navegadores muy antiguos. → Mitigación: degradación elegante (sin animación, enlace intacto); sin impacto funcional ni SEO.
- [Riesgo] Cambiar `font-weight` 600 → 700 altera levemente el ancho de tarjeta. → Mitigación: cambio de 1 paso, verificado visualmente en la tarea de QA; no afecta layout global.
- [Trade-off] Hay que editar 5 líneas HTML solo para envolver la flecha en `span`. Es marcado mínimo y decorativo (`aria-hidden`), no contenido.

## Migration Plan

- Cambio solo-CSS + 5 `span` decorativos en `index.html`. Despliegue: publicar `assets/css/main.css` e `index.html` juntos.
- Rollback: revertir esos dos archivos desde el respaldo previo (la tarea 1.1 lo exige).

## Open Questions

Ninguna. El inventario de `.card-link` (5 en `index.html`) se verificará en la primera tarea de implementación con `grep`.
