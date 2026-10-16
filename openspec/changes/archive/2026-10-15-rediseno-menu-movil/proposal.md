# Proposal

## Why

La navegación móvil hereda la presentación del mega menú de escritorio y los grupos Servicios y Cursos requieren un primer toque para abrirse y otro para seguir el enlace principal. Un panel móvil propio, con controles táctiles claros y accesibles, permitirá encontrar y abrir las opciones de navegación con menos fricción.

## What Changes

- Rediseñar la navegación de hasta 860px como un panel móvil amplio, con filas legibles, botón de cierre visible y jerarquía visual propia.
- Mantener los enlaces Servicios y Cursos como acceso directo a sus páginas y usar un control «+» independiente para desplegar cada acordeón sin cerrar el menú.
- Mantener los submenús como acordeones de una columna y cerrar el panel al navegar o al pulsar Escape.
- Mantener la navegación, el mega menú y la presentación de escritorio sin cambios.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `navegacion-global`: definir una experiencia móvil propia, controles separados para los acordeones y cierre accesible del panel.

## Impact

- `assets/css/main.css` para la presentación del menú móvil.
- `assets/js/main.js` para el comportamiento de apertura, cierre y acordeones.
- Plantillas HTML globales de navegación para controles de acordeón independientes y accesibles.
- Delta de especificación `navegacion-global`.
