# Design

## Context

- Proinocuidad (`main.css` ~341-348): `.flotante-whatsapp { position: fixed; right: 22px; bottom: 22px; width: 56px; height: 56px; background: var(--whatsapp); font-size: 1.4rem; }` con contenido "✆". HTML: `<a class="flotante-whatsapp" href="https://wa.me/51981365982" ... aria-label="Escríbenos por WhatsApp">✆</a>`, repetido en 13 páginas + plantilla (`generar-fichas.mjs` línea ~300).
- Crecepe (`styles.css` 1862-1898 y 1901-1919): `.contact-dial__main` (58 px, `#25D366`, sombra verde, icono SVG) abajo-derecha; `.to-top` (48 px, `--primary` marino, flecha SVG 20 px, aparece con `.is-visible` vía JS, hover `scale(1.1)`).
- Restricción del usuario: solo estilo, sin funciones → sin JS, sin dial abanico, sin aparición por scroll.
- Ver `proposal.md` para motivación.

## Goals / Non-Goals

**Goals:**
- Botón WhatsApp con icono SVG estilo Crecepe, a la izquierda; botón subir estilo `.to-top` apilado encima.
- Cero JS; reutilizar variables (`--whatsapp`, `--azul`) y el path SVG de WhatsApp ya usado en el footer.

**Non-Goals:**
- No se replica el dial abanico ni sus tooltips/acciones.
- El subir no aparece/desaparece con scroll (requeriría JS): siempre visible como ancla `href="#"`.
- No cambian `href`, `aria-label`, textos, ni responsive general.

## Decisions

**1. Solo el botón principal del dial, no el dial.**
El dial de Crecepe (llamar/email/agendar + JS) excede lo pedido. Se copia `.contact-dial__main`: 58 px, fondo verde, `box-shadow: 0 8px 26px rgba(37,211,102,0.45)`, icono SVG `currentColor`. Alternativa (rediseño propio) descartada: el usuario pidió el de Crecepe.

**2. Subir como ancla `href="#"`, oculto en el inicio (ajuste: a la derecha + JS mínimo).**
El usuario pidió que vaya a la derecha y desaparezca al llegar arriba. Sin JS no hay aparición por scroll, así que se añade el JS mínimo en `assets/js/main.js` (todas las páginas lo cargan): `scroll` con `passive: true` que alterna `.is-visible` cuando `scrollY > 400`. CSS: oculto por defecto (`opacity: 0; visibility: hidden; pointer-events: none`), visible con `.is-visible`; `right: 26px; bottom: 26px` (18/26 px y 44 px en móvil, adaptado de Crecepe: al estar en lados opuestos no necesitan apilarse). `href="#"` conserva la subida nativa con el `smooth` existente. Alternativa (`<button>` muerto) descartada; alternativa (sin JS, siempre visible) descartada por el usuario.

**3. Ambos a la izquierda, apilados.**
WhatsApp `left: 26px; bottom: 26px`; subir `left: 30px; bottom: 96px` (centrado sobre el de 58 px: 26 + (58-48)/2 = 31 ≈ 30 px). Espejo exacto de las cotas de Crecepe. No chocan con el contenido: el footer ya es oscuro y el flujo es estático.

**4. Fichas vía plantilla.**
Igual que el change anterior: editar `generar-fichas.mjs` y regenerar, nunca fichas sueltas.

## Risks / Trade-offs

- [Riesgo] `href="#"` añade `#` a la URL al pulsar. → Mitigación: comportamiento nativo estándar, sin efecto SEO (los crawlers no pulsan); aceptado por "sin funciones".
- [Riesgo] Dos botones fijos a la izquierda pueden tapar contenido en pantallas de 360 px. → Mitigación: 58 + 48 px en columna ocupan lo mismo que el botón actual más aire; la tarea de QA lo revisa en móvil.
- [Riesgo] El icono SVG de WhatsApp (path largo) se repite 14 veces. → Mitigación: mismo patrón ya aceptado con los iconos de redes (~15 KB); sin petición extra.

## Migration Plan

- Publicar juntos `main.css`, 5 páginas manuales, plantilla y 8 fichas.
- Rollback: respaldos previos (tarea 1.1).

## Open Questions

Ninguna.
