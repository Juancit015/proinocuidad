# Design

## Context

Ver `proposal.md` para la motivación y el alcance. Estado verificado en el repo:

- Sitio estático HTML sin build. Las 13 páginas tienen `<title>`, meta description, canonical, `og:*` y `h1` (uno por página).
- `servicios/index.html` contiene los 4 servicios del PDF como secciones, sin páginas propias. El servicio de registro sanitario aparece como sección 4 con título "Trámite de registro sanitario de alimentos y bebidas".
- `tools/generar-fichas.mjs` arma el título de cada ficha en la línea 161 como `${curso.title} | Proinocuidad`. Como `curso.title` ya incluye la marca, la marca se duplica. Las fichas son las únicas páginas generadas; el resto son HTML editable.
- Las páginas de servicio nuevas reutilizan clases y layout de `servicios/index.html` y de las páginas de curso. No se agregan CSS ni JS.
- Los volúmenes y dificultades son de SE Ranking (Perú, octubre 2026). Deben volver a medirse antes de publicar.

## Goals / Non-Goals

**Goals:**

- Una página propia por keyword prioritaria con demanda y dificultad favorables.
- Metadatos dentro de rango en las 13 páginas existentes y en las nuevas.
- Marca única en títulos de fichas, aplicada en el generador para que no se pierda al regenerar.
- Contenido solo verificable (PDF base o confirmación del dueño).

**Non-Goals:**

- Sin artículos de blog, sin landings de cursos sin volumen, sin página para "registro sanitario" ni "haccp" (ver proposal).
- Sin cambios de menú, de CSS ni de paleta.
- Sin publicación en `proinocuidad.com`. La publicación es un change aparte con método y confirmación explícitos.

## Decisions

### 1. Una página por intención, en carpetas propias

Cada servicio prioritario va en `servicios/<slug>/index.html`, con slugs: `registro-sanitario-digesa`, `certificacion-haccp`, `implementacion-fssc-22000`, `brcgs-food-safety`. La guía va en `inocuidad-alimentaria/index.html`.

Alternativa descartada: una sola página con secciones por servicio. Se descarta porque diluye la keyword de cada intención y no genera URLs que posicionen por separado.

### 2. Fuente de datos y consistencia

El texto de cada página de servicio se toma del PDF base (páginas 2–5 y 8–9 del documento). No se publican precios ni plazos.

Riesgo conocido: el PDF menciona "Validación Técnica Oficial del Plan HACCP" y "Certificación de Principios Generales de Higiene". La página de certificación HACCP usará esa redacción, no "certificación ISO".

### 3. Títulos y descripciones con keyword principal al inicio

- Registro sanitario: título `Registro sanitario DIGESA para alimentos y bebidas | Proinocuidad` (verificar ≤ 60 caracteres; si excede, recortar "y bebidas").
- Certificación HACCP: título con "Certificación HACCP".
- FSSC 22000 y BRCGS: títulos con la norma.

Los títulos se fijan en esta fase de diseño y se validan en tareas con conteo de caracteres.

### 4. Marca única en fichas: fix en el generador

En `tools/generar-fichas.mjs`, línea 161, el título deja de agregar `| Proinocuidad` si `curso.title` ya lo contiene. Así la regeneración no vuelve a duplicarla. Las fichas no se editan a mano (regla del proyecto).

### 5. Datos estructurados `Service`

Cada página de servicio incluye JSON-LD `Service` con `provider` apuntando a la `Organization` ya definida en `index.html`. Esto reutiliza el dato existente y no duplica la organización.

### 6. Sitemap y enlaces internos

Se agregan las 5 URLs nuevas a `sitemap.xml`. En `servicios/index.html` cada servicio enlaza a su página de detalle. La guía enlaza a cursos y servicios. El menú no cambia.

## Risks / Trade-offs

- [Riesgo] Keyword "registro sanitario digesa" con KD 76–82 es competitiva: el top 10 incluye el sitio oficial de DIGESA → Mitigación: la página se enfoca en la intención de servicio ("tramitamos") y en la variante de cola larga; no se promete ranking en el corto plazo.
- [Riesgo] Contenido de registro sanitario sin pasos confirmados puede contradecir el trámite real → Mitigación: el texto se limita al PDF y no describe pasos; el dueño confirma antes de publicar.
- [Riesgo] Volúmenes de octubre 2026 pueden cambiar → Mitigación: re-medir con `DATA_getKeywordsMetrics` antes de publicar.
- [Trade-off] Cinco páginas nuevas sin enlace desde el menú tienen menos autoridad interna → aceptado; el menú se evalúa en un change posterior.
- [Riesgo] Las 13 páginas se editan a mano para `<title>` y meta description → Mitigación: la tarea verifica longitud con un script de conteo, no a ojo.

## Migration Plan

1. Respaldo previo de las páginas que se editan en `/tmp/opencode/respaldo-*/` (regla del proyecto).
2. Crear las 5 páginas nuevas con su contenido y JSON-LD.
3. Ajustar `servicios/index.html`, `sitemap.xml`, `tools/generar-fichas.mjs` y las 13 páginas en `<title>` y meta description.
4. Regenerar fichas con `node tools/generar-fichas.mjs` y verificar que no hay cambios no esperados.
5. Rollback: restaurar desde el respaldo; no ejecutar el generador.

## Open Questions

Ninguna que cambie el alcance. El método de publicación en `proinocuidad.com` (WordPress, reemplazo por el sitio estático o aplicación vía `novamira`) es una decisión posterior que no afecta el contenido de este change y se decide en un change de publicación.
