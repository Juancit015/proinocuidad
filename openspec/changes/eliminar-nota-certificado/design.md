# Design

## Context

El generador `generar-certificado.php` dibuja `calificacion` (pág. 1) y `nota`
(pág. 2) a partir de `$pNota`, con guarda `nota > 0`. El plugin `emisor.php`
obtiene la nota del quiz (`nota()`) y bloquea la emisión si `nota < nota_minima`
(o `<= 0`). La ficha en `certificados.json` no guarda nota. Los 84 alumnos
pendientes no tienen nota ni fechas en el aula.

Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- El certificado nuevo ya no muestra la nota en ninguna página.
- El generador deja de exigir `nota`.
- La emisión ya no se bloquea por falta de nota (la finalización del curso
  implica aprobación).
- Generar fichas y certificados para los 84 pendientes con fecha actual.

**Non-Goals:**
- No se reemiten los 28 certificados históricos (Canva): siguen mostrando
  su nota, es histórico.
- No se toca el sistema de exámenes ni la escala (sigue siendo criterio de
  finalización).
- No se cambia la plantilla PDF (los campos `calificacion`/`nota` simplemente
  no se llenan; quedan vacíos en la plantilla, lo cual es aceptable porque
  la plantilla es la fuente visual).

## Decisions

**Decisión 1 — Eliminar los campos, no ocultarlos.**
Se retiran `calificacion` y `nota` de `$CAMPOS` y `$valores`. La plantilla
puede seguir teniendo los rects (no se edita el PDF); simplemente no se
dibujan. Alternativa descartada: dejarlos en `$CAMPOS` pero no pasar valor —
descartada porque el código quedaría con campos muertos y el guard
`isset($valores[...])` los saltaría igual; mejor limpiar.

**Decisión 2 — `nota` opcional en el generador.**
Se quita la guarda `nota > 0` y se documenta `nota` como parámetro legacy
(aceptado y ignorado). Así los endpoints antiguos que aún la envían no
rompen. Alternativa descartada: rechazar `nota` con 400 — descartada por
compatibilidad con reintentos/replays.

**Decisión 3 — La emisión gatilla solo por `timecompleted`.**
`emisor::emitir()` ya verifica `timecompleted > 0`. Se elimina el bloque que
llama `nota()` y exige `nota >= nota_minima`. La finalización del curso
(aprobar examen) ya garantiza la aprobación. Alternativa descartada: mantener
la guarda con un default de 20 — descartada porque escondería el problema y
la nota no se imprime de todos modos.

**Decisión 4 — `nota()` se conserva.**
Se deja el método (puede usarse en reportes futuros) pero ya no se invoca
en el flujo de emisión. Evita romper referencias externas.

**Decisión 5 — Fichas de los 84 con fecha actual.**
Se marcan como completados en Moodle con `timecompleted = now()` y se encola
la emisión. El generador usará la fecha actual como `fecha` (fin) y
`fecha - 7 días` como inicio (fallback por no tener fecha de inicio real).
Los PDFs quedarán con período "hoy-7 a hoy". Aceptable para pruebas; si
Juan quiere fechas reales, se ajustan después.

**Decisión 6 — Códigos correlativos.**
Los 84 recibirán códigos nuevos (`siguienteNumero()`). No colisionan con los
28 existentes porque `numerosUsados()` lee el JSON y los PDFs.

## Risks / Trade-offs

- [Riesgo] Los certificados de los 84 llevarán fecha actual y período de
  7 días, que no refleja cuándo cursaron. Mitigación: es para pruebas;
  se puede regenerar después con fechas reales si Juan las consigue.
- [Riesgo] La plantilla AcroForm sigue teniendo los rects `calificacion`/
  `nota` vacíos: el PDF mostrará un hueco en la zona de la nota. Mitigación:
  aceptable visualmente (la plantilla es la fuente visual); si molesta, Juan
  ajusta la plantilla Canva.
- [Riesgo] Al quitar la guarda de nota, cualquier alumno con `timecompleted`
  emitirá certificado. Como `timecompleted` solo se setea al aprobar el examen,
  no hay riesgo de emitir a no aprobados. Mitigación: verificado por el
  criterio de finalización ya configurado.
- [Trade-off] `nota_minima_default` deja de usarse en emisión pero se mantiene
  en config por compatibilidad.

## Migration Plan

1. Editar `generar-certificado.php` (quitar campos y guarda).
2. Editar `emisor.php` (quitar bloque de nota).
3. Desplegar generador (md5 nuevo) y plugin (md5 nuevo).
4. Marcar los 84 alumnos como completados en Moodle (CLI, con fecha actual).
5. Ejecutar la tarea `emitir_pendientes` y verificar PDFs/fichas/QR.

## Open Questions

- Ninguno. El cliente pidió expresamente quitar la nota y generar las fichas
  con la fecha actual.