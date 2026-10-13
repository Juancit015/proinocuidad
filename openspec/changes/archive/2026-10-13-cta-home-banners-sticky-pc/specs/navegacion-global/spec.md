# Spec Delta

## ADDED Requirements

### Requirement: Cabecera fija solo en escritorio
La cabecera (`.site-header`) SHALL mantener `position: sticky` cuando el ancho sea mayor a 860px y usar `position: relative` cuando el ancho sea ≤860px (no `static`, para conservar el contexto de anclaje del menú móvil desplegable). El menú hamburguesa SHALL seguir abriendo y cerrando el menú en móvil.

#### Scenario: escritorio sin cambios
- **WHEN** el usuario se desplaza en escritorio
- **THEN** la cabecera permanece fija arriba como hasta ahora

#### Scenario: móvil sin cabecera flotante
- **WHEN** el usuario se desplaza en una pantalla de 390px
- **THEN** la cabecera no flota sobre el contenido y el botón hamburguesa abre y cierra el menú con normalidad
