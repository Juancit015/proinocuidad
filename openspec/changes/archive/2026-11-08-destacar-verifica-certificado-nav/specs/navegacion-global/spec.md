# Spec Delta

## ADDED Requirements

### Requirement: Enlace destacado de "Verifica tu certificado" en el nav
El enlace "Verifica tu certificado" del nav principal SHALL mostrarse como un botón destacado (clase `.btn-verifica-nav`), con fondo sólido rojo de marca (`--rojo`), texto blanco, esquinas redondeadas (4px, igual que `.btn-aula-nav`) e icono SVG inline, de forma comparable a `.btn-aula-nav` pero con color distinto para que ambos CTAs se diferencien. SHALL aplicarse en escritorio y en el acordeón móvil, y SHALL mantener la misma ruta y comportamiento de apertura que el enlace actual.

#### Scenario: Enlace destacado en escritorio
- **WHEN** el usuario ve el nav principal en una pantalla de más de 860px
- **THEN** "Verifica tu certificado" aparece como un botón rojo con icono, al lado de "Aula Virtual", y no como un enlace de texto plano

#### Scenario: Enlace destacado en móvil
- **WHEN** el usuario abre el menú hamburguesa en una pantalla de 860px o menos
- **THEN** "Verifica tu certificado" aparece como botón rojo con icono dentro del acordeón, con el mismo ancho y estilo que "Aula Virtual"

#### Scenario: Distinción con "Aula Virtual"
- **WHEN** ambos botones se muestran uno junto al otro
- **THEN** "Aula Virtual" mantiene su fondo azul y "Verifica tu certificado" el rojo, de modo que no se confunden

#### Scenario: Hover del botón destacado
- **WHEN** el usuario pasa el cursor sobre el botón "Verifica tu certificado" en escritorio
- **THEN** el fondo se oscurece a un rojo más intenso y el texto permanece blanco, sin subrayado ni barra inferior

#### Scenario: Accesibilidad del botón
- **WHEN** el botón recibe foco por teclado
- **THEN** muestra un anillo de foco visible y su texto es legible sobre el fondo rojo (contraste suficiente)