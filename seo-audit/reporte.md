# Auditoría SEO — proinocuidad.com

**Fecha:** 27 de noviembre de 2026
**Alcance:** auditoría de solo lectura. No se modificó ningún archivo del sitio ni de producción.
**Sitio:** 22 URLs públicas declaradas en `sitemap.xml` (20 páginas + 404 + verificación de Google).
**Stack:** HTML estático, sin build. LiteSpeed, PHP 8.3, sin CMS.

---

## 0. Resumen ejecutivo

El sitio está bien construido a nivel de HTML: 22/22 títulos y descripciones únicos, un solo H1 por página, 0 imágenes sin `alt`, 0 enlaces internos rotos, datos estructurados en 22/22 páginas y `llms.txt` presente. El problema no es la calidad de las páginas: es que **Google está indexando la URL equivocada**.

Ocho de las veintiuna variantes `.../index.html` están indexadas con canonical propio, y en esos ocho casos Google eligió la variante `.html` en lugar de la URL limpia que declara el sitemap. El caso más claro: `/servicios/` figura como «descubierta, actualmente sin indexar» mientras `/servicios/index.html` sí está indexada. La causa son los **542 enlaces internos** que apuntan a `.../index.html`.

A eso se suma que tres URLs del WordPress anterior (`/contact/`, `/portfolio/`, `/login/`) **siguen indexadas y hoy devuelven 404**; `/portfolio/` todavía registró 2 impresiones en posición 6 en los últimos 90 días.

El rendimiento móvil medido en laboratorio está por encima del umbral: LCP entre 3,5 y 5,4 s y CLS de hasta 0,13, con 149/149 imágenes sin `width`/`height` y sin `srcset`. La home transfiere 1.149 KB.

En local, no se encontró ficha de Google Business Profile y el sitio no publica dirección física ni `LocalBusiness`. La visibilidad orgánica es prácticamente nula: 9 impresiones y 1 clic en 90 días.

Los tres arreglos de mayor retorno son de esfuerzo bajo: **301 de `*/index.html` a la URL limpia**, **301 de las URLs heredadas de WordPress** y **dimensiones en las imágenes**. Los tres se hacen sin tocar contenido.

---

## 1. Método y límites

| Fuente | Uso | Estado |
|---|---|---|
| Rastreo local del repositorio | 23 archivos HTML, 149 imágenes, 248 enlaces internos | Completo |
| `curl` contra producción | Códigos HTTP, redirecciones, cabeceras, canonical en vivo | Completo |
| Google Search Console (API) | Indexación, consultas, páginas, países | Completo |
| Inspección de URLs (GSC) | Canonical elegido por Google por URL | 32 URLs inspeccionadas |
| Chromium real (Playwright) | LCP, CLS, peso transferido en móvil emulado | 5 páginas |
| PageSpeed Insights API | Datos de campo CrUX | **No disponible** (cuota agotada: HTTP 429) |
| SE Ranking MCP | Keywords, competidores, backlinks, AI Search, GBP | **No disponible** (plan vencido el 2026-11-12) |
| Google Autosuggest | Señales de demanda | Completo (10 consultas semilla) |

**Advertencia sobre SE Ranking:** la cuenta responde `status: expired`, con 97.918 unidades sin usar pero sin acceso a API. Por eso no hay volúmenes de búsqueda, dificultad, backlinks ni posiciones de competidores. Todo lo que dependía de esa fuente está marcado **«no disponible»** en este informe; no se estimó ni se inventó ninguna cifra.

---

## 2. Fase 1 — SEO técnico

### 2.1 Indexación y canonicalización

**T-01 · Google indexa la variante `.html` en lugar de la URL limpia** — Impacto **alto** · Esfuerzo **bajo**

Evidencia medida con inspección de URLs de GSC sobre las 21 variantes `.../index.html` de las URLs del sitemap:

| Resultado | Cantidad |
|---|---|
| Indexada como URL propia (canonical = ella misma) | **8** |
| Página alternativa con canonical adecuado | 7 |
| Google no reconoce la URL | 6 |

Las 8 indexadas con canonical propio:

```
/servicios/index.html
/cursos/index.html
/cursos/legislacion-sanitaria-alimentos/index.html
/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/index.html
/cursos/haccp-implementacion-certificacion-digesa-senasca/index.html
/cursos/bpm-prerrequisitos-codex-2022-iso-22002-1/index.html
/cursos/programas-higiene-saneamiento/index.html
/servicios/implementacion-fssc-22000/index.html
```

En las ocho, GSC devuelve `canonical_google` = la variante `.html`, aunque el `canonical` declarado en el HTML apunta a la URL limpia. Google está desoyendo el canonical.

El caso que mejor lo demuestra, cruzando las dos URLs:

- `https://proinocuidad.com/servicios/` → «Descubierta: actualmente sin indexar»
- `https://proinocuidad.com/servicios/index.html` → «Enviada e indexada»

Es decir: el hub de servicios está indexado, pero bajo una URL que no está en el sitemap y que nadie enlaza desde fuera.

**Causa raíz:** 542 enlaces internos apuntan a `.../index.html` (84 a `../index.html`, 60 a `../../index.html`, 30 a `../../servicios/index.html`, etc.). El generador `tools/generar-fichas.mjs` y las 10 páginas escritas a mano usan esa forma.

**Acción:** regla 301 en `.htaccess` (`RewriteRule ^(.*/)index\.html$ /$1 [R=301,L]`) y, en una segunda pasada, reescribir los enlaces del generador y de las páginas para evitar el salto.

---

**T-02 · Solo 9 de 22 URLs del sitemap están indexadas** — Impacto **alto** · Esfuerzo **medio**

Evidencia: `auditar_indexacion` sobre `https://proinocuidad.com/sitemap.xml` → 22 inspeccionadas, 9 indexadas, 13 sin indexar, 0 errores. Sitemap enviado el 2026-11-23, último rastreo el 2026-11-24, 0 errores y 0 advertencias.

Las 13 pendientes incluyen `/servicios/`, `/cursos/`, las 5 fichas que no están en la home y 4 páginas de servicio. Es coherente con T-01: la variante `.html` ocupa el lugar de la URL canónica.

**Acción:** resolver T-01 primero; después reenviar el sitemap y solicitar inspección de las URLs que sigan fuera. No existe API para pedir indexación de una URL suelta: el botón del panel es solo UI.

---

**T-03 · Tres URLs del WordPress anterior siguen indexadas y devuelven 404** — Impacto **alto** · Esfuerzo **bajo**

| URL | Estado en GSC | HTTP hoy | Último rastreo | Señal de tráfico |
|---|---|---|---|---|
| `/contact/` | Enviada e indexada | **404** | 2026-09-26 | — |
| `/portfolio/` | Enviada e indexada | **404** | 2026-08-28 | 2 impresiones, posición 6 (90 días) |
| `/login/` | No encontrada (404) | **404** | — | — |

`/portfolio/` conserva impresiones en posición 6 pese a devolver 404: Google aún no ha vuelto a rastrearla. Cada impresión es una visita perdida, y el resultado de búsqueda muestra el contenido viejo (testimonios inventados del tema «Flavita»).

**Acción:** 301 de `/contact/` y `/portfolio/` a la página equivalente actual (`/nosotros/` y `/cursos/`). `/login/` puede quedarse en 404 o redirigir a `/aula/login/`.

---

**T-04 · `/wp-login.php` y `/wp-admin/` devuelven 200 con una página de desafío** — Impacto **bajo** · Esfuerzo **bajo**

```
GET /wp-login.php  → 200, 745 B, "Checking your browser…"
GET /wp-admin/     → 200, 745 B, ídem
GET /test.php      → 404 correcto
```

No es un WordPress vivo: es una regla del hosting que intercepta esas rutas. El problema es que responde **200** (soft 404), también con user-agent de Googlebot. Ninguna página enlaza ahí, así que el riesgo es residual, pero conviene devolver 404/410.

---

**T-05 · El sitemap no declara `lastmod`** — Impacto **bajo** · Esfuerzo **bajo**

`grep -c lastmod sitemap.xml` → 0. Sin `lastmod`, Google decide por su cuenta cuándo volver. Añadirlo ayuda a que las 13 URLs pendientes se revisiten antes.

---

**T-06 · Spam heredado del WordPress** — Impacto **bajo** · Esfuerzo **bajo**

GSC reporta 74 URLs «sin indexar» que son artículos de casino y apuestas del WordPress comprometido (`/progressive-jackpots-how-to-win-big/`, `/1win-india-online-betting-and-casino-1win-app-3449/`, etc.). Ya no existen y devuelven 404, que es la respuesta correcta. No requieren acción; se apagan solas. Se documentan para que no se confundan con páginas del sitio en futuras revisiones.

---

### 2.2 Metadatos y encabezados

| Comprobación | Resultado | Veredicto |
|---|---|---|
| Páginas sin `<title>` | 0 / 23 | Correcto |
| Títulos duplicados | 0 | Correcto |
| Longitud de título | 33–60 caracteres | Correcto |
| Páginas sin `meta description` | 0 / 23 | Correcto |
| Descripciones duplicadas | 0 | Correcto |
| Longitud de descripción | 91–164 caracteres | Correcto |
| Páginas sin H1 | 0 / 23 | Correcto |
| Páginas con más de un H1 | 0 | Correcto |
| `lang` declarado | `es` en todas | Correcto |
| Canonical | 23/23, autorreferente y con la URL limpia | Correcto en el HTML; ignorado por Google (T-01) |

**M-01 · El H1 de la home no contiene la keyword principal** — Impacto **medio** · Esfuerzo **bajo**

H1 actual: «¡Formamos profesionales, construimos inocuidad!». El título sí lleva «Inocuidad alimentaria», pero el H1 no menciona el término. Es el único H1 del sitio sin la keyword del negocio.

**Acción:** conservar el eslogan y añadir el término, p. ej. «Formamos profesionales en inocuidad alimentaria». Cambio de una línea.

---

**M-02 · `/noticias/` es un hub de 269 palabras con un solo artículo** — Impacto **medio** · Esfuerzo **medio**

Evidencia: 269 palabras, 1 artículo enlazado, 0 H2. Un hub con un elemento no genera autoridad temática ni da motivos para volver. Es la única sección con potencial de contenido informativo y está vacía.

---

**M-03 · `/inocuidad-alimentaria/` tiene 408 palabras** — Impacto **bajo** · Esfuerzo **medio**

Es la página con intención informativa más clara del sitio («qué es la inocuidad alimentaria») y la más corta de las informativas. Compite en un término genérico con sitios de autoridad alta; con 408 palabras no tiene margen.

---

### 2.3 Enlazado interno

**E-01 · Cinco fichas y cuatro servicios reciben uno o dos enlaces internos** — Impacto **medio** · Esfuerzo **bajo**

Conteo de enlaces entrantes por página (rastreo local):

| Página | Enlaces entrantes |
|---|---|
| `/cursos/bpm-haccp-en-vivo/` | 1 |
| `/cursos/bpm-prerrequisitos-codex-2022-iso-22002-1/` | 1 |
| `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | 1 |
| `/cursos/programas-higiene-saneamiento/` | 1 |
| `/cursos/sistema-haccp-fssc-22000-codex-2022/` | 2 |
| `/servicios/implementacion-iso-22000/` | 1 |
| `/servicios/certificacion-haccp/`, `/brcgs-food-safety/`, `/registro-sanitario-digesa/`, `/implementacion-fssc-22000/` | 2 |
| Resto de páginas | 23 |

El salto de 1–2 a 23 no es mérito del contenido: son las 4 fichas destacadas y los enlaces del pie. Las otras cinco fichas solo existen en el listado de `/cursos/`.

Ninguna página es huérfana (profundidad máxima 2, todas alcanzables), pero la distribución de autoridad interna es muy desigual.

**Acción:** bloques «cursos relacionados» en cada ficha (3 enlaces) y «servicios relacionados» cruzados entre las 5 páginas de servicio. Sin contenido nuevo.

---

**E-02 · Sin migas de pan ni `BreadcrumbList`** — Impacto **bajo** · Esfuerzo **bajo**

0 páginas con `BreadcrumbList`. Las fichas están a dos clics de la home y no muestran la ruta. Añadirlo mejora la comprensión de la jerarquía y da un resultado enriquecido en móvil.

---

### 2.4 Datos estructurados

Presentes y válidos (JSON-LD, sin errores de parseo):

| Tipo | Páginas |
|---|---|
| `Organization` | 23 |
| `Course` + `FAQPage` | 9 fichas |
| `Service` + `FAQPage` | 5 servicios |
| `Article` | 1 noticia |
| `FAQPage` | 1 home |

**D-01 · No hay `LocalBusiness` ni dirección** — Impacto **alto** · Esfuerzo **bajo**

`Organization` incluye nombre, URL, logo, RUC, correo, teléfono y 4 perfiles sociales, pero no `address`, `geo`, `openingHours` ni `areaServed`. El sitio solo dice «Trujillo, La Libertad, Perú» en el pie, sin calle ni distrito. Para un negocio de servicios locales es la ausencia más costosa.

**D-02 · `identifier` no es la propiedad correcta para el RUC** — Impacto **bajo** · Esfuerzo **bajo**

Se usa `"identifier": "20615307603"`. El RUC es un identificador fiscal: corresponde `taxID`. `identifier` es válido pero genérico; los motores no lo cruzan con registros empresariales.

**D-03 · `Course` sin `hasCourseInstance` ni `inLanguage`** — Impacto **bajo** · Esfuerzo **bajo**

Las 9 fichas declaran `courseMode`, `timeRequired` y dos `offers` (PEN y USD). Falta `hasCourseInstance` (modalidad, fechas, ubicación) y `inLanguage`. Sin ellos se pierde la ficha de curso enriquecida en algunos formatos.

**D-04 · `offers` sin `url`, `availability` ni `validFrom`** — Impacto **bajo** · Esfuerzo **bajo**

Dos ofertas con precio 45 PEN y 15 USD, sin URL de compra ni disponibilidad. Google no puede enlazar la oferta.

**D-05 · `Organization` sin `foundingDate` ni `founder`; `Article` sin `dateModified`** — Impacto **bajo** · Esfuerzo **bajo**

La fecha de fundación (29 de octubre de 2023) ya está en el texto de `/nosotros/`, pero no en el marcado.

---

### 2.5 Rendimiento

Medición en Chromium real, móvil emulado 390×844, red 4G lenta (1,6 Mbps, 150 ms) y CPU 4× más lenta. **Datos de laboratorio**, no de campo: CrUX no está disponible (cuota de PageSpeed Insights agotada, HTTP 429) y el sitio tiene tan poco tráfico que probablemente no tenga datos de campo.

| Página | TTFB | FCP | LCP | CLS | Peso | Peticiones |
|---|---|---|---|---|---|---|
| `/` | 381 ms | 3.532 ms | **3.552 ms** | 0,012 | **1.149 KB** | 14 |
| `/cursos/` | 318 ms | 2.252 ms | 3.780 ms | 0 | 564 KB | 10 |
| `/cursos/haccp-...-senasca/` | 496 ms | 2.136 ms | 3.540 ms | **0,130** | 437 KB | 14 |
| `/servicios/certificacion-haccp/` | 416 ms | 2.600 ms | 4.548 ms | 0,001 | 338 KB | 7 |
| `/noticias/vigencia-indeterminada-haccp/` | 324 ms | 1.948 ms | 5.364 ms | 0 | 468 KB | 7 |

Umbrales de Google: LCP «bueno» ≤ 2,5 s, «pobre» > 4,0 s. CLS «bueno» ≤ 0,1.

**R-01 · LCP entre 3,5 y 5,4 s en móvil** — Impacto **alto** · Esfuerzo **bajo/medio**

El elemento LCP de la home es `assets/img/trio-profesional-hero.webp` (86 KB), sin `preload`, sin `fetchpriority="high"` y sin dimensiones. El de la ficha de HACCP es `ficha-haccp.avif` (170 KB), servido como fondo de una `section`. El retraso no viene del peso de esa imagen sino de que el navegador la descubre tarde: hay que parsear CSS y HTML antes de pedirla.

**Acción:** `fetchpriority="high"` y `<link rel="preload">` en la imagen hero; `width`/`height` en todas.

---

**R-02 · 149 de 149 imágenes sin `width` ni `height`** — Impacto **medio** · Esfuerzo **bajo**

Ninguna etiqueta `<img>` del sitio declara dimensiones. El resultado se mide: 0,130 de CLS en la ficha de HACCP, por encima del umbral de 0,1. El CSS reserva espacio en la mayoría de los casos, pero no en todos.

Fortaleza en cambio: **0 de 149 imágenes sin `alt`**.

---

**R-03 · Imágenes sobredimensionadas y sin formatos modernos** — Impacto **alto** · Esfuerzo **medio**

Peso real servido hoy:

| Archivo | Peso |
|---|---|
| `sistemas-operaria-planta.jpg` | 432,2 KB |
| `capacitacion-laredo-auditorio.jpg` | 272,3 KB |
| `capacitacion-cevicheria-dsumare.jpg` | 237,4 KB |
| `noticia-digesa-haccp.jpg` | 214,8 KB |
| `capacitacion-laredo-aula.jpg` | 208,7 KB |
| `conferencia-razzeto-zoom.jpg` | 160,1 KB |

Son JPEG servidos tal cual, sin `srcset`, sin `<picture>` y sin AVIF. Las 9 portadas de curso ya están en WebP (103–175 KB), pero tampoco tienen variantes de tamaño. La home transfiere 1.063 KB solo en imágenes.

**Acción:** convertir a AVIF/WebP con variantes de ancho (480/768/1200) y `srcset`. Hay skill `image-optimizer` en el entorno para hacerlo.

---

**R-04 · CSS y JS con `no-cache`** — Impacto **bajo** · Esfuerzo **bajo**

`main.css` (79.774 B) y `main.js` (34.673 B) se sirven con `Cache-Control: no-cache, must-revalidate`. Es deliberado y está documentado en `.htaccess` (evita revivir bugs tras cada deploy). No recomiendo cambiarlo sin una estrategia de versionado por hash. Las imágenes sí cachean 7 días.

Compresión correcta: la home pasa de 51.871 B a 9.063 B con gzip.

---

### 2.6 Rastreo, redirecciones y errores

| Comprobación | Resultado |
|---|---|
| URLs del sitemap que responden 200 | 22 / 22 |
| Enlaces internos rotos | 0 |
| Imágenes rotas | 0 |
| Redirecciones en URLs del sitemap | 0 |
| `http://` → `https://` | Correcto |
| `www` → sin `www` | Resuelve; canonical apunta a sin `www` |
| URLs sin barra final (`/cursos`) | 301 a `/cursos/` |
| 404 | Devuelve 404 real con página propia (`.htaccess` → `ErrorDocument 404 /404.html`) |
| `robots.txt` | `Allow: /`, `Disallow: /aula/`, sitemap declarado |
| `/aula/` | 200, bloqueada en `robots.txt` |
| TTFB de producción | 318–496 ms |

**Fortaleza:** la gestión de redirecciones y errores es correcta y el 404 es real, no un soft 404. Es la base sobre la que se apoyan los arreglos de T-01 y T-03.

---

## 3. Fase 2 — Keywords y canibalización

### 3.1 Lo que dice Search Console (90 días)

Rango: 2026-08-29 a 2026-11-26.

| Consulta | Clics | Impresiones | Posición |
|---|---|---|---|
| proinocuidad | 1 | 6 | 1,7 |
| digesa consulta registro sanitario | 0 | 1 | **4** |
| son confiables? | 0 | 1 | **2** |
| auditoria interna haccp | 0 | 1 | 16 |
| curso haccp online | 0 | 1 | 20 |
| haccp curso online | 0 | 1 | 22 |
| curso haccp con certificado | 0 | 1 | 36 |

**Total: 7 consultas, 9 impresiones, 1 clic, CTR 11,1 %.** Países: Perú 10 impresiones (posición 7,9), España 4, México 1, Singapur 1.

Por página: la home concentra 9 impresiones; el resto son 1–4 impresiones repartidas entre el diplomado, auditor interno, la noticia y registro sanitario.

**Lectura:** el sitio es prácticamente invisible en Google. Con 9 impresiones en 90 días no hay base estadística para hablar de canibalización ni de oportunidades de CTR. La herramienta de canibalización devolvió 0 clusters, coherente con este volumen.

### 3.2 Señales de demanda (Google Autosuggest, `hl=es&gl=pe`)

Sugerencias reales para semillas del negocio:

- `implementacion haccp` → «implementación de haccp en una empresa de alimentos», «curso implementacion haccp», «implementación del sistema haccp bpm y poes», «implementacion de sistema haccp en restaurantes»
- `curso haccp` → «curso haccp gratis con certificado», «curso haccp con certificado», «curso haccp universidad agraria la molina»
- `curso manipulacion de alimentos` → «curso manipulación de alimentos online», «curso manipulación de alimentos gratis», «curso manipulación de alimentos sena»
- `registro sanitario digesa` → «registro sanitario digesa consulta»

**K-01 · No hay página para «manipulación de alimentos»** — Impacto **medio** · Esfuerzo **medio**

Es la consulta con más demanda del sector en Perú y el sitio no tiene una página que la ataque: el término aparece dentro de `/servicios/` y en las fichas, pero no hay URL propia ni título que lo posicione. Sería la página nueva con mejor relación demanda/competencia del sitio.

---

**K-02 · «registro sanitario digesa consulta» posiciona en 4 sin página que lo responda** — Impacto **medio** · Esfuerzo **medio**

La consulta tiene intención de trámite (alguien quiere consultar el estado de su registro), no de contratar. La página actual (`/servicios/registro-sanitario-digesa/`) vende el servicio. Una guía que explique cómo consultar el registro en DIGESA capturaría esa visita y desde ahí enlazaría al servicio.

---

**K-03 · Volumen, dificultad y backlinks: no disponible**

Sin SE Ranking no hay cifras de volumen ni de dificultad para ninguna keyword. El `keywords.csv` adjunto trae solo las consultas medidas en GSC y las sugerencias de autosuggest, con la columna de volumen vacía y marcada `no disponible`.

---

## 4. Fase 3 — Competencia

Sin acceso a SE Ranking no hay posiciones ni tráfico de competidores. Lo que sí se puede afirmar es la estructura de la oferta, leída de sus propios sitios:

| Competidor | Sede | Foco | Modelo |
|---|---|---|---|
| **Expertum** (expertum.pe) | Lima | Catálogo amplio: BRCGS, FSSC, ISO 22000, auditores internos | B2B presencial/in house |
| **INSAQ** (insaq.com.pe) | Lima | HACCP, BRCGS, in house | B2B presencial/in house |
| **Food Consulting Perú** (foodconsultingperu.com.pe) | Lima | HACCP, BRCGS, ISO 9001, registro sanitario | B2B consultoría |
| **M&O Consultoría** (myo.pe) | Lima | BPM/POES/HACCP, ISO 9001, registro sanitario | B2B |
| **Continua Consultores** (continuaconsultores.com.pe) | Lima | Auditoría, implementación, registro sanitario | B2B |
| **Envirofoods** (enviro-foods.com) | Lima | Registro sanitario, HACCP, capacitación | B2B |
| **Proinocuidad** | **Trujillo** | BPM, HACCP, FSSC, BRCGS + **cursos asíncronos a S/ 45** | **B2C + B2B** |

**C-01 · El ángulo diferenciador no está explotado en el contenido** — Impacto **medio** · Esfuerzo **bajo**

Todos los competidores identificados son Lima, B2B, con cotización. Proinocuidad es la única de la lista que vende cursos grabados con precio publicado (S/ 45) y certificado con QR, y la única con sede fuera de Lima. Eso no aparece en ningún título, H1 ni descripción: el sitio se presenta con el mismo lenguaje genérico que los competidores («implementación», «acompañamiento», «documentación»).

**Acción:** llevar el precio y la modalidad al título y al H1 de las fichas (por ejemplo «Curso HACCP online con certificado — S/ 45»), y explotar «Trujillo» en las páginas de servicio.

**C-02 · Métricas de competencia: no disponible** (tráfico, keywords compartidas, backlinks, solapamiento de SERP). Requiere SE Ranking activo.

---

## 5. Fase 4 — SEO local

**L-01 · No se encontró ficha de Google Business Profile** — Impacto **alto** · Esfuerzo **medio**

Las búsquedas por «Proinocuidad» + Trujillo no devuelven ningún panel de Maps, ni reseñas, ni dirección. Sin GBP no hay presencia en el paquete local ni en Maps, que es donde se resuelven las búsquedas «cerca de mí» de consultoría alimentaria.

**Acción:** crear la ficha con la dirección real, categoría «Consultor»/«Servicio de formación», horario y las 4 redes ya usadas en `sameAs`. Requiere decisión de negocio sobre qué dirección publicar.

---

**L-02 · El sitio no publica dirección física** — Impacto **alto** · Esfuerzo **medio**

Solo «Trujillo, La Libertad, Perú» (24 apariciones). Sin calle, distrito, ni mapa. `LocalBusiness` no existe en el marcado. Para SEO local, la ciudad sola no compite.

---

**L-03 · NAP inconsistente fuera del sitio** — Impacto **medio** · Esfuerzo **bajo**

| Fuente | Ciudad | Teléfono | Horario | Correo |
|---|---|---|---|---|
| Sitio actual | Trujillo | +51 981 365 982 | Lun–Vie 8:00–20:00 | formacion_academica@ |
| LinkedIn | Trujillo | +51 981 365 982 | — | formacion_academica@ |
| Deepenrich | **Ascope** | — | — | — |
| WordPress antiguo (aún indexado) | «La libertad, Perú» | 981365982 | **07:00–13:00 / 15:00–17:00** | **administracion@** |

Dos citaciones externas contradicen al sitio. La del WordPress es la más grave porque Google todavía la muestra en resultados (`/contact/`, `/login/`).

**Acción:** corregir Deepenrich y resolver T-03 para que desaparezca la versión antigua.

---

**L-04 · Sin reseñas ni `AggregateRating`** — Impacto **medio** · Esfuerzo **alto**

No hay reseñas visibles en el sitio ni marcado de valoraciones. Depende de L-01: sin GBP no hay fuente legítima de reseñas. No se debe inventar `AggregateRating`.

---

**L-05 · Páginas de servicio sin ciudad** — Impacto **bajo** · Esfuerzo **bajo**

«Implementación ISO 22000 **en Perú**» y «BRCGS Food Safety **Perú**» llevan país; «Certificación HACCP», «Registro sanitario DIGESA» y «FSSC 22000» no llevan ni país ni ciudad. Si se apuesta por Trujillo, el título es el primer sitio donde debe verse.

---

## 6. Fase 5 — Visibilidad en IA

**Fortalezas medidas:**

- `robots.txt` permite explícitamente a todos los rastreadores de IA (`User-agent: *` / `Allow: /`), sin bloquear `GPTBot`, `ClaudeBot`, `PerplexityBot` ni `Google-Extended`.
- `llms.txt` existe y está bien hecho: resumen del negocio, RUC, contacto, horario, y las 22 URLs agrupadas por servicios, cursos y páginas informativas, cada una con una frase descriptiva.
- `llms-full.txt` también responde 200.
- El contenido está en HTML plano, sin JS para el texto principal: cualquier rastreador lo lee.

**I-01 · No hay entidad externa que respalde la marca** — Impacto **medio** · Esfuerzo **alto**

No se encontró ficha de Wikidata, artículo de Wikipedia, ni mención en prensa del sector. Los modelos de lenguaje citan entidades que pueden verificar en fuentes independientes; hoy la única fuente sobre Proinocuidad es su propio dominio, LinkedIn y un agregador (Deepenrich) que además dice «Ascope».

**Acción:** GBP (L-01) es la vía más barata de crear una entidad verificable; después, apariciones en medios del sector o colegios profesionales.

---

**I-02 · Citas reales en ChatGPT, Perplexity y AI Overviews: no disponible**

No hay herramienta contratada para medirlo (SE Ranking AI Search está en el plan vencido). Lo que se entrega es un conjunto de 14 consultas listas para medir a mano en `prompts/consultas-ia.md`, con el resultado esperado de cada una, para tener una línea base reproducible.

---

## 7. Fase 6 — Plan priorizado

Ordenado por relación impacto/esfuerzo. Al cerrar la auditoría no había nada aplicado; el estado real, tras la aprobación del Lote 1, va al final de esta sección.

### Ahora (esfuerzo bajo, impacto alto o medio)

| # | Acción | Resuelve | Esfuerzo |
|---|---|---|---|
| 1 | 301 de `*/index.html` → URL limpia en `.htaccess` | T-01, T-02 | 1 línea |
| 2 | 301 de `/contact/` y `/portfolio/` a `/nosotros/` y `/cursos/` | T-03 | 2 líneas |
| 3 | `width`/`height` en las 149 imágenes | R-02 | Bajo |
| 4 | `fetchpriority="high"` + `preload` en la imagen hero | R-01 | Bajo |
| 5 | H1 de la home con «inocuidad alimentaria» | M-01 | 1 línea |
| 6 | `taxID` en lugar de `identifier`; `address` en `Organization` | D-01, D-02 | Bajo |
| 7 | `lastmod` en el sitemap | T-05 | Bajo |

### Después (esfuerzo medio)

| # | Acción | Resuelve | Esfuerzo |
|---|---|---|---|
| 8 | Reescribir los 542 enlaces internos a URL limpia (generador + 10 páginas) | T-01 | Medio |
| 9 | Convertir JPEG a AVIF/WebP con `srcset` | R-03 | Medio |
| 10 | Crear Google Business Profile y publicar dirección | L-01, L-02, I-01 | Medio |
| 11 | Bloques «cursos relacionados» / «servicios relacionados» | E-01 | Medio |
| 12 | Página «curso de manipulación de alimentos» | K-01 | Medio |
| 13 | Guía «cómo consultar tu registro sanitario en DIGESA» | K-02 | Medio |
| 14 | `BreadcrumbList` + migas visibles | E-02 | Bajo/medio |

### Más adelante (esfuerzo alto o depende de terceros)

| # | Acción | Resuelve |
|---|---|---|
| 15 | Cadencia editorial en `/noticias/` (2–4 al mes) | M-02 |
| 16 | Ampliar `/inocuidad-alimentaria/` a 1.200+ palabras | M-03 |
| 17 | Reseñas reales en GBP y `AggregateRating` | L-04 |
| 18 | Menciones en medios del sector / colegios profesionales | I-01 |

### Estado de aplicación (2026-11-27)

Aplicado **en local, sin desplegar**, tras la aprobación del Lote 1:

| Hallazgo | Qué se hizo |
|---|---|
| T-01 | `enlacesLimpios()` en `tools/generar-fichas.mjs`, 542 enlaces reescritos y 301 en `.htaccess` |
| T-03 | 301 de `/contact/` → `/nosotros/`, `/portfolio/` → `/cursos/` y `/login/` → `/aula/login/` |
| T-05 | `lastmod` en las 22 URLs del sitemap, con la fecha del último commit de cada archivo |
| R-01 | `preload`, `fetchpriority="high"` y `width`/`height` en la imagen del hero |
| M-01 | H1 de la home: «Formamos profesionales en inocuidad alimentaria» |
| D-02 | `taxID` en lugar de `identifier`, más `foundingDate` |

Verificado con Apache 2.4.71 local y el `.htaccess` real: 22/22 URLs del sitemap a 200 sin redirecciones, 667 enlaces internos resueltos, 0 rotos, y las 6 reglas de 301 probadas una por una. El generador es idempotente (`diff` sin cambios tras reejecutarlo) y las 6 páginas clave se navegaron en Chromium sin errores de consola ni peticiones fallidas.

No se aplicó `dateModified` en el artículo: el archivo no tuvo cambios de contenido desde su publicación y poner la fecha del último commit (un cambio de menú) habría declarado una actualización que no existió.

### Advertencias antes de tocar nada

- **El generador manda.** Un cambio en la cabecera o el pie hay que aplicarlo en `tools/generar-fichas.mjs` **y** a mano en las 10 páginas que no son fichas. Si solo se edita el HTML, la siguiente generación lo revierte.
- **Verificar con `diff` después de generar**, como está documentado en `AGENTS.md`. Los dos prefijos (`ruta` y `cursos`) no son intercambiables y un error ahí cambia bytes sin romper enlaces.
- **El 301 de `index.html` conviene probarlo en local** con el servidor de `python3` no sirve (no aplica `.htaccess`); hay que probarlo en el hosting o con LiteSpeed.
- **No mezclar** este cambio con el trabajo del aula virtual en el mismo commit.

---

## 8. Anexos

- `keywords.csv` — 7 consultas de GSC + 12 oportunidades de autosuggest, con volumen marcado `no disponible`.
- `reporte.html` — este informe en HTML autocontenido, para leer o imprimir.
- `prompts/consultas-ia.md` — 14 consultas para medir visibilidad en asistentes de IA.
- `datos/gsc-consultas.csv`, `datos/gsc-paginas.csv`, `datos/rastreo-paginas.csv`, `datos/indexacion.csv` — datos crudos que sustentan cada cifra.

**Todo dato sin fuente en este informe está marcado «no disponible». No se estimó ninguna cifra.**
