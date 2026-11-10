# Tasks

## 1. Plantilla (edición en Canva, ya hecha por Juan)

- [x] 1.1 Verificar que la plantilla nueva (`CERTIFICADO-EDITABLE-3paginas-v2.pdf`) tiene los campos AcroForm esperados y no contiene "CALIFICACIÓN" ni "nota".
- [x] 1.2 Subir la plantilla al server reemplazando `/home/guanbhctsy/tmp/CERTIFICADO-EDITABLE-3P.pdf` y verificar md5 (`e05f0dc0be180fcdbab53ab1dcf6f04c`).
- [x] 1.3 Actualizar `$PLANTILLA_MD5` en `generar-certificado.php` con el nuevo md5.
- [x] 1.4 Desplegar el generador y verificar md5 repo↔server.

## 2. Verificación del generador

- [x] 2.1 Generar un PDF de prueba y verificar (pdftotext) que no contiene "CALIFICACIÓN" ni "nota", y que el QR y el resto de campos se mantienen.
- [x] 2.2 Limpiar el PDF de prueba del server.

## 3. Regeneración de los 83 certificados

- [x] 3.1 Borrar los 83 PDFs nuevos (códigos 016..098) del directorio `certificados/` en el server.
- [x] 3.2 Reencolar los 83 pares en `local_certificados_cola` con `timecompleted = now()` (o reutilizar los pendientes si quedan).
- [x] 3.3 Ejecutar la tarea `emitir_pendientes` hasta que no queden pendientes.
- [x] 3.4 Verificar por muestra (5 PDFs) que no aparece "CALIFICACIÓN" ni la caja, y que el QR y el registro se mantienen.
- [x] 3.5 Verificar que los 28 certificados históricos siguen intactos.

## 4. Documentación y cierre

- [x] 4.1 Actualizar `docs/aula-virtual.md` con la nueva plantilla.
- [x] 4.2 Commit, push y (si procede) deploy del generador.

## Workflow follow-up

- Archivar el change tras la verificación visual.
- Si la plantilla se edita después en Canva, actualizar el md5.