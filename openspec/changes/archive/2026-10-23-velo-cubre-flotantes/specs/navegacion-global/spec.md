# Spec Delta

## MODIFIED Requirements

### Requirement: Velo de atenuación al abrir el menú móvil
En pantallas de 860px o menos, al abrirse el menú hamburguesa, el contenido de la página que queda detrás SHALL atenuarse con un velo tenue en el azul marino del sitio. El velo SHALL empezar por debajo de la cabecera para que la barra y el panel sigan nítidos, SHALL aparecer y desaparecer junto con el panel, y SHALL respetar el movimiento reducido. Con el menú abierto, solo la cabecera y su panel SHALL quedar por encima del velo: todo lo demás de la página —incluidos los botones flotantes fijos, el contacto de WhatsApp y el de volver arriba— SHALL quedar atenuado bajo él y fuera del alcance del toque. Tocar el velo SHALL cerrar el menú, igual que el botón de cerrar y la tecla Escape, y ese SHALL ser también el resultado de tocar un botón flotante atenuado. Por encima de 860px SHALL NOT aparecer ningún velo.

#### Scenario: El fondo se atenúa al abrir el menú
- **WHEN** el usuario abre el menú hamburguesa en móvil
- **THEN** el contenido de la página que queda detrás aparece atenuado por un velo tenue, la cabecera sigue nítida y el panel queda por encima del velo

#### Scenario: Los botones flotantes quedan bajo el velo
- **WHEN** el usuario abre el menú hamburguesa en móvil
- **THEN** el contacto flotante de WhatsApp y el botón de volver arriba se ven atenuados igual que el resto del contenido y ninguno responde a toques ni abre nada

#### Scenario: Tocar un botón flotante cierra el menú
- **WHEN** con el menú abierto el usuario toca el área atenuada donde está un botón flotante
- **THEN** el toque llega al velo, el menú se cierra y no se abre el chat de WhatsApp ni se salta al tope de la página

#### Scenario: El velo se retira al cerrar el menú
- **WHEN** el usuario cierra el menú con el botón de cerrar o con la tecla Escape
- **THEN** el velo desaparece junto con el panel y el contenido recupera su brillo normal

#### Scenario: Tocar el velo cierra el menú
- **WHEN** con el menú abierto el usuario toca el área atenuada que queda fuera del panel
- **THEN** el menú se cierra y el usuario permanece en la página en la que estaba

#### Scenario: Sin velo en escritorio
- **WHEN** el usuario navega en una pantalla de más de 860px
- **THEN** no aparece ningún velo y el mega menú de escritorio funciona como hasta ahora
