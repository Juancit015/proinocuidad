# Página Servicios

## Purpose

Definir la página Servicios: los 5 servicios de consultoría de Proinocuidad con imagen genérica temática por servicio, textos del docx "servicios descripcion.docx" con detalle expandible y los casos reales de capacitación documentados.

## Requirements

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

### Requirement: CTA final en Servicios en lugar de la tarjeta de cierre
La página Servicios SHALL cerrar con una sección `.cta-sub` como última de `main`, en lugar de la tarjeta de cierre a la guía: badge "Asesoría sin compromiso", H2 "¿Impulsamos la inocuidad de tu empresa?" con "inocuidad" en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Leer la guía de inocuidad" (enlace relativo a la guía, para conservar ese acceso). Fondo azul oscuro con imagen existente y botones existentes.

#### Scenario: CTA visible en Servicios
- **WHEN** el usuario llega al final de `servicios/`
- **THEN** ve el CTA con su titular, texto y los 2 botones antes del footer, y ya no ve la tarjeta de cierre

#### Scenario: acceso a la guía conservado
- **WHEN** el usuario pulsa "Leer la guía de inocuidad"
- **THEN** navega a `inocuidad-alimentaria/`
