# Página Servicios

## Purpose

Definir la página Servicios: los 4 servicios de consultoría de Proinocuidad con imagen genérica temática por servicio, textos del PDF y los casos reales de capacitación documentados.

## Requirements

### Requirement: Listado de servicios
La página Servicios SHALL presentar los 4 servicios descritos en el documento base: (1) Capacitación Empresarial, (2) Implementación de normativa sanitaria de alimentos (certificación de Principios Generales de Higiene y Validación Técnica Oficial del Plan HACCP; expediente con Manual BPM, POES, PHS y Plan HACCP), (3) Implementación de sistemas de gestión de la calidad e inocuidad alimentaria (ISO 9001, ISO 22000, FSSC 22000, BRCGS FOOD), y (4) Trámite de registro sanitario de alimentos y bebidas.

#### Scenario: Contenido de servicios
- **WHEN** el usuario abre la página Servicios
- **THEN** ve los 4 servicios con sus textos completarios del documento base

### Requirement: Imagen genérica por servicio
Cada servicio SHALL mostrarse con una imagen genérica temática acorde al servicio, siguiendo el patrón del ejemplo del documento base ("así deben mostrarse los servicios"). Las 4 imágenes SHALL compartir el mismo marco visual (borde redondeado y sombra del sistema de diseño) y la misma relación de aspecto en escritorio. Ninguna imagen SHALL renderizarse a un ancho mayor que su resolución real, para evitar pérdida visible de calidad.

#### Scenario: imagen asignada
- **WHEN** el usuario ve una tarjeta de servicio
- **THEN** la tarjeta muestra una imagen genérica temática correspondiente al servicio (fotos reales de capacitación in-house para Capacitación Empresarial; imágenes del material provisto u otras genéricas aprobadas para los demás)

#### Scenario: marco uniforme
- **WHEN** el usuario recorre los 4 servicios en escritorio
- **THEN** las 4 imágenes muestran el mismo radio de borde, la misma sombra y la misma relación de aspecto (incluida la de sistemas de gestión, que hoy no tiene borde)

#### Scenario: sin estiramiento visible
- **WHEN** el usuario ve las fotos de normativa y sistemas en escritorio
- **THEN** cada foto tiene resolución suficiente para su tamaño de muestra y ninguna se ve con pixelado evidente a simple vista

### Requirement: Casos reales de capacitación
El servicio de Capacitación Empresarial SHALL mostrar como evidencia los 3 casos reales del documento base: capacitación in-house "Curso Especializado Sistema HACCP y Gestión de la Inocuidad Alimentaria" en AGROINDUSTRIAL LAREDO S.A., conferencia virtual "Norma Sanitaria para la Aplicación del Sistema HACCP en la Elaboración de Alimentos y Bebidas" para PRODUCTOS RAZZETO & NESTOROVIC S.A.C., y capacitación in-house "Normas Sanitarias de Alimentos para Restaurantes y Afines" en CEVICHERÍA DSUMARE – Trujillo, con las fotografías reales disponibles del material provisto.

#### Scenario: Segmento de casos
- **WHEN** el usuario revisa el servicio de Capacitación Empresarial
- **THEN** ve los 3 casos reales con las fotos reales de las capacitaciones

### Requirement: Migas de pan en el hero
El hero de la página Servicios SHALL mostrar migas de pan "Inicio / Servicios" sobre el título: "Inicio" enlazado a la página inicial y "Servicios" como página actual (no enlazada, separadas por "/" decorativo).

#### Scenario: Migas visibles
- **WHEN** el usuario abre la página Servicios
- **THEN** ve sobre el título "Servicios" las migas "Inicio / Servicios", con "Inicio" navegable a la página inicial

### Requirement: Bloque de cierre hacia la guía
La página Servicios SHALL cerrar con un bloque diseñado (tarjeta o banda con título, texto y botón) que invite a leer la guía de inocuidad alimentaria, en lugar de un párrafo de texto suelto. El bloque SHALL reutilizar componentes y colores existentes, sin introducir colores de marca nuevos.

#### Scenario: cierre diseñado visible
- **WHEN** el usuario llega al final de la página Servicios
- **THEN** ve un bloque con título, texto y un botón que enlaza a la guía de inocuidad alimentaria

#### Scenario: sin estilos nuevos de marca
- **WHEN** se inspecciona el bloque de cierre
- **THEN** usa solo los colores de marca existentes (`#101477`, `#ad343b`, `#5c5f6a`, `#e3e5ee`) y componentes ya presentes en el sitio

### Requirement: Enlace a la página de detalle de cada servicio prioritario
La página Servicios SHALL enlazar a la página de detalle de registro sanitario, certificación HACCP, implementación FSSC 22000 y BRCGS Food Safety, cuando esa página exista.

#### Scenario: Enlace desde el listado
- **WHEN** el usuario abre la página Servicios
- **THEN** cada uno de los servicios prioritarios tiene un enlace a su página de detalle

#### Scenario: Enlace a la guía
- **WHEN** el usuario abre la página Servicios
- **THEN** existe un enlace a la página pilar de inocuidad alimentaria
