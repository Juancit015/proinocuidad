# Spec Delta

## MODIFIED Requirements

### Requirement: Navegación en móvil
En pantallas de 860px o menos, la navegación SHALL abrirse como un panel móvil amplio y legible; los enlaces principales SHALL conservar su destino y un control «+» independiente SHALL abrir los grupos con submenús dentro del panel sin cerrarlo. Los enlaces del submenú SHALL navegar a su destino y cerrar el panel.

#### Scenario: Menú móvil
- **WHEN** el usuario en móvil pulsa el botón de menú y luego el control de expansión de "Cursos"
- **THEN** el submenú se despliega como acordeón y al tocar un curso el menú se cierra y navega a la página correspondiente

#### Scenario: Abrir y cerrar el menú móvil
- **WHEN** el usuario toca el botón de menú en una pantalla de 390px
- **THEN** se muestra un panel móvil con opciones legibles y un botón visible para cerrarlo, y el botón de menú informa que está expandido

#### Scenario: Expandir un submenú sin navegar
- **WHEN** el usuario toca el control de expansión de Servicios o Cursos
- **THEN** el grupo se despliega en una columna sin navegar al enlace principal

#### Scenario: Expandir tocando el indicador
- **WHEN** el usuario toca el indicador «+» de Servicios o Cursos
- **THEN** se despliega el acordeón correspondiente en el mismo panel y no se inicia una navegación

#### Scenario: Navegar al enlace principal del grupo
- **WHEN** el usuario toca el enlace "Servicios" o "Cursos"
- **THEN** navega a la página principal correspondiente y el panel móvil se cierra

#### Scenario: Navegar a una opción del acordeón
- **WHEN** el usuario toca un enlace dentro de un submenú abierto
- **THEN** navega a la página correspondiente y el panel móvil se cierra

#### Scenario: Cerrar el menú con Escape
- **WHEN** el panel móvil está abierto y el usuario pulsa Escape
- **THEN** el panel se cierra, los acordeones vuelven a estar cerrados y el estado accesible del botón se actualiza

#### Scenario: Navegación de escritorio sin cambios
- **WHEN** el ancho de pantalla es mayor a 860px
- **THEN** los enlaces y mega menús conservan su comportamiento de escritorio
