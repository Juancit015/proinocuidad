# Cursos

## Purpose

Definir la sección Cursos: listado con pestañas Asíncono/En vivo, tarjetas de los 8 cursos asyncrónicos y la ficha de detalle de cada curso con los 9 bloques del documento base.

## Requirements

### Requirement: Pestañas de modalidad
La página Cursos SHALL ofrecer dos pestañas: "Asíncronos" (activa, con los 8 cursos) y "En vivo" (sin cursos por hoy, según decisión del dueño: la edición en vivo disponibles ya ocurrió y no existe en la fuente una ficha de oferta en vivo). La pestaña "En vivo" SHALL mostrar un aviso de ausencia de cursos en vivo — sin flyers, sin contenido de marketing — y indicar que los cursos disponibles están en la pestaña Asíncronos.

#### Scenario: Pestaña por defecto
- **WHEN** el usuario abre la página Cursos
- **THEN** ve activa la pestaña "Asíncronos" con los 8 cursos listados

#### Scenario: Pestaña En vivo
- **WHEN** el usuario cambia a la pestaña "En vivo"
- **THEN** ve el aviso "No hay cursos en vivo por el momento…" (texto definido en design.md), sin ningún curso ni flyer listado

### Requirement: Tarjetas de curso con flyer
Cada curso asíncrono SHALL mostrarse como tarjeta con su flyer correspondiente, el nombre completo del curso, la modalidad asíncrona (grabada), la certificación en horas y la inversión, y dos botones apilados verticalmente a ancho completo: "Más información" con un ícono "+" en SVG antes del texto, y "WhatsApp" con el ícono oficial de WhatsApp en SVG antes del texto. Excepción aprobada por el dueño: el curso de HACCP Implementación y Certificación en Perú (DIGESA / SENASA) no usa flyer para su tarjeta hasta que el cliente genere un flyer de modalidad asíncrona (su único flyer disponible es de una edición EN VIVO ya ocurrida, el cual NO se publica en ninguna pestaña del sitio); mientras tanto su tarjeta muestra un espacio de marca sin flyer.

#### Scenario: Botón WhatsApp de tarjeta
- **WHEN** el usuario hace clic en el botón "WhatsApp" de una tarjeta de curso
- **THEN** se abre la conversación con el número +51 981 365 982 en `wa.me/51981365982`

#### Scenario: Tarjeta del curso DIGESA/SENASA sin flyer asíncrono
- **WHEN** el usuario ve la tarjeta del curso "HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)" en el listado asíncrono
- **THEN** la tarjeta muestra la información del curso (nombre, modalidad, horas, inversión, botones) con un espacio de marca en lugar de flyer

#### Scenario: Flyer de edición en vivo fuera del sitio
- **WHEN** se revisa cualquier página o pestaña del sitio
- **THEN** el flyer de la edición ZOOM del curso DIGESA/SENASA no aparece en ninguna página (se conservará solo como archivo en el material fuente hasta que el cliente defina su uso)

### Requirement: Ficha de detalle del curso
Al hacer clic en "Más información", el sitio SHALL mostrar la ficha completa del curso con layout moderno de 2 columnas: área principal de contenidos y sidebar sticky con el flyer oficial del curso, precios destacados (S/ y US$), botones de inscripción/WhatsApp y checklist de incluidos. El área principal SHALL presentar: hero de ficha con migas, barra de stats (horas, módulos/sesiones, modalidad, certificación), secciones estructuradas con el mismo contenido y orden actuales de cada curso (datos generales, beneficios, público objetivo, objetivo y perfil del egresado donde aplique), temario desplegable por módulos, metodología, inversión, inscripción online y medios de pago en formato moderno.

#### Scenario: Contenido completo de la ficha
- **WHEN** el usuario abre la ficha del Diplomado de Especialización en Gestión de la Calidad e Inocuidad
- **THEN** ve en el layout moderno los 9 bloques más "Perfil del egresado", con 6 sesiones, modalidad asíncrona (grabada), certificación de 384 horas académicas y inversión de S/120 (no incluye IGV) / US$37

#### Scenario: Datos de un curso corto
- **WHEN** el usuario abre la ficha de "Legislación Sanitaria de Alimentos Nacional e Internacional"
- **THEN** ve en el layout moderno 3 sesiones, 40 horas académicas y inversión de S/45 (no incluye IGV) / US$15, y el objetivo textual del documento base

#### Scenario: Ficha del diplomado sin cambios visibles
- **WHEN** el usuario abre la ficha del diplomado tras la regeneración con el generador
- **THEN** ve el mismo contenido y diseño actuales (equivalencia visual con la ficha manual)

#### Scenario: Contenido propio por curso
- **WHEN** el usuario compara dos fichas de cursos distintos
- **THEN** cada una muestra su propio título, descripción, horas, sesiones, temario, precios y flyer; solo el layout es compartido

### Requirement: Temario desplegable
El temario de cada ficha SHALL mostrarse en desplegables por módulo (cerrados por defecto) con sus contenidos según el documento base.

#### Scenario: Desplegar un módulo
- **WHEN** el usuario hace clic en el encabezado de un módulo del temario
- **THEN** el contenido de ese módulo se expande; los demás módulos conservan su estado

### Requirement: Horas académicas según documento base
Las certificaciones mostradas SHALL ser las del documento base: 384 horas para el diplomado y 40 horas para cada curso corto, aunque el formulario activo del cliente indique otras cifras (el cliente corregirá su formulario).

#### Scenario: Certificado de horas
- **WHEN** el usuario compara las horas de "Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP" en la ficha
- **THEN** ve 40 horas académicas

### Requirement: Aula virtual permanente (metodología)
El bloque Metodología de toda ficha asíncrona SHALL indicar el aula virtual permanente disponible en `https://proinocuidad.com/login/` con usuario y contraseña asignados por participante, y el requisito de nota mínima de 14/20 para el certificado de aprobación (o de participación en caso contrario).

#### Scenario: Metodología visible
- **WHEN** el usuario lee el bloque Metodología de cualquier curso
- **THEN** encuentra la URL del aula virtual y la regla de nota mínima 14

### Requirement: Migas de pan en el hero del índice
El hero del índice de Cursos SHALL mostrar migas de pan "Inicio / Cursos" sobre el título: "Inicio" enlazado a la página inicial y "Cursos" como página actual (no enlazada, separadas por "/" decorativo).

#### Scenario: Migas visibles
- **WHEN** el usuario abre el índice de Cursos
- **THEN** ve sobre el título "Cursos" las migas "Inicio / Cursos", con "Inicio" navegable a la página inicial

### Requirement: Migas de pan en el hero de la ficha
El hero de cada ficha de curso SHALL mostrar migas de pan "Inicio / Cursos / <nombre corto del curso>": "Inicio" enlazado a la página inicial, "Cursos" enlazado al índice de cursos y el nombre corto como página actual (no enlazada, niveles separados por "/" decorativo).

#### Scenario: Migas visibles en ficha
- **WHEN** el usuario abre cualquier ficha de curso
- **THEN** ve sobre el título las migas "Inicio / Cursos / <nombre corto>", con "Inicio" y "Cursos" navegables

### Requirement: Descripción del curso en el hero
El hero de cada ficha SHALL mostrar bajo el título un párrafo con la descripción del curso, correspondiente al primer párrafo del bloque Objetivo de la ficha.

#### Scenario: Descripción visible
- **WHEN** el usuario abre cualquier ficha de curso
- **THEN** ve bajo el título la descripción del curso

### Requirement: Listado de cursos en HTML estático
El listado asíncrono de la página Cursos SHALL estar escrito en el HTML de `cursos/index.html`, generado por `tools/generar-listados.mjs` a partir de `assets/js/cursos-data.js`. Cada curso asíncrono SHALL aparecer como tarjeta en el HTML inicial, sin depender de JavaScript para construirla.

#### Scenario: Listado sin JavaScript
- **WHEN** se carga `cursos/index.html` con JavaScript deshabilitado
- **THEN** las 8 tarjetas de curso se muestran con su nombre, modalidad, certificación, inversión, flyer y botones

#### Scenario: Enlaces a fichas en el HTML
- **WHEN** se lee el HTML de `cursos/index.html` sin ejecutar scripts
- **THEN** existe un enlace a cada una de las 8 fichas `cursos/<slug>/index.html`

#### Scenario: Regeneración
- **WHEN** se ejecuta `node tools/generar-listados.mjs`
- **THEN** el listado se reescribe desde `cursos-data.js` y el resultado es idéntico si no hubo cambios en los datos

### Requirement: Pestañas sin cambio de comportamiento
Las pestañas "Asíncronos" y "En vivo" SHALL mantener su comportamiento: "Asíncronos" activa al cargar y "En vivo" con el aviso de ausencia de cursos.

#### Scenario: Cambio de pestaña
- **WHEN** el usuario cambia a "En vivo" y de vuelta a "Asíncronos"
- **THEN** los paneles cambian y el listado asíncrono conserva sus 8 tarjetas
