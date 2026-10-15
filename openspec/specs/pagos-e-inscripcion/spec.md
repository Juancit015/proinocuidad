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
La ficha de cada curso SHALL mostrar los medios de pago en formato moderno: tarjetas por método (billeteras Yape/Plin con número y botón de copiado, transferencia BBVA con cuenta/CCI y botones de copiado, abonos internacionales PayPal/Western Union, pago online Culqi) con los logos provistos, bloque QR destacado con titular de la cuenta y nota bancaria, y los datos bancarios BBVA del documento base (cuenta de ahorros 0011-0900-0200684705, CCI 011-900-000200684705-83, nota de comisión interplaza S/7.50 por depósito en ventanilla o agente) con el QR de pago.

#### Scenario: Info de medios de pago
- **WHEN** el usuario revisa el bloque de Medios de pago de un curso
- **THEN** ve las tarjetas modernas con su información: titular y número con copiado, y los datos bancarios BBVA del documento base con el QR destacado

#### Scenario: Tarjetas de pago en curso corto
- **WHEN** el usuario revisa los medios de pago de la ficha de un curso corto
- **THEN** ve las tarjetas modernas con copiado, el QR destacado y los mismos datos de pago oficiales del diplomado

### Requirement: CTA Solicitar más información
Cada ficha SHALL incluir un botón "Matricularme Ahora" que haga scroll al formulario de inscripción dentro de la misma ficha (`#form-inscripcion`). El Google Form público (`/viewform`, nunca `/edit`) queda como respaldo documentado, no como destino principal.

#### Scenario: CTA hacia el formulario interno
- **WHEN** el usuario hace clic en "Matricularme Ahora" en la ficha de cualquier curso
- **THEN** la página hace scroll a su formulario embebido, nunca a un sitio externo

#### Scenario: CTA hacia el formulario
- **WHEN** el formulario embebido no está disponible
- **THEN** el Google Form público (versión `/viewform`, nunca la versión interna `/edit`) sigue accesible como respaldo

### Requirement: Excepción documentada al PDF
La sustitución de los medios de pago del documento base (Yape/Plin/QR/BBVA + Western Union/PayPal como vía de cobro) por Culqi como pasarela SHALL quedar registrada como decisión del dueño, manteniendo el bloque informativo con los logos y datos del titular.

#### Scenario: Registro de decisión
- **WHEN** se revisa el material de planificación del sitio
- **THEN** consta la decisión "Culqi sustituye los medios del PDF como vía de cobro; los logos y titular quedan como bloque informativo"
