# Design

## Context

- Footer: `.footer-grid` pasa a `1fr` en `@media (max-width: 560px)` (`assets/css/main.css`, ~488). En 561–860px tiene dos columnas (~452). La alineación de texto no está definida en esas reglas, así que hereda la izquierda.
- Tarjetas de Cursos: `#lista-cursos` usa `.cards-grid`, que pasa a dos columnas en `max-width: 860px` (~458) y a una en `max-width: 560px` (~487). Las tarjetas de curso se generan por JS en `cursos/index.html`.
- Tarjetas de Servicios: `servicios/index.html` (~115) usa `.cards-grid` con la misma regla.
- Inicio usa `.cards-grid.four` (cuatro columnas, dos en ≤1020px) en "Nuestros servicios" y "Cursos destacados". Por la especificidad de `.cards-grid.four`, la regla de `.cards-grid` no las afecta, así que siguen en dos columnas incluso en móvil. Se cambian a una columna en ≤860px, igual que Cursos.
- Las tarjetas de curso tienen botones apilados (`.card-acciones`) y chips; con dos columnas se comprimen.

## Goals / Non-Goals

**Goals:**
- Footer centrado en móvil.
- Una columna de tarjetas en Cursos y Servicios hasta 860px.
- Informe de auditoría completo en los 6 anchos y las 13 páginas.

**Non-Goals:**
- Rediseñar tarjetas, cambiar tamaños de texto o de imágenes.
- Cambiar las 4 columnas de escritorio de Inicio (1024px y más).
- Cambiar marcado HTML ni `cursos-data.js`.

## Decisions

**1. Footer centrado en `max-width: 560px`.** Se añade `text-align: center` y se centran los bloques (`.footer-brand`, `.footer-contacto`, `.footer-links`, `.redes-sociales` con `justify-content: center`). Los enlaces con `::before` (la línea roja) se mantienen; al centrar, el `padding-left` de hover se ajusta para no desplazar el texto. Alternativa: umbral de 860px. Se descarta por defecto y se aplica solo si el usuario lo pide.

**2. Tarjetas en una columna por `max-width: 860px`.** Se cambia `.cards-grid` a una columna dentro del bloque de 860px, en lugar de dos. Esto afecta a Cursos y Servicios. Inicio usa `.cards-grid.four`, que tiene mayor especificidad; se añade `.cards-grid.four { grid-template-columns: 1fr; }` en el mismo bloque de 860px para que "Cursos destacados" y "Nuestros servicios" también se apilen. Se verifica que las tarjetas no pierdan el ancho máximo (sin `max-width` extra, ocupan el contenedor).

**3. Auditoría en navegador local.** Se sirve el sitio con `python3 -m http.server` en 127.0.0.1 y se mide con la herramienta de navegador en iframes de cada ancho. Se registran: desbordamiento horizontal (`scrollWidth > clientWidth`), texto cortado, botones que se salen de su tarjeta y footer sin centrar. Los resultados van al informe en el chat y, si el usuario lo pide, a un archivo en `/tmp/opencode/`.

**4. Limitación conocida.** El navegador de la herramienta no siempre dispara `IntersectionObserver` dentro de iframes; esta auditoría no depende de eso, pero las capturas deben confirmarse visualmente.

## Risks / Trade-offs

- [Riesgo] Cambiar `.cards-grid` a una columna hasta 860px hace las páginas más largas. → Aceptado: es lo que pidió el usuario.
- [Riesgo] Centrar el footer puede afectar al enlace de WhatsApp o a las redes. → Se revisa en la auditoría de 360 y 390px.
- [Riesgo] La auditoría depende del navegador de la herramienta. → Se declara en el informe qué anchos se verificaron.

## Migration Plan

Cambios solo en `assets/css/main.css`. Respaldo previo en `/tmp/opencode/respaldo-responsive-footer-cards/`. Revertir restaurando ese respaldo.

## Open Questions

Ninguna. Las dos asunciones de `proposal.md` (umbrales de 560 y 860px) quedan registradas.
