# Spec Delta

## ADDED Requirements

### Requirement: Cita institucional en la sección Nosotros del Home
En la sección "Nosotros" del Home, la frase institucional ("Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente.") SHALL presentarse como una cita (blockquote), separada del texto corrido, con un margen superior mayor que la separa del párrafo anterior y un indicador visual (borde lateral y comillas tipográficas) que la identifique como cita.

#### Scenario: La cita se presenta como bloque separado
- **WHEN** el usuario ve la sección "Nosotros" del Home
- **THEN** la frase institucional aparece en un bloque de cita, separada del párrafo anterior, con borde lateral y comillas

#### Scenario: Separación del texto corrido
- **WHEN** se compara la cita con el párrafo anterior
- **THEN** la cita tiene un margen superior mayor que la separa visualmente del texto corrido

#### Scenario: Contenido sin cambios
- **WHEN** se revisa el texto de la cita tras el cambio
- **THEN** el texto sigue siendo "Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente." sin alteraciones