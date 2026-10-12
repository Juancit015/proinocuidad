# Proposal

## Why

Los submenús "Servicios" y "Cursos" del menú principal son paneles amplios con ítems de alturas desiguales. Un formato compacto, con ícono en cuadro por ítem y altura uniforme, mejora el escaneo y deja ambos submenús con el mismo aspecto. El submenú "Cursos" además se reduce a los 4 cursos destacados del Home.

## What Changes

- Submenús "Servicios" y "Cursos" en las 13 páginas y en la plantilla de fichas (`tools/generar-fichas.mjs`):
  - "Servicios" mantiene sus 4 ítems con textos y enlaces actuales.
  - "Cursos" pasa a 4 ítems, los que tienen `enHome: true` en `assets/js/cursos-data.js`: Diplomado SGCIA, Legislación Sanitaria de Alimentos, HACCP: certificación en Perú (DIGESA / SENASA) y Auditor Interno del Sistema HACCP. Se conservan sus textos y enlaces.
  - Cada ítem tiene un ícono SVG de 24px en un cuadro de 44px (radio 10px, fondo `#eef1f8`, azul marino, trazo 2). Íconos de Cursos (decisión del usuario): birrete, balanza, escudo con check y lupa con check.
  - Ítem compacto: padding `8px 10px`, gap 10px, sin altura fija. Título 14px, line-height 1.25, sin margen. Descripción 12px, line-height 1.35, margen superior 2px.
  - Grilla de 2 columnas con `grid-auto-rows: 1fr` para que los 4 ítems de cada panel midan lo mismo.
  - Panel de 460px de ancho con padding de 10px (en ambos submenús).
  - "Ver todos los servicios" y "Ver todos los cursos" ocupan todo el ancho, con 13px y padding `10px 16px`.
  - En móvil (≤860px) los ítems van en 1 columna.
- Sin cambios de colores de marca, tipografía base, menú principal ni otras secciones.
- Las clases `.mi` y `.mt` del pedido no se crean (decisión previa: el pedido es referencial y se usan los selectores existentes).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `navegacion-global`: el requisito "Mega-menú al hover" define el formato compacto de ambos submenús, el listado de 4 cursos destacados y el ícono de 44px.

## Impact

- `assets/css/main.css`: reglas `.mega-panel-compacto`.
- 13 páginas HTML: bloques de "Servicios" y "Cursos" en `ul.nav-menu`.
- `tools/generar-fichas.mjs`: plantilla del menú; las fichas se regeneran con el script.
- Delta spec en `specs/navegacion-global/spec.md`.
- Sin cambios SEO en los textos visibles de las páginas; el submenú deja de enlazar 4 cursos que no son destacados (siguen accesibles desde la página Cursos).
