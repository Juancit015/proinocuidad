# Proposal: ficha del curso en vivo de BPM, Programas Prerrequisito y HACCP

## Why

La edición en vivo de diciembre 2026 («Buenas Prácticas de Manufactura, Programas
Prerrequisito y HACCP: Implementación, Verificación y Auditoría») se está difundiendo
solo por WhatsApp con un flyer: no tiene página en el sitio, no aparece en la pestaña
«En vivo» de Cursos (que hoy muestra un aviso de ausencia) y no puede recibir
inscripciones por el formulario. Publicarla da una URL indexable, una ficha con el
temario completo, el formulario de inscripción y una tarjeta en el listado.

## What Changes

- **Ficha nueva** `cursos/bpm-haccp-en-vivo/index.html`, generada por
  `tools/generar-fichas.mjs` con la misma plantilla de dos columnas que las 8 fichas
  asíncronas (hero, stats, beneficios, objetivo/público, temario desplegable,
  metodología, inversión, medios de pago, formulario y sidebar sticky).
- **Tarjeta en la pestaña «En vivo»** de `cursos/index.html`, generada desde
  `assets/js/cursos-data.js` dentro de un bloque nuevo `#lista-envivo`; la pestaña deja
  de mostrar el aviso «No hay cursos en vivo por el momento».
- **El listado asíncrono se mantiene en 8 tarjetas**: el generador de listados filtra
  por modalidad, de modo que el curso en vivo no se cuele en «Asíncronos» ni en los
  destacados del Inicio.
- **Variantes de modalidad en la plantilla**: la barra de stats, el bloque de
  beneficios, la metodología y el `courseMode` del JSON-LD se vuelven condicionales.
  La ficha en vivo declara fechas (8, 9 y 10 de diciembre de 2026, 7:30–10:00 PM hora
  Perú), modalidad Zoom y 40 horas académicas.
- **Precio y pronto pago**: S/ 60 (no incluye IGV) / US$ 17; pronto pago hasta el
  4 de diciembre de 2026: S/ 45 / US$ 15. El pronto pago se muestra en el sidebar
  junto al precio, sin alterar el resto de fichas.
- **Certificado opcional**: se describe como certificado digital con QR por 40 horas,
  opcional y sin costo adicional, solicitado al finalizar el curso. No se publica nota
  mínima ni examen porque el documento fuente no los define para la modalidad en vivo.
- **Flyer como portada**: el JPEG cuadrado de WhatsApp se convierte a WebP y se usa en
  la tarjeta y en el sidebar de la ficha. El hero usa una imagen de planta existente
  porque un póster cuadrado con texto no se lee bajo el degradado azul.
- **SEO y conteos**: se añade la URL al `sitemap.xml`, a `llms.txt` y a
  `llms-full.txt`, y las páginas públicas pasan de 20 a 21.

## Capabilities

### New Capabilities

Ninguna. El curso en vivo es una variante de la sección Cursos ya especificada.

### Modified Capabilities

- `cursos`: la pestaña «En vivo» deja de estar vacía y muestra tarjetas; la ficha de
  detalle admite modalidad en vivo (fechas, Zoom, certificado opcional); el listado
  asíncrono sigue siendo de 8 tarjetas.
- `seo-base`: el sitemap y `llms.txt` pasan a 21 páginas e incluyen la ficha nueva; el
  JSON-LD `Course` de la ficha en vivo usa modalidad online.
- `diseno-responsive`: la auditoría responsive cubre las 21 páginas del sitio.
- `pagina-404`, `iconografia` y `verificacion-certificado`: sus requisitos dejan de
  fijar el número «8 fichas» y hablan de las fichas generadas, para que la novena no
  los deje desactualizados.

## Impact

- `assets/js/cursos-data.js` (entrada nueva con `modalidad: "En vivo (Zoom)"`).
- `tools/generar-listados.mjs` (filtro por modalidad y bloque `#lista-envivo`).
- `tools/generar-fichas.mjs` (objeto de la ficha y condicionales de modalidad).
- `cursos/index.html` (panel «En vivo» con las tarjetas generadas).
- `cursos/bpm-haccp-en-vivo/index.html` (página nueva, generada).
- `assets/img/flyer-curso-09-bpm-haccp-en-vivo.webp` (flyer convertido).
- `sitemap.xml`, `llms.txt`, `llms-full.txt`.
- Sin cambios en el endpoint `ajax/envio-inscripcion.php`: acepta cualquier `curso`.
- Sin cambios en las 8 fichas existentes ni en el Inicio (el curso no va a destacados).
