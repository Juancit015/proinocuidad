# Spec Delta

## MODIFIED Requirements

### Requirement: Franja de cifras del Home
La sección de cifras del Home SHALL mostrar el H2 "Proinocuidad en cifras" y exactamente tres cifras: "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública", cada una en una tarjeta compacta con icono, etiqueta en mayúsculas gris y valor en azul oscuro. SHALL NOT afirmar años de experiencia ni antigüedad. La fila SHALL medir 820px como máximo, centrada, con tres columnas en escritorio y una por debajo de 860px. La sección SHALL llevar una fotografía de planta de producción como fondo cubierto por un velo blanco suave, con encuadre que muestre la cara completa de la trabajadora.

#### Scenario: Tres cifras, sin antigüedad
- **WHEN** el usuario ve la sección de cifras del Home
- **THEN** encuentra tres tarjetas y ninguna menciona años de experiencia ni antigüedad

#### Scenario: Título de la sección
- **WHEN** el usuario llega a la sección de cifras
- **THEN** ve el encabezado "Proinocuidad en cifras" sobre las tarjetas, sin que el H1 de la página cambie

#### Scenario: Jerarquía dentro de la tarjeta
- **WHEN** el usuario mira una tarjeta
- **THEN** ve un icono decorativo a la izquierda, la etiqueta en mayúsculas y gris, y el valor en azul oscuro, en ese orden de lectura

#### Scenario: Sin hueco en escritorio
- **WHEN** el usuario ve la sección en una pantalla de escritorio
- **THEN** las tres tarjetas se reparten en tres columnas de igual ancho, sin una cuarta columna vacía

#### Scenario: Ancho contenido en escritorio
- **WHEN** el usuario ve la sección en una pantalla de 1440px
- **THEN** la fila de tarjetas mide 820px como máximo y cada tarjeta queda por debajo de 280px, sin estirarse al ancho completo de la página

#### Scenario: Las otras cifras intactas
- **WHEN** el usuario lee las tarjetas
- **THEN** "1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública" siguen visibles y sin cambios

#### Scenario: Conservación del SEO
- **WHEN** se revisa la página Home tras el cambio
- **THEN** el título, la meta description, el canonical y el único encabezado de nivel 1 permanecen idénticos

#### Scenario: Franja legible en móvil
- **WHEN** el usuario ve la sección en un móvil de 390px
- **THEN** las tres tarjetas se apilan en una columna, se leen completas y no desbordan el ancho visible

#### Scenario: Fondo con velo y cara completa
- **WHEN** el usuario ve la sección en 1440px y en 390px
- **THEN** distingue la fotografía filtrada por un velo claro, ve la cara de la trabajadora completa (gorro incluido), sin marcas de agua ni recortes que le corten el rostro

#### Scenario: Legibilidad del título sobre el fondo
- **WHEN** el usuario lee el H2 de la sección con el fondo de foto detrás
- **THEN** la palabra "Proinocuidad" lleva el acento del hero `#ff8f96` y "en cifras" conserva el azul de marca, y el conjunto se lee sobre el velo con el peso tipográfico del título

## ADDED Requirements

### Requirement: Elevación de las tarjetas de cifras
Cada tarjeta de cifra SHALL elevarse 3px y ganar sombra al pasar el puntero por encima, sin mover ni redimensionar a las tarjetas vecinas. Con `prefers-reduced-motion: reduce`, el cambio SHALL ser inmediato, sin transición.

#### Scenario: Hover sobre una tarjeta
- **WHEN** el usuario pasa el puntero sobre una tarjeta de cifra
- **THEN** esa tarjeta sube 3px y muestra una sombra más marcada, mientras las otras dos no se mueven

#### Scenario: Movimiento reducido
- **WHEN** el usuario tiene activada la preferencia de movimiento reducido y pasa el puntero sobre una tarjeta
- **THEN** la tarjeta cambia de estado en el mismo instante, sin transición
