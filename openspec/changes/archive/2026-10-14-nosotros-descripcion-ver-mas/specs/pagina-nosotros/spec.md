# Spec Delta

## MODIFIED Requirements

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
