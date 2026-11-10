# Proposal

## Why

Al escanear el QR de un certificado (que abre `verifica-tu-certificado.html?codigo=<código>`),
la página muestra el indicador de carga ("Buscando…") pero, en ciertos casos, no
renderiza la tarjeta del certificado ni ningún aviso: el resultado queda vacío.
La causa raíz es una carrera entre la carga asíncrona de `assets/data/certificados.json`
y la búsqueda automática disparada por el parámetro `codigo`: si la búsqueda se
ejecuta mientras los datos aún no están cargados (o el fetch falló), `buscar()`
opera sobre `DATA === undefined` y lanza una excepción no manejada que se traga
el flujo, dejando el spinner sin limpiar y sin resultado. Además, en el camino de
fallo de carga, la búsqueda automática retorna silenciosamente sin mostrar el
aviso de error.

## What Changes

- La búsqueda automática por `?codigo=` SHALL esperar a que los datos estén
  cargados (o a que el fetch falle) antes de ejecutar `buscar()`, sin depender
  de un `setTimeout` frágil.
- El manejador de envío SHALL tratar `DATA === undefined` como "aún cargando"
  (esperar a `carga`) y no ejecutar `buscar()` hasta que `DATA` sea un array
  o `null`.
- Si el fetch falla, la búsqueda automática SHALL mostrar el aviso de error de
  carga (no retornar silenciosamente) y limpiar el estado de carga.
- Cualquier excepción no manejada dentro del flujo de búsqueda SHALL capturarse
  y mostrarse como aviso de error (sin dejar el spinner activo).
- Se añadirá un timeout de seguridad para que, si los datos no cargan en un
  plazo razonable, se muestre el aviso de error en lugar de quedar en carga
  indefinida.

## Capabilities

### New Capabilities
- (ninguna)

### Modified Capabilities
- `verificacion-certificado`: endurecer los requisitos de "Presentación del
  resultado" (escenario "Fallo al cargar los datos") y de "Búsqueda por DNI o
  nombre" para cubrir el camino de búsqueda automática por `?codigo=`,
  garantizando que se muestre resultado o aviso en todos los casos.

## Impact

- Archivo afectado: `verifica-tu-certificado.html` (bloque `<script>` inline,
  función `buscar`, `cargarDatos`, `form.addEventListener('submit', ...)`,
  bloque `autoBuscar`).
- No cambia el HTML estructural, el CSS ni el JSON de datos.
- No afecta la búsqueda manual ni el resto del sitio.