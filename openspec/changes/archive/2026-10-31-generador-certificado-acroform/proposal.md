# Proposal

## Why

`generar-certificado.php` genera hoy el PDF superponiendo texto con `SetXY` sobre `PDF-PLANTILLA.pdf`, que tiene los datos de ejemplo horneados como texto pintado — el resultado se ve mal (superposiciones, código sobre la firma, "Powered by TCPDF") y depende de coordenadas mantenidas a mano. Juan re-trabajó el diseño en OnlyOffice y entregó `CERTIFICADO-EDITABLE.pdf`: la misma hoja de Canva con **15 campos de formulario AcroForm con nombre** — el llenado por código quedó probado localmente (pypdf) con render correcto en ambas páginas. Es el momento de mover el generador a esa plantilla: sin superposiciones, sin coordenadas de texto, con el diseño fiel.

## What Changes

- Reemplazar la plantilla de origen: `PDF-PLANTILLA.pdf` (texto pintado) → `CERTIFICADO-EDITABLE.pdf` (AcroForm, 2 páginas: certificado + sílabo).
- Reescribir el script para **llenar por nombre de campo**, no por coordenadas: página 1 (`nombre`, `programa`, `parrafo`, `calificacion`, `lugar_fecha`) y página 2 (`modulo1-3`, `contenido1-3`, `horas`, `creditos`, `nota`, `registro`).
- Agregar el **QR real** estampado por código en la **página 2 (sílabo)** — la posición la marcó Juan con un QR de ejemplo pintado en la plantilla (derecha del Módulo III, debajo de la caja REGISTRO; ~53×53 mm, medido sobre render) —, apuntando a `verifica-tu-certificado.html?codigo=`. El ejemplo queda en la plantilla y el script lo **reemplaza por completo** al estampar el QR del alumno (tapa blanca sobre su huella + stamp en ese rect).
- Mantener el **contrato de API actual**: mismos parámetros GET (`nombre`, `programa`, `fecha`, `horas`, `codigo`), misma respuesta (redirect al PDF) y misma salida en `certificados/<codigo>.pdf`; parámetros opcionales nuevos (`fecha_inicio`, `lugar`, `nota`, `creditos`) con valores por defecto sensatos.
- Configuración por programa para los módulos/contenidos del sílabo (página 2) como constantes del script — el sílabo listo proviene del curso BPM; el diplomado queda fuera de este change hasta que exista su plantilla editable.
- Corregido en el mismo paso: pie "Powered by TCPDF" fuera; el campo `registro` usa tamaño de fuente auto para no partir el código en dos líneas.

## Capabilities

### New Capabilities

- `emision-certificados`: emisión por código del PDF de certificado del alumno (P. 1 certificado + P. 2 sílabo) a partir de la plantilla AcroForm editable, con el QR de verificación estampado y el archivo publicado en `certificados/<codigo>.pdf`. Cubre el contrato de la URL pública del generador, el llenado por nombre de campo, el QR y la publicación del archivo.

### Modified Capabilities

<!-- Ninguna: `verificacion-certificado` no cambia; el QR alimenta exactamente la URL que ese spec ya atiende. -->

## Impact

- `generar-certificado.php` (raíz del sitio, fuera de la lista blanca de `publicar.sh`): reescritura completa del pipeline de render; el endpoint y su respuesta inicial se conservan.
- Nuevas librerías **fuera del docroot** en el servidor (`~/lib/pdf/`): FPDM (PHP puro, llenado+flatten de AcroForm) — provisional: el fork mantenido `x5qubits/fpdm`, probado contra `tmw/fpdm` original de Olivier Plathey; TCPDF+FPDI ya existen en `aula/lib` y `aula/mod/assign/.../fpdi` y se reutilizan sin copiar nada (alias `pdf` desde TCPDF como hoy).
- Plantilla `CERTIFICADO-EDITABLE.pdf (799 KB, PDF 1.4 clásico verificado sin ObjStm) vive fuera del docroot (`~/tmp/`); NO entra al repo ni al deploy — se sube a mano y queda documentado su md5.
- `certificados/` en el docroot (ya existe): el `/certificados/<codigo>.pdf` generado - riesgo: es una carpeta de escrituras dinámicas — se desenrolla por el propio endpoint con `mkdir` si falta.
- Sin cambios en `verifica-tu-certificado.html`, `certificados.json`, Moodle ni el sitio estático desplegado.
