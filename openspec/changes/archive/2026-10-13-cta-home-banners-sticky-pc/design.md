# Design

## Context

Ver motivación en `proposal.md` y requisitos en `specs/`. Estado verificado:

- `index.html`: último bloque es `#noticias` (línea 243), luego `</main>` (270) y footer global (273). Punto de inserción: última `<section>` dentro de `main`.
- Referencia CTA Crecepe (`#contacto`): grilla info (h2 con span resaltado + 4 items con ícono) + tarjeta (h3, texto, 2 botones, nota small). Se replica la estructura, no sus estilos.
- Variables en `main.css`: `--azul-oscuro #0b0e56`, `--rojo #ad343b`, `--blanco`, `#d7d9f2` (párrafos sobre oscuro, ya usado en `.page-head p`), `.btn`/`.btn-rojo`/`.btn-borde`, `.card`. Foto candidata: `normativa-higiene-planta.jpg` (1600px, apaisada, temática higiene).
- Banners: `.page-head` con padding 56/46 y `h1` compartiendo regla con `.section-head h2` (clamp 1.5–2.1rem); variantes con bg + overlay; excepción a scroll en ≤860px ya existe.
- `.site-header` (línea 150): `sticky; top:0; z-index:50`. `.nav-menu` móvil es `absolute; top:100%`, anclado a la cabecera posicionada.

## Goals / Non-Goals

**Goals:**

- CTA final en la home con estructura probada y paleta propia, apilado en móvil.
- Banners amplios y centrados en escritorio sin tocar overlay, efecto fijo ni móvil.
- Cabecera no flotante en móvil con menú funcional.

**Non-Goals:**

- Copiar colores, tipografía, textos o cifras de Crecepe.
- Fotos nuevas o hotlinks; JavaScript nuevo; cambios en subpáginas.

## Decisions

- **CTA como última sección de `main`** (tras `#noticias`) en vez de entre `</main>` y footer: conserva el landmark y no toca el footer global.
- **Fondo CTA: overlay `--azul-oscuro` sobre `normativa-higiene-planta.jpg`** en vez de azul plano: da textura manteniendo contraste para texto claro; la foto es apaisada y temática. Alternativa (fondo `--azul` plano) queda si la imagen recarga el texto.
- **Clases nuevas con prefijo `cta-` reutilizando `.btn` y radios/sombras existentes** en vez de duplicar estilos de botones; iconos SVG inline reutilizando los trazados ya presentes en el sitio (WhatsApp del flotante, trazos simples para correo/reloj/ubicación).
- **Tamaño banner: `min-height` + flex centrado + override de `h1`** solo en las variantes con fondo, sin tocar `background-image` (overlay y fixed intactos) ni el padding móvil.
- **`relative` (no `static`) en el header móvil**: `static` rompería el `top:100%` del menú acordeón al quitar el containing block; `relative` lo conserva sin flotar.

## Risks / Trade-offs

- [Riesgo] Título clamp(2.4–3.2rem) desborda en pantallas angostas de escritorio → Mitigación: `4vw` lo escala; verificar a 1024px en revisión visual.
- [Riesgo] `min-height: 55vh` + fondo fijo en tabletas apaisadas >860px con iOS → Mitigación: la excepción iOS ya existe solo ≤860px; si se observa jank, ampliar la excepción (registrar en revisión).
- [Riesgo] CTA con imagen de fondo recarga el texto → Mitigación: overlay oscuro ≥0.7 como en banners; alternativa de fondo plano lista.

## Migration Plan

Editar `index.html` (una sección) y `assets/css/main.css`, con respaldo previo. Sin build. Rollback: respaldo. Sin commit/push (lo hace Juan) ni despliegue. Revisión visual (home, Nosotros a 1440px, móvil 390px) antes de archivar.
