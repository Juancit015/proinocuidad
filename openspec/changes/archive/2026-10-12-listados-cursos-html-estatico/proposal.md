# Proposal

## Why

Las tarjetas de curso de `cursos/index.html` (`#lista-cursos`) y de "Cursos destacados" en `index.html` (`#cursos-destacados`) se generan con JavaScript desde `assets/js/cursos-data.js`. El HTML que llega al navegador no contiene ningún curso. Eso hace que los enlaces internos a las 8 fichas dependan de ejecutar JS, y que los buscadores y otros rastreadores vean las páginas de listado vacías. Las fichas de detalle ya son HTML estático generado por `tools/generar-fichas.mjs`; los listados deben seguir el mismo criterio.

## Supuesto a confirmar

La petición "Divide las páginas en htmls" se interpreta como: **generar en HTML estático los listados de cursos** (tarjetas de la página Cursos y de "Cursos destacados" del Inicio). No se interpreta como dividir otras páginas. Si el usuario se refería a otra cosa, este change se ajusta antes de implementar.

## What Changes

- Un script de generación (`tools/generar-listados.mjs`) escribe las tarjetas de curso como HTML estático dentro de `cursos/index.html` (`#lista-cursos`) e `index.html` (`#cursos-destacados`).
- El contenido de las tarjetas (nombre, modalidad, sesiones, certificación, inversión, flyer, botones) sigue siendo el de `cursos-data.js`; no cambian textos, precios, enlaces ni flyers.
- Las pestañas "Asíncronos" y "En vivo" de Cursos mantienen su comportamiento actual con JavaScript. El HTML de la pestaña "Asíncronos" ya contiene los cursos al cargar; no depende de JS para mostrarse.
- Se quita el bloque de JS que construye las tarjetas. El JS de las pestañas y del resto de la página se mantiene.
- Sin cambios de diseño (CSS), de fichas de detalle ni de `cursos-data.js`.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `cursos`: el listado de cursos pasa a estar en HTML estático generado; se agrega el requisito de contenido visible sin JavaScript.
- `pagina-inicio`: la sección "Cursos destacados" pasa a estar en HTML estático generado; se agrega el requisito de contenido visible sin JavaScript.

## Impact

- `tools/generar-listados.mjs` (nuevo).
- `cursos/index.html` y `index.html`: el contenido de los contenedores `#lista-cursos` y `#cursos-destacados` se reemplaza por HTML generado. Los marcadores quedan delimitados para que el script los reemplace de forma segura.
- `assets/js/main.js` no cambia. `assets/js/cursos-data.js`: sin cambios de contenido.
- Sin dependencias nuevas.
