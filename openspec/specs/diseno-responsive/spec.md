# Diseño responsive

## Purpose

Definir la alineación del footer en móvil, la disposición de las tarjetas de Cursos y Servicios por ancho de pantalla, la visibilidad de la barra superior por ancho de pantalla, y el procedimiento de auditoría responsive del sitio.

## Requirements

### Requirement: Footer centrado en móvil
Cuando el footer se muestra en una columna (ancho ≤560px), el logo, los textos, los títulos, las listas de enlaces, los datos de contacto y las redes sociales SHALL estar centrados horizontalmente.

#### Scenario: Footer en móvil
- **WHEN** el usuario ve cualquier página con un ancho de 390px
- **THEN** el logo, los títulos, los datos de contacto, los enlaces y las redes aparecen centrados en el footer

#### Scenario: Footer en escritorio
- **WHEN** el ancho es mayor a 560px
- **THEN** el footer conserva la alineación actual

### Requirement: Tarjetas de Cursos en una columna en tableta y móvil
En la sección de cursos (`cursos/index.html`), en las tarjetas de Servicios (`servicios/index.html`) y en las secciones "Nuestros servicios" y "Cursos destacados" de Inicio (`index.html`), las tarjetas SHALL mostrarse en una sola columna cuando el ancho sea ≤860px. Por encima de 860px, se mantiene la disposición actual.

#### Scenario: Cursos en tableta
- **WHEN** el ancho es 768px
- **THEN** cada tarjeta de curso ocupa el ancho completo y ninguna tarjeta comparte fila con otra

#### Scenario: Servicios en móvil
- **WHEN** el ancho es 390px
- **THEN** las tarjetas de servicios se muestran una debajo de otra, con botones y textos sin cortes

#### Scenario: Inicio en móvil
- **WHEN** el ancho es 390px
- **THEN** "Cursos destacados" y "Nuestros servicios" se muestran una debajo de otra

#### Scenario: Escritorio sin cambios
- **WHEN** el ancho es 1024px
- **THEN** la disposición de tarjetas mantiene el número de columnas actual (Inicio mantiene 4 columnas)

### Requirement: Auditoría responsive
La auditoría SHALL revisar las 13 páginas del sitio en los anchos 360, 390, 768, 860, 1024 y 1280px. Por cada hallazgo, el informe SHALL indicar página, anchos afectados, selector o sección, descripción, captura de referencia y estado: corregido, pendiente o sin cambios.

#### Scenario: Informe de auditoría
- **WHEN** se completa la auditoría
- **THEN** el informe lista todos los hallazgos con su estado, sin hallazgos sin clasificar

#### Scenario: Hallazgo fuera del alcance
- **WHEN** la auditoría encuentra un problema fuera del footer y de las tarjetas de Cursos y Servicios
- **THEN** el hallazgo se registra como pendiente y no se corrige sin aprobación

### Requirement: Contenido sin cambios
Los cambios de responsive SHALL NOT modificar textos, colores, enlaces ni datos de contacto.

#### Scenario: Revisión de contenido
- **WHEN** se compara el HTML antes y después
- **THEN** solo cambian los archivos CSS, sin diferencias de texto ni de enlaces

### Requirement: Bloques de dos columnas sin desbordamiento
Los bloques `.identidad-grid` de Inicio, Nosotros y Servicios, y los equivalentes de las fichas de curso, SHALL ajustarse al ancho de la pantalla en tableta y móvil. Ninguna imagen ni texto de estos bloques SHALL sobresalir del ancho visible.

#### Scenario: Quiénes somos en móvil
- **WHEN** el usuario abre Inicio, Nosotros o Servicios con un ancho de 360px o 390px
- **THEN** la página no tiene desplazamiento horizontal y la imagen queda dentro del ancho de la pantalla

#### Scenario: Tableta
- **WHEN** el ancho es 768px
- **THEN** la página no tiene desplazamiento horizontal y el bloque ocupa el ancho del contenedor

#### Scenario: Escritorio sin cambios
- **WHEN** el ancho es 1024px o más
- **THEN** los bloques de dos columnas mantienen su disposición actual

### Requirement: Imagen con proporción conservada
Las imágenes de los bloques de dos columnas SHALL conservar su proporción original al ajustarse al ancho de la columna.

#### Scenario: Imagen en columna estrecha
- **WHEN** la columna mide menos que el ancho natural de la imagen
- **THEN** la imagen se reduce proporcionalmente sin recortarse

### Requirement: Ficha de dos columnas sin desplazamiento horizontal
La ficha de curso con layout de dos columnas (`.ficha-layout`: contenido + sidebar) SHALL ajustarse al ancho de la pantalla en móvil. Ninguna fila, texto o control de la ficha SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: Ficha en 360px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 360px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en 390px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 390px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Fila de CCI sin desborde
- **WHEN** el usuario ve la tarjeta de Transferencia BBVA en 360px
- **THEN** el texto del CCI y el botón "Copiar CCI" se acomodan sin sobresalir del ancho visible

#### Scenario: Sticky intacto en escritorio
- **WHEN** el usuario abre la ficha en escritorio y hace scroll
- **THEN** el sidebar de matrícula sigue fijo (sticky) como hasta ahora

### Requirement: Barra superior oculta en móvil
La barra superior (`.topbar`, con la línea de contacto y los iconos de redes) SHALL estar oculta cuando el ancho sea ≤860px. Por encima de 860px SHALL mostrarse como hasta ahora. La barra SHALL permanecer en el DOM (ocultada por CSS) y los datos de contacto SHALL seguir disponibles en el footer en móvil, sin cambios en el footer.

#### Scenario: móvil sin barra superior
- **WHEN** el usuario abre cualquier página con un ancho de 390px
- **THEN** no se muestra la línea "Contacto: +51 981 365 982 · administracion@proinocuidad.com" ni los iconos de redes sobre la cabecera, y el teléfono y correo siguen visibles en el footer

#### Scenario: escritorio sin cambios
- **WHEN** el ancho es mayor a 860px
- **THEN** la barra superior se muestra con la línea de contacto y las redes como hasta ahora
