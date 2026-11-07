# Plugin `local_certificados` (aula)

Emisión automática de certificados al completar un curso del aula. Este
directorio es el **mirror** de `/aula/local/certificados/` en el server: se
edita aquí y se sube por MCP con `git_snapshot` previo, verificando `md5sum`
por fichero. **No entra en la lista blanca de `tools/publicar.sh`.**

## Qué hace

1. `course_completed` → `classes/observer.php` **solo encola** en
   `local_certificados_cola` (idempotente por curso+alumno).
2. La tarea programada `emitir_pendientes` (cada 5 min) procesa la cola:
   - busca el mapeo del curso en los ajustes del plugin;
   - toma la nota (examen mapeado o total del curso) y exige `nota_minima`;
   - calcula el código `NNN-AAAA-MM-INI-SUFIJO`;
   - llama al endpoint público `generar-certificado.php` por HTTPS;
   - si el endpoint responde 302 y deja el PDF, agrega la ficha en
     `assets/data/certificados.json` (escritura atómica con `flock` + `rename`).
3. `mio.php?course=<id>` es la URL que ve el alumno: exige sesión y curso
   completado, busca su ficha y redirige al PDF.

## Estados de la cola

| Estado | Cuándo | Reintenta |
|---|---|---|
| `pendiente` | recién encolado / falla transitoria | sí (máx. 3) |
| `emitida` | PDF + ficha creados | no |
| `saltada` | sin mapeo, sin nota, sin fecha, endpoint 400/422, código usado | no (decisión del operador) |
| `fallada` | HTTP caído, JSON no escribible, 3 intentos agotados | no |
| `duplicado` | ya existe ficha para persona + programa | no |

## Ajustes

- `mapeo_cursos`: JSON con `courseid`, `programa` (nombre **exacto** que espera
  el endpoint), `horas`, `creditos`, `sufijo`, `nota_minima`, `gradecmid`
  (`0` = nota total del curso; si no, id del `course_modules` del examen).
- `nota_minima_default`, `modo_seco`, `endpoint_url`, `rutasitio`.

## Requisito de contenido

El endpoint solo compone la página 2 (sílabo) para los programas registrados
en su array `$PROGRAMAS`. Hoy existe **uno**: BPM + HACCP (`CIABPPH`). Un
curso mapeado a un programa sin sílabo responde 422 y la cola lo marca
`saltada` con el motivo; no se emite un certificado con sílabo ajeno.

## Deploy

```bash
# en el server, antes de tocar nada
# (MCP) git_snapshot del dominio
rsync -a tools/aula-plugin-certificados/ server:~/proinocuidad.com/aula/local/certificados/
/opt/alt/php83/usr/bin/php admin/cli/upgrade.php   # crea la tabla
```

Verificar `md5sum` repo↔server de cada `.php` y que `/aula/login` siga en 200.
