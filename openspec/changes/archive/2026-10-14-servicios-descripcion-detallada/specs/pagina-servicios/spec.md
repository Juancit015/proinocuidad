# Spec Delta

## MODIFIED Requirements

### Requirement: Listado de servicios
La página Servicios SHALL presentar los 5 servicios descritos en el documento "servicios descripcion.docx": (1) Capacitación Empresarial, (2) Implementación de normativa sanitaria de alimentos, (3) Inspecciones higiénico-sanitarias, (4) Implementación de sistemas de gestión de la calidad e inocuidad alimentaria, y (5) Trámite de registro sanitario de alimentos y bebidas. Cada servicio SHALL mostrar un resumen visible y un control "Ver más" que despliega el detalle del docx (áreas o componentes, alcance, "Dirigido a" y entregable cuando exista). Los textos del docx SHALL NOT prometer plazos ni resultados garantizados; el servicio de registro sanitario SHALL indicar que la aprobación depende de la autoridad sanitaria.

#### Scenario: Contenido de servicios
- **WHEN** el usuario abre la página Servicios
- **THEN** ve los 5 servicios, cada uno con su resumen visible

#### Scenario: Detalle desplegable
- **WHEN** el usuario activa "Ver más" en un servicio
- **THEN** se despliega el detalle de ese servicio con animación suave, y el control permite plegarlo

#### Scenario: Inspecciones con aclaración
- **WHEN** el usuario lee el servicio de inspecciones higiénico-sanitarias
- **THEN** ve que es asesoría técnica privada y que no sustituye las inspecciones ni las certificaciones de las autoridades

#### Scenario: Detalle en el HTML
- **WHEN** un buscador carga la página
- **THEN** el detalle de cada servicio está en el HTML dentro del elemento plegable

### Requirement: Imagen genérica por servicio
Cada servicio SHALL mostrarse con una imagen genérica temática acorde al servicio, siguiendo el patrón del ejemplo del documento base ("así deben mostrarse los servicios"). Las 5 imágenes SHALL compartir el mismo marco visual (borde redondeado y sombra del sistema de diseño) y la misma relación de aspecto en escritorio. Ninguna imagen SHALL renderizarse a un ancho mayor que su resolución real, para evitar pérdida visible de calidad.

#### Scenario: imagen asignada
- **WHEN** el usuario ve una tarjeta de servicio
- **THEN** la tarjeta muestra una imagen genérica temática correspondiente al servicio (fotos reales de capacitación in-house para Capacitación Empresarial; imágenes del material provisto u otras genéricas aprobadas para los demás)

#### Scenario: marco uniforme
- **WHEN** el usuario recorre los 4 servicios en escritorio
- **THEN** las 4 imágenes muestran el mismo radio de borde, la misma sombra y la misma relación de aspecto (incluida la de sistemas de gestión, que hoy no tiene borde)

#### Scenario: sin estiramiento visible
- **WHEN** el usuario ve las fotos de normativa y sistemas en escritorio
- **THEN** cada foto tiene resolución suficiente para su tamaño de muestra y ninguna se ve con pixelado evidente a simple vista
