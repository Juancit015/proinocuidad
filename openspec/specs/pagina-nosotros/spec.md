# Página Nosotros

## Purpose

Definir la página Nosotros: presentación institucional de Proinocuidad (historia, especialidad, misión, visión y valores) con datos literales del PDF.

## Requirements

### Requirement: Quiénes somos
La página Nosotros SHALL mostrar la descripción institucional del PDF: razón social "Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.", RUC 20615307603, fundada el 29 de octubre de 2023, empresa de La Libertad, Perú especializada en gestión de la calidad e inocuidad alimentaria, con más de 1000 personas capacitadas, y las dos líneas de trabajo (Capacitación y Consultoría) con sus textos prohibidos literales. Debajo de esos párrafos SHALL incluir un bloque ampliable con la descripción complementaria aportada por el dueño, colapsado por defecto con el control "Ver más" y que al desplegarse muestra el texto completo sin alterar los párrafos anteriores.

#### Scenario: Datos institucionales visibles
- **WHEN** el usuario abre la página Nosotros
- **THEN** ve la razón social, el RUC, la fecha de fundación y los textos de Capacitación y Consultoría del documento base

#### Scenario: Descripción ampliable
- **WHEN** el usuario abre la página Nosotros
- **THEN** ve el control "Ver más" debajo de los párrafos institucionales, con el bloque complementario cerrado
- **WHEN** el usuario activa "Ver más"
- **THEN** se despliega el texto complementario completo y el control permite volver a plegarlo

#### Scenario: Texto presente en el HTML
- **WHEN** un buscador o un lector sin JavaScript carga la página
- **THEN** el texto complementario está en el HTML, dentro del elemento plegable, y no se pierde

### Requirement: Misión, visión y valores
La página SHALL incluir las secciones Misión, Visión y Valores con los textos del documento base (los valores son: compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente), presentadas como tres tarjetas en una fila con cabecera de color, ícono circular sobre el borde superior y el texto centrado en el encabezado; en móvil se apilan en una columna.

#### Scenario: Secciones de identidad
- **WHEN** el usuario navega por la página Nosotros
- **THEN** encuentra las secciones Misión, Visión y Valores con el contenido literal del documento base

#### Scenario: Disposición en escritorio
- **WHEN** el usuario ve la sección en una pantalla de escritorio
- **THEN** las tres tarjetas se muestran en una fila, con la misma altura, con un ancho máximo de 1000px centrado

#### Scenario: Efecto hover en tarjetas
- **WHEN** el usuario pasa el puntero sobre una tarjeta en un dispositivo con puntero
- **THEN** la tarjeta se eleva 4px con sombra y el ícono circular cambia a color rojo del sitio

#### Scenario: Disposición en móvil
- **WHEN** el usuario ve la sección en una pantalla de 800px o menos
- **THEN** las tres tarjetas se muestran una debajo de otra en una sola columna

### Requirement: Migas de pan en el hero
El hero de la página Nosotros SHALL mostrar migas de pan "Inicio / Nosotros" sobre el título: "Inicio" enlazado a la página inicial y "Nosotros" como página actual (no enlazada, separadas por "/" decorativo).

#### Scenario: Migas visibles
- **WHEN** el usuario abre la página Nosotros
- **THEN** ve sobre el título "Nosotros" las migas "Inicio / Nosotros", con "Inicio" navegable a la página inicial

### Requirement: CTA final en Nosotros
La página Nosotros SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 "¿Fortalecemos la inocuidad de tu empresa?" con "inocuidad" en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). Fondo azul oscuro con imagen existente y botones existentes.

#### Scenario: CTA visible en Nosotros
- **WHEN** el usuario llega al final de `nosotros/`
- **THEN** ve el CTA con su titular, texto y los 2 botones antes del footer
