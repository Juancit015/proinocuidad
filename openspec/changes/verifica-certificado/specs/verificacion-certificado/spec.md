# Spec Delta

## Purpose
Capacidad de verificación pública de certificados emitidos por Proinocuidad: un visitante busca por DNI o nombre, consulta los datos del certificado y descarga el PDF desde el enlace oficial de Google Drive.

## ADDED Requirements

### Requirement: Página pública de verificación
El sitio SHALL servir una página `verifica-tu-certificado.html` con la plantilla completa del sitio (topbar con redes sociales, cabecera sticky, nav, footer y meta tags con canonical a `https://proinocuidad.com/verifica-tu-certificado.html`) y un encabezado de subpágina (`page-head--verifica`, reutilizando `hero-cursos.avif`) con migas de pan "Inicio / Verifica tu certificado" al estilo de las demás subpáginas (servicios, nosotros, noticias, cursos).

#### Scenario: Carga de la página
- **WHEN** un visitante abre `https://proinocuidad.com/verifica-tu-certificado.html`
- **THEN** la página responde 200 y muestra la topbar con redes sociales, la misma cabecera sticky que el resto del sitio y el footer completo

#### Scenario: Encabezado de subpágina con migas de pan
- **WHEN** se compara el encabezado (`page-head`) de la página de verificación con el de las subpáginas existentes (noticias, servicios, cursos, nosotros)
- **THEN** usa el mismo componente `page-head` con `breadcrumbs` ("Inicio / Verifica tu certificado"), h1 compacto del mismo tamaño/clamp que las demás subpáginas, fondo `hero-cursos.avif` con el mismo tratamiento de degradado y, en móvil, el mismo comportamiento de `background-attachment`

#### Scenario: Alineación de la cabecera con el resto del sitio
- **WHEN** se comparan el nav y la topbar de la página de verificación con los de cualquier otra página del sitio
- **THEN** la estructura, el orden de enlaces, los iconos y las redes sociales son idénticos (sin diferencias de orden ni iconos faltantes)

#### Scenario: Componentes flotantes globales
- **WHEN** se compara la página de verificación con cualquier otra página del sitio en cuanto a los componentes flotantes (WhatsApp y volver arriba)
- **THEN** ambos botones están presentes con el mismo marcado y se muestra el botón de WhatsApp con su texto de invitación

### Requirement: Búsqueda por DNI o nombre
La página SHALL ofrecer una tarjeta de búsqueda centrada con un único campo de texto y un botón "Buscar", que busca por credencial (DNI/C.E.) cuando la consulta es puramente numérica —ignorando espacios y puntos— y por nombres y apellidos en los demás casos, en el archivo de certificados.

#### Scenario: Búsqueda por DNI
- **WHEN** el usuario ingresa un DNI o C.E. válido presente en el archivo de datos y envía la búsqueda
- **THEN** se muestran las tarjetas de todos los certificados cuyo DNI normalizado (solo dígitos) sea **exactamente igual** a la consulta
- **AND** un número numérico dentro del rango que no coincida de forma exacta con ningún registro no arroja resultados ni una sola ficha, aunque sea prefijo, sufijo o subcadena de un DNI existente (5ª ronda de Juan, 2026-10-29: "722399" no debe devolver la ficha de "72239976")

#### Scenario: Búsqueda por nombre o apellidos
- **WHEN** el usuario ingresa nombres o apellidos (completos o parciales) y envía la búsqueda
- **THEN** se muestran las tarjetas de los certificados cuyos nombres normalizados (minúsculas, sin tildes, espacios colapsados) contienen todas las palabras de dos o más caracteres de la consulta, en cualquier orden dentro del nombre, insensible a mayúsculas y tildes

#### Scenario: Consulta alfanumérica sin vía por DNI
- **WHEN** la consulta mezcla letras y números (por ejemplo, "34e")
- **THEN** el fragmento numérico no se usa para buscar dentro de las credenciales (evita coincidencias parciales sin sentido como tres fichas por "34") y se trata como búsqueda de nombre; si no hay coincidencias, se muestra el mensaje general

#### Scenario: Consulta vacía
- **WHEN** el usuario envía el formulario con el campo vacío o solo espacios
- **THEN** no se realiza ninguna búsqueda y el campo recibe el foco

### Requirement: Validación de la consulta
El formulario SHALL limitar el campo de búsqueda a 40 caracteres (`maxlength="40"`) y SHALL validar por código que una consulta puramente numérica (sin espacios ni puntos) tenga entre 6 y 15 dígitos — rango que cubre el DNI peruano (8) y las credenciales de extranjeros presentes en la base (10 en Colombia y 15 en otro caso real) — antes de ejecutar la búsqueda.

#### Scenario: Credencial numérica fuera de rango
- **WHEN** el usuario envía una consulta numérica de menos de 6 o de más de 15 dígitos (por ejemplo, 20 dígitos)
- **THEN** se muestra el mensaje general "Por favor, verifique que las credenciales ingresadas sean correctas." con foco en el campo, sin ejecutar ninguna búsqueda

#### Scenario: Límite de entrada del campo
- **WHEN** una persona teclea más de 40 caracteres en el campo con el teclado
- **THEN** la entrada se detiene en 40 caracteres (`maxlength="40"`)

#### Scenario: Consulta numérica dentro del rango
- **WHEN** el usuario envía una consulta numérica de 6 a 15 dígitos
- **THEN** la búsqueda se ejecuta por DNI normalizado sin mostrar el aviso

### Requirement: Presentación del resultado
El sistema SHALL mostrar cada coincidencia como una tarjeta con código, badge de estado (verde para VÁLIDO), nombre completo, programa, fecha de inicio, fecha de término, horas académicas y DNI/C.E. original.

#### Scenario: Tarjeta de resultado
- **WHEN** una búsqueda produce una o más coincidencias
- **THEN** el área de resultados muestra una tarjeta por certificado con todos sus datos y la zona de resultados se centra en el viewport con scroll suave (respetando `prefers-reduced-motion`)

#### Scenario: Sin coincidencias
- **WHEN** ninguna consulta encuentra coincidencias
- **THEN** se muestra el mensaje general "Por favor, verifique que las credenciales ingresadas sean correctas." en el aviso bajo el campo de búsqueda — el mismo canal del error de validación —, la zona de resultados queda vacía y la vista no se desplaza hacia el footer

#### Scenario: Fallo al cargar los datos
- **WHEN** el fetch de `assets/data/certificados.json` falla (red, 404 o JSON inválido)
- **THEN** se muestra el aviso de error en el canal bajo el campo de búsqueda y no se produce ninguna excepción sin manejar

#### Scenario: Estados que no se mezclan
- **WHEN** el usuario envía una nueva consulta después de cualquier mensaje anterior (sin coincidencias, validación o fallo de carga)
- **THEN** el aviso se reemplaza por el del estado actual y la zona de resultados se vacía antes de cada búsqueda, sin dejar mensajes antiguos en pantalla

### Requirement: Feedback de búsqueda e iconografía
La página SHALL dar feedback visible del proceso de búsqueda — spinner con "Buscando…" y botón deshabilitado mientras corre, mensaje de carga en los resultados y mínimo perceptible de 420 ms — y SHALL seguir la regla de iconografía de UI de `AGENTS.md` (SVG inline con el icono correspondiente por campo en la ficha y check en el badge, sin emojis).

#### Scenario: Estado de carga visible
- **WHEN** el usuario envía una búsqueda válida y los resultados aún no están renderizados
- **THEN** el botón queda deshabilitado con `aria-busy="true"`, la bolita girando del CSS global del sitio (`.btn[aria-busy="true"]::before`) aparece junto al texto "Buscando…", la zona de resultados muestra un mensaje de carga con su texto animado y transcurren al menos 420 ms antes de que aparezcan las tarjetas

#### Scenario: Botón restaurado tras el proceso
- **WHEN** el proceso de búsqueda termina (con o sin coincidencias)
- **THEN** el botón vuelve a estar habilitado, sin `aria-busy` y con su contenido original (lupa + "Buscar"), sin dejar el spinner visible

#### Scenario: Iconos en la ficha de resultado
- **WHEN** una tarjeta de resultado se muestra
- **THEN** cada campo de datos lleva su icono SVG inline con `stroke="currentColor"`, el badge VÁLIDO lleva el icono de check y ningún texto usa emojis

#### Scenario: Movimiento reducido
- **WHEN** el sistema operativo del usuario declara `prefers-reduced-motion: reduce`
- **THEN** el spinner y el texto de carga dejen de animarse por CSS y el scroll a resultados se hace sin animación

### Requirement: Descarga del certificado
Cada tarjeta con certificado emitido SHALL incluir un botón "Descargar certificado" que descargue el PDF directamente en el dispositivo del usuario a partir de su enlace oficial de Google Drive (`uc?export=download`), sin pasar por la pantalla del visor.

#### Scenario: Descarga directa desde Drive
- **WHEN** el usuario pulsa "Descargar certificado" en una tarjeta cuyo registro tiene enlace de certificado
- **THEN** el navegador solicita el PDF directamente con `https://drive.google.com/uc?export=download&id=<id-del-archivo>` derivado del enlace del registro, sin abrir la página del visor de Drive

#### Scenario: Registro sin enlace
- **WHEN** un registro del archivo de datos no tiene enlace de certificado
- **THEN** la tarjeta se muestra sin botón de descarga, sin enlaces rotos

### Requirement: Datos estáticos de certificados
El sistema SHALL alimentar la búsqueda exclusivamente de un JSON estático `assets/data/certificados.json` generado desde el cuaderno "VERIFICA TU CERTIFICADO.xlsx" por `tools/generar-certificados.mjs`, con campos de código, nombre, DNI original y normalizado, programa, fechas ISO, horas, estado y enlace de certificado.

#### Scenario: Regeneración fiel desde el Excel
- **WHEN** se ejecuta `node tools/generar-certificados.mjs` con el cuaderno fuente
- **THEN** el JSON se regenera con exactamente los registros del Excel (28 en la fuente actual) sin duplicados ni filas de cabecera

#### Scenario: Normalización compartida
- **WHEN** el generador crea los campos normalizados
- **THEN** aplica las mismas reglas de normalización que la búsqueda en la página (DNI solo dígitos; nombre en minúsculas, sin tildes, espacios colapsados)

### Requirement: Integración en la navegación global
Todas las páginas del sitio SHALL incluir el enlace "Verifica tu certificado" en el nav principal (junto a "Aula Virtual") y en el footer, incluidas las 8 fichas de curso y el 404 generados por `tools/generar-fichas.mjs`.

#### Scenario: Enlace en páginas no generadas
- **WHEN** se revisa el nav y el footer de las páginas editables del sitio (inicio, nosotros, servicios, noticias, etc.)
- **THEN** ambas secciones contienen el enlace con la ruta relativa correcta según la profundidad de la página

#### Scenario: Enlace en fichas y 404 generados
- **WHEN** se ejecuta `node tools/generar-fichas.mjs` y se comparan los ficheros generados con lo editado a mano
- **THEN** el diff regenerado está vacío y el enlace usa los prefijos correctos (`ruta` a la raíz del sitio y `cursos` a la indexación de cursos)

#### Scenario: Listado documental consistente
- **WHEN** se comparan `sitemap.xml`, `llms.txt` y `llms-full.txt`
- **THEN** los tres listan la URL `https://proinocuidad.com/verifica-tu-certificado.html` y sus conjuntos de URLs son consistentes entre sí

#### Scenario: Publicación incluida en el despliegue
- **WHEN** se ejecuta `tools/publicar.sh`
- **THEN** `verifica-tu-certificado.html` y `assets/data/certificados.json` están en su lista blanca y se publican con el resto del sitio
