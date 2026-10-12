# Tasks

## 1. Respaldo e inventario

- [x] 1.1 Copiar `assets/css/main.css` e `index.html` a `/tmp/opencode/respaldo-enlaces/`; verificar con `ls -la /tmp/opencode/respaldo-enlaces/`.
- [x] 1.2 Inventariar todos los `.card-link` del sitio con `grep -rn 'card-link' --include=*.html .`; verificar que son 5 en `index.html` (4 "Saber más" + 1 "Leer la noticia completa") y que `href` y textos quedan registrados antes de tocar nada.

## 2. Efecto estilo Crecepe en CSS

- [x] 2.1 En `assets/css/main.css`, redefinir `.card .card-link` como `display: inline-flex; align-items: center; gap: 8px; font-weight: 700; transition: gap 0.3s ease; text-decoration: none;` manteniendo `color: var(--rojo)`; verificar con `grep -n "card-link" assets/css/main.css`.
- [x] 2.2 Añadir `.card .card-link:hover { gap: 13px; text-decoration: none; }`, `:focus-visible` sin subrayado, envolver la transición en `@media (hover: hover)` y `transition: none` en `@media (prefers-reduced-motion: reduce)`; verificar llaves balanceadas con `python3 -c` y con `grep -n "hover: hover\|prefers-reduced-motion\|card-link:hover" assets/css/main.css`.
- [x] 2.3 Confirmar que la regla global `a:hover` sigue intacta y que `.btn`, `.mega-cta`, `.nav-menu` y footer no cambiaron: verificar con `grep -n "a:hover\|mega-cta:hover\|btn" assets/css/main.css` y `diff` contra el respaldo salvo el bloque `.card-link`.

## 3. Flecha separable en HTML

- [x] 3.1 En `index.html`, envolver la "→" de los 5 `.card-link` en `<span aria-hidden="true">→</span>` sin tocar `href` ni texto; verificar con `grep -c 'card-link.*aria-hidden' index.html` que son 5.
- [x] 3.2 Confirmar que `href` y textos ancla son idénticos al respaldo salvo los `span` añadidos (comparación con `span`/`aria-hidden` excluidos); verificar con script Python de diff y con `xmllint --noout index.html` si aplica al HTML.

## 4. Verificación y documentación

- [x] 4.1 Revisar en navegador desktop y móvil que el hover desplaza solo la flecha, no hay subrayado en `.card-link`, el foco de teclado es visible y con `prefers-reduced-motion` no hay animación; verificar por observación y dejar constancia del resultado.
- [x] 4.2 Añadir entrada en `CHANGELOG.md` describiendo el nuevo efecto y que no hay cambios SEO; verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 5. Flecha gruesa y tamaño (ajuste pedido por el usuario)

- [x] 5.1 En `assets/css/main.css`, subir `.card .card-link` a `font-size: 0.95rem` y añadir `.card .card-link svg { width: 16px; height: 16px; flex: 0 0 auto; }`; verificar con `grep -n "card-link" assets/css/main.css` y llaves balanceadas.
- [x] 5.2 En `index.html`, reemplazar los 5 `<span aria-hidden="true">→</span>` por el SVG de flecha de Crecepe (`stroke="currentColor" stroke-width="2.5"`, 16x16, `aria-hidden="true"`) sin tocar `href` ni texto; verificar con `grep -c 'card-link.*<svg' index.html` que son 5.
- [x] 5.3 Confirmar que `href` y textos ancla siguen idénticos al respaldo y que el diff solo muestra las 5 líneas de `.card-link`; verificar con `diff` y script Python.
