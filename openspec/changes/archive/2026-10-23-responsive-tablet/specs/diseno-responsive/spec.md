# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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