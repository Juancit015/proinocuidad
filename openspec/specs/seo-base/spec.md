# SEO base

## Purpose

Definir la base técnica de SEO del sitio: mapa del sitio, reglas de rastreo, URL canónica, metadatos de compartir y datos estructurados de la organización y de los cursos.

## Requirements

### Requirement: Mapa del sitio
El sitio SHALL publicar un archivo `sitemap.xml` en la raíz de `https://proinocuidad.com` que liste las 18 páginas públicas: Inicio, Nosotros, Servicios, Noticias, Cursos y las 8 fichas de curso. Cada URL SHALL ser absoluta, usar `https` y terminar en `/`. Las páginas `_archivo/` y los recursos no HTML SHALL NOT aparecer en el mapa.

#### Scenario: Sitemap accesible
- **WHEN** un rastreador solicita `https://proinocuidad.com/sitemap.xml`
- **THEN** recibe un XML válido con 18 entradas `<url><loc>` y ninguna URL fuera del dominio

#### Scenario: Ficha de curso en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL de cada ficha con la forma `https://proinocuidad.com/cursos/<slug>/`

### Requirement: Reglas de rastreo
El sitio SHALL publicar un archivo `robots.txt` en la raíz que permita el rastreo de todas las páginas públicas y declare la ubicación del sitemap.

#### Scenario: Robots accesible
- **WHEN** un rastreador solicita `https://proinocuidad.com/robots.txt`
- **THEN** recibe una respuesta con `User-agent: *`, sin reglas `Disallow` sobre páginas públicas, y una línea `Sitemap: https://proinocuidad.com/sitemap.xml`

### Requirement: URL canónica
Cada página HTML del sitio SHALL declarar `<link rel="canonical">` con su URL absoluta, y `<meta property="og:url">` con el mismo valor.

#### Scenario: Canonical en una ficha
- **WHEN** se abre la ficha del curso de BPM y Codex 2022
- **THEN** su `<head>` contiene `<link rel="canonical" href="https://proinocuidad.com/cursos/bpm-prerrequisitos-codex-2022-iso-22002-1/">` y `og:url` con el mismo valor

#### Scenario: Canonical en Inicio
- **WHEN** se abre la página de Inicio
- **THEN** el canonical es `https://proinocuidad.com/`

### Requirement: Datos estructurados de la organización
La página de Inicio SHALL incluir un bloque JSON-LD de tipo `Organization` con nombre "Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.", URL, logo, identificador fiscal (RUC 20615307603), correo de contacto, teléfono y enlaces a redes sociales.

#### Scenario: Organization válido
- **WHEN** se valida el JSON-LD de la página de Inicio con un validador de datos estructurados
- **THEN** no reporta errores y el RUC aparece en el campo de identificador

### Requirement: Datos estructurados de cada curso
Cada una de las 8 fichas de curso SHALL incluir un bloque JSON-LD de tipo `Course` con nombre, descripción igual a la meta description de la ficha, proveedor (la organización), modalidad asíncrona, duración en horas académicas y una oferta con precio en PEN (inversión nacional sin IGV) y en USD (inversión extranjera).

#### Scenario: Course del diplomado
- **WHEN** se valida el JSON-LD de la ficha del Diplomado de Especialización
- **THEN** no reporta errores, con duración de 384 horas académicas y ofertas de S/ 120 y US$ 37

#### Scenario: Course de curso corto
- **WHEN** se valida el JSON-LD de la ficha de Legislación Sanitaria de Alimentos
- **THEN** no reporta errores, con duración de 40 horas académicas y ofertas de S/ 45 y US$ 15

### Requirement: Regeneración conserva el SEO
Las fichas generadas por `tools/generar-fichas.mjs` SHALL incluir canonical, `og:url` y JSON-LD `Course` tal como se definen en esta especificación, de modo que regenerar las fichas no elimine la base de SEO.

#### Scenario: Regeneración
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** las 8 fichas resultantes contienen canonical, `og:url` y JSON-LD `Course` con los valores de cada curso

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
