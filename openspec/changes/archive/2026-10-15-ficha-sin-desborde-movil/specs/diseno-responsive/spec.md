# Spec Delta

## ADDED Requirements

### Requirement: Ficha de dos columnas sin desplazamiento horizontal
La ficha de curso con layout de dos columnas (`.ficha-layout`: contenido + sidebar) SHALL ajustarse al ancho de la pantalla en móvil. Ninguna fila, texto o control de la ficha SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: Ficha en 360px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 360px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en 390px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 390px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Fila de CCI sin desborde
- **WHEN** el usuario ve la tarjeta de Transferencia BBVA en 360px
- **THEN** el texto del CCI y el botón "Copiar CCI" se acomodan sin sobresalir del ancho visible

#### Scenario: Sticky intacto en escritorio
- **WHEN** el usuario abre la ficha en escritorio y hace scroll
- **THEN** el sidebar de matrícula sigue fijo (sticky) como hasta ahora
