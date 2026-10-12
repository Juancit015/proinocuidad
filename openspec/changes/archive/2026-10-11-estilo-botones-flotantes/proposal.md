# Proposal

## Why

El botón flotante de WhatsApp usa el carácter "✆", que se ve pobre frente al botón de Crecepe (círculo verde con icono SVG y sombra). Además está a la derecha y no existe botón de subir. Replicar el estilo Crecepe a la izquierda unifica la identidad de ambos sitios. Solo estilo: sin JS ni cambios de comportamiento.

## What Changes

- `.flotante-whatsapp`: sustituye el "✆" por el icono SVG de WhatsApp (el mismo ya usado en el footer), tamaño 58 px, fondo `#25D366`, sombra verde y hover con escala, como `.contact-dial__main` de Crecepe. Mismo `href`, `aria-label` y paleta (ya existe `--whatsapp`).
- Nuevo botón `.to-top-proi` de subir (círculo 48 px azul `--azul`, flecha SVG blanca hacia arriba, hover con escala), fijo a la izquierda encima del WhatsApp. Es un ancla `href="#"` (nativo, sin JS): siempre visible.
- Ambos a la izquierda: WhatsApp `left: 26px; bottom: 26px`, subir `left: 26px; bottom: 96px` (espejo de Crecepe).
- Alcance HTML: 5 páginas manuales + plantilla `tools/generar-fichas.mjs` + regeneración de las 8 fichas (14 bloques `.flotante-whatsapp` + 14 botones nuevos). CSS solo en `assets/css/main.css`.
- Sin JS, sin cambios de `href`, textos, ni SEO. No se replica el menú abanico (dial) de Crecepe: solo el diseño del botón principal.

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual; el botón subir es un ancla nativa sin lógica.

### Modified Capabilities

Ninguna. Ningún spec cubre botones flotantes; `contacto-footer` y demás siguen intactos.

## Impact

- `assets/css/main.css`: reglas `.flotante-whatsapp` y `.to-top-proi`.
- 13 HTML + `tools/generar-fichas.mjs`.
- Sin dependencias, sin JS.
