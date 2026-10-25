# Noticias

## Purpose

Definir la sección Noticias y Eventos del sitio con la noticia vigente y capacidad de crecer con nuevas entradas.

## Requirements

### Requirement: Noticia vigente
La sección Noticias SHALL mostrar la nota vigente del documento base: "DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", autoría "Equipo Proinocuidad", con su contenido completo en la página de detalle de la nota (resumen, impacto en la industria, obligaciones vigentes, fecha de corte del 11 de junio de 2026, recomendaciones y fuente "Ministerio de Salud"). La tarjeta de la nota en el listado SHALL mostrar una foto real temática (laboratorio o inspección alimentaria, licencia libre para uso comercial, autoalojada) arriba, un resumen breve y texto debajo, también en escritorio, y SHALL enlazar a la página de detalle de la nota.

#### Scenario: Lectura de la nota
- **WHEN** el usuario abre la página de detalle de la noticia de DIGESA
- **THEN** lee el contenido completo del documento base, incluida la fuente Ministerio de Salud

#### Scenario: Foto arriba en escritorio
- **WHEN** el usuario abre la página Noticias en escritorio
- **THEN** ve la foto de la tarjeta arriba ocupando el ancho de la tarjeta y el texto debajo, sin desbordes

#### Scenario: Foto licenciada y autoalojada
- **WHEN** se revisa la imagen de la tarjeta
- **THEN** el archivo está en `assets/img/`, con autor, URL fuente y licencia registrados en el CHANGELOG

#### Scenario: Tarjeta enlazada al detalle
- **WHEN** el usuario abre la página Noticias
- **THEN** la tarjeta de la nota enlaza a la página de detalle `noticias/vigencia-indeterminada-haccp/` y la página resuelve

### Requirement: Listado creciente de noticias
La sección SHALL funcionar como listado de entradas: hoy con una sola nota enlazada a su página de detalle, y la estructura SHALL permitir añadir más notas en el futuro sin rediseño de la sección.

#### Scenario: Página con una sola entrada
- **WHEN** el usuario abre la página de Noticias
- **THEN** ve el listado con la única nota disponible y el ítem enlaza a la página de detalle de la nota

### Requirement: Página de detalle de la nota
El sitio SHALL tener una página de detalle para la nota vigente en `noticias/vigencia-indeterminada-haccp/`, con el contenido completo trasladado de la tarjeta, un único `<h1>` con el título de la nota, migas de pan "Inicio / Noticias / Vigencia del HACCP" sobre el contenido, y `<link rel="canonical">` y `<meta property="og:url">` propios.

#### Scenario: Detalle accesible
- **WHEN** el usuario abre la URL de detalle de la nota
- **THEN** ve el contenido completo con un único `<h1>`, sus subtítulos y la fuente citada, y las migas de pan enlazan a Inicio y a Noticias

#### Scenario: Canonical en el detalle
- **WHEN** se lee el `<head>` de la página de detalle
- **THEN** el canonical es `https://proinocuidad.com/noticias/vigencia-indeterminada-haccp/` y coincide con `og:url`

### Requirement: Article JSON-LD para la nota
La página de detalle de la nota SHALL incluir un bloque JSON-LD de tipo `Article` con headline, author "Equipo Proinocuidad", image de la portada autoalojada y publisher con la organización del sitio. El bloque SHALL NOT declarar `datePublished` sin una fecha confirmada por el dueño.

#### Scenario: Article en el head
- **WHEN** se lee el `<head>` de la página de detalle
- **THEN** existe un bloque `application/ld+json` con `@type` `Article`, headline y author "Equipo Proinocuidad", y canonical con la URL propia de la página

#### Scenario: Sin fecha inventada
- **WHEN** se revisa el JSON-LD `Article`
- **THEN** no contiene `datePublished` a menos que exista una fecha confirmada y registrada en el CHANGELOG

### Requirement: Migas de pan en el hero
El hero de la página Noticias SHALL mostrar migas de pan "Inicio / Noticias y eventos" sobre el título: "Inicio" enlazado a la página inicial y "Noticias y eventos" como página actual (no enlazada, separadas por "/" decorativo).

#### Scenario: Migas visibles
- **WHEN** el usuario abre la página Noticias
- **THEN** ve sobre el título las migas "Inicio / Noticias y eventos", con "Inicio" navegable a la página inicial
