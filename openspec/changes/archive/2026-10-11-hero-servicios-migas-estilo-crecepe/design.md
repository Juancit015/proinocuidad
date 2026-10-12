# Design

## Context

- Servicios (`servicios/index.html` 81-86): `.page-head > .container > h1 + p`, fondo degradado azul (CSS 452-457), sin migas.
- Crecepe (`presencia-digital.html` 243-251, `styles.css` 2512-2539): `nav.breadcrumbs` (flex, gap 8 px, link acento) + `h1` + `.page-hero-sub`, sobre foto con overlay. Variante `.has-bg`: texto blanco con sombra.
- Proinocuidad ya tiene fondo oscuro en `.page-head`: equivale al caso `.has-bg` de Crecepe (texto blanco directo, sin sombras porque no hay foto aún).
- Las otras 3 páginas interiores comparten `.page-head` sin migas; no se tocan.
- Ver `proposal.md` y `specs/pagina-servicios/spec.md`.

## Goals / Non-Goals

**Goals:**
- Migas "Inicio / Servicios" sobre el h1, estilo Crecepe adaptado al fondo azul.
- Hero listo para recibir foto de fondo después (overlay por degradado).

**Non-Goals:**
- No se añade foto ahora; no cambia el fondo actual.
- No se tocan h1, párrafo, ni el resto de la página; tampoco Nosotros/Noticias/Cursos.
- El hover de la miga no usa subrayado (coherencia con el change del footer).

## Decisions

**1. Marcado espejo de Crecepe con rutas relativas por página.**
`<nav class="breadcrumbs" aria-label="Migajas de pan"><a href="../index.html">Inicio</a> <span aria-hidden="true">/</span> <span>Actual</span></nav>` como primer hijo del `.container` del `.page-head`. La página actual en `span` (no enlace), igual que Crecepe. Se aplica en Servicios, Nosotros, Noticias y Cursos/índice con el nombre de cada `h1`.

**2. Reglas `.breadcrumbs` globales en `main.css` (reutilizables).**
Aunque hoy solo Servicios las usa, se definen globales para que Nosotros/Noticias/Cursos las adopten después sin CSS nuevo: `display:flex; gap:8px; font-size:0.85rem; margin-bottom:18px; color:#fff; a{color:#fff;font-weight:600} a:hover{color:#ff8f96;text-decoration:none}`. Sin `text-shadow` (no hay foto). Alternativa (scoped a Servicios) descartada: duplicaría CSS en la extensión futura.

**3. Preparación para foto sin cambiar el visual actual.**
El degradado azul existente actúa como base; cuando llegue la foto se añadirá como `background-image` con overlay oscuro manteniendo el mismo marcado. Se deja constancia en el diseño para no reestructurar después. Alternativa (capa overlay ya) descartada: sin foto no aporta nada visible.

## Risks / Trade-offs

- [Riesgo] Las migas añaden un enlace "Inicio" duplicado del menú. → Mitigación: es el patrón estándar de migas (igual que Crecepe); sin impacto SEO (enlace interno existente).
- [Riesgo] El `h1` debe seguir siendo único. → Mitigación: no se toca; la tarea de verificación lo exige.

## Migration Plan

- Publicar `servicios/index.html` + `main.css` juntos. Rollback: respaldos (tarea 1.1).

## Open Questions

Ninguna.
