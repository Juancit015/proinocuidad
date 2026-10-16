# Spec Delta

## ADDED Requirements

### Requirement: Ficha sin desplazamiento horizontal en rango intermedio
La ficha de curso SHALL ajustarse al ancho de la pantalla en el rango intermedio (681–1040px). Ninguna fila, tarjeta, texto o control de la ficha SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: Ficha en 768px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 768px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en 900px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 900px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Tarjeta de Transferencia BBVA sin desborde
- **WHEN** el usuario ve la tarjeta de Transferencia BBVA en rango intermedio
- **THEN** el texto del CCI y el botón "Copiar CCI" se acomodan sin sobresalir del ancho visible

#### Scenario: Bloque QR sin desborde
- **WHEN** el usuario ve el bloque QR destacado en rango intermedio
- **THEN** la imagen del QR y su información se acomodan sin sobresalir del ancho visible

#### Scenario: Desktop ancho y móvil sin cambios
- **WHEN** el usuario abre la ficha por encima de 1040px o en 360/390px
- **THEN** se conservan el layout de 2 columnas con sticky y el comportamiento ya verificado en móvil
