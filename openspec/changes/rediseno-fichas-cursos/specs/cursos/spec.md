# Spec Delta

## MODIFIED Requirements

### Requirement: Ficha de detalle del curso
Al hacer clic en "Más información", el sitio SHALL mostrar la ficha completa del curso con estos bloques en orden: (I) Datos generales (número de sesiones, modalidad, certificación en horas), (II) Beneficios, (III) Público objetivo, (IV) Objetivo; y para el diplomado además "Perfil del egresado"; luego (V) Temario desplegable por módulos, (VI) Metodología, (VII) Inversión, (VIII) Inscripción online y (IX) Medios de pago. Los bloques SHALL presentarse centrados con un ancho máximo de lectura, con títulos y contenido alineados al centro.

#### Scenario: Contenido completo de la ficha
- **WHEN** el usuario abre la ficha del Diplomado de Especialización en Gestión de la Calidad e Inocuidad
- **THEN** ve los 9 bloques más "Perfil del egresado", con 6 sesiones, modalidad asíncrona (grabada), certificación de 384 horas académicas y inversión de S/120 (no incluye IGV) / US$37

#### Scenario: Datos de un curso corto
- **WHEN** el usuario abre la ficha de "Legislación Sanitaria de Alimentos Nacional e Internacional"
- **THEN** ve 3 sesiones, 40 horas académicas y inversión de S/45 (no incluye IGV) / US$15, y el objetivo textual del documento base

#### Scenario: Bloques centrados
- **WHEN** el usuario abre cualquier ficha de curso en escritorio
- **THEN** ve los bloques de contenido centrados en la página dentro de un ancho máximo de lectura, sin columnas laterales

## ADDED Requirements

### Requirement: Encabezado de ficha centrado
El hero de cada ficha SHALL mostrar migas, título, descripción y subrayado alineados al centro.

#### Scenario: Hero centrado
- **WHEN** el usuario abre cualquier ficha de curso
- **THEN** ve las migas, el título, la descripción y el subrayado centrados sobre la imagen de fondo
