# Design

## Context

Ver motivación en `proposal.md`. Estado verificado:

- Las 6 páginas terminan con una sección de contenido y `</main>` + footer global; inserción: `<section class="cta-sub">` antes de `</main>`.
- Patrón AZ (`.cta-section`): badge + h2 con span + texto + 2 botones (primario WhatsApp, secundario a servicios). En Proinocuidad equivale a: badge propio, h2 con span `#ff8f96` (tono de keywords, ya usado en banners), botones `.btn-rojo` y `.btn-azul` existentes, fondo azul oscuro con imagen existente + overlay (patrón `.cta-home`).
- Rutas relativas al índice de servicios: `../index.html` desde detalle, `servicios/index.html` desde guía y nosotros.

## Goals / Non-Goals

**Goals:**

- CTA centrado de una columna reutilizando variables, botones y overlay existentes.
- Titular único por página con su keyword; resto del bloque idéntico.

**Non-Goals:**

- Nuevas fotos, colores, botones o textos con plazos/cifras; tocar home, servicios, noticias, cursos o fichas.

## Decisions

- **Titulares por página** (keyword con span): registro "¿Necesitas el registro sanitario de tu producto?", certificación "¿Buscas la certificación HACCP de tu empresa?", FSSC "¿Quieres implementar FSSC 22000 en tu empresa?", BRCGS "¿Necesitas implementar BRCGS Food Safety?", guía "¿Necesitas ayuda con la inocuidad de tu empresa?", nosotros "¿Fortalecemos la inocuidad de tu empresa?".
- **Texto único para las 6**: "Cuéntanos qué necesita tu empresa y te orientamos sobre el servicio que corresponde." (sin promesas; vale igual para servicios y guía/nosotros).
- **Clase `.cta-sub` nueva** en vez de reutilizar `.cta-home`: aquel es grilla de 2 columnas con contactos; este es centrado simple. Comparten variables y botones.
- **Sin excepción móvil específica**: el bloque es una columna fluida; hereda el padding de `section`.

## Risks / Trade-offs

- [Riesgo] Bloque repetido en 6 páginas parece plantilla → Mitigación: es el comportamiento estándar de CTAs; los H2 únicos preservan el enfoque SEO.
- [Riesgo] Imagen de fondo recarga el texto → Mitigación: overlay ≥0.7 como en banners.

## Migration Plan

6 HTML + `main.css`, con respaldo previo. Rollback: respaldo. Sin commit/push ni despliegue. Revisión visual antes de archivar.
