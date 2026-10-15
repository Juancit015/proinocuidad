# Proposal

## Why

La tarjeta de noticia DIGESA en el Home (`index.html` #noticias) no muestra foto de portada, mientras la misma tarjeta en `noticias/index.html` sí la muestra (`assets/img/noticia-digesa-haccp.jpg`). El Home se ve incoherente y menos atractivo como portada.

## What Changes

- Añadir la misma foto de portada `assets/img/noticia-digesa-haccp.jpg` a la tarjeta `.nota-card` del Home, dentro de `.nota-portada`, con las píldoras existentes conservadas y legibles sobre la imagen.
- Igualar el layout vertical del Home al de Noticias: foto arriba a ancho completo y texto debajo, en escritorio y móvil.
- Sin cambios de contenido: mismo título, meta, resumen y enlace "Leer la noticia completa". Sin foto nueva, sin cambio de textos ni SEO.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `pagina-inicio`: la sección Noticias del Home SHALL mostrar la foto de portada de la nota vigente igual que la página Noticias.

## Impact

- `index.html` (tarjeta `#noticias .nota-card`: añadir `<img>`).
- `assets/css/main.css` solo si el estilo actual no cubre el Home (reutilizar `.nota-portada img` y `.nota-card` vertical existentes).
- Sin impacto en `noticias/index.html`, generadores, listados de cursos, SEO ni otras secciones. Foto ya existe en `assets/img/`.
