# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `assets/css/main.css` y `assets/js/main.js` en `/tmp/opencode/respaldo-velo-menu/`, verificando el respaldo con `ls` y comparación de tamaño
- [x] 1.2 Anotar con `git diff` qué cambios sin commitear hay ya en ambos archivos y cuáles son ajenos a este change, para no atribuírselos ni sobrescribirlos

## 2. El velo en CSS

- [x] 2.1 Añadir dentro de `@media (max-width: 860px)` la regla `::after` sobre `.site-header` con `position: fixed`, `inset: 76px 0 0 0`, fondo `rgba(16, 20, 119, 0.22)`, `z-index: -1`, y los estados cerrado y abierto con `.menu-abierto`, y verificar que el diff del CSS contiene solo ese bloque
- [x] 2.2 Añadir el velo al bloque existente `@media (max-width: 860px) and (prefers-reduced-motion: reduce)` para que con movimiento reducido aparezca sin transición
- [x] 2.3 Confirmar que las llaves del CSS siguen balanceadas y que no hay ningún velo por encima de 860px

- [x] 2.4 Añadir en `assets/js/main.js` la clase `menu-abierto-scroll` al `body` dentro de `actualizarMenu()`, para que quede y se retire siempre en el mismo punto donde ya se gestiona el estado del menú

## 3. Bloqueo del desplazamiento

- [x] 3.1 Añadir dentro de `@media (max-width: 860px)` la regla `body.menu-abierto-scroll { overflow: hidden; }`, y verificar que con el menú cerrado no existe ninguna regla de `overflow` en el documento
- [x] 3.2 Confirmar que el panel conserva su `overflow-y: auto`, de modo que si el menú no cabe en pantalla se sigue desplazando por dentro
- [x] 3.3 Medir con el arnés a 390px que la página no se desplaza con el menú abierto, que el panel sí se desplaza por dentro y que al cerrar la página recupera el scroll sin salto de contenido

## 4. Cerrar al tocar el velo

- [x] 4.1 Añadir en `assets/js/main.js` un listener de `click` sobre `document` que llame a `cerrarMenu(false)` solo si el menú está abierto, el ancho es de móvil y el clic no cae dentro del panel ni del botón hamburguesa
- [x] 4.2 Verificar que el cierre por clic no se dispara al pulsar la hamburguesa, al tocar un enlace del menú, al desplegar un acordeón ni al navegar, y que en escritorio ningún clic cierra nada

## 5. Verificación en navegador

- [x] 5.1 Medir con un arnés en `iframe` de 390px que al abrir el menú el velo aparece, que la cabecera y el panel quedan nítidos por encima y que el contenido de detrás queda atenuado
- [x] 5.2 Comprobar que al cerrar el menú con la hamburguesa, con Escape y tocando el velo, el velo desaparece y la página recupera su brillo normal
- [x] 5.3 Comprobar en 1280px que no aparece ningún velo y que el mega menú de escritorio sigue funcionando por hover
- [x] 5.4 Comprobar que con `prefers-reduced-motion: reduce` el velo aparece y desaparece sin transición

## 6. Documentación

- [x] 6.1 Registrar el cambio en `CHANGELOG.md` con el valor de opacidad elegido, la razón de empezar el velo en 76px y la advertencia de que depende del `z-index: 50` de la cabecera
- [x] 6.2 Anotar en el CHANGELOG que el velo reutiliza el valor de 76px del `max-height` del panel, y que el bloqueo de scroll con `overflow: hidden` puede no ser efectivo en iOS Safari
- [x] 6.3 Limpiar el arnés de prueba del directorio del sitio y verificar que no queda ningún archivo temporal sin versionar

## 7. Quitar el botón ✕ del panel

- [x] 7.1 Quitar el `<button class="nav-close">` de `tools/generar-fichas.mjs` y de las 18 páginas, dejando la fila `<li class="nav-mobile-heading">` solo con su rótulo
- [x] 7.2 Ejecutar el generador y comprobar con `diff` que reproduce las fichas ya editadas, para que el botón no reaparezca en la próxima generación
- [x] 7.3 Eliminar las tres reglas CSS de `.nav-close` y las dos líneas de JavaScript que lo escuchaban, verificando que no queda ninguna referencia en el sitio
- [x] 7.4 Comprobar a 390px que el icono hamburguesa se ve ya transformado en ✕ al abrir, que el panel no muestra botón de cerrar y que el `aria-label` alterna entre "Abrir menú" y "Cerrar menú"
- [x] 7.5 Comprobar que con la ✕ fuera sigue habiendo tres vías de cerrar con teclado: la hamburguesa, Escape y el foco del velo
- [x] 7.6 Registrar el cambio en `CHANGELOG.md` y en `STRUCTURE.md`

## 8. Verificación ejecutada

- [x] 8.1 La verificación interactiva se hizo con Chromium de Playwright, no con el arnés de `iframe`: el navegador del arnés no alcanza el `localhost` de la máquina y devolvía `502 Bad Gateway` en todas las cargas, de modo que los resultados que leía antes eran caché viejo
- [x] 8.2 Durante esa verificación apareció un `ReferenceError: menu is not defined`: el listener de cierre por clic usaba `menu` sin que estuviera declarado, así que el menú lanzaba la excepción en cada toque y **nunca cerraba al tocar el fondo**. Se añadió `var menu` junto a `header` y `toggle` en el inicio del IIFE
- [x] 8.3 La primera medición del bloqueo de scroll dio un falso negativo por usar `window.scrollTo()`, que sí funciona con `overflow: hidden`. Repetido con rueda, teclado y arrastre de dedo reales, que sí quedan bloqueados

## Workflow follow-up

- Archivar el change y sincronizar la spec `navegacion-global` cuando Juan confirme el resultado visual y ajuste el nivel de opacidad si lo ve fuerte o flojo.
- Opcional, si el velo resultara insuficiente: evaluar un desenfoque suave con `backdrop-filter`, que es más costoso en móvil y por eso quedó como alternativa descartada.