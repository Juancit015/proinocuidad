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

md5 desplegados: generador `9c9eaa231ddec16c3c0e97abba0286b6`,
`classes/emisor.php` `0f9c9b0c153a568b7da9c215a4b75f7d`,
`classes/fichas.php` `3455eaa0333330f0c2b38ca49720b9d7`.

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
| 11 | Decidir si las 5 tareas "SUBIR TALLER" del curso 7 se borran | Juan |
| 12 | Revocar los dos tokens de GitHub expuestos en el chat | Juan |

---

## 4. Deudas y riesgos abiertos

- **DNIs:** falta el de Claudia Rubio; 2 alumnos tienen documento extranjero;
  Amerson Viller Florido Malpartida está en el Excel pero no en el aula.
- **Fichas:** 26 de 50 alumnos ya tienen ficha; ~22 reales no. Juan lo maneja
  aparte.
- **Opciones de examen:** los distractores actuales son genéricos.
- **5 tareas "SUBIR TALLER"** del curso 7 (creadas a mano el 28/10, sin
  descripción, vencidas, 0 envíos): **ocultas**. Pendiente decidir si se
  borran.
- **`certificados.json`:** hay códigos con saltos de línea y una ficha sin
  código (preexistente, anterior a este trabajo).
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
| Sin DNI (Claudia Rubio, no está en el Excel) | 1 |
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
