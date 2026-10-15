# Spec Delta

## MODIFIED Requirements

### Requirement: CTA Solicitar más información
Cada ficha SHALL incluir un botón "Matricularme Ahora" que haga scroll al formulario de inscripción dentro de la misma ficha (`#form-inscripcion`). El Google Form público (`/viewform`, nunca `/edit`) queda como respaldo documentado, no como destino principal.

#### Scenario: CTA hacia el formulario interno
- **WHEN** el usuario hace clic en "Matricularme Ahora" en la ficha de cualquier curso
- **THEN** la página hace scroll a su formulario embebido, nunca a un sitio externo

#### Scenario: CTA hacia el formulario
- **WHEN** el formulario embebido no está disponible
- **THEN** el Google Form público (versión `/viewform`, nunca la versión interna `/edit`) sigue accesible como respaldo
