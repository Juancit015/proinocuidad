# Design

## Contexto

El período del certificado no se guarda en ningún sitio: se deriva al generar
el PDF. Hay dos puntos que lo calculan y los dos tienen que coincidir, porque
el plugin pasa `fecha_inicio` como parámetro y el generador solo aplica su
default cuando ese parámetro llega vacío.

- `generar-certificado.php`: `strtotime('-7 days', $tsFin)`.
- `tools/aula-plugin-certificados/classes/emisor.php`:
  `strtotime('-7 days', $timecompleted)`.

Cambiar solo uno no cambia nada en la práctica: el plugin siempre manda el
valor, así que el default del generador queda como red de seguridad para
llamadas manuales a la URL.

## Decisión

Un mes antes, con el día recortado al último del mes destino.

```php
$mAnt = $m - 1; $yAnt = $y;
if ($mAnt < 1) { $mAnt = 12; $yAnt--; }
$ultimo = (int)date('t', mktime(12, 0, 0, $mAnt, 1, $yAnt));
$tsIni = mktime(12, 0, 0, $mAnt, min($d, $ultimo), $yAnt);
```

### Por qué no `strtotime('-1 month')`

PHP normaliza los días fuera de rango en vez de recortarlos:

| Fecha | `-1 month` de PHP | Esperado |
|---|---|---|
| 2026-11-27 | 2026-10-27 | 2026-10-27 |
| 2026-03-31 | **2026-03-03** | 2026-02-28 |
| 2026-05-31 | **2026-05-01** | 2026-04-30 |

En los dos casos el resultado cae en el mismo mes que la fecha de fin: el
período impreso diría «del 3 al 31 de marzo», que son 28 días, y el párrafo
del certificado quedaría mal por una razón distinta a la que se está
arreglando. `-30 days` sí es predecible, pero imprime «del 28 de octubre al 27
de noviembre», que no es lo que pidió Juan.

Con el recorte, 31 de marzo va al 28 de febrero y 31 de mayo al 30 de abril.

## Consecuencias

- El período de un certificado nuevo es de 31 días para casi todas las fechas,
  y de 28/29/30 cuando el día de fin no existe en el mes anterior. En ningún
  caso cae en el mismo mes.
- Un curso de 40 horas queda con el mismo período de un mes que el diplomado.
  Es coherente entre certificados, que es lo que se busca; el período no
  pretende reflejar la duración real de la matrícula, que no se registra.
- Los PDF ya emitidos no cambian: se generan una vez y se publican. Si se
  regenerara uno, saldría con el período nuevo y el mismo código de registro.
- Se conserva la posibilidad de fijar el período a mano por curso con
  `fecha_inicio` en el mapeo; eso sigue mandando sobre el default.
