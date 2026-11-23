# Tasks

## 1. Preparación

- [x] 1.1 Crear usuario de prueba en Moodle (`test.alumno1` / `Test1234!`, email `test.alumno1@proinocuidad.com`). Verificar con `SELECT` que existe y está activo.
- [x] 1.2 Inscribir al usuario en el curso "BPM y Programas Prerrequisitos Codex" (course id 2). Verificar en "Mis cursos" del usuario.
- [x] 1.3 Generar voucher de prueba de 5 MB (`/tmp/test-voucher-5mb.pdf`) y verificar tamaño con `ls -lh`.
- [x] 1.4 Verificar md5 del endpoint en producción vs repositorio. Documentar resultado.

## 2. Inscripción (formulario → correo)

- [x] 2.1 Abrir la ficha de un curso en Playwright a 390px y 1280px. Verificar que el formulario carga con el curso precargado y sin desborde horizontal.
- [x] 2.2 Completar el formulario con datos del usuario de prueba y adjuntar el voucher de 5 MB. Enviar y verificar que la UI muestra el indicador de envío (bolita + "Cargando…") y luego el aviso de éxito.
- [x] 2.3 Verificar que el endpoint responde HTTP 200.
- [x] 2.4 Abrir la bandeja de Gmail (`formacion_academica@proinocuidad.com`) y verificar: asunto "Inscripción web — {curso}", tabla HTML con los datos del formulario, voucher adjunto con el nombre correcto, hora de Lima.
- [x] 2.5 Verificar que el tiempo de respuesta del endpoint con voucher de 5 MB es menor a 45 segundos.

## 3. Examen en Moodle

- [x] 3.1 Iniciar sesión en Moodle como `test.alumno1`. Verificar que accede al área personal y ve el curso en "Mis cursos".
- [x] 3.2 Entrar al curso y verificar que el examen está disponible.
- [x] 3.3 Iniciar un intento de examen y verificar que carga las 10 preguntas sin error "No se han encontrado respuestas".
- [x] 3.4 Responder las preguntas y enviar el examen. Verificar que se califica y muestra el resultado.
- [x] 3.5 Verificar que la nota queda registrada en el libro de calificaciones de Moodle.

## 4. Certificado

- [x] 4.1 Generar certificado de prueba con el endpoint: `https://proinocuidad.com/generar-certificado.php?nombre=Test+Alumno+Uno&programa=Curso+de+Prueba&fecha=2026-11-13&horas=40&codigo=TEST-2026-001`. Verificar que responde con redirect a `certificados/TEST-2026-001.pdf` y el PDF existe.
- [x] 4.2 Abrir el PDF y verificar que contiene el QR de verificación.
- [x] 4.3 Verificar el certificado en `https://proinocuidad.com/verifica-tu-certificado.html?codigo=TEST-2026-001` — debe mostrar los datos del certificado y el enlace de descarga.
- [x] 4.4 Escanear el QR del certificado y verificar que abre la página de verificación con el código correcto.

## 5. Idempotencia del generador

- [x] 5.1 Ejecutar `node tools/generar-fichas.mjs` y `node tools/generar-listados.mjs` dos veces consecutivas. Verificar que la segunda pasada no cambia ningún byte (md5sum y git status idénticos) y ambos salen con código 0.
- [x] 5.2 Verificar que las 8 fichas asíncronas siguen sin diff tras la regeneración.

## 6. Limpieza y documentación

- [x] 6.1 Eliminar el usuario de prueba de Moodle (y sus intentos de examen).
- [x] 6.2 Eliminar el certificado de prueba del servidor (`certificados/TEST-2026-001.pdf`) y del índice (`certificados.json`).
- [x] 6.3 Borrar el voucher de prueba de la bandeja de Gmail y los archivos temporales (`/tmp/test-voucher-*`).
- [x] 6.4 Verificar que los alumnos reales, cursos, exámenes y certificados existentes no se vieron afectados.
- [x] 6.5 Documentar los resultados de cada prueba en `CHANGELOG.md`.
- [x] 6.6 Si todas las pruebas pasan, marcar el change como verificado y archivarlo.