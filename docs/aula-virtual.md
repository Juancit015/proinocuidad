# Aula virtual (Moodle) — documentación de trabajo

Documento dedicado al **aula virtual**. El `CHANGELOG.md` es del sitio
(`proinocuidad.com`); el aula se documenta aquí.

- **Instancia:** Moodle 4.5.15+ LTS, en `https://proinocuidad.com/aula/`
- **Código:** `/home/guanbhctsy/proinocuidad.com/aula/` (no está en el repo,
  no entra en `tools/publicar.sh`)
- **Datos:** `/home/guanbhctsy/moodledata/`
- **BD:** MariaDB 11.4, base `guanbhctsy_moodle`
- **PHP del dominio:** 8.3, binario `/opt/alt/php83/usr/bin/php`
- **Última medición:** 2026-11-06

Este documento se actualiza **al cerrar cada eslabón**, no al empezar.

---

## 1. Estado general

| Dato | Valor medido |
|---|---|
| Cursos | 10 (ids 2–11) |
| Alumnos | 50 (más la cuenta de invitado y la de administración) |
| Páginas de contenido | 43 |
| Exámenes (quiz) | 11 |
| Cursos con emisión automática | 9 (el 3 no emite todavía) |
| Cursos completados | 0 |

### Los 10 cursos

| id | Curso | Páginas | Quizzes |
|---|---|---|---|
| 2 | BPM y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009 | 4 | 1 |
| 3 | Buenas Prácticas de Manufactura según el Codex Alimentarius | 3 | 1 |
| 4 | Implementación y Auditoría de BPM, Higiene y Saneamiento, POES, POE, PLAN HACCP | 5 | 1 |
| 5 | HACCP Implementación y Certificación en Perú (DIGESA/SENASA) | 4 | 1 |
| 6 | Implementación y Auditoría de las BPM, Higiene y Saneamiento, BPM, POES, POE, PLAN HACCP | 4 | 1 |
| 7 | Diplomado: Gestión de la Calidad e Inocuidad en la Industria Alimentaria | 7 | 2 |
| 8 | Legislación Sanitaria de Alimentos Nacional e Internacional | 4 | 1 |
| 9 | Programas de Higiene y Saneamiento en la Industria Alimentaria | 4 | 1 |
| 10 | Sistema HACCP según FSSC 22000 y Codex Alimentarius | 4 | 1 |
| 11 | Formación de Auditor Interno del Sistema HACCP | 4 | 1 |

Los cursos 4 y 6 son **productos distintos** (grupos de 20 y 5 alumnos), no un
duplicado.

---

## 2. Los 7 eslabones

### Eslabón 1 — Limpieza del aula ✅ cerrado

- Borrados los `course_modules` 12 y 13 y un quiz huérfano.
- Reparados los `quiz_slots` y el `sumgrades` de los exámenes afectados.
- Roto el **bloqueo circular** Parcial ↔ Final del curso 7 (cada uno esperaba
  al otro, ninguno era alcanzable).

### Eslabón 2 — Exámenes nativos ✅ cerrado

- 11 exámenes nativos de Moodle (se abandonaron los Google Forms).
- Quiz del curso 3 creado y corregido.
- Verificado: 4–5 opciones por pregunta, exactamente 1 correcta.

**Deuda conocida:** los distractores son genéricos y se repiten entre
exámenes. Las opciones reales solo existen en los Google Forms originales.

### Eslabón 3 — Contenido ✅ cerrado

- 43 páginas creadas en los 10 cursos, una por sesión/módulo.
- **Solo enlaces de Drive**: no se descargó ni subió material a Moodle.
- Estructura uniforme: `SESIÓN/MÓDULO → MATERIAL COMPLEMENTARIO → EXAMEN`.
- Cada página lleva botones: *Ver sesión · Diapositivas · Taller de clase*.
- Enlaces de Drive verificados uno por uno.
- Secciones vacías ocultas; `url` duplicado (cm 19, curso 7) oculto.
- Curso 3 reconstruido con los enlaces nuevos de Juan.
- Curso 7: corregido un bug del generador (cortaba por `h2`); 6 páginas de
  módulo, módulo 1 con 2 botones y los demás con 3.
- Se omitieron los Google Forms "CERTIFÍCATE AQUÍ": los reemplaza el examen
  nativo.

**Decisión del cliente:** los enlaces de Drive son privados; solo el correo
del alumno matriculado puede abrirlos.

### Eslabón 4 — Desbloqueo progresivo ✅ cerrado

- Cada examen se desbloquea al completar **todas** las páginas de
  sesión/módulo de su curso.
- Curso 7: el **Parcial** se abre tras los 6 módulos; el **Final** se abre al
  aprobar el Parcial.
- Condición usada: `{"op":"&","c":[{"type":"completion","cm":<id>,"e":1}],"showc":[true]}`
- Verificado con 0 errores.

### Eslabón 5 — Escala y reglas ✅ cerrado

Los 11 exámenes quedaron con:

| Ajuste | Valor |
|---|---|
| Nota máxima | 20 |
| Aprobado | 14 |
| Intentos | ilimitados (`attempts=0`) |
| Calificación | nota más alta (`grademethod=1`) |
| Finalización | aprobar la nota (`completionpassgrade=1`) |
| Finalización por ver | no (`completionview=0`) |

Los cursos son **independientes**: completar uno emite su ficha y nada más.
No se combinan cursos ni se suman notas entre cursos.

### Eslabón 6 — Certificado automático ✅ cerrado (2026-11-06)

**Desplegado y probado de punta a punta.** El mirror del repo
(`tools/aula-plugin-certificados/`) y `/aula/local/certificados/` tienen md5
idénticos.

- Plugin `local_certificados` (15 archivos). Flujo: `course_completed` → encola
  → tarea cada 5 min → calcula el código `NNN-AAAA-MM-INI-SUFIJO` → llama a
  `generar-certificado.php` → si hay PDF, agrega la ficha a
  `assets/data/certificados.json` (escritura atómica).
- `mio.php?course=N`: URL por curso para que el alumno descargue; exige sesión
  y curso completado.
- Estados con motivo: `pendiente`, `emitida`, `saltada`, `duplicado`,
  `fallada` (3 reintentos).
- **Mapeo configurado**: 9 cursos (el 3 no emite). Horas 40 / 384, créditos
  2 / 24. `nota_minima_default=14`, `modo_seco=0`.
- **Botón "Descargar certificado"** (`mod_url`, abre en ventana nueva) en la
  sección del examen de los 9 cursos, apuntando a `mio.php?course=N`.
- **Criterio de finalización de curso**: "aprobar el examen" (criterio de
  actividad sobre el quiz, con `gradepass=14`). Sin ese criterio los cursos no
  se completaban nunca y el observer no se disparaba jamás.

md5 desplegados el 2026-11-06: generador
`9c9eaa231ddec16c3c0e97abba0286b6`, `classes/emisor.php`
`0f9c9b0c153a568b7da9c215a4b75f7d`, `classes/fichas.php`
`3455eaa0333330f0c2b38ca49720b9d7`. La auditoría del 2026-11-07 cambió
esos md5; ver el eslabón 8.

**La página 2 del PDF (resuelto):**

La plantilla del certificado tiene 2 páginas. La página 2 tiene 11 campos:

| Campo | Origen | ¿Bloquea? |
|---|---|---|
| `horas` | mapeo del curso | no |
| `creditos` | mapeo del curso | no |
| `nota` | nota del examen en Moodle | no |
| `registro` | código calculado | no |
| QR | se dibuja con el código | no |
| `modulo1..3` | texto del curso | **sí** |
| `contenido1..3` | viñetas del curso | **sí** |

El endpoint (`generar-certificado.php`) tenía sílabo solo para **BPM + HACCP**.
El 2026-11-06 se cargaron los **9 sílabos** (cursos 2, 4/6, 5, 7, 8, 9, 10, 11)
en `$PROGRAMAS`, con los textos de `docs/silabos-certificado.md`. El curso 3
sigue sin sílabo: no emite hasta que se defina su temario. Cuando Juan traiga
la ficha del curso 3, se abre un **change de OpenSpec** con el temario y se
agrega a `$PROGRAMAS` como una entrada más.

**Desplegado el 2026-11-06** (md5 `9c9eaa23…`, idéntico al repo). Backup del
generador anterior y del plugin en `~/backups/deploy-sufijo-20261106-2044/`.

El diplomado (curso 7) exige además tapar la línea fija de la plantilla:
la plantilla trae grabada "CURSO ESPECIALIZADO" y el generador la cubre con
un rectángulo blanco y redibuja "DIPLOMADO ESPECIALIZADO" (Times Bold 27,
#091172) antes de escribir los campos. El sílabo del diplomado se elige por
los tokens `GESTION` + `CALIDAD` + `INOCUIDAD`.

Dos fallos que la prueba de los 9 cursos destapó y quedaron corregidos:

1. La normalización quitaba tildes **antes** de pasar a mayúsculas, así que
   "Legislación" quedaba `LEGISLACIÓ N` y el curso 8 respondía 422.
2. Los cursos de 2 módulos reventaban con 500 porque se dibujaba el módulo III
   inexistente. Ahora solo se dibujan los campos que el programa tenga.

**Fuente del texto:** sección "Plan de Estudios Modular" de cada página de
curso del sitio (`cursos/<slug>/index.html`). Se transcribe y resume; Juan lo
aprueba antes de cargarlo.

**Límite de la plantilla:** la página 2 tiene 3 huecos. Para cursos con más
módulos se agregó una **página 3** (misma tabla, sin QR ni panel), con los
campos `modulo4-6` / `contenido4-6`. Plantilla:
`~/tmp/CERTIFICADO-EDITABLE-3P.pdf` (md5 `3321ad84b2b92d48de08bad1b2132e4b`).

| Curso | Módulos | Reverso |
|---|---|---|
| 2, 3, 5, 6, 8, 9, 10, 11 | 2–3 | página 2 |
| 4 | 3 (4 sesiones) | página 2 |
| 7 (diplomado) | 6 | páginas 2 y 3 |

### Eslabón 7 — Testeo de punta a punta ✅ cerrado (2026-11-06)

Hecho con el usuario `pruebaautomatica` (borrado al terminar), matriculado en
el curso 2:

1. Nota 16 en el examen → actividad completada.
2. Criterio de curso → `timecompleted` y evento `course_completed`.
3. Cola: fila `pendiente`; tarea → `emitida`.
4. PDF `016-2026-11-PAF-BPMISO.pdf` (2 páginas): 40 h, 2 créditos, nota 16.00,
   registro completo, fechas 30/10 → 06/11/2026.
5. Ficha agregada a `certificados.json` con DNI `99999999`.
6. `mio.php?course=2` con sesión del alumno → 302 al PDF (200).
7. QR decodificado con OpenCV:
   `https://proinocuidad.com/verifica-tu-certificado.html?codigo=016-2026-11-PAF-BPMISO`.
8. La página de verificación encuentra la ficha por código, por DNI y por
   nombre (Playwright sobre el sitio en vivo).

Los artefactos de la prueba (PDF, ficha y usuario) se borraron al terminar.
La muestra quedó en `~/Descargas/certificados-prueba/016-2026-11-PAF-BPMISO.pdf`.

### Eslabón 8 — Auditoría de la entrega ✅ cerrado (2026-11-07)

Cuatro auditorías en paralelo con subagentes `opencode/beam-free#high`
(generador, plugin, coherencia de datos y sitio en vivo), orquestadas por el
agente principal. Todo lo que reportaron se verificó antes de tocarlo; los
falsos positivos se descartaron (por ejemplo, el sitemap y `llms.txt` sí
coinciden en 21 URLs, y los 9 programas caen en el sílabo correcto).

**Generador** (`generar-certificado.php`):

- Un parámetro repetido (`?nombre[]=x`) mataba `trim()` sin devolver JSON;
  ahora se exige escalar y se limita la longitud (nombre 120, programa 300…).
- `fecha_inicio` solo se validaba con regex: `2026-13-40` pasaba y `mktime`
  la convertía en otra fecha. Ahora se comprueba con `checkdate()`.
- Un mes fuera de rango devolvía `null` dentro del párrafo; `mes_es()` tiene
  guarda.
- Una palabra más ancha que el rect no se partía nunca; ahora se corta por
  caracteres.
- `require_once` de TCPDF/FPDI sin comprobar el archivo: ahora `is_file()` y
  500 con log.
- **El PDF ya no se sobrescribe**: si el código existe, responde **409**.
  Se escribe a un temporal y se publica con `rename` atómico. La guarda se
  evalúa **antes de componer** y va bajo un `flock` sobre
  `certificados/.lock` que se mantiene hasta el `rename`: dos peticiones
  simultáneas con el mismo código dan una 302 y una 409, nunca dos PDFs.

**Plugin** (`local_certificados`):

- `fichas::normalizar()` no quitaba tildes precompuestas (`Díaz` → `díaz`),
  mientras la página usa NFD. Toda ficha nueva con acentos era invisible al
  buscar por nombre sin tildes. Ahora hay mapa `á é í ó ú ü ñ`.
- `fichas::leer()` devolvía `[]` con un JSON corrupto y `agregar()` lo
  reescribía con una sola ficha. Ahora `leer(true)` lanza y no borra nada.
- El duplicado se comprobaba **fuera** del lock; dos procesos podían escribir
  dos fichas. Ahora se comprueba dentro del lock de `agregar()`.
- El código se calculaba dentro de la petición y no se guardaba hasta el
  final: si el proceso moría después del PDF, el reintento pedía otro código
  y dejaba un PDF huérfano. Ahora se persiste en la fila **antes** del HTTP.
- Un **409** con el PDF ya en disco se trata como "solo falta la ficha": no
  se vuelve a llamar al endpoint y se valida el PDF (`%PDF-` + `%%EOF`) antes
  de darlo por bueno.
- El duplicado detectado dentro del lock ya no cae en `fallada`: estado
  `duplicado`.
- `mio.php` resuelve primero el código de la fila de cola
  (`courseid`+`userid`+`emitida`); el nombre del JSON queda como respaldo para
  fichas manuales.
- `iniciales()` ignora partículas (`de`, `del`, `la`, `los`, `y`…): "Andrés
  de la Cruz Muñoz" da `ACM`, no `ADL`.
- Un `mapeo_cursos` inválido se registra con `debugging()` en vez de parecer
  "todos los cursos sin mapeo".

**Datos:**

- 12 códigos de `assets/data/certificados.json` tenían `\r\n` o un espacio
  (`SGCIA- 26-001`). Se normalizaron a `SGCIA-26-001` y
  `001-2026-03-CLC-CIABPPH`. El QR de los certificados viejos ya encuentra su
  ficha. Verificado con los cuatro códigos antes rotos.
- **Campo de perfil `dni`**: tenía `param2 = 0` (longitud máxima). Moodle
  guardaba **vacío** cualquier DNI escrito desde el formulario
  (`core_text::substr($dni, 0, 0)`). Corregido a `param2 = 20`. Los 47 valores
  existentes se habían cargado por importación y no estaban afectados.

**Despliegue del 2026-11-07** (repo = server, md5 idénticos):

| Archivo | md5 |
|---|---|
| `generar-certificado.php` | `7f49a49869b4601b399b3fcb74cf38c7` |
| `classes/emisor.php` | `8406171ed14c5f7a54f6b16b473d2252` |
| `classes/fichas.php` | `e1c3c8bf4bd7b86637cd45c9181f42bd` |
| `classes/cola.php` | `07d79f5121f3300f9d9ac5ea4b7e0828` |
| `mio.php` | `64b84803885ec7489b7d732f45bc2800` |

Snapshot previo del dominio: ref `5ab2e5d4247844cacf5e6dee9201fe4ec5828fb6`.

**Prueba E2E del 2026-11-07** con usuario descartable
`pruebaauditoria1107` ("Andrés de la Cruz Muñoz", DNI `88888888`, nota 16 en
el curso 2):

1. Código `016-2026-11-ACM-BPMISO` (iniciales `ACM`: las partículas no
   cuentan).
2. Ficha con `nombre_normalizado = "andres de la cruz munoz"` y DNI
   `88888888`.
3. PDF de 2 páginas, 40 h, 2 créditos, nota 16.00, fechas 31/10 → 07/11/2026.
   El DNI **no** aparece impreso.
4. QR decodificado con `jsQR`: apunta a
   `verifica-tu-certificado.html?codigo=016-2026-11-ACM-BPMISO`.
5. `mio.php?course=2` con sesión → 303 al PDF (200,
   `application/pdf`, 782 429 B); sin sesión → 303 al login.
6. La página encuentra la ficha por código, por DNI y por nombre, **con y sin
   tildes**; un código inexistente muestra el aviso y no una pantalla en
   blanco. A 390 px no hay scroll horizontal.
7. Idempotencia: reejecutar la tarea con la fila `emitida` no crea otra ficha
   (1 consulta). Recuperación: borrar la ficha y dejar la fila `pendiente`
   con su código reutiliza el PDF (0,019 s, sin HTTP). Con la ficha presente
   la fila pasa a `duplicado`. Carrera: dos peticiones simultáneas con el
   mismo código nuevo → una 302 y una 409, y un solo PDF.
8. Los artefactos se borraron: 28 fichas, 10 PDFs en `certificados/`, cola
   vacía y usuario eliminado.

**Riesgo operativo del 409:** si alguien borra un PDF ya emitido, el endpoint
no lo regenera y la ficha queda con un enlace roto. La recuperación es
manual: borrar la ficha del JSON y volver a poner la fila en `pendiente` con
su código. Es el precio de que nadie pueda pisar un certificado ajeno.

---

## 3. Lo que falta, en orden

| # | Tarea | Depende de |
|---|---|---|
| 1 | ~~Extraer los sílabos de los cursos con página en el sitio~~ | hecho |
| 2 | ~~Aprobación de Juan de esos textos~~ (2026-11-06) | hecho |
| 3 | ~~Decidir curso 4 y 7~~ (curso 4 tiene 3 módulos; curso 7 usa la página 3) | resuelto |
| 4 | ~~Cargar los sílabos en `$PROGRAMAS`~~ | hecho |
| 5 | ~~Desplegar `generar-certificado.php` a producción~~ (md5 idéntico) | hecho |
| 6 | ~~Desplegar el plugin en `/aula/local/certificados/`~~ | hecho |
| 7 | ~~Configurar `mapeo_cursos`~~ (9 entradas) | hecho |
| 8 | ~~Añadir el botón "Descargar certificado" por curso~~ (9 cursos) | hecho |
| 9 | ~~Testeo de punta a punta~~ (eslabón 7) | hecho |
| 10 | **Curso 3**: sílabo y entrada en el mapeo cuando Juan traiga el temario | Juan |
| 11 | ~~Decidir si las 5 tareas "SUBIR TALLER" del curso 7 se borran~~ (2026-11-07: **se quedan**) | resuelto |
| 12 | Revocar los dos tokens de GitHub expuestos en el chat | Juan |
| 13 | ~~Decidir el código correcto de Lorena Pilar Cáceres Junes~~ (2026-11-08: `007-2026-05-LCJ-CHICP`) | resuelto |
| 14 | ~~Decidir el código de la ficha de Manuel Renan Aliaga Abanto~~ (2026-11-08: se deja vacío; las fechas pasan a `2026-02-11 → 2026-02-13`) | resuelto |

### Nota pendiente — curso 3

**Decisión de Juan (2026-11-07): esperar el temario.** El curso 3 (BPM según
Codex Alimentarius) tiene páginas y examen en el aula, pero no emite
certificado: no existe su ficha en el sitio de donde extraer el sílabo, y sin
sílabo el reverso del PDF saldría con los módulos de otro programa.

Cuando llegue el temario hay que hacer, en este orden:

1. Abrir un **change de OpenSpec** con el temario (3 módulos + contenidos, o
   más si los tiene). No se toca el generador sin ese change.
2. Agregar la entrada en `$PROGRAMAS` de `generar-certificado.php`, con sus
   tokens `coincide`. Ojo: los tokens se comparan sin acentos y en mayúsculas
   contra el nombre del programa, y el orden importa si dos entradas podrían
   encajar en el mismo nombre.
3. Agregar la fila al `mapeo_cursos` del aula (`courseid` 3, sufijo, horas,
   créditos, `gradecmid` del examen del curso 3).
4. Repetir el ensayo del eslabón 7 con un usuario descartable antes de darlo
   por bueno.

---

## 4. Deudas y riesgos abiertos

- **DNIs:** falta el de Claudia Rubio; 2 alumnos tienen documento extranjero;
  Amerson Viller Florido Malpartida está en el Excel pero no en el aula.
- **Fichas:** 26 de 50 alumnos ya tienen ficha; ~22 reales no. Juan lo maneja
  aparte.
- **Opciones de examen:** los distractores actuales son genéricos.
- **5 tareas "SUBIR TALLER"** del curso 7 (creadas a mano el 28/10, sin
  descripción, vencidas, 0 envíos): **ocultas y se quedan**. Juan decidió el
  2026-11-07 no borrarlas: los 50 alumnos actuales ya terminaron, pero la
  actividad es la que van a usar los alumnos nuevos del diplomado. No son
  residuo de una prueba; el estado "oculta" es lo que evita que estorben a
  quien ya terminó.
- **`certificados.json`:** los 12 códigos con `\r\n` o con espacio se
  normalizaron el 2026-11-07 (el QR de los certificados viejos ya encuentra su
  ficha). **Resuelto el 2026-11-08:** el código de Lorena Pilar Cáceres Junes
  pasó de `004-2026-05-JCH-CHICP` (duplicado con Jeyson) a
  `007-2026-05-LCJ-CHICP`, y las fechas de Manuel Renan Aliaga Abanto (código
  vacío) pasaron a `2026-02-11 → 2026-02-13` (las de su PDF). Su código sigue
  vacío a propósito: su PDF Canva no trae registro ni QR a la página.
- **Detección de duplicados (`fichas::existe`):** se enseñó a reconocer el
  formato viejo `SUFIJO-...` (diplomado `SGCIA-26-00x`) y las fichas sin código
  (Manuel). Antes, 4 de las 28 fichas antiguas no se detectaban y el plugin
  habría emitido un segundo certificado para esas personas. Verificado en
  producción con los 4 casos.
- **Emisión masiva (eslabón 9):** bloqueada por falta de datos. De los 111
  pares alumno-curso reales, 27 tienen certificado y 84 no tienen nota ni fechas
  en ningún archivo. Los cursos 2, 8, 9, 10 y 11 no tienen ni un certificado
  emitido (75 pares entre ellos: 18+9+26+11+11), y faltan 9 más en los
  cursos 4, 5 y 6 (5+2+2). Las 28 fichas existentes se leyeron de sus PDFs en
  Drive: notas de 14 a 20 (13 con 20,
  4 con 19, 6 con 18, 2 con 17, 1 con 16, 2 con 14). Solo falta que el cliente
  entregue las notas y fechas de los 84 restantes (los PDFs que ya les entregó,
  o un Excel).
- **Nota del certificado (2026-11-10):** el cliente pidió retirar la nota del
  certificado. El generador ya no imprime "Calificación" ni la nota del sílabo
  (`calificacion` y `nota` retirados de `$CAMPOS`/`$valores`; `nota` pasa a
  parámetro legacy aceptado e ignorado). La emisión gatilla solo por
  `timecompleted` (la finalización ya implica aprobación). Los 28 certificados
  históricos (Canva) siguen mostrando su nota; no se reemiten.
- **Eslabón 9 (2026-11-10): en pruebas.** Se marcaron los 83 alumnos
  pendientes como completados con la fecha actual y se ejecutó la tarea de
  emisión: 83 PDFs nuevos (códigos 016..098) y 83 fichas nuevas. Total de
  fichas: 111 (28 históricas + 83 nuevas). PDFs verificados por muestra: sin
  "Calificación" ni nota, con QR y registro. Si las fechas reales llegan
  después, se regeneran con fechas correctas.
- **Tokens de GitHub** expuestos en el chat: siguen sin revocar.

---

## 5. Hechos técnicos que no hay que redescubrir

- `question_references.itemid` apunta a **`quiz_slots.id`**, no al id del quiz.
- En Moodle 4.5, `course_modules.section` es el **id** de `course_sections`;
  `course_sections.section` tiene índice único por curso (para reordenar hay
  que usar un valor temporal, p. ej. `-1`).
- **`course_modules` ya no tiene columna `deleted`**: es
  `deletioninprogress`. Una consulta con `deleted` falla con
  "Error al leer de la base de datos".
- `course_completed` no trae `timecompleted`; hay que leerlo de
  `course_completions`.
- **Sin criterios en `course_completion_criteria` el curso no se completa
  nunca** y el observer no se dispara: `enablecompletion=1` no basta. El
  criterio de actividad (tipo 4) guarda el **cmid** en `moduleinstance`.
- `completion_completion` **no tiene** `update_state()`. Las filas las crea
  `\core\task\completion_daily_task` (`mark_enrolled`) y las agrega
  `\core\task\completion_regular_task` (`aggregate_completions`).
- **Moodle fija `arg_separator.output = '&amp;'`**: `http_build_query($params)`
  devuelve `&amp;programa=…` y el endpoint responde "Falta el parametro
  programa". Hay que pasar el separador: `http_build_query($params, '', '&')`.
- En cron y CLI **`gradelib.php` no está cargado**: usar `\grade_item` sin
  `require_once($CFG->libdir . '/gradelib.php')` mata la tarea con
  "Class grade_item not found".
- El timezone del sitio se cambia con `set_config('timezone', 'America/Lima')`
  **sin** plugin; con `'core'` no actualiza `$CFG->timezone`.
- `availability\condition::description_cm_name()` devuelve el marcador
  `<AVAILABILITY_CMNAME_<id>/>`, sustituido solo al renderizar.
- El endpoint responde **302** con `Location: .../certificados/<codigo>.pdf`
  en éxito; 400/422 con JSON `{"success":false,"error":"..."}`.
- El servidor no tiene PHP en el PATH local: se usa
  `/opt/alt/php83/usr/bin/php`.
- El MCP `spaceship-shared-hosting-server28` se desconecta de forma
  intermitente (`ECONNRESET`).

---

## 6. Cómo agregar un curso nuevo

Checklist para que un curso emita certificados solo, sin tocar código:

1. **Crear el curso** en Moodle (o duplicar uno existente).
2. **Secciones y páginas** con los enlaces de Drive, una por sesión/módulo.
3. **Examen**: 20 puntos, aprobado 14, intentos ilimitados, nota más alta,
   finalización por aprobación.
4. **Finalización**: las páginas se completan al verlas; el examen se
   desbloquea al completar todas las páginas; el **curso** se completa al
   aprobar el examen (criterio de actividad en *Finalización del curso*,
   condición "aprobar con 14").
5. **Sílabo en el generador**: agregar la entrada a `$PROGRAMAS` de
   `generar-certificado.php` (3 módulos + contenidos). Si el curso tiene más
   de 3 módulos, necesita la página 3.
6. **Mapeo en el plugin**: agregar la entrada a `mapeo_cursos` con
   `courseid`, `programa` (nombre exacto del endpoint), `horas`, `creditos`,
   `sufijo`, `nota_minima` y `gradecmid` (0 = nota total del curso).
7. **Botón de descarga**: enlace a `/aula/local/certificados/mio.php?course=N`.
8. **Prueba**: un alumno de prueba completa y se verifica PDF + ficha + QR.

Los pasos 5 y 6 son los únicos que hoy requieren editar archivos. Todo lo
demás se hace desde la interfaz de Moodle. Después de eso, cualquier alumno
matriculado emite su certificado sin intervención.

## 7. DNI

El aula **no trae campo DNI**. Medido el 2026-11-06 contra el Excel de
matrículas:

| Situación | Cantidad |
|---|---|
| Alumnos con DNI de 8 dígitos | 45 |
| Documento extranjero (no 8 dígitos) | 2 |
| Cuentas de servicio sin DNI (ver abajo) | 3 |
| En el Excel pero no en el aula (Amerson Florido) | 1 |

Los dos documentos extranjeros:

- Carlos Daniel Flores Alfaro: `110505317113755`
- Laura Mariana Camacho Tovar: `1.010.157.556` (Colombia)

Plan: crear el campo de perfil `dni`, llenarlo desde el Excel y hacer que el
plugin lo copie a la ficha (`dni_original` / `dni_normalizado`). La página de
verificación ya busca por DNI; hoy esas fichas solo se pueden buscar por
nombre.

**Hecho el 2026-11-06:** campo `dni` creado (tipo texto, 20 caracteres,
visible solo para el usuario y administración) y **47 valores cargados**.
Claudia Rubio, la cuenta de invitado y la de administración quedan vacías.
Amerson Florido se llenará cuando se cree su cuenta. El DNI no se imprime en
el PDF: solo sirve para la búsqueda en `verifica-tu-certificado.html`.

**Corregido el 2026-11-07:** el campo tenía `param2 = 0` (longitud máxima),
así que `profile_save_data()` truncaba a vacío cualquier DNI escrito desde el
formulario (`core_text::substr($dni, 0, 0)`). Los 47 valores existentes se
habían cargado por importación directa y no estaban afectados, pero un alumno
nuevo habría quedado sin DNI. `param2` quedó en `20` y se probó guardando y
leyendo el DNI `88888888` en un usuario descartable.

### Cuentas de servicio sin DNI (a propósito)

Tres cuentas del aula **no tienen DNI y no es un dato faltante**: no son
alumnos, son cuentas de servicio/administración. Confirmado por Juan el
2026-11-08.

| Cuenta | Usuario | Qué es |
|---|---|---|
| `Alumno Invitado` | `alumno` (`alumno@gmail.com`) | cuenta de invitado/pruebas del aula |
| `Proinocuidad -` | `administracion@proinocuidad.com` | cuenta institucional de la empresa |
| `Claudia Rubio` | `clau.rubioj@gmail.com` | cuenta de administración/soporte |

Consecuencias que hay que respetar:

- **No cuentan como alumnos.** Las 50 cuentas con rol `student` del aula son
  **47 alumnos reales** + estas 3. Eso cuadra con los 47 DNI cargados
  (45 peruanos de 8 dígitos + 2 documentos extranjeros).
- **No entran en la emisión masiva** ni en los conteos de avance. Están
  inscritas en 11 pares alumno-curso en total, que no son matrículas reales.
- Si alguna vez se emitiera un certificado para ellas, la ficha quedaría sin
  `dni_original` y la página solo la encontraría por nombre (el DNI es el
  único campo de búsqueda que no imprime el PDF).
- El plugin ya las tolera: una ficha sin DNI se genera y se busca igual por
  nombre normalizado; lo que no habría es la segunda vía de búsqueda.

## 8. Bitácora

| Fecha | Hecho |
|---|---|
| 2026-10-25 | Moodle 4.5.15 instalado en `/aula/`, español, logo y favicon |
| 2026-10-28 | Montaje inicial del diplomado (incluye las 5 tareas "SUBIR TALLER") |
| 2026-11-04 | Eslabones 1–5 cerrados |
| 2026-11-05 | Plugin `local_certificados` escrito en el repo (sin desplegar) |
| 2026-11-06 | Generador con los 9 sílabos desplegado (md5 `9c9eaa23…`) |
| 2026-11-06 | Plugin desplegado, `mapeo_cursos` con 9 cursos, DNI bloqueado |
| 2026-11-06 | Criterio de finalización "aprobar el examen" en los 9 cursos |
| 2026-11-06 | Botón "Descargar certificado" en los 9 cursos |
| 2026-11-06 | Timezone del aula a `America/Lima` (estaba en `Europe/London`) |
| 2026-11-06 | Eslabón 7 cerrado: prueba de punta a punta con usuario descartable |
| 2026-11-07 | Auditoría con 4 subagentes: correcciones del generador y del plugin, códigos del JSON normalizados y campo `dni` reparado |
| 2026-11-07 | Eslabón 8 cerrado: redeploy verificado por md5 y E2E con tildes, partículas y DNI |
| 2026-11-10 | Nota retirada del certificado: generador y plugin actualizados; 83 alumnos marcados completados con fecha actual y emitidos (códigos 016..098). Total fichas: 111. Eslabón 9 en pruebas |
| 2026-11-08 | Arreglado el detector de duplicados (`fichas::existe`): formato viejo `SUFIJO-...` y fichas sin código; código de Lorena a `007-2026-05-LCJ-CHICP`; fechas de Manuel a `2026-02-11 → 2026-02-13`. Verificado en producción |
