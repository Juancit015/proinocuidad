# Design

## Context

- Menú en cada página: `ul.nav-menu` > `li.nav-drop` (Servicios, luego Cursos) > `div.mega-panel` > `div.mega-panel-inner` (grilla de 2 columnas) con `a` (`strong` + `span`) y `a.mega-cta`.
- Reglas base en `assets/css/main.css`: `.mega-panel` (ancho `min(620px, 92vw)`, padding 20px, `a` con padding 13px, `span` 0.83rem) y móvil en `@media (max-width: 860px)`, donde `.mega-panel` pasa a bloque y `.mega-panel-inner` a 1 columna.
- Ya existen reglas `.mega-panel-servicios` (icono 36px, 4 ítems de Servicios). Se reemplazan por `.mega-panel-compacto`, aplicada a ambos paneles.
- Los 4 cursos destacados están en `assets/js/cursos-data.js` (`enHome: true`). Sus slugs: `diplomado-gestion-calidad-e-inocuidad`, `legislacion-sanitaria-alimentos`, `haccp-implementacion-certificacion-digesa-senasca`, `formacion-auditor-interno-haccp`.
- La plantilla `tools/generar-fichas.mjs` tiene textos del menú más cortos que las páginas en vivo; se mantienen sus textos propios y solo cambian ítems e íconos.

## Goals / Non-Goals

**Goals:**
- Ambos paneles de 460px, padding 10px, 4 ítems cada uno con ícono de 44px y altura uniforme.
- Mismo bloque de menú en las 13 páginas y en la plantilla.

**Non-Goals:**
- No cambiar el menú principal, colores de marca, tipografía base ni otras secciones.
- No crear `.mi` ni `.mt`.
- No cambiar textos ni enlaces de los ítems, salvo quitar los 4 cursos no destacados del submenú.

## Decisions

**1. Clase compartida `mega-panel-compacto`.**
Un solo juego de reglas para ambos paneles; sustituye a `mega-panel-servicios`. Especificidad mayor que `.mega-panel` para vencer sus reglas base y el móvil se resuelve en un `@media` propio.

**2. Altura uniforme con filas explícitas en escritorio.**
`grid-auto-rows: 1fr` por sí solo estiraba el botón "Ver todos" (medido: 149px). Se usa `grid-template-rows: repeat(2, 1fr) auto` solo en escritorio: las dos filas de ítems iguales y la fila del botón de altura natural. En móvil, 1 columna y filas automáticas, para no forzar 2 filas.

**3. Iconos.**
Servicios conserva los 4 íconos actuales. Cursos: birrete (Diplomado), balanza (Legislación), escudo con check (HACCP Perú), lupa con check (Auditor interno). Trazo 2, azul marino, `aria-hidden`.

**4. Plantilla de fichas.**
En el generador se filtran los 4 cursos destacados y se añaden íconos, manteniendo sus textos propios. Las fichas se regeneran con el script.

## Risks / Trade-offs

- [Riesgo] Con 460px y descripciones largas, el ítem queda alto (~150px). → Aceptado por el pedido; se valida visualmente.
- [Riesgo] El texto de Cursos en la plantilla es más corto que en las páginas. → Se mantiene el texto de cada origen; no se unifica sin pedirlo.
- [Riesgo] Cuatro cursos menos en el submenú. → Cubierto por el pedido; las fichas siguen en la página Cursos.

## Migration Plan

Actualizar `assets/css/main.css`, las 13 páginas y `tools/generar-fichas.mjs`; regenerar fichas. Rollback con `/tmp/opencode/respaldo-submenu-servicios/`.

## Open Questions

Ninguna.
