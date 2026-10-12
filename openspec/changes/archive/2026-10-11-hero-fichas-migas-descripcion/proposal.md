# Proposal

## Why

Las fichas de curso usan un hero distinto (etiqueta `.etiqueta` + h1 + subrayado rojo, sin migas ni descripción) mientras Servicios/Cursos ya tienen migas estilo Crecepe. Unificar el hero de las 8 fichas (migas de 3 niveles + descripción) da coherencia y orienta al visitante; la etiqueta se elimina porque duplica la modalidad (conservada en Datos generales).

## What Changes

- En `tools/generar-fichas.mjs`, el hero pasa a: `nav.breadcrumbs` ("Inicio" a `../../index.html` / "Cursos" a `../index.html` / nombre corto actual) + `h1` intacto + párrafo de descripción (copia del primer párrafo del bloque Objetivo de cada ficha) + se elimina el `span.etiqueta` y el `.subrayado`.
- Nuevos campos por curso en la plantilla: `miga` (nombre corto) y `descripcion` (texto del Objetivo). Nombres propuestos: "Diplomado", "Legislación sanitaria", "BPM, POES, POE y Plan HACCP", "HACCP DIGESA / SENASA", "BPM y prerrequisitos Codex 2022", "Higiene y saneamiento", "HACCP FSSC 22000 y Codex 2022", "Auditor interno HACCP".
- Regeneración de las 8 fichas. CSS: sin reglas nuevas (`.breadcrumbs` globales y `.page-head p`-like ya sirven; la descripción usa el estilo de párrafo claro existente o uno mínimo equivalente).
- Sin cambios de textos del contenido, URLs, bloques de ficha, ni SEO (cada `h1` único se conserva; la modalidad sigue en Datos generales).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `cursos`: el hero de cada ficha SHALL mostrar migas "Inicio / Cursos / <nombre>" y la descripción del curso (2 requisitos ADDED). Quitar la etiqueta no altera requisitos: ningún spec la exige.

## Impact

- `tools/generar-fichas.mjs` (hero + 8×(`miga`, `descripcion`)) y las 8 fichas regeneradas.
- Delta spec en `specs/cursos/spec.md`.
- Posible retoque mínimo en `main.css` para el párrafo de descripción si el existente no encaja.
- Sin JS, sin imágenes nuevas.
