# Spec Delta

## ADDED Requirements

### Requirement: CTA final en la guía
La guía de inocuidad SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 "¿Necesitas ayuda con la inocuidad de tu empresa?" con "inocuidad" en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). Fondo azul oscuro con imagen existente y botones existentes.

#### Scenario: CTA visible en la guía
- **WHEN** el usuario llega al final de `inocuidad-alimentaria/`
- **THEN** ve el CTA con su titular, texto y los 2 botones antes del footer
