# Proposal

## Why

Los botones clave del sitio (tarjetas de curso, hero de Inicio y enlace "Aula Virtual" del menú) son solo texto. Un ícono SVG discreto antes del texto mejora el reconocimiento de la acción, siguiendo la referencia Food Consulting. Es un cambio visual; no altera destinos, contenido ni SEO.

## What Changes

- Tarjetas de curso (`index.html` e `cursos/index.html`, templates inline):
  - "Más información" pasa a mostrar un ícono "+" SVG inline antes del texto. El "+" de texto actual se reemplaza por el SVG (no se duplica).
  - "WhatsApp" muestra el ícono oficial de WhatsApp SVG inline antes del texto. El glifo ya existe en `index.html` (botón flotante), se reutiliza sin descargas.
- Hero de Inicio (`index.html`):
  - "Consultar por WhatsApp" muestra el ícono oficial de WhatsApp SVG.
  - "Ver cursos" muestra un ícono de flecha → SVG.
- Menú de cabecera (`.btn-aula-nav` "Aula Virtual", presente en todas las páginas): ícono discreto (birrete o flecha) SVG.
- CSS en `assets/css/main.css`: SVG de 18px con `fill` o `stroke: currentColor`; los botones afectados usan `display: inline-flex; align-items: center; justify-content: center; gap: 8px`.
- Sin cambios de tipografía, colores, `border-radius`, sombras, tamaños de botón, posiciones ni otras secciones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `cursos`: el texto del primer botón de la tarjeta pasa de "+ Más información" a "Más información" con ícono "+" SVG (MODIFIED).

## Impact

- `assets/css/main.css`: reglas de `.btn` afectados (solo en los botones listados).
- `index.html`: tarjetas de curso (template), hero (2 botones), menú "Aula Virtual".
- `cursos/index.html`: tarjetas de curso (template) y menú "Aula Virtual".
- Menú "Aula Virtual" aparece en las demás páginas con la misma clase; el cambio aplica en todas por ser el mismo componente.
- Delta spec en `specs/cursos/spec.md`.
- Sin cambios SEO: mismos destinos, textos indexables intactos (los SVG son `aria-hidden="true"`).
