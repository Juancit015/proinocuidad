# Design

## Context

La estructura HTML de la ficha está limpia (`</aside></div></div></main><footer>`, sin elementos vacíos) y `.ficha-cuerpo` aporta 46px + 26px de margen de sección. El aire observado es mucho mayor, por lo que la causa es un estilo residual (margen colapsado, min-height, grid estirado o resto de un fix anterior). Sospechoso histórico: la zona de `#medios-pago`. Ver specs del change para los requisitos.

## Goals / Non-Goals

**Goals:**
- Aire pre-footer reducido a la separación coherente (~70px) en 1280 y 390.
- Causa identificada y eliminada, no maquillada.

**Non-Goals:**
- Cambiar contenido, markup, diseño o el responsive ya verificado.

## Decisions

- **Bisección por secciones con capturas** (ocultar bloques de a uno hasta que el aire desaparezca, como en diagnósticos anteriores): identifica la causa exacta antes de tocar CSS. Alternativa descartada: adivinar y parchear márgenes — ya se intentó en fixes previos y el aire persistió.
- **Ajuste mínimo sobre la causa** (p. ej. margen/min-height sobrante o stretch del grid): un solo cambio en `assets/css/main.css`. Alternativa descartada: margen negativo en el footer — maquillaje que se rompe en otros anchos.
- Si la bisección revela que la causa está en el markup del generador (no en CSS), se corrige en `tools/generar-fichas.mjs` y se regenera, manteniendo la regla fichas-vía-generador.

## Risks / Trade-offs

- [Riesgo] La causa afecta también a otras páginas → Mitigación: el ajuste se acota a selectores de ficha (`.ficha-*`); verificación en home tras el cambio.
- [Trade-off] Si la causa es estructural del grid, el ajuste puede mover el sidebar — verificar sticky en 1280 tras el cambio.
