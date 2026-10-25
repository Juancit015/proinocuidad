# Proposal

## Why

La auditoría SEO local (`auditoria-seo-sitio-local`, H5) mostró que la nota sobre la vigencia del HACCP vive solo como sección de `/noticias/`: sin URL propia, sin `Article`, sin enlazado desde la FAQ. Las SERP de consultas regulatorias las ganan páginas que citan a la fuente con su propio contenido; sin URL, la nota no compite y ni siquiera es indexable aparte. La mejora se declara cualitativa: no hay métrica de keyword medida para esa consulta [Informe 5.3].

## What Changes

- Página de detalle nueva `noticias/vigencia-indeterminada-haccp/` con el contenido completo de la nota (hoy en la tarjeta de `/noticias/`), mías de pan "Inicio / Noticias / Vigencia...", un único `<h1>`, title "Vigencia indeterminada del plan HACCP | Proinocuidad" (52 car.), meta 120-160, canonical y `og:url` propios, y JSON-LD `Article` (headline, autor "Equipo Proinocuidad", imagen autoalojada, publisher de la organización; `datePublished` solo si hay fecha confirmada, no se inventa).
- La tarjeta de `/noticias/` conserva foto, resumen y fuente, y enlaza a la página de detalle (hoy el ítem no enlaza a nada, contradiciendo el escenario vigente "el ítem enlaza al contenido completo").
- `sitemap.xml` de 18 a 19 URLs, `llms.txt` con la página en la sección Información, y actualización del conteo de páginas en las specs `seo-base` y `diseno-responsive`.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `noticias`: la nota vigente pasa de sección a página enlazada, con detalle nuevo y `Article`.
- `seo-base`: `sitemap.xml` y `llms.txt` declaran 19 páginas públicas.
- `diseno-responsive`: la auditoría responsive cubre 19 páginas.

## Impact

- Archivos afectados: `noticias/vigencia-indeterminada-haccp/index.html` (nueva), `noticias/index.html`, `sitemap.xml`, `llms.txt`, CHANGELOG. Sin cambios en fichas ni en `tools/generar-fichas.mjs`. Sin commit ni push sin confirmación de Juan.
- El efecto de SEO real solo se mide tras publicar el sitio [Informe: sin indexación aún].
- Es la página #19; si `servicio-iso-22000` ya se aplicó, los conteos suben a 20 al aplicar [Decisión en design.md].
- CAMBIAR EL NÚMERO DE PÁGINAS OBLIGA A LA VEZ A: `sitemap.xml`, `llms.txt` y los requisitos de `seo-base` y `diseno-responsive` [AGENTS.md del repositorio].
