# Proposal

## Why

El footer usa enlaces de texto sin iconos (las 4 redes + comunidad WhatsApp) y su hover hereda el subrayado global, que el usuario rechaza visualmente. La barra de copyright es gris (`#9fa2b3`) sobre grafito: poco jerárquica y apagada como cierre del sitio. La barra superior (topbar) también muestra las redes como texto. Iconos + hover por color modernizan el cierre sin tocar contenido ni SEO.

## What Changes

- Quitar el subrayado en hover/foco de todos los enlaces del footer y la topbar (contacto, navegación, redes): el hover pasa a cambio de color, sin `text-decoration`. Solo ese ámbito; el resto del sitio conserva su hover.
- Convertir los enlaces de redes en botones con icono SVG inline (Facebook, YouTube, Instagram, LinkedIn y comunidad WhatsApp en el footer; las 4 redes en la topbar). Mismos `href`, `target="_blank"`, `rel="noopener"` y `aria-label` por red.
- Cambiar la barra `.footer-bottom` de gris sobre grafito a fondo azul oscuro institucional (`--azul-oscuro #0b0e56`) con texto blanco.
- Alcance HTML: 5 páginas manuales (`index.html`, `servicios/`, `nosotros/`, `noticias/`, `cursos/index.html`) + plantilla `tools/generar-fichas.mjs` + regeneración de las 8 fichas. CSS solo en `assets/css/main.css`.
- Sin cambios de textos, URLs, estructura, ni marcado SEO.

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual.

### Modified Capabilities

Ninguna. El spec `contacto-footer` sigue cumplido: mismos enlaces a las 4 redes en pestaña nueva, mismos datos de contacto y razón social; solo cambia su presentación.

## Impact

- `assets/css/main.css`: reglas `.redes-sociales`, `.footer-bottom`, `.topbar-social`, overrides de subrayado en ámbito footer/topbar.
- 13 HTML + `tools/generar-fichas.mjs` (plantilla del footer de fichas).
- Sin dependencias, sin JS, sin cambios SEO.

## Color de la barra (respuesta a la pregunta del usuario)

Recomendación aceptada: **azul oscuro `#0b0e56` con texto blanco**, no barra blanca. Motivo: el footer es grafito oscuro; una barra blanca crearía un corte brusco y sacaría el cierre de la identidad (el azul es el color institucional). El blanco sobre `#0b0e56` da contraste ~14:1, superior al gris actual sobre grafito.
