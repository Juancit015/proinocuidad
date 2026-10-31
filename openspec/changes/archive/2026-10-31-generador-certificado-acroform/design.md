# Design

## Context

El llenado por código quedó **probado localmente con pypdf 6.21.4**: los 15 campos AcroForm de `CERTIFICADO-EDITABLE.pdf` se rellenan y el render muestra ambas páginas con el diseño Canva intacto. El servidor, en cambio, no tiene Python usable (solo 3.6.8 fuera de feed de pypdf 6) ni pdftk/qpdf/ghostscript; **PHP 8.3.36 con zip, gd y fileinfo**. El endpoint actual ya corre con TCPDF desde `aula/lib/tcpdf` (alias `pdf`) y FPDI desde `aula/mod/assign/feedback/editpdf/fpdi/`.

Datos de la plantilla medidos: ~789 KB (807 713 B), `%PDF-1.4`, xref clásico, **0 ObjStm** (rewritten por MuPDF al pasar por OnlyOffice), `NeedAppearances true` — el formato más compatible con FPDI Free. **Juan dejó un QR de ejemplo pintado en la página 2** (imagen raster 225×225 px, objeto 332, md5 nuevo de la plantilla `f89ccf40cee156b25e39541cb3f9c3d6`, deslindado: contenido del QR es un placeholder de YouTube, solo marca posición). Medición exacta sobre render a 110 dpi: módulos en **x 618–767 pt, y desde abajo 88–238 pt → ~150×150 pt (≈53 mm)**, con zona blanca la imagen ocupa ≈ x 614–772, y 84–242; en coordenadas TCPDF (origen arriba-izquierda) ≈ **x 618, y 366, 150×150**. La caja REGISTRO termina en y=308 pt desde abajo — el ejemplo no la toca.

## Goals / Non-Goals

**Goals:**
- Pipeline PHP puro en el server: llenar AcroForm → aplanar (flatten) → estampar QR → publicar en `certificados/`.
- Sin coordenadas de texto: los campos existen en la plantilla; el código solo nombra.
- Contrato público conservado (misma URL, mismos parámetros, redirect igual).

**Non-Goals:**
- Plantilla del diplomado (240 h, 8 módulos) — requiere su propio editable; este pipeline lo deja en espera.
- Aplanar el PDF **final**: los campos permanecen como AcroForm; el flatten es solo el paso intermedio para que FPDI pueda estampar el QR sin tocar el AcroForm.
- Extraer/elegir el destinatario desde Moodle: la emisión sigue siendo llamada por el operador con los datos del alumno hasta que la integración con Moodle se piense aparte.

## Decisions

1. **Todo en PHP** (no server-python). Python 3.6.8 del server no sirve para pypdf 6 y compilar nada en CloudLinux es peor camino; PHP 8.3 ya corre el endpoint.
2. **FPDM DESCARTADO durante el apply.** El fork `tmw/fpdm` (y `x5qubits`) apana solo vía `pdftk` (ausente en el server): `Flatten()` fija `support='pdftk'`; en modo `native` FPDM solo actualiza `/V`, y como FPDI no arrastra anotaciones al importar, los valores no aparecen. Verificado además que el template de Descargas trae 2 secciones xref (actualización incremental de OnlyOffice) que estos parsers no tragan: la plantilla se renormalizó una vez con pypdf (15 campos y NeedAppearances intactos, 0 ObjStm, md5 `1438241f691bf4dc6154bc475fbbc729`. La lib quedó instalada en `~/lib/pdf/fpdm-tmw/` (con 3 parches `{}`→`[]`) pero el pipeline NO la usa. **La firma que se quedó: llenado por los rects del AcroForm.** TCPDF+FPDI importan el contenido (sin campos) y los 15 valores se dibujan dentro de los rects que cada campo del AcroForm define por nombre (tabla `CAMPOS` del script: rect/alineación/color/tamaño-autofit por campo, calibrada sobre el render aprobado por Juan). Los rects son datos de la plantilla congelados por el md5: si la plantilla cambia, el md5 falla y la emisión se detiene hasta re-verificarlos — no hay coordenadas dibujadas a ojo.
3. **QR en la misma pasada de composición con TCPDF+FPDI** (no hace falta segunda pasada: stamp cerca del dibujo de campos): FPDI importa la página 2 del contenido limpio, `Rect` blanco (`F`) tapa la huella completa del ejemplo y `write2DBarcode` dibuja el QR real en el rect medido. Riesgo FPDI Free resuelto por el camino: la plantilla renormalizada es PDF clásico (0 ObjStm) y FPDI la importa sin drama. Los campos van DESPUÉS en el mismo documento: si un campo tocara la zona del QR (hoy no lo hacen), el orden define quién gana.
4. **QR como vector TCPDF** (`QRCODE,H`), no como imagen: sin archivo intermedio, análogo a lo ya funcionando hoy. **El QR de ejemplo de Juan se queda en la plantilla** (decisión de Juan: es solo de posición y el script lo reemplaza): antes de estampar, el script dibuja un rectángulo blanco (`Rect` con fondo sólido) sobre la huella completa de la imagen del ejemplo (≈ x 612–772, y desde abajo 84–242 pt) y encima `write2DBarcode` con estilo de fondo blanco en el rect medido — así el PDF de cada alumno muestra ÚNICAMENTE el QR real; el md5 `PLANTILLA_MD5` registrado corresponde a este fichero de la plantilla (`f89ccf40cee156b25e39541cb3f9c3d6`). La verificación de render debe comprobar que no queda ningún resto del ejemplo asomando por los bordes.
5. **`registro` con tamaño de fuente auto** (`0 Tf` en DA) para que el código no parta en dos líneas; FPDM escribe DA a su manera, si no lo permite se corrige el DA de la plantilla una única vez (OnlyOffice o parche del script) y se vuelve a exportar — tarea a verificación con render.
6. **API + defaults:** los parámetros opcionales son `fecha_inicio` (default: 7 días antes de `fecha`), `lugar` (default `Trujillo`), `nota` (default: no se emite certificado para nota 0 — error 422), `creditos` (default `2`). `calificacion` se arma como `Calificación: {nota}`. El `parrafo` se compone de lugar/empresa + fechas + horas con el mismo texto que la plantilla trae en el valor por defecto (fuente única de verdad = constante del script).
7. **Configuración por programa** en un mapa constante del script (código del programa → módulos/contenidos de la página 2). El curso BPM/HACCP entra como único registro inicial, tomado letra por letra del PDF llenado de prueba; los demás programas se agregan a medida que llegue su sílabo confirmado.

## Risks / Trade-offs

- [FPDM no sirve para aplanar] → Constatado en la tarea 2 (sin pdftk en el server); pivot documentado en la decisión 2: rects del AcroForm + dibujo TCPDF. La plantilla renormalizada (xref único) es requisito del nuevo pipeline (los parsers de la marca rechazan el incremental).
- [FPDI Free falla al importar] → Riesgo despejado en la verificación: la plantilla renormalizada (0 ObjStm, xref clásico) se importa sin drama; el render de la tarea 3.1 lo prueba.
- [El template de 799 KB hereda el peso al output por certificado (2 páginas, QR incluido)] → PDF final estimado ~0.8–1 MB por alumno, descargado por enlace/compartido: dentro del orden actual (el TEST-FINAL anterior era ~518 KB con plantilla vieja). No es problema de correo (no se manda por email).
- [Campo `registro` chico parte el código en dos líneas] → Decisión 5: tamaño de fuente auto en el DA, verificado por render de un código largo real (`015-2026-11-PAG-CIABPPH`).
- [El docroot gana un PDF público por cada `codigo` emitido] → `certificados/` ya existe con esa semántica; el QR es el mecanismo de verificación pública, no una fuga.

## Migration Plan

1. Plantilla renormalizada a xref único (`~/tmp/CERTIFICADO-EDITABLE.pdf`, md5 `1438241f...`) + librería FPDM queda instalada y sin uso en `~/lib/pdf/fpdm-tmw/` (documenta el intento). La renormalización la mantiene la copia local `/tmp/opencode/CERTIFICADO-EDITABLE-NORM.pdf` (volátil: si hay que regenerarla, pypdf `append` + comparación de 15 campos y NeedAppearances).
2. Script reescrito en repo; probado en el server por CLI (php runner con $_GET, sin tocar el endpoint en producción) y por render local con poppler + ZXing; los PDFs de prueba se borraron del docroot.
3. Coordenadas del QR calibradas sobre el render aprobado; commit + push + deploy del endpoint por el flujo usual (server y repo idénticos, md5).
4. Rollback: el script anterior se conserva en el histórico de git del repo; el server vuelve con `git restore` al snapshot previo si hiciera falta.

## Open Questions

Ninguna bloqueante: la posición del QR quedó aprobada (la huella del ejemplo), el mapa de programas arranca solo con el curso BPM/HACCP y queda la 422 para programas sin sílabo. La frase del detalle de tamaño de fuente de `registro` (una línea a ~8 pt vs dos líneas a 10.5 pt del ejemplo) queda a la vista de Juan en la captura del certificado largo.
