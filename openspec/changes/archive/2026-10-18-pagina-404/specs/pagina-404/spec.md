# Spec Delta

## Purpose

Definir la página de error del sitio: la pantalla que ve el visitante cuando una URL no existe, con la navegación del sitio, sin ser indexable y generada por la misma herramienta que genera las fichas.

## ADDED Requirements

### Requirement: Página de error en la raíz
El sitio SHALL publicar `404.html` en la raíz. La página SHALL tener un `<title>` propio y un `<h1>` que indique que la página solicitada no existe. SHALL ofrecer al menos dos rutas de salida: un enlace a la página de Inicio y una vía de contacto. SHALL NOT enlazar a ninguna página inexistente. El sitio no tiene página de contacto propia, así que la vía de contacto SHALL ser el WhatsApp que ya usan el resto de las páginas.

#### Scenario: La página existe y se explica
- **WHEN** se solicita `https://proinocuidad.com/404.html`
- **THEN** se recibe un documento HTML con su `<title>` y un `<h1>` que dice que la página no existe

#### Scenario: Rutas de salida reales
- **WHEN** se revisan los enlaces de la página
- **THEN** hay al menos un enlace a Inicio y una vía de contacto por WhatsApp, y ninguna ruta local apunta a una página ausente del sitio

#### Scenario: El contacto es el del sitio, no uno nuevo
- **WHEN** se sigue la vía de contacto del 404
- **THEN** lleva al mismo número y al mismo mensaje prellenado que usa el resto de las páginas, porque es la constante `waContacto` del generador y no un enlace escrito aparte

### Requirement: Chrome de navegación del sitio
`404.html` SHALL incluir la cabecera con el menú desplegable y el pie del sitio, con los mismos destinos que el resto de páginas. Todas sus rutas SHALL resolver desde la raíz. El menú SHALL NOT contener una entrada que apunte al propio 404, porque no es una página a la que se navegue.

#### Scenario: Cabecera y pie presentes
- **WHEN** se abre `404.html` en un navegador
- **THEN** se ve la barra de navegación con su desplegable y el pie del sitio, iguales a los de las demás páginas

#### Scenario: Los enlaces resuelven desde la raíz
- **WHEN** se carga `404.html` y se siguen el logo, la hoja de estilos, el script y los enlaces del menú
- **THEN** ninguno produce un error, porque sus rutas están calculadas para la raíz y no para dos niveles

#### Scenario: El 404 no se enlaza a sí mismo
- **WHEN** se revisan los destinos del menú de `404.html`
- **THEN** ninguno apunta a `404.html`

### Requirement: El 404 no es indexable
`404.html` SHALL declarar `<meta name="robots" content="noindex, follow">` para que no se indexe, y SHALL declarar `<link rel="canonical">` con su propia URL, para no contradecir el requisito de URL canónica de la especificación `seo-base`. No SHALL aparecer en `sitemap.xml`, y su presencia SHALL NOT aumentar el número de URLs del mapa del sitio.

#### Scenario: No indexable
- **WHEN** se revisa el `<head>` de `404.html`
- **THEN** contiene `<meta name="robots" content="noindex, follow">`

#### Scenario: Canónica coherente con seo-base
- **WHEN** se revisa el `<head>` de `404.html`
- **THEN** contiene `<link rel="canonical" href="https://proinocuidad.com/404.html">`

#### Scenario: Ausente del mapa del sitio
- **WHEN** se cuentan las entradas `<url><loc>` de `sitemap.xml`
- **THEN** son las mismas que antes del cambio y ninguna es `https://proinocuidad.com/404.html`

### Requirement: El 404 lo genera el generador
`tools/generar-fichas.mjs` SHALL emitir `404.html` junto con las fichas, con las rutas relativas calculadas para la raíz. Regenerar SHALL NOT modificar el contenido de las 8 fichas de curso. Un cambio en la navegación del generador SHALL NOT requerir tocar `404.html` a mano.

#### Scenario: El generador escribe el archivo
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** se generan las 8 fichas y también `404.html` en la raíz

#### Scenario: Regenerar no altera las fichas
- **WHEN** se ejecuta el generador y se revisa el estado del repositorio
- **THEN** ninguna ficha bajo `cursos/` aparece como modificada respecto a antes de ejecutarlo

#### Scenario: El 404 hereda los cambios de navegación
- **WHEN** se modifica un enlace del menú en el generador y se regenera
- **THEN** el cambio aparece en `404.html` sin editarlo a mano

### Requirement: La página no añade CSS
`404.html` SHALL construirse con las clases que ya existen en `assets/css/main.css`, entre ellas `.hero`, `.container` y `.btn`. Este cambio SHALL NOT añadir reglas nuevas a esa hoja de estilos.

#### Scenario: Sin estilos nuevos
- **WHEN** se revisa `assets/css/main.css` después del cambio
- **THEN** no contiene reglas nuevas atribuibles a la página de error