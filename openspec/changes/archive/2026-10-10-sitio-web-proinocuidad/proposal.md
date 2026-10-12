# Proposal

## Why

Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L. (Trujillo, La Libertad, Perú) no tiene sitio web corporativo: su oferta de capacitación (8 cursos asíncronos), servicios de consultoría y contenido informativo vive solo en un PDF interno y en redes sociales. Se necesita un sitio web estático que presente esta oferta, dirija a la inscripción (pasarela Culqi + formulario de Google) y conecte al aula virtual existente, siendo el PDF `pagina web.pdf` la fuente única de verdad del contenido.

## What Changes

- Crear un **sitio web estático** (HTML/CSS/JS, sin backend) con paleta institucional: azul marino `#101477`, rojo `#AD343B`, gris grafito `#252525`.
- Páginas: Inicio (hero + servicios destacados + cursos + noticias), Nosotros, Servicios (4), Cursos (8) con pestañas Asíncono/En vivo, Noticias (1 nota), y footer de contacto.
- Barra de navegación con **mega-menú al hover** (ventana con submenús agrupados, estilo referencial adjunto por el usuario).
- Ficha de detalle por curso en 9 bloques: Datos generales, Beneficios, Público objetivo, Objetivo (+ Perfil del egresado solo en el diplomado), Temario desplegable, Metodología, Inversión, Inscripción online y Medios de pago.
- **Flujo de pago nuevo aprobado por el dueño del proyecto (excepción documentada al PDF):** el pago real se realiza con **Culqi** mediante botón con enlace de pago por curso; el bloque "Medios de pago" es informativo (logos Yape, Plin, BBVA, Western Union y PayPal con titular y número).
- Pestaña "En vivo" publicada como "Próximamente" (sin cursos por ahora).
- Botón CTA "Solicitar más información" en cada ficha que redirige al **Google Form público** (mismo ID del PDF, sufijo `/viewform` en lugar de `/edit`).
- Enlaces salientes: Aula virtual `https://proinocuidad.com/login/` (pestaña nueva), comunidad WhatsApp en footer, redes sociales oficiales.
- Footer con email `administracion@proinocuidad.com`, WhatsApp +51 981 365 982, horario (L–V 8 AM–8 PM), ubicación "Trujillo, La Libertad, Perú" (dirección exacta: "Próximamente"), enlaces de redes y comunidad.
- Imágenes: logo oficial, 8 flyers (uno por curso), QR BBVA, fotos reales de capacitaciones in-house y consultoría, y logos de medios de pago provistos en `logos-metodos-de-pago/` (incluye `PayPal.svg.webp`).
- La implementación **comienza por el Home** (requisito explícito del usuario); el resto de páginas continúa después de que el Home esté terminado.

## Capabilities

### New Capabilities

- `navegacion-global`: barra de navegación con logo, enlaces principales y mega-menú al hover; comportamiento en móvil; enlace a Aula Virtual.
- `pagina-inicio`: página Home con hero/slogan, servicios destacados, cursos destacados y sección de noticias.
- `pagina-nosotros`: presentación de la empresa (historia, RUC, misión, visión, valores, experiencia).
- `pagina-servicios`: los 4 servicios de consultoría con imágenes genéricas temáticas y casos reales documentados.
- `cursos`: listado de cursos con pestañas Asíncono/En vivo ("Próximamente"), tarjetas por curso con flyer y botones, y ficha de detalle por curso con temario desplegable.
- `pagos-e-inscripcion`: bloque de medios de pago informativo (logos + titular), botón de pago Culqi por curso y CTA "Solicitar más información" hacia el Google Form público.
- `noticias`: sección de noticias y eventos con la nota vigente (DIGESA / vigencia indeterminada del HACCP).
- `contacto-footer`: datos de contacto, horario, ubicación, redes sociales, comunidad WhatsApp y estado "Próximamente" de campos sin dato.

### Modified Capabilities

<!-- Ninguna: proyecto nuevo, no existen specs previas. -->

## Impact

- **Código:** proyecto nuevo, sitio estático (HTML/CSS/JS vanilla, sin framework). No hay código existente afectado.
- **Recursos:** uso de `FOTOS-(1)/FOTOS/` (logo, flyers, fotos), `logos-metodos-de-pago/` (Yape, Plin, BBVA, Western Union, PayPal) y QR BBVA (`IMG-20260213-WA0000.jpg`).
- **Servicios externos (solo enlaces):** Culqi (enlaces de pago por curso, pendientes de generar: placeholder hasta que el dueño los cree), Google Forms (inscripción), plataforma Moodle `proinocuidad.com/login/`.
- **Placeholders registrados:** número Yape/Plin `+51 99999999` por reemplazar; URLs de Culqi por curso por generar; dirección exacta mostrada como "Próximamente".
- **Contenido fijo:** horas académicas según PDF (384 h diplomado / 40 h cursos) aunque el formulario activo del cliente indique 240 h / 32 h — el cliente corregirá su formulario; el sitio sigue el PDF.
