# Design

## Context

Ver `proposal.md` para la motivación. Estado actual:

- `cursos/index.html` construye las 8 tarjetas en un `<script>` en línea que itera `window.PROINO_CURSOS` (con la excepción del flyer del curso DIGESA/SENASA, que muestra logo + aviso). El contenedor `#lista-cursos` llega vacío al navegador.
- `index.html` construye las tarjetas de `#cursos-destacados` filtrando `c.enHome` (4 cursos). El contenedor llega vacío.
- `tools/generar-fichas.mjs` ya establece el patrón del proyecto: script Node con `node:` + `writeFileSync`, fuente de verdad en `cursos-data.js`/PDF, salida HTML estático. No hay build ni dependencias nuevas.
- Solo 2 páginas y 2 contenedores están en alcance. Fichas de detalle, CSS, `cursos-data.js` y `main.js` no cambian.

## Goals / Non-Goals

**Goals:**

- Los dos listados llegan en el HTML inicial, byte por byte iguales a lo que hoy genera el JS.
- Regeneración determinista con un solo comando, siguiendo el patrón de `generar-fichas.mjs`.
- Las pestañas Asíncronos/En vivo siguen funcionando con el JS existente.

**Non-Goals:**

- No se rediseñan tarjetas ni se tocan estilos.
- No se migran otras secciones renderizadas por JS (si las hubiera, fuera de alcance).
- No se agrega paginación, filtros ni búsqueda.

## Decisions

### 1. Nuevo script `tools/generar-listados.mjs` que importa los datos desde `cursos-data.js`

`cursos-data.js` es un script de navegador (`window.PROINO_CURSOS = [...]`). El generador lo lee como texto y extrae el arreglo (evaluación acotada o `readFileSync` + parse del literal), en vez de duplicar los datos. Así hay una sola fuente de verdad.

Alternativa descartada: duplicar los datos en el script. Se descarta porque diverge con el tiempo y viola la regla del proyecto (fichas solo vía generador).

### 2. Plantilla de tarjeta compartida en el script, espejo del JS actual

Una función `tarjetaCurso(c, prefijo)` genera el mismo markup que hoy produce el `innerHTML` del JS (mismas clases `card card-curso`, `card-img`, `chips`, `card-acciones`, mismos SVG de "+" y WhatsApp, misma excepción de flyer DIGESA/SENASA). El `prefijo` parametriza rutas relativas (`../` en cursos, `""` en inicio).

Alternativa descartada: leer el DOM con un headless browser. Innecesario; la plantilla es pequeña y estable.

### 3. Reemplazo delimitado por marcadores en los dos HTML

Los contenedores conservan su `id` y clases; solo su contenido interior se reemplaza entre marcadores `<!-- generar-listados:inicio -->` / `<!-- generar-listados:fin -->`. El script falla si no encuentra los marcadores, para no escribir en el lugar equivocado. Esto evita reescribir páginas completas y preserva el menú, footer y scripts repetidos en las 13 páginas.

### 4. El JS constructor de tarjetas se elimina; el JS de pestañas se conserva

En `cursos/index.html` se elimina solo el bloque que itera `PROINO_CURSOS` y hace `appendChild`; se conserva la función `activar()` y los listeners de pestañas. En `index.html` se elimina el IIFE de destacados. Los `<script src>` a `cursos-data.js` pueden quedarse (las pestañas no lo usan, pero quitarlos es opcional y se decide en implementación si algún otro código lo referencia).

Alternativa descartada: mantener el JS como "hidratación". Duplicaría trabajo y riesgo de divergencia; el HTML estático ya es el contenido final.

### 5. Idempotencia verificable

El script reescribe los mismos bytes si los datos no cambiaron. La verificación es `node tools/generar-listados.mjs && git diff --exit-code` (o comparación de hash cuando no hay git). Esto permite detectar edición manual de tarjetas generadas.

## Risks / Trade-offs

- [Riesgo] El HTML generado y el JS actual podrían divergir en un detalle (ej. escape de comillas en `titulo.replace`) → Mitigación: la plantilla replica el `innerHTML` actual carácter por carácter; la tarea de verificación compara el DOM renderizado antes/después.
- [Riesgo] Edición manual futura dentro de los marcadores se pierde al regenerar → Mitigación: marcadores explícitos + regla documentada (tarjetas solo vía generador, igual que fichas).
- [Riesgo] `cursos-data.js` usa `window`, no `export` → Mitigación: el generador parsea el archivo como texto; si falla el parse, aborta sin escribir.
- [Trade-off] Se generan ~8 + 4 tarjetas duplicadas en dos archivos (bytes repetidos) a cambio de cero dependencia de JS y enlaces rastreables. Aceptable en sitio estático sin build.

## Migration Plan

1. Respaldo previo en `/tmp/opencode/respaldo-*/` (regla del proyecto) de `cursos/index.html`, `index.html`.
2. Agregar marcadores, crear script, ejecutar, verificar diff visual/DOM.
3. Eliminar bloques JS constructores, conservar pestañas.
4. Rollback: restaurar respaldo y no ejecutar el generador.

## Open Questions

Ninguna.
