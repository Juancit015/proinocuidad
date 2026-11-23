# Tasks

## 1. Flyer y datos del curso

- [x] 1.1 Generar `assets/img/flyer-curso-09-bpm-haccp-en-vivo.webp` (1080×1080, sidebar) y `assets/img/flyer-curso-09-bpm-haccp-en-vivo-card.webp` (1080×675, recorte 16:10 que llena el marco de la tarjeta) desde el JPEG de WhatsApp. Verificar con `identify` que las dimensiones son exactas y que cada archivo pesa menos de 250 KB.
- [x] 1.2 Añadir la cohorte a `window.PROINO_CURSOS` en `assets/js/cursos-data.js` con `modalidad: "En vivo (Zoom)"`, `fechas: "8, 9 y 10 de diciembre"`, `horario`, `inversionNacional` S/ 60 / `inversionExtranjero` US$ 17, `prontoPago` (S/ 45 / US$ 15 hasta el 4 de diciembre de 2026), `flyer` de tarjeta y `enHome: false`. Verificar con `node -e` que el array evalúa y devuelve 9 entradas con la modalidad correcta.
- [x] 1.3 Actualizar `STRUCTURE.md`: 9 fichas, 9 entradas en `cursos-data.js`, marcador `#lista-envivo`, nomenclatura `flyer-curso-09-*` y slug nuevo. Verificar que ninguna mención a «8 fichas» o «8 cursos» queda sin contexto (grep).

## 2. Listado de Cursos

- [x] 2.1 En `tools/generar-listados.mjs`, separar por modalidad: `#lista-cursos` solo con `Asíncrono*` y un bloque nuevo `#lista-envivo` con `En vivo*`, usando marcadores propios (`generar-listados-envivo:inicio/fin`). Verificar con `git diff` que las 8 tarjetas asíncronas quedan byte a byte iguales y que aparece exactamente 1 tarjeta en vivo.
- [x] 2.2 Ajustar `tarjetaCursos` para la cohorte en vivo: chip de fechas en lugar de «Curso N», línea de pronto pago y texto de certificación «opcional con QR». Verificar en el HTML generado que la tarjeta muestra fechas, S/ 60 (no incluye IGV) y el pronto pago.
- [x] 2.3 Implementar el estado vacío del panel «En vivo»: si no hay cohortes, el generador emite el bloque `.proximamente` con `grid-column: 1 / -1`. Verificar generando con una lista filtrada vacía en una copia temporal y restaurando después.
- [x] 2.4 Sustituir en `cursos/index.html` el `.proximamente` manual por `<div class="cards-grid" id="lista-envivo">` con los marcadores. Verificar que la pestaña «En vivo» muestra la tarjeta sin JavaScript y que «Asíncronos» sigue con 8.

## 3. Ficha generada

- [x] 3.1 Parametrizar `statsGrid` (`modalidadStat`, `certificacionStat`), `beneficiosBloque` (`beneficios[]`), `metodologiaBloque` (`metodologiaPasos[]`, `metodologiaNota`) y `jsonLdCurso` (`courseMode`) con valores por defecto iguales a los actuales. Verificar con `cp -r cursos /tmp/fichas-antes` + `node tools/generar-fichas.mjs` + `diff -rq /tmp/fichas-antes cursos` que las 8 fichas existentes no cambian.
- [x] 3.2 Añadir `sidebar`: bloque de fechas/horario, etiqueta «Curso en Vivo» y línea de pronto pago, todo condicional. Verificar que las 8 fichas siguen idénticas tras regenerar.
- [x] 3.3 Crear el objeto `EN_VIVO` con el contenido del Word (datos generales, objetivo, público, 3 módulos del temario, metodología en vivo, incluye, FAQ) y añadirlo a `FICHAS`. Verificar que se genera `cursos/bpm-haccp-en-vivo/index.html` y que el generador imprime 9 fichas con `exit 0`.
- [x] 3.4 Revisar la ficha generada: fechas 8–10 de diciembre, 7:30–10:00 PM, Zoom, 40 horas, S/ 60 / US$ 17 y pronto pago S/ 45 / US$ 15; certificado opcional sin costo; ausencia de «nota mínima» y «14 puntos»; formulario con el curso precargado. Verificar con grep y lectura del HTML.
- [x] 3.5 Validar el JSON-LD de la ficha nueva (bloque `Course` con `courseMode: "En vivo (Zoom)"`, 40 horas, ofertas 60/17) y confirmar que las 8 fichas conservan `courseMode: "Asíncrono (grabado)"`. Verificar con un parser JSON y `git diff` de las fichas.

## 4. SEO y asistentes de IA

- [x] 4.1 Añadir la URL `https://proinocuidad.com/cursos/bpm-haccp-en-vivo/` a `sitemap.xml` (22 entradas), a `llms.txt` (sección Cursos) y a `llms-full.txt` (sección nueva tras las 8 fichas). Verificar que los tres conjuntos de URLs coinciden y suman 22 páginas (`llms-full.txt` solo cubre las páginas con contenido, no la de verificación).
- [x] 4.2 Actualizar en `llms.txt` y `llms-full.txt` las frases que describen la oferta como solo asíncrona. Verificar que mencionan la cohorte en vivo y que ninguna URL nueva da 404 en el servidor local.

## 5. Verificación en navegador

- [x] 5.1 Levantar `python3 -m http.server 8899` y con Playwright (Chromium, 390 px y 1280 px) comprobar: pestaña «En vivo» con la tarjeta, clic en «Más información», ficha sin desbordamiento horizontal, botones y formulario visibles, y `getComputedStyle` de los bloques modificados. Verificar 0 excepciones en consola.
- [x] 5.2 Ejecutar `node tools/generar-fichas.mjs` y `node tools/generar-listados.mjs` dos veces y comprobar que la segunda pasada deja `git status` sin cambios (idempotencia) y que ambos comandos salen con código 0.
- [x] 5.3 Auditar la ficha nueva en 360, 390, 768, 860, 1024 y 1280 px (parte de la auditoría responsive de 21 páginas). Verificar `document.documentElement.scrollWidth <= window.innerWidth` en todos los anchos.

## 6. Cierre

- [x] 6.1 Añadir la entrada de `CHANGELOG.md` con el alta del curso en vivo, el listado y las especificaciones actualizadas. Verificar que la fecha y los datos de precio coinciden con la ficha publicada.
- [x] 6.2 Dejar dos commits separados (código del sitio y artefactos OpenSpec) y presentar el resultado local a Juan. Verificar `git status` limpio y no hacer push ni deploy sin autorización expresa.

## Workflow follow-up

- Publicar solo tras la revisión visual de Juan y su autorización separada de push y de deploy.
- Archivar el change cuando la implementación esté verificada y aprobada.
