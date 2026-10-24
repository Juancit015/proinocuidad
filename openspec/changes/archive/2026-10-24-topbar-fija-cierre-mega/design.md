# Design

## Context

Dos defectos verificados en escritorio (modo pantalla completa), medidos con Playwright a 1440px sobre `127.0.0.1:8899`:

- **A — El mega-panel no se cierra tras un clic en ancla.** El panel se abre por `:hover` y se mantiene por `:focus-within` (`assets/css/main.css:229`). Al hacer clic en un ítem de ancla de la misma página (los 4 servicios en `servicios/index.html` usan `href="#…"`, líneas 53–56), el foco queda en el enlace dentro del `.nav-drop`, y el listener existente de cierre en `assets/js/main.js` (líneas ~114–118) solo actúa si el enlace tiene `target` o si `(max-width: 860px)` coincide: en escritorio no hace nada. Sin foco, la regla `:focus-within` se limpia sola y el panel se cierra por su propio CSS.
- **B — La `.topbar` desaparece al scroll.** Medida: 35px de alto, `position: static` (main.css:144–153). Existe `.topbar { display: none }` dentro del `@media (max-width: 860px)` (main.css:581). La `.site-header` es `position: sticky; top: 0; z-index: 50` (main.css:154–157).
- **Desplazamiento de anclas vigente:** `[id] { scroll-margin-top: 84px }` (main.css:162): 76px de cabecera + 8px de aire. Con la topbar pegada, hay que reservar 35px más en escritorio.

## Goals / Non-Goals

**Goals:**
- Cerrar el mega-panel al activar un ancla de la misma página en escritorio, con la solución más pequeña posible sobre el listener que ya existe.
- Que la topbar acompañe el scroll en escritorio y la cabecera quede unida debajo de ella.
- Recalcular el `scroll-margin-top` en escritorio para que las secciones de destino queden legibles bajo el conjunto pegado.

**Non-Goals:**
- Cero cambios de markup: no se toca ningún HTML ni los generadores `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` (y con ello, ni barra de navegación que re-generar).
- No se cambia el menú móvil ni la topbar en ≤860px: allí `display: none` arranca la topbar del flujo y `top` de la cabecera sigue en `0`.
- No se re-dispara el mega-panel ni se retocan sus estilos visuales.

## Decisions

### A: cierre por `blur()` en el listener existente (JS-only)

- Se extiende el listener de clics de `.nav-menu a` en `main.js`: si no es `target="_blank"`, no es móvil, y el `href` empieza con `#` (ancla de la misma página), se hace `a.blur()` tras el clic. Sin foco dentro del `.nav-drop`, `:focus-within` se desactiva y el panel se cierra por su regla CSS: sin clases de estado, sin `setTimeout`, sin tocar `:hover`.
- **Por qué no CSS-only:** quitar `:focus-within` del selector de apertura (main.css:229) ya mataría la apertura por teclado (Tab sobre `a` del drop), que es comportamiento accesible vigente y no hay que perderlo. El blur elimina solo el foco residual tras un clic de ratón.
- **Por qué no cerrar por clases (`cerrarMenu`)**: esa vía toca `menu-abierto` y el bloqueo de scroll del fondo, que son del menú móvil; en escritorio son inocuos pero innecesarios, y `blur()` es una línea dentro del listener que ya existe.
- **Fallback documentado:** si en la verificación con navegador real el panel no cerrara (p. ej. algún navegador que retenga el foco pese al `blur()`), se añadiría una clase guard en el `.nav-drop` del enlace pulsado y su regla CSS de cierre; se decidirá en apply solo si la medición lo exige.

### B: sticky en la topbar + `top` de la cabecera = altura de la topbar

- `.topbar { position: sticky; top: 0; z-index: 51 }` en escritorio (declaro fuera del media actual de la clase, que es base de todas las páginas, y dejo el `display: none` de ≤860px tal cual, que anula todo el pegado al ocultar el elemento). z-index 51 (encima del 50 de la cabecera) para que, al quedar unidas, la sombra de la cabecera no pinte sus 2px sobre la franja azul de la topbar.
- `.site-header { top: 35px }` dentro de una media de escritorio (`@media (min-width: 861px)`), con la altura de la topbar medida. La topbar sticky es el elemento anterior en el flujo: al pegarse ella primero, la cabecera con ese `top` queda exactamente debajo.
- **Riesgo del doble pegado:** si la topbar midiera algo distinto de 35px en alguna página o estado, la cabecera quedaría superpuesta o con hueco. Mitigación: todas las páginas comparten la misma topbar y la misma fuente (0.82rem, padding 7px 0); la verificación de Playwright medirá el alto de `.topbar` y el `top` resultante de la cabecera pegada, y si difieren se usará una variable CSS calculada (`--altotopbar`) en lugar del valor fijo. No se mete la topbar dentro del elemento sticky de la cabecera (cambiaría el markup de 18 páginas).

### `scroll-margin-top` en escritorio

- En `@media (min-width: 861px)`: `[id] { scroll-margin-top: 119px }` (35 topbar + 76 cabecera + 8 aire, con los mismos 8px de aire que ya reserva la regla vigente). En ≤860px la regla base de 84px no se toca.

## Risks / Trade-offs

- **a11y del `blur()`:** quitar el foco tras un clic es el mismo patrón que ya usa el cierre con Escape (main.js:94 `a.blur()`), así que no introduce una técnica nueva en el sitio.El foco del teclado no se toca: el blur solo corre en el handler de clic, y Tab sigue abriendo el panel por `:focus-within`.
- **Valor fijo 35px/119px:** la topbar es idéntica en las 18 páginas, pero si el número cambia hay que cambiar la media en CSS (si acaso, variable). Verificación obligatoria del alto real en apply antes de dar por bueno el 119px.
- **El salto por ancla con `html { scroll-behavior: smooth }`:** el cierre del panel y el scroll animado conviven sin problema (el panel es CSS y no depende del scroll), pero el test de Playwright debe esperar el fin del scroll antes de medir la posición del destino.
- **Un solo requisito MODIFIED:** conservar los 2 escenarios volcados del spec principal con nombres idénticos; el validador lo exige.

## Migration Plan

1. JS: blur de anclas same-page en escritorio (listener existente).
2. CSS: sticky topbar + `top` de cabecera en ≥861px + `scroll-margin-top: 119px` en ≥861px.
3. Verificación Playwright a 1440 (y 1024 y 390 para los límites): clic en ancla del mega → panel cerrado y destino legible; scroll con el conjunto unido; 0 desborde; móvil sin cambios.
4. CHANGELOG.
