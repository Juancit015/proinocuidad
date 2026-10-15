# Spec Delta

## ADDED Requirements

### Requirement: Ficha sin espacio residual pre-footer
Entre el final del contenido de la ficha (última tarjeta de la columna principal) y el footer SHALL haber solo la separación coherente del layout (padding inferior de `.ficha-cuerpo` + margen de la última sección). No SHALL existir un bloque de aire de cientos de píxeles.

#### Scenario: Final de ficha en desktop
- **WHEN** el usuario hace scroll al final de una ficha en 1280px
- **THEN** tras la tarjeta del formulario solo hay una separación corta antes del footer, sin banda blanca larga

#### Scenario: Final de ficha en móvil
- **WHEN** el usuario hace scroll al final de una ficha en 390px
- **THEN** tras la tarjeta del formulario solo hay una separación corta antes del footer, sin banda blanca larga

#### Scenario: Resto del layout intacto
- **WHEN** se aplica el ajuste
- **THEN** el layout de 2 columnas, el sidebar sticky, los fixes de desborde y el formulario siguen funcionando igual
