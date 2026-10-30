# Proposal

## Why

El caso de Nelly Flores Perea (DNI 72709363, dos certificados: el diplomado SGCIA- 26-002 y el curso 010-2026-03-NFP-CIABPPH) puso sobre la mesa que un mismo DNI puede tener varios certificados emitidos — y cada vez lo será más, a medida que egresados del diplomado cursen programas cortos. La página de verificación ya muestra una tarjeta por certificado (comportamiento correcto), pero con más de una coincidencia las tarjetas se apilan sin ninguna explicación y se pueden leer como un duplicado o un error.

## What Changes

- Añadir un encabezado informativo de una línea que aparece **solo** cuando la vía por DNI o por nombre devuelve más de una tarjeta, antes de la pila de tarjetas: cuenta y aclaración de que la persona tiene varios certificados emitidos.
- Es un aviso neutro (no el canal rojo de error): estado informativo, no fallo de validación.
- La vía por código (`?codigo=` del QR) no cambia: siempre devuelve como máximo una tarjeta, sin encabezado.
- El resto de la página (validación, mensajes de error, descarga, iconografía, scroll) queda intacto.

## Capabilities

### New Capabilities

<!-- vacío: no se introduce ninguna capacidad nueva -->

### Modified Capabilities

- `verificacion-certificado`: el requisito "Presentación del resultado" se amplía — cuando una búsqueda por DNI o por nombre produce más de una cuenta coincidencia, la zona de resultados muestra un encabezado informativo de una línea ("Encontramos N certificados para tu DNI/consulta") antes de la pila de tarjetas, con escenario nuevo para el caso múltiple y escenario de ausencia del encabezado para el caso de una sola tarjeta y para la vía por código.

## Impact

- `verifica-tu-certificado.html`: la función de búsqueda (`buscar()` ya devuelve el arreglo completo de coincidencias) y `renderResultados()` ganan el encabezado condicional; un bloque pequeño de CSS (`.verifica-resumen` o equivalente) en la misma página.
- `assets/data/certificados.json` y su generador `tools/generar-certificados.mjs`: **sin cambios** (los datos ya son correctos; es un caso de presentación).
- Deploy: `verifica-tu-certificado.html` ya está en la lista blanca de `tools/publicar.sh`; la verificación de escritorio y a 390 px se hace con el arnés Playwright local antes del push/deploy (cada prueba se autoriza por separado).
