# Spec Delta — Cursos

## MODIFIED Requirements

### Requirement: Pestañas de modalidad
La página Cursos SHALL ofrecer dos pestañas: "Asíncronos" (activa al cargar, con los 8 cursos asíncronos) y "En vivo" (con las cohortes en vivo publicadas). La pestaña "En vivo" SHALL mostrar una tarjeta por cohorte vigente y SHALL mostrar el aviso de ausencia solo cuando no haya ninguna publicada. Las tarjetas en vivo SHALL NOT aparecer en la pestaña Asíncronos.

#### Scenario: Pestaña por defecto
- **WHEN** el usuario abre la página Cursos
- **THEN** ve activa la pestaña "Asíncronos" con los 8 cursos asíncronos listados

#### Scenario: Pestaña En vivo
- **WHEN** el usuario cambia a la pestaña "En vivo"
- **THEN** ve la tarjeta del curso en vivo con su flyer, fechas y modalidad, y ningún curso asíncrono

#### Scenario: Pestaña En vivo sin cohortes
- **WHEN** no hay ninguna cohorte en vivo publicada y el usuario abre la pestaña "En vivo"
- **THEN** ve el aviso de ausencia de cursos en vivo, sin tarjetas ni flyers

### Requirement: Pestañas sin cambio de comportamiento
Las pestañas "Asíncronos" y "En vivo" SHALL mantener su comportamiento: "Asíncronos" activa al cargar y "En vivo" con las tarjetas de las cohortes publicadas o su aviso de ausencia.

#### Scenario: Cambio de pestaña
- **WHEN** el usuario cambia a "En vivo" y de vuelta a "Asíncronos"
- **THEN** los paneles cambian y el listado asíncrono conserva sus 8 tarjetas

#### Scenario: Tarjeta en vivo persistente
- **WHEN** el usuario vuelve a la pestaña "En vivo" tras visitar "Asíncronos"
- **THEN** la tarjeta del curso en vivo sigue visible y enlaza a su ficha

## ADDED Requirements

### Requirement: Tarjeta de curso en vivo
Cada cohorte en vivo SHALL mostrarse en la pestaña "En vivo" como tarjeta presente en el HTML estático de `cursos/index.html`, generada por `tools/generar-listados.mjs` desde `assets/js/cursos-data.js`, con flyer, nombre completo del curso, modalidad "En vivo (Zoom)", fechas, horas académicas, inversión y los botones "Más información" y "WhatsApp".

#### Scenario: Tarjeta sin JavaScript
- **WHEN** se carga `cursos/index.html` con JavaScript deshabilitado
- **THEN** la tarjeta del curso en vivo aparece en el panel "En vivo" con su flyer, fechas e inversión

#### Scenario: Enlace a la ficha en vivo
- **WHEN** el usuario hace clic en "Más información" de la tarjeta en vivo
- **THEN** llega a `cursos/bpm-haccp-en-vivo/index.html`

#### Scenario: WhatsApp de la tarjeta en vivo
- **WHEN** el usuario hace clic en "WhatsApp" de la tarjeta en vivo
- **THEN** se abre la conversación con el número +51 981 365 982 con el mensaje del curso en vivo

### Requirement: Ficha de curso en vivo
La ficha de una cohorte en vivo SHALL usar el layout de dos columnas de las fichas existentes y SHALL mostrar en la barra de stats la modalidad en vivo por Zoom, las fechas y las horas académicas. El horario SHALL figurar en el hero y en el sidebar. La metodología SHALL describir clases en vivo por Zoom y aula virtual permanente, sin la regla de nota mínima de las fichas asíncronas.

#### Scenario: Datos de la cohorte en vivo
- **WHEN** el usuario abre la ficha del curso en vivo
- **THEN** ve las fechas 8, 9 y 10 de diciembre de 2026, el horario 7:30 a 10:00 PM (hora Perú), la modalidad Zoom y 40 horas académicas

#### Scenario: Metodología en vivo
- **WHEN** el usuario lee el bloque Metodología de la ficha en vivo
- **THEN** encuentra las clases en vivo por Zoom y el aula virtual permanente, y no encuentra la nota mínima de 14 puntos

#### Scenario: Inscripción en la ficha en vivo
- **WHEN** el usuario pulsa "Matricularme Ahora" en la ficha en vivo
- **THEN** la página baja al formulario de inscripción de esa misma ficha con el curso precargado

### Requirement: Certificado opcional del curso en vivo
El certificado de la cohorte en vivo SHALL describirse como digital, con código QR, por las 40 horas académicas, opcional y sin costo adicional, solicitado al finalizar el curso. La ficha SHALL NOT publicar nota mínima ni examen para la modalidad en vivo.

#### Scenario: Descripción del certificado
- **WHEN** el usuario revisa la barra de stats, el sidebar y las preguntas frecuentes de la ficha en vivo
- **THEN** el certificado figura como opcional, con QR, por 40 horas y sin costo adicional

#### Scenario: Sin requisitos de aprobación
- **WHEN** se busca "nota mínima" o "14 puntos" en la ficha en vivo
- **THEN** no aparece ningún requisito de aprobación ni evaluación final

### Requirement: Precio de pronto pago
Cuando la cohorte en vivo tenga precio de pronto pago, la ficha y la tarjeta SHALL mostrar junto al precio regular su monto nacional y extranjero y la fecha límite, sin sustituir el precio regular. El precio regular SHALL seguir visible con la nota "no incluye IGV".

#### Scenario: Pronto pago visible
- **WHEN** el usuario revisa la inversión de la cohorte en vivo antes del 4 de diciembre de 2026
- **THEN** ve S/ 60 (no incluye IGV) / US$ 17 y, aparte, el pronto pago de S/ 45 / US$ 15 hasta el 4 de diciembre de 2026

#### Scenario: Precio regular conservado
- **WHEN** el usuario compara la ficha con las demás fichas de curso
- **THEN** el bloque de precio regular mantiene la misma estructura y la nota de IGV
