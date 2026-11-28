# Proposal

## Why

El período impreso en el certificado es de una semana: la fecha de inicio se
calcula restando 7 días a la fecha de completado. Para los cursos de 40 horas
eso es plausible, pero en el diplomado de 384 horas académicas y 24 créditos
el documento queda incoherente: `104-2026-11-JPP-SGCIA.pdf` dice «en el
período del 20 al 27 de noviembre del 2026, con una duración de 384 horas
académicas», es decir 48 horas por día. Juan lo detectó en el PDF y pidió que
el período sea de un mes.

El dato de horas no se toca: 384 h es lo que corresponde a 24 créditos y es lo
que dice el sílabo. Lo que se corrige es el período.

## What Changes

- El default de `fecha_inicio` pasa de 7 días a un mes antes de `fecha`, tanto
  en el generador (`generar-certificado.php`) como en el plugin de emisión
  automática (`classes/emisor.php`), que lo calcula por su cuenta y lo pasa
  como parámetro.
- El cálculo del mes se hace con día recortado al último del mes destino, no
  con `strtotime('-1 month')`: ese desborda (31 de marzo menos un mes da el 3
  de marzo, no el 28 de febrero) y el período saldría con 28 días y un mes
  equivocado.
- La spec `emision-certificados` deja de decir «7 días» y pasa a decir «un
  mes», incluido el escenario de cálculo automático.

## Capabilities

### Modified Capabilities

- `emision-certificados`: el default de `fecha_inicio` es un mes antes de
  `fecha`, con el día recortado al último del mes destino.

## Impact

- `generar-certificado.php`: nueva función `un_mes_antes()` y uso en el
  default de `$tsIni`.
- `tools/aula-plugin-certificados/classes/emisor.php`: método
  `unMesAntes()` y uso en el default de `$fechaIni`.
- Sin cambios de plantilla, de API ni de parámetros: `fecha_inicio` sigue
  mandando cuando se envía explícito.
- Los certificados ya emitidos no se regeneran: conservan el período con el
  que se entregaron.
