# Design

## Context

Cambio transversal de responsive en el rango tableta (560–860px). El sitio tiene breakpoints en 560 y 860px pero salta de 4 columnas a 1 sin pasar por 2, y el footer pasa de 4 columnas a 2 por debajo de 1020px y a 1 en tableta y móvil, lo que se ve estrecho en tableta. Restricciones: no tocar textos/colores/enlaces/datos; no modificar la paleta; solo CSS salvo que el markup lo exija.

## Goals / Non-Goals

**Goals:**
- Que en 560–860px las rejillas de tarjetas usen 2 columnas.
- Que el footer se apile como en móvil (1 columna centrada) en ese rango.
- Que el bloque de contacto, la imagen del hero/Nosotros y el giro se adapten sin desbordar.
- Que las tarjetas de misión/valores usen 2 columnas en tableta.

**Non-Goals:**
- No cambiar el comportamiento por debajo de 560px ni por encima de 860px.
- No tocar textos, colores, enlaces ni datos de contacto.
- No modificar la paleta ni los estilos de otros bloques.
- No rediseñar la sección "asesoría sin compromiso" (ya se ve bien).

## Decisions

- **Reutilizar el rango existente 560–860px** en lugar de añadir un breakpoint nuevo: ya hay media queries ahí (`@media (min-width: 560px) and (max-width: 860px)`). Añadir reglas dentro de ellas mantiene la coherencia. Alternativa: nuevo breakpoint a 768px; descartada porque duplicaría media queries.
- **`cards-grid` y `cards-grid.four` → 2 columnas en 560–860px**: sobrescribir la regla actual (`@media (max-width: 860px) { .cards-grid, .cards-grid.four { grid-template-columns: 1fr; } }`) para que en 560–860px sea `repeat(2, 1fr)` y solo colapse a 1 columna por debajo de 560px. Alternativa: 2 columnas solo en `.four`; descartada porque el usuario pidió 2 para todas las tarjetas.
- **Footer en tableta → apilar como móvil**: reutilizar las reglas de `@media (max-width: 560px)` para el footer en el rango 560–860px (grid 1 columna, centrado, footer-bottom column). Alternativa: mantener 2 columnas; descartada porque el usuario las ve estrechas.
- **`.footer-bottom` centrado en tableta**: `flex-direction: column; align-items: center; text-align: center`.
- **Bloque de contacto**: en tableta, `.cta-card` («Solicita una asesoría») se limita a 520px y `.nota-card` a 640px, ambas con `margin-inline: auto`.
- **`.mvv-grid` → 2 columnas en 560–860px**: cambiar de `1fr` (≤800px) a `repeat(2, 1fr)` en el rango tableta.
- **Imágenes de `.identidad-grid` y hero**: `max-height` reducida en tableta (ej. 280px) y `object-fit: cover` para no acaparar.
- **Giro de logos**: reducir tamaño de imágenes en tableta (max-width/max-height).

## Risks / Trade-offs

- [Riesgo] Cambiar `.cards-grid` de 1 a 2 columnas en tableta puede afectar tarjetas con texto largo → Mitigación: verificar a 768px que no haya desbordamiento; ajustar gap si hace falta.
- [Riesgo] El footer apilado en tableta puede dejar mucho espacio vertical → Mitigación: aceptable, es el comportamiento móvil que el usuario aprueba.
- [Riesgo] Las media queries anidadas pueden tener especificidad inesperada → Mitigación: verificar con `getComputedStyle` en Playwright.

## Open Questions

(none)