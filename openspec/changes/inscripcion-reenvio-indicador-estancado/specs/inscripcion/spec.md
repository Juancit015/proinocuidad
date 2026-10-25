# Spec Delta

## ADDED Requirements

### Requirement: Reenvío consecutivo del formulario sin recargar

Tras un envío exitoso del formulario de inscripción, cada reenvío en la
misma página (sin recargar) MUST completarse como el primero, y ninguna
vía de envío MUST dejar el indicador de envío en estado de carga de
forma permanente.

#### Scenario: Segundo envío con voucher en la misma sesión

- **WHEN** una inscripción con voucher se envía con éxito (aviso verde) y, sin recargar, el usuario llena el formulario otra vez, adjunta un voucher válido y lo envía
- **THEN** el correopensó con el adjunto sale igual que en el primer envío, el botón vuelve a su texto e icono originales al llegar la respuesta (sale del estado de carga) y el aviso verde se muestra de nuevo

#### Scenario: Indicador nunca queda estancado

- **WHEN** se completan dos o más envíos seguidos en la misma página, por AJAX (sin voucher) o con voucher (iframe)
- **THEN** tras cada respuesta el botón queda fuera del estado de carga y listo para un envío posterior; no existe ningún envío que entregue el correo y deje el indicador en "Cargando…" indefinidamente
