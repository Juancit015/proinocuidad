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
En la sección de cursos (`cursos/index.html`), en las tarjetas de Servicios (`servicios/index.html`) y en las secciones "Nuestros servicios" y "Cursos destacados" de Inicio (`index.html`), las tarjetas SHALL mostrarse en una sola columna cuando el ancho sea ≤559px. En el rango 560–860px (tableta) las tarjetas SHALL mostrarse en 2 columnas de igual anchura. Por encima de 860px, se mantiene la disposición actual (3 columnas en cursos, 4 en servicios/inicio).

#### Scenario: Cursos en tableta
- **WHEN** el ancho es 768px
- **THEN** las tarjetas de curso se reparten en 2 columnas de igual anchura y ninguna ocupa toda la fila sola

#### Scenario: Servicios en tableta
- **WHEN** el ancho es 768px
- **THEN** las tarjetas de servicios se reparten en 2 columnas de igual anchura

#### Scenario: Inicio en tableta
- **WHEN** el ancho es 768px
- **THEN** "Cursos destacados" y "Nuestros servicios" se reparten en 2 columnas de igual anchura

#### Scenario: Cursos en móvil
- **WHEN** el ancho es 390px
- **THEN** las tarjetas de cursos se muestran una debajo de otra, con botones y textos sin cortes

#### Scenario: Servicios en móvil
- **WHEN** el ancho es 390px
- **THEN** las tarjetas de servicios se muestran una debajo de otra, con botones y textos sin cortes

#### Scenario: Inicio en móvil
- **WHEN** el ancho es 390px
- **THEN** "Cursos destacados" y "Nuestros servicios" se muestran una debajo de otra

#### Scenario: Escritorio sin cambios
- **WHEN** el ancho es 1024px
- **THEN** la disposición de tarjetas mantiene el número de columnas actual (Inicio mantiene 4 columnas, cursos 3)

### Requirement: Auditoría responsive
La auditoría SHALL revisar las 20 páginas del sitio en los anchos 360, 390, 768, 860, 1024 y 1280px. Por cada hallazgo, el informe SHALL indicar página, anchos afectados, selector o sección, descripción, captura de referencia y estado: corregido, pendiente o sin cambios.

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
La ficha de curso con layout de dos columnas (`.ficha-layout`: contenido + sidebar) SHALL ajustarse al ancho de la pantalla en todos los anchos (móvil, rango intermedio 681–1040px y escritorio ancho). Ninguna fila, texto o control de la ficha SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: Ficha en 360px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 360px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en 390px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 390px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en rango intermedio
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 768px o 900px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en escritorio ancho
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 1280px o más
- **THEN** la página no tiene desplazamiento horizontal ni banda blanca a la derecha, con el layout de 2 columnas intacto

#### Scenario: Ficha corta sin desborde
- **WHEN** el usuario abre la ficha de un curso corto (40 horas) en 390px y en 1280px
- **THEN** la página no tiene desplazamiento horizontal en ninguno de los dos anchos

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
- **THEN** no se muestra la línea "Contacto: +51 981 365 982 · formacion_academica@proinocuidad.com" ni los iconos de redes sobre la cabecera, y el teléfono y correo siguen visibles en el footer

#### Scenario: escritorio sin cambios
- **WHEN** el ancho es mayor a 860px
- **THEN** la barra superior se muestra con la línea de contacto y las redes como hasta ahora

### Requirement: Ficha sin desplazamiento horizontal en rango intermedio
La ficha de curso SHALL ajustarse al ancho de la pantalla en el rango intermedio (681–1040px). Ninguna fila, tarjeta, texto o control de la ficha SHALL sobresalir del ancho visible ni generar desplazamiento horizontal.

#### Scenario: Ficha en 768px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 768px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Ficha en 900px
- **WHEN** el usuario abre la ficha del diplomado con un ancho de 900px
- **THEN** la página no tiene desplazamiento horizontal y todo el contenido queda dentro del ancho visible

#### Scenario: Tarjeta de Transferencia BBVA sin desborde
- **WHEN** el usuario ve la tarjeta de Transferencia BBVA en rango intermedio
- **THEN** el texto del CCI y el botón "Copiar CCI" se acomodan sin sobresalir del ancho visible

#### Scenario: Bloque QR sin desborde
- **WHEN** el usuario ve el bloque QR destacado en rango intermedio
- **THEN** la imagen del QR y su información se acomodan sin sobresalir del ancho visible

#### Scenario: Desktop ancho y móvil sin cambios
- **WHEN** el usuario abre la ficha por encima de 1040px o en 360/390px
- **THEN** se conservan el layout de 2 columnas con sticky y el comportamiento ya verificado en móvil

### Requirement: Botones de acción del hero por franjas de ancho
Los grupos de botones de acción de los heroes SHALL disponerse en tres franjas, sin dejar espacio vacío al lado de un botón en ninguna. Por debajo de 560px: una columna a ancho completo. Entre 560px y 860px: rejilla de dos columnas de igual anchura. Por encima de 860px: la fila actual. Cada botón SHALL ocupar toda la anchura de su columna, no su ancho natural, porque medidos por su texto vuelven las filas desparejas.

#### Scenario: Una columna cuando no caben dos
- **WHEN** se ve un hero a 390px
- **THEN** cada botón ocupa una fila completa y no queda espacio vacío a su lado

#### Scenario: Dos columnas donde sí caben
- **WHEN** se ve un hero entre 560px y 860px
- **THEN** los botones se reparten en dos columnas de la misma anchura

#### Scenario: Sin cambio en escritorio
- **WHEN** el ancho es mayor a 860px
- **THEN** el grupo de botones se mantiene en fila, como antes

#### Scenario: El punto de corte está donde caben de verdad
- **WHEN** se calcula la anchura que necesita el botón más largo del sitio a 390px
- **THEN** supera la mitad del ancho disponible, y por eso la franja de dos columnas empieza en 560px y no antes

#### Scenario: Aplica a todas las páginas con hero de acción
- **WHEN** se revisan los grupos de botones de acción de los heroes del sitio
- **THEN** todos se reparten igual en las tres franjas, incluido el hero de Inicio y el de la página de error

### Requirement: Orden visible de los botones
Cuando los botones de un grupo se apilen en móvil, el orden en el que se ven SHALL ser el orden en que aparecen en el documento. El orden SHALL deliberate, no accidental: el grupo SHALL ordenar sus botones de más importante a menos importante.

#### Scenario: El orden del documento es el orden que se ve
- **WHEN** se leen los botones de un grupo apilado de arriba abajo
- **THEN** siguen el mismo orden que aparecen en el código fuente

#### Scenario: El botón principal no es el primero por casualidad
- **WHEN** un grupo tiene un botón destacado por su variante de color
- **THEN** su posición responde al orden de importancia acordado para ese grupo, no al azar del texto que ocupa cada botón


### Requirement: Footer apilado en tableta
En el rango 560–860px, el footer SHALL apilarse en una sola columna centrada (como en móvil), en lugar de mantener dos columnas horizontales. El `.footer-bottom` SHALL centrar su contenido en ese rango.

#### Scenario: Footer en tableta
- **WHEN** el usuario ve cualquier página con un ancho de 768px
- **THEN** el footer se muestra en una columna centrada (logo, contacto, enlaces) y el `.footer-bottom` queda centrado

#### Scenario: Footer en móvil sin cambios
- **WHEN** el ancho es 390px
- **THEN** el footer mantiene el comportamiento actual de móvil (1 columna centrada)

#### Scenario: Footer en escritorio sin cambios
- **WHEN** el ancho es 1024px
- **THEN** el footer mantiene la disposición actual de escritorio (4 columnas)

### Requirement: Bloque de contacto ajustado en tableta
En el rango 560–860px, la tarjeta "Solicita una asesoría" del bloque final de la Home (`.cta-card`) SHALL limitar su ancho a 520px y centrarse, y la tarjeta de noticias (`.nota-card`) SHALL limitarse a 640px, para no ocupar toda la pantalla.

#### Scenario: Bloque de contacto en tableta
- **WHEN** el usuario ve el bloque "Listo para fortalecer la inocuidad de tu empresa" a 768px
- **THEN** la tarjeta "Solicita una asesoría" mide como máximo 520px, queda centrada y sus botones no se desbordan
- **AND** la tarjeta de noticias mide como máximo 640px

#### Scenario: Bloque de contacto en móvil sin cambios
- **WHEN** el ancho es 390px
- **THEN** el bloque mantiene el comportamiento actual de móvil

### Requirement: Misión y valores en dos columnas en tableta
En `nosotros/index.html`, las tarjetas de misión y valores (`.mvv-grid`) SHALL mostrarse en 2 columnas en el rango 560–860px (en lugar de 1 sola columna), aprovechando el ancho disponible. Por debajo de 560px se mantiene 1 columna.

#### Scenario: Misión y valores en tableta
- **WHEN** el usuario ve la sección de misión y valores a 768px
- **THEN** las tarjetas se reparten en 2 columnas de igual anchura

#### Scenario: Misión y valores en móvil sin cambios
- **WHEN** el ancho es 390px
- **THEN** las tarjetas se apilan en 1 columna (comportamiento actual)

### Requirement: Imágenes adaptadas en tableta
Las imágenes de los bloques de dos columnas (`.identidad-grid`) y del hero SHALL adaptar su tamaño (max-height / aspect-ratio) en el rango 560–860px para no acaparar toda la pantalla. La sección "asesoría sin compromiso" se mantiene sin cambios (ya se ve bien).

#### Scenario: Imagen de Nosotros en tableta
- **WHEN** el usuario ve la sección "¿Quiénes somos?" a 768px
- **THEN** la imagen no ocupa toda la pantalla y el texto se lee sin scroll excesivo

#### Scenario: Hero en tableta
- **WHEN** el usuario ve el hero a 768px
- **THEN** la imagen del hero se adapta (max-height razonable) sin desbordar

#### Scenario: Asesoría sin compromiso sin cambios
- **WHEN** el usuario ve la sección "asesoría sin compromiso"
- **THEN** se mantiene la disposición actual (sin cambios)

### Requirement: Giro de logos adaptado en tableta
El carrusel de logos (`.giro`) SHALL adaptar el tamaño de las imágenes en el rango 560–860px para no desbordar ni ocupar demasiado espacio.

#### Scenario: Giro en tableta
- **WHEN** el usuario ve el giro de logos a 768px
- **THEN** las imágenes se adaptan al ancho disponible sin desbordar
