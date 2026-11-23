# Proposal

## Why

El flujo completo de un alumno (inscripción → examen en Moodle → certificado con QR → verificación pública) se implementó y desplegó en producción, pero no existe una verificación documentada ni reproducible de punta a punta. Los componentes se probaron por separado (formulario, endpoint SMTP, exámenes Moodle, generador de certificados, verificación QR) pero nunca como un flujo único con un usuario real. Este change define el procedimiento y los criterios de aceptación para validar que todo el flujo funciona de principio a fin.

## What Changes

- Documentar un procedimiento de prueba end-to-end con un usuario de prueba ficticio que cubra: inscripción desde la ficha de curso, envío del formulario con voucher, recepción del correo, acceso al aula virtual, realización del examen, generación de certificado y verificación pública del certificado.
- Definir casos de prueba para cada etapa con criterios medibles (códigos HTTP, tiempos, contenido del correo, estado del examen, PDF generado, QR escaneable).
- Verificar la idempotencia del generador de fichas y el md5 del endpoint antes y después de la prueba.
- Documentar los resultados y limpiar los datos de prueba.

## Capabilities

### New Capabilities
- `prueba-flujo-completo`: procedimiento y casos de prueba end-to-end del flujo completo alumno (inscripción → examen → certificado → verificación), incluyendo creación de usuario de prueba, inscripción a curso, intento de examen, generación de certificado y verificación pública.

### Modified Capabilities
<!-- Ninguna: este change añade una capability nueva de pruebas/verificación sin modificar requisitos existentes. -->

## Impact

- Archivos afectados: ninguno (solo documentación en OpenSpec). La prueba se ejecuta contra producción real.
- Dependencias: Playwright (verificación visual), curl (endpoint), acceso a Moodle como admin, acceso a Gmail (bandeja de formacion_academica@proinocuidad.com).
- No se modifican textos, colores, enlaces ni datos de contacto del sitio.
- El endpoint y el correo se prueban contra producción real (Zoho SMTP). Los exámenes y certificados se prueban contra Moodle real.