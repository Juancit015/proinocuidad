# Design

## Context

Ver proposal.md (Why). Estado actual: las 4 subpáginas de `servicios/` tienen resumen de 2–3 párrafos sin "Ver más"; el componente `<details class="ampliar">` ya está generalizado en `assets/css/main.css` y `assets/js/main.js` (animación 400ms, `prefers-reduced-motion`, single-open por página). `tools/generar-fichas.mjs` solo genera fichas de cursos: las subpáginas de servicios se editan a mano. Restricciones: un `<h1>` con keyword, canonical y JSON-LD `Service` intactos; sin precios/plazos no confirmados; sin commit/push sin confirmación; respaldo previo en `/tmp/opencode/respaldo-*/`.

## Goals / Non-Goals

**Goals:**
- Añadir el contenido complementario por subpágina como texto visible, sin plegables.
- Adaptar el detalle del docx a cada norma con agregados ya visibles en el sitio.

**Non-Goals:**
- No cambiar `servicios/index.html` (conserva sus "Ver más"), menú, títulos SEO, CTA final, topbar/footer/flotantes.
- No añadir imágenes ni alterar CSS/JS.

## Decisions

- **D1: Edición directa de los 4 HTML con respaldo previo.** Alternativa (extender el generador) descartada: el generador no cubre servicios; crear uno nuevo añade complejidad sin beneficio para 4 páginas.
- **D2: Contenido visible sin plegable (decisión de Juan).** El "Ver más" no tiene sentido en estas páginas de detalle; el texto queda expuesto. Alternativa (reutilizar `.ampliar`) descartada por el dueño.
- **D3: Detalle = base docx + agregado puntual ya visible.** Los enlaces a curso/diplomado se conservan en el resumen visible; el detalle no los duplica salvo mención corta. Alternativa (copiar literal el bloque del listado) descartada: generaría texto duplicado y párrafos descontextualizados por norma.
- **D4: Sin imágenes nuevas.** Las subpáginas no tienen foto y el contenido es documental; añadir fotos exigiría licencias y rompe el layout actual de una columna.

## Risks / Trade-offs

- [Duplicación parcial listado ↔ subpágina] → Mitigación: adaptar el texto a cada norma, no copiar literal; verificar lectura en cada página.
- [Afirmaciones no confirmadas (plazos, pasos de trámite)] → Mitigación: solo base docx + agregados ya visibles; revisión de que no aparezcan precios/plazos/pasos.
- [Regresión visual en 390px] → Mitigación: el componente ya es responsive; verificación manual en escritorio y 390px (tarea dedicada).

## Migration Plan

Sitio estático sin build: editar, verificar (`diff`, un `<h1>`, canonical, JSON-LD, despliegue/plegado en escritorio y 390px), registrar CHANGELOG. Rollback: restaurar respaldo de `/tmp/opencode/respaldo-*/`.
