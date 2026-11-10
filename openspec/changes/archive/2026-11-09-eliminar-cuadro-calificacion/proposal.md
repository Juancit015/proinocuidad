# Proposal

## Why

Tras retirar la nota del certificado, el PDF sigue mostrando la etiqueta
"CALIFICACIÓN" de la plantilla con una caja vacía debajo, porque esa etiqueta
es texto fijo del diseño (AcroForm) y el código solo dejó de llenar el valor.
Visualmente queda un hueco con etiqueta que parece un error. El dueño del
proyecto quiere que esa caja desaparezca por completo y que se regeneren los
certificados afectados.

## What Changes

- Juan editó la plantilla en Canva y eliminó la etiqueta "CALIFICACIÓN" (y
  la nota), exportando `CERTIFICADO-EDITABLE-3paginas-v2.pdf`. La plantilla
  nueva ya no tiene los campos `calificacion`/`nota` ni el texto.
- Se sube la plantilla al server reemplazando la anterior y se actualiza el
  md5 en el generador.
- Se regeneran los 83 certificados emitidos en la fase anterior (códigos
  016..098) para que dejen de mostrar la etiqueta.
- La plantilla es la fuente visual; no se toca el código del generador más
  allá del md5. Los 28 certificados históricos (Canva) no se ven afectados.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `emision-certificados`: el certificado generado ya no muestra la etiqueta
  "CALIFICACIÓN" ni su caja en la página 2.

## Impact

- Archivos afectados: `generar-certificado.php` (actualizar `$PLANTILLA_MD5`),
  plantilla en el server (`/home/guanbhctsy/tmp/CERTIFICADO-EDITABLE-3P.pdf`).
- Los 83 PDFs de la fase anterior se regeneran (códigos 016..098) con la
  plantilla nueva; los 28 históricos no cambian.
- El md5 de la plantilla cambia a `e05f0dc0be180fcdbab53ab1dcf6f04c`.
- Despliegue: generador con md5 nuevo (solo constante; sin otros cambios).