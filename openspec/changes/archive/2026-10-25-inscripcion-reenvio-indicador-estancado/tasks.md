# Tasks

## 1. Corrección en `assets/js/main.js` (bloque de envío con voucher)

- [x] 1.1 Elevar al scope del `forEach` del formulario (fuera del listener `submit`, que corre por envío) las tres piezas compartidas: `var pendienteIframe = false;`, la función única `restaurarBoton()` y la variable base del texto del botón (`textoBotonBase`). El listener `load` del iframe cierra sobre esas bindings compartidas.
- [x] 1.2 En cada envío con voucher: actualizar `textoBotonBase = boton.innerHTML` ANTES de entrar en el estado de carga, marcar `pendienteIframe = true`, y en el `load` usar `pendienteIframe` y `restaurarBoton()` de la binding compartida. Eliminar las declaraciones `var pendiente = false;` / `var restaurar = ...` del scope de la invocación (l. ~477 y ~495).
- [x] 1.3 Mantener idéntico todo lo demás: la distinción about:blank vs respuesta cross-origin del `load`, el `form.reset()`, la limpieza del celular, el dispatch de `change` de `desea_comprobante` y el aviso verde. La vía AJAX conserva su restauración llamando `restaurarBoton()` (incluido su `.catch`).

## 2. Verificación local (Playwright, arnés con mocks de latencia)

- [x] 2.1 Case nuevo: dos envíos seguidos con voucher en la MISMA página — primer envío: bolita + "Cargando…" durante, aviso verde al final y botón restituido; segundo envío (rellenar, adjuntar voucher válido, enviar): ídem. Contar 2 POST clásicos totales. Reproducir ANTES del fix (debe fallar: botón estancado) y pasar DESPUÉS.
- [x] 2.2 Doble envío AJAX sin voucher: dos `fetch` seguidos, ambos con bolita durante y botón restituido + verde tras cada respuesta (controle de no regresión; debe seguir funcionando como hoy).
- [x] 2.3 Re-correr la suite del change anterior (mock de FormSubmit con latencia 900ms): AJAX ok/fallo/reintento, voucher con límite MP4/PNG6MB, reduced-motion, sin desborde a 1280/390 y flujo sin JS intacto (todas verdes, sin regresiones).
- [x] 2.4 Guard del generador NO aplica (cambio solo en `main.js`): verificar con `node --check` y que el HTML de las fichas no se toca (`git status` sin fichas modificadas al cerrar).

## 3. Despliegue y cierre

- [x] 3.1 Commit del fix (asunto corto + por qué + bloque `Verificado:` con los datos de la suite), push con confirmación de Juan, `git_snapshot` del dominio antes del deploy y lista blanca copiada al docroot.
- [x] 3.2 Verificación post-deploy en producción: dos envíos reales seguidos (asunto `PRUEBA-FA-reenvio`, voucher válido; el usuario re-llena sin recargar): ambos salen, ambos restauran el botón y el segundo muestra el aviso verde; md5 de `main.js` idéntico repo/server.
- [x] 3.3 CHANGELOG entrada del fix; `openspec validate <change> --strict` y `openspec archive` al cerrar.
