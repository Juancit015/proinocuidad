# Proposal

## Why

En todas las páginas, al llegar al final del documento, los dos botones flotantes (WhatsApp a la izquierda y "volver arriba" a la derecha) se superponen a la barra azul de copyright: el de WhatsApp tapa el inicio de "© 2026 Proinocuidad…" y, en pantallas estrechas, parte de la segunda línea. El texto queda ilegible justo en el pie, que es lo último que ve quien termina de leer una ficha o el Home.

## What Changes

- **Los flotantes frenan sobre la barra de copyright**: cuando la barra sube lo suficiente como para tocar los botones, ambos se desplazan hacia arriba lo justo para quedar apoyados sobre su borde superior. No desaparecen: siguen visibles y clicables, pero ya no pisan el texto.
- **El freno sigue al scroll, sin transición propia**: el desplazamiento se recalcula en cada frame de scroll, de modo que el botón queda pegado al borde de la barra mientras esta sube; al subir la página, vuelven a su posición base (`bottom: 26px`).
- **El botón de subir mantiene su regla**: sigue apareciendo solo con más de 400px de desplazamiento; el freno solo lo desplaza cuando ya está visible.
- **Sin JavaScript**: se conserva el comportamiento actual (los flotantes quedan fijos y pueden tapar la barra); no hay cambios de HTML ni del generador.

## Capabilities

### New Capabilities

- `botones-flotantes`: define hasta dónde llegan los dos botones fijos del sitio (WhatsApp y volver arriba) cuando el pie de página entra en su zona, y cómo vuelven a su posición al subir.

### Modified Capabilities

(none)

## Impact

- `assets/css/main.css`: propiedad `translate` en `.flotante-whatsapp` y `.to-top-proi`, alimentada por una variable CSS; se excluye del `transition` para que no arrastre retardo.
- `assets/js/main.js`: cálculo del freno en scroll y resize con `requestAnimationFrame`, escribiendo una sola variable CSS en `documentElement`.
- Sin cambios en HTML, `tools/generar-fichas.mjs` ni `tools/generar-listados.mjs`: el JS y el CSS son compartidos por las 18 páginas.
- Spec nueva `openspec/specs/botones-flotantes/spec.md`.

## Assumptions

- "Frenar, no desaparecer" se implementa como **detenerse sobre la barra**, no como ocultarse ni como desvanecerse.
- El umbral es el borde inferior de los flotantes (`bottom: 26px`): la barra empieza a empujarlos cuando su borde superior cruza `alto de ventana − 26px`.
- El freno es la diferencia entre ese límite y la posición de la barra: al final de la página el borde inferior de cada flotante coincide con el borde superior de la barra.
- La regla aplica a los dos botones, incluido "volver arriba", porque el pedido habla de "los botones flotantes" en plural.
- A 390px el botón de WhatsApp queda junto al primer icono de redes; medido, el círculo pintado no lo toca (solo roza 9×6px de la caja de 40px que lo contiene).
- Es un comportamiento progresivo: sin JS el sitio sigue funcionando como hoy.
