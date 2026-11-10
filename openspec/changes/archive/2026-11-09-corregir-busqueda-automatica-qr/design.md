# Design

## Context

El flujo afectado vive en el bloque `<script>` inline de
`verifica-tu-certificado.html`: `cargarDatos()` (fetch del JSON),
`buscar(q)` (filtrado), el listener `submit` del formulario y el bloque
`autoBuscar` disparado cuando existe `?codigo=`. El estado se guarda en
`DATA` (undefined=cargando, null=error, array=lista) y en la promesa `carga`.

Causa raíz: la búsqueda automática depende de un `setTimeout` de 100 ms
que puede disparar `submit` antes de que `DATA` sea un array; en ese caso
`buscar()` llama a `DATA.filter` sobre `undefined` y lanza una excepción
no manejada que se traga el flujo (el spinner queda y no se renderiza
nada). Además, si el fetch falla, `autoBuscar` retorna silenciosamente
sin mostrar el aviso de error.

## Goals / Non-Goals

**Goals:**
- Que la búsqueda automática por `?codigo=` espere a que los datos estén
  cargados o a que el fetch falle, sin depender de `setTimeout`.
- Que el manejador de envío nunca ejecute `buscar()` con `DATA` no array.
- Que cualquier fallo (fetch o excepción en búsqueda) muestre el aviso de
  error y restablezca el botón.
- Añadir un timeout de seguridad (p. ej. 8 s) para no quedar en carga
  indefinida.

**Non-Goals:**
- No cambiar el HTML estructural, el CSS ni el JSON de datos.
- No cambiar la búsqueda manual ni el resto del sitio.
- No introducir librerías externas.

## Decisions

**Decisión 1 — `autoBuscar` espera a `carga`, no a `setTimeout`.**
En lugar de sondear `DATA === undefined` cada 100 ms, `autoBuscar` espera
a la promesa `carga` (o a `Promise.resolve()` si ya existe) y solo
despacha `submit` cuando esa promesa se resuelve. Si `DATA === null`
(fetch fallido), muestra el aviso de error y restablece el botón.

Alternativa descartada: mantener el sondeo con intervalo mayor — frágil
y dependiente de timing.

**Decisión 2 — Guardia en el listener `submit`.**
Antes de ejecutar `buscar(q)`, comprobar `DATA === undefined`: si es así,
esperar a `carga` y reintentar el envío (o mostrar error si `DATA === null`).
Así, aunque el submit se dispare antes de tiempo, no se ejecuta `buscar()`
sobre `undefined`.

**Decisión 3 — try/catch alrededor del flujo de búsqueda.**
Envolver `buscar(q)` + render en un `try/catch`; en el `catch`, llamar a
`mostrarErrorCarga()` (o un aviso genérico) y restablecer el botón. Evita
que una excepción silenciosa deje el spinner activo.

**Decisión 4 — Timeout de seguridad.**
Si `carga` no se resuelve en 8 s, mostrar el aviso de error y restablecer
el botón, para evitar carga indefinida en redes lentas o bloqueadas.

## Risks / Trade-offs

- [Riesgo] El timeout de 8 s podría cortar una carga legítima muy lenta.
  Mitigación: 8 s es generoso para un JSON de ~60 KB; ajustable.
- [Riesgo] Doble disparo de `submit` si `autoBuscar` y el usuario actúan
  a la vez. Mitigación: la bandera `buscando` ya serializa las búsquedas.
- [Trade-off] Se mantiene el mínimo perceptible de 420 ms para no
  parpadear.

## Migration Plan

1. Editar el bloque `<script>` de `verifica-tu-certificado.html`.
2. Probar en Chromium (desktop y móvil) con `?codigo=` válido, inválido
   y con red bloqueada (DevTools offline).
3. Verificar que no queden excepciones en consola.
4. Commit y push (sin deploy script).

## Open Questions

- Ninguno.