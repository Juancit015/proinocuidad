# Proposal

## Why

Aceptamos personas del extranjero, pero el campo País del formulario es un texto libre con "Perú" precargado: no guía al usuario extranjero ni normaliza el dato que llega a `administracion@proinocuidad.com`.

## What Changes

- El campo País del formulario de inscripción pasa de texto libre a lista desplegable con 2 opciones: **Perú** (valor por defecto) y **Extranjero**.
- El desplegable se ve integrado al formulario (misma tipografía, padding, borde, radio y foco que los inputs; sin la flecha gris del navegador por defecto): flecha propia con la paleta del sitio.
- Mismo nombre de campo (`pais`), mismo envío por FormSubmit, resto del formulario intacto. Se aplica a las 8 fichas vía `tools/generar-fichas.mjs` (no se edita ninguna ficha a mano).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `inscripcion`: el campo país del formulario SHALL ser una lista con Perú (por defecto) y Extranjero, con estilo propio del sitio.

## Impact

- `tools/generar-fichas.mjs` (campo País del bloque del formulario) + las 8 fichas regeneradas.
- `assets/css/main.css` (estilos del `select` del formulario).
- Sin impacto en validaciones JS (el campo no es condicional), listados, pagos ni SEO. El dato `pais` sigue llegando igual a FormSubmit.
