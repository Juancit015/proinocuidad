# Proposal

## Why

El sitio no tiene la infraestructura técnica básica de SEO: no hay `sitemap.xml`, `robots.txt`, URL canónica, `og:url` ni datos estructurados. Además, el repositorio mezcla material fuente que no forma parte del sitio (`FOTOS-(1)/` y `pagina web.pdf`), lo que dificulta publicar y mantener el sitio.

## What Changes

- Crear `sitemap.xml` en la raíz con las 13 URLs públicas (Inicio, Nosotros, Servicios, Noticias, Cursos y las 8 fichas), con dominio base `https://proinocuidad.com`.
- Crear `robots.txt` en la raíz que permita el rastreo y apunte al sitemap.
- Añadir `<link rel="canonical">` y `<meta property="og:url">` en cada página, con la URL absoluta de la página.
- Añadir JSON-LD `Organization` en la página de Inicio (nombre, URL, logo, RUC en `identifier`, contacto y redes).
- Añadir JSON-LD `Course` en cada una de las 8 fichas de curso (nombre, descripción, proveedor, modalidad asíncrona, duración en horas académicas, precio en PEN y USD).
- Mover `FOTOS-(1)/` y `pagina web.pdf` a `_archivo/` en la raíz del repositorio. No se borran.
- Actualizar las referencias vivas a esas rutas en `README.md`, `STRUCTURE.md`, `assets/js/cursos-data.js` (comentario) y `tools/generar-fichas.mjs` (comentario de cabecera). Los changes archivados no se modifican.
- Actualizar `tools/generar-fichas.mjs` para que las fichas generadas incluyan canonical, og:url y JSON-LD `Course`, de modo que una regeneración no pierda SEO.

**Supuestos registrados** (no hubo respuesta explícita):
- El sitio se publica en la raíz de `proinocuidad.com` (sin subruta).
- Las URLs canónicas usan la forma con `/` final de cada carpeta (p. ej. `https://proinocuidad.com/cursos/<slug>/`).
- No se añaden `hreflang`, `meta keywords` ni cambios de contenido editorial.

## Capabilities

### New Capabilities

- `seo-base`: sitemap.xml, robots.txt, URL canónica y `og:url` en todas las páginas, y datos estructurados JSON-LD (Organization en Inicio, Course en fichas de curso).

### Modified Capabilities

<!-- Ninguna. Las especificaciones existentes (navegacion-global, pagina-inicio, pagina-nosotros, pagina-servicios, cursos, pagos-e-inscripcion, noticias, contacto-footer) no cambian su comportamiento visible. -->

## Impact

- **Archivos nuevos:** `sitemap.xml`, `robots.txt`.
- **HTML:** `<head>` de las 13 páginas (Inicio, Nosotros, Servicios, Noticias, Cursos y 8 fichas). No se toca el cuerpo ni el contenido visible.
- **Generador:** `tools/generar-fichas.mjs` (plantilla del `<head>` de cada ficha).
- **Repositorio:** se crea `_archivo/` y se mueven `FOTOS-(1)/` y `pagina web.pdf`. Se actualizan 4 archivos con referencias documentales o comentarios.
- **Despliegue:** `_archivo/` queda en el repositorio. Si el hosting publica toda la carpeta, habrá que excluirla en el despliegue; esto debe confirmarse antes de implementar.
- **Dependencias:** ninguna nueva.
- **Riesgo:** mover `pagina web.pdf` deja sin ruta de origen a los comentarios de código que la citan; se corrigen en la misma tarea.
