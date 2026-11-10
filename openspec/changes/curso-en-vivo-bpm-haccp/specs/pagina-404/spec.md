# Spec Delta — Página 404

## MODIFIED Requirements

### Requirement: El 404 lo genera el generador
`tools/generar-fichas.mjs` SHALL emitir `404.html` junto con las fichas, con las rutas relativas calculadas para la raíz. Regenerar SHALL NOT modificar el contenido de las fichas de curso existentes. Un cambio en la navegación del generador SHALL NOT requerir tocar `404.html` a mano.

#### Scenario: El generador escribe el archivo
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** se generan todas las fichas de curso y también `404.html` en la raíz

#### Scenario: Regenerar no altera las fichas
- **WHEN** se ejecuta el generador y se revisa el estado del repositorio
- **THEN** ninguna ficha bajo `cursos/` aparece como modificada respecto a antes de ejecutarlo

#### Scenario: El 404 hereda los cambios de navegación
- **WHEN** se modifica un enlace del menú en el generador y se regenera
- **THEN** el cambio aparece en `404.html` sin editarlo a mano
