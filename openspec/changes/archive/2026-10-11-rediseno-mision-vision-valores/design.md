# Design

## Context

- Sección actual en `nosotros/index.html` (líneas 118-157): `section.identidad` > `.container` > `.section-head` (badge, h2, subrayado) + `.cards-grid` con 3 `article.card` > `.card-body` (`h3` + `p`/`ul.lista-check`).
- `.card` y `.cards-grid` son globales y se usan en Inicio, Servicios y Cursos. No deben modificarse.
- Variables del sitio en `assets/css/main.css` (líneas 8-24): `--azul` #101477, `--rojo` #ad343b, `--grafito` #252525, `--gris` #5c5f6a, `--gris-linea` #e3e5ee, `--radio`, `--sombra`.
- Referencia del usuario: Montserrat y hex literales. Decisiones del usuario: paleta del sitio; se conserva la cabecera de sección. Se mantiene Outfit, la fuente del sitio.
- Ver proposal.md y specs/pagina-nosotros/spec.md.

## Goals / Non-Goals

**Goals:**
- Tres tarjetas en fila con cabecera de color, ícono circular y bullets rojos, con valores de la referencia adaptados a la paleta del sitio.
- Diseño de 1 columna en móvil (≤800px, como la referencia).
- Textos literales sin cambios.

**Non-Goals:**
- No cambiar `.card`, `.cards-grid` ni otras secciones de Inicio, Servicios, Cursos o Noticias.
- No cambiar Outfit por Montserrat ni los hex literales de la referencia.
- No tocar la cabecera de sección (badge, h2, subrayado).

## Decisions

**1. Clases con prefijo propio dentro de `.identidad`.**
Clases `.mvv-grid`, `.mvv-card`, `.mvv-icon`, `.mvv-head`, `.mvv-body`, `.mvv-list`, scoped bajo `.identidad`. Evita conflictos con `.card` y `.cards-grid` globales. Alternativa (reescribir `.card`) descartada: afectaría a otras secciones.

**2. Ícono sobre el borde.**
La tarjeta es `position: relative`; el ícono es `position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%)` con `background: var(--azul)`, `border: 4px solid #fff`, `box-shadow: 0 0 0 1px var(--gris-linea)` (equivale al borde de la referencia). Padding superior de 56px para que la cabecera no tape el ícono.

**3. Cabecera de tarjeta.**
Bloque `.mvv-head` con `background: var(--azul)`, texto blanco, negrita (700), 16px, `padding: 10px`, con margen negativo horizontal igual al padding de la tarjeta para ocupar todo el ancho.

**4. Tipografía y color.**
Cuerpo 14px, `line-height: 1.6`, `text-align: justify`, color `var(--gris)`. Bullets con `::before` de 14px, `border-radius: 50%`, `background: var(--rojo)`. La fuente hereda Outfit del sitio.

**5. Responsive.**
`grid-template-columns: repeat(3, 1fr)` por defecto; `@media (max-width: 800px)` a `1fr`. Breakpoint de la referencia.

## Risks / Trade-offs

- [Riesgo] La cabecera (`.mvv-head`) con margen negativo puede desbordar si el padding cambia. → Mitigación: usar el mismo valor de padding en tarjeta y margen; revisión visual.
- [Riesgo] El ícono de 56px sobre el borde puede solaparse con el badge o el subrayado de la cabecera de sección. → Mitigación: `padding-top: 56px` y `margin-top` del grid suficiente; revisión visual en escritorio y móvil.
- [Riesgo] Justificar texto en móvil genera espacios irregulares. → Aceptado por la referencia; se valida visualmente.

## Migration Plan

Publicar solo `nosotros/index.html` y los estilos `.mvv-*` juntos. Rollback con respaldo previo a editar (`/tmp/opencode/respaldo-mision-vision-valores/`).

## Open Questions

Ninguna. Decisiones registradas: paleta del sitio y cabecera de sección conservada.
