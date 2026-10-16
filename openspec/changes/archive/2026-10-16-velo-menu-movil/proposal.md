# Proposal

## Why

Al abrir el menú móvil, el contenido de la página sigue completamente iluminado detrás del panel. El panel proyecta su propia sombra hacia abajo, pero el fondo no se atenúa, así que el menú se siente pegado sobre la página en lugar de por encima. En un panel que ocupa casi toda la pantalla, el usuario no distingue con claridad dónde termina el menú y empieza la página.

## What Changes

- Al abrir el menú hamburguesa en móvil, aparece un **velo tenue** sobre el contenido que queda detrás, del mismo azul marino del sitio, por debajo del borde inferior de la cabecera para que la barra siga nítida.
- **Tocar el velo cierra el menú**, igual que el botón de cerrar y la tecla Escape. Hoy el menú no se cierra de ninguna otra forma al tocar fuera, y un fondo oscurecido que no responde al toque se percibe como un error.
- El velo aparece y desaparece junto con el panel, con la misma duración y respetando `prefers-reduced-motion`.
- El comportamiento del menú en escritorio no cambia: el velo es exclusivo del panel móvil.

**Fuera de alcance (no objetivos):** no se cambia la opacidad, el color ni el aspecto del panel, ni el de la cabecera; no se cambia el menú móvil en escritorio; no se bloquea el desplazamiento del fondo con el menú abierto (el usuario puede seguir moviéndose la página detrás del velo); no se añade un botón nuevo de cierre, porque la ✕ ya existe; no se tocan los iconos flotantes ni sus sombras.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `navegacion-global`: el panel móvil SHALL atenuar el fondo con un velo al abrirse y SHALL cerrarse al tocarlo.

## Impact

- `assets/css/main.css` (regla `::after` sobre `.site-header` dentro de `@media (max-width: 860px)`, más su línea en el bloque de `prefers-reduced-motion`).
- `assets/js/main.js` (detección del toque fuera del panel para cerrar el menú).
- `CHANGELOG.md`.
- Sin cambios de HTML: el velo se genera con `::after` y el estado lo aporta la clase `.menu-abierto` que ya existe. Sin dependencias y sin efecto en el SEO.