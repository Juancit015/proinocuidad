# Design

## Context

El envío con voucher usa un iframe oculto (`iframe[data-inscripcion]`) creado en el
primer envío con voucher; su listener `load` identifica la respuesta de FormSubmit
(cross-origin, su `location` lanza SecurityError) contra la carga inicial de
`about:blank` (propia, legible). El estado "hay un envío en camino" lo lleva una
variable `pendiente`, y la restauración del botón la ejecuta `restaurar()`. Ambas
viven hoy con `var` DENTRO de la invocación actual del listener `submit`
(`assets/js/main.js`, bloque del iframe).

JavaScript hace hoisting de `var` al scope de función más cercano: el listener
`submit` que corre POR CADA envío. El listener `load`, en cambio, se registra una
sola vez (primer envío) y su cierre capturó la `pendiente` de ESA invocación. Tras
la primera respuesta, esa binding queda en `false`. En el segundo envío,
`pendiente = true` la escribe en la binding del scope nuevo — el `load` nunca la
ve — y sale por `if (vacia || !pendiente) return;` sin restaurar: el botón queda
en "Cargando…" aunque el correo salió. `restaurar` y la captura del texto del
botón (`textoBoton2`) sufren el mismo defecto de alcance (benigno hoy, porque la
captura de la 1.ª invocación es el mismo texto original, pero frágil).

El caso AJAX (sin voucher) no lo sufre: su `restaurar()` corre dentro de la misma
invocación (promesa `.then`/`.catch`).

## Goals / Non-Goals

- **Goal**: que el estado pendiente/restauración del iframe pertenezca al
  formulario, no a la invocación del listener; reenvíos ilimitados en una misma
  página funcionan como el primero.
- **Non-Goal**: no cambia la mecánica de envío (multipart clásico + `form.target`),
  ni la validación del voucher, ni la mensajería, ni el HTML generado.
- **Non-Goal**: no toca la vía AJAX ni el flujo clásico sin JS.

## Decisions

1. **Elevar el estado al scope del `forEach` del formulario** (se ejecuta una vez
   por formulario, no por envío): `var pendienteIframe = false;`,
   `var restaurarBoton = function () { ... };` y la captura del texto del botón
   se toman por envío pero se asignan a una variable del scope externo
   (`textoBotonBase`). El listener `load` se registra una sola vez y cierra sobre
   ESAS bindings compartidas.
   - *Alternativa descartada*: estado en el propio iframe
     (`marco.dataset.pendiente`) — funciona igual pero convierte un flag de
     alcance en un atributo serializado; el scope externo era el lugar natural
     que el código ya pretendía (la intención original era "una por forma", `var`
     la rompió).
   - *Alternativa descartada*: recrear el iframe y su listener en cada envío —
     introduce reinicialización innecesaria de un nodo del DOM ya estable.

2. **Un solo punto de restauración**: `restaurarBoton()` queda definido una vez
   (scope externo) y se usa desde el `load` y de las vías AJAX (en su caso
   correspondiente), con la captura del texto actualizada en cada envío antes de
   almacenarla en `textoBotonBase`.

## Risks / Trade-offs

- [Alcance compartido visible por el `load` del primer envío] → la lógica interna
  del `load` no cambia: sigue precisa la distinción `about:blank` vs respuesta
  cross-origin, solo cambia DÓNDE vive el flag.
- [Reenvíos muy rápidos (doble click durante el envío happens hijo)] → el botón
  está `disabled` durante el envío, ya lo evita.
- [Regresión en la primera inscripción] → la suite local del change anterior
  (`form-tareas2.mjs` del arnés) se re-corre además del caso nuevo de doble envío.

## Migration Plan

1. Aplicar el cambio de alcance en `assets/js/main.js` (solo el bloque del iframe
   + las referencias de `restaurar` del mismo listener de envío).
2. Verificación local con Playwright: suite previa + caso nuevo "dos envíos
   seguidos con voucher" (ambos con aviso verde y botón restituido; 2 POST
   clásicos contados) y "doble envío AJAX" (2 fetch, ambos restaurados).
3. Commit → push → deploy por la lista blanca del flujo establecido; el
   `no-cache` del `.htaccess` hace que una recarga normal lo vea.

## Open Questions

- Ninguno. El diagnóstico está confirmado contra el código vigente
  (`main.js` l. 477: `var pendiente = false;` dentro de `if (!marco)`;
  l. 492: `pendiente = true` en el scope de la invocación).
