# Spec Delta: inscripcion

## MODIFIED Requirements

### Requirement: Formulario de inscripción en ficha
Cada ficha SHALL incluir el formulario de inscripción con curso precargado y los campos: nombre, documento, celular, correo, voucher, país y conformidad, más empresa y cargo marcados "(opcional)". Todos los campos de texto SHALL llevar placeholder que muestre el formato esperado. Con Perú predeterminado: el documento SHALL etiquetarse "DNI" y exigir exactamente 8 dígitos numéricos; el celular SHALL mostrar el prefijo fijo "+51" y aceptar 9 dígitos empezando en 9, llegando a administracion@ con el valor completo "+51 XXX XXX XXX". Con Extranjero: la etiqueta pasa a "Documento/Pasaporte" alfanumérico obligatorio, el prefijo +51 desaparece y el celular queda libre con formato internacional.

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

#### Scenario: DNI peruano de 8 dígitos
- **WHEN** el usuario con Perú escribe un documento de 7 o 9 dígitos y envía
- **THEN** el envío se bloquea con un mensaje claro sobre los 8 dígitos del DNI

#### Scenario: Documento de extranjero sin regla de 8 dígitos
- **WHEN** el usuario eligió Extranjero, escribe un pasaporte con letras y números y envía
- **THEN** la inscripción se envía con ese documento sin bloquearse por longitud

#### Scenario: Celular peruano con prefijo
- **WHEN** el usuario con Perú escribe su celular de 9 dígitos empezando en 9 y envía
- **THEN** el correo recibido muestra el número completo con el prefijo +51, que también se ve en el campo mientras escribe

#### Scenario: Celular de extranjero sin prefijo
- **WHEN** el usuario eligió Extranjero y escribe su celular con código de país
- **THEN** el campo no agrega +51 y el número llega tal como lo escribió

#### Scenario: Marcas de opcionalidad y placeholders
- **WHEN** el usuario recorre el formulario a 1280px y a 390px
- **THEN** ve "(opcional)" junto a Empresa/Institución y Cargo/Ocupación, y placeholders de ejemplo en el resto, sin que los textos se corten ni generen desborde
