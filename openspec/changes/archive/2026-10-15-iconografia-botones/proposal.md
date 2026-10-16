# Proposal

## Why

La iconografía de los botones está aplicada a medias: 64 botones del sitio llevan SVG y 83 no llevan ninguno. Las fichas de cursos (el camino de conversión principal) son las peores afectadas, con 10 botones sin icono cada una —"Copiar", "Copiar CCI", "Aula Virtual", "Pagar Online con Culqi", "Enviar inscripción", "Matricularme Ahora", "Contactar Asesor", "Solicitar link de PayPal / WU"— mientras las páginas de servicios y el home ya muestran iconos en botones equivalentes. El sitio se ve incoherente: la misma acción se ve distinta según la página.

## What Changes

- Añadir icono SVG en línea a los **83 botones sin icono** de los 15 HTML afectados, siguiendo el patrón que el sitio ya usa: SVG `viewBox="0 0 24 24"`, `stroke="currentColor"` (o `fill="currentColor"` para marcas), `aria-hidden="true"`, antes del texto y sin alterar el texto visible ni el `href`.
- Cubrir las 8 fichas **editando `tools/generar-fichas.mjs`** y regenerándolas, nunca a mano.
- Catálogo cerrado de icono por acción y por clase de botón, de modo que la misma acción use siempre el mismo icono en todo el sitio (por ejemplo, "Contactar Asesor" y "Solicitar asesoría por WhatsApp" comparten el icono de soporte; "Copiar" y "Copiar CCI" comparten el de portapapeles).
- Ajustes mínimos de CSS para que los iconos nuevas clases (`btn-copiar`, `btn-sm`) alineen y escalen correctamente.
- Entrada en `CHANGELOG.md`.

**Fuera de alcance (no objetivos):** `.mega-cta` del panel mega ya dibuja su flecha con máscara CSS y no se toca; los 64 botones que ya tienen icono no se re-normalizan; no se cambia texto, color, orden, `href`, `target`, radio, padding ni comportamiento de ningún botón, incluido el de Culqi (`aria-disabled="true"`); no se añade ninguna librería ni CDN de iconos.

## Capabilities

### New Capabilities

- `iconografia`: sistema de iconografía del sitio — SVG en línea sin dependencias, catálogo cerrado icono-acción, reglas de tamaño/accesibilidad y cobertura de todos los botones del sitio.

### Modified Capabilities

(none)

## Impact

- `tools/generar-fichas.mjs` (catálogo `SVG_*` compartido + marcado de los botones de la plantilla) y sus 8 salidas en `cursos/*/index.html`, regeneradas — 72 de los 83 botones.
- 6 HTML estáticos — 11 botones: `index.html` ("Conócenos", "Ver todos los cursos"), `servicios/index.html` (5) y las 4 subpáginas de `servicios/` ("Solicitar asesoría" del `.hero-acciones`, 1 por página).
- Sin tocar `inocuidad-alimentaria/`, `nosotros/`, `noticias/` y `cursos/index.html`: sus únicos botones sin SVG son los 36 `.mega-cta`, que ya llevan flecha por máscara CSS.
- `assets/css/main.css` (solo reglas de tamaño/alineación de iconos).
- `CHANGELOG.md`.
- Sin dependencias nuevas, sin peticiones de red, sin cambios de SEO ni de estructura semántica.