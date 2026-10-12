# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `index.html`, `cursos/index.html` y `CHANGELOG.md` a `/tmp/opencode/respaldo-iconos-svg/`; verificar con `ls -la /tmp/opencode/respaldo-iconos-svg/`.

## 2. CSS

- [x] 2.1 En `main.css`, añadir `.btn svg` (18px, `flex: none`) y `inline-flex`/centrado/`gap: 8px` solo en `.card-acciones .btn`, `.hero-acciones .btn` y `.btn-aula-nav`; verificar con `grep -n "btn svg\|hero-acciones .btn\|btn-aula-nav" assets/css/main.css` y llaves balanceadas.

## 3. Tarjetas de curso

- [x] 3.1 En los 2 templates inline (`index.html` ~357 y `cursos/index.html` ~235), reemplazar `>+ Más información</a>` por el SVG "+" (stroke currentColor, `aria-hidden="true"`) seguido de "Más información"; verificar con `grep -n "Más información" index.html cursos/index.html` que no queda "+ " de texto.
- [x] 3.2 En los mismos templates, anteponer al texto "WhatsApp" el SVG oficial de WhatsApp (copia del glifo de `index.html` línea 337, `fill: currentColor`, `aria-hidden="true"`); verificar con `diff` que ambos bloques quedan idénticos salvo rutas.
- [x] 3.3 Ajuste de revisión: el SVG "+" de "Más información" pasa a círculo contenedor con "+" (estilo Food Consulting, "⊕"); verificar que ambos bloques siguen idénticos.

## 4. Hero y menú

- [x] 4.1 En `index.html` (líneas 156-157), anteponer SVG flecha → a "Ver cursos" y SVG WhatsApp a "Consultar por WhatsApp"; verificar con `grep -n "hero-acciones" -A3 index.html`.
- [x] 4.2 En los `a.btn-aula-nav` "Aula Virtual" de cabecera (todas las páginas, no el footer), anteponer el SVG birrete; verificar con `grep -rc 'btn-aula-nav.*<svg' --include=*.html .` igual al número de páginas con `btn-aula-nav`.
- [x] 4.3 Ajuste de revisión: el ícono de "Aula Virtual" queda centrado verticalmente; causa: `.nav-menu a` (display block, 0,1,1) anulaba `.btn-aula-nav`; corregido con `.nav-menu .btn-aula-nav` (0,2,0).

## 5. Verificación y documentación

- [x] 5.1 Con `diff` contra el respaldo, confirmar que solo cambian esas líneas y reglas, y que colores, radios, sombras y el footer no cambian.
- [x] 5.2 Revisar en navegador (escritorio y móvil) que los íconos miden 18px, están centrados y no mueven el texto ni rompen la línea.
- [x] 5.3 Añadir entrada en `CHANGELOG.md` (íconos SVG en botones, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
