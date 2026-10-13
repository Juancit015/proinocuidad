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
- **THEN** los ítems de cada submenú se muestran en una sola columna

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

### Requirement: Cabecera fija solo en escritorio
La cabecera (`.site-header`) SHALL mantener `position: sticky` cuando el ancho sea mayor a 860px y usar `position: relative` cuando el ancho sea ≤860px (no `static`, para conservar el contexto de anclaje del menú móvil desplegable). El menú hamburguesa SHALL seguir abriendo y cerrando el menú en móvil.

#### Scenario: escritorio sin cambios
- **WHEN** el usuario se desplaza en escritorio
- **THEN** la cabecera permanece fija arriba como hasta ahora

#### Scenario: móvil sin cabecera flotante
- **WHEN** el usuario se desplaza en una pantalla de 390px
- **THEN** la cabecera no flota sobre el contenido y el botón hamburguesa abre y cierra el menú con normalidad
