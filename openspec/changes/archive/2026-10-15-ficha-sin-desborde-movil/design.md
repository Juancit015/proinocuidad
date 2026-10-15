# Design

## Context

La ficha del diplomado usa `.ficha-layout` (grid contenido + sidebar sticky) con tarjetas de pago que incluyen filas `.pago-copiable` en monospace sin envoltura y `.modulo-lista` con padding izquierdo de 46px. En 360–390px la fila del CCI (~340px) supera el ancho disponible y los hijos de grid (`min-width: auto` por defecto) no se encogen. Ver specs del change para los requisitos.

## Goals / Non-Goals

**Goals:**
- Cero desplazamiento horizontal en 360/390px en la ficha.
- Sticky del sidebar intacto en escritorio.

**Non-Goals:**
- Cambiar textos, datos, enlaces o el diseño desktop.
- Tocar el generador u otras páginas.

## Decisions

- **`min-width: 0` en hijos de grid de ficha** (`.ficha-layout > *`, `.pagos-grid-moderno > *`, etc.): causa raíz — permite que las columnas se encojan bajo su contenido mínimo. Alternativa descartada: `overflow-x: hidden` en `.ficha-layout`/`.ficha-cuerpo` — maquilla el síntoma y rompe el sticky del sidebar.
- **`.pago-copiable` con `flex-wrap: wrap; gap: 8px` y `word-break: break-all`** en el media ≤680px: el botón baja si no cabe. Alternativa descartada: reducir fuente — ilegible el número de cuenta.
- **`.modulo-lista` con padding reducido** en ≤680px (`14px 16px 14px 26px`).
- Todo dentro de los media queries existentes de la ficha en `assets/css/main.css`.

## Risks / Trade-offs

- [Riesgo] Otro texto largo futuro vuelve a desbordar → Mitigación: `min-width: 0` lo contiene a nivel grid; verificación con capturas 360/390.
- [Trade-off] El botón "Copiar CCI" puede quedar debajo del número en pantallas muy angostas — aceptable y preferible al desborde.
