# Spec Delta

## Purpose

Definir la página Inicial (Home): punto de entrada del sitio con hero institucional, servicios destacados, cursos destacados y la noticia vigente.

## ADDED Requirements

### Requirement: Hero institucional
La página Inicio SHALL mostrar un hero con el slogan oficial "¡Formamos profesionales, construimos inocuidad!" y una llamada a la acción hacia Cursos.

#### Scenario: Carga del Home
- **WHEN** el usuario abre el Home
- **THEN** ve el slogan oficial y un botón que enlaza a la sección/página Cursos

### Requirement: Servicios destacados
El Home SHALL presentar una sección con los 4 servicios de la empresa (Capacitación Empresarial, Implementación de normativa sanitaria de alimentos, Implementación de sistemas de gestión ISO 9001/ISO 22000/FSSC 22000/BRCGS FOOD, y Trámite de registro sanitario), cada uno con su imagen genérica temática y tarjeta enlazada a la página de Servicios.

#### Scenario: Tarjeta de servicio
- **WHEN** el usuario hace clic en una tarjeta de servicio del Home
- **THEN** navega a la página de Servicios

### Requirement: Cursos destacados
El Home SHALL mostrar una selección de los cursos asíncronos con su flyer, nombre e inversión, enlazando cada tarjeta a la ficha del curso y con un enlace "Ver todos los cursos".

#### Scenario: Tarjeta de curso destacado
- **WHEN** el usuario hace clic en la tarjeta de un curso destacado
- **THEN** navega a la ficha de detalle de ese curso

### Requirement: Noticia vigente en el Home
El Home SHALL incluir la sección de Noticias con la nota vigente ("DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", Equipo Proinocuidad, fuente Ministerio de Salud).

#### Scenario: Noticia en portada
- **WHEN** el usuario llega al Home
- **THEN** ve la nota de DIGESA con su título y resumen, con enlace al contenido completo

### Requirement: Colores institucionales
Todo el sitio SHALL aplicar la paleta institucional: azul marino `#101477`, rojo corporativo `#AD343B` y gris grafito `#252525`.

#### Scenario: Verificación de paleta
- **WHEN** se revisa cualquier página del sitio
- **THEN** los colores predominantes corresponden a la paleta institucional definida
