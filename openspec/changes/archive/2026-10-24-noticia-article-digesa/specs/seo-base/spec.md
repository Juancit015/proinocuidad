# Spec Delta

## MODIFIED Requirements

### Requirement: Mapa del sitio
El sitio SHALL publicar un archivo `sitemap.xml` en la raíz de `https://proinocuidad.com` que liste las 19 páginas públicas: Inicio, Nosotros, Servicios, Noticias, Cursos, la guía de inocuidad alimentaria, los 4 servicios de detalle, las 8 fichas de curso y la página de detalle de la noticia. Cada URL SHALL ser absoluta, usar `https` y terminar en `/`. Las páginas `_archivo/` y los recursos no HTML SHALL NOT aparecer en el mapa.

#### Scenario: Sitemap accesible
- **WHEN** un rastreador solicita `https://proinocuidad.com/sitemap.xml`
- **THEN** recibe un XML válido con 19 entradas `<url><loc>` y ninguna URL fuera del dominio

#### Scenario: Ficha de curso en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL de cada ficha con la forma `https://proinocuidad.com/cursos/<slug>/`

#### Scenario: Noticia en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL `https://proinocuidad.com/noticias/vigencia-indeterminada-haccp/`

### Requirement: Guía del sitio para asistentes de IA
El sitio SHALL publicar un archivo `llms.txt` en la raíz de `https://proinocuidad.com` con el formato del estándar llmstxt.org versión 2. SHALL tener un H1 con el nombre de la empresa, un blockquote con un resumen breve, y secciones H2 con listas de enlaces absolutos a páginas reales del sitio, cada uno con una descripción de una línea sin lenguaje promocional. Las secciones SHALL ser Servicios, Cursos, Información y Optional. Ninguna URL SHALL apuntar a una página que no exista.

#### Scenario: Guía accesible para agentes
- **WHEN** un asistente de IA solicita `https://proinocuidad.com/llms.txt`
- **THEN** recibe un archivo Markdown con H1, blockquote y secciones H2 de listas de enlaces

#### Scenario: Solo URLs que existen
- **WHEN** se extraen todas las URLs de `llms.txt` y se contrasta con `sitemap.xml`
- **THEN** cada URL corresponde a una página real del sitio y ninguna queda fuera del mapa

#### Scenario: Cobertura de las páginas
- **WHEN** se cuentan las páginas listadas en `llms.txt`
- **THEN** están las 19 páginas públicas del sitio, agrupadas por sección y sin duplicados
