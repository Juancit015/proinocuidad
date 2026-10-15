# Spec Delta

## MODIFIED Requirements

### Requirement: Noticia vigente en el Home
El Home SHALL incluir la sección de Noticias con la nota vigente ("DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", Equipo Proinocuidad, fuente Ministerio de Salud). La tarjeta de la nota en el Home SHALL mostrar la misma foto de portada que la página Noticias (`assets/img/noticia-digesa-haccp.jpg`) arriba y el texto debajo, con las píldoras existentes legibles sobre la imagen.

#### Scenario: Noticia en portada
- **WHEN** el usuario llega al Home
- **THEN** ve la nota de DIGESA con su título y resumen, con enlace al contenido completo

#### Scenario: Foto de portada en el Home
- **WHEN** el usuario ve la tarjeta de noticia en el Home en escritorio
- **THEN** ve la foto `noticia-digesa-haccp.jpg` arriba ocupando el ancho de la tarjeta y el texto debajo, con las píldoras "Noticia · Regulación" y "DIGESA" legibles sobre la imagen y sin desbordes

#### Scenario: Misma foto que en Noticias
- **WHEN** se compara la tarjeta del Home con la de `noticias/index.html`
- **THEN** ambas usan el mismo archivo `assets/img/noticia-digesa-haccp.jpg` con el mismo `alt` descriptivo
