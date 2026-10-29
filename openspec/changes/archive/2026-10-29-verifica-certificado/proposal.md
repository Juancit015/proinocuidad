# Proposal

## Why

Los alumnos de Proinocuidad reciben su certificado como PDF en Google Drive y normalmente lo piden por WhatsApp o correo; no hay forma pública de comprobar ni recuperar su certificado por sí mismos. Una página pública de verificación con los 28 certificados del cuaderno "VERIFICA TU CERTIFICADO.xlsx" resuelve esa consulta de forma automática y a la vez da fe pública de la autenticidad de los certificados emitidos. Ya existe un intento publicado que hubo que revertir por integrarse mal al menú; este change lo rehace con la integración de navegación completa desde el inicio.

## What Changes

- Nueva página pública `verifica-tu-certificado.html` con la plantilla completa del sitio (topbar con redes sociales, cabecera sticky, nav, footer, meta tags y canonical) y, como subpágina, un `page-head` compacto con migas de pan "Inicio / Verifica tu certificado" (mismo patrón visual y tamaño que servicios, nosotros, noticias y cursos).
- Tarjeta de búsqueda centrada (modelo de la referencia TQI: título, un solo campo, botón y texto guía debajo), que acepta **DNI/C.E. o nombre/apellidos** en un solo input.
- Búsqueda client-side sobre un JSON estático con los 28 registros del Excel: tarjeta de resultado con código, nombre, programa, fechas, horas, DNI, estado (badge VÁLIDO) y botón "Descargar certificado" que abre el PDF de Drive en pestaña nueva.
- Archivo de datos inmutable `assets/data/certificados.json` generado desde el Excel por el script `tools/generar-certificados.mjs` (sin datos personales en el repo fuente: solo el JSON generado).
- Enlace "Verifica tu certificado" en el nav principal y en el footer de TODAS las páginas (las 12 no generadas a mano + las 8 fichas y el 404 vía `tools/generar-fichas.mjs`), en la misma posición y con el mismo estilo en todas.
- Integración documental y de publicación: `sitemap.xml`, `llms.txt`, `llms-full.txt` y lista blanca de `tools/publicar.sh`.

## Capabilities

### New Capabilities
- `verificacion-certificado`: búsqueda pública y verificación de certificados emitidos por DNI o nombre, presentación del resultado y descarga del PDF desde Drive; requisitos de integración con la navegación global del sitio y del sistema de datos estáticos que la alimenta.

### Modified Capabilities

## Impact

- **Nuevos**: `verifica-tu-certificado.html`, `assets/data/certificados.json`, `tools/generar-certificados.mjs`.
- **Editados**: `assets/css/main.css` (estilos `.verifica-*`), `tools/generar-fichas.mjs` (nav y footer del generador), 20 HTML existentes (enlace en nav/footer), `sitemap.xml`, `llms.txt`, `llms-full.txt`, `tools/publicar.sh`, `CHANGELOG.md`.
- **Sin cambios de backend**: búsqueda 100% client-side con fetch del JSON; no toca el endpoint del formulario ni PHP.
- **Deploy**: la página debe entrar en la lista blanca de `publicar.sh`; el deploy se ejecuta solo con consentimiento expreso (regla de AGENTS.md). No afecta `/aula/` (Moodle vive fuera del docroot y del liste de publicación).
- ** Datos**: único origen los 28 registros del Excel en `/home/juan/Descargas/VERIFICA TU CERTIFICADO.xlsx`; los enlaces de Drive ya son compartidos por el cliente ("cualquier persona con el enlace").
