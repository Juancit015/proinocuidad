# Spec Delta

## ADDED Requirements

### Requirement: Franja de cifras del Home
La franja de cifras del Home SHALL mostrar exactamente tres cifras: "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública". La franja SHALL NOT afirmar años de experiencia ni antigüedad de la empresa. Las tres cifras SHALL ocupar una grilla de tres columnas en escritorio, sin huecos vacíos, y SHALL seguir apilándose correctamente en tableta y móvil.

#### Scenario: Tres cifras, sin antigüedad
- **WHEN** el usuario ve la franja de cifras del Home
- **THEN** encuentra tres cifras y ninguna menciona años de experiencia

#### Scenario: Sin hueco en escritorio
- **WHEN** el usuario ve la franja de cifras en una pantalla de escritorio
- **THEN** las tres cifras se reparten en tres columnas de igual ancho, sin una cuarta columna vacía

#### Scenario: Las otras cifras intactas
- **WHEN** el usuario lee la franja de cifras
- **THEN** "1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública" siguen visibles y sin cambios

#### Scenario: Conservación del SEO
- **WHEN** se revisa la página Home tras el cambio
- **THEN** el título, la meta description, el canonical y el único encabezado de nivel 1 permanecen idénticos

#### Scenario: Franja legible en móvil
- **WHEN** el usuario ve la franja de cifras en un móvil
- **THEN** las tres cifras se apilan o se reparten sin desbordarse del ancho visible