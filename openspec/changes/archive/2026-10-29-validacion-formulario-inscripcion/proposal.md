# Proposal

## Why

El formulario de inscripción es muy "suelto": no distingue qué es obligatorio ni guía al usuario con placeholders, y en Perú un celular sin el prefijo +51 y un DNI sin la regla de 8 dígitos dejan entrar datos incompletos que el administrador recibe en el correo. El dueño pidió añadir esas reglas al formulario de las fichas.

## What Changes

- **Etiquetas de opcionalidad**: empresa/institución y cargo/ocupación llevan la marca "(opcional)" junto a la etiqueta; el resto sigue obligatorio como hoy.
- **Placeholders en todos los campos**: guía de ejemplo en cada texto, select sin placeholder visual (persistente por diseño) y archivo indicando qué acepta.
- **DNI 8 dígitos solo Perú**: con País = Perú el documento SHALL ser exactamente 8 dígitos numéricos, con mensaje claro si falla. Con País = Extranjero la etiqueta pasa a "Documento/Pasaporte", sigue obligatorio, pero acepta alfanumérico (los pasaportes no tienen 8 dígitos).
- **Prefijo +51 solo Perú**: con Perú el campo Celular muestra el prefijo fijo "+51" no editable y acepta 9 dígitos que empiezan en 9; el envío incluye el número completo ("+51 999 999 999"). Con Extranjero el campo queda libre con placeholder de formato internacional y sin +51.
- **Fuente única**: los cambios de markup entran por `tools/generar-fichas.mjs` (no a mano en 8 fichas); el intercambio de reglas por país se hace con JS del sitio (`assets/js/main.js`, donde ya vive el JS del formulario) y los estilos del prefijo con `assets/css/main.css`.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `inscripcion`: re-escritura de "Formulario de inscripción en ficha" con las reglas de opcionalidad, placeholders, DNI condicional por país y prefijo +51; conservación de los 6 escenarios vigentes y adición de los nuevos.

## Impact

- `tools/generar-fichas.mjs`: placeholders, marcas "(opcional)", atributos de validación iniciales (Perú por defecto) y estructura para el prefijo +51 → regeneración de las 8 fichas con el guard del proyecto.
- `assets/js/main.js`: al cambiar País, intercambiar etiqueta de documento, pattern y placeholder de celular; antes del envío, completar el celular peruano como "+51 XXX XXX XXX".
- `assets/css/main.css`: estilos del campo con prefijo fijo y del aviso de opcionalidad.
- `CHANGELOG.md`: entrada del cambio.
- Sin cambios en pagos (`pagos-e-inscripcion`), en la condición factura/RUC vigente ni en el flujo FormSubmit.
