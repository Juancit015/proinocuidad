# Tasks

## 1. Markup del formulario en `tools/generar-fichas.mjs` (fuente única)

- [x] 1.1 Añadir "(opcional)" con `<span class="opcio-campo">(opcional)</span>` a las etiquetas de Empresa/Institución y Cargo/Ocupación. Los demás campos siguen obligatorios y sin marca.
- [x] 1.2 Añadir placeholders: nombre "Ej.: María Torres Quispe", dni "8 dígitos", empresa "Ej.: Conservas del Norte S.A.C.", cargo "Ej.: Jefa de Calidad", celular "999 999 999", correo "correo@ejemplo.com".
- [x] 1.3 Añadir al `input[name="dni"]` `pattern="[0-9]{8}"` y `title="El DNI tiene 8 dígitos."`, y al `input[name="tel"]... celular` `pattern="[0-9]{9}"`, `maxlength="9"` y `title="El celular peruano lleva 9 dígitos que empiezan en 9."` (estado inicial: Perú predeterminado).
- [x] 1.4 Envolver el input del celular en `<span class="campo-con-prefijo"><span class="prefijo" aria-hidden="true">+51</span>…input…</span>` sin cambiar el `label`/`name` del campo.
- [x] 1.5 Regenerar las 8 fichas con el guard: `cp -r cursos /tmp/cursos-antes`, `node tools/generar-fichas.mjs` (exit 0), y `diff -rq` mostrando únicamente los cambios de este change. Si aparece cualquier otra diferencia de bytes, detenerse y revisar el prefijo `ruta`/`cursos` del generador antes de seguir. (Exit 0; solo las 8 fichas difieren, 404.html intacto.)

## 2. Reglas por país en `assets/js/main.js`

- [x] 2.1 Definir `REGLAS_PAIS` (Perú y Extranjero) con: etiqueta de documento ("DNI" / "Documento/Pasaporte"), pattern/title de documento (`[0-9]{8}` / `[A-Za-z0-9]{5,17}` "N.º de pasaporte"), pattern/simple de celular, placeholder de celular ("999 999 999" / "+57 300 123 4567") y visibilidad de prefijo.
- [x] 2.2 Suscribirse a `change` del `select[name="pais"]` en cada `.form-inscripcion`: actualizar nodo de texto del label del documento, atributos de documento y celular, placeholder y visibilidad del `.prefijo` (+51 oculto con Extranjero). (Aplica el estado también al cargar.)
- [x] 2.3 En el listener `submit` existente, con Perú, mutar el `input[name="celular"].value` a `"+51 " + valor` antes de cualquiera de las dos vías de envío (nativa con voucher o AJAX), una sola vez por envío. (+ Formato "999 999 999" con 9 dígitos y guard contra prefijo duplicado en reintentos.)
- [x] 2.4 Si el documento falla `checkValidity()` en submit (solo Perú), mostrar el mensaje en el `.campo-error` del form con el patrón ya existente de la condición factura, sin ocultar el error nativo. (Por el evento `invalid` del input, que sí corre aunque el navegador cancele el submit; se oculta al corregir.)

## 3. Estilos en `assets/css/main.css`

- [x] 3.1 `.campo-con-prefijo`: contenedor flex alineado al estilo de inputs actuales (borde, radio, focus compartido), `.prefijo` en gris, sin wrap ni desborde, y el input interno `flex: 1` sin borde propio.
- [x] 3.2 `.opcio-campo` en gris pequeño junto al label; verificar contraste y que a 390px la etiqueta no se corte. (Envuelto con .label-tit porque el label es grid y el span directo caía a su propia línea.)
- [x] 3.3 Confirmar que las reglas nuevas no tocan los campos del bloque factura ni el select estilizado ya existente (visuales).

## 4. Verificación (Playwright, servidor local)

- [x] 4.1 Perú (default): DNI "12345678" pasa; "1234567" y "123456789" bloquean el envío con mensaje; celular "987654321" + POST con voucher llega con value "+51 987654321" (capturable por el JS o red observable); prefijo +51 visible en el campo con `getComputedStyle`. (POST capturado con "+51 987 654 321", dni "12345678" y voucher-real.png adjunta; el inválido bloquea con el título del DNI.)
- [x] 4.2 Extranjero (elegir en select): etiqueta cambia a "Documento/Pasaporte", documento "P1234567" (alfanumérico) se acepta, el celular "77 1234 5678" no suma +51 (el POST llega tal cual) y el `.prefijo` no se renderiza. (dni "P1234567" y celular "771234567" llegan literal en el multipart; sin "+51" en todo el cuerpo.)
- [x] 4.3 Volver de Extranjero a Perú restaura pattern/placeholder/etiqueta/prefijo sin recargar. (label "DNI", pattern `[0-9]{8}`, placeholder "999 999 999", prefijo visible.)
- [x] 4.4 A 390px: labels, "(opcional)" y placeholders completos, sin desborde horizontal; el prefijo no tapa el inpuf (campo celular a todo ancho). ("(opcional)" en línea con el título medido en la captura a 390.)
- [x] 4.5 El cono de comprobante (factura/RUC) sigue funcionando igual: RUC invalida 11 dígitos y boleta no pide RUC (regresión del change vigente). (Error custom visible con RUC de 10 dígitos; boleta sin RUC; con RUC 11 + razón el POST sale completo, 2061 bytes.)
- [x] 4.6 0 desborde a 1280 y 390; guard de regeneración exit 0 sin diferencias residuales; `git status` sin fichas huérfanas. (Desborde 0px medido en ambos anchos.)

## 5. Documentación y cierre

- [ ] 5.1 Añadir la entrada al `CHANGELOG.md` con los resultados medidos (reglas activadas, valor "+51 …" en el POST, regeneración exit 0).
- [ ] 5.2 Ejecutar `openspec validate validacion-formulario-inscripcion --strict`.
- [ ] 5.3 Commitear en dos commits separados (código: generador + fichas regeneradas + JS + CSS; OpenSpec: change) y dejar el archivado para un visto bueno posterior.
