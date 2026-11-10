# Design

## Context

Tras retirar la nota, el PDF seguía mostrando la etiqueta "CALIFICACIÓN" de la
plantilla (texto fijo del AcroForm) con una caja vacía. Juan editó la plantilla
en Canva y eliminó la etiqueta (y la nota), exportando
`CERTIFICADO-EDITABLE-3paginas-v2.pdf` (md5 `e05f0dc0be180fcdbab53ab1dcf6f04c`).
La plantilla nueva ya no tiene los campos `calificacion`/`nota` ni el texto
"CALIFICACIÓN". Se sube al server reemplazando la anterior y se actualiza
`$PLANTILLA_MD5` en el generador.

Ver proposal.md.

## Goals / Non-Goals

**Goals:**
- El certificado generado ya no muestra la etiqueta "CALIFICACIÓN" ni su caja.
- Regenerar los 83 certificados emitidos para que reflejen el cambio.

**Non-Goals:**
- No se edita el código del generador más allá del md5 (la tapa blanca ya no
  es necesaria).
- No se tocan los 28 certificados históricos (Canva).
- No se cambian otros campos ni el layout.

## Decisions

**Decisión 1 — Editar la plantilla en Canva (no tapa blanca).**
Juan editó la plantilla y eliminó la etiqueta "CALIFICACIÓN" (y la nota) del
diseño. La plantilla nueva ya no tiene los campos `calificacion`/`nota` ni
el texto. Se sube al server reemplazando la anterior y se actualiza
`$PLANTILLA_MD5`. Alternativa descartada: tapa blanca por código — descartada
porque la edición de la plantilla es más limpia y elimina el texto del stream
del PDF.

**Decisión 2 — Verificar la plantilla antes de desplegar.**
La plantilla nueva se verifica (campos AcroForm presentes, sin "CALIFICACIÓN")
antes de actualizar el md5 y regenerar. Si falta algún campo, se aborta.

**Decisión 3 — Regenerar solo los 83 nuevos.**
Los 28 históricos (Canva) no se tocan. Los 83 se regeneran borrando los PDFs,
reencolando y ejecutando la tarea.

## Risks / Trade-offs

- [Riesgo] La plantilla nueva podría tener campos distintos o faltar alguno.
  Mitigación: verificar con extracción de campos (AcroForm) antes de desplegar.
- [Riesgo] El md5 nuevo no coincide si la exportación de Canva cambió algo
  más. Mitigación: verificar md5 tras subir y probar generación antes de
  regenerar los 83.
- [Trade-off] Se depende de Juan para editar la plantilla en Canva (hecho).

## Migration Plan

1. Subir la plantilla nueva al server (reemplazar la anterior).
2. Actualizar `$PLANTILLA_MD5` en `generar-certificado.php` con el nuevo md5.
3. Desplegar el generador.
4. Generar un PDF de prueba y verificar que no contiene "CALIFICACIÓN".
5. Borrar los 83 PDFs nuevos, reencolar los 83, ejecutar la tarea.
6. Verificar 5 PDFs por muestra.

## Open Questions

- Ninguno. Juan ya editó la plantilla.