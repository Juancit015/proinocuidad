# Design

## Context

- El sitio nuevo vive en este repositorio y se sirve en local con `python3 -m http.server 8899 --bind 127.0.0.1` desde la raíz. No está publicado.
- `sitemap.xml`, `robots.txt`, las canonical y `og:url` declaran URLs de producción (`https://proinocuidad.com/...`). El servidor local responde en `http://127.0.0.1:8899/...`. Las canonical se evalúan tal como están declaradas y no se reescriben.
- SE Ranking no rastrea URLs locales. Sus herramientas de datos de mercado (keywords, preguntas, SERP) sí sirven. Las de dominio, backlinks, auditoría y visibilidad IA no, y quedan fuera.
- Las fichas de curso se generan con `tools/generar-fichas.mjs`; el menú y la cabecera también salen del generador y se repiten a mano en otras 10 páginas (ver `AGENTS.md`). Un texto de ficha que no se cambie en el generador se pierde en la siguiente regeneración.
- `AGENTS.md` del proyecto pide "solo cambios visuales salvo que pida otra cosa". Este change sí pide cambios de texto, por indicación de Juan, y no pide cambios visuales.
- Las herramientas `browser.*` del MCP no llegan a `127.0.0.1`. La verificación usa Playwright con el Chromium de `~/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome`, y `curl` para el HTML crudo.
- Se observó que SE Ranking devuelve 429 y `ECONNRESET` en ráfagas. Las consultas van en serie.
- Ver `proposal.md` (motivo y alcance) y `specs/seo-auditoria/spec.md` (requisitos).

## Goals / Non-Goals

**Goals:**
- Un informe con hallazgos trazables a keyword y fuente, aprobado por Juan antes de cualquier edición.
- Correcciones de texto mínimas y verificables: título, meta, H1-H3, FAQ y schema, enlaces internos.
- Verificación técnica antes y después, sin cambios visuales.

**Non-Goals:**
- No se crean páginas nuevas. Si el informe propone una (por ejemplo, ISO 22000), se registra y va a un change aparte, porque cambia el número de páginas en `seo-base` y `diseno-responsive`.
- No se tocan CSS, JS, layout, navegación ni cabecera.
- No se crean proyectos, auditorías ni keywords en SE Ranking.
- No se mide ni se corrige `proinocuidad.com` como dominio público.
- No hay commit ni push sin confirmación de Juan.

## Decisions

**1. Dos fases con puerta de aprobación.** Fase A: auditoría, solo escribe `informe.md`. Puerta: Juan aprueba la lista de correcciones. Fase B: edición de texto, solo para lo aprobado. Alternativa descartada: editar durante la auditoría; mezcla diagnóstico con cambios y no deja una lista aprobada.

**2. Sitio local como única fuente del sitio.** Se mide `127.0.0.1:8899`. Alternativa descartada: medir el dominio en vivo; es WordPress y va a desaparecer.

**3. SE Ranking solo para datos de mercado.** `DATA_getKeywordsMetrics` (source `pe`) para semillas y variantes; `DATA_getKeywordQuestions` y `DATA_getSimilarKeywords` para preguntas y long-tail; `DATA_getSerpTasks` y `DATA_getSerpTaskResults` para SERP ya lanzadas; `DATA_getSerpResults` solo para las que falten.

**4. Reutilizar SERP antes de lanzar nuevas.** `DATA_getSerpTasks` lista las tareas de las últimas 24 horas. Solo se lanza una SERP nueva si la keyword no aparece.

**5. Keywords sin dato se declaran como tales.** Una keyword sin dato no es cero. Queda como "sin dato" y no entra en la cobertura ponderada por volumen.

**6. Ambigüedad de keywords.** "bpm" devuelve resultados de música. La keyword operativa es "bpm alimentos". Cualquier término con uso ajeno al sector se registra igual.

**7. Medición del HTML.** Por cada URL del sitemap: `curl` del HTML crudo y Playwright del DOM renderizado tras cargar. Un texto que solo aparece en el DOM renderizado se marca como dependiente de JavaScript.

**8. Schema.** Se registra el `@type` de cada JSON-LD por URL y la presencia de `FAQPage` y `Article`. Las FAQ visibles se añaden como bloque de texto con sus preguntas y respuestas, y su JSON-LD `FAQPage` refleja exactamente ese texto.

**9. Correcciones en fichas por el generador.** Cualquier cambio en `cursos/<slug>/index.html` se hace en `tools/generar-fichas.mjs`. Se verifica con `cp -r cursos /tmp/cursos-antes`, `node tools/generar-fichas.mjs`, `echo $?` (debe ser 0) y `diff -rq /tmp/cursos-antes cursos`, que solo debe listar las fichas tocadas. La constante `waLargo` de `assets/js/cursos-data.js` debe coincidir con el generador si cambia el mensaje de WhatsApp.

**10. Verificación visual sin cambios de diseño.** Antes de editar, capturas de las páginas afectadas a 1280 y 390 píxeles en `/tmp/opencode/antes/`. Después, mismas capturas en `/tmp/opencode/despues/`, comparación de desborde horizontal y revisión de que solo cambia el texto corregido.

**11. Puntajes por rúbrica fija.** Cobertura de keywords ponderada por volumen, sobre keywords con dato. Autoridad y visibilidad IA se marcan como no evaluables.

**12. Ubicación del informe.** `openspec/changes/auditoria-seo-sitio-local/informe.md`, fuera de la raíz del sitio.

**13. Servidor.** Antes de medir, se comprueba que `127.0.0.1:8899` responde. Si no, se arranca desde la raíz del repositorio con el comando de `AGENTS.md`.

## Risks / Trade-offs

- **[El texto nuevo no mejora posiciones]** → Cada corrección cita keyword y fuente. La verificación es técnica, y el informe lo declara.
- **[Cambio de título que pierde marca o claridad]** → Juan aprueba cada corrección antes de editar; los títulos respetan los límites de `seo-base`.
- **[Regeneración de fichas que borra un cambio]** → Solo se edita el generador, y la verificación con `diff -rq` lo detecta.
- **[Cambio de texto que mueve el layout]** → Se usan los mismos elementos y clases existentes; la comparación de capturas lo detecta.
- **[429 o ECONNRESET de SE Ranking]** → Consultas en serie; si falla de nuevo, el bloque se declara como no ejecutado en el anexo.
- **[SERP de 24 horas caducadas]** → Se consulta la lista antes de lanzar nada.
- **[Créditos no visibles]** → Se declaran como estimados.
- **[Mezclar texto de `diseno-responsive`]** → Esa spec prohíbe tocar texto en cambios responsive. Este change no es responsive, pero no debe combinarse con uno en curso.

## Migration Plan

Rollback: `git checkout -- <archivos>` para los archivos tocados en la fase B, tras confirmar con Juan. La fase A solo crea `informe.md` y se borra sin efectos.

## Open Questions

Ninguna que cambie specs, enfoque o tareas.
