# Inscripción

## Purpose

Definir el formulario de inscripción embebido en las fichas de curso, con comprobante de pago condicional (boleta/factura con RUC y razón social).

## Requirements

### Requirement: Formulario de inscripción en ficha
Cada ficha de curso SHALL incluir debajo de la tarjeta "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" con los campos: curso (precargado, visible), nombre y apellidos, DNI, empresa/institución, cargo/ocupación, celular, correo, país (lista desplegable con Perú por defecto y Extranjero, con estilo propio del sitio), voucher de pago (archivo adjunto), opción de comprobante de pago y aceptación de conformidad. El envío SHALL llegar a `formacion_academica@proinocuidad.com`.

#### Scenario: Inscripción básica sin comprobante
- **WHEN** el usuario completa sus datos, adjunta el voucher y envía sin marcar comprobante
- **THEN** la inscripción se envía sin datos de facturación

#### Scenario: Curso precargado por ficha
- **WHEN** el usuario abre el formulario en la ficha de un curso
- **THEN** el curso ya viene seleccionado con el nombre de ese curso, sin elegirlo

#### Scenario: Scroll desde Matricularme Ahora
- **WHEN** el usuario hace clic en "Matricularme Ahora" dentro de la ficha
- **THEN** la página hace scroll al formulario de esa misma ficha, sin salir a un sitio externo

#### Scenario: País por defecto Perú
- **WHEN** el usuario abre el formulario de cualquier ficha
- **THEN** el campo País muestra Perú sin que tenga que elegir nada

#### Scenario: Usuario del extranjero
- **WHEN** el usuario abre la lista de País y elige Extranjero
- **THEN** la inscripción se envía con país Extranjero a `formacion_academica@proinocuidad.com`

#### Scenario: Desplegable con estilo del sitio
- **WHEN** el usuario ve el campo País en 1280px y en 390px
- **THEN** el desplegable se ve integrado al formulario (sin apariencia básica del navegador) y no genera desborde

### Requirement: Comprobante de pago condicional
El formulario SHALL incluir la opción "Deseo comprobante de pago" con tipo Boleta o Factura. Si elige Factura, el RUC (exactamente 11 dígitos numéricos) y la razón social SHALL ser obligatorios y el envío SHALL bloquearse hasta completarlos. Si elige Boleta, no SHALL pedir RUC ni razón social.

#### Scenario: Factura sin RUC
- **WHEN** el usuario elige Factura y deja el RUC vacío o con formato inválido
- **THEN** ve un error y el formulario no se envía

#### Scenario: Boleta sin datos extra
- **WHEN** el usuario elige Boleta
- **THEN** el formulario se envía solo con su DNI y datos personales, sin RUC ni razón social

### Requirement: Indicador de envío del formulario
Al enviar la inscripción (vía AJAX sin voucher o POST clásico con voucher), el botón "Enviar inscripción" SHALL mostrar un indicador de envío visible: bolita giratoria + texto "Cargando…", botón deshabilitado y cursor de espera. El indicador SHALL cortarse cuando llegue la confirmación o el error, restituyendo el botón. Con `prefers-reduced-motion` la bolita SHALL mostrarse sin giro.

#### Scenario: Indicador en la vía AJAX
- **WHEN** el usuario completa el formulario sin voucher y toca "Enviar inscripción"
- **THEN** el botón muestra la bolita junto al texto "Cargando…", queda deshabilitado y con cursor de espera hasta que aparece el aviso, y luego vuelve a su estado original

#### Scenario: Indicador en la vía con voucher
- **WHEN** el usuario envía con voucher (POST clásico dentro del iframe oculto)
- **THEN** el indicador del botón se comporta igual: bolita + "Cargando…" durante el envío y estado original cuando el iframe carga con el aviso de confirmación

#### Scenario: Indicador se corta si falla
- **WHEN** el envío falla (por ejemplo, el endpoint AJAX rechaza la solicitud)
- **THEN** la bolita desaparece con el aviso de error y el botón vuelve a estar disponible para reintentar, sin quedarse nunca en "Cargando…"

#### Scenario: Movimiento reducido
- **WHEN** el usuario envía con `prefers-reduced-motion: reduce` activo
- **THEN** la bolita se muestra estática (sin animación de giro) y el resto de la retroalimentación (texto, cursor, aviso) funciona igual

### Requirement: Validación del voucher (tipo y peso)
El voucher SHALL aceptar solo imágenes (`image/*`) y PDF, con un máximo de 5 MB. Un adjunto que no cumpla SHALL bloquearse antes de salir del navegador: mensaje inline junto al campo con el motivo, la selección se limpia, el formulario no se envía y el botón no queda en cargo. La validación SHALL correr al elegir el archivo y al enviar, y el error SHALL desaparecer al elegir un adjunto válido. Sin JS, el clásico SHALL seguir funcionando como hoy.

#### Scenario: Adjunto válido pasa
- **WHEN** el usuario elige una imagen o un PDF de 5 MB o menos y envía
- **THEN** la inscripción se envía con el voucher adjunto, igual que hoy

#### Scenario: Adjunto de tipo no permitido
- **WHEN** el usuario elige un vídeo MP4 (o cualquier archivo que no sea imagen/PDF), aunque pese menos de 5 MB
- **THEN** ve el mensaje "Solo se aceptan imágenes o PDF (5 MB máximo)" junto al campo, el archivo se descarta y la inscripción no se envía

#### Scenario: Adjunto que supera 5 MB
- **WHEN** el usuario elige una imagen o PDF de más de 5 MB
- **THEN** ve el mensaje del límite de peso junto al campo, el archivo se descarta y la inscripción no se envía

#### Scenario: Corregir el adjunto limpia el error
- **WHEN** tras un mensaje de error el usuario elige un archivo válido
- **THEN** el mensaje desaparece y el envío de inscripción vuelve al flujo normal

#### Scenario: Sin JavaScript no se rompe el clásico
- **WHEN** la página carga sin JS (la validación no existe)
- **THEN** la única restricción disponible es el `accept` del selector del sistema y el comportamiento clásico de envío sigue siendo el mismo que hoy

### Requirement: Reenvío consecutivo del formulario sin recargar

Tras un envío exitoso del formulario de inscripción, cada reenvío en la
misma página (sin recargar) MUST completarse como el primero, y ninguna
vía de envío MUST dejar el indicador de envío en estado de carga de
forma permanente.

#### Scenario: Segundo envío con voucher en la misma sesión

- **WHEN** una inscripción con voucher se envía con éxito (aviso verde) y, sin recargar, el usuario llena el formulario otra vez, adjunta un voucher válido y lo envía
- **THEN** el correo con el adjunto sale igual que en el primer envío, el botón vuelve a su texto e icono originales al llegar la respuesta (sale del estado de carga) y el aviso verde se muestra de nuevo

#### Scenario: Indicador nunca queda estancado

- **WHEN** se completan dos o más envíos seguidos en la misma página, por AJAX (sin voucher) o con voucher (iframe)
- **THEN** tras cada respuesta el botón queda fuera del estado de carga y listo para un envío posterior; no existe ningún envío que entregue el correo y deje el indicador en "Cargando…" indefinidamente

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
