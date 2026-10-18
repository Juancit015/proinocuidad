# Proposal

## Why

El sitio no tiene página de error. Hoy, cualquier URL mal escrita, un enlace viejo o una ficha renombrada devuelve lo que el servidor tenga por defecto: una página en blanco, un listado de archivos o directamente un error del servidor sin estilo y sin ninguna salida. En un sitio que ya tiene 18 páginas públicas y un menú desplegable con dos niveles, esa es una de las pocas pantallas que el visitante ve siempre por el mal camino y hoy no existe.

Además hay una segunda razón, más aburrida pero más importante: **el repositorio no tiene ninguna configuración de servidor**. No hay `.htaccess`, ni `netlify.toml`, ni `vercel.json`, ni `_headers`. Eso no es un detalle: en un servidor sin configurar, un archivo llamado `404.html` no se sirve automáticamente. Sin esa configuración o sin un hosting que lo haga por convención, esta página puede existir en el repositorio y nunca mostrarse. Conviene dejarlo escrito antes de construir nada, no después.

## What Changes

- **Se crea `404.html` en la raíz del sitio**, con la cabecera, el menú desplegable y el pie idénticos al resto de páginas. Reutiliza las clases `.hero`, `.container` y `.btn` que ya existen, de modo que **no se añade ni una línea de CSS**.
- **`tools/generar-fichas.mjs` pasa a emitir también el 404.** Es la misma decisión que ya se tomó con las fichas: la navegación vive en el generador, así que el 404 hereda los cambios de menú en vez de quedarse atrás. El generador hoy tiene `../../` escrito a mano en veinte sitios distintos; como el 404 vive en la raíz y las fichas a dos niveles, hace falta un prefijo de ruta por página.
- **El 404 declara `<meta name="robots" content="noindex, follow">`.** Una página de error no es una URL indexable.
- **El 404 no se añade al menú.** Nadie enlaza un 404, así que su navegación es la del resto de páginas sin una entrada que apunte a él.
- **El 404 no aparece en `sitemap.xml`.** Un sitemap describe URLs indexables. Incluirlo sería decirle a los buscadores que indexen una página de error.
- **Se documenta** en `CHANGELOG.md`, `STRUCTURE.md`, `AGENTS.md` y `README.md`, incluyendo el aviso de que el 404 no cuenta como página pública en el mapa del sitio.

## Capabilities

### New Capabilities

- `pagina-404`: la pantalla que el visitante ve cuando una URL no existe. Cubre su existencia y contenido, su comportamiento con los buscadores, su chrome de navegación y su relación con el generador.

### Modified Capabilities

Ninguna, y es deliberado. El requisito "Mapa del sitio" de `seo-base` es el sitio natural para decir "el 404 no está en el mapa", pero **ese mismo requisito lo está modificando ya el change `llms-para-agentes`**, que sigue activo. Tocar los dos a la vez dejaría dos changesamentals editando el mismo bloque y el orden de sincronización importaría. La regla vive en `pagina-404`, que es donde tiene sentido, y `seo-base` se queda intacta.

## Impact

- **Toca el generador:** `tools/generar-fichas.mjs` gana un prefijo de ruta por página y una escritura más. Es el punto delicado del cambio, porque el mismo generador produce las 8 fichas: si el prefijo se calcula mal, se rompen las ocho. Por eso una de las tareas es comprobar que las fichas salen idénticas byte a byte.
- **Un archivo nuevo:** `404.html`, generado, no editado a mano.
- **Sin tocar:** `assets/css/main.css`, `assets/js/main.js`, las 18 páginas HTML, `sitemap.xml`, `robots.txt` y el resto de la documentación de specs.
- **Una dependencia externa que no está bajo control del repositorio:** que el hosting sirva `404.html` con estado HTTP 404. Hoy no se puede comprobar porque el sitio todavía no está publicado, así que queda como paso posterior a la publicación, igual que la activación de los formularios y el enlace de Aula Virtual.
- **Sin build, sin dependencias y sin backend.** Sigue siendo un archivo de texto más en un sitio estático.