# CHANGELOG

Todos los cambios notables del sitio web de Proinocuidad se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/).

## 2026-10-12 (listados de cursos en HTML estático)

### Changed

- Listado de Cursos (`#lista-cursos`, 8 tarjetas) y "Cursos destacados" del Inicio (`#cursos-destacados`, 4 tarjetas): ahora llegan en el HTML inicial, generados por `tools/generar-listados.mjs` desde `assets/js/cursos-data.js`. Se retiraron los bloques JS que construían las tarjetas; las pestañas Asíncronos/En vivo no cambian. Sin cambios de textos, precios, enlaces, flyers ni diseño. Regenerar con `node tools/generar-listados.mjs`; no editar las tarjetas a mano.

### Verified

- Tarjetas estáticas idénticas al DOM que generaba el JS (comparación antes/después: 8/8 y 4/4 sin diferencias). Listados visibles con JavaScript deshabilitado, con enlace a cada ficha. Pestañas conmutan y conservan las 8 tarjetas; Inicio sin errores de consola. Regeneración idempotente.

## 2026-10-12 (desborde horizontal en "Quiénes somos" en móvil)

### Fixed

- Bloques de dos columnas ("Quiénes somos" en Inicio y Nosotros, y secciones de Servicios): la columna ya no se sale de la pantalla en móvil y tableta. Antes el desborde era de 9 a 18px en 360 y 390px.
- Imágenes de estos bloques con proporción conservada y ancho máximo del 100% de su columna.
- Recorte horizontal de las secciones con bloques de dos columnas, para contener el desplazamiento inicial de la animación de entrada. No cambia el aspecto en reposo.

## 2026-10-12 (footer centrado y tarjetas en una columna en móvil)

### Changed

- Footer en móvil (≤560px): logo, textos, listas, contacto, redes y línea de derechos centrados. El desplazamiento de hover de los enlaces se desactiva en móvil.
- Tarjetas de Cursos, Servicios e Inicio ("Cursos destacados" y "Nuestros servicios"): una sola columna hasta 860px (antes dos desde 561px). Escritorio no cambia.

### Verified

- Auditoría responsive en 13 páginas y 6 anchos (360 a 1280px). Pendientes fuera de alcance: imagen de "Quiénes somos" (`.identidad-grid`) que desborda 9 a 18px en 360 y 390px en Inicio, Nosotros y Servicios; y ninguno en tarjetas.

## 2026-10-11 (entrada animada en bloques de dos columnas)

### Added

- Hero de Inicio y bloques de texto e imagen (Inicio, Nosotros, Servicios) con entrada suave: texto desde la izquierda, imagen desde la derecha. Respeta movimiento reducido y no oculta contenido sin JavaScript. Sin cambios de textos ni SEO.

## 2026-10-11 (hover azul en botones Ver todos)

### Changed

- Botones "Ver todos los cursos" y "Ver todos los servicios" de los submenús: el hover pasa de rojo a azul oscuro (#0b1257); la flecha se muestra siempre, junto al texto y centrada (SVG de trazo grueso), y se desplaza al pasar el cursor. Sin cambios de tamaño, texto ni enlaces. Sin cambios SEO.

## 2026-10-11 (submenús Servicios y Cursos compactos)

### Changed

- Submenús Servicios y Cursos: paneles de 460px con ítems compactos, ícono de 44px en cuadro y altura uniforme. El submenú Cursos muestra solo los 4 cursos destacados del Home. "Ver todos" a 13px y ancho completo; 1 columna en móvil. Aplicado en las 13 páginas y en la plantilla de fichas; las fichas regeneradas solo cambian el bloque de menú. Textos y enlaces de cada página conservados. Sin cambios SEO en el contenido.

## 2026-10-11 (misión, visión y valores en tarjetas)

### Changed

- Nosotros: la sección Misión, visión y valores pasa a tres tarjetas con cabecera de color, ícono circular sobre el borde y bullets rojos; misma altura entre tarjetas y efecto hover (elevación e ícono rojo); 1 columna en móvil. Textos sin cambios, paleta del sitio. Sin cambios SEO.

## 2026-10-11 (íconos SVG en botones)

### Changed

- Íconos SVG de 18px en botones: "Más información" (+) y "WhatsApp" en tarjetas de curso, "Consultar por WhatsApp" y "Ver cursos" en el hero de Inicio, y "Aula Virtual" en el menú de cabecera. El "+" de "Más información" es un círculo contenedor (⊕). El ícono de "Aula Virtual" queda centrado verticalmente. Sin cambios de colores, destinos ni SEO.

## 2026-10-11 (botones de tarjetas apilados)

### Changed

- Las tarjetas de curso apilan sus botones al 100% ("+ Más información" y WhatsApp) con tipografía regular en una línea. Sin cambios de colores, destinos ni SEO.

## 2026-10-11 (radio global 4px en botones)

### Changed

- Todos los botones rectangulares (`.btn`, pestañas, Aula Virtual, mega-menú) usan `border-radius: 4px`. Solo cambia el radio; colores, bordes y sombras intactos. Botones circulares (redes, flotantes) e insignias sin cambios. Sin SEO.

## 2026-10-11 (fotos de fondo en heroes estilo Crecepe)

### Changed

- Los heroes de Servicios, Nosotros, Noticias y Cursos usan foto de fondo con overlay azul marino. Fotos libres Pexels autoalojadas en AVIF: Servicios (https://www.pexels.com/photo/5953804/), Nosotros (https://www.pexels.com/photo/2889093/), Noticias (https://www.pexels.com/photo/8877381/), Cursos (https://www.pexels.com/photo/8761327/). Sin cambios de textos ni SEO.
- Las 8 fichas llevan foto temática propia con overlay (diplomado 2889347, legislación 7054502, BPM/POES 39839900, HACCP DIGESA 8940349, Codex 2889193, higiene 18631424, FSSC 38336747, auditor 28196491; URLs base https://www.pexels.com/photo/<id>/).

## 2026-10-11 (hero de fichas unificado estilo Servicios)

### Changed

- Las 8 fichas muestran migas "Inicio / Cursos / <curso>" y la descripción bajo el título, como el hero de Servicios. Se elimina la etiqueta del hero (la modalidad sigue en Datos generales). Sin cambios de contenido, URLs ni SEO.

## 2026-10-11 (migas estilo Crecepe en Servicios)

### Changed

- El hero de Servicios muestra migas "Inicio / Servicios" sobre el título, como las páginas de Crecepe. Solo Servicios; sin cambios de textos, URLs ni SEO.
- Extensión: mismo bloque de migas en Nosotros ("Inicio / Nosotros"), Noticias ("Inicio / Noticias y eventos") y el índice de Cursos ("Inicio / Cursos").

## 2026-10-11 (scrollbar personalizada estilo Crecepe)

### Changed

- Barra de desplazamiento delgada en rojo corporativo con hover rojo oscuro, como la de Crecepe. Solo CSS, sin cambios SEO.

## 2026-10-11 (botones flotantes estilo Crecepe a la izquierda)

### Changed

- El botón flotante de WhatsApp usa el icono SVG oficial (58 px, sombra verde) a la izquierda, como el botón principal de Crecepe. Mismo enlace de chat.
- Nuevo botón circular azul para volver arriba, a la derecha; aparece al bajar y se oculta en el inicio (JS mínimo en `main.js`, sin cambios de librerías).
- Sin cambios de enlaces, textos ni SEO.

## 2026-10-11 (rediseño del footer con iconos de redes)

### Changed

- Los enlaces del footer y la barra superior ya no subrayan en hover/foco; el hover es por cambio de color.
- Las redes sociales (Facebook, YouTube, Instagram, LinkedIn y comunidad WhatsApp) usan iconos SVG en botones circulares en el footer y en la barra superior, con `aria-label` por red. Mismos enlaces y destinos.
- La barra de copyright ahora tiene fondo azul oscuro institucional (`#0b0e56`) con texto blanco.
- Los enlaces de contacto del footer usan texto blanco y los de la columna Enlaces muestran un guion rojo con desplazamiento al hover.
- La etiqueta "Teléfono/WhatsApp:" se acorta a "Contacto:" en footer y barra superior de todo el sitio.
- Sin cambios de textos, URLs, estructura ni SEO.

## 2026-10-11 (efecto de enlaces de tarjeta estilo Crecepe)

### Changed

- Los enlaces `.card-link` ("Saber más", "Leer la noticia completa") ya no usan el subrayado global en hover. Usan texto en 0.95rem y flecha SVG gruesa de 16 px (`stroke` 2.5) que se desplaza al pasar el cursor (gap 8px → 13px), como `.service-link` de Crecepe, en rojo corporativo. Sin cambios de `href`, textos ni SEO.

## 2026-10-11 (estilo de navegación, píldoras de sección y fuente)

### Changed

- Hover del menú de escritorio: los enlaces de nivel superior ya no usan fondo azul claro. Muestran texto azul con una línea roja animada debajo. Solo aplica con puntero en pantallas de más de 860 px. El botón "Aula Virtual" y el mega-menú no cambian.
- Cada encabezado de sección de Inicio, Servicios y Nosotros (11 en total) muestra una píldora con un nombre corto, por ejemplo "Casos reales".
- Tipografía Outfit en todo el sitio, alojada en `assets/fonts/outfit-latin-wght.woff2` (archivo variable para los pesos 400 a 800). Ya no se usa la fuente del sistema. Los botones de formulario también heredan la fuente.

## 2026-10-10 (ajuste del logo en el encabezado)

### Changed

- Retirado el texto "Proinocuidad / Consultoría alimentaria" del encabezado de las 13 páginas y de la plantilla del generador, porque el logo ya lo incluye. Se eliminaron las reglas CSS `.brand span`.
- `assets/img/logo-proinocuidad.png` recortado sin margen transparente (500×500 → 448×156), para que el logo se vea a su tamaño real en el encabezado. El original se conserva en `_archivo/logo-proinocuidad-sin-recorte.png`.

## 2026-10-10 (reemplazo de logo y favicon)

### Changed

- Logo del sitio reemplazado por la versión sin fondo (`assets/img/logo-proinocuidad.png`, 500×500). El logo anterior se conserva en `_archivo/logo-proinocuidad-anterior.png`.
- Favicon: `<link rel="icon">` apunta ahora a `assets/img/favicon.ico` (16, 32 y 48 px) y el `<link rel="apple-touch-icon">` a `assets/img/apple-touch-icon.png` (180×180), en las 13 páginas y en la plantilla del generador. `favicon.png` se conserva en `_archivo/favicon-anterior.png`.

## 2026-10-10 (estructura base de SEO)

### Added

- `sitemap.xml` con las 13 páginas públicas (dominio `https://proinocuidad.com`).
- `robots.txt` que permite el rastreo y declara el sitemap.
- `<link rel="canonical">` y `<meta property="og:url">` en las 13 páginas.
- JSON-LD `Organization` en la página de Inicio.
- JSON-LD `Course` en las 8 fichas de curso (horas, precios en PEN y USD), generado por `tools/generar-fichas.mjs`.

### Changed

- `FOTOS-(1)/` y `pagina web.pdf` movidos a `_archivo/` (material fuente, no publicado). No se borraron.
- Referencias en `STRUCTURE.md`, `assets/js/cursos-data.js` y `tools/generar-fichas.mjs` actualizadas a la nueva ruta.
- Las 8 fichas de curso regeneradas: solo cambió el `<head>`; el contenido visible es idéntico.
- `og:image` de las 12 páginas (Inicio, Nosotros, Servicios, Noticias y 8 fichas) reemplazado por `proinocuidad-og-1200x630.png` (1200×630), con URL absoluta. Antes apuntaba al logo.

## 2026-10-10

### Added

- Sitio web corporativo completo de Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.:
  - Página Inicial con el eslogan oficial, cifras de la empresa, servicios destacados,
    cursos destacados y la noticia vigente.
  - Página Nosotros (quiénes somos, RUC 20615307603, fundación, misión, visión y valores).
  - Página Servicios con los 4 servicios y los 3 casos reales de capacitación
    (Agroindustrial Laredo S.A., Productos Razzeto & Nestorovic S.A.C., Cevichería Dsumare).
  - Sección Cursos con pestañas Asíncronos / En vivo y fichas de detalle para los 8 cursos
    (datos generales, beneficios, público objetivo, objetivo, temario desplegable,
    metodología con aula virtual, inversión, inscripción online y medios de pago).
  - Página Noticias y eventos con la nota vigente de DIGESA (vigencia indeterminada del HACCP).
  - Footer global en todas las páginas: contacto, horario, ubicación, redes sociales,
    comunidad de WhatsApp y acceso al Aula Virtual.
- Favicon con el ícono institucional y metadatos de compartir en todas las páginas.

### Changed

- La pestaña "En vivo" del listado de cursos muestra ahora un aviso de que
  **no hay cursos en vivo por el momento** (anteriormente presentaba el flyer de una
  edición pasada por Zoom). Los cursos disponibles siguen en la pestaña Asíncronos.

### Pendientes (a la espera de datos del cliente)

- Botón de pago en línea (Culqi): pendiente el enlace real por curso.
- Medios de pago informativos: pendiente el número real de Yape/Plin.
- Tarjeta del curso "HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)":
  pendiente un flyer de modalidad asíncrona.
- Pestaña "En vivo": pendiente la ficha oficial del cliente cuando haya una nueva oferta.
- Dirección exacta de la oficina: se muestra "Próximamente".
