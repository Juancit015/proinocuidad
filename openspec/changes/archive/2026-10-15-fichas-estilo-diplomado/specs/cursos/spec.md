# Spec Delta

## MODIFIED Requirements

### Requirement: Ficha de detalle del curso
Al hacer clic en "Más información", el sitio SHALL mostrar la ficha completa del curso con layout moderno de 2 columnas: área principal de contenidos y sidebar sticky con el flyer oficial del curso, precios destacados (S/ y US$), botones de inscripción/WhatsApp y checklist de incluidos. El área principal SHALL presentar: hero de ficha con migas, barra de stats (horas, módulos/sesiones, modalidad, certificación), secciones estructuradas con el mismo contenido y orden actuales de cada curso (datos generales, beneficios, público objetivo, objetivo y perfil del egresado donde aplique), temario desplegable por módulos, metodología, inversión, inscripción online y medios de pago en formato moderno.

#### Scenario: Contenido completo de la ficha
- **WHEN** el usuario abre la ficha del Diplomado de Especialización en Gestión de la Calidad e Inocuidad
- **THEN** ve en el layout moderno los 9 bloques más "Perfil del egresado", con 6 sesiones, modalidad asíncrona (grabada), certificación de 384 horas académicas y inversión de S/120 (no incluye IGV) / US$37

#### Scenario: Datos de un curso corto
- **WHEN** el usuario abre la ficha de "Legislación Sanitaria de Alimentos Nacional e Internacional"
- **THEN** ve en el layout moderno 3 sesiones, 40 horas académicas y inversión de S/45 (no incluye IGV) / US$15, y el objetivo textual del documento base

#### Scenario: Ficha del diplomado sin cambios visibles
- **WHEN** el usuario abre la ficha del diplomado tras la regeneración con el generador
- **THEN** ve el mismo contenido y diseño actuales (equivalencia visual con la ficha manual)

#### Scenario: Contenido propio por curso
- **WHEN** el usuario compara dos fichas de cursos distintos
- **THEN** cada una muestra su propio título, descripción, horas, sesiones, temario, precios y flyer; solo el layout es compartido
