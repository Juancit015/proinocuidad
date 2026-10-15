# Proposal

## Why

La ficha del diplomado (rediseño moderno de 2 columnas con sidebar sticky, a Juan le encantó) convive con 7 fichas de cursos cortos en el formato antiguo de bloques apilados. Unificar el estilo da coherencia visual y la misma experiencia de matrícula en todos los cursos.

## What Changes

- Las 7 fichas de cursos cortos adoptan el layout moderno del diplomado: hero de ficha, barra de stats, secciones estructuradas, temario por módulos, tarjetas de pago modernas con QR, y sidebar sticky con flyer propio, precios, CTAs y checklist de incluidos.
- Cada ficha conserva su propio contenido y datos (título, descripción, horas, sesiones, temario, precios S//US$, flyer `flyer-curso-0X-*.webp` y fondo hero propios).
- El layout se porta a `tools/generar-fichas.mjs` (plantilla + bloques compartidos) y las 8 fichas se regeneran con el generador; el diplomado deja de ser edición manual y vuelve a la regla fichas-vía-generador.
- El change `rediseno-fichas-cursos` (implementación revertida) queda superado y se archiva sin aplicar.
- Solo fichas de cursos + generador; sin cambios de textos comerciales, precios, datos de pago ni otras páginas.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `cursos`: la ficha de detalle de todo curso SHALL usar el layout moderno de 2 columnas con sidebar sticky (hoy solo el diplomado lo tiene).
- `pagos-e-inscripcion`: el bloque de medios de pago de cada ficha SHALL usar el formato moderno de tarjetas con copiado + QR destacado (hoy descrito en formato antiguo).

## Impact

- `tools/generar-fichas.mjs` (plantilla de ficha y bloques compartidos).
- `cursos/*/index.html` (8 fichas regeneradas).
- `CHANGELOG.md` (entrada del cambio).
- Sin impacto en listados, resto de páginas ni desktop/móvil ya verificados (los fixes de desborde aplican al CSS compartido).
