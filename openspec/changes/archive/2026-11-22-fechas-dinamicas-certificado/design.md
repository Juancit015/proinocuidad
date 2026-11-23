# Design

## Context

El generador `generar-certificado.php` ya acepta `fecha_inicio` como parámetro opcional con default de 7 días antes de `fecha` (líneas ~330-340 del script). El plugin de emisión automática (`local_certificados`) ya pasa `fecha` = fecha de completado. Lo que falta es garantizar y documentar que `fecha_inicio` se calcule automáticamente cuando no se proporciona, y que el plugin pase ambos parámetros correctamente. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Documentar el cálculo automático de fechas (emisión = completado, inicio = emisión - 7 días)
- Garantizar que el plugin de emisión automática pase ambos parámetros
- Verificar que el generador aplica el default correctamente
- Añadir escenarios de prueba para fechas individuales

**Non-Goals:**
- No se modifica la plantilla PDF (las fechas van en el campo `lugar_fecha` que ya existe)
- No se cambia la API pública del generador (los parámetros ya existen)
- No se modifica la lógica de otros campos (nombre, programa, horas, créditos, QR)

## Decisions

### 1. Default de 7 días en el generador (ya implementado)
El generador ya tiene: `$tsIni = ($pIni === '') ? strtotime('-7 days', $tsFin) : mktime(...)`. Este default se mantiene. La spec lo documenta formalmente.

### 2. Plugin pasa fecha_inicio calculada
El plugin `local_certificados` calcula `fecha_inicio = fecha - 7 días` y la pasa explícitamente al generador (en lugar de depender del default). Esto hace el comportamiento explícito y testeable. Alternativa descartada: depender del default del generador; funciona pero es implícito.

### 3. Validación de fecha_inicio
El generador ya valida `fecha_inicio` con `checkdate()`. Se añade un escenario de prueba para verificar que fechas inválidas se rechacen con HTTP 400.

### 4. Sin cambios en la plantilla
Las fechas van en el campo `lugar_fecha` de la plantilla (página 1). El formato del texto (ej. "Trujillo, 4 al 11 de noviembre del 2026") se genera con `rango_fechas()`. No se modifica la plantilla.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| `strtotime('-7 days')` puede dar resultados inesperados en cambios de mes/año | Se usa `mktime()` para `fecha_inicio` explícita; el default usa `strtotime` que maneja correctamente los límites de mes |
| El plugin podría no pasar `fecha_inicio` y depender del default | El plugin SHALL pasarla explícitamente; se verifica en la prueba |
| Fechas de completado en Moodle podrían ser NULL | El plugin ya maneja esto: si no hay fecha de completado, el pendiente se salta |