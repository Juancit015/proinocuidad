# Design

## Context

- Hero de Inicio: `section.hero > .container.hero-grid` (`index.html` ~129). Grilla `1.15fr 0.85fr` con texto (div) e imagen (`.hero img`).
- Bloques de dos columnas: `.container.identidad-grid` (grilla `1fr 1fr`, `gap: 40px`), con texto en el primer hijo e imagen en el segundo. Aparecen en `index.html` (~206), `nosotros/index.html` (~88) y `servicios/index.html` (~89, 143, 162, 181).
- Ya existe `@media (prefers-reduced-motion: reduce)` en `main.css` (~330) para tarjetas y footer; se reutiliza el mismo patrón.
- `assets/js/main.js` es un IIFE con menú, acordeón, Escape y botón subir. No tiene observador de entrada.
- Cabeceras `.page-head` (una columna, con imagen de fondo) quedan fuera del alcance.

## Goals / Non-Goals

**Goals:**
- Entrada izquierda/derecha con el mismo movimiento en hero y bloques de dos columnas.
- Sin ocultar contenido si falla JavaScript o si hay movimiento reducido.

**Non-Goals:**
- No animar `.page-head`, tarjetas, menú, botones ni pie de página.
- No cambiar marcado, textos, colores, tamaños ni enlaces.
- No usar librerías de animación.

## Decisions

**1. Estado inicial solo si JavaScript marca la página.**
Para no ocultar contenido sin JavaScript, la clase de estado inicial se añade desde JS en `<html>` (`js-anim`) antes de pintar; las reglas de ocultación dependen de `html.js-anim`. Alternativa (ocultar por defecto en CSS) descartada: deja el contenido invisible sin JavaScript.

**2. Hero: animación con `@keyframes` en carga.**
Con `html.js-anim .hero-grid > div:first-child` (texto) y `.hero-grid > img`/`.hero-grid > div:last-child` (imagen), `animation: entrada-izq 700ms ease-out both` y `entrada-der 700ms ease-out 120ms both`. No necesita JavaScript adicional tras la clase de página.

**3. Bloques de dos columnas: `IntersectionObserver`.**
`main.js` observa `.identidad-grid` y, al entrar en pantalla, añade `.en-vista`. Las reglas `html.js-anim .identidad-grid:not(.en-vista) > ...` ocultan con desplazamiento; `.en-vista` las anima. Se desconecta el observador tras la primera vez (una sola vez).

**3b. Dirección por tipo de elemento, no por posición.**
El orden de los hijos no es uniforme: en Nosotros y en el hero el texto va primero, pero en el bloque de Inicio (`index.html` ~206) la imagen va primero. Por eso el texto (`> :not(img)`) entra desde la izquierda y la imagen (`> img`) desde la derecha, en todos los bloques. Así se cumple "texto a la izquierda, imagen a la derecha" aunque la imagen esté en la izquierda en el marcado. Se registra como decisión; el bloque de Inicio queda con la imagen a la izquierda visualmente, según su diseño actual.

**4. Movimiento reducido.**
`@media (prefers-reduced-motion: reduce)` pone `animation: none` y no aplica el estado oculto.

**5. Valores.**
Desplazamiento 32px, opacidad 0 → 1, 700ms, `ease-out`, escalonado 120ms entre texto e imagen.

## Risks / Trade-offs

- [Riesgo] Si el observador no se ejecuta, los bloques quedan ocultos. → Mitigación: la clase `js-anim` se quita si el observador no se crea, y el contenido queda visible.
- [Riesgo] Los bloques largos que entran parcialmente pueden tardar en activarse. → Mitigación: umbral bajo (`threshold: 0.15`).
- [Riesgo] La imagen del hero (AVIF) puede cargar después de la animación. → Aceptado: la animación es de transform/opacidad, no depende de la imagen.
- [Riesgo] Ocultar con `opacity` puede afectar la lectura de accesibilidad. → No: el contenido sigue en el DOM y se muestra al terminar.

## Migration Plan

Cambios en `assets/css/main.css` y `assets/js/main.js`. Rollback con respaldo previo a editar (`/tmp/opencode/respaldo-animacion-entrada/`).

## Open Questions

Ninguna.
