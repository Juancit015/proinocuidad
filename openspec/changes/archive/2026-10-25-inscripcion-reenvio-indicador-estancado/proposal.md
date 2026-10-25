# Proposal

## Why

Con el formulario desplegado (commit `5ab6263` + indicador de envío), se reportó en producción (2026-10-25) un caso de reenvío: la primera inscripción sale bien (el correo llega, el aviso verde aparece), pero si el usuario vuelve a llenar el formulario SIN recargar la página y lo envía otra vez, el correo sí llega a FormSubmit mientras el botón queda atrapado en "Cargando…" para siempre. El usuario no tiene forma de saber que el segundo envío funcionó y el formulario queda inusable de vista.

## What Changes

- Corregir el ciclo de vida del indicador de envío en reenvíos consecutivos por la vía de voucher (iframe oculto): el botón debe salir del estado de carga y mostrar el aviso verde en CADA envío, no solo en el primero.
- Causa raíz (ya diagnosticada leyendo `assets/js/main.js`): `pendiente` y `restaurar` viven con `var` en el scope de cada invocación del listener `submit`, pero el listener `load` del iframe se crea UNA sola vez (primer envío) y capturó la variable de la PRIMERA invocación, que quedó en `false` tras la primera respuesta. En el segundo envío, `pendiente = true` escribe la binding nueva; el `load` mira la vieja (`false`) y hace `return` temprano sin restaurar el botón.
- El arreglo elevar el estado pendiente/restauración al scope compartido por todos los envíos del formulario (el callback de `forEach` por form, que no se recrea), de modo que el listener `load` y cada envío lean y escriban la misma binding. No toca la validación, ni el envío, ni la mensajería: solo la forma de alcanzar el estado de restauración.

## Capabilities

### New Capabilities
<!-- ninguna: es un fix de comportamiento de la capability inscripcion existente -->

### Modified Capabilities

- `inscripcion`: añade la exigencia de ciclo de vida multi-envío del indicador (requisito ADDED "Reenvío consecutivo del formulario sin recargar"): tras un primer envío con voucher exitoso, volver a llenar y enviar SIN recargar debe enviar el correo y restaurar el botón con el aviso verde; ninguna vía deja el indicador estancado.

## Impact

- `assets/js/main.js`: bloque de envío vía iframe (líneas ~465-505). Cambio de alcance de variables (`pendiente`, `restaurar`, captura del texto del botón): hoisting al scope del `forEach` del formulario.
- Deploy: solo `main.js`; el guard del generador no aplica (no cambia el HTML). Sin cambios de CSS ni del generador.
- Riesgo: bajo — la vía AJAX y la clásica sin JS quedan intactas; el cambio es de mecánica interna del flag. Se debe verificar con suite Playwright de dos envíos seguidos en la misma página.
