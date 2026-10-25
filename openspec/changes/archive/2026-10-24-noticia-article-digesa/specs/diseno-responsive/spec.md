# Spec Delta

## MODIFIED Requirements

### Requirement: Auditoría responsive
La auditoría SHALL revisar las 19 páginas del sitio en los anchos 360, 390, 768, 860, 1024 y 1280px. Por cada hallazgo, el informe SHALL indicar página, anchos afectados, selector o sección, descripción, captura de referencia y estado: corregido, pendiente o sin cambios.

#### Scenario: Informe de auditoría
- **WHEN** se completa la auditoría
- **THEN** el informe lista todos los hallazgos con su estado, sin hallazgos sin clasificar

#### Scenario: Hallazgo fuera del alcance
- **WHEN** la auditoría encuentra un problema fuera del footer y de las tarjetas de Cursos y Servicios
- **THEN** el hallazgo se registra como pendiente y no se corrige sin aprobación
