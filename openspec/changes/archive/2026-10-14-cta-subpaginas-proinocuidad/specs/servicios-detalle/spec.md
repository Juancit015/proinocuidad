# Spec Delta

## ADDED Requirements

### Requirement: CTA final en páginas de detalle
Cada una de las 4 páginas de detalle (registro sanitario, certificación HACCP, FSSC 22000, BRCGS) SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 único de esa página con su keyword en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). El bloque SHALL usar fondo azul oscuro con imagen existente y botones existentes. Ningún H2 SHALL repetirse entre páginas.

#### Scenario: CTA visible al final
- **WHEN** el usuario llega al final de cualquier página de detalle
- **THEN** ve badge, titular propio con keyword resaltada, texto y los 2 botones antes del footer

#### Scenario: titulares únicos
- **WHEN** se comparan los H2 del CTA de las 4 páginas
- **THEN** no hay dos iguales

#### Scenario: botones del CTA
- **WHEN** el usuario pulsa cada botón
- **THEN** WhatsApp abre wa.me/51981365982 y el secundario navega a `servicios/index.html`
