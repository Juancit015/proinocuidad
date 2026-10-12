# Proposal

## Why

La página de Servicios de Crecepe abre con un hero sobre imagen: migas "Inicio / Servicios", título y subtítulo. La de Proinocuidad usa un `.page-head` plano (solo h1 + párrafo, sin migas), igual que Nosotros, Noticias y Cursos. Replicar la estructura del hero (migas + título + subtítulo) acerca el diseño al de referencia y orienta al visitante; las imágenes de fondo vendrán después.

## What Changes

- En `servicios/index.html`, el `.page-head` incorpora al inicio un `nav.breadcrumbs` ("Inicio" enlazado a `../index.html` / "Servicios" actual), manteniendo intactos el `h1` "Servicios" y el párrafo existente.
- Extensión (pedido del usuario): mismo bloque en `nosotros/index.html` ("Inicio" / "Nosotros"), `noticias/index.html` ("Inicio" / "Noticias y eventos", igual que su `h1`) y `cursos/index.html` ("Inicio" / "Cursos"). Las fichas de curso no tienen `.page-head`, quedan fuera.
- En `assets/css/main.css`, estilos `.breadcrumbs` espejo de Crecepe adaptados al fondo azul: texto blanco, enlace en blanco brillante con hover sin subrayado (coherente con el change del footer), separador "/" decorativo.
- El hero queda preparado para imagen de fondo (gradiente actual como base; la foto se añadirá después con el patrón de overlay de Crecepe).
- Alcance: Servicios, Nosotros, Noticias y Cursos (índice). Las fichas no usan `.page-head`, fuera de alcance.
- Sin cambios de textos, URLs, estructura de servicios, ni SEO (cada `h1` único se conserva).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `pagina-servicios`: el hero SHALL mostrar migas de pan "Inicio / Servicios" sobre el título (nuevo requisito observable de navegación).
- `pagina-nosotros`: el hero SHALL mostrar migas "Inicio / Nosotros" sobre el título.
- `noticias`: el hero SHALL mostrar migas "Inicio / Noticias y eventos" sobre el título.
- `cursos`: el índice SHALL mostrar migas "Inicio / Cursos" sobre el título.

## Impact

- `servicios/index.html` (bloque de migas) y `assets/css/main.css` (reglas `.breadcrumbs`).
- Delta spec en `specs/pagina-servicios/spec.md` con el requisito añadido.
- Sin JS, sin imágenes nuevas, sin cambios SEO.

## Exploración de diseños similares (respuesta al usuario)

Sí hay un patrón común: las 4 páginas interiores (Servicios, Nosotros, Noticias, Cursos) usan el mismo `.page-head` (degradado azul, h1 blanco + párrafo, sin migas). Ninguna tiene hero con imagen ni migas. Este change lo aplica solo a Servicios como piloto.
