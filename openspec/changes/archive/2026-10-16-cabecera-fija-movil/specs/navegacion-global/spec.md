# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Cabecera fija solo en escritorio`
- TO: `### Requirement: Cabecera fija en todas las pantallas`

## MODIFIED Requirements

### Requirement: Cabecera fija en todas las pantallas
La cabecera (`.site-header`) SHALL usar `position: sticky` en todas las pantallas, sin excepciones por ancho de pantalla. `sticky` SHALL conservarse como valor también en móvil porque es un valor posicionado y mantiene el contexto de anclaje del panel del menú móvil desplegable, que depende de él. El menú hamburguesa SHALL seguir abriendo y cerrando el menú en móvil, y el panel SHALL seguir anclado a la cabecera.

#### Scenario: escritorio sin cambios
- **WHEN** el usuario se desplaza en escritorio
- **THEN** la cabecera permanece fija arriba como hasta ahora

#### Scenario: móvil sin cabecera flotante
- **WHEN** el usuario se desplaza en una pantalla de 390px
- **THEN** la cabecera permanece fija arriba, ya que ahora también es fija en móvil, y el botón hamburguesa abre y cierra el menú con normalidad

#### Scenario: El menú móvil sigue anclado
- **WHEN** el usuario abre el menú hamburguesa en móvil
- **THEN** el panel aparece justo debajo de la cabecera, con el mismo aspecto y comportamiento de apertura, cierre y desplegable de los grupos

#### Scenario: El panel no tapa la cabecera al navegar
- **WHEN** el usuario toca un enlace del menú móvil
- **THEN** el panel se cierra y la página navega a su destino, con la cabecera fija en su sitio

## ADDED Requirements

### Requirement: Los anclas internas se despegan de la cabecera fija
Los destinos de anclas internas del sitio SHALL reservar espacio por encima de su posición mediante `scroll-margin-top`, para que la cabecera fija no tape su contenido. El valor SHALL superar la altura de la cabecera más un pequeño margen de aire, y SHALL aplicarse en móvil y en escritorio por igual.

#### Scenario: Navegar a un ancla con la cabecera fija
- **WHEN** el usuario navega a un ancla interna, como el botón "Matricularme Ahora" de una ficha o una sección de Servicios
- **THEN** el contenido de destino queda por debajo de la cabecera y ninguno de sus elementos queda tapado por ella

#### Scenario: El destino sigue siendo alcanzable
- **WHEN** la navegación por ancla termina
- **THEN** el usuario ve completo el primer contenido de la sección de destino, sin necesidad de desplazarse hacia arriba
