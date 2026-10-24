# Proposal

## Why

El dueño revisó la franja de cifras con tarjetas, iconos y la fotografía de fondo con velo y pidió volver al formato "de mucho antes": una barra plana solo con texto y números. La invasión visual (tarjetas blancas, fondo con foto, elevación al hover, título de sección) no le convence; los datos de la franja nunca fueron el problema. Puesto que el formato que pide existe verificado en el historial, se trata de una reversión controlada y no de un rediseño nuevo.

## What Changes

- **La sección vuelve a la barra plana**: el markup se reemplaza por el de `2ed234e~1` — `section.cifras` con `aria-label="Cifras de Proinocuidad"` y tres pares valor/etiqueta dentro del `.container`. Desaparecen el H2 "Proinocuidad en cifras", el `section-head`, las tres `.cifra-card` con icono y el fondo fotográfico con velo.
- **El CSS vuelve a las cinco líneas de `2ed234e~1`**: fondo plano `--fondo`, borde inferior, padding 26px, grilla de 3 columnas centrada (`--rojo` grande en el valor, `--gris` en la etiqueta) y 2 columnas en `@media (max-width: 1020px)`. Quedan fuera las reglas de tarjetas, hover, momentum reducido, fondo con velo y la regla de una columna de 860px.
- **Se retira el activo `assets/img/cifras-fondo.avif`**: ninguna otra página lo usa.
- **Se conserva el contenido exacto**: las tres cifras no cambian ("+1000", "8", "100%") y sigue prohibido afirmar años de experiencia. H1, título, meta description y canonical intactos.
- **Sin JavaScript ni generadores**: el cambio es exclusivamente HTML + CSS + un borrado de imagen.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `pagina-inicio`: el requisito "Franja de cifras del Home" pasa de exigir H2, tarjetas compactas, fondo con velo y fila de 820px a exigir la barra plana de tres cifras (3 columnas en escritorio, 2 en ≤1020px, sin adornos ni fondo). El requisito ADDED "Elevación de las tarjetas de cifras" se retira: no quedan tarjetas que elevar.

## Impact

- `index.html`: única página con `.cifras`; se sustituye el bloque `<section class="cifras">` completo por el markup plano anterior.
- `assets/css/main.css`: el bloque `.cifras` y sus reglas derivadas (`.cifras-head`, `.cifras-grid`, `.cifra-card`, hover, movimiento reducido, responsive) se sustituyen por las cinco líneas originales y la regla de 2 columnas en ≤1020px.
- `assets/img/cifras-fondo.avif`: borrado (solo vivía en la franja del Home).
- `CHANGELOG.md`: entrada del cambio.
- Sin cambios en `assets/js/main.js`, `tools/generar-fichas.mjs`, `tools/generar-listados.mjs`, `sitemap.xml`, `llms.txt` ni en el resto de páginas: el `.stat-icono`/`.stat-info` de las fichas sigue usándose allí y no se toca.
