# Proposal

## Why

El cliente (Claudia Rubio) solicitó que los certificados emitidos automáticamente tengan fechas dinámicas por alumno: la fecha de emisión sea la fecha en que el alumno termina/descarga su certificado, y la fecha de inicio del curso sea una semana antes. Actualmente el generador ya soporta `fecha_inicio` con default de 7 días antes de `fecha`, y el plugin de emisión automática ya usa `fecha de término = fecha de completado`, pero no está documentado ni garantizado que el sistema calcule automáticamente la fecha de inicio restando 7 días para cada alumno. Con 50+ alumnos completando en fechas distintas, las fechas deben ser individuales, no compartidas.

## What Changes

- Documentar en la spec `emision-certificados` que la fecha de emisión (`fecha`) es la fecha de completado/descarga del alumno, y que la fecha de inicio (`fecha_inicio`) se calcula automáticamente restando 7 días cuando no se proporciona explícitamente.
- Garantizar que el plugin de emisión automática (`local_certificados`) pase `fecha` = fecha de completado del alumno y `fecha_inicio` = fecha de completado - 7 días al generador, sin intervención manual.
- Añadir escenarios de prueba que verifiquen fechas individuales por alumno y el cálculo de 7 días.

## Capabilities

### Modified Capabilities
- `emision-certificados`: añadir requisitos de cálculo automático de fechas (emisión = fecha de completado, inicio = emisión - 7 días) y su propagación al plugin de emisión automática.

## Impact

- Archivos afectados: `generar-certificado.php` (ya soporta `fecha_inicio` con default 7 días; verificar que el default se aplique correctamente), `tools/aula-plugin-certificados/classes/emisor.php` (debe pasar `fecha` y `fecha_inicio` calculada).
- Sin cambios de dependencias ni de plantilla PDF.
- Sin cambios de API pública (los parámetros ya existen).