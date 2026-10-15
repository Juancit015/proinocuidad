# Proposal

## Why

El cliente pidió un formulario de inscripción propio (similar al de la referencia) con opción de comprobante de pago (boleta/factura; factura exige RUC y razón social). En vez de página aparte, el formulario vive dentro de cada ficha, debajo de la tarjeta "¿Cómo formalizar tu inscripción?": el usuario se inscribe sin salir del curso que está viendo.

## What Changes

- Cada ficha incluye debajo de "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" con: curso (campo oculto precargado por ficha + nombre visible), nombre y apellidos, DNI, empresa/institución, cargo, celular, correo, país, voucher de pago (archivo), checkbox "Deseo comprobante de pago" → radio Boleta / Factura → si Factura, RUC (11 dígitos) y razón social obligatorios; checkbox de conformidad y botón Enviar.
- Envío compatible con sitio estático vía FormSubmit a `administracion@proinocuidad.com` (supuesto; si Juan prefiere otro destino, se cambia el endpoint como dato).
- Los botones "Matricularme Ahora" de la ficha hacen scroll al formulario (`#form-inscripcion`) en vez de salir al Google Form externo, que queda como respaldo documentado.
- Todo generado vía `tools/generar-fichas.mjs` (respeta la regla fichas-vía-generador); sin cambios de precios, pagos ni resto del sitio.

## Capabilities

### New Capabilities

- `inscripcion`: formulario de inscripción embebido en ficha con comprobante de pago condicional (boleta/factura con RUC y razón social).

### Modified Capabilities

- `pagos-e-inscripcion`: el CTA de matrícula SHALL llevar al formulario dentro de la ficha en vez del Google Form externo.

## Impact

- `tools/generar-fichas.mjs` (bloque de formulario por ficha) + 8 fichas regeneradas.
- `assets/css/main.css` (estilos del formulario), `assets/js/main.js` (lógica condicional boleta/factura).
- Dependencia externa nueva: FormSubmit (solo envío; sin backend propio).
