# Design

## Context

El flujo completo del alumno involucra tres sistemas: el sitio estático (formulario de inscripción + endpoint PHP + certificado), Moodle (aula virtual con exámenes), y la verificación pública de certificados. Cada sistema se probó por separado pero nunca como un flujo único con un usuario real. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Procedimiento reproducible de prueba end-to-end ejecutable en menos de 30 minutos
- Cobertura de todos los pasos: inscripción → examen → certificado → verificación
- Verificación automatizada de los pasos que no requieren intervención humana
- Documentar los resultados de cada paso con evidencia medible
- Limpieza completa de datos de prueba al finalizar

**Non-Goals:**
- No se modifican textos, colores, enlaces ni datos de contacto del sitio
- No se crea infraestructura de CI/CD ni se automatiza el deploy
- No se modifica el endpoint PHP, el formulario ni Moodle; solo se verifica su comportamiento
- No se prueba el flujo de pago online con Culqi (fuera de alcance)

## Decisions

### 1. Usuario de prueba con datos ficticios
Se crea un usuario Moodle con credenciales conocidas (`test.alumno1` / `Test1234!`) y datos ficticios (nombre, email, DNI). El usuario se inscribe en un curso real (BPM y Programas Prerrequisitos Codex, course id 2) para que el examen y el certificado sean realistas. Alternativa descartada: usar un alumno real; afectaría datos de producción.

### 2. Voucher de prueba de 5 MB
Se genera un PDF de 5 MB con ImageMagick para la prueba de inscripción. Se envía a la bandeja real de `formacion_academica@proinocuidad.com`. Alternativa descartada: voucher de 1 MB; no probaría el límite de peso.

### 3. Examen con preguntas existentes
El curso 2 tiene 20 preguntas en el banco (categoría "Default", context 14). El examen tiene 20 slots. No se crean preguntas nuevas. Alternativa descartada: crear preguntas de prueba; innecesario, ya existen.

### 4. Certificado con código de prueba
Se genera un certificado con código `TEST-2026-001` usando el endpoint `generar-certificado.php`. El QR apunta a `verifica-tu-certificado.html?codigo=TEST-2026-001`. Alternativa descartada: usar un código real; contaminaría los datos de producción.

### 5. Verificación por inspección manual + automatizada
Los pasos que requieren juicio humano (correo recibido, PDF con QR, verificación visual) se documentan con capturas. Los pasos que se pueden automatizar (HTTP codes, md5, layout del examen) se verifican con curl/PHP CLI.

### 6. Limpieza completa al final
Se eliminan: usuario de prueba, sus intentos de examen, certificado de prueba, voucher de prueba. Se verifica que los alumnos reales no se vean afectados.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| Correo de prueba en bandeja real (ruido) | Usar asunto con prefijo "PRUEBA" y borrar después |
| Certificado de prueba en producción | Usar código `TEST-2026-001` y borrar después |
| Intento de examen de prueba en Moodle | Borrar intentos y usuario al final |
| Voucher de 5 MB puede tardar en subir | Timeout de 45s AJAX / 90s reloj |
| Moodle puede tener sesiones activas del admin | Usar usuario de prueba separado |