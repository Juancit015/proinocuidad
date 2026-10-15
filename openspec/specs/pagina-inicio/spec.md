# Página Inicio

## Purpose

Definir la página Inicial (Home): punto de entrada del sitio con hero institucional, servicios destacados, cursos destacados y la noticia vigente.

## Requirements

### Requirement: Hero institucional
La página Inicio SHALL mostrar un hero con el slogan oficial "¡Formamos profesionales, construimos inocuidad!" y una llamada a la acción hacia Cursos.

#### Scenario: Carga del Home
- **WHEN** el usuario abre el Home
- **THEN** ve el slogan oficial y un botón que enlaza a la sección/página Cursos

### Requirement: Servicios destacados
El Home SHALL presentar una sección con los 4 servicios de la empresa (Capacitación Empresarial, Implementación de normativa sanitaria de alimentos, Implementación de sistemas de gestión ISO 9001/ISO 22000/FSSC 22000/BRCGS FOOD, y Trámite de registro sanitario), cada uno con su imagen genérica temática y tarjeta enlazada a la página de Servicios.

#### Scenario: Tarjeta de servicio
- **WHEN** el usuario hace clic en una tarjeta de servicio del Home
- **THEN** navega a la página de Servicios

### Requirement: Cursos destacados
El Home SHALL mostrar una selección de los cursos asíncronos con su flyer, nombre e inversión, enlazando cada tarjeta a la ficha del curso y con un enlace "Ver todos los cursos".

#### Scenario: Tarjeta de curso destacado
- **WHEN** el usuario hace clic en la tarjeta de un curso destacado
- **THEN** navega a la ficha de detalle de ese curso

### Requirement: Noticia vigente en el Home
El Home SHALL incluir la sección de Noticias con la nota vigente ("DIGESA aclara el alcance de la nueva vigencia indeterminada del HACCP", Equipo Proinocuidad, fuente Ministerio de Salud). La tarjeta de la nota en el Home SHALL mostrar la misma foto de portada que la página Noticias (`assets/img/noticia-digesa-haccp.jpg`) arriba y el texto debajo, con las píldoras existentes legibles sobre la imagen.

#### Scenario: Noticia en portada
- **WHEN** el usuario llega al Home
- **THEN** ve la nota de DIGESA con su título y resumen, con enlace al contenido completo

#### Scenario: Foto de portada en el Home
- **WHEN** el usuario ve la tarjeta de noticia en el Home en escritorio
- **THEN** ve la foto `noticia-digesa-haccp.jpg` arriba ocupando el ancho de la tarjeta y el texto debajo, con las píldoras "Noticia · Regulación" y "DIGESA" legibles sobre la imagen y sin desbordes

#### Scenario: Misma foto que en Noticias
- **WHEN** se compara la tarjeta del Home con la de `noticias/index.html`
- **THEN** ambas usan el mismo archivo `assets/img/noticia-digesa-haccp.jpg` con el mismo `alt` descriptivo

### Requirement: Colores institucionales
Todo el sitio SHALL aplicar la paleta institucional: azul marino `#101477`, rojo corporativo `#AD343B` y gris grafito `#252525`.

#### Scenario: Verificación de paleta
- **WHEN** se revisa cualquier página del sitio
- **THEN** los colores predominantes corresponden a la paleta institucional definida

### Requirement: Cursos destacados en HTML estático
La sección "Cursos destacados" de `index.html` SHALL estar escrita en el HTML, generada por `tools/generar-listados.mjs` a partir de `assets/js/cursos-data.js` (cursos con `enHome: true`). Cada curso destacado SHALL aparecer como tarjeta en el HTML inicial, sin depender de JavaScript para construirla.

#### Scenario: Destacados sin JavaScript
- **WHEN** se carga `index.html` con JavaScript deshabilitado
- **THEN** las 4 tarjetas de cursos destacados se muestran con su flyer, nombre, modalidad, horas, inversión y botones

#### Scenario: Enlaces a fichas en el HTML
- **WHEN** se lee el HTML de `index.html` sin ejecutar scripts
- **THEN** existe un enlace `cursos/<slug>/index.html` por cada curso con `enHome: true`

#### Scenario: Regeneración
- **WHEN** se ejecuta `node tools/generar-listados.mjs`
- **THEN** la sección se reescribe desde `cursos-data.js` y el resultado es idéntico si no hubo cambios en los datos

### Requirement: Bloque final de contacto en la home
La página Inicio SHALL cerrar con un bloque de contacto después de la sección de noticias y antes del footer, solo en `index.html` de la raíz. El bloque SHALL incluir: título "¿Listo para fortalecer la inocuidad de tu empresa?" con la palabra "inocuidad" resaltada en `#ff8f96`, descripción breve sin plazos ni cifras, 4 contactos reales con ícono (WhatsApp +51 981 365 982, correo administracion@proinocuidad.com, horario lunes a viernes de 8 AM a 8 PM, Trujillo, La Libertad, Perú), tarjeta con botones "Solicitar asesoría por WhatsApp" (wa.me/51981365982, con ícono de soporte) y "Escríbenos un correo" (mailto:, con ícono de sobre), y nota inferior "Escríbenos y recibe una propuesta personalizada. O llámanos directo." con enlace `tel:+51981365982` en azul oscuro. El título y la descripción de la tarjeta SHALL estar centrados, con el título en 1.4rem. El chip del icono de WhatsApp SHALL ser verde `--whatsapp` con glifo blanco; los de correo, horario y ubicación SHALL ser blancos con glifo `--azul-oscuro`. Al hover sobre el número de WhatsApp no SHALL aparecer subrayado. El resto del bloque SHALL usar la paleta de Proinocuidad (fondo oscuro con imagen existente de `assets/img/`, tarjeta blanca, texto claro `#d7d9f2`/blanco) y los radios y sombras existentes. En móvil las columnas SHALL apilarse. Ninguna subpágina SHALL llevar este bloque.

#### Scenario: cierre visible en la home
- **WHEN** el usuario llega al final de `index.html`
- **THEN** ve el título con "inocuidad" en tono claro, los 4 contactos con chips de color, la tarjeta centrada con título grande, los 2 botones con ícono y la nota con enlace, antes del footer

#### Scenario: botones de contacto
- **WHEN** el usuario pulsa "Solicitar asesoría por WhatsApp" o "Escríbenos un correo"
- **THEN** se abre wa.me/51981365982 o el correo a administracion@proinocuidad.com respectivamente

#### Scenario: nota con llamada directa
- **WHEN** el usuario pulsa "llámanos directo" en la nota de la tarjeta
- **THEN** se inicia una llamada a `tel:+51981365982`

#### Scenario: sin subrayado en WhatsApp
- **WHEN** el usuario pasa el cursor sobre el número de WhatsApp del bloque
- **THEN** no aparece ningún subrayado

#### Scenario: solo en la home
- **WHEN** el usuario abre cualquier subpágina
- **THEN** no ve el bloque final de contacto
