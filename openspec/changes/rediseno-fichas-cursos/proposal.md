# Proposal

## Why

La ficha descriptiva de cada curso se percibe como una simple pila de bloques alineados a la izquierda ("solo veo cards y ya"): la información no se siente centrada ni jerarquizada, y los logos de medios de pago quedan alineados a un lado en lugar de centrados. Un rediseño con contenido centrado mejora la legibilidad y la percepción de calidad antes de la inscripción.

## What Changes

- Rediseño visual de la ficha de curso: bloques de contenido centrados con ancho máximo de lectura (datos generales, beneficios, público objetivo, objetivo, perfil del egresado, temario, metodología, inversión, inscripción).
- Bloque "Medios de pago" centrado: logos de Yape, Plin, BBVA, Western Union y PayPal centrados en fila, botones de pago (Culqi, formulario, WhatsApp) centrados, datos y QR centrados.
- Encabezado de ficha (`ficha-head`) centrado: migas, título, descripción y subrayado alineados al centro.
- Se aplica a las 8 fichas de curso mediante `tools/generar-fichas.mjs` (no se edita ninguna ficha a mano), respetando la paleta de marca y el diseño responsive (móvil ≤860px).
- Sin cambios de contenido: mismos 9 bloques (más "Perfil del egresado" en el diplomado), mismos textos del documento base, mismos enlaces (Culqi placeholder, Google Form `/viewform`, WhatsApp) y mismos datos de pago.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `cursos`: la ficha de detalle pasa de bloques alineados a la izquierda a un diseño centrado con ancho máximo de lectura; el orden y contenido de los bloques no cambia.
- `pagos-e-inscripcion`: el bloque de medios de pago pasa a presentación centrada (logos, botones, datos y QR); el contenido y los enlaces no cambian.

## Impact

- `tools/generar-fichas.mjs` (plantilla de las 8 fichas) y las 8 fichas regeneradas en `cursos/*/index.html`.
- `assets/css/main.css` (nuevos estilos de centrado para `.ficha-*` y `.pagos-*`, ajuste responsive).
- Sin impacto en listados (`tools/generar-listados.mjs`), `assets/js/cursos-data.js`, ni en otras secciones del sitio.
