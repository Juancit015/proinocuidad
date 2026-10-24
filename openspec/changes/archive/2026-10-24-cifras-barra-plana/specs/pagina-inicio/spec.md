# Spec Delta

## MODIFIED Requirements

### Requirement: Franja de cifras del Home
La franja de cifras del Home SHALL mostrar exactamente tres cifras: "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública", como una barra plana sobre el fondo claro del sitio, sin tarjetas, iconos, título de sección, fondo fotográfico, hover ni sombra. SHALL NOT afirmar años de experiencia ni antigüedad. En escritorio SHALL repartir las tres cifras en tres columnas y en ≤1020px SHALL pasar a dos columnas.

#### Scenario: Tres cifras, sin antigüedad
- **WHEN** el usuario ve la franja de cifras del Home
- **THEN** encuentra tres cifras y ninguna menciona años de experiencia ni antigüedad

#### Scenario: Título de la sección
- **WHEN** se inspecciona la sección de cifras
- **THEN** la sección no lleva título propio ni subrayado: se identifica con `aria-label="Cifras de Proinocuidad"` y el único encabezado de la página sigue siendo el H1 del hero

#### Scenario: Jerarquía dentro de la tarjeta
- **WHEN** el usuario mira una de las tres cifras
- **THEN** ve el valor grande y centrado encima de la etiqueta, sin caja: sin fondo blanco, icono, borde ni sombra

#### Scenario: Sin hueco en escritorio
- **WHEN** el usuario ve la franja en una pantalla mayor a 1020px
- **THEN** las tres cifras se reparten en tres columnas de igual ancho sobre el contenedor estándar del sitio, sin una cuarta columna vacía

#### Scenario: Ancho contenido en escritorio
- **WHEN** el usuario ve la franja en una pantalla de 1440px
- **THEN** la grilla ocupa el contenedor habitual del sitio, sin la fila limitada a 820px de la versión con tarjetas

#### Scenario: Las otras cifras intactas
- **WHEN** el usuario lee la franja
- **THEN** "1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública" siguen visibles y sin cambios

#### Scenario: Conservación del SEO
- **WHEN** se revisa la página Home tras el cambio
- **THEN** el título, la meta description, el canonical y el único encabezado de nivel 1 permanecen idénticos

#### Scenario: Franja legible en móvil
- **WHEN** el usuario ve la franja en un móvil de 390px
- **THEN** las cifras se reparten en dos columnas con la tercera en la fila siguiente, se leen completas y no desbordan el ancho visible

#### Scenario: Fondo con velo y cara completa
- **WHEN** el usuario ve la franja a 1440px y a 390px
- **THEN** no hay fotografía de fondo ni velo: el fondo es el claro del sitio y desaparece con él el activo de imagen de la franja

#### Scenario: Legibilidad del título sobre el fondo
- **WHEN** se mide el contraste de la barra sobre el fondo claro
- **THEN** los valores en rojo de marca y las etiquetas en gris se leen sin depender de capas intermedias, por ser los colores por defecto del sitio

## REMOVED Requirements

### Requirement: Elevación de las tarjetas de cifras
**Reason**: el dueño pidió volver a la barra plana y desaparecen las tarjetas; un requisito de elevación sin tarjetas que elevar dejaría un comportamiento muerto en la spec.
**Migration**: ninguna. Las tres cifras persisten en la barra plana y la elevación de las tarjetas de datos de las fichas de curso (`.ficha-stat-card`) no se toca: sigue siendo un requisito de otro change ya aplicado.
