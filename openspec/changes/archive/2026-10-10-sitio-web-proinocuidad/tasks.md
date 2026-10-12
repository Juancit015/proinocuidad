# Tasks

Orden impuesto por el dueño: **el Home se construye primero** y se avisa al terminar (tarea 2.9), antes de continuar con el resto.

## 1. Preparación de recursos y estructura base

- [x] 1.1 Crear la estructura del sitio (`index.html`, `assets/css`, `assets/js`, `assets/img`) y la hoja de estilos base con la paleta institucional (#101477, #AD343B, #252525) como variables CSS. Verificar abriendo la página en el navegador y comprobando los colores.
- [x] 1.2 Copiar, renombrar y optimizar las imágenes del material fuente en `assets/img/`: logo, 8 flyers con nombre de su curso (mapeo documentado), QR BBVA, fotos reales de capacitaciones (Laredo ×2, Zoom Razzeto, Dsumare), fotos de consultoría y decorativas, y logos de pagos (Yape, Plin, BBVA, Western Union, `PayPal.svg.webp`). Verificar con `ls assets/img/` que cada archivo exista y listando el mapeo source → destino.
- [x] 1.3 Extraer a un archivo de datos los metadatos de los 8 cursos (nombre, slug, sesiones, horas, inversión S/ US$, flyer, modalidad); el contenido completo de cada ficha (temario, objetivo, beneficios, público, metodología) se materializa en el HTML de cada ficha en el grupo 4. Verificar revisando el archivo de datos con el listado de los 8 cursos y contrastando los metadatos con el PDF.

## 2. Página Inicial (Home) — primera a construir

- [x] 2.1 Implementar la barra de navegación global con logo, enlaces (Inicio, Nosotros, Servicios, Cursos, Noticias, Aula Virtual) y el mega-menú al hover (panel con submenús agrupados; JS mínimo para teclado/Escape; acordeón en móvil). Verificar: hover en "Servicios" despliega panel con los 4 servicios; "Aula Virtual" abre `proinocuidad.com/login/` en pestaña nueva; la redimensión a móvil muestra botón de menú y acordeón.
- [x] 2.2 Implementar el hero del Home con el slogan "¡Formamos profesionales, construimos inocuidad!" y CTA a Cursos. Verificar en navegador.
- [x] 2.3 Implementar la sección Servicios destacados (4 tarjetas con imagen genérica temática, textos del PDF, enlace a la página de Servicios). Verificar clic en cada tarjeta.
- [x] 2.4 Implementar la sección Cursos destacados (tarjetas con flyer, nombre e inversión, enlazadas a las futuras fichas; enlace "Ver todos los cursos"). Verificar estructura de enlaces.
- [x] 2.5 Implementar la sección Noticias en el Home con la nota de DIGESA (título, resumen, enlace a la página completa). Verificar el enlace.
- [x] 2.6 Implementar el footer global con email `administracion@proinocuidad.com`, WhatsApp `wa.me/51981365982`, horario L–V 8 AM–8 PM, ubicación "Trujillo, La Libertad, Perú" (dirección: "Próximamente"), redes (Facebook, YouTube, Instagram, LinkedIn), comunidad WhatsApp `chat.whatsapp.com/GXh0wdFZWgEGz2dlpCTPvN` y la marca con razón social. Verificar cada enlace con clic.
- [x] 2.7 Responsive del Home completo (móvil/tablet/escritorio). Verificar revisando las tres vistas en el navegador.
- [x] 2.8 Revisión visual del Home frente a la paleta y al contenido del PDF (sin datos inventados). Verificar con una lista de chequeo página por sección.
- [x] 2.9 Informar al dueño que el Home está terminado y pausar para su aprobación antes del resto (requisito explícito: "empieza primero por el home… una vez que termines comentamelo"). Verificar consignando la aprobación en la conversación.

## 3. Sección Cursos: listado y pestañas

- [x] 3.1 Crear `cursos/index.html` con pestañas "Asíncronos" (activa) y "En vivo" ("Próximamente" sin cursos). Verificar: pestaña por defecto Asíncronos; al cambiar a "En vivo" se ve el aviso.
- [x] 3.2 Renderizar las 8 tarjetas de curso (flyer asignado, nombre completo, modalidad grabada, certificación en horas, inversión S/US$) con botones "Más información" (→ ficha) y "WhatsApp" (`wa.me/51981365982`). Verificar: 8 tarjetas; horas 40 (384 el diplomado); inversión correcta por curso.

## 4. Fichas de detalle de los 8 cursos

- [x] 4.1 Crear la plantilla de ficha (`cursos/<slug>/index.html`) con los 9 bloques ordenados: I Datos generales, II Beneficios, III Público objetivo, IV Objetivo (en el diplomado, también "Perfil del egresado" tras el objetivo), V Temario desplegable (`<details>` por módulo, cerrados con `<summary>`), VI Metodología (aula `proinocuidad.com/login/`, nota mínima 14/20), VII Inversión, VIII Inscripción online, IX Medios de pago. Verificar abriendo la ficha del diplomado mostrando el orden completo.
- [x] 4.2 Implementar el bloque de pagos: botón de pago Culqi (placeholder `#` con comentario TODO por curso) + bloque informativo con los 5 logos y titular "Claudia Rubio Jiménez" (número placeholder `+51 99999999` con TODO), datos BBVA y QR. Verificar: los 5 logos cargan; el botón Culqi levanta con el placeholder.
- [x] 4.3 Implementar el CTA "Solicitar más información" con el enlace público `https://docs.google.com/forms/d/1OoggGqBor_FDBcKoo807nPf0atujRvqqXrIqDhBiRpI/viewform`. Verificar que el enlace abre en pestaña nueva el formulario público (probar en incógnito).
- [x] 4.4 Publicar las 8 fichas con su contenido individual del PDF (legislación; BPM/POES/POE/HACCP; HACCP DIGESA-SENASA; BPM Codex 2022; PHS; HACCP FSSC 22000; auditor interno; diplomado). Verificar: contrastar 2 fichas completas con el PDF sin diferencias de contenido.
- [x] 4.5 Responsive y verificación de los desplegables de temario en las 8 fichas. Verificar expandir/contraer módulos en móvil.

## 5. Resto de páginas

- [x] 5.1 Crear `nosotros/` con quiénes somos (razón social, RUC 20615307603, fundación 29-oct-2023, +1000 capacitados), líneas Capacitación/Consultoría y Misión/Visión/Valores. Verificar contrastando con el PDF.
- [x] 5.2 Crear `servicios/` con los 4 servicios, imagen temática por servicio y los 3 casos reales con sus fotos (Laredo, Razzeto, Dsumare). Verificar clic en tarjetas y fotos cargadas.
- [x] 5.3 Crear `noticias/` con el listado (1 entrada) y la nota completa de DIGESA con fuente "Ministerio de Salud". Verificar navegación desde el Home.
- [x] 5.4 Completar el mega-menú con los ítems de Nosotros y Noticias y revisar todos los enlaces del sitio. Verificar con un rastreo de enlaces (ningún 404).

## 6. Cierre: placeholders, QA y lanzamiento

- [ ] 6.1 Reemplazar pendientes cuando el dueño los entregue: URLs de Culqi por curso y número real de Yape/Plin (hoy `+51 99999999`). Verificar: cada botón de los 8 cursos apunta a su enlace Culqi y el número publicado es el real.
- [x] 6.2 QA final cruzado con los specs: paleta, contenido del PDF, enlaces externos, horas académicas (384/40), formulario `/viewform`, aula virtual, footer y comunidad. Verificar recorriendo los 8 specs al menos con un chequeo observable por requisito y consignar los hallazgos.
- [ ] 6.3 Preparar el lanzamiento: metadatos SEO/title por página, favicon con el logo, y confirmar con el cliente la ruta de publicación en `proinocuidad.com` (el aula `/login/` no debe alterarse). Verificar títulos/OG por página y acordar el despliegue con el cliente.

## 7. Pendientes operativos documentados (no bloquean el archivado; se ejecutan cuando el cliente entregue los datos)

- [ ] 7.1 Incorporar la ficha oficial del curso EN VIVO que el cliente entregará (el PDF no trae ficha en vivo; solo el flyer ZOOM reservado en la pestaña "En vivo", según decisión del dueño). Verificar: la pestaña "En vivo" muestra el curso con su ficha de 9 bloques y queda activo el listado en vivo.
- [ ] 7.2 Incorporar el flyer asíncrono del curso DIGESA/SENASA cuando el cliente lo genere (hoy su tarjeta usa espacio de marca). Verificar: la tarjeta asíncrona muestra el flyer y la pestaña "En vivo" conserva el flyer ZOOM como referencia.
- [ ] 7.3 Alinear las horas académicas del formulario activo del cliente con el contenido publicado (sitio según PDF: 384 h / 40 h; formulario hoy dice 240 h / 32 h). Verificar: formulario y sitio coherentes.
