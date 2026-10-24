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

### Requirement: Franja de cifras del Home
La franja de cifras del Home SHALL mostrar exactamente tres cifras: "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública", como una barra plana sobre el fondo claro del sitio, sin tarjetas, iconos, título de sección, fondo fotográfico, hover ni sombra. SHALL NOT afirmar años de experiencia ni antigüedad. En escritorio SHALL repartir las tres cifras en tres columnas y en ≤1020px SHALL pasar a dos columnas.

#### Scenario: Tres cifras, sin antigüedad
- **WHEN** el usuario ve la franja de cifras del Home
- **THEN** encuentra tres cifras y ninguna menciona años de experiencia ni antigüedad

#### Scenario: Título de la sección
- **WHEN** se inspecciona la sección de cifras
- **THEN** la sección no lleva título propio ni subrayado: se identifica con `aria-label="Cifras de Proinocuidad"` y el único encabezado de la página sigue siendo el H1 del hero

#### Scenario: Jerarquía dentro de la tarjeta
- **WHEN** el usuario mira una de las tres cifras
- **THEN** ve el valor grande y centrado encima de la etiqueta, sin caja: sin fondo blanco, icono, borde ni sombra

#### Scenario: Sin hueco en escritorio
- **WHEN** el usuario ve la franja en una pantalla mayor a 1020px
- **THEN** las tres cifras se reparten en tres columnas de igual ancho sobre el contenedor estándar del sitio, sin una cuarta columna vacía

#### Scenario: Ancho contenido en escritorio
- **WHEN** el usuario ve la franja en una pantalla de 1440px
- **THEN** la grilla ocupa el contenedor habitual del sitio, sin la fila limitada a 820px de la versión con tarjetas

#### Scenario: Las otras cifras intactas
- **WHEN** el usuario lee la franja
- **THEN** "1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública" siguen visibles y sin cambios

#### Scenario: Conservación del SEO
- **WHEN** se revisa la página Home tras el cambio
- **THEN** el título, la meta description, el canonical y el único encabezado de nivel 1 permanecen idénticos

#### Scenario: Franja legible en móvil
- **WHEN** el usuario ve la franja en un móvil de 390px
- **THEN** las cifras se reparten en dos columnas con la tercera en la fila siguiente, se leen completas y no desbordan el ancho visible

#### Scenario: Fondo con velo y cara completa
- **WHEN** el usuario ve la franja a 1440px y a 390px
- **THEN** no hay fotografía de fondo ni velo: el fondo es el claro del sitio y desaparece con él el activo de imagen de la franja

#### Scenario: Legibilidad del título sobre el fondo
- **WHEN** se mide el contraste de la barra sobre el fondo claro
- **THEN** los valores en rojo de marca y las etiquetas en gris se leen sin depender de capas intermedias, por ser los colores por defecto del sitio

### Requirement: Cita institucional en la sección Nosotros del Home
En la sección "Nosotros" del Home, la frase institucional ("Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente.") SHALL presentarse como una cita (blockquote), separada del texto corrido, con un margen superior mayor que la separa del párrafo anterior y un indicador visual (borde lateral y comillas tipográficas) que la identifique como cita.

#### Scenario: La cita se presenta como bloque separado
- **WHEN** el usuario ve la sección "Nosotros" del Home
- **THEN** la frase institucional aparece en un bloque de cita, separada del párrafo anterior, con borde lateral y comillas

#### Scenario: Separación del texto corrido
- **WHEN** se compara la cita con el párrafo anterior
- **THEN** la cita tiene un margen superior mayor que la separa visualmente del texto corrido

#### Scenario: Contenido sin cambios
- **WHEN** se revisa el texto de la cita tras el cambio
- **THEN** el texto sigue siendo "Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente." sin alteraciones
