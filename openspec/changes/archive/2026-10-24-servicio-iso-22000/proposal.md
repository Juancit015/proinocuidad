# Proposal

## Why

La auditoría SEO local (`auditoria-seo-sitio-local`, H7) no encontró página para "iso 22000": 100 búsquedas mensuales con dificultad 18 [MCP: DATA_getKeywordsMetrics], la más baja entre las keywords de servicio con métricas, y hoy la página FSSC 22000 la menciona de pasada sin atenderla. La matriz de cobertura sube de 19/22 a 20/22 keywords con URL candidata y el sitio gana una puerta de entrada transaccional económica.

## What Changes

- Página nueva `servicios/implementacion-iso-22000/index.html` con el patrón vigente de las páginas de detalle: hero con mías de pan, un único `<h1>` con la keyword, NAV de título de 48 car. ("Implementación ISO 22000 en Perú | Proinocuidad"), meta 120-160, canonical y `og:url` propios, JSON-LD `Service` + `Organization` + `FAQPage` (FAQ visible idéntica), y cierre `.cta-sub` con H2 único.
- Contenido derivado del docx ya publicado en `servicios/index.html` (grupo "sistemas de gestión") y de las afirmaciones ya visibles del sitio: alcance de elaboración documental, seguimiento, capacitaciones, auditorías y acompañamiento en auditoría de certificación; enlace al Diplomado de Gestión de la Calidad e Inocuidad (incluye módulos de ISO 9001 e ISO 22000). QA accesibilidad organizativa y control de versión. Sin precios, plazos ni pasos no confirmados.
- Entrada en `servicios/index.html` enlazando a la página nueva (requisito existente de enlaces a mensajes de detalle), `sitemap.xml` de 18 a 19 URLs, `llms.txt` con la página en la sección Servicios, y los conteos de páginas en las specs `seo-base` y `diseno-responsive`.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `servicios-detalle`: el grupo pasa de 4 a 5 páginas de detalle (se añade ISO 22000) con CTA, contenido complementario y por norma.
- `pagina-servicios`: el listado enlaza también a la página de detalle de ISO 22000.
- `seo-base`: `sitemap.xml` y `llms.txt` declaran 19 páginas públicas.
- `diseno-responsive`: la auditoría responsive cubre 19 páginas.

## Impact

- Archivos afectados: `servicios/implementacion-iso-22000/index.html` (nueva), `servicios/index.html`, `sitemap.xml`, `llms.txt`, `llms-full.txt` (sección de servicios), `README`/CHANGELOG; no se toca `tools/generar-fichas.mjs` ni las fichas. Sin commit ni push sin confirmación de Juan.
- El efecto de SEO real solo se mide tras publicar el sitio [Informe: sin indexación aún].
- Cambio que se crea la página #19; si `noticia-article-digesa` ya se aplicó antes, los conteos de `sitemap.xml`, `llms.txt` y spec deben subir a 20 al aplicar [Decisión en design.md].
