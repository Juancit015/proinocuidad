# Proposal

## Why

El sitio afirma "3 años de experiencia" en dos páginas, pero es un número fijo que no sube solo: hoy puede ser correcto y en unos meses será falso sin que nadie se acuerde de cambiarlo. Además es la única cifra del sitio que no se sostiene con un hecho comprobable, y el propio proyecto ya tiene el criterio escrito en la spec de la guía: no publicar cifras sin fuente verificada.

## What Changes

- Quitar la cifra "3 años de experiencia" de la franja de cifras del home (`index.html`), dejando las otras tres: +1000 personas capacitadas, 8 cursos y un diplomado asíncrono, y 100% compromiso con la salud pública.
- Quitar la misma afirmación del párrafo introductorio de la página Nosotros, reescribiendo la frase para que conserve el sentido sin el número.
- Ajustar el grid `.cifras` de 4 a 3 columnas para que no quede un hueco vacío, en escritorio y en el punto de quiebre de tableta.
- Entrada en `CHANGELOG.md`.

**Fuera de alcance (no objetivos):** no se tocan las otras tres cifras ni ninguna otra afirmación del sitio; no se reescribe la sección de cifras del home más allá de quitar esa tarjeta; no se cambian titulares, metadatos, canonical, imágenes, colores ni el resto del diseño; la cifra "1000 personas capacitadas" se mantiene aunque esté en el mismophrase de Nosotros, porque esa sí es una cifra de actividad verificable y no envejece por sí sola.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `pagina-inicio`: la franja de cifras del home SHALL mostrar tres cifras y no cuatro.
- `pagina-nosotros`: el párrafo introductorio SHALL identificar a la empresa sin afirmar años de experiencia.

## Impact

- `index.html` (franja `.cifras`, una tarjeta menos).
- `nosotros/index.html` (una frase del párrafo "Quiénes somos").
- `assets/css/main.css` (`.cifras .container`, de `repeat(4, 1fr)` a `repeat(3, 1fr)`).
- `CHANGELOG.md`.
- Sin cambios de SEO: ni `title`, ni `meta description`, ni `canonical`, ni `<h1>`, ni el número de encabezados.