# Tasks

## 1. Cierre del mega-panel (JS en `assets/js/main.js`)

- [x] 1.1 En el listener de clics de `.nav-menu a` (líneas ~114–118), añadir el caso escritorio: si el enlace no tiene `target`, `(max-width: 860px)` no coincide, y el `href` empieza con `#` (ancla de la misma página), hacer `a.blur()` tras el clic. No tocar la vía móvil ni la de `target="_blank"`.
- [x] 1.2 Confirmar con grep que no se añadieron clases de estado nuevas, ni `setTimeout`, ni cambios al bloque de Escape (`a.blur()` de main.js:94 queda como está).

## 2. Barra superior pegada y cabecera (CSS en `assets/css/main.css`)

- [x] 2.1 Dar a `.topbar` (bloque base, main.css:144) `position: sticky; top: 0; z-index: 51`, sin tocar su fondo, tipografía ni el `.topbar .container`. Verificar que la regla `.topbar { display: none }` de `@media (max-width: 860px)` (main.css:581) queda intacta y, por estar oculta, no aplica el sticky en móvil.
- [x] 2.2 Añadir `@media (min-width: 861px)` con `.site-header { top: 35px; }` usando la altura de la topbar (35px medidos); si la medición de apply da otra cifra, usar la medida real y no el valor planificado.
- [x] 2.3 Añadir en el mismo `@media (min-width: 861px)` la regla `[id] { scroll-margin-top: 119px; }` (35 topbar + 76 cabecera + 8 aire) que reemplaza el valor base de 84px en escritorio; la regla base de main.css:162 queda para ≤860px.
- [x] 2.4 Añadir las transiciones nuevas (si las hubiera) al bloque `@media (max-width: 860px) and (prefers-reduced-motion: reduce)` según la convención del sitio; si no hay transición nueva, dejar el bloque tal cual.

## 3. Verificación (Playwright, servidor local)

- [x] 3.1 A 1440px en `servicios/index.html`: abrir el mega de Servicios con hover, hacer clic en "Registro sanitario", esperar el scroll animado (`behavior: instant` no aplica aquí: verificar tras el fin del smooth) y comprobar que el panel desaparece (visibility/pointer-events) y que el H2 de la sección queda por debajo del conjunto topbar+header, sin quedar tapado ningún elemento. (Aplicó el fallback de design: clase `cerrado-por-ancla` + `display:none`, porque el `:hover` del cursor persistía tras el blur.)
- [x] 3.2 A 1440px: hacer scroll y medir que `.topbar` y `.site-header` quedan pegadas arriba formando un conjunto (topbar 0, header top resultante = alto real de la topbar), sin hueco ni superposición; comprobar con `getComputedStyle` el z-index (51 sobre 50) y que la sombra de la cabecera no ticña la topbar.
- [x] 3.3 A 1024px repetir 3.1 y 3.2, y a 390px comprobar que nada cambia: topbar no renderizada, header pegada en `top: 0`, ancla con `scroll-margin-top: 84px` computado.
- [x] 3.4 Con teclado (Tab, sin ratón): el mega-panel sigue abriendo por foco en escritorio y el Escape sigue cerrándolo, para confirmar que el blur del clic no afecta la apertura por teclado. (Verificado: focus abre el panel `visible/true`; re-apertura tras salir del drop con el ratón también. El Escape en escritorio no cerraba el mega-panel tampoco antes de este change: su handler solo actúa con el menú móvil abierto, así que no hay regresión.)
- [x] 3.5 0 desborde horizontal a 1440, 1024 y 390.
- [x] 3.6 Verificar con grep que no se tocó ningún HTML, ni `tools/generar-fichas.mjs`, ni `tools/generar-listados.mjs`; y correr `cp -r cursos /tmp/cursos-antes && node tools/generar-fichas.mjs && diff -rq /tmp/cursos-antes cursos` saliendo `exit 0` (guard de regeneración, aunque no se toque el generador).

## 4. Documentación y cierre

- [x] 4.1 Añadir la entrada del cambio al `CHANGELOG.md` con los resultados medidos.
- [x] 4.2 Ejecutar `openspec validate topbar-fija-cierre-mega --strict`.
- [x] 4.3 Commitear en dos commits separados (código JS+CSS; OpenSpec del change) y dejar el archivado para un visto bueno posterior.
