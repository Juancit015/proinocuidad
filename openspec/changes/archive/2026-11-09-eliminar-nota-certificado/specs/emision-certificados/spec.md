# Spec Delta

## MODIFIED Requirements

### Requirement: URL pública del generador
El sitio SHALL atender `generar-certificado.php` como GET público con los parámetros `nombre`, `programa`, `fecha`, `horas` y `codigo`, y SHALL responder con un redirect al PDF generado en `certificados/<codigo>.pdf` (comportamiento actual conservado). Los parámetros opcionales `fecha_inicio`, `lugar` y `creditos` SHALL tener valores por defecto coherentes con documentarse en el propio script. El parámetro `nota` ya no se acepta ni se usa.

#### Scenario: Generación exitosa
- **WHEN** se llama a la URL con los parámetros requeridos y datos válidos
- **THEN** se guarda `certificados/<codigo>.pdf` y la respuesta redirige al PDF para que el navegador lo muestre directo

#### Scenario: Código ausente o inválido
- **WHEN** el `codigo` falta, o contiene caracteres fuera de `A-Z a-z 0-9 - _` o excede los 60 caracteres
- **THEN** la respuesta es JSON de error con código HTTP 400 y no se escribe ningún archivo

### Requirement: Llenado por nombre de campo sobre la plantilla AcroForm
El generador SHALL llenar el PDF exclusivamente por **nombre de campo** de la plantilla editable (página 1: `nombre`, `programa`, `parrafo`, `lugar_fecha`; página 2: `modulo1-3`, `contenido1-3`, `horas`, `creditos`, `registro`), reemplazando los valores por defecto sin texto sobrepuesto. La composición visual (fuentes y layout Canva) pertenece a la plantilla, no al código. Los campos `calificacion` (página 1) y `nota` (página 2) ya no se llenan ni se imprimen.

#### Scenario: Página 1 con datos del alumno
- **WHEN** se genera un certificado con nombre, programa, período y lugar
- **THEN** la primera página muestra esos datos en los campos del diseño y no hay texto de ejemplo sobrepuesto ni superposición con sellos o firmas, ni campo de calificación

#### Scenario: Página 2 (sílabo) con datos del curso
- **WHEN** se genera un certificado de un curso registrado en la configuración del script
- **THEN** la página 2 muestra los módulos y contenidos de ese programa, y horas, créditos y el código de registro del alumno, sin nota

#### Scenario: Campo registro sin partirse
- **WHEN** el código de registro se dibuja en el campo `registro`
- **THEN** el código completo (por ejemplo `015-2026-11-PAG-CIABPPH`) cabe en el campo en una sola línea legible sin partirse en dos

### Requirement: Derivación única de los datos del alumno
El período, el registro, las horas, los créditos y el lugar SHALL derivarse de los parámetros y de un único juego de constantes del script — sin duplicar literales del certificado en dos lados del pipeline. La nota deja de derivarse.

#### Scenario: Cambio de datos en un solo lado
- **WHEN** se cambia el texto guía del párrafo o un valor por defecto en el script
- **THEN** el PDF generado refleja el cambio sin necesidad de editar la plantilla ni la lógica de llenado por separado

### Requirement: QR de verificación estampado
El PDF generado SHALL incluir en la **página 2 (sílabo)** un código QR apuntando a `https://proinocuidad.com/verifica-tu-certificado.html?codigo=<codigo>`, estampado por código sobre la posición marcada por Juan (esquina inferior derecha del lado derecho, debajo de la caja del REGISTRO, derecha del Módulo III). El QR estampado SHALL reemplazar por completo el QR de ejemplo que la plantilla trae en esa zona. Es único por certificado y corresponde exactamente al `codigo` emitido.

#### Scenario: QR accesible desde el visor
- **WHEN** se descarga el PDF y se escanea el QR de la página 2
- **THEN** el único QR decodificable de la página abre `verifica-tu-certificado.html?codigo=<codigo>` y la página muestra la ficha del certificado (contrato de `verificacion-certificado`)

#### Scenario: El QR de ejemplo de la plantilla no sobrevive en el PDF final
- **WHEN** se genera el PDF de un alumno y se decodifican todos los QR de la página 2
- **THEN** no queda ninguno con contenido ajeno al sitio de verificación (el estampado cubrió por completo el de ejemplo)

#### Scenario: Ubicación del QR sin colisiones
- **WHEN** se inspecciona visualmente la página 2 del PDF generado
- **THEN** el QR queda en la esquina inferior derecha, debajo de la tabla azul de horas/créditos/registro y a la derecha del Módulo III, sin tocar la tabla, los textos del sílabo ni los bordes de la hoja