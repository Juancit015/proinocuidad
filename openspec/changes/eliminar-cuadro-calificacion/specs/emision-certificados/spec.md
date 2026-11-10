# Spec Delta

## MODIFIED Requirements

### Requirement: Llenado por nombre de campo sobre la plantilla AcroForm
El generador SHALL llenar el PDF exclusivamente por **nombre de campo** de la plantilla editable (página 1: `nombre`, `programa`, `parrafo`, `lugar_fecha`; página 2: `modulo1-3`, `contenido1-3`, `horas`, `creditos`, `registro`), reemplazando los valores por defecto sin texto sobrepuesto. La composición visual (fuentes y layout Canva) pertenece a la plantilla, no al código. Los campos `calificacion` (página 1) y `nota` (página 2) ya no se llenan ni se imprimen, y la etiqueta "CALIFICACIÓN" de la plantilla (página 2) SHALL quedar oculta mediante una tapa blanca dibujada por código sobre su área, de forma comparable a la tapa del QR de ejemplo.

#### Scenario: Página 1 con datos del alumno
- **WHEN** se genera un certificado con nombre, programa, período y lugar
- **THEN** la primera página muestra esos datos en los campos del diseño y no hay texto de ejemplo sobrepuesto ni superposición con sellos o firmas, ni campo de calificación

#### Scenario: Página 2 (sílabo) con datos del curso
- **WHEN** se genera un certificado de un curso registrado en la configuración del script
- **THEN** la página 2 muestra los módulos y contenidos de ese programa, y horas, créditos y el código de registro del alumno, sin nota ni etiqueta "CALIFICACIÓN"

#### Scenario: Etiqueta "CALIFICACIÓN" oculta
- **WHEN** se inspecciona visualmente la página 2 del PDF generado
- **THEN** la etiqueta "CALIFICACIÓN" y su caja quedan cubiertas por un rectángulo blanco y no son legibles, sin afectar los demás campos (horas, créditos, registro, módulos)

#### Scenario: Campo registro sin partirse
- **WHEN** el código de registro se dibuja en el campo `registro`
- **THEN** el código completo (por ejemplo `015-2026-11-PAG-CIABPPH`) cabe en el campo en una sola línea legible sin partirse en dos