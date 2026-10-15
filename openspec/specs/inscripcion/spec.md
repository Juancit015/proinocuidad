# Inscripción

## Purpose

Definir el formulario de inscripción embebido en las fichas de curso, con comprobante de pago condicional (boleta/factura con RUC y razón social).

## Requirements

### Requirement: Formulario de inscripción en ficha
Cada ficha de curso SHALL incluir debajo de la tarjeta "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" con los campos: curso (precargado, visible), nombre y apellidos, DNI, empresa/institución, cargo/ocupación, celular, correo, país, voucher de pago (archivo adjunto), opción de comprobante de pago y aceptación de conformidad. El envío SHALL llegar a `administracion@proinocuidad.com`.

#### Scenario: Inscripción básica sin comprobante
- **WHEN** el usuario completa sus datos, adjunta el voucher y envía sin marcar comprobante
- **THEN** la inscripción se envía sin datos de facturación

#### Scenario: Curso precargado por ficha
- **WHEN** el usuario abre el formulario en la ficha de un curso
- **THEN** el curso ya viene seleccionado con el nombre de ese curso, sin elegirlo

#### Scenario: Scroll desde Matricularme Ahora
- **WHEN** el usuario hace clic en "Matricularme Ahora" dentro de la ficha
- **THEN** la página hace scroll al formulario de esa misma ficha, sin salir a un sitio externo

### Requirement: Comprobante de pago condicional
El formulario SHALL incluir la opción "Deseo comprobante de pago" con tipo Boleta o Factura. Si elige Factura, el RUC (exactamente 11 dígitos numéricos) y la razón social SHALL ser obligatorios y el envío SHALL bloquearse hasta completarlos. Si elige Boleta, no SHALL pedir RUC ni razón social.

#### Scenario: Factura sin RUC
- **WHEN** el usuario elige Factura y deja el RUC vacío o con formato inválido
- **THEN** ve un error y el formulario no se envía

#### Scenario: Boleta sin datos extra
- **WHEN** el usuario elige Boleta
- **THEN** el formulario se envía solo con su DNI y datos personales, sin RUC ni razón social
