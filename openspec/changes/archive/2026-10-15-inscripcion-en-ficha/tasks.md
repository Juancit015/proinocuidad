# Tasks

## 1. Formulario embebido en fichas con comprobante condicional

- [x] 1.1 Respaldar `tools/generar-fichas.mjs`, `assets/css/main.css` y `assets/js/main.js` en `/tmp/opencode/respaldo-insc-ficha/`, verificado con `ls` del respaldo
- [x] 1.2 Añadir el bloque de formulario (`#form-inscripcion`: curso precargado, datos, voucher, comprobante Boleta/Factura con RUC y razón social, conformidad, envío FormSubmit) en `tools/generar-fichas.mjs` tras el bloque de inscripción, cambiar "Matricularme Ahora" a ancla interna, con estilos en `assets/css/main.css` y lógica condicional en `assets/js/main.js`; verificar `node --check` y llaves balanceadas
- [x] 1.3 Regenerar las 8 fichas, verificar con capturas en 1280 y 390 (formulario visible tras "¿Cómo formalizar tu inscripción?", curso precargado, factura exige RUC/razón social, scroll desde el CTA, sin desborde) y registrar la entrada en `CHANGELOG.md`
