# SEO base (delta)

## ADDED Requirements

### Requirement: Longitud de título y meta description
Cada página HTML del sitio SHALL tener un `<title>` de como máximo 60 caracteres y una `<meta name="description">` de entre 120 y 160 caracteres.

#### Scenario: Título dentro de rango
- **WHEN** se revisa el `<title>` de la página Noticias
- **THEN** tiene 60 caracteres o menos

#### Scenario: Descripción dentro de rango
- **WHEN** se revisa la meta description de la página Inicio
- **THEN** tiene entre 120 y 160 caracteres

### Requirement: Sin marca duplicada en títulos de fichas
Los títulos de las fichas de curso SHALL incluir la marca "Proinocuidad" una sola vez.

#### Scenario: Título de ficha con marca única
- **WHEN** se revisa el `<title>` de cualquier ficha de curso
- **THEN** la cadena "Proinocuidad" aparece exactamente una vez

#### Scenario: Título de ficha tras regenerar
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** los títulos de las 8 fichas cumplen el requisito de marca única

### Requirement: Cobertura del sitemap
Todas las páginas HTML indexables del sitio SHALL aparecer en `sitemap.xml`, incluidas las páginas de servicio y la página pilar nuevas.

#### Scenario: Páginas nuevas en el sitemap
- **WHEN** se lee `sitemap.xml`
- **THEN** contiene una entrada por cada página de servicio nueva y por la página pilar de inocuidad
