# Design

## Context

Ver motivación en `proposal.md` (Why) y requisitos en `specs/`. Estado actual verificado en el repo:

- `.topbar` (línea de contacto + `.topbar-social`) se muestra siempre; en ≤860px solo se ocultan los iconos (`main.css` línea 487) y en ≤560px la línea achica fuente. El teléfono y correo también están en el footer de todas las páginas.
- Los banners (`.page-head--servicios/--nosotros/--noticias/--cursos`, líneas 532-539) usan `background-image` con degradado + AVIF, `background-size: cover`, sin attachment (scroll por defecto). Los usan 9 páginas; las fichas de curso y el Hero de Inicio no usan estas clases.
- Existe patrón global de `prefers-reduced-motion` (línea 683) y breakpoint móvil en 860px.

Restricciones: solo CSS, sin tocar HTML; sin cambios de textos, enlaces, colores ni otras secciones; respaldo previo; trabajo en local.

## Goals / Non-Goals

**Goals:**

- Barra superior oculta en móvil reutilizando el media query ≤860px existente.
- Fondo fijo en los 4 banners en escritorio, con retorno a scroll en móvil y con movimiento reducido.

**Non-Goals:**

- Efectos con JavaScript (parallax por scroll): CSS basta y evita costo de mantenimiento.
- Tocar el Hero, las fichas, el footer o el DOM de la barra (sigue en el HTML, oculta por CSS).
- Cambiar breakpoint móvil global (se asume el existente de 860px).

## Decisions

- **`display: none` a `.topbar` dentro del media ≤860px existente** en vez de un query nuevo o de borrar el HTML. Alternativa descartada: eliminar el bloque del HTML, que rompería el escritorio y perdería contenido reversible.
- **Regla compartida de `background-attachment: fixed`** para las 4 variantes de banner en vez de 4 reglas. Alternativa descartada: reglas por variante, que cuadruplican el mismo valor.
- **Excepciones con los patrones existentes**: `scroll` en ≤860px (iOS Safari no soporta bien fondos fijos: saltos y parpadeo) y bajo `prefers-reduced-motion` junto al bloque de la línea 683.

## Risks / Trade-offs

- [Riesgo] En iOS el fondo fijo falla aunque el ancho sea de tableta apaisada → Mitigación: la excepción ≤860px cubre teléfonos y tabletas cortas; verificar en revisión visual.
- [Riesgo] Navegadores antiguos que ignoran `fixed` → Mitigación: degradan a scroll, que es el comportamiento actual; sin ruptura.
- [Riesgo] Ocultar la barra reduce visibilidad del contacto en móvil → Mitigación: teléfono y correo siguen en el footer de cada página (verificado); sin cambios de contenido.

## Migration Plan

Solo `assets/css/main.css`, con respaldo previo en `/tmp/opencode/respaldo-*/`. Rollback: restaurar el respaldo. Sin despliegue (publicación fuera de alcance). Revisión visual en escritorio y móvil antes de archivar.
