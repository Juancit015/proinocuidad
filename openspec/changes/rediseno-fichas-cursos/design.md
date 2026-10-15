# Design

## Context

La ficha de curso actual (`cursos/*/index.html`, generada por `tools/generar-fichas.mjs`) es una pila de `.bloque` alineados a la izquierda a ancho completo del `.container`, con hero (`.ficha-head`) también alineado a la izquierda. El bloque de pagos (`.pagos-info`) alinea logos a la izquierda con `flex-start` implícito. Ver specs del change para los requisitos. Paleta de marca y breakpoint móvil (860px) no se tocan.

## Goals / Non-Goals

**Goals:**
- Contenido de ficha centrado con ancho máximo de lectura en escritorio.
- Bloque de pagos centrado (logos, botones, datos, QR).
- Mantener el responsive actual: en móvil todo fluye a una columna sin centrado forzado que rompa la lectura.

**Non-Goals:**
- Cambiar textos, orden de bloques, enlaces o datos de pago.
- Tocar listados de cursos, home u otras secciones.

## Decisions

- **Ancho de lectura centrado**: `.ficha-cuerpo .container` o `.bloque` con `max-width` (~820px) y `margin-inline: auto`; bloques siguen apilados verticalmente, ahora centrados. Alternativa descartada: grid de 2 columnas tipo "cards" — rompería el orden I–IX del documento base y complicaría el móvil.
- **Centrado solo visual, no de cada línea**: títulos `h2` de bloque mantienen su insignia `.indice` a la izquierda del texto del título (legibilidad), el bloque como tarjeta va centrado. Alternativa descartada: centrar cada línea de texto — degrada la lectura de listas y temario.
- **Hero centrado**: `.ficha-head .container { text-align: center }` con `h1` y `.ficha-desc` con `margin-inline: auto` y `.subrayado` centrado; migas centradas. Las migas mantienen su markup y orden.
- **Pagos centrado**: `.pagos-logos { justify-content: center }`, `.ficha-cta { justify-content: center }`, `.pagos-datos` y `.pagos-qr` centrados (`margin-inline: auto`, QR en columna centrada). Los logos conservan tamaño y fondo actuales.
- **Vía generador**: cambios en la plantilla de `tools/generar-fichas.mjs` + estilos en `assets/css/main.css`; luego regenerar las 8 fichas. Ninguna ficha se edita a mano.
- **Móvil**: bajo 860px el centrado de fila de logos se conserva (wrap natural) y los bloques ocupan el ancho disponible; sin reglas nuevas salvo que la verificación visual lo exija.

## Risks / Trade-offs

- [Riesgo] El `summary` del temario usa `justify-content: space-between`: centrar el bloque no lo afecta, pero verificar que el título del módulo no se vea descentrado → Mitigación: captura en 1280 y 390.
- [Riesgo] Regenerar fichas con el generador puede traer diferencias si la plantilla driftó de los HTML → Mitigación: respaldo previo y `diff` antes/después.
- [Trade-off] Ancho máximo de lectura deja laterales vacíos en pantallas anchas — es lo pedido y mejora la lectura.

## Migration Plan

1. Respaldo de las 8 fichas y del generador.
2. Editar CSS + plantilla del generador, regenerar, verificar `diff` y capturas 1280/390.
3. Rollback: restaurar respaldo y regenerar (o revertir commit si ya existe).
