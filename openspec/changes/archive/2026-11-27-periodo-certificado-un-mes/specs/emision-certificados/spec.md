# Spec Delta — Emisión de certificados (período de un mes)

## MODIFIED Requirements

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
- **THEN** el generador calcula la fecha de inicio como un mes antes de `fecha` (fecha de emisión), con el día recortado al último del mes destino si ese día no existe en el mes anterior

#### Scenario: Fecha de inicio explícita
- **WHEN** se proporciona `fecha_inicio` con formato válido (AAAA-MM-DD)
- **THEN** el generador usa esa fecha como inicio del período, sin recalcular

### Requirement: Derivación única de los datos del alumno
El período, el registro, las horas, los créditos y el lugar SHALL derivarse de los parámetros y de un único juego de constantes del script — sin duplicar literales del certificado en dos lados del pipeline. La nota deja de derivarse. La fecha de emisión (`fecha`) y la fecha de inicio (`fecha_inicio`) SHALL derivarse automáticamente: si no se proporciona `fecha_inicio`, se calcula como un mes antes de `fecha`.

#### Scenario: Cambio de datos en un solo lado
- **WHEN** se cambia el texto guía del párrafo o un valor por defecto en el script
- **THEN** el PDF generado refleja el cambio sin necesidad de editar la plantilla ni la lógica de llenado por separado

#### Scenario: Fecha de inicio calculada automáticamente
- **WHEN** se genera un certificado sin proporcionar `fecha_inicio`
- **THEN** el período impreso en el certificado va del (fecha - un mes) al (fecha), ambas fechas caen en meses distintos y son coherentes con el mes y año de `fecha`

#### Scenario: Fecha de inicio explícita respetada
- **WHEN** se proporciona `fecha_inicio` con formato válido
- **THEN** el período impreso usa esa fecha como inicio, sin recalcular
