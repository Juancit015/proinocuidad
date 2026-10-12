# Cursos (delta)

## Purpose

Que el listado de cursos de la página Cursos esté en HTML estático, visible sin JavaScript.

## ADDED Requirements

### Requirement: Listado de cursos en HTML estático
El listado asíncrono de la página Cursos SHALL estar escrito en el HTML de `cursos/index.html`, generado por `tools/generar-listados.mjs` a partir de `assets/js/cursos-data.js`. Cada curso asíncrono SHALL aparecer como tarjeta en el HTML inicial, sin depender de JavaScript para construirla.

#### Scenario: Listado sin JavaScript
- **WHEN** se carga `cursos/index.html` con JavaScript deshabilitado
- **THEN** las 8 tarjetas de curso se muestran con su nombre, modalidad, certificación, inversión, flyer y botones

#### Scenario: Enlaces a fichas en el HTML
- **WHEN** se lee el HTML de `cursos/index.html` sin ejecutar scripts
- **THEN** existe un enlace a cada una de las 8 fichas `cursos/<slug>/index.html`

#### Scenario: Regeneración
- **WHEN** se ejecuta `node tools/generar-listados.mjs`
- **THEN** el listado se reescribe desde `cursos-data.js` y el resultado es idéntico si no hubo cambios en los datos

### Requirement: Pestañas sin cambio de comportamiento
Las pestañas "Asíncronos" y "En vivo" SHALL mantener su comportamiento: "Asíncronos" activa al cargar y "En vivo" con el aviso de ausencia de cursos.

#### Scenario: Cambio de pestaña
- **WHEN** el usuario cambia a "En vivo" y de vuelta a "Asíncronos"
- **THEN** los paneles cambian y el listado asíncrono conserva sus 8 tarjetas
