# Diseño responsive (delta)

## Purpose

Evitar el desbordamiento horizontal en los bloques de dos columnas (texto e imagen) del sitio en tableta y móvil.

## ADDED Requirements

### Requirement: Bloques de dos columnas sin desbordamiento
Los bloques `.identidad-grid` de Inicio, Nosotros y Servicios, y los equivalentes de las fichas de curso, SHALL ajustarse al ancho de la pantalla en tableta y móvil. Ninguna imagen ni texto de estos bloques SHALL sobresalir del ancho visible.

#### Scenario: Quiénes somos en móvil
- **WHEN** el usuario abre Inicio, Nosotros o Servicios con un ancho de 360px o 390px
- **THEN** la página no tiene desplazamiento horizontal y la imagen queda dentro del ancho de la pantalla

#### Scenario: Tableta
- **WHEN** el ancho es 768px
- **THEN** la página no tiene desplazamiento horizontal y el bloque ocupa el ancho del contenedor

#### Scenario: Escritorio sin cambios
- **WHEN** el ancho es 1024px o más
- **THEN** los bloques de dos columnas mantienen su disposición actual

### Requirement: Imagen con proporción conservada
Las imágenes de los bloques de dos columnas SHALL conservar su proporción original al ajustarse al ancho de la columna.

#### Scenario: Imagen en columna estrecha
- **WHEN** la columna mide menos que el ancho natural de la imagen
- **THEN** la imagen se reduce proporcionalmente sin recortarse
