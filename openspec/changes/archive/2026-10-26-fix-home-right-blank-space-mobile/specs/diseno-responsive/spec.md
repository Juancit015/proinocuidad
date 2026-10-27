# Spec Delta

## ADDED Requirements

### Requirement: Sección CTA de Inicio sin desplazamiento horizontal
El bloque `.cta-grid` de la sección "¿Listo para fortalecer la inocuidad de tu empresa?" de Inicio (`index.html`) SHALL ajustarse al ancho de la pantalla en móvil y tableta. Ningún texto ni elemento de este bloque (incluido el correo electrónico largo y el teléfono) SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: CTA en 360px
- **WHEN** el usuario abre Inicio con un ancho de 360px
- **THEN** la página no tiene desplazamiento horizontal y el bloque CTA queda dentro del ancho visible

#### Scenario: CTA en 390px
- **WHEN** el usuario abre Inicio con un ancho de 390px
- **THEN** la página no tiene desplazamiento horizontal y el bloque CTA queda dentro del ancho visible

#### Scenario: CTA en tableta
- **WHEN** el ancho es 768px
- **THEN** la página no tiene desplazamiento horizontal y el bloque CTA ocupa el ancho del contenedor

#### Scenario: Escritorio sin cambios
- **WHEN** el ancho es 1024px o más
- **THEN** el bloque CTA mantiene su disposición de dos columnas actual