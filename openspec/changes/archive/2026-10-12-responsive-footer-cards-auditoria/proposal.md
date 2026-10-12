# Proposal

## Why

En móvil, el footer alinea su contenido a la izquierda y se ve desalineado respecto al resto del sitio. En las secciones de tarjetas de Cursos y Servicios, dos tarjetas se muestran lado a lado en tabletas y móviles amplios, y quedan apretadas: botones y textos se cortan o se comprimen. Hace falta corregir estos dos puntos y revisar el resto del sitio en distintos anchos para detectar casos similares.

## What Changes

- Footer en móvil: texto, logo, listas y redes centrados. Aplica en el ancho donde el footer pasa a una columna.
- Tarjetas de la sección "Cursos" (`cursos/index.html`, `#lista-cursos`), de "Servicios" (`servicios/index.html`, `.cards-grid`) y de "Nuestros servicios" y "Cursos destacados" de Inicio (`.cards-grid.four`): una sola columna por debajo de 860px, en lugar de dos.
- Auditoría de responsive: revisión de las 13 páginas en anchos de 360, 390, 768, 860, 1024 y 1280px. Se entrega como informe con cada hallazgo, su ubicación (página y selector), la captura de referencia y su estado (corregido, pendiente o sin cambios). No se corrigen hallazgos fuera de footer y tarjetas sin aprobación.

## Assumptions

- "Móvil" para el footer significa el mismo ancho en el que el footer pasa a una columna (≤560px). Si se quiere centrado hasta 860px, se cambia el umbral en `design.md`.
- "Tarjetas juntas" se refiere al tramo entre 561px y 860px, donde hoy hay dos columnas. Por debajo de 560px ya hay una columna.
- El contenido, los textos, los colores y las URLs no cambian.

## Capabilities

### New Capabilities

- `diseno-responsive`: reglas de alineación del footer y de disposición de tarjetas por ancho de pantalla, y el procedimiento de auditoría responsive del sitio.

### Modified Capabilities

Ninguna.

## Impact

- `assets/css/main.css`: reglas dentro de los bloques `@media (max-width: 860px)` y `@media (max-width: 560px)` que afectan a `.footer-grid`, `.footer-brand`, `.footer-contacto`, `.footer-links`, `.redes-sociales` y `.cards-grid`.
- Archivos HTML: sin cambios de marcado. Las fichas de curso se regeneran solo si se toca la plantilla; este change no la toca.
- Sin dependencias nuevas. La auditoría se hace con navegador local servido por HTTP, no contra el dominio.
