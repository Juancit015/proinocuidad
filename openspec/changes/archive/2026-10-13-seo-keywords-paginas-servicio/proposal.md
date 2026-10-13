# Proposal

## Why

La medición con SE Ranking (Perú, octubre 2026) muestra que `proinocuidad.com` no tiene keywords orgánicas medibles, mientras que Food Consulting posiciona 59 keywords y CENCAL 35, ambas con páginas de servicio o de curso dedicadas.

Las búsquedas con demanda real y dificultad baja o media que el sitio no atiende hoy con una página propia son:

- "registro sanitario digesa" (1600 exacta; 8000 en variante "registro sanitario digesa"), KD 76–82. El servicio existe en el PDF, pero solo aparece como sección dentro de `servicios/index.html`.
- "certificacion haccp" (480, KD 8). Sin página.
- "registro sanitario de alimentos" (210, KD 7). Sin página.
- "fssc 22000" (480, KD 17–18) y "brcgs" (590, KD 21). Solo aparecen como curso o como mención.
- "inocuidad alimentaria" (920, KD 36) y "inocuidad de los alimentos" (260, KD 33). Sin página pilar.

Además, el análisis técnico del repo local muestra metadatos fuera de rango: títulos de 33 a 131 caracteres, descripciones de 121 a 243, y las 8 fichas de curso con el título "| Proinocuidad | Proinocuidad" duplicado.

## What Changes

- Crear cuatro páginas de servicio con contenido propio, cada una enfocada en una intención concreta: registro sanitario DIGESA, certificación HACCP, implementación FSSC 22000 y BRCGS Food Safety.
- Crear una página pilar de inocuidad alimentaria que enlace a cursos y servicios.
- Ajustar título y meta description de las 13 páginas existentes a rangos verificables (título ≤ 60 caracteres, descripción 120–160).
- Quitar la marca duplicada de los títulos de las 8 fichas. El cambio se hace en `tools/generar-fichas.mjs` y se regenera; no se edita cada ficha a mano.
- Agregar las páginas nuevas a `sitemap.xml` y enlazarlas desde `servicios/index.html`.

Alcance de contenido: solo textos derivados del PDF base (`pagina web.pdf`) y de los datos verificados. No se publican precios, plazos ni pasos del trámite que no estén confirmados por el dueño.

## Non-goals

- No se crean páginas para "registro sanitario" (12100, KD 77) ni "haccp" (3600, KD 84). Se compiten en el futuro, no ahora.
- No se crean artículos de blog ("qué es inocuidad alimentaria", "diferencia BPM y POES"). Quedan para un change posterior.
- No se crean landings de cursos sin volumen ("curso haccp online perú", "curso fssc 22000 perú").
- No se modifica el menú de navegación repetido en las 13 páginas.
- No se publica en producción. El método de publicación en `proinocuidad.com` (WordPress) queda pendiente de decisión del dueño y requiere confirmación explícita.
- No se cambian colores, tipografía ni la paleta institucional.

## Capabilities

### New Capabilities

- `servicios-detalle`: páginas individuales de servicio con contenido propio y datos estructurados `Service`.
- `guia-inocuidad`: página pilar informativa de inocuidad alimentaria con enlaces internos a cursos y servicios.

### Modified Capabilities

- `seo-base`: se agregan requisitos de longitud de título y descripción, de marca no duplicada en las fichas y de cobertura del sitemap para las páginas nuevas.
- `pagina-servicios`: se agrega el requisito de enlazar cada servicio con su página de detalle.

## Impact

- Archivos nuevos: 5 páginas HTML (4 servicios y 1 guía), posiblemente en `servicios/<slug>/index.html` y `inocuidad-alimentaria/index.html`.
- Archivos modificados: `servicios/index.html`, `sitemap.xml`, `tools/generar-fichas.mjs` (título de fichas), y las 13 páginas en sus etiquetas `<title>` y `meta description`.
- Sin cambios de CSS ni de scripts. Las páginas nuevas reutilizan las clases y el layout de las páginas existentes.
- Sin dependencias nuevas.
- Dependencia de medición: los volúmenes se midieron en octubre 2026 con SE Ranking; deben volver a medirse antes de publicar.
