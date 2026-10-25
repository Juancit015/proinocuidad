# Spec Delta

## ADDED Requirements

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
