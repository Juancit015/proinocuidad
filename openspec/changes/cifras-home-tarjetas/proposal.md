# Proposal

## Why

La franja de cifras del Home es hoy una tira plana de tres pares número/texto sobre el fondo claro: se lee como un pie de sección y no como información de peso. La referencia que pasó el dueño muestra el mismo contenido en tarjetas blancas con la etiqueta pequeña arriba y el valor grande abajo, bajo un título de sección, que es un patrón más legible y con más presencia.

## What Changes

- **La franja pasa a ser una sección con título y tarjetas**: encima de las tres cifras aparece el H2 "Proinocuidad en cifras" y cada cifra vive en su propia tarjeta blanca, con la etiqueta ("personas capacitadas") en gris y pequeña, y el valor ("+1000") grande y en rojo.
- **Tarjetas interactivas al puntero**: al pasar el ratón, la tarjeta sube 4px, gana sombra y el borde toma el rojo de marca, con la transición de 0.25s que ya usa el sitio. En táctil no hay cambio de estado pegajoso.
- **Se conservan las tres cifras y su texto exacto**: no se añade una cuarta cifra ni se inventan datos; el contenido sigue siendo "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública".
- **Responsive**: tres tarjetas en fila en escritorio y tableta, una columna por debajo de 560px, sin huecos vacíos ni desborde horizontal.
- **Movimiento reducido**: con `prefers-reduced-motion: reduce` la tarjeta cambia de estado sin transición.
- **Sin JavaScript**: todo el comportamiento es CSS; no hay conteo animado ni script nuevo.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `pagina-inicio`: el requisito "Franja de cifras del Home" pasa de exigir una grilla plana de tres columnas a exigir tres tarjetas con etiqueta y valor, título de sección y elevación al hover, conservando las tres cifras y la prohibición de afirmar antigüedad.

## Impact

- `index.html`: única página que tiene la franja; se reescribe solo el bloque `<section class="cifras">` y se añade el H2.
- `assets/css/main.css`: se sustituyen las reglas `.cifras` por las de la sección, el título, la grilla y las tarjetas, incluida la variante responsive y la de movimiento reducido.
- `CHANGELOG.md`: entrada del cambio.
- Sin cambios en `assets/js/main.js`, `tools/generar-fichas.mjs`, `tools/generar-listados.mjs`, `sitemap.xml` ni `llms.txt`: la página y su URL no cambian.

## Assumptions

- La imagen de referencia tiene cuatro tarjetas, pero se mantienen **tres**: el sitio solo tiene tres cifras verificadas y el requisito prohíbe afirmar años de experiencia o antigüedad. La cuarta tarjeta del ejemplo es de otro producto, no un dato que se pueda copiar.
- Los colores se quedan en la paleta de marca: fondo claro de la franja, tarjeta blanca y valores en `--rojo`, como hoy. No se introduce el morado de la imagen.
- El título elegido es "Proinocuidad en cifras"; va como H2 de la sección y no altera el H1 ni el SEO de la página.
- "Algo interactivas" se interpreta como la elevación al hover que ya usan las tarjetas del sitio, no como un conteo animado ni como tarjetas enlazadas.
