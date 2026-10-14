# Noticias

## Purpose

Definir la sección Noticias y Eventos del sitio con la noticia vigente y capacidad de crecer con nuevas entradas.

## Requirements

### Requirement: Noticia vigente
La sección Noticias SHALL mostrar la nota vigente del documento base: "DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", autoría "Equipo Proinocuidad", con todo su contenido (resumen, impacto en la industria, obligaciones vigentes, fecha de corte del 11 de junio de 2026, recomendaciones y fuente "Ministerio de Salud"). La tarjeta de la nota SHALL mostrar una foto real temática (laboratorio o inspección alimentaria, licencia libre para uso comercial, autoalojada) arriba y el texto debajo, también en escritorio.

#### Scenario: Lectura de la nota
- **WHEN** el usuario abre la noticia de DIGESA
- **THEN** lee el contenido completo del documento base, incluida la fuente Ministerio de Salud

#### Scenario: Foto arriba en escritorio
- **WHEN** el usuario abre la página Noticias en escritorio
- **THEN** ve la foto de la tarjeta arriba ocupando el ancho de la tarjeta y el texto debajo, sin desbordes

#### Scenario: Foto licenciada y autoalojada
- **WHEN** se revisa la imagen de la tarjeta
- **THEN** el archivo está en `assets/img/`, con autor, URL fuente y licencia registrados en el CHANGELOG

### Requirement: Listado creciente de noticias
La sección SHALL funcionar como listado de entradas: hoy con una sola nota, y la estructura SHALL permitir añadir más notas en el futuro sin rediseño de la sección.

#### Scenario: Página con una sola entrada
- **WHEN** el usuario abre la página de Noticias
- **THEN** ve el listado con la única nota disponible y el ítem enlaza al contenido completo

### Requirement: Migas de pan en el hero
El hero de la página Noticias SHALL mostrar migas de pan "Inicio / Noticias y eventos" sobre el título: "Inicio" enlazado a la página inicial y "Noticias y eventos" como página actual (no enlazada, separadas por "/" decorativo).

#### Scenario: Migas visibles
- **WHEN** el usuario abre la página Noticias
- **THEN** ve sobre el título las migas "Inicio / Noticias y eventos", con "Inicio" navegable a la página inicial
