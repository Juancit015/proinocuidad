# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Bloque de cierre hacia la guía
La página Servicios SHALL cerrar con un bloque diseñado (tarjeta o banda con título, texto y botón) que invite a leer la guía de inocuidad alimentaria, en lugar de un párrafo de texto suelto. El bloque SHALL reutilizar componentes y colores existentes, sin introducir colores de marca nuevos.

#### Scenario: cierre diseñado visible
- **WHEN** el usuario llega al final de la página Servicios
- **THEN** ve un bloque con título, texto y un botón que enlaza a la guía de inocuidad alimentaria

#### Scenario: sin estilos nuevos de marca
- **WHEN** se inspecciona el bloque de cierre
- **THEN** usa solo los colores de marca existentes (`#101477`, `#ad343b`, `#5c5f6a`, `#e3e5ee`) y componentes ya presentes en el sitio
