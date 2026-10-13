# Spec Delta

## MODIFIED Requirements

### Requirement: Fondo fijo en banners de subpágina
Los banners de título de subpágina (`.page-head--servicios`, `.page-head--nosotros`, `.page-head--noticias` y `.page-head--cursos`) SHALL mostrar su imagen de fondo con `background-attachment: fixed` cuando el ancho sea mayor a 860px, de modo que el fondo permanece fijo mientras el contenido se desplaza. El Hero de Inicio, las fichas de curso y las imágenes de contenido SHALL NOT recibir este efecto. En escritorio los banners SHALL tener `min-height: clamp(360px, 55vh, 520px)` con el contenido centrado verticalmente, el título con `clamp(2.4rem, 4vw, 3.2rem)` y el mismo overlay actual.

#### Scenario: banner fijo en escritorio
- **WHEN** el usuario abre Cursos, Servicios, Nosotros o Noticias con un ancho de 1024px o más y se desplaza
- **THEN** la imagen de fondo del banner permanece fija mientras el título y el texto se mueven con la página

#### Scenario: hero excluido
- **WHEN** el usuario abre el Inicio en escritorio y se desplaza
- **THEN** el Hero conserva su comportamiento actual, sin fondo fijo

#### Scenario: banner amplio y centrado
- **WHEN** el usuario abre Nosotros en escritorio de 1440px de ancho
- **THEN** el banner mide entre 360px y 520px de alto, el título se ve más grande que el actual y el contenido está centrado verticalmente con el mismo overlay
