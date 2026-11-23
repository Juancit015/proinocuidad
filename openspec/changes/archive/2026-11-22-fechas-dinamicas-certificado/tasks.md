# Tasks

## 1. Verificación del generador (sin cambios de código)

- [x] 1.1 Llamar al generador sin `fecha_inicio` y verificar que el PDF muestra el período correcto (fecha - 7 días al fecha). Usar: `https://proinocuidad.com/generar-certificado.php?nombre=Test&programa=BPM+y+Programas+Prerrequisitos&fecha=2026-11-13&horas=40&codigo=TEST-FECHAS-001`
- [x] 1.2 Verificar que el PDF generado muestra "del 6 al 13 de noviembre del 2026" (7 días antes).
- [x] 1.3 Llamar con `fecha_inicio` explícita y verificar que se usa esa fecha: `...&fecha_inicio=2026-11-01`
- [x] 1.4 Verificar que con `fecha_inicio` inválida (ej. `2026-13-40`) responde HTTP 400 con "La fecha de inicio es invalida".
- [x] 1.5 Verificar que con `fecha` inválida (ej. `2026-13-40`) responde HTTP 400.

## 2. Verificación del plugin de emisión automática

- [x] 2.1 Verificar que el plugin `local_certificados` pasa `fecha` = fecha de completado y `fecha_inicio` = fecha - 7 días al generador. Revisar `classes/emisor.php` en `tools/aula-plugin-certificados/`.
- [x] 2.2 Si el plugin no pasa `fecha_inicio` explícitamente, añadir la lógica de cálculo.
- [x] 2.3 Verificar que el código del plugin en el repo coincide con el del servidor (md5).

## 3. Prueba con fechas reales

- [x] 3.1 Generar certificado con fecha de hoy y verificar que el período es de 7 días.
- [x] 3.2 Generar certificado con fecha de inicio de mes (ej. `fecha=2026-11-03`) y verificar que `fecha_inicio` = `2026-10-27` (cruce de mes).
- [x] 3.3 Generar certificado con fecha de inicio de año (ej. `fecha=2027-01-05`) y verificar que `fecha_inicio` = `2026-12-29` (cruce de año).

## 4. Limpieza

- [x] 4.1 Borrar el certificado de prueba `TEST-FECHAS-001` del servidor y del índice.
- [x] 4.2 Documentar los resultados en `CHANGELOG.md`.
- [x] 4.3 Si todas las pruebas pasan, marcar el change como verificado y archivarlo.