# Navegación Global

## Purpose

Definir la barra de navegación presente en todas las páginas del sitio: identidad (logo), enlaces principales, mega-menú al hover y acceso al aula virtual, con comportamiento adaptado a móvil.

## Requirements

### Requirement: Identidad y modo de navegación
Toda página del sitio SHALL mostrar la barra de navegación con el logo oficial de Proinocuidad (enlazado a Inicio) y un menú con los enlaces: Inicio, Nosotros, Servicios, Cursos, Noticias y Aula Virtual.

#### Scenario: Clic en logo
- **WHEN** el usuario hace clic en el logo de la barra de navegación desde cualquier página
- **THEN** llega a la página de Inicio

### Requirement: Mega-menú al hover
Al colocar el puntero sobre un elemento que tiene submenús, la barra de navegación SHALL desplegar una ventana flotante con los subenuncios agrupados (título breve del grupo y descripción corta opcional por ítem), igual al patrón referencial indicado por el dueño del proyecto. Los submenús "Servicios" y "Cursos" SHALL mostrar sus ítems en una grilla de 2 columnas dentro de un panel de 460px de ancho con padding de 10px. Cada ítem SHALL tener un ícono SVG de 24px dentro de un cuadro de 44px. Los 4 ítems de cada panel SHALL tener el mismo tamaño. El enlace "Ver todos los servicios" o "Ver todos los cursos" SHALL ocupar todo el ancho del panel. Al pasar el cursor sobre ese enlace, el fondo SHALL oscurecerse a `#0b1257` sin usar rojo, y la flecha SHALL mantenerse visible junto al texto, centrada en el botón (color blanco, opacidad 1, 16px, trazo grueso) y desplazarse 4px a la derecha al pasar el cursor.

#### Scenario: Hover en Servicios
- **WHEN** el usuario coloca el puntero sobre "Servicios"
- **THEN** se despliega un panel con los 4 servicios (Capacitación Empresarial, Implementación de normativa sanitaria, Sistemas de gestión, Registro sanitario) que enlazan a la página de Servicios

#### Scenario: Hover en Cursos
- **WHEN** el usuario coloca el puntero sobre "Cursos"
- **THEN** se despliega un panel con los 4 cursos destacados (Diplomado SGCIA, Legislación Sanitaria de Alimentos, HACCP: certificación en Perú y Auditor Interno del Sistema HACCP) con sus enlaces a las fichas

#### Scenario: Salida del panel
- **WHEN** el puntero abandona el elemento y el panel desplegado
- **THEN** el panel desaparece

#### Scenario: Ítems uniformes
- **WHEN** el usuario despliega cualquiera de los dos submenús
- **THEN** los 4 ítems tienen el mismo tamaño y cada uno muestra su ícono dentro de un cuadro de 44px

#### Scenario: Botón Ver todos con hover azul
- **WHEN** el usuario pasa el cursor sobre "Ver todos los servicios" o "Ver todos los cursos"
- **THEN** el fondo cambia a `#0b1257` (no rojo), la flecha "→" permanece visible y se desplaza 4px a la derecha

#### Scenario: Móvil
- **WHEN** el usuario ve el menú en una pantalla de 860px o menos
- **THEN** los ítems de cada submenú se muestran en una sola columna por debajo de 560px de ancho, y en dos columnas entre 560px y 860px

#### Scenario: Escritorio redimensionado
- **WHEN** el usuario reduce la ventana del navegador hasta una anchura de entre 560px y 860px y despliega un submenú del menú hamburguesa
- **THEN** los ítems del submenú se reparten en dos columnas, el enlace de todos los servicios o cursos ocupa el ancho completo del panel, y el panel no llega al borde inferior de la ventana

### Requirement: Aula Virtual en pestaña nueva
El enlace "Aula Virtual" SHALL dirigir a `https://proinocuidad.com/login/` abierto en una pestaña nueva.

#### Scenario: Acceso al aula virtual
- **WHEN** el usuario hace clic en "Aula Virtual"
- **THEN** se abre `https://proinocuidad.com/login/` en una pestaña nueva del navegador

### Requirement: Navegación en móvil
En pantallas móviles, la navegación SHALL colapsar tras un botón de menú; los grupos con submenús SHALL abrirse en modo acordeón, y al seleccionar un enlace el menú SHALL cerrarse y navegar a la página.

#### Scenario: Menú móvil
- **WHEN** el usuario en móvil pulsa el botón de menú y luego "Cursos"
- **THEN** el submenú se despliega como acordeón y al tocar un curso el menú se cierra y navega a la página correspondiente

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

### Requirement: El panel desplegado del menú móvil cabe en la pantalla
Con un submenú desplegado, el panel del menú hamburguesa SHALL caber entero entre la cabecera y el borde inferior en pantallas de 360px de ancho o más y 700px de alto o más, sin desplazarse dentro. Si la ventana es más baja que el contenido, SHALL conservar su desplazamiento interno para que todos sus enlaces sigan siendo alcanzables. Cada enlace del menú SHALL medir al menos 40px de alto, y los ítems de submenú SHALL conservar su cuadro de icono y su SVG.

#### Scenario: El panel cabe entero en un móvil habitual
- **WHEN** el usuario abre el menú hamburguesa en una pantalla de 390×740 y despliega un submenú
- **THEN** el panel completo queda visible entre la cabecera y el borde inferior, sin barra de desplazamiento dentro

#### Scenario: El panel se desplaza solo cuando no cabe
- **WHEN** el usuario despliega un submenú en una ventana más baja que el contenido, como 360×640
- **THEN** el panel se desplaza por su propio contenido y todos sus enlaces siguen siendo alcanzables

#### Scenario: Los enlaces siguen siendo activables
- **WHEN** el usuario ve el panel desplegado en cualquier anchura de móvil
- **THEN** cada enlace del menú tiene al menos 40px de alto y cada ítem de submenú mantiene su cuadro de icono con el SVG dentro, sin perder el icono ni el texto

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

### Requirement: Los anclas internas se despegan de la cabecera fija
Los destinos de anclas internas del sitio SHALL reservar espacio por encima de su posición mediante `scroll-margin-top`, para que la cabecera fija no tape su contenido. El valor SHALL superar la altura de la cabecera más un pequeño margen de aire, y SHALL aplicarse en móvil y en escritorio por igual.

#### Scenario: Navegar a un ancla con la cabecera fija
- **WHEN** el usuario navega a un ancla interna, como el botón "Matricularme Ahora" de una ficha o una sección de Servicios
- **THEN** el contenido de destino queda por debajo de la cabecera y ninguno de sus elementos queda tapado por ella

#### Scenario: El destino sigue siendo alcanzable
- **WHEN** la navegación por ancla termina
- **THEN** el usuario ve completo el primer contenido de la sección de destino, sin necesidad de desplazarse hacia arriba
