# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
