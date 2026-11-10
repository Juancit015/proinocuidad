# Proposal

## Why

El cliente pidió retirar la nota del certificado: el PDF ya no debe imprimir
"Calificación: X" ni la nota en el sílabo. La nota solo servía para mostrarla
en el documento; el criterio de aprobación (aprobar el examen) se mantiene
para la finalización del curso.

Además, los 84 alumnos que terminaron sus cursos el año pasado no tienen nota
ni fechas en el aula (nunca se les generó certificado). Como la nota deja de
imprimirse, deja de ser un obstáculo para emitirles: basta con marcarlos
como completados con la fecha actual y generar su ficha, para empezar las
pruebas de emisión masiva.

## What Changes

- **Generador (`generar-certificado.php`)**: `nota` deja de ser parámetro
  requerido ni se imprime. Se elimina el campo `calificacion` (página 1) y
  `nota` (página 2) del PDF y de `$valores`. La guarda que exigía
  `nota > 0` se retira.
- **Plugin (`emisor.php`)**: la emisión deja de exigir nota ≥ mínima (la
  finalización del curso ya implica haber aprobado el examen). `nota()` se
  mantiene para compatibilidad pero ya no bloquea la emisión ni se pasa al
  endpoint.
- **Fichas para los 84 alumnos pendientes**: se marcan como completados con
  la fecha actual y se ejecuta la tarea de emisión para que se generen sus
  PDFs y fichas, iniciando las pruebas de emisión masiva.
- **Spec `emision-certificados`**: se actualiza para reflejar que `nota` ya
  no es parámetro ni campo del PDF.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `emision-certificados`: `nota` deja de ser parámetro opcional y campo
  imprimible del PDF; la composición ya no incluye "Calificación" ni la nota
  del sílabo.

## Impact

- Archivos afectados: `generar-certificado.php`, `emisor.php`, `assets/data/certificados.json` (84 nuevas fichas), `docs/aula-virtual.md`.
- Comportamiento: los certificados nuevos ya no muestran la nota. Los 28
  certificados históricos (Canva) siguen mostrando su nota impresa; no se
  reemiten.
- Despliegue: el generador cambia (md5 nuevo) y el plugin se redespliega.
- Supuesto (a confirmar en apply): la nota se elimina por completo del PDF
  (no se deja un campo vacío ni un placeholder). Los 84 alumnos se marcan
  completados con la fecha de hoy y se emiten con la tarea automática.