# Tasks

## 1. Robustecer el flujo de búsqueda automática por código

- [x] 1.1 Reescribir `autoBuscar` para esperar a la promesa `carga` en lugar de sondear `DATA === undefined` con `setTimeout`, y ejecutar `submit` solo cuando `carga` se resuelva; si `DATA === null`, mostrar el aviso de error y restablecer el botón. Verificar con `?codigo=016-2026-11-AJJ-BPMISO` que la tarjeta aparece.
- [x] 1.2 Añadir guardia en el listener `submit`: si `DATA === undefined`, esperar a `carga` (con timeout de seguridad de 8 s) antes de ejecutar `buscar(q)`; si `DATA === null`, mostrar el aviso de error y restablecer el botón sin llamar a `buscar`. Verificar que no se lanza ninguna excepción en la consola.
- [x] 1.3 Envolver el flujo de búsqueda (validación + `buscar` + render) en `try/catch`; en el `catch`, llamar a `mostrarErrorCarga()` (o aviso genérico) y restablecer el botón. Verificar con DevTools que no quedan excepciones sin manejar.
- [x] 1.4 Añadir timeout de seguridad de 8 s sobre `carga`: si no se resuelve, mostrar el aviso de error y restablecer el botón. Verificar simulando red lenta/bloqueada (DevTools offline) que aparece el aviso y el botón se restaura.

## 2. Verificación

- [x] 2.1 Probar en Chromium desktop y móvil (390 px) con `?codigo=` válido, inválido y con red bloqueada; confirmar que siempre se muestra tarjeta o aviso y que el spinner no queda activo. Documentar el resultado en `docs/aula-virtual.md`.

## Workflow follow-up

- Archivar el change tras la verificación visual y el push.