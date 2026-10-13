# Design

## Context

Ver motivación en `proposal.md`. Estado verificado (`assets/css/main.css` líneas 545-546, dentro de `@media (min-width: 861px)`):

- `min-height: clamp(360px, 55vh, 520px)` + flex centrado en las 4 variantes; título `clamp(2.4rem, 4vw, 3.2rem)`.
- Overlay, `fixed`, excepciones móvil/reduced-motion y textos no se tocan.

## Goals / Non-Goals

**Goals:**

- Banner un 15% más compacto con título reescalado en la misma proporción.

**Non-Goals:**

- Cambiar overlay, attachment, breakpoint, móvil o textos; redondear distinto del −15% exacto.

## Decisions

- **−15% exacto sin redondear** (`306px / 46.75vh / 442px` y `2.04rem / 3.4vw / 2.72rem`) en vez de valores "bonitos" (300/47/440): el pedido es un porcentaje exacto y CSS admite decimales; evita discutir qué redondeo vale.
- **Solo los dos valores del bloque 861px** en vez de tocar el padding base: el cambio vive entero en dos líneas, reversible con el respaldo.

## Risks / Trade-offs

- [Riesgo] A 1440px el 55vh→46.75vh da ~640→~545px, capado a 442px: el clamp superior manda; verificar en revisión visual que el título de dos líneas respira.
- [Riesgo] Orden de sync con `cta-home-banners-sticky-pc` → Mitigación: archivar aquel primero (restricción registrada en proposal y spec).

## Migration Plan

Dos valores en `main.css`, con respaldo previo. Rollback: respaldo. Sin commit/push ni despliegue. Revisión visual (Nosotros 1440px y 1024px) antes de archivar.
