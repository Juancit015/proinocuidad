# Tasks

## 1. CSS del botón destacado

- [x] 1.1 Añadir la clase `.btn-verifica-nav` en `assets/css/main.css` (píldora roja `--rojo`, texto blanco, icono 18px, border-radius 999px), junto a `.btn-aula-nav`, y excluir `.btn-verifica-nav` de las reglas `:not(.btn-aula-nav)` de hover/subrayado y del responsive; verificar con `getComputedStyle` que el fondo y el border-radius aplican en escritorio y móvil.
- [x] 1.2 Añadir las reglas responsive para `.btn-verifica-nav` equivalentes a las de `.btn-aula-nav` (min-height 52px, centrado en móvil) y verificar en 390px y 860px.

## 2. Generador de fichas

- [x] 2.1 En `tools/generar-fichas.mjs`, cambiar el `<li>` de "Verifica tu certificado" del escritorio y del acordeón móvil para usar `<a class="btn-verifica-nav" ...>` con el icono SVG de escudo/verificación, manteniendo los prefijos `ruta`/`cursos`.
- [x] 2.2 Regenerar las fichas y la página 404 con `node tools/generar-fichas.mjs` y verificar con `cp -r cursos /tmp/cursos-antes && ... && diff -rq` que el único cambio esperado es el botón.
- [x] 2.3 Regenerar las tarjetas de listados con `node tools/generar-listados.mjs` si procede y verificar el diff.

## 3. Páginas no generadas

- [x] 3.1 Aplicar a mano la misma modificación en el nav y el footer de las páginas no generadas (inicio, nosotros, servicios y sus detalle, noticias, cursos/index, inocuidad-alimentaria, 404) y verificar con `grep -l "btn-verifica-nav"` que todas las HTML la contienen.
- [x] 3.2 Verificar que no queda ningún enlace de texto plano "Verifica tu certificado" en el nav de ninguna página.

## 4. Verificación

- [x] 4.1 Servir el sitio localmente y comprobar con Playwright (Chromium) que el botón se ve rojo, píldora, con icono, en escritorio (1280px) y móvil (390px), y que el hover oscurece a rojo intenso sin subrayado.
- [x] 4.2 Verificar que `generar-fichas.mjs` reproduce lo editado a mano (diff vacío) y que el responsive no se rompe (menú móvil abre/cierra, panel anclado).
- [x] 4.3 Actualizar la spec si el resultado visual difiere del supuesto (color/icono) y anotar en el proposal.

## Workflow follow-up

- Archivar el change tras la revisión visual de Juan.
- Verificar el resultado archivado.