# Proposal

## Why

La sección "Misión, visión y valores" de Nosotros usa las tarjetas genéricas del sitio, sin el encabezado azul ni el ícono circular de la referencia. Un formato de 3 tarjetas con cabecera de color e ícono sobre el borde superior ordena la información institucional y la hace más legible.

## What Changes

- En `nosotros/index.html`, solo dentro de la sección `.identidad` "Misión, visión y valores", el grid `.cards-grid` de 3 artículos pasa a un diseño de tarjetas con:
  - Grid de 3 columnas, `align-items: start`, `gap: 24px`, `max-width: 1000px`, centrado; 1 columna en móvil.
  - Borde 1px, padding `56px 20px 24px`, texto centrado.
  - Ícono circular de 56px con borde blanco de 4px, centrado sobre el borde superior, SVG blanco de 26px.
  - Cabecera de color con título "Misión", "Visión" y "Nuestros valores" en blanco, negrita, 16px.
  - Cuerpo de 14px, line-height 1.6, justificado. Valores con bullet circular rojo de 14px.
- Paleta del sitio (decisión del usuario): `--azul` #101477 para la cabecera e ícono, `--rojo` #ad343b para los bullets, `--gris` #5c5f6a para el texto y `--gris-linea` #e3e5ee para el borde. No se usan los hex literales de la referencia.
- Se conservan el badge "Misión y valores", el título "Misión, visión y valores" y el subrayado de la cabecera (decisión del usuario).
- Textos literales sin cambios; los 5 valores se mantienen.
- Sin cambios de tipografía base, `border-radius`, sombras ni otras secciones. La referencia usa Montserrat; el sitio usa Outfit, así que se mantiene Outfit.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `pagina-nosotros`: el requisito "Misión, visión y valores" agrega la disposición en tarjetas con cabecera e ícono (MODIFIED).

## Impact

- `nosotros/index.html`: marcado de la sección Misión, visión y valores.
- `assets/css/main.css` o estilos locales acotados a esa sección; no deben alterar `.card`/`.cards-grid` usados en otras secciones.
- Delta spec en `specs/pagina-nosotros/spec.md`.
- Sin cambios SEO: mismos textos, mismo `h2`/`h3` (se usa `h3` para los títulos de tarjeta).
