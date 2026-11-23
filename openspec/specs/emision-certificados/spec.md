# Emisión de certificados

## Purpose

Emisión del PDF de certificado del alumno por código: la URL pública del generador compone el documento (página 1 de certificado y página 2 de sílabo) a partir de la plantilla AcroForm editable, estampa el QR de verificación real y publica el archivo en `certificados/<codigo>.pdf`.

## Requirements

### Requirement: URL pública del generador
El sitio SHALL atender `generar-certificado.php` como GET público con los parámetros `nombre`, `programa`, `fecha`, `horas` y `codigo`, y SHALL responder con un redirect al PDF generado en `certificados/<codigo>.pdf` (comportamiento actual conservado). Los parámetros opcionales `fecha_inicio`, `lugar` y `creditos` SHALL tener valores por defecto coherentes con documentarse en el propio script. El parámetro `nota` ya no se acepta ni se usa.

#### Scenario: Generación exitosa
- **WHEN** se llama a la URL con los parámetros requeridos y datos válidos
- **THEN** se guarda `certificados/<codigo>.pdf` y la respuesta redirige al PDF para que el navegador lo muestre directo

#### Scenario: Código ausente o inválido
- **WHEN** el `codigo` falta, o contiene caracteres fuera de `A-Z a-z 0-9 - _` o excede los 60 caracteres
- **THEN** la respuesta es JSON de error con código HTTP 400 y no se escribe ningún archivo

#### Scenario: Fecha de inicio por defecto
- **WHEN** no se proporciona `fecha_inicio`
- **THEN** el generador calcula la fecha de inicio como 7 días antes de `fecha` (fecha de emisión)

#### Scenario: Fecha de inicio explícita
- **WHEN** se proporciona `fecha_inicio` con formato válido (AAAA-MM-DD)
- **THEN** el generador usa esa fecha como inicio del período, sin recalcular

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

### Requirement: Derivación única de los datos del alumno
El período, el registro, las horas, los créditos y el lugar SHALL derivarse de los parámetros y de un único juego de constantes del script — sin duplicar literales del certificado en dos lados del pipeline. La nota deja de derivarse. La fecha de emisión (`fecha`) y la fecha de inicio (`fecha_inicio`) SHALL derivarse automáticamente: si no se proporciona `fecha_inicio`, se calcula como 7 días antes de `fecha`.

#### Scenario: Cambio de datos en un solo lado
- **WHEN** se cambia el texto guía del párrafo o un valor por defecto en el script
- **THEN** el PDF generado refleja el cambio sin necesidad de editar la plantilla ni la lógica de llenado por separado

#### Scenario: Fecha de inicio calculada automáticamente
- **WHEN** se genera un certificado sin proporcionar `fecha_inicio`
- **THEN** el período impreso en el certificado va del (fecha - 7 días) al (fecha), y ambas fechas son coherentes con el mes y año de `fecha`

#### Scenario: Fecha de inicio explícita respetada
- **WHEN** se proporciona `fecha_inicio` con formato válido
- **THEN** el período impreso usa esa fecha como inicio, sin recalcular

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

### Requirement: Guardas del pipeline de generación
El generador SHALL validar los parámetros requeridos (`nombre`, `programa`, `fecha`, `horas`, `codigo`) y SHALL rechazar con JSON de error y código HTTP 400/422 si faltan o son inválidos. El `codigo` SHALL validarse contra `A-Z a-z 0-9 - _` con máximo 60 caracteres. El `programa` SHALL tener un sílabo configurado; si no, se rechaza con 422. La fecha `fecha` SHALL validarse con `checkdate()`.

#### Scenario: Parámetros válidos generan PDF
- **WHEN** se llama con todos los parámetros requeridos válidos
- **THEN** se genera el PDF y se responde con redirect 302

#### Scenario: Parámetro requerido faltante
- **WHEN** falta `nombre`, `programa`, `fecha`, `horas` o `codigo`
- **THEN** se responde con JSON de error y HTTP 400

#### Scenario: Código inválido
- **WHEN** el `codigo` contiene caracteres fuera de `A-Z a-z 0-9 - _` o excede 60 caracteres
- **THEN** se responde con JSON de error y HTTP 400

#### Scenario: Programa sin sílabo
- **WHEN** el `programa` no coincide con ningún programa configurado
- **THEN** se responde con JSON de error y HTTP 422 con "El programa no tiene silabo configurado para el certificado."

#### Scenario: Fecha inválida
- **WHEN** la `fecha` no tiene formato AAAA-MM-DD o es una fecha inexistente
- **THEN** se responde con JSON de error y HTTP 400

#### Scenario: Fecha de inicio inválida
- **WHEN** se proporciona `fecha_inicio` con formato inválido
- **THEN** se responde con JSON de error y HTTP 400 con "La fecha de inicio es invalida (formato AAAA-MM-DD)."

#### Scenario: Plantilla ausente
- **WHEN** el archivo de plantilla no está en su ruta interna configurada
- **THEN** la emisión devuelve error HTTP 500 con mensaje JSON genérico sin rutas internas, sin escribir archivo alguno, y el error queda registrado en el log interno del script

#### Scenario: Sin contaminación del despliegue estático
- **WHEN** se ejecuta el despliegue del sitio (`publicar.sh` en su flujo de lista blanca)
- **THEN** la plantilla y las librerías de emisión no se copian al docroot y las 20 URLs del sitio no cambian
