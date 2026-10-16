# Proposal

## Why

81 de los 113 enlaces a WhatsApp del sitio abren el chat vacío, así que el asesor recibe "Hola" a secas y tiene que preguntar desde qué curso o servicio viene la consulta. Los 32 que sí llevan mensaje están solo en las fichas de curso, lo que además deja la misma tarjeta de curso hablando distinto según si se ve en el listado o en su ficha.

## What Changes

- Añadir un mensaje prellenado a los **81 enlaces de WhatsApp que hoy lo abren vacío**, con un texto que corresponda a la intención de cada enlace según dónde se presionó.
- Unificar las tarjetas de curso del home y de `cursos/index.html` con las de sus fichas: ambas cardinas "Hola, deseo más información y matricularme en [curso]".
- Definir el catálogo de mensajes por contexto como parte de la spec, para que añadir un botón nuevo obligue a decidir su mensaje y no lo deje vacío por omisión.
- Codificar los mensajes con `encodeURIComponent` en el HTML generado, igual que ya hacen las fichas.

**Fuera de alcance (no objetivos):** no se cambia el número de WhatsApp, ni el texto visible del botón, ni su icono, color, tamaño o posición, ni `target`/`rel`; no se toca el formulario de inscripción ni su envío por FormSubmit; no se modifica el formulario embebido de cada ficha; los 32 mensajes ya existentes se conservan y solo se les unifica el nombre del curso cuando usen una forma abreviada que no coincide con la oficial; no se añade JavaScript para componer el mensaje en tiempo de carga.

## Capabilities

### New Capabilities

- `contacto-whatsapp`: cómo el sitio habla con el asesor por WhatsApp — catálogo de mensajes por contexto, regla de que ningún enlace queda vacío, coherencia entre páginas y codificación del texto.

### Modified Capabilities

(none)

## Impact

- `tools/generar-fichas.mjs` (2 enlaces compartidos por las 8 fichas: contacto del footer y botón flotante) y sus 8 salidas, regeneradas.
- `tools/generar-listados.mjs` (tarjeta "WhatsApp" de cada curso en los 2 listados) y sus salidas en `index.html` y `cursos/index.html`, regeneradas.
- 12 HTML escritos a mano: enlaces de contacto y CTA de `index.html`, `inocuidad-alimentaria/`, `nosotros/`, `noticias/`, `servicios/index.html` y las 4 subpáginas de `servicios/`.
- `CHANGELOG.md` y `STRUCTURE.md` (el catálogo como referencia del proyecto).
- Sin dependencias nuevas, sin JavaScript, sin cambios en el número, el texto de los botones ni su aspecto.