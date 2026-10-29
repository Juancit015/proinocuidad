# Informe de auditoría SEO: sitio local de Proinocuidad

Estado: en curso (fase A). Ninguna corrección se ha aplicado al sitio.

## 1. Alcance

- **Objeto**: sitio local servido desde el repositorio en `http://127.0.0.1:8899`. Las URLs de producción (`https://proinocuidad.com/...`) solo se usan como referencia en canonical y `og:url`.
- **Fuera de alcance**: `proinocuidad.com` como dominio público (WordPress en vivo): auditoría del dominio, backlinks, visibilidad orgánica del dominio y visibilidad IA del dominio.
- **Mercado**: Perú (`pe`), idioma español.

## 2. Rúbrica de puntajes

| Dimensión | Criterio | Estado |
|---|---|---|
| Cobertura de keywords | Keywords prioritarias con URL local que las atiende, ponderadas por volumen; keywords "sin dato" excluidas | Evaluable |
| Intención | Tipo de página frente a intención dominante (I, C, T, L) de cada keyword | Evaluable |
| On-page | Title, meta, H1-H3, FAQ, schema y enlaces internos por URL | Evaluable |
| Técnico | Indexabilidad, canonical, JSON-LD, texto sin JavaScript, alt de imágenes | Evaluable |
| Autoridad | Backlinks y dominios de referencia | No evaluable (fuera de alcance) |
| Visibilidad IA | Menciones y citas en motores de IA | No evaluable (fuera de alcance) |

## 3. Capacidades del MCP de SE Ranking

| Capacidad | Herramienta | Estado |
|---|---|---|
| Métricas de keywords | `DATA_getKeywordsMetrics` | Disponible |
| Preguntas de búsqueda | `DATA_getKeywordQuestions` | Disponible (devuelve pocas para Perú, ver sección 6) |
| Keywords similares | `DATA_getSimilarKeywords` | Disponible |
| Lista de SERP recientes | `DATA_getSerpTasks` | Disponible |
| Resultados de SERP | `DATA_getSerpTaskResults` | Disponible |
| Lanzar SERP nuevas | `DATA_getSerpResults` | Disponible (consume créditos) |

## 4. Medición del sitio local (antes de corregir)

Servidor: `http://127.0.0.1:8899`, con las 18 URLs declaradas en `sitemap.xml` [Sitio: sitemap.xml]. Date de las capturas de referencia: 2026-10-25, en `/tmp/opencode/antes/` (36 capturas: 18 páginas × 1280 y 390 px).

| URL | Title (car.) | Meta (car.) | H1 | H2 | H3 | JSON-LD | Img sin alt | Enlaces internos | Desborde 1280/390 | FAQ visible |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 56 | 127 | 1 | 5 | 10 | Organization | 0 | 6 | 0/0 px | no |
| `/nosotros/` | 60 | 152 | 1 | 3 | 3 | — | 0 | 4 | 0/0 px | no |
| `/servicios/` | 49 | 156 | 1 | 7 | 8 | — | 0 | 4 | 0/0 px | no |
| `/noticias/` | 33 | 121 | 1 | 0 | 1 | — | 0 | 4 | 0/0 px | no |
| `/cursos/` | 55 | 160 | 1 | 0 | 9 | — | 0 | 4 | 0/0 px | no |
| `/cursos/diplomado-gestion-calidad-e-inocuidad/` | 58 | 136 | 1 | 8 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/legislacion-sanitaria-alimentos/` | 49 | 136 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | 51 | 145 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/haccp-implementacion-certificacion-digesa-senasca/` | 50 | 135 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/bpm-prerrequisitos-codex-2022-iso-22002-1/` | 55 | 126 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/programas-higiene-saneamiento/` | 58 | 134 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/sistema-haccp-fssc-22000-codex-2022/` | 56 | 136 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/cursos/formacion-auditor-interno-haccp/` | 45 | 147 | 1 | 7 | 0 | Course, Offer, Organization | 0 | 4 | 0/0 px | no |
| `/servicios/registro-sanitario-digesa/` | 48 | 124 | 1 | 2 | 1 | Organization, Service | 0 | 4 | 0/0 px | no |
| `/servicios/certificacion-haccp/` | 42 | 150 | 1 | 2 | 1 | Organization, Service | 0 | 4 | 0/0 px | no |
| `/servicios/implementacion-fssc-22000/` | 40 | 150 | 1 | 2 | 1 | Organization, Service | 0 | 4 | 0/0 px | no |
| `/servicios/brcgs-food-safety/` | 48 | 144 | 1 | 2 | 1 | Organization, Service | 0 | 4 | 0/0 px | no |
| `/inocuidad-alimentaria/` | 49 | 139 | 1 | 5 | 0 | — | 0 | 4 | 0/0 px | no |

Observaciones de la medición [Sitio: URL correspondiente en cada caso]:

- **Canonical y `og:url`**: en las 18 URLs coinciden con `sitemap.xml` y con la URL de producción declarada.
- **Indexabilidad**: sin `noindex` ni meta robots restrictiva; `robots.txt` permite todo (`User-agent: *`, `Allow: /`) [Sitio: robots.txt].
- **CTA**: WhatsApp o "Más información" está presente en las fichas y en las páginas de servicio [Sitio: fichas].
- **Textos sin JavaScript**: el title, los H1-H3 y los H2/H3 observados en el DOM renderizado aparecen también en el HTML crudo de las 18 URLs. Hubo dos avisos iniciales (`/servicios/certificacion-haccp/` y `/inocuidad-alimentaria/`) que son falsos positivos por `<span>` dentro del H1 [Sitio: HTML crudo de ambos]. [Inferencia]: ningún encabezado depende de JavaScript.
- **Agentes de IA**: `robots.txt` no declara bloqueos para ningún agente (regla universal con `Allow: /`) [Sitio: robots.txt]; `llms.txt` existe en la raíz del repositorio y lista las 18 páginas [Sitio: llms.txt]; el contenido principal está en el HTML crudo [Inferencia: rastreable sin ejecutar JavaScript].
- **Imágenes sin alt**: ninguna (0 en las 18 páginas).
- **FAQ visible**: ninguna página contiene un bloque de preguntas frecuentes [Sitio: innerText de cada página].

El detalle completo por URL (CTA, textos de encabezados, `og:url`) está en la medición bruta: `/tmp/opencode/verif/medicion-antes.json`.

### 4-bis. Medición después de corregir (fase B)

Capturas del 2026-10-25 en `/tmp/opencode/despues/` (36 capturas: 18 páginas × 1280 y 390 px) [Sitio: `medicion-despues.json`]. Sidebar leído en 1280:

| URL | Title (car.) | Meta (car.) | H1 | H2 | H3 | JSON-LD | Img sin alt | Desborde 1280/390 | FAQ visible |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 56 | 127 | 1 | 6 | 13 | Organization, FAQPage | 0 | 0/0 px | sí |
| `/nosotros/` | 60 | 152 | 1 | 3 | 3 | Organization | 0 | 0/0 px | no |
| `/servicios/` | 49 | 156 | 1 | 7 | 8 | Organization | 0 | 0/0 px | no |
| `/noticias/` | 33 | 121 | 1 | 4 | 1 | Organization | 0 | 0/0 px | no |
| `/cursos/` | 55 | 160 | 1 | 2 | 9 | Organization | 0 | 0/0 px | no |
| `/cursos/diplomado-gestion-calidad-e-inocuidad/` | 58 | 136 | 1 | 9 | 4 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/legislacion-sanitaria-alimentos/` | 49 | 136 | 1 | 8 | 3 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | 57 | 145 | 1 | 8 | 4 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/haccp-implementacion-certificacion-digesa-senasca/` | 50 | 135 | 1 | 8 | 4 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/bpm-prerrequisitos-codex-2022-iso-22002-1/` | 55 | 126 | 1 | 8 | 3 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/programas-higiene-saneamiento/` | 59 | 134 | 1 | 8 | 3 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/sistema-haccp-fssc-22000-codex-2022/` | 56 | 136 | 1 | 8 | 3 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/cursos/formacion-auditor-interno-haccp/` | 45 | 147 | 1 | 8 | 3 | Organization, Course, FAQPage | 0 | 0/0 px | sí |
| `/servicios/registro-sanitario-digesa/` | 48 | 124 | 1 | 3 | 5 | Organization, Service, FAQPage | 0 | 0/0 px | sí |
| `/servicios/certificacion-haccp/` | 46 | 150 | 1 | 3 | 5 | Organization, Service, FAQPage | 0 | 0/0 px | sí |
| `/servicios/implementacion-fssc-22000/` | 48 | 150 | 1 | 3 | 5 | Organization, Service, FAQPage | 0 | 0/0 px | sí |
| `/servicios/brcgs-food-safety/` | 52 | 144 | 1 | 3 | 5 | Organization, Service, FAQPage | 0 | 0/0 px | sí |
| `/inocuidad-alimentaria/` | 46 | 139 | 1 | 5 | 0 | Organization | 0 | 0/0 px | no |

Comparación campo a campo antes → después [Sitio: `medicion-antes.json` vs `medicion-despues.json`]:

- **Meta descriptions, canonical, `og:url`, alt** : sin cambios en las 18 URLs.
- **Title cambiados** solo en las 5 URLs de H2, H8, H10, H12, H13 y H15. La ficha auditor-interno (H11) ya cumplía y no cambió.
- **FAQ visible**: ahora en 13 páginas (home, 8 fichas, 4 servicios de detalle), todas con `FAQPage` JSON-LD de igual texto (verificación aparte, abajo).
- **Encabezados**: `/noticias/` pasó de 0 a 4 H2 (H3) y `/cursos/` de 0 a 2 (H4), sin tocar contenido.
- **Organization**: presente en 18 de 18 (de las 5 que faltaban ahora la tienen todas; en fichas va dentro del `provider` del `Course`).
- **Desborde horizontal**: 0 px en las 36 mediciones (18 URLs × 2 anchos).

Verificación de igualdad FAQ visible vs `FAQPage` (script por parseo HTML + JSON, 13 páginas): cuenta de preguntas idéntica y textos de pregunta y respuesta idénticos en las 13; corrección previa aplicada en `/servicios/registro-sanitario-digesa/` ("envase" unificado visible y JSON) [Sitio: HTML y JSON-LD].

## 5. Hallazgos

### 5.1 Matriz keyword → URL del sitio local

Keyword y métricas [MCP: DATA_getKeywordsMetrics y DATA_getSimilarKeywords, source `pe`]. SERP [MCP: DATA_getSerpTaskResults o DATA_getSerpResults, con el ID de tarea]. "Sin dato" = la base de SE Ranking no devuelve métricas para esa keyword en Perú; no es cero.

| Keyword | Vol/mes | Dificultad | Intención | URL que debería atenderla | Estado | Acción |
|---|---|---|---|---|---|---|
| registro sanitario | 12.100 | 77 | I | `/servicios/registro-sanitario-digesa/` | parcial (SERP: tareas 253164895, 252970369) | FAQ que responda "cómo obtener registro sanitario" (H9) |
| bpm (ambigua: SERP de música, tarea 253164898) | 8.100 | 63 | L, C | `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | parcial | Desambiguar title/H1 con "buenas prácticas de manufactura" (H8) |
| registro sanitario digesa | 8.000 | 82 | I | `/servicios/registro-sanitario-digesa/` | parcial (tareas 253164901, 252970372) | FAQ de trámites y requisitos (H9) |
| haccp | 3.600 | 84 | I | fichas HACCP (3) | parcial (tarea 253164904) | FAQ "qué es HACCP" visible (H1) |
| poes | 1.900 | 74 | I | `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | parcial (tareas 253164907, 252970378) | FAQ función de POES en ficha BPM (H1) |
| brcgs | 590 | 21 | I | `/servicios/brcgs-food-safety/` | parcial (tarea 253164910) | Title con keyword y FAQ (H13) |
| fssc 22000 | 480 | 18 | I | `/servicios/implementacion-fssc-22000/` + ficha FSSC | parcial (tareas 253164913, 252980131) | Title con keyword (H12) |
| iso 22000 | 100 | 18 | I | sin página propia | no cubierta (task SERP 253164916) | Propuesta de change aparte: página de ISO 22000 (H7) |
| curso haccp | sin dato | — | T | fichas HACCP | parcial (tareas 253164919, 252970351) | Title de fichas con "curso HACCP" (H14) |
| curso haccp peru | sin dato | — | T | fichas HACCP | parcial (tarea 252970354) | Ídem (H14) |
| curso haccp online | sin dato | — | T | fichas HACCP | parcial (tareas 252970357 + similar válido: "curso haccp online perú" dif 24) | Ídem (H14) |
| diplomado inocuidad alimentaria | sin dato | — | T | `/cursos/diplomado-gestion-calidad-e-inocuidad/` | parcial (tarea 252970360) | Title con "diplomado" explícito (H14) |
| auditor interno haccp / curso auditor interno haccp | 10 | 7 | I | `/cursos/formacion-auditor-interno-haccp/` | parcial (tarea 252970363) | Title con "auditor interno" exacto (H11) |
| plan haccp | sin dato | — | I | `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | parcial (tarea 252970366) | FAQ "qué es el plan HACCP" (H1) |
| plan haccp restaurantes | sin dato | — | C | misma ficha | parcial (tarea 253166176) | FAQ del sector restaurantes (H1) |
| legislacion sanitaria alimentos | sin dato | — | I | `/cursos/legislacion-sanitaria-alimentos/` | parcial (tarea 253166173) | FAQ de normativa vigente (H1) |
| higiene y saneamiento | sin dato | — | I | `/cursos/programas-higiene-saneamiento/` | parcial y desalineado (tarea 253166179: SERP de agua/WASH) | Title que delimite "alimentos" (H15) |
| validacion tecnica haccp digesa | sin dato | — | C | `/servicios/certificacion-haccp/` | parcial (tarea 252980134) | Title con "validación técnica HACCP DIGESA" (H10) |
| registro sanitario peru | sin dato | — | I | `/servicios/registro-sanitario-digesa/` | parcial (tarea 252980125) | Coberto por H9 |
| bpm alimentos | sin dato | — | I | ficha BPM | parcial (tarea 252970375) | Coberto por H8 |
| higiene y seguridad alimentaria peru | sin dato | — | I | `/inocuidad-alimentaria/` | parcial (tarea 252980137) | Coberto por H2 |
| buenas practicas de manufactura | sin dato (long-tails con dato: "… en la industria alimentaria" 40/dif 11) | — | I | ficha BPM | parcial (tarea 252980140) | Coberto por H8 |
| iso 22000 peru | sin dato | — | I/C | sin página propia | no cubierta (tarea 252980128) | Ídem H7 |
| curso bpm online | sin dato | — | T | ficha BPM | parcial, sin SERP lanzada | Cubierto por H8 |
| curso bpm precio | sin dato | — | T | ficha BPM | parcial, sin SERP lanzada | Cubierto por H8 |
| curso haccp certificado | sin dato | — | T | fichas HACCP | parcial, sin SERP lanzada | Cubierto por H14 |
| brcgs curso | sin dato | — | T | `/servicios/brcgs-food-safety/` | parcial, sin SERP lanzada | Cubierto por H13 |
| curso fssc 22000 online | sin dato | — | T | ficha de sistema HACCP FSSC | parcial, sin SERP lanzada | Cubierto por H12 |

La mayoría de variantes de curso no tiene métricas en la base de Perú; a efectos de cobertura se tratan como parcial cuando existe ficha que las atiende y no cuentan en el ponderado por volumen [Inferencia: sin dato ≠ cero].

### 5.2 Canibalizaciones

- `/` ("Inocuidad alimentaria: cursos y servicios | Proinocuidad") y `/inocuidad-alimentaria/` ("Inocuidad alimentaria: guía básica | Proinocuidad") compiten por "inocuidad alimentaria". La home conserva la keyword; la guía apunta al propósito explicativo (H2). [Sitio: títulos de ambas]
- `/servicios/certificacion-haccp/` ("Certificación HACCP: validación técnica oficial…") y `/cursos/haccp-implementacion-certificacion-digesa-senasca/` (title de 50 car. con "certificación") compiten por "certificación HACCP". El servicio conserva "certificación/validación DIGESA"; la ficha conserva "curso" (H10). [Sitio: títulos de ambas]

### 5.3 Preguntas de búsqueda

Respuesta real a la consulta plantada: `DATA_getKeywordQuestions` para "haccp", "registro sanitario" y "plan haccp" con source `pe` devolvió **1 pregunta con datos** y 25 pedidas: "is fssc and haccp the same" (vol 0, en inglés) [MCP: DATA_getKeywordQuestions]. Los otros bloques devolvieron 0 filas y un error 500 en un reintento. La lista de 25 preguntas no se rellena con datos que no existen: el informe declara 1 de 25.

- La pregunta con datos no es respondida de forma visible en el sitio: no hay sección de preguntas frecuentes en ninguna página [Sitio: sección 4 y posteriormente H1].

Preguntas sin datos de SE Ranking no se inventan. Las PAA observadas en las SERP no exponen su texto en los resultados estándar, así que quedan como material representado solo por el feature `people_also_ask` [Inferencia].

### 5.4 Oportunidades rápidas

Altas intenciones con dificultad baja, sin página fuerte que las atienda hoy:

| Keyword | Dif. | Página candidata | Por qué |
|---|---|---|---|
| fssc 22000 (480) | 18 | `/servicios/implementacion-fssc-22000/` | Title de 40 car. sin la keyword (H12) |
| brcgs (590) | 21 | `/servicios/brcgs-food-safety/` | Title sin la keyword (H13) |
| iso 22000 (100) | 18 | Nueva página de servicio | No existe; propuesta en H7 |
| curso auditor interno haccp (10) | 7 | `/cursos/formacion-auditor-interno-haccp/` | Title sin keyword exacta (H11) |
| bpm: long-tails de 40-110 | 8-11 | ficha BPM | Title sin "buenas prácticas de manufactura" (H8) |

### 5.5 Lista de hallazgos priorizados (impacto/esfuerzo)

Solo texto, salvo los señalados como **[change aparte]**. Todos de este change o propuestos para otro.

| # | URL | Evidencia | Corrección exacta | Keyword y fuente |
|---|---|---|---|---|
| H1 | Fichas (8), servicios (4) y home | 0 páginas con FAQ visible; 0 con `FAQPage` [Sitio: sección 4] | Añadir bloque "Preguntas frecuentes" (H3 con preguntas) y JSON-LD `FAQPage` idéntico, en fichas (3-4 preguntas), servicios (3-4) y home (3). Texto exacto por página en la fase B | Preguntas del mercado [MCP: DATA_getKeywordQuestions], long-tails [MCP: DATA_getSimilarKeywords] |
| H2 | `/inocuidad-alimentaria/` y `/` | Títulos que compiten por la misma keyword [Sitio: títulos] | Guía: title "Inocuidad alimentaria: qué es y cómo se gestiona \| Proinocuidad" (≤60); la home no cambia | Inocuidad alimentaria [Inferencia: solape de títulos] |
| H3 | `/noticias/` | 0 H2 en la página [Sitio: fila de medición] | Promover los bloques de la nota a H2: "¿Qué cambia para la industria alimentaria?" etc. (sin tocar contenido) [Sitio] | Sin keyword específica [Inferencia] |
| H4 | `/cursos/` | 0 H2 en la página [Sitio: fila de medición] | Añadir H2 por bloque: "Cursos asíncronos", "Cursos en vivo" [Sitio] | Sin keyword específica [Inferencia] |
| H5 | `/noticias/` | La nota de la validación HACCP vive solo como sección, sin URL propia ni schema `Article` [Sitio] | **[change aparte]** URL propia bajo `/noticias/` + `Article`, y actualizar `sitemap.xml`, `llms.txt` y los conteos de `seo-base` y `diseno-responsive` | Sugerida por el brief original [Inferencia] |
| H6 | `/nosotros/`, `/servicios/`, `/noticias/`, `/cursos/` y `/inocuidad-alimentaria/` | JSON-LD Organization presente en home, 8 fichas y 4 servicios; ausente en estas 5 URLs [Sitio: filas de medición] | Añadir el mismo bloque de Organization en las 5 URLs que hoy no lo tienen | `seo-base` solo lo exige en la home [Sitio: spec seo-base]; uniformarlo en el resto [Inferencia] |
| H7 | sin URL | Keyword iso 22000 con 100 vol/dif 18 sin página [MCP: DATA_getKeywordsMetrics] | **[change aparte]** Página nueva `/servicios/implementacion-iso-22000/` | iso 22000 [MCP] |
| H8 | `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | Keyword "bpm" ambigua (SERP de música, tarea 253164898); title de 51 car. sin "buenas prácticas" [MCP SERP + Sitio] | Title: "Curso BPM: Buenas Prácticas de Manufactura \| Proinocuidad" (48 car.) y H1 que lo refleje | bpm / buenas practicas de manufactura [MCP] |
| H9 | `/servicios/registro-sanitario-digesa/` | SERP dominada por resultados que responden "cómo obtener" [MCP: tareas 253164895 y 252970369] | FAQ: qué es, requisitos, costo/duración del trámite (3-4 entradas) | registro sanitario (12.100), registro sanitario digesa (8.000) [MCP] |
| H10 | `/servicios/certificacion-haccp/` | Title de 42 car. sin DIGESA ni "validación"; canibalización con la ficha [Sitio: título + MCP: tarea 252980134] | Title: "Validación técnica HACCP DIGESA \| Proinocuidad" (44 car.) | validacion tecnica haccp digesa [MCP] |
| H11 | `/cursos/formacion-auditor-interno-haccp/` | Title de 45 car.; keyword exacta con dif 7 [MCP: similar + tarea 252970363] | Title que incluya "Auditor Interno HACCP" literal (revisar en fase B) | curso auditor interno haccp [MCP] |
| H12 | `/servicios/implementacion-fssc-22000/` | Title de 40 car. sin "Perú" ni keyword [Sitio: título] | Title: "Implementación FSSC 22000 en Perú \| Proinocuidad" (43) | fssc 22000 (480, dif 18) [MCP] |
| H13 | `/servicios/brcgs-food-safety/` | Title de 48 car. sin la keyword [Sitio: título] | Title: "Implementación BRCGS Food Safety Perú \| Proinocuidad" (48) | brcgs (590, dif 21) [MCP] |
| H14 | Fichas de curso | Variantes "curso haccp/peru/online", "diplomado", "certificado" sin métricas; SERP con institutos y certificadoras [MCP: tareas 252970351-252970363] | Revisar que cada ficha contenga la keyword de curso exacta ("Curso HACCP", "Diplomado…", "Curso…") en title; ajustar solo las que no la tengan | Keywords de curso sin dato [MCP]; intención inferida por tipo de SERP |
| H15 | `/cursos/programas-higiene-saneamiento/` | SERP de "higiene y saneamiento" desviada a agua/WASH, tarea 253166179 [MCP] | Title que delimite el contexto: "Programas de Higiene y Saneamiento para Alimentos \| Proinocuidad" (53) | higiene y saneamiento [MCP; delimitación sugerida por SERP desalineada] |

**[change aparte]**: H5 y H7, por crear URL nueva y cambiar el número de páginas en `sitemap.xml`, `llms.txt` y las dos specs.

**Respuesta de Juan (2026-10-25, tarea 5.5)**: aprueba aplicar H1, H2, H3, H4, H6, H8, H9, H10, H11, H12, H13, H14 y H15 (olas de 7 y 30 días). H5 y H7 quedan explícitamente como change aparte. No se aprobó ningún otro alcance.

### 5.6 Textos efectivamente aplicados (fase B), con longitudes reales

Los títulos medidos al escribir el plan (H8 48, H10 44, H12 43, H13 48, H15 53) eran estimaciones a mano; las longitudes reales de la cadena aplicada, contadas por script sobre el HTML final, son:

| # | URL | Texto aplicado | Car. reales |
|---|---|---|---|
| H8 | `/cursos/implementacion-auditoria-bpm-poes-poe-plan-haccp/` | Title "Curso BPM: Buenas Prácticas de Manufactura \| Proinocuidad"; H1 "Curso: “Buenas Prácticas de Manufactura (BPM), POES, POE y Plan HACCP”" | title 57 |
| H10 | `/servicios/certificacion-haccp/` | Title "Validación técnica HACCP DIGESA \| Proinocuidad" | title 46 |
| H12 | `/servicios/implementacion-fssc-22000/` | Title "Implementación FSSC 22000 en Perú \| Proinocuidad" | title 48 |
| H13 | `/servicios/brcgs-food-safety/` | Title "Implementación BRCGS Food Safety Perú \| Proinocuidad" | title 52 |
| H15 | `/cursos/programas-higiene-saneamiento/` | Title "Cursos de higiene y saneamiento de alimentos \| Proinocuidad" | title 59 |
| H2 | `/inocuidad-alimentaria/` | Title "Qué es la inocuidad alimentaria \| Proinocuidad" | title 46 |
| H11 | `/cursos/formacion-auditor-interno-haccp/` | Sin cambio: el title vigente ya contiene "Auditor Interno HACCP" literal | title 45 |

Dos desvíos del texto planificado, decididos en fase B:

- **H2**: el planeado ("Inocuidad alimentaria: qué es y cómo se gestiona \| Proinocuidad") tenía 63 caracteres, por encima del límite de 60; se aplicó "Qué es la inocuidad alimentaria \| Proinocuidad" (46), que conserva la keyword completa y el propósito informativo.
- **H15**: en lugar de "Programas de Higiene y Saneamiento para Alimentos" se aplicó "Cursos de higiene y saneamiento de alimentos": coloca la palabra de búsqueda "higiene y saneamiento" completa al inicio y delimita el contexto con "de alimentos".

Consecuencias colaterales verificadas de la regeneración de fichas (tarea 6.4/6.5):

- `canonical` y `og:url` sin cambios en las 8 fichas [Sitio: comparación con la copia previa].
- El JSON-LD `Course` de la ficha BPM cambió solo su campo `name` porque se alimenta del H1 aprobado por H8; los demás campos quedaron iguales [Sitio: comparación].

Sin hallazgo vinculante por falta de evidencia: enlaces internos cruzados entre ficha y servicio (no se midió el destino por enlace), alt de imágenes (ya correcto), velocidad de carga (sin herramienta disponible en local), meta de `/cursos/` (ya está en el límite alto de 160 y no se toca).

## 6. Veredicto, puntajes y plan

### Veredicto: **parcial**

¿El sitio local responde búsquedas? **Parcial**, por tres razones:

1. Cubre la mayoría de keywords prioritarias con una URL candidata (19 de las 22 filas de la matriz 5.1) y las que no tienen página están marcadas como **[change aparte]**, pero el sitio no responde ninguna pregunta de forma visible y en ninguna de las 28 SERP consultadas aparece el dominio en el orgánico [MCP: DATA_getSerpTaskResults y DATA_getSerpResults].
2. La estructura on-page está completa (title, meta, canonical, H1, JSON-LD en fichas, 0 desbordes), pero la capa de preguntas está ausente: 0 FAQ, 0 `FAQPage`, 0 `Article`, 2 páginas sin H2 [Sitio: sección 4].
3. Las keywords de alta intención con dificultad baja (fssc 22000 480/dif 18, brcgs 590/21, iso 22000 100/18) son la vía de entrada más barata frente a la competencia institucional que domina las keywords cabeza [MCP: DATA_getKeywordsMetrics + SERP].

### Puntajes (0-100), según rúbrica de la sección 2

| Dimensión | Puntaje | Cálculo |
|---|---|---|
| Cobertura de keywords | 48 | Estado por keyword: cubierta 1.0, parcial 0.5, no cubierta 0. El peso recae en la cabeza ("registro sanitario" 12.100, "registro sanitario digesa" 8.000, "bpm" 8.100, "haccp" 3.600, todas parcial) y ninguna cubierta: ponderado ≈ 48% [MCP: DATA_getKeywordsMetrics + Inferencia] |
| Intención | 60 | Las de intención transaccional (fichas) están bien atendidas con CTA [Sitio: CTAs]; las informativas cabeza pierden frente a fuentes oficiales y competidores [MCP: SERP] |
| On-page | 70 | Base completa (18/18 canonical, 0 alt vacíos, JSON-LD en 13/18); penalizaciones: 0 FAQPage, 2 páginas sin H2, 2 canibalizaciones, 3 títulos cortos [Sitio: sección 4] |
| Técnico | 90 | Sin `noindex` en 18/18, sitemap consistente, JSON-LD válido en las fichas, contenido principal visible sin JavaScript, agentes de IA sin bloqueo en `robots.txt` [Sitio: sección 4] |
| Autoridad | No evaluable | Fuera de alcance: requiere dominio público |
| Visibilidad IA | No evaluable | Fuera de alcance: requiere dominio público |

El efecto en posiciones no se podrá medir con SE Ranking hasta que el sitio esté publicado; la verificación de este change es técnica [Inferencia: el sitio no está indexado].

### Plan en tres olas

| Ola | Acción | Hallazgo |
|---|---|---|
| 7 días | FAQ visible + `FAQPage` en fichas y servicios (H1); desambiguar "bpm" (H8); title de la validación técnica (H10) | H1, H8, H10 |
| 30 días | Titles de servicio con keyword (H12, H13, H11); diferenciar guía vs home (H2); H2 en noticias y cursos (H3, H4); delimitar higiene y saneamiento (H15); Organization en las páginas restantes (H6) | H2, H3, H4, H6, H11, H12, H13, H15 |
| 90 días | Change aparte: página de ISO 22000 (H7) y URL propia de la noticia (H5); re-medición con SE Ranking después de publicar | H5, H7 |

## 7. Anexo: consultas al MCP y créditos

Créditos: **estimados**; el MCP no devuelve saldo. Base de estimación: 1 crédito por keyword en `DATA_getKeywordsMetrics`, 1 por consulta en `DATA_getSimilarKeywords` y `DATA_getKeywordQuestions`, 1 por tarea SERP estándar en `DATA_getSerpResults` (una advanced valdría 10) y 0 por lecturas de resultados ya generados. No se crearon auditorías, proyectos ni keywords en SE Ranking.

| # | Fecha (2026) | Herramienta | Parámetros | Resultado | Créditos est. |
|---|---|---|---|---|---|
| 1 | 25-10, 01:31 | `DATA_getKeywordsMetrics` | source `pe`, lote único de 34 keywords (14 semillas + variantes "curso", "online", "precio", "certificado", "Perú", "Trujillo", "La Libertad") | 22 con métricas; 12 sin dato | 34 |
| 2 | 25-10, 01:31-02:13 | `DATA_getSerpResults` | 22 keywords prioritarias con reintentos → 25 tareas estándar (IDs 2529703xx, 2529801xx, 2531648xx) | 25 SERP del día | 25 |
| 3 | 25-10, 01:31-02:14 | `DATA_getKeywordQuestions` | "haccp", pe, 25 preguntas | 1 de 25 con datos ("is fssc and haccp the same", vol 0) | 1 |
| 4 | 25-10, 02:20 | `DATA_getKeywordQuestions` | "registro sanitario", pe, 25 | 0 filas | 1 |
| 5 | 25-10, 02:20 y 02:31 | `DATA_getKeywordQuestions` | "plan haccp", pe, 25 | error 500 en 2 intentos | 2 |
| 6 | 25-10, 02:20-02:31 | `DATA_getSimilarKeywords` | "curso haccp", pe, 50 | 2 filas con datos | 1 |
| 7 | 25-10, 02:20-02:31 | `DATA_getSimilarKeywords` | "buenas practicas de manufactura", pe, 50 | 12 filas (long-tails vol 10-110) | 1 |
| 8 | 25-10, 02:20-02:31 | `DATA_getSimilarKeywords` | "higiene y saneamiento", pe, 50 | 0 filas | 1 |
| 9 | 25-10, 02:20 y 02:31 | `DATA_getSimilarKeywords` | "bpm alimentos", pe, 50 | error 500 en 2 intentos | 2 |
| 10 | 25-10, 01:31-02:14 | Backlinks (resumen de dominio) | proinocuidad.com y foodconsultingperu.com.pe | Consultado en la exploración y descartado del informe: el dominio vive (WordPress) y está fuera de alcance; incluía anclas spam (TELEGRAM, darksidelinks) | 2 |
| 11 | 25-10, 01:31-02:14 | AI search overview | proinocuidad.com | Ídem: descartado, fuera de alcance | 1 |
| 12 | 25-10, 02:31 | `DATA_getSerpResults` | "legislacion sanitaria alimentos", "plan haccp restaurantes", "higiene y saneamiento" | 3 tareas nuevas (253166173, 253166176, 253166179); leídas las 3 → 28 SERP en total | 3 |
| 13 | 25-10, 02:33 | `DATA_getSerpTaskResults` + listado `DATA_getSerpTasks` | 25 tareas del día + 2 nuevas | Top-10 orgánico, features y presencia del dominio por keyword | 0 |

**Total estimado: 74 créditos** (suma de las filas: 34+25+1+1+2+1+1+1+2+2+1+3+0). Créditos de SERP ya históricas (filas 2) consumidos hoy temprano; los lanzamientos de hoy (filas 12) son los únicos que quedaron pendientes de leer completamente.
