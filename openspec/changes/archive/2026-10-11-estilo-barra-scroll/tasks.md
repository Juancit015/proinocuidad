# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-scroll/`; verificar con `ls -la /tmp/opencode/respaldo-scroll/`.

## 2. Scrollbar estilo Crecepe

- [x] 2.1 En `assets/css/main.css`, junto a `html { scroll-behavior: smooth; }`, añadir el bloque: `scrollbar-width/color` en `html`, `::-webkit-scrollbar` de 15 px (ajuste final del usuario), track translúcido, thumb `var(--rojo)` con `background-clip: padding-box` y hover `var(--rojo-oscuro)`; verificar con `grep -n "scrollbar\|::-webkit-scrollbar" assets/css/main.css` y llaves balanceadas con `python3 -c`.
- [x] 2.2 Confirmar con `diff` contra el respaldo que solo se añade ese bloque y que no hay JS ni HTML tocados.

## 3. Verificación y documentación

- [ ] 3.1 Revisar en navegador (Chromium y Firefox) que la barra se ve delgada y roja, con hover más oscuro, sin cambios de layout; verificar por observación.
- [x] 3.2 Añadir entrada en `CHANGELOG.md` (scrollbar personalizada roja estilo Crecepe, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
