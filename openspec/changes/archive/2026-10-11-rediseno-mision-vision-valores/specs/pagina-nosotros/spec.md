# Pagina Nosotros (delta)

## Purpose

Presentar Misión, Visión y Valores en tarjetas con cabecera e ícono, con la paleta del sitio.

## MODIFIED Requirements

### Requirement: Misión, visión y valores
La página SHALL incluir las secciones Misión, Visión y Valores con los textos del documento base (los valores son: compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente), presentadas como tres tarjetas en una fila con cabecera de color, ícono circular sobre el borde superior y el texto centrado en el encabezado; en móvil se apilan en una columna.

#### Scenario: Secciones de identidad
- **WHEN** el usuario navega por la página Nosotros
- **THEN** encuentra las secciones Misión, Visión y Valores con el contenido literal del documento base

#### Scenario: Disposición en escritorio
- **WHEN** el usuario ve la sección en una pantalla de escritorio
- **THEN** las tres tarjetas se muestran en una fila, con la misma altura, con un ancho máximo de 1000px centrado

#### Scenario: Efecto hover en tarjetas
- **WHEN** el usuario pasa el puntero sobre una tarjeta en un dispositivo con puntero
- **THEN** la tarjeta se eleva 4px con sombra y el ícono circular cambia a color rojo del sitio

#### Scenario: Disposición en móvil
- **WHEN** el usuario ve la sección en una pantalla de 800px o menos
- **THEN** las tres tarjetas se muestran una debajo de otra en una sola columna
