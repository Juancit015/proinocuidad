# Spec Delta

## MODIFIED Requirements

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
