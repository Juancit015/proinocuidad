# Proposal

## Why

Juan necesita que el sitio nuevo de Proinocuidad, el que está en este repositorio y todavía no está publicado, responda a búsquedas reales del mercado peruano. La base técnica (`seo-base`) dice qué debe tener el sitio, pero no comprueba si el texto coincide con lo que la gente busca ni si está al nivel de la competencia. Corregir ahora títulos, H1, meta descriptions, FAQ y schema evita publicar el mismo hueco de búsqueda que tiene el sitio actual.

## What Changes

- **Auditoría SEO de solo lectura** sobre el sitio local (`http://127.0.0.1:8899`, servido desde este repositorio), con datos de mercado de SE Ranking para Perú (keywords, preguntas, SERP). Produce `informe.md` con veredicto, puntajes, hallazgos priorizados (máx. 20), plan en 3 olas y anexo de créditos.
- **Correcciones de texto aprobadas** sobre las páginas del sitio local: `title`, `meta description`, H1-H3, bloques de preguntas frecuentes visibles y su schema `FAQPage`, y enlaces internos. Solo se aplican los hallazgos que Juan apruebe en el informe, y cada uno cita su keyword y su fuente.
- **Verificación** antes y después: capturas de referencia, comprobación de metadatos, y prueba de que no hay desbordes ni cambios de diseño.
- **CHANGELOG.md** con una entrada por la corrección aplicada.
- **Fuera de alcance**: cambios visuales, CSS, JS, layout, navegación y cabecera; páginas nuevas (por ejemplo, ISO 22000) que se tratarán en un change aparte porque cambian el número de páginas en `seo-base` y `diseno-responsive`; todo lo que dependa de `proinocuidad.com` como dominio público (auditoría del dominio, backlinks, visibilidad IA del dominio).

## Capabilities

### New Capabilities

- `seo-auditoria`: contrato de la auditoría SEO y de las correcciones de texto aprobadas: qué se mide, qué se puede escribir y en qué orden, cómo se cita la evidencia, cómo se puntúa el resultado, cómo se verifica el cambio y cómo se controla el consumo de créditos de SE Ranking.

### Modified Capabilities

- Ninguna. `seo-base` y `diseno-responsive` no cambian en este change. Las correcciones de texto deben respetar sus requisitos vigentes (longitud de título y meta, canonical, `og:url`, JSON-LD de cursos), pero no los redefinen.

## Impact

- **Archivos del sitio que pueden cambiar** (solo los que aparezcan en el informe aprobado):
  - `index.html`, `nosotros/`, `servicios/`, `noticias/`, `cursos/index.html`, `inocuidad-alimentaria/index.html`: texto de metadatos, encabezados, preguntas frecuentes y enlaces.
  - Fichas en `cursos/<slug>/index.html`: solo mediante `tools/generar-fichas.mjs`, nunca a mano. Verificación con `diff -rq` y `exit 0`.
- **Archivos nuevos**: `openspec/changes/auditoria-seo-sitio-local/informe.md` y capturas de referencia en `/tmp/opencode/` (fuera del repositorio).
- **Servicios externos**: consultas de lectura al MCP de SE Ranking. No se crean proyectos, auditorías ni keywords.
- **Red**: solo `127.0.0.1:8899`.
- **Supuestos registrados**:
  - Juan aprueba la lista de correcciones antes de editar; sin aprobación no se toca ningún archivo del sitio.
  - El efecto en posiciones no se puede medir con SE Ranking hasta publicar el sitio, así que la verificación de esta fase es técnica (metadatos, HTML, diseño), no de ranking.
