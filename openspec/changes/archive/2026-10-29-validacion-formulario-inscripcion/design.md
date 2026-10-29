# Design

## Context

El formulario vive en una sola fuente: el script `tools/generar-fichas.mjs` genera las 8 fichas; su JS condicional (comprobante boleta/factura + RUC) y su entrega a FormSubmit están en `assets/js/main.js`. Estado actual verificado: DNI sin regla de dígitos, celular libre sin prefijo, sin placeholders, opcionales sin marca. La capability `inscripcion` solo exige la estructura vigente, así que las reglas nuevas se suman sin romper "Comprobante de pago condicional" (RUC 11 dígitos queda igual).

## Goals / Non-Goals

**Goals:**
- Reglas condicionales por país (Perú/Extranjero) y guías visuales de formato, con la menor superficie de código posible.
- Dejar el correo administrativo legible: documento correcto y celular completo con "+51".

**Non-Goals:**
- No cambia el flujo de entrega (clásico con voucher / AJAX sin voucher) ni el honeypot ni la lógica factura/RUC.
- No se agregan librerías de máscara ni validación externa: reglas nativas (`pattern`, `maxlength`) + un bloque JS pequeño ya existente.
- No cambia el select de Perú/Extranjero (sin buscador de países).

## Decisions

### Toda la configuración por país en JS, sobre extremos que ya existen

`main.js` ya atando el formulario: se añade un objeto `REGLAS_PAIS` con la configuración de cada país (etiqueta de documento, pattern de documento, pattern de celular, placeholder de celular, con/sin prefijo). Al cambiar el `select[name="pais"]`, el listener:

- cambia el texto del label del documento ("DNI" ↔ "Documento/Pasaporte") sobre su nodo de texto,
- intercambia `pattern`/`title` de documento y celular,
- alterna placeholder de celular y visibilidad del prefijo `+51`.

Con Perú por defecto, nada cambia al cargar (no hay listener hasta que interactúe), y el HTML ya nace correcto por el generador.

### Prefijo +51 como texto fijo dentro del contenedor del input

El `<input>` va envuelto en un `<span class="campo-con-prefijo">` con `<span class="prefijo">+51</span>` delante; el prefijo está fuera del input (no se seleccione ni copie junto al número por error) y sobra con CSS para alinear. El `pattern` del input con Perú es `[0-9]{9}` (starts-with-9 se refuerza con `title` "9 dígitos que empiezan en 9"; máximo con `maxlength="9"`).

**Valor en el envío:** el email debe llegar "+51 999 999 999" tal como el dueño pidió. Al interceptar el `submit` en `main.js` (que existe por el change de hoy), antes de cualquiera de las dos vías (nativa con voucher o AJAX sin voucher) se reescribe `input[name="celular"].value = "+51 " + valor` — una mutación síncrona: el POST clásico toma el valor mutado, y el AJAX (FormData) se construye después por lo que también lo registra. La mutación SOLO corre en el submit (no en blur) para no sorprender al usuario que reedita.

**Escapando de Extranjero:** si vuelve a Perú, el placeholder y el pattern se restauran; si llegó a enviar en Extranjero con letras en el celular, no es problema: la validación se evalúa en `submit` con el `pattern` vigente.

### DNI 8 dígitos: pattern nativo + mensaje con `title`

`input[name="dni"]` con Perú: `pattern="[0-9]{8}"`, `inputmode="numeric"` ya presente, `title="El DNI tiene 8 dígitos."`. Con Extranjero: `pattern="[A-Za-z0-9]{5,17}"` (pasaporte razonable, alfanumérico). El mensaje nativo del navegador basta en primera línea; si el dueño lo quiere custom hay el bloque `.campo-error` ya en el form (main.js:238) al que se suma un mensaje de documento si `checkValidity()` falla en el submit — mismo patrón que la condición factura/RUC, sin condiciones nuevas.

### Opcionales y placeholders en el generador

"(opcional)" dentro de la etiqueta con un `<span class="opcio-campo">` (gris, no sobra peso semántico en el `label`), placeholders tomados del formato peruano real: nombre "Nombres y apellidos" → "Ej.: María Torres Quispe", DNI → "8 dígitos", Documento/Pasaporte → "N.º de pasaporte", celular Perú → "999 999 999", celular Extranjero → "+57 300 123 4567", correo → "correo@ejemplo.com", empresa → "Ej.: Conservas del Norte S.A.C.", cargo → "Ej.: Jefa de Calidad". El voucher no lleva placeholder (los navegadores no lo dibulan): el texto orientador ya está bajo el label ("Archivo adjunto… " queda como está).

## Risks / Trade-offs

- **Regeneración de fichas:** cualquier cambio de `generar-fichas.mjs` reescribe 8 fichas; el guard `cp -r cursos /tmp/... && node … && diff -rq` es obligatorio y exiges exit 0 igual que siempre.
- **Pais dinámico y spec estática:** el HTML nace "Perú"; la época Extranjero se ve probada con Playwright cambiando el select. La breve риск es que alguien vulnere el patrón desde consola: irrelevante, la validación final es la del `submit`.
- "**+51 " con espacio en el value enviCarla:** el correo lo muestra con el espacio; si molesta, es cambio de un string. Sin efecto en FormSubmit.
- **`title` en input nativo:** en desktop se muestra al fallar; en móvil la burbuja nativa también aparece al focus. Suficiente para v1; se puede migrar al `.campo-error` custom en un change de pulido si el dueño pide mensajes no nativos.
- **Escenarios ocultos del comprobante:** el cambio no altera la condición del RUC ni su spec; solo se suman reglas nuevas dentro del requirement MODIFIED (los 6 escenarios vigentes se conservan por exigencia del validador).

## Migration Plan

1. Generador: labels con "(opcional)", placeholders, pattern/title/maxlength (estado Perú), wrapper del prefijo.
2. Regenerar fichas con guard (`diff -rq` vacío respecto de /tmp-previo excepto los cambios esperados).
3. `main.js`: REGLAS_PAIS + listener del select + mutación del celular en submit + mensaje de documento en el bloque `.campo-error`.
4. `main.css`: `.campo-con-prefijo`, `.prefijo`, `.opcio-campo`.
5. Verificación Playwright: formulario en Perú (DNI inválida bloquea, celular con +51 en el value del POST) y en Extranjero (documento alfanumérico pasa, celular sin +51), a 1280 y 390, sin desborde; verify con `getComputedStyle` el prefijo.
6. CHANGELOG + validate --strict + 2 commits (código, OpenSpec).
