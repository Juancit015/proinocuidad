# Spec Delta

## Purpose

Definir la sección Noticias y Eventos del sitio con la noticia vigente y capacidad de crecer con nuevas entradas.

## ADDED Requirements

### Requirement: Noticia vigente
La sección Noticias SHALL mostrar la nota vigente del documento base: "DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", autoría "Equipo Proinocuidad", con todo su contenido (resumen, impacto en la industria, obligaciones vigentes, fecha de corte del 11 de junio de 2026, recomendaciones y fuente "Ministerio de Salud").

#### Scenario: Lectura de la nota
- **WHEN** el usuario abre la noticia de DIGESA
- **THEN** lee el contenido completo del documento base, incluida la fuente Ministerio de Salud

### Requirement: Listado creciente de noticias
La sección SHALL funcionar como listado de entradas: hoy con una sola nota, y la estructura SHALL permitir añadir más notas en el futuro sin rediseño de la sección.

#### Scenario: Página con una sola entrada
- **WHEN** el usuario abre la página de Noticias
- **THEN** ve el listado con la única nota disponible y el ítem enlaza al contenido completo
