# Spec Delta

## ADDED Requirements

### Requirement: Barra superior oculta en móvil
La barra superior (`.topbar`, con la línea de contacto y los iconos de redes) SHALL estar oculta cuando el ancho sea ≤860px. Por encima de 860px SHALL mostrarse como hasta ahora. La barra SHALL permanecer en el DOM (ocultada por CSS) y los datos de contacto SHALL seguir disponibles en el footer en móvil, sin cambios en el footer.

#### Scenario: móvil sin barra superior
- **WHEN** el usuario abre cualquier página con un ancho de 390px
- **THEN** no se muestra la línea "Contacto: +51 981 365 982 · administracion@proinocuidad.com" ni los iconos de redes sobre la cabecera, y el teléfono y correo siguen visibles en el footer

#### Scenario: escritorio sin cambios
- **WHEN** el ancho es mayor a 860px
- **THEN** la barra superior se muestra con la línea de contacto y las redes como hasta ahora
