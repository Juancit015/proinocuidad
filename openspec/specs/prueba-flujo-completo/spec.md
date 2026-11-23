# prueba-flujo-completo Specification

## Purpose
Verificar que el flujo completo del alumno funciona de punta a punta: inscripción desde la ficha de curso → envío del formulario con voucher → recepción del correo → acceso al aula virtual → realización del examen → generación de certificado con QR → verificación pública del certificado.

## Requirements

### Requirement: Creación de usuario de prueba
El procedimiento SHALL incluir la creación de un usuario de prueba en Moodle con credenciales conocidas, para verificar el flujo completo sin afectar a alumnos reales.

#### Scenario: Usuario de prueba creado
- **WHEN** se crea el usuario de prueba en Moodle
- **THEN** el usuario existe, está activo, no está suspendido ni eliminado, y puede iniciar sesión

#### Scenario: Credenciales documentadas
- **WHEN** se crea el usuario de prueba
- **THEN** las credenciales (usuario y contraseña) se documentan para la prueba

### Requirement: Inscripción desde la ficha
El usuario de prueba SHALL poder abrir la ficha de un curso, completar el formulario de inscripción con sus datos, adjuntar un voucher válido y enviar. El endpoint SHALL responder HTTP 200 y la UI SHALL mostrar el aviso de éxito.

#### Scenario: Formulario carga correctamente
- **WHEN** se abre la ficha de un curso
- **THEN** el formulario carga con el curso precargado, sin desborde horizontal a 390px y 1280px

#### Scenario: Envío exitoso con voucher
- **WHEN** se completa el formulario con datos válidos y un voucher válido, y se envía
- **THEN** el endpoint responde HTTP 200 y la UI muestra el aviso de éxito

#### Scenario: Correo recibido
- **WHEN** se envía la inscripción
- **THEN** llega un correo a `formacion_academica@proinocuidad.com` con asunto "Inscripción web — {curso}", tabla HTML con los datos y voucher adjunto

### Requirement: Acceso al aula virtual
El usuario de prueba SHALL poder iniciar sesión en Moodle con sus credenciales y acceder al curso en el que está inscrito.

#### Scenario: Login exitoso
- **WHEN** el usuario de prueba inicia sesión en Moodle
- **THEN** accede al área personal y ve el curso en "Mis cursos"

#### Scenario: Acceso al examen
- **WHEN** el usuario entra al curso
- **THEN** ve el examen disponible y puede iniciar un intento

### Requirement: Realización del examen
El usuario de prueba SHALL poder iniciar un intento de examen, responder las preguntas y enviar. El examen SHALL cargar todas las preguntas sin error.

#### Scenario: Examen carga preguntas
- **WHEN** el usuario inicia un intento de examen
- **THEN** el examen carga todas las preguntas (10-20 según el curso) sin error "No se han encontrado respuestas"

#### Scenario: Envío del examen
- **WHEN** el usuario responde las preguntas y envía
- **THEN** el examen se califica y muestra el resultado

#### Scenario: Nota registrada
- **WHEN** el examen se califica
- **THEN** la nota queda registrada en el libro de calificaciones de Moodle

### Requirement: Generación de certificado
El usuario de prueba SHALL poder generar un certificado con el endpoint `generar-certificado.php` usando los parámetros del curso (nombre, programa, fecha, horas, código). El PDF SHALL generarse con QR de verificación.

#### Scenario: Certificado generado
- **WHEN** se llama al endpoint con parámetros válidos
- **THEN** responde con redirect a `certificados/<codigo>.pdf` y el PDF existe en el servidor

#### Scenario: QR en el certificado
- **WHEN** se abre el PDF del certificado
- **THEN** contiene un código QR que apunta a `verifica-tu-certificado.html?codigo=<codigo>`

### Requirement: Verificación pública del certificado
El certificado generado SHALL ser verificable públicamente en `verifica-tu-certificado.html` usando el código del certificado.

#### Scenario: Certificado encontrado
- **WHEN** se busca el código del certificado en la página de verificación
- **THEN** muestra los datos del certificado (nombre, programa, fecha, horas) y el enlace de descarga del PDF

#### Scenario: QR escaneable
- **WHEN** se escanea el QR del certificado con un lector
- **THEN** abre la página de verificación con el código correcto y muestra el certificado

### Requirement: Limpieza de datos de prueba
Al finalizar la prueba, se SHALL eliminar el usuario de prueba, sus intentos de examen, y el certificado de prueba generado.

#### Scenario: Limpieza completa
- **WHEN** se ejecuta la limpieza
- **THEN** el usuario de prueba no existe, sus intentos no están en la BD, y el certificado de prueba se eliminó del servidor

#### Scenario: Sin efectos secundarios
- **WHEN** se ejecuta la limpieza
- **THEN** los alumnos reales, cursos, exámenes y certificados existentes no se ven afectados

### Requirement: Idempotencia del generador
Los generadores `generar-fichas.mjs` y `generar-listados.mjs` SHALL ser idempotentes: ejecutarlos dos veces consecutivas no debe cambiar ningún byte de los archivos generados.

#### Scenario: Segunda pasada sin cambios
- **WHEN** se ejecutan ambos generadores dos veces consecutivas
- **THEN** la segunda pasada deja `git status` sin cambios y ambos comandos salen con código 0

### Requirement: md5 del endpoint
El endpoint `ajax/envio-inscripcion.php` en producción SHALL tener el mismo md5 que en el repositorio local.

#### Scenario: md5 coincidente
- **WHEN** se compara el md5 del endpoint en el servidor con el del repositorio
- **THEN** ambos son idénticos
