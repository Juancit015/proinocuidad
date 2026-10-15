# Spec Delta

## MODIFIED Requirements

### Requirement: Formulario de inscripción en ficha
Cada ficha de curso SHALL incluir debajo de la tarjeta "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" con los campos: curso (precargado, visible), nombre y apellidos, DNI, empresa/institución, cargo/ocupación, celular, correo, país (lista desplegable con Perú por defecto y Extranjero, con estilo propio del sitio), voucher de pago (archivo adjunto), opción de comprobante de pago y aceptación de conformidad. El envío SHALL llegar a `administracion@proinocuidad.com`.

#### Scenario: Inscripción básica sin comprobante
- **WHEN** el usuario completa sus datos, adjunta el voucher y envía sin marcar comprobante
- **THEN** la inscripción se envía sin datos de facturación

#### Scenario: Curso precargado por ficha
- **WHEN** el usuario abre el formulario en la ficha de un curso
- **THEN** el curso ya viene seleccionado con el nombre de ese curso, sin elegirlo

#### Scenario: Scroll desde Matricularme Ahora
- **WHEN** el usuario hace clic en "Matricularme Ahora" dentro de la ficha
- **THEN** la página hace scroll al formulario de esa misma ficha, sin salir a un sitio externo

#### Scenario: País por defecto Perú
- **WHEN** el usuario abre el formulario de cualquier ficha
- **THEN** el campo País muestra Perú sin que tenga que elegir nada

#### Scenario: Usuario del extranjero
- **WHEN** el usuario abre la lista de País y elige Extranjero
- **THEN** la inscripción se envía con país Extranjero a `administracion@proinocuidad.com`

#### Scenario: Desplegable con estilo del sitio
- **WHEN** el usuario ve el campo País en 1280px y en 390px
- **THEN** el desplegable se ve integrado al formulario (sin apariencia básica del navegador) y no genera desborde
