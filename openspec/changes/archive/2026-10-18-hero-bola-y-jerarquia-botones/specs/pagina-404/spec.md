# Spec Delta

## ADDED Requirements

### Requirement: Orden de las rutas de salida
Las rutas de salida del 404 SHALL aparecer en un orden deliberado de más importante a menos importante: primero el enlace a Inicio, después la vía de contacto por WhatsApp y por último los enlaces de navegación a Cursos y Servicios. El orden SHALL ser el mismo en el documento y en pantalla, incluso cuando los botones se apilan en móvil. El grupo secundario del final de la página SHALL conservar su orden actual.

#### Scenario: El orden es el acordado
- **WHEN** se leen los botones del hero del 404 de arriba abajo
- **THEN** aparecen en este orden: Volver al inicio, Escríbenos por WhatsApp, Ver los cursos, Ver los servicios

#### Scenario: El contacto no es la primera salida
- **WHEN** alguien llega al 404 siguiendo una ruta que ya no existe
- **THEN** lo primero que encuentra es cómo volver al inicio, y el contacto por WhatsApp aparece después

#### Scenario: El grupo secundario no se reordena
- **WHEN** se revisan los botones del bloque final del 404
- **THEN** mantienen el orden actual: Nosotros, Noticias y eventos, Inocuidad alimentaria