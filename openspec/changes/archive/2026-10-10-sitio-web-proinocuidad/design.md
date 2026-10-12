# Design

## Context

Proyecto en blanco (no hay código existente): solo el material fuente — `pagina web.pdf` (fuente única de verdad del contenido), carpeta `FOTOS-(1)/FOTOS/` (logo, flyers, fotos), carpeta `logos-metodos-de-pago/` (Yape, Plin, BBVA, Western Union, PayPal) y el QR de pago BBVA. Dominio existente: `proinocuidad.com` (ya aloja el aula virtual en `/login/`). Ver el porqué y el qué en `proposal.md`; el comportamiento exigible está en los specs de `specs/`.

## Goals / Non-Goals

**Goals:**
- Sitio estático simple de mantener: HTML + CSS + JS vanilla, un archivo por página.
- Home primero (orden explícito del dueño), luego fichas de cursos, resto de páginas y footer.
- Contenido fiel al PDF, con las excepciones aprobadas registradas (ver Decisions).
- Rendimiento y SEO básicos: imágenes optimizadas, metadatos por página, HTML semántico.

**Non-Goals:**
- No se construye formulario propio: la inscripción redirige al Google Form público.
- No hay backend, ni pasarela integrada vía SDK: Culqi solo por enlace de pago (button URL).
- No se crea el aula virtual ni se toca `proinocuidad.com/login/`.
- No se migran ni publican los 2 cursos que existen solo en el formulario activo (BPM Codex 16 h; Trazabilidad y Etiquetado 32 h) hasta que el cliente entregue su ficha completa.
- Sin CMS: actualizar cursos/noticias implica editar HTML (aceptado con el dueño).

## Decisions

1. **Stack: HTML + CSS + JS vanilla, sin framework, sin build obligatorio.**
   - Por qué: sitio pequeño (≈6 páginas + 8 fichas), contenido estable, máximo control sobre peso y sin dependencias que caduquen.
   - Alternativa descartada: Astro/Next para contenido/SEO — el beneficio no justifica el tooling de build para un sitio de este tamaño mantenido manualmente.

2. **Organización de páginas:** `index.html` (Home), `nosotros/index.html`, `servicios/index.html`, `cursos/index.html` (listado con pestañas) y `cursos/<slug>/index.html` por curso, `noticias/index.html`. Assets en `assets/` con copies comprimidas y renombradas de los archivos fuente (los nombres genéricos `4.png`–`9.png` pasan a slugs de curso).
   - Por qué: URLs por curso legibles (`/cursos/legislacion-sanitaria-alimentos/`) para compartir en redes y WhatsApp.
   - Alternativa descartada: una sola página con hash por curso — peor compartición y peor SEO.

3. **Fichas de curso: HTML por curso, generado por plantilla compartida en JS solo si el volumen lo exige.** El temario se hace con `<details>/<summary>` nativos (desplegable por módulo, sin JS).
   - Por qué: `<details>` cumple el requisito de desplegable sin frameworks; 8 fichas estáticas son bajo costo de mantenimiento.

4. **Mega-menú al hover:** panel desplegado por CSS (`:hover`/`:focus-within`) con refuerzo mínimo de JS para accesibilidad (teclado, cierre al Escape) y acordeón en móvil.
   - Alternativa descartada: librería de menús — innecesaria para un componente.

5. **Pagos: botón Culqi con enlace por curso guardado como dato estructurado del curso** (una línea por ficha). Placeholder `#` + comentario hasta que el dueño genere los enlaces en su dashboard. PayPal entra al bloque informativo (logo incluido en `logos-metodos-de-pago/PayPal.svg.webp`).
   - Riesgo evitado: no meter claves ni SDK de Culqi en el cliente; el checkout vive en la pasarela.

6. **Formulario de inscripción: enlace público `/viewform`** (corrección mecánica del enlace `/edit` del PDF; mismo ID del formulario). CTA "Solicitar más información" en la ficha (Lectura A aprobada por el dueño).

7. **Excepciones al PDF, registradas y con visto bueno del dueño:** Culqi como pasarela (sustituye Yape/Plin/QR/BBVA/WU/PayPal como vía de cobro); titular de valores en todos los métodos: "Claudia Rubio Jiménez" (el PDF decía la razón social para BBVA); número `+51 99999999` placeholder; horas académicas según PDF (384/40) aunque el formulario activo del cliente diga 240/32 (el cliente corregirá su formulario).

8. **Empieza el Home.** El orden de implementación fuerza: Home completo y aprobado → fichas de cursos → resto de páginas → footer global. Reflejado así en `tasks.md`.

9. **Flyers (decisión del dueño, post-verificación):** los 7 flyers asíncronos se usan en tarjetas y fichas; el flyer del curso DIGESA/SENASA es de una edición EN VIVO y se reserva **exclusivamente** para la pestaña "En vivo" como pieza de referencia; su tarjeta asíncrona muestra un espacio de marca hasta que el cliente genere un flyer asíncrono (TODO en `cursos-data.js`).

## Risks / Trade-offs

- [URLs de Culqi aún no existen] → los botones quedan listos con placeholder y comentario; `tasks.md` incluye el paso de reemplazo y verificación de cada enlace antes de lanzar.
- [Número Yape/Plin placeholder `+51 99999999`] → marcarlo como TODO en el código; verificación previa al lanzamiento.
- [Horas académicas difieren entre PDF (384/40) y formulario del cliente (240/32)] → fichas muestran el dato del PDF; el mismo spec lo fija; pendiente que el cliente unifique.
- [Contenido dúplice en HTML (8 fichas con textos largos)] → mantener una sola convención de estructura y clases; revisión ortográfica interna del PDF ("FRAFITO"→"GRAFITO", etc.) sin alterar el contenido.
- [Solo 1 noticia al inicio] → estructura de listado reutilizable; no rediseño al añadir entradas.
- [Sitio estático sin actualizables automáticos] → aceptado por el dueño; documentar cómo editar cursos/noticias.
- [Brand assets de terceros (Yape, BBVA, PayPal, WU)] → usar solo los provistos por el dueño; nunca alterarlos.

## Migration Plan

No hay sistema anterior: el lanzamiento es nuevo. Estrategia:
1. Desarrollo local → aprobación visual del dueño página por página, comenzando por el Home.
2. Reemplazo de placeholders (enlaces Culqi, número real Yape/Plin).
3. Publicación en el hosting del cliente bajo `proinocuidad.com` (el aula virtual ya existe en `/login/`, verificar que la nueva página principal no toque esa ruta).
4. Rollback: mantener la versión anterior del sitio publicada hasta la aprobación (el dominio ya apunta al aula virtual; confirmar con el cliente qué servirá de landing antes del corte).

## Open Questions

- ¿Qué página sirve de landing actual en `proinocuidad.com` y quién controla el DNS/hosting? (afecta solo al despliegue final, no al desarrollo)
- Dirección exacta de la oficina (hoy "Trujillo, La Libertad, Perú" + "Próximamente").
- Confirmación final del cliente sobre titular de los métodos de pago ("Claudia Rubio Jiménez" para todos, excepción registrada al PDF).
- **Ficha del curso EN VIVO (pendiente del cliente):** el PDF no trae ninguna ficha con modalidad "En vivo"; el flyer disponible (DIGESA/SENASA, edición ZOOM de 32 h) corresponde a una edición en vivo del curso 4 y está reservado a la pestaña "En vivo". El dueño pedirá al cliente la ficha oficial del curso EN VIVO; cuando llegue, incorporarla en la pestaña "En vivo" (hoy "Próximamente") con su ficha de 9 bloques, y pedir además el flyer asíncrono del curso 4.
