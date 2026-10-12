# Proposal

## Why

Crecepe tiene scrollbar personalizada delgada con el color de acento y el sitio Proinocuidad usa la del navegador por defecto. Replicarla con el rojo corporativo (el mismo del hover del footer) completa la unificación visual entre ambos sitios. Solo CSS, sin JS.

## What Changes

- En `assets/css/main.css`, añadir bloque de scrollbar personalizada espejo de Crecepe (`styles.css` líneas 49-70, sin las reglas `dark-mode` porque Proinocuidad no tiene modo oscuro):
  - Firefox: `html { scrollbar-width: thin; scrollbar-color: var(--rojo) rgba(16, 20, 119, 0.08); }`.
  - Chromium/WebKit: `::-webkit-scrollbar { width: 15px; }` (Crecepe usa 10 px; se sube a 15 px por pedido del usuario), track `rgba(16, 20, 119, 0.06)`, thumb `var(--rojo)` redondeado con `background-clip: padding-box`, hover `var(--rojo-oscuro)`.
- Un solo archivo tocado (`main.css`); las 13 páginas la heredan. Sin HTML, sin JS, sin SEO.

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual.

### Modified Capabilities

Ninguna. Ningún spec cubre la scrollbar; todo lo existente sigue intacto.

## Impact

- `assets/css/main.css` (un bloque añadido).
- Sin dependencias, sin JS, sin cambios SEO ni de accesibilidad al contenido (la barra sigue operativa con teclado).
