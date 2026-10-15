# CHANGELOG

Todos los cambios notables del sitio web de Proinocuidad se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/).

## 2026-10-15 (CSS: revertido fix de Antigravity)

### Removed

- Revertida la regla `.ficha-main-col > .ficha-seccion:last-child { margin-bottom: 0; }` que Antigravity alcanzó a aplicar antes de agotar su cuota (no hubo bisección ni verificación). El CSS quedó byte-idéntico a su respaldo (`/tmp/opencode/respaldo-prefooter-antigravity/main.css`).

## 2026-10-15 (Fichas: formulario de inscripción embebido)

### Added

- Cada ficha incluye debajo de "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" (`#form-inscripcion`): curso precargado, datos, voucher (archivo), checkbox "Deseo comprobante de pago" → Boleta/Factura (factura exige RUC de 11 dígitos y razón social, con bloqueo de envío), conformidad y envío vía FormSubmit a `administracion@proinocuidad.com`. "Matricularme Ahora" hace scroll interno; Google Form queda como respaldo. Generado vía `tools/generar-fichas.mjs` en las 8 fichas. Verificado en 1280 y 390 sin desborde.

## 2026-10-15 (CSS: restaurado bloque moderno de fichas)

### Fixed

- `assets/css/main.css` había quedado revertido a la versión del commit (sin el bloque moderno de fichas: layout 2 columnas, stats, pagos, sidebar ni fixes de desborde). Restaurado byte por byte desde el respaldo `/tmp/opencode/respaldo-ficha-intermedio/main.css` (1479 líneas, llaves balanceadas). JS y fichas no fueron afectados. Verificado: ficha del diplomado en 1280 píxel-idéntica a la referencia (RMSE 0).
- El respaldo era previo al fix intermedio, por lo que tras restaurar se re-aplicó el bloque 681–1040px (`min-width: 0`, wrap en pagos/QR, grids a 1 columna) y se verificó en 900px sin desplazamiento horizontal. Respaldo actualizado al estado bueno.

## 2026-10-15 (Fichas: estilo moderno del diplomado en los 8 cursos)

### Changed

- Las 8 fichas de cursos usan el layout moderno de 2 columnas con sidebar sticky (stats, beneficios, objetivo/público, temario por módulos, metodología por pasos, tarjetas de pago con QR, inscripción y matrícula con flyer propio, precios, CTAs e incluidos). Cada ficha conserva su contenido y datos propios (horas, sesiones, temario, precios, flyer y fondo hero); "Competencias del Egresado" solo en el diplomado.
- El layout vive ahora en `tools/generar-fichas.mjs` (plantilla + bloques compartidos con parámetros por curso): el diplomado vuelve a generarse con el generador y termina la excepción manual. Verificado: diplomado regenerado píxel-idéntico al manual en 1280, fichas cortas revisadas en 1280 y 390 sin desborde.

## 2026-10-15 (Ficha: sin desplazamiento horizontal en rango intermedio)

### Fixed

- La ficha del diplomado ya no tiene desplazamiento horizontal en desktop redimensionado (768/900px): `min-width: 0` extendido a los grids, filas de pago envueltas, bloque QR con wrap y grids de pagos/metodología apilados en el rango 681–1040px. Solo CSS (`assets/css/main.css`); desktop ancho (2 columnas + sticky) y móvil 360/390 sin cambios. Verificado con capturas en 768, 900, 1280 y 360.

## 2026-10-15 (Ficha: sin desplazamiento horizontal en móvil)

### Fixed

- La ficha del diplomado ya no tiene desplazamiento horizontal en 360/390px: la fila del CCI y el botón "Copiar CCI" se envuelven, el badge "Internacional" baja dentro de su tarjeta, se redujo el padding del temario en móvil y los hijos de los grids llevan `min-width: 0`. Solo CSS (`assets/css/main.css`, media ≤680px); sin cambios de contenido ni de desktop (sticky del sidebar intacto). Verificado con capturas en 360, 390 y 1280.

## 2026-10-14 (Cursos: rediseño moderno de ficha del Diplomado SGCIA)

### Added

- **Layout de 2 columnas con Sidebar Sticky:** Estructura moderna (`.ficha-layout`) con área principal de contenidos (70%) y columna lateral fija al hacer scroll (30%) con flyer oficial, precios destacados (`S/ 120` y `US$ 37`), botones directos de inscripción/WhatsApp y checklist de beneficios incluidos.
- **Barra de Métricas Clave (Stats Grid):** 4 tarjetas destacadas con iconos SVG para horas (384 h), módulos (6), modalidad (100% asíncrono) y certificación oficial con QR.
- **Grid de Beneficios:** Tarjetas visuales con micro-interacciones hover para aula virtual 24/7, material editable/descargable, ritmo flexible y respaldo de certificación.
- **Grid de Competencias del Egresado:** Formato a 2 columnas con checkmarks SVG y acentos normativos (HACCP, ISO 9001, ISO 22000, BRCGS, ISO 19011).
- **Tarjetas Interactivas de Métodos de Pago:** Secciones diferenciadas para billeteras digitales (Yape / Plin), transferencia bancaria BBVA con número y CCI, abonos internacionales (PayPal / Western Union), pago online Culqi y bloque integrado con código QR.
- **Logos de pago optimizados y nítidos:** Se sustituyeron las imágenes antiguas por versiones vectoriales oficiales en alta resolución con fondo transparente (BBVA 2019 oficial, Yape logotipo oficial, Western Union vector y logotipo oficial de Culqi SVG importado directo), eliminando espacios vacíos y ajustando el alto visual homogéneo al nivel de PayPal.
- **Función de copiado al portapapeles:** En `assets/js/main.js`, funcionalidad para botones `.btn-copiar` con feedback visual temporal ("¡Copiado!").
- **Acordeón animado y exclusivo en Temario Modular:** En `assets/js/main.js`, animación suave de apertura/cierre (`cubic-bezier`) para `.temario-modulo` y cierre automático del módulo previo al abrir uno nuevo.
- **Icono de Asesoría Tipo Call Center:** Icono SVG personalizado de atención al cliente / asesoría con auriculares en la tarjeta de contacto/facturas del sidebar.

### Changed

- Reemplazo de bloques de texto plano seriados con numeración romana por secciones visuales estructuradas (`.ficha-seccion`) con cabeceras uniformes (`.seccion-tag` con iconos SVG institucionales).
- Eliminación de emojis en toda la ficha a favor de iconografía vectorial SVG oficial.
- Optimización responsiva: en tablets y pantallas móviles (≤ 1040px y ≤ 680px), el layout se adapta limpiamente apilando el sidebar y las tarjetas en una columna.
- Actualización de datos de pago oficiales: número de Yape/Plin establecido en `971 625 142` (con botón de copiado directo) y titular de la cuenta BBVA corregido a `Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.`.
- Tarjeta de Pago QR optimizada: encuadre cuadrado y centrado geométrico perfecto del código QR (`qr-pago-bbva-zoom.webp`), y nuevo contenedor destacado (`.pago-titular-pill`) resaltando explícitamente a nombre de quién está la cuenta: `Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.`.

## 2026-10-14 (Cursos: flyer DIGESA/SENASA visible)

### Changed

- La tarjeta del curso HACCP DIGESA/SENASA en `cursos/index.html` muestra su flyer (`assets/img/flyer-curso-04-haccp-digesa-senasca.webp`, imagen del documento "pagina web.pdf") en lugar del aviso "Flyer en preparación".
- Se retiró la excepción `SIN_FLYER_SLUG` en `tools/generar-listados.mjs` y se regeneraron los listados (8 en cursos, 4 en inicio sin cambios).
- Nota: el flyer indica edición en vivo de mayo (32 horas); la ficha actual es asíncrona de 40 horas. Se muestra por decisión de Juan.
- La tarjeta de la noticia DIGESA en `index.html` (sección Noticias y eventos) no tenía imagen: se añadió la misma foto de portada (`assets/img/noticia-digesa-haccp.jpg`) con las píldoras Noticia/DIGESA, igual que en `noticias/index.html`.

## 2026-10-14 (Noticias: foto de portada arriba)

### Added

- Foto `assets/img/noticia-digesa-haccp.jpg` (220 KB) en la tarjeta de la noticia DIGESA-HACCP: Unsplash, licencia Unsplash (uso gratuito, comercial). Fuente: https://unsplash.com/es/fotos/equipos-de-procesamiento-industrial-en-un-entorno-de-laboratorio-_iB2Ou3hca4 (aprobada por Juan; autor no visible por bloqueo antibots de Unsplash, ver fuente).

### Changed

- Tarjeta `.nota-card` a layout vertical en escritorio: foto arriba a ancho completo (`object-fit: cover`, alto 300px) y texto debajo; etiquetas conservadas sobre la imagen con degradado.
- En móvil la imagen lleva más altura (260px).
- "Noticia · Regulación sanitaria" en píldora blanca dentro de la imagen (arriba) y "DIGESA" en texto blanco sobre la pastilla roja.
- Card de noticia al 80% de ancho y centrada en desktop; en móvil a ancho completo.
- Sin cambios en el contenido de la nota, migas, CTA ni footer.

## 2026-10-14 (Subpáginas de servicios: contenido visible)

### Added

- Contenido complementario visible en las 4 subpáginas: BRCGS Food Safety, FSSC 22000, certificación HACCP y registro sanitario, sin "Ver más" (decisión del dueño: el plegable no tiene sentido en estas páginas).
- Detalle por norma con base del docx ya publicado en `servicios/index.html`: alcance y listas en BRCGS (v9) y FSSC (ISO 9001/22000/FSSC/BRCGS); "Nuestro servicio comprende" en HACCP; requisitos, expediente y objetivo en registro sanitario, con aclaración de autoridad.

### Changed

- Registro sanitario (`servicios/registro-sanitario-digesa/`): resumen y meta description sin "en el menor tiempo posible"; se aclara que la aprobación depende de la autoridad sanitaria.
- Sin cambios en CSS/JS, `servicios/index.html`, menú, canonical, JSON-LD ni CTA final.

## 2026-10-14 (Servicios: descripción detallada con "Ver más")

### Added

- Servicio "3. Inspecciones higiénico-sanitarias" en `servicios/index.html`, con resumen, "Ver más" y aclaración de asesoría privada (texto del docx "servicios descripcion.docx").
- Imagen `assets/img/servicio-inspeccion-planta.jpg`: Anna Shvets, Pexels, licencia Pexels (uso gratuito, comercial). Fuente: https://www.pexels.com/photo/5953794/
- Detalle "Ver más" en Capacitación, Normativa, Sistemas de gestión y Registro sanitario, con el texto del docx.
- Componente genérico `.ampliar` (CSS y JS) para los bloques "Ver más"; Nosotros conserva `nosotros-ampliar` para el sticky.

### Changed

- Los servicios pasan de 4 a 5 y se numeran 1 a 5 en el orden del docx.
- Registro sanitario: se retira "en el menor tiempo posible" y se aclara que la aprobación depende de la autoridad sanitaria.
- La imagen de cada bloque con "Ver más" abierto se mantiene fija al hacer scroll en escritorio (>860px), como en Nosotros.
- Al abrir un "Ver más", los demás abiertos en la página se cierran con la misma animación.

### Pendiente

- Revisión visual en escritorio y 390px (tarea 4.3 del change).
- El menú desplegable de las 18 páginas sigue diciendo "Alimentos y bebidas en el menor tiempo posible" (fuera de este change).

## 2026-10-14 (Ajustes de Nosotros, topbar, footer y WhatsApp flotante)

### Added

- Imagen sticky en escritorio (>860px) en la sección "Quiénes somos" de `nosotros/index.html`, activa solo cuando "Ver más" está abierto (regla `:has()` en `main.css`).
- Etiqueta "Envíanos un mensaje!" al pasar el mouse (o enfocar) el botón flotante de WhatsApp, con borde verde oscuro. Aplicado en las 18 páginas y en `tools/generar-fichas.mjs`.

### Changed

- Foto de "Quiénes somos" en `nosotros/index.html` e `index.html` (home): ahora `nosotros.webp` (raíz del sitio). Texto alternativo actualizado.
- Topbar de todas las páginas: se añade el RUC 20615307603 después del correo.

### Removed

- Línea "Dirección exacta: Próximamente" del footer en todas las páginas y en `tools/generar-fichas.mjs`.

### Pendiente

- Confirmar origen y licencia de `nosotros.webp` (no está registrado con URL fuente, como exige la política de fotos).

## 2026-10-14 (Nosotros: descripción ampliable)

### Added

- Bloque "Ver más" (`<details>`) debajo de "Quiénes somos" en `nosotros/index.html`, con la descripción institucional complementaria. Estilos `.nosotros-ampliar` en `main.css`. Change `nosotros-descripcion-ver-mas`.
- Botón "Ver más" con recuadro e ícono de ojo, y apertura/cierre animado en `main.js` (400 ms; respeta `prefers-reduced-motion`).

## 2026-10-14 (Piloto FX en ficha del diplomado)

### Revertido (2026-10-14)

- El piloto no gustó: generador, CSS, JS y las 8 fichas restaurados al estado previo (verificado byte por byte, regeneración idempotente). Change `ficha-piloto-diseno-fx` eliminado.

## 2026-10-14 (Meta description del inicio recortada)

### Changed

- Description de 157 a 127 caracteres (mismas keywords + "en Trujillo, Perú"); el slogan queda solo en el H1. Sin commit/push ni publicación.

## 2026-10-13 (CTA final estilo AZ en 6 subpáginas)

### Added

- Sección `.cta-sub` (badge, H2 único con keyword, texto, botones WhatsApp y "Ver todos los servicios") al final de las 4 páginas de detalle, la guía y Nosotros. Fondo y botones existentes.
- En `servicios/index.html` la sección `.cta-sub` reemplaza la tarjeta de cierre (el acceso a la guía se conserva como botón secundario).

### Verified

- H2 únicos, un `<h1>` por página, enlaces relativos correctos (incluida corrección `../servicios/` en guía y nosotros), llaves balanceadas. Sin commit/push ni publicación.

## 2026-10-13 (Refinamiento del CTA de la home)

### Changed

- Tarjeta del CTA: título a 1.4rem centrado con descripción centrada y botones a ancho completo con iconos (soporte y sobre).
- Nota de la tarjeta: "Escríbenos y recibe una propuesta personalizada. O llámanos directo." (`tel:+51981365982` en azul oscuro), sin plazos.
- Chips de contacto con color (WhatsApp verde, resto blancos con glifo azul oscuro); "inocuidad" en `#ff8f96`.

### Removed

- Subrayado al hover sobre el número de WhatsApp del bloque.

### Verified

- Un solo `<h1>`, iconos 18px por regla existente, llaves balanceadas. Archivos del change: `index.html` (bloque CTA) y `assets/css/main.css`. Sin commit/push ni publicación.

## 2026-10-13 (Banners 15% más compactos)

### Changed

- Banners en escritorio: `min-height: clamp(306px, 46.75vh, 442px)` y título `clamp(2.04rem, 3.4vw, 2.72rem)` (−15% exacto). Overlay, efecto fijo, breakpoint y móvil intactos.

### Verified

- Llaves balanceadas, valores viejos fuera, dos líneas cambiadas en `assets/css/main.css`. Sin commit/push ni publicación.

## 2026-10-13 (Títulos de banner enriquecidos con palabra clave)

### Changed

- `h1` descriptivos en los 4 índices (Servicios, Cursos, Nosotros, Noticias) y palabra clave resaltada con `<span>` en esos 4 más las 4 páginas de detalle y la guía. Fichas y Hero intactos.
- `.page-head h1 span` en `#ff8f96` (tono ya usado en el hover de la barra superior).

### Verified

- Un solo `<h1>` por página, sin enlaces rotos, llaves CSS balanceadas. Sin commit/push ni publicación.

### Fixed (2026-10-13)

- Botones del CTA de subpáginas con icono: soporte en WhatsApp, capas en "Ver todos los servicios" y libro en "Leer la guía" (SVG inline, 18px por regla `.btn svg` existente).

- Imagen de "Quiénes somos" en Nosotros con borde redondeado (la sección adopta la clase `identidad`, igual que sistemas).
- Pestañas de Cursos con iconos: reproducir en "Asíncronos" y señal en vivo en "En vivo" (SVG inline, 16px).
- Chips de modalidad en cards (Cursos e Inicio) con el icono de "Asíncronos" vía `chipModalidad()` en `tools/generar-listados.mjs`; regeneración idempotente.

## 2026-10-13 (CTA final en home, banners amplios y header no fijo en móvil)

### Added

- Bloque final de contacto en `index.html` (solo home): título con palabra resaltada, 4 contactos reales con ícono, tarjeta con botones "Solicitar asesoría por WhatsApp" y "Escríbenos un correo", y nota de horario. Fondo oscuro con `normativa-higiene-planta.jpg`, paleta y radios propios.

### Changed

- Banners de subpágina en escritorio (`min-width: 861px`): `min-height: clamp(360px, 55vh, 520px)`, contenido centrado y título `clamp(2.4rem, 4vw, 3.2rem)`; overlay, efecto fijo y móvil intactos.
- Cabecera (`.site-header`) con `position: relative` en ≤860px; `sticky` intacto en escritorio y anclaje del menú móvil conservado.

### Verified

- Un solo `<h1>` en home, enlaces wa.me/mailto correctos, CTA ausente en subpáginas, llaves CSS balanceadas, sin colores ni fuentes de Crecepe. Archivos del change: `index.html` (sección añadida, 0 líneas eliminadas), `assets/css/main.css` (estilos `cta-*`, tamaño de banners, header móvil) y `CHANGELOG.md`. Sin commit/push ni publicación.

## 2026-10-13 (Banners con fondo fijo y barra oculta en móvil)

### Changed

- Barra superior (`.topbar`) oculta cuando el ancho es ≤860px; sigue en el HTML y visible en escritorio. El teléfono y correo permanecen en el footer.
- Banners de subpágina (`.page-head--servicios`, `--nosotros`, `--noticias`, `--cursos`) con `background-attachment: fixed` en escritorio; vuelven a `scroll` en ≤860px y con `prefers-reduced-motion`. Sin cambios en el Hero, las fichas ni el HTML.

### Verified

- Llaves CSS balanceadas; Hero y fichas no usan las clases de banner; Cursos conserva un solo `<h1>` y sin enlaces rotos. Diff propio limitado a `assets/css/main.css`. Sin publicación.

## 2026-10-13 (Mejora visual de Servicios: fotos, marco uniforme y cierre)

### Changed

- Fotos de normativa y sistemas en `servicios/index.html` sustituidas por versiones de mayor resolución (1600 px de ancho): `normativa-higiene-planta.jpg` y `sistemas-operaria-planta.jpg`. Las anteriores se conservan porque `index.html` las sigue usando en sus tarjetas.
- Las 4 imágenes de servicio comparten marco (radio `--radio`, sombra) y relación de aspecto 4:3; la sección de sistemas adopta la clase `identidad`.
- Bloque de cierre "¿Quieres entender primero la base?" rediseñado como tarjeta centrada con título, texto y botón a la guía, con componentes existentes y sin colores nuevos.

### Fotos (licencia Pexels: uso comercial permitido, sin atribución obligatoria)

- `normativa-higiene-planta.jpg`: https://www.pexels.com/photo/woman-in-uniform-working-on-food-industry-factory-5953687/
- `sistemas-operaria-planta.jpg`: https://www.pexels.com/photo/food-industry-workers-5964489/

### Verified

- Un solo `<h1>`, sin enlaces internos rotos, llaves CSS balanceadas y diff limitado a `servicios/index.html`, `assets/css/main.css` y las 2 fotos nuevas. Sin cambios en metadatos, sitemap ni producción.

## 2026-10-13 (SEO por keywords en local: servicios, guía y metadatos)

### Added

- Páginas de servicio en `servicios/`: registro sanitario DIGESA, certificación HACCP, implementación FSSC 22000 y BRCGS Food Safety. Cada una con un único `<h1>`, canonical propio y JSON-LD `Service`. Texto solo del documento base, sin precios ni plazos.
- Guía `inocuidad-alimentaria/`: concepto, programas BPM/POES/HACCP y normativa citada en los cursos.
- Enlaces desde `servicios/index.html` a cada servicio y a la guía. Cinco URLs nuevas en `sitemap.xml` (de 13 a 18).

### Changed

- `<title>` y meta description de Inicio, Nosotros, Cursos y Servicios dentro de rango (título ≤ 60, descripción 120–160).
- Fichas de curso: título y descripción SEO propios (`seoTitle` y `seoDesc` en `tools/generar-fichas.mjs`). El `h1` y el contenido visible no cambian.

### Fixed

- Títulos de fichas sin "| Proinocuidad" repetido; antes salía dos veces.

### Verified

- 18 páginas HTML: un `<h1>`, canonical presente, títulos ≤ 60, descripciones 120–160 y sin enlaces internos rotos.
- Regeneración de fichas idempotente. Diff frente al respaldo: solo cambian `<title>`, `og:title` y `description`.
- Sin cambios en CSS ni JS. Sin publicación: los cambios viven en el repo local; `proinocuidad.com` no se modificó.
- Volúmenes de referencia de SE Ranking (Perú, octubre 2026); re-medir antes de publicar.

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
