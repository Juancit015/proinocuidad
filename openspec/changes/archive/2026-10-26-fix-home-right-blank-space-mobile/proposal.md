# Proposal

## Why

En la home, a 360px de ancho (teléfonos como el Redmi 13C 5G, ~360 CSS px), la sección "¿Listo para fortalecer la inocuidad de tu empresa?" genera un desplazamiento horizontal de ~24px: el bloque `.cta-grid` estaba en dos columnas sin restricción de `min-width` en sus ítems, y el correo electrónico largo (`formacion_academica@proinocuidad.com`) no podía partirse, forzando la columna a 370px dentro de un contenedor de 331px. El resto de la página ya estaba auditado a 360px; este bloque quedó fuera de la auditoría anterior.

## What Changes

- **`.cta-grid` (home)**: columnas cambiadas a `minmax(0, 1.1fr) minmax(0, 0.9fr)` y apiladas a `minmax(0, 1fr)` en móvil, con `min-width: 0` en los ítems y `overflow-wrap: anywhere` en el texto del ítem.
- **Sin cambios de contenido**: solo CSS; no se tocan textos, colores, enlaces ni datos de contacto (cumple "Contenido sin cambios").
- **Verificado**: `scrollWidth == clientWidth` a 360, 390 y 412px; medido con Playwright.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: extender "Bloques de dos columnas sin desbordamiento" para incluir `.cta-grid` de la sección CTA de Inicio, con los mismos criterios (sin desplazamiento horizontal a 360/390px y en escritorio).

## Impact

- `assets/css/main.css`: reglas de `.cta-grid`, `.cta-info`, `.cta-items`, `.cta-item` y `.cta-item > span`.
- `index.html`: sin cambios (solo CSS).
- `CHANGELOG.md`: entrada del fix.