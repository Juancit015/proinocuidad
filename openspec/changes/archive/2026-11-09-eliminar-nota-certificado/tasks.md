# Tasks

## 1. Generador de certificados (sin nota)

- [x] 1.1 En `generar-certificado.php`, retirar `calificacion` de `$CAMPOS` y de `$valores` (pág. 1) y `nota` de `$CAMPOS` y de `$valores` (pág. 2); actualizar el comentario de la API (`nota` pasa a legacy, aceptado e ignorado).
- [x] 1.2 Retirar la guarda `if ($pNota === '' || floatval($pNota) <= 0)` y hacer `$pNota` opcional (default `''`); verificar que una llamada sin `nota` genera el PDF con 200/302.
- [x] 1.3 Verificar con una llamada de prueba (curl) que el PDF generado ya no contiene "Calificación" ni la nota, y que el QR y el resto de campos se mantienen.

## 2. Plugin (emisión sin nota)

- [x] 2.1 En `emisor.php`, eliminar el bloque que llama `nota()` y exige `nota >= nota_minima` (la emisión gatilla solo por `timecompleted > 0`).
- [x] 2.2 Dejar de pasar `nota` en los params del endpoint (quitar la clave `'nota' => ...` del array `$params`).
- [x] 2.3 Actualizar el mensaje de corrida en seco (quitar `nota {$nota}`).
- [x] 2.4 Conservar el método `nota()` para compatibilidad; documentar que ya no bloquea la emisión.
- [x] 2.5 Desplegar el plugin en el server y verificar md5 repo↔server.

## 3. Generación masiva de fichas (pruebas)

- [x] 3.1 Listar los 84 pares pendientes (DNI + curso) y verificar que ninguno tenga ficha ya (`existe()`).
- [x] 3.2 Marcar a los 84 alumnos como completados en Moodle con `timecompleted = now()` (CLI con PHP, sin tocar el gradebook).
- [x] 3.3 Ejecutar la tarea `emitir_pendientes` y verificar que se generan los 84 PDFs en `certificados/` y las 84 fichas en `certificados.json`.
- [x] 3.4 Verificar por muestra (5 PDFs) que no imprimen nota, que el QR apunta a la página y que la ficha aparece en `verifica-tu-certificado.html`.
- [x] 3.5 Verificar que los 28 certificados históricos siguen intactos (no se reemitieron ni se borraron).

## 4. Documentación

- [x] 4.1 Actualizar `docs/aula-virtual.md`: la nota deja de imprimirse, la emisión gatilla por finalización, y el eslabón 9 pasa a "en pruebas".
- [ ] 4.2 Commit, push y (si procede) deploy del generador y plugin.

## Workflow follow-up

- Archivar el change tras la verificación de las pruebas.
- Si las fechas reales llegan después, regenerar los 84 con fechas correctas.