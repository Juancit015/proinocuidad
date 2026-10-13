# Proposal

## Why

El bloque CTA de la home quedó funcional pero plano frente a la referencia: título de tarjeta pequeño y descentrado, nota inferior sin gancho, iconos monocromos y un subrayado al hover que Juan rechaza. Se refina solo presentación y una nota, sin tocar estructura, contactos ni botones.

## What Changes

- Título de la tarjeta más grande (1.4rem, como la referencia) y centrado junto con su descripción.
- Nota inferior nueva: "Escríbenos y recibe una propuesta personalizada. O <a>llámanos directo</a>." (enlace `tel:+51981365982` en azul oscuro). Desviación consciente de la idea de Juan: se omite "en menos de 24 horas" porque la regla del proyecto prohíbe plazos no confirmados; si Juan confirma ese plazo, se agrega.
- Sin subrayado al hover en el número de WhatsApp (se elimina la regla; el hover queda sin efecto).
- Chips de icono con color: WhatsApp en verde `--whatsapp` con glifo blanco; correo, horario y ubicación en blanco `--blanco` con glifo `--azul-oscuro` (patrón de la referencia, con variables propias).
- "inocuidad" del título principal en `#ff8f96` (tono de las palabras clave de subpáginas).
- Iconos en los 2 botones de la tarjeta: soporte/auriculares (trazo simple) en WhatsApp y sobre en correo; reutilizan la regla `.btn svg` existente (18px).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `pagina-inicio`: MODIFIED requisito del bloque final de contacto (título de tarjeta, nota con enlace, iconos de color, sin subrayado, tono del resaltado, iconos en botones). Estructura, contactos y destinos no cambian.

## Impact

- `index.html`: nota nueva con enlace `tel:`, clases modificadoras en 4 chips, 2 SVG en botones.
- `assets/css/main.css`: tamaños/centrado de tarjeta, chips de color, color del resaltado, eliminación del underline.
- Sin cambios de textos existentes salvo la nota, ni de enlaces previos, metadatos, otras secciones o producción (local).
