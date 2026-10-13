# Spec Delta

## ADDED Requirements

### Requirement: CTA final en Servicios en lugar de la tarjeta de cierre
La página Servicios SHALL cerrar con una sección `.cta-sub` como última de `main`, en lugar de la tarjeta de cierre a la guía: badge "Asesoría sin compromiso", H2 "¿Impulsamos la inocuidad de tu empresa?" con "inocuidad" en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Leer la guía de inocuidad" (enlace relativo a la guía, para conservar ese acceso). Fondo azul oscuro con imagen existente y botones existentes.

#### Scenario: CTA visible en Servicios
- **WHEN** el usuario llega al final de `servicios/`
- **THEN** ve el CTA con su titular, texto y los 2 botones antes del footer, y ya no ve la tarjeta de cierre

#### Scenario: acceso a la guía conservado
- **WHEN** el usuario pulsa "Leer la guía de inocuidad"
- **THEN** navega a `inocuidad-alimentaria/`
