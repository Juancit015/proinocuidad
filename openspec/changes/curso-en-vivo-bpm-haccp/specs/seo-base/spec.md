# Spec Delta — SEO base

## MODIFIED Requirements

### Requirement: Mapa del sitio
El sitio SHALL publicar un archivo `sitemap.xml` en la raíz de `https://proinocuidad.com` que liste las 22 páginas públicas: Inicio, Nosotros, Servicios, Noticias, Cursos, la guía de inocuidad alimentaria, la página de verificación de certificados, las 5 páginas de servicio de detalle, la noticia vigente, las 8 fichas de curso asíncrono y la ficha del curso en vivo. Cada URL SHALL ser absoluta, usar `https` y terminar en `/`. Las páginas `_archivo/` y los recursos no HTML SHALL NOT aparecer en el mapa.

#### Scenario: Sitemap accesible
- **WHEN** un rastreador solicita `https://proinocuidad.com/sitemap.xml`
- **THEN** recibe un XML válido con 22 entradas `<url><loc>` y ninguna URL fuera del dominio

#### Scenario: Ficha de curso en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL de cada ficha con la forma `https://proinocuidad.com/cursos/<slug>/`

#### Scenario: Ficha del curso en vivo en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL `https://proinocuidad.com/cursos/bpm-haccp-en-vivo/`

#### Scenario: Página de ISO 22000 en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL `https://proinocuidad.com/servicios/implementacion-iso-22000/`

#### Scenario: Noticia en el mapa
- **WHEN** se revisa el sitemap
- **THEN** aparece la URL `https://proinocuidad.com/noticias/vigencia-indeterminada-haccp/`

### Requirement: Datos estructurados de cada curso
Cada ficha de curso SHALL incluir un bloque JSON-LD de tipo `Course` con nombre, descripción igual a la meta description de la ficha, proveedor (la organización), la modalidad que declara la ficha (asíncrona o en vivo), duración en horas académicas y una oferta con precio en PEN (inversión nacional sin IGV) y en USD (inversión extranjera).

#### Scenario: Course del diplomado
- **WHEN** se valida el JSON-LD de la ficha del Diplomado de Especialización
- **THEN** no reporta errores, con duración de 384 horas académicas y ofertas de S/ 120 y US$ 37

#### Scenario: Course de curso corto
- **WHEN** se valida el JSON-LD de la ficha de Legislación Sanitaria de Alimentos
- **THEN** no reporta errores, con duración de 40 horas académicas y ofertas de S/ 45 y US$ 15

#### Scenario: Course de la ficha en vivo
- **WHEN** se valida el JSON-LD de la ficha del curso en vivo
- **THEN** declara la modalidad "En vivo (Zoom)", 40 horas académicas y ofertas de S/ 60 y US$ 17

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
- **THEN** están las 22 páginas públicas del sitio, agrupadas por sección y sin duplicados

### Requirement: Contenido en Markdown para asistentes de IA
El sitio SHALL publicar un archivo `llms-full.txt` en la raíz con el contenido de las páginas clave en Markdown y dentro del propio archivo: la descripción de la empresa, sus servicios y el detalle de cada curso. El texto SHALL estar libre de navegación, llamadas a la acción y datos de contacto repetidos, y cada sección SHALL identificar a qué página corresponde.

#### Scenario: Contenido completo disponible
- **WHEN** un asistente de IA solicita `https://proinocuidad.com/llms-full.txt`
- **THEN** recibe el contenido de los servicios, de los ocho cursos asíncronos y del curso en vivo en Markdown, sin depender de las páginas HTML

#### Scenario: Contenido atribuible
- **WHEN** se lee cualquier sección de `llms-full.txt`
- **THEN** indica a qué página del sitio corresponde ese contenido
