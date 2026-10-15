# Design

## Context

Ver proposal.md (Why). Estado del CSS: `.ficha-layout` es grid `minmax(0, 1fr) 360px` con gap 36px; en ≤1040px colapsa a 1 columna con sidebar estático y stats a 2 columnas; en ≤680px stats a 1 columna. Ya existen familias de contención (`min-width: 0` en hijos de grids, `flex-wrap` + `word-break` en filas de pago, grids de pagos/metodología a 1 columna). Sospechosos restantes para la banda derecha: sidebar fijo de 360px + gap, stats a 4 columnas, beneficios a 2 columnas, padding de `.ficha-seccion`, strings largos sin corte (CCI), bloque QR, hero/flyer, y los estilos de centrado de `rediseno-fichas-cursos` (a medio aplicar, 2/6).

## Goals / Non-Goals

**Goals:**
- Eliminar la banda derecha en todos los anchos con el diff mínimo, sin rediseñar.
- Método que distingue desborde real (scroll horizontal) de margen intencional de centrado.

**Non-Goals:**
- Nuevo layout, centrado adicional, cambios de contenido/markup salvo causa probada, tocar otras páginas.

## Decisions

- **D1: Bisección por bloques con capturas antes de tocar CSS.** Orden: sidebar, stats, beneficios/competencias, temario, metodología, pagos (incluido CCI y QR), inscripción/formulario, hero. Se oculta un bloque por vez hasta que la banda desaparezca; el último bloque en hacerla desaparecer es el culpable. Alternativa (parche global `overflow-x: hidden` en body) descartada: oculta el síntoma y puede romper sticky/accesibilidad con scroll.
- **D2: Familia de contención mínima según culpable.** `min-width: 0` en hijos del grid implicado; `flex-wrap` + `word-break: break-all`/`overflow-wrap` en filas con strings largos; colapsar a 1 columna el grid que no quepa; `max-width: 100%` en media/hero. Alternativa (reescribir el layout de ficha) descartada: rompe el sticky y lo ya verificado.
- **D3: Markup solo con causa probada.** Si ningún ajuste CSS contiene al culpable (p. ej. nodo con ancho fijo inline o estructura que impide el wrap), se edita `tools/generar-fichas.mjs` y se regeneran las 8 fichas; si no, las fichas no se tocan. Alternativa (editar fichas a mano) descartada: el generador las sobrescribe.
- **D4: Supuesto registrado: la banda es desborde, no margen de centrado.** La primera tarea mide scroll horizontal real por ancho; si no hay overflow (es margen simétrico del centrado a medio aplicar), no se fuerza CSS: se reporta y se devuelve a `rediseno-fichas-cursos`. Alternativa (asumir centrado y ajustar max-width) descartada: contradice la dirección del rediseño sin evidencia.

## Risks / Trade-offs

- [El culpable varía por ancho] → Matriz de verificación 360/390/768/900/1280 en diplomado + 1 ficha corta.
- [Regresión del sticky o del apilado ≤1040px] → Verificar sticky en 1280 y apilado en 768 tras el fix.
- [Solape con 3 changes activos en la misma ficha] → Este change no centra ni toca el pre-footer; si el culpable es un estilo del rediseño a medio aplicar, se coordina con ese change en vez de duplicar.
- [Doble cobertura del rango intermedio con `ficha-sin-desborde-intermedio`] → Al archivar, ese change debe ir primero o declararse superado en este rango; si ya está aplicado en el CSS, este change lo toma como base.

## Migration Plan

Sin migración. Solo CSS (y regeneración de fichas si D3 aplica). Rollback: revertir el ajuste. Sin commit/push sin confirmación.

## Open Questions

Ninguna.
