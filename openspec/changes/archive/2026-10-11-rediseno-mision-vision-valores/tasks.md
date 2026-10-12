# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `nosotros/index.html`, `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-mision-vision-valores/`; verificar con `ls -la /tmp/opencode/respaldo-mision-vision-valores/`.

## 2. Marcado

- [x] 2.1 En `nosotros/index.html`, dentro de `section.identidad`, reemplazar solo el `.cards-grid` de 3 `article.card` por la estructura `.mvv-grid` > `.mvv-card` > (`.mvv-icon` con SVG, `.mvv-head` con título, `.mvv-body` con texto o `ul.mvv-list`), manteniendo badge, h2 y subrayado; verificar con `grep -n "mvv-" nosotros/index.html` y que los textos son idénticos a los actuales.
- [x] 2.2 Mantener los 5 valores exactos y los textos de Misión y Visión sin cambios; verificar con `diff` del texto de la sección.

## 3. Estilos

- [x] 3.1 Añadir las reglas `.mvv-*` acotadas a `.identidad` con variables del sitio (`--azul`, `--rojo`, `--gris`, `--gris-linea`), grid 3 columnas, `gap: 24px`, `max-width: 1000px`, `align-items: start`, y 1 columna en `max-width: 800px`; verificar con `grep -n "mvv-" assets/css/main.css` y llaves balanceadas.
- [x] 3.2 Verificar que ninguna regla global de `.card`, `.cards-grid` o `.btn` cambió; verificar con `diff` contra el respaldo.
- [x] 3.3 Ajuste de revisión: `align-items: stretch` en `.mvv-grid` para que las tres tarjetas tengan la misma altura; verificar con `grep -n "mvv-grid" assets/css/main.css`.
- [x] 3.4 Ajuste de revisión: hover en `(hover: hover)` con `translateY(-4px)` y `--sombra` en la tarjeta, y cambio del ícono a `--rojo`; verificar con `grep -n "mvv-card:hover" assets/css/main.css`.

## 4. Verificación

- [x] 4.1 Revisar en navegador (escritorio y móvil ≤800px) que las tarjetas quedan en fila/columna, el ícono queda centrado sobre el borde y la cabecera ocupa el ancho sin desbordar; verificar por observación.
- [x] 4.2 Confirmar que el resto de páginas no cambia (`diff` de `index.html`, `servicios/index.html`, `cursos/index.html` contra respaldo sin cambios).
- [x] 4.3 Añadir entrada en `CHANGELOG.md` (rediseño de Misión, visión y valores, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
