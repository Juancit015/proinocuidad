# Proposal

## Why

Los botones usan radios mixtos (píldoras 999px en `.btn`/pestañas, 9px en `.mega-cta`/mega-menú). Unificar a 4px global da un lenguaje geométrico coherente. Solo `border-radius`; colores, bordes y sombras intactos.

## What Changes

- En `assets/css/main.css`, un bloque global: `.btn`, `.pestanas button`, `.btn-aula-nav`, `.mega-panel .mega-cta`, `button[type="submit"]`, `input[type="submit"]` → `border-radius: 4px` (con `!important` solo donde el actual lo exige: `.btn-aula-nav`).
- Exclusión redes del footer: sus enlaces (`.redes-sociales a`, circulares 50%) no entran en ningún selector del bloque; además el bloque usa `:not()` defensivo donde el selector es genérico.
- Excluidos también por diseño (documentado): botones circulares flotantes (WhatsApp/subir), insignias (`.section-badge`, `.marca-en-vivo`, `.genero`, chips) y `nav-toggle` sin fondo.
- Nota: los textos "Solicitar información adicional", "Solicitar cotización", "Ver más servicios" y "Contáctanos" no existen en el sitio; sus equivalentes ("Solicitar asesoría", "Solicitar más información / Inscribirme", "Ver todos los cursos") usan `.btn` y quedan cubiertos.

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual.

### Modified Capabilities

Ninguna. Ningún spec fija radios; todo lo existente sigue intacto.

## Impact

- Solo `assets/css/main.css` (un bloque añadido). Entregable: únicamente el CSS modificado.
- Sin HTML, JS, ni SEO.
