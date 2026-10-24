# Design

## Context

Ver `proposal.md - Why`. Los dos flotantes son `position: fixed` con `bottom: 26px`: `.flotante-whatsapp` (58px, `z-index: 90`) y `.to-top-proi` (48px, oculto hasta 400px de scroll). La barra `.footer-bottom` es la última franja del documento, con fondo azul oscuro y dos líneas de texto. Medidos al final de la página: la barra mide 132px de alto a 390×740, 90px a 683×623 y a 1024×768, y 57px a 1440×900; el freno necesario es 106px, 64px, 64px y 31px respectivamente.

## Goals / Non-Goals

**Goals:**
- Que ningún flotante se pinte sobre la barra de copyright, sin ocultarlo.
- Que el botón quede apoyado sobre la barra y siga siendo clicable y enfocable.
- Que el cambio sea de una sola pieza para las 18 páginas, sin tocar HTML ni generadores.

**Non-Goals:**
- No se mueve la barra de copyright ni se le añade espacio.
- No se cambia el mensaje, el tamaño ni la posición base de los flotantes.
- No se toca el velo del menú móvil ni su requisito.

## Decisions

- **Frenar, no ocultar.** El pedido es explícito: el botón debe detenerse sobre la barra, no desvanecerse ni desaparecer. Un `visibility: hidden` o un `opacity: 0` quedan descartados aunque fueran más simples.
- **Freno proporcional con una variable CSS.** `main.js` calcula en cada scroll `freno = max(0, (alto de ventana − 26px) − borde superior de la barra)` y lo escribe en `--freno-flotantes` sobre `documentElement`; el CSS aplica `translate: 0 calc(-1 * var(--freno-flotantes, 0px))`. Con eso el borde inferior del botón cae exactamente sobre el borde superior de la barra y el valor vuelve a 0 al subir.
- **`translate`, no `transform`.** `transform` ya lo usa el hover de ambos botones (`scale`); la propiedad individual `translate` se compone con él y evita reescribir cada estado de hover. Alternativa descartada: animar `bottom` (provoca layout por frame).
- **`translate 0s` dentro del `transition`.** La base de `.flotante-whatsapp` es `transition: var(--transicion)` (`all 0.25s`); si el freno entrara ahí, el botón llegaría 250ms tarde y se solaparía con la barra durante el scroll. Se declaran las propiedades que sí animan (color, sombra, `transform`) y se deja `translate` sin duración. Alternativa descartada: quitar la transición entera y perder el hover.
- **`requestAnimationFrame` + listener de `scroll` pasivo, no `IntersectionObserver`.** El observer solo dice si la barra entra o sale; el freno necesita el solape exacto en cada frame. El trabajo por frame es una lectura de `getBoundingClientRect` y una escritura de variable, agrupadas en un solo rAF.
- **El umbral sale del `bottom` calculado del flotante** (`parseFloat(getComputedStyle(...).bottom)`, 26px), no de un número duplicado en el JS. Si mañana cambia la separación en CSS, el freno la sigue.
- **Movimiento reducido sin caso especial.** El freno no es una transición sino un desplazamiento ligado al scroll; al excluir `translate` de la transición, también queda inmediato con `prefers-reduced-motion: reduce`.
- **Progresivo.** Sin JS, o sin soporte de `translate`, no se escribe la variable y todo queda como hoy.

## Risks / Trade-offs

- [Riesgo] A 390px el botón de WhatsApp (26–84px) roza la caja del primer icono social (75–115px, 528–568px): el solape medido es de 9×6px de esa caja, mientras el SVG pintado (20px centrado) empieza en 85px y queda intacto → Mitigación: se verificó con captura a 3×; si molesta, el ajuste sería mover 6px el botón, no cambiar el freno.
- [Riesgo] El `transform: scale()` del hover baja el borde del botón ~1.7px dentro de la barra (18px de padding superior) → Mitigación: solo alcanza el fondo, nunca el texto; es el hover que ya existía y el estado de reposo queda a 0px.
- [Riesgo] Un listener de scroll por frame puede costar caro → Mitigación: `{ passive: true }`, un solo `requestAnimationFrame` pendiente a la vez y una única escritura de variable.
- [Riesgo] El freno depende de `translate` (Chrome 104+, Safari 14.1+, Firefox 72+) → Mitigación: sin soporte, la propiedad se ignora y el sitio queda como hoy; no hay error.
- [Riesgo] El alto de la barra cambia con el ancho (132/90/57px) → Mitigación: el cálculo usa su posición real, no una altura fija.
- [Riesgo] El `resize` deja el valor viejo hasta el siguiente scroll → Mitigación: se recalcula también en `resize` y al cargar.

## Migration Plan

Sitio estático: se publican `assets/css/main.css` y `assets/js/main.js` juntos. Revertir el commit devuelve el comportamiento anterior sin migración de datos.

## Open Questions

(none)
