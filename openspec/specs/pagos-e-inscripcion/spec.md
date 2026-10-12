# Pagos e Inscripción

## Purpose

Definir el flujo de pago e inscripción de los cursos: botón de pago Culqi (decisión del dueño que sustituye los medios del PDF), bloque informativo de medios de pago con logos y CTA "Solicitar más información" hacia el Google Form público.

## Requirements

### Requirement: Pago online con Culqi
La ficha de cada curso SHALL incluir un botón de pago online que redirija al enlace de pago Culqi del curso; mientras el enlace real no exista, el botón SHALL conservar un valor placeholder documentado en el código del sitio.

#### Scenario: Enlace Culqi configurado
- **WHEN** el usuario hace clic en el botón de pago del curso con enlace Culqi ya configurado
- **THEN** es redirigido al checkout de Culqi de ese curso en la misma o nueva pestaña según la configuración

#### Scenario: Enlace placeholder
- **WHEN** el enlace Culqi de un curso no ha sido generado todavía
- **THEN** el botón usa el placeholder `#` acompañado de comentario en el código para que el dueño reemplace la URL

### Requirement: Bloque informativo de medios de pago
La ficha de cada curso SHALL mostrar un bloque de medios de pago con los logos provistos (Yape, Plin, BBVA, Western Union y PayPal — `logos-metodos-de-pago/`) y la información: titular "Claudia Rubio Jiménez" en todos los métodos y el número de contacto por definir (placeholder `+51 99999999` hasta que el dueño lo reemplace); la BBVA incluye además los datos del documento base (cuenta de ahorros 0011-0900-0200684705, CCI 011-900-000200684705-83, nota de comisión interplaza S/7.50 por depósito en ventanilla o agente) y el QR de pago (imagen provista).

#### Scenario: Info de medios de pago
- **WHEN** el usuario revisa el bloque de Medios de pago de un curso
- **THEN** ve los logos con su información: titular y número, y los datos bancarios BBVA del documento base con el QR

### Requirement: CTA Solicitar más información
Cada ficha SHALL incluir un botón "Solicitar más información" que redirija al formulario público de inscripción de Google (mismo ID del documento base con sufijo `/viewform`): `https://docs.google.com/forms/d/1OoggGqBor_FDBcKoo807nPf0atujRvqqXrIqDhBiRpI/viewform`, aplicado a todos los cursos.

#### Scenario: CTA hacia el formulario
- **WHEN** el usuario hace clic en "Solicitar más información" en la ficha de cualquier curso
- **THEN** es redirigido al Google Form público (versión `/viewform`), nunca a la versión interna `/edit`

### Requirement: Excepción documentada al PDF
La sustitución de los medios de pago del documento base (Yape/Plin/QR/BBVA + Western Union/PayPal como vía de cobro) por Culqi como pasarela SHALL quedar registrada como decisión del dueño, manteniendo el bloque informativo con los logos y datos del titular.

#### Scenario: Registro de decisión
- **WHEN** se revisa el material de planificación del sitio
- **THEN** consta la decisión "Culqi sustituye los medios del PDF como vía de cobro; los logos y titular quedan como bloque informativo"
