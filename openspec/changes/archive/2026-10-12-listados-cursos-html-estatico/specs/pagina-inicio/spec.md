# Página inicio (delta)

## Purpose

Que la sección "Cursos destacados" del Inicio esté en HTML estático, visible sin JavaScript.

## ADDED Requirements

### Requirement: Cursos destacados en HTML estático
La sección "Cursos destacados" de `index.html` SHALL estar escrita en el HTML, generada por `tools/generar-listados.mjs` a partir de `assets/js/cursos-data.js` (cursos con `enHome: true`). Cada curso destacado SHALL aparecer como tarjeta en el HTML inicial, sin depender de JavaScript para construirla.

#### Scenario: Destacados sin JavaScript
- **WHEN** se carga `index.html` con JavaScript deshabilitado
- **THEN** las 4 tarjetas de cursos destacados se muestran con su flyer, nombre, modalidad, horas, inversión y botones

#### Scenario: Enlaces a fichas en el HTML
- **WHEN** se lee el HTML de `index.html` sin ejecutar scripts
- **THEN** existe un enlace `cursos/<slug>/index.html` por cada curso con `enHome: true`

#### Scenario: Regeneración
- **WHEN** se ejecuta `node tools/generar-listados.mjs`
- **THEN** la sección se reescribe desde `cursos-data.js` y el resultado es idéntico si no hubo cambios en los datos
