# Spec Delta

## ADDED Requirements

### Requirement: Límite de envíos por dirección IP

El servidor SHALL limitar las inscripciones por endpoint a un máximo de 3 envíos por IP cada 10 minutos y 10 por IP por día. Un envío que exceda cualquiera de los dos límites SHALL rechazarse con el estado HTTP 429 y un mensaje legible que indique cuándo puede reintentarse. El límite SHALL aplicar a todas las vías de envío del formulario y SHALL sobrevivir a recargas y cierres del navegador (estado en servidor).

#### Scenario: Cuarto envío seguido bloqueado

- **WHEN** una misma IP ya completó 3 envíos válidos en los últimos 10 minutos y manda un cuarto
- **THEN** recibe HTTP 429 (o su equivalente visible en el navegador: el aviso de error del formulario con el motivo) sin que se envíe ningún correo adicional, y el mensaje indica que espere unos 10 minutos

#### Scenario: Décimo primer envío del día bloqueado

- **WHEN** una misma IP completa 10 envíos válidos en un día natural y manda otro
- **THEN** recibe el rechazo de límite diario (429) hasta el día siguiente, aunque hayan pasado más de 10 minutos desde los anteriores

#### Scenario: Ventana recuperada permite enviar de nuevo

- **WHEN** una IP bloqueada por el límite de ráfaga espera hasta que ninguna de sus últimas 3 inscripciones tenga menos de 10 minutos
- **THEN** un nuevo envío se procesa normalmente (si además no excede el tope diario)

### Requirement: Una inscripción por DNI y curso

El servidor SHALL rechazar con HTTP 409 y un mensaje claro un segundo envío con el mismo DNI para el mismo curso, cuando una inscripción previa de esa combinación completó la validación. El mensaje SHALL indicar que la inscripción con ese documento ya fue recibida.

#### Scenario: Reinscripción del mismo DNI al mismo curso

- **WHEN** el servidor recibe un envío cuyo DNI y curso coinciden con uno ya registrado
- **THEN** responde 409 con "Ya registramos una inscripción con este DNI para este curso" y no manda otro correo

#### Scenario: Mismo DNI en otro curso pasa

- **WHEN** el mismo DNI se usa para un curso distinto al registrado
- **THEN** el envío se procesa normalmente (el dedup es por DNI + curso, no por DNI solo)

### Requirement: Validación del voucher en el servidor

El endpoint SHALL revalidar el voucher en el servidor, independientemente del JavaScript del cliente: tamaño máximo de 5 MB, tipo MIME real (finfo) de imagen o PDF, y extensión compatible con el tipo declarado. Un voucher que falle cualquier regla SHALL impedir el envío del correo y producir un rechazo con mensaje claro. Si el POST llega sin voucher y sin la exención de la vía AJAX, SHALL tratarse como inválido igual que hoy en cliente.

#### Scenario: 5 MB exactos aceptados en servidor

- **WHEN** un envío llega directamente al endpoint (por ejemplo, con curl, sin JavaScript de por medio) con un PDF o imagen de hasta 5 MB válido
- **THEN** el POST se procesa y se reenvía a FormSubmit con el adjunto

#### Scenario: 6 MB rechazados en servidor

- **WHEN** el POST llega con un adjunto de más de 5 MB (con el JS del cliente evitado o manipulado)
- **THEN** el endpoint responde con error y ningún correo sale

#### Scenario: MIME disfrazado rechazado

- **WHEN** el POST llega con un archivo `.png` cuyo contenido no es imagen (por ejemplo, un ejecutable o un vídeo renombrado)
- **THEN** el endpoint lo detecta por el MIME real y lo rechaza con el mensaje de tipo no permitido

### Requirement: Honeypot rellenado no genera envío

El endpoint SHALL rechazar silenciosamente (sin correo y sin revelar el motivo con detalle técnico) todo envío cuyo campo honeypot `_honey` llegue relleno. La respuesta SHALL ser neutra para un bot (no 4xx explícito con explicación del mecanismo).

#### Scenario: Bot rellena el honeypot

- **WHEN** un envío llega con `_honey` con contenido
- **THEN** no se envía ningún correo y la respuesta no describe el mecanismo de bloqueo

#### Scenario: Usuario normal no toca el honeypot

- **WHEN** el envío llega con `_honey` vacío (estado normal del formulario)
- **THEN** el comportamiento de validación y límites aplica sin cambio

### Requirement: Cooldown de cliente entre envíos

Tras un envío exitoso, el cliente SHALL deshabilitar el botón de envío durante una ventana de enfriamiento (cooldown) mostrando el tiempo restante, gestionada con `localStorage`. El cooldown SHALL ser solo de usabilidad: el límite real y vinculante es el del servidor; si el usuario recarga o manipula el `localStorage`, el servidor decide. El bloqueo del servidor (429/409) SHALL mostrarse como aviso de error del formulario y el botón SHALL quedar restaurado para reintentar dentro de límites.

#### Scenario: Cooldown tras envío exitoso

- **WHEN** una inscripción se completa (aviso verde) y el usuario intenta enviar otra de inmediato sin recargar
- **THEN** el botón está deshabilitado mostrando el tiempo restante y se rehabilita al terminar la ventana (el envío post-cooldown pasa por todos los límites del servidor)

#### Scenario: Bloqueo del servidor visible en el formulario

- **WHEN** el servidor responde 429 o 409 a un envío
- **THEN** el formulario muestra el mensaje del servidor en su aviso de error (rojo), el botón no se queda en carga y no hay salto a otra página
