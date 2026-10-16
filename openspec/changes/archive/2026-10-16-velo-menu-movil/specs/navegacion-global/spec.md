# Spec Delta

## ADDED Requirements

### Requirement: Velo de atenuación al abrir el menú móvil
En pantallas de 860px o menos, al abrirse el menú hamburguesa, el contenido de la página que queda detrás SHALL atenuarse con un velo tenue en el azul marino del sitio. El velo SHALL empezar por debajo de la cabecera para que la barra y el panel sigan nítidos, SHALL aparecer y desaparecer junto con el panel, y SHALL respetar el movimiento reducido. Tocar el velo SHALL cerrar el menú, igual que el botón de cerrar y la tecla Escape. Por encima de 860px SHALL NOT aparecer ningún velo.

#### Scenario: El fondo se atenúa al abrir el menú
- **WHEN** el usuario abre el menú hamburguesa en móvil
- **THEN** el contenido de la página que queda detrás aparece atenuado por un velo tenue, la cabecera sigue nítida y el panel queda por encima del velo

#### Scenario: El velo se retira al cerrar el menú
- **WHEN** el usuario cierra el menú con el botón de cerrar o con la tecla Escape
- **THEN** el velo desaparece junto con el panel y el contenido recupera su brillo normal

#### Scenario: Tocar el velo cierra el menú
- **WHEN** con el menú abierto el usuario toca el área atenuada que queda fuera del panel
- **THEN** el menú se cierra y el usuario permanece en la página en la que estaba

#### Scenario: Sin velo en escritorio
- **WHEN** el usuario navega en una pantalla de más de 860px
- **THEN** no aparece ningún velo y el mega menú de escritorio funciona como hasta ahora

### Requirement: El fondo no se desplaza con el menú móvil abierto
Mientras el menú hamburguesa esté abierto en pantallas de 860px o menos, el desplazamiento de la página SHALL quedar bloqueado, sin impedir que el propio panel se desplace por dentro si su contenido no cabe. Al cerrarse el menú, el desplazamiento SHALL volver a funcionar y la página SHALL permanecer en la misma posición, sin salto de contenido. El bloqueo SHALL NOT aplicarse en pantallas de más de 860px.

#### Scenario: La página no se mueve con el menú abierto
- **WHEN** el menú está abierto y el usuario arrastra sobre el área atenuada o sobre el borde de la pantalla
- **THEN** la página no se desplaza

#### Scenario: El panel sí se puede desplazar por dentro
- **WHEN** el contenido del panel es más alto que el espacio disponible y el usuario arrastra dentro del panel
- **THEN** el panel se desplaza por su contenido y se detiene al llegar a un extremo

#### Scenario: Al cerrar se recupera la posición
- **WHEN** el menú se cierra por cualquier vía
- **THEN** el desplazamiento de la página vuelve a funcionar y el usuario sigue en el mismo punto donde estaba, sin salto de contenido

#### Scenario: El bloqueo no afecta a escritorio
- **WHEN** el usuario navega en una pantalla de más de 860px
- **THEN** la página se desplaza con normalidad y ningún bloqueo queda activo

### Requirement: El menú móvil se cierra con un solo control visible
En el panel del menú hamburguesa SHALL NOT existir un botón de cerrar propio, porque el botón hamburguesa ya se convierte en una ✕ al pulsarse y dos controles idénticos confunden. El menú SHALL seguir cerrándose con el botón hamburguesa, tocando el fondo atenuado y con la tecla Escape. El botón hamburguesa SHALL seguir anunciando su estado con `aria-label` y `aria-expanded`.

#### Scenario: El panel no tiene botón de cerrar propio
- **WHEN** el usuario abre el menú hamburguesa en móvil
- **THEN** el panel no muestra ningún botón de cerrar, y en su lugar el icono hamburguesa de la cabecera aparece ya transformado en ✕

#### Scenario: La hamburguesa sigue anunciando el estado
- **WHEN** el menú está cerrado, y después de abrirlo
- **THEN** el botón hamburguesa anuncia primero "Abrir menú" y luego "Cerrar menú", con `aria-expanded` en `false` y `true` respectivamente

#### Scenario: Los demás cierres siguen disponibles
- **WHEN** el menú está abierto
- **THEN** se sigue cerrando con la tecla Escape y tocando el fondo atenuado, además de con el propio botón hamburguesa
