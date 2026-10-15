# Design

## Context

La ficha usa `.ficha-layout` (1 columna bajo 1040px, 2 columnas + sidebar sticky por encima) con `.pagos-grid-moderno` en 2 columnas, `.metodologia-steps` en 3 columnas y `.pago-qr-destacado` en fila hasta 680px. Las filas `.pago-copiable` (monospace sin envoltura) y `.pago-card-top` no se envuelven en 681–1040px, y el `min-width: 0` de hijos de grid solo existe en el media ≤680px. Resultado: el contenido mínimo estira la página y aparece la barra horizontal. Ver specs del change para los requisitos.

## Goals / Non-Goals

**Goals:**
- Cero desplazamiento horizontal en 681–1040px en la ficha.
- Layout de 2 columnas + sticky intacto por encima de 1040px; móvil 360/390 sin cambios.

**Non-Goals:**
- Cambiar textos, datos, enlaces o el diseño desktop ancho.
- Tocar el generador u otras páginas.

## Decisions

- **Extender `min-width: 0` a los hijos de grids de ficha en el rango intermedio**: causa raíz — permite que las columnas se encojan bajo su contenido mínimo. Alternativa descartada: `overflow-x: hidden` global — maquilla el síntoma y rompe el sticky del sidebar.
- **Envolver `.pago-copiable` y `.pago-card-top` (`flex-wrap: wrap; gap: 8px`, `word-break: break-all` en el CCI) en 681–1040px**: el botón baja si no cabe. Alternativa descartada: reducir fuente — ilegible el número de cuenta.
- **Apilar o envolver `.pago-qr-destacado` (columna o wrap) en el rango intermedio**: el QR de 210px + gap 28px + info no caben en fila angosta.
- **Colapsar `.pagos-grid-moderno` (2→1) y `.metodologia-steps` (3→1 o 2→1) en el rango intermedio**: columnas angostas con tarjetas de ~290px fuerzan el desborde.
- Todo dentro de media queries de la ficha en `assets/css/main.css`.

## Risks / Trade-offs

- [Riesgo] Apilar tarjetas en tablet deja la página más larga → Mitigación: preferible al scroll horizontal; el orden visual se conserva.
- [Trade-off] El botón "Copiar CCI" puede quedar debajo del número en anchos intermedios — aceptable y preferible al desborde.

## Migration Plan

Sin despliegue especial: cambio solo CSS. Rollback con el respaldo previo a la implementación.

## Open Questions

Ninguna.
