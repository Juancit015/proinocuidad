# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-menu-compacto/` y verificar el respaldo comparando el `md5sum` del original con el de la copia. Tener en cuenta que `/tmp/opencode` es volátil y se ha vaciado ya dos veces en esta sesión: si desaparece, volver a respaldar antes de tocar nada
- [x] 1.2 Confirmar con `git status` que el árbol está limpio, ya que los commits anteriores quedaron hechos, y anotar los valores de partida para comparar después: alto del panel en 860×900, 620×900, 390×740 y 360×640 con el submenú "Servicios" desplegado, medidos con Chromium. Deben dar 681px, 681px, 664px y 564px respectivamente; si no coinciden, medir de nuevo y anotar los reales antes de cambiar nada

## 2. Densidad del panel en móvil

- [x] 2.1 Dentro del bloque `@media (max-width: 860px)` de `assets/css/main.css`, bajar el `min-height` de los enlaces del menú de 46px a 40px y su `padding` de 9px a 4px, y bajar el `min-height` del rótulo "Menú" de 48px a 38px. Verificar con `git diff` que el cambio se limita a esas cuatro declaraciones
- [x] 2.2 En el mismo bloque, reducir el `padding` del panel (`.nav-menu`) y el `gap` entre ítems de `.mega-panel-inner` y de `.mega-panel-compacto`. Verificar que `.mega-icono` sigue en 36px y que su SVG en 20px, con `grep`, porque la spec los fija y no se pueden tocar
- [x] 2.3 Confirmar que las llaves del CSS siguen balanceadas y que las reglas del mega-menú de escritorio, a partir de 861px, no han cambiado. Verificar con `git diff` que ningún cambio toca reglas fuera del bloque `@media (max-width: 860px)`
- [x] 2.4 Medir con Chromium el alto del panel con el submenú desplegado en 860×900, 620×900, 390×740 y 360×640, y comprobar que en 390×740 y 390×844 el panel deja de desbordar y cabe entero. Referencia: 681px en escritorio y 664px con desplazamiento en 390×740 antes del cambio
- [x] 2.5 Medir el alto real de los enlaces renderizados con `getBoundingClientRect` en 390px de ancho y comprobar que ninguno baja de 40px, en lugar de fiarse del valor de `min-height` declarado. Este es el suelo que fija el requisito nuevo

## 3. Dos columnas en la franja de 560 a 860px

- [x] 3.1 Añadir una media query `@media (min-width: 560px) and (max-width: 860px)` en `assets/css/main.css` que ponga `grid-template-columns: 1fr 1fr` en `.mega-panel-compacto .mega-panel-inner`, sin tocar la regla base que hereda el mega-menú de escritorio. Verificar con `git diff` que la regla base queda intacta
- [x] 3.2 Añadir en esa misma media query `grid-column: 1 / -1` para `.mega-panel-compacto .mega-cta`, y comprobar que el enlace "Ver todos los servicios" o "Ver todos los cursos" sigue ocupando el ancho completo del panel con el `getBoundingClientRect` medido a 700px
- [x] 3.3 Comprobar el comportamiento en el umbral: medir el panel a 559px y a 560px y verificar que a 559px los ítems siguen en una columna y a 560px pasan a dos
- [x] 3.4 Revisar visualmente entre 560 y 620px que las descripciones de los ítems no se cortan de forma desagradable, que es la comprobación que `design.md` deja pendiente. En esa franja el ancho por ítem cae a unos 255px y el texto pasa a dos líneas, lo que está previsto y aceptado, pero hay que verlo y no solo medirlo
- [x] 3.5 Medir el alto del panel en 860×900, 700×900 y 620×900 y verificar que baja de los 520px, frente a los 681px de partida

## 4. Verificación sobre el sitio completo

- [x] 4.1 Recorrer con Chromium las 18 páginas del sitio en los anchos que fija la spec `diseno-responsive` (360, 390, 768, 860, 1024 y 1280px), abriendo el menú y desplegando cada submenú, y comprobar que ninguna página muestra un panel con desbordamiento horizontal ni contenido cortado
- [x] 4.2 Comprobar en 1280px que el mega-menú de escritorio sigue funcionando al pasar el puntero, con sus dos columnas, su panel de 460px y su ícono de 44px, y que su alto no ha cambiado respecto al actual
- [x] 4.3 Comprobar que el menú sigue cerrándose con la hamburguesa, con la tecla Escape y tocando el velo, que el velo aparece y desaparece, y que el icon transform sigue siendo el que estaba. Verificar con `pageerror` que no hay ninguna excepción de JavaScript en ninguna de las 18 páginas
- [x] 4.4 Comprobar que la cabecera sigue `position: sticky` y que el `scroll-margin-top` de los anclas internas sigue funcionando, para confirmar que el cambio no ha afectado a nada de lo que ya estaba verificado

## 5. Documentación

- [x] 5.1 Registrar el cambio en `CHANGELOG.md` con los alturas antes y después en cada ancho medido, y con la nota de que el área activable de los enlaces baja de 46px a 40px
- [x] 5.2 Anotar en el CHANGELOG que los 360×640 siguen desplazándose por dentro a propósito, y que el motivo está en `design.md`, para que no se lea como un pendiente
- [x] 5.3 Registrar en `STRUCTURE.md` que `main.css` tiene una media query propia para la franja 560–860px del menú móvil, y que el breakpoint de 860px que decide entre menú de escritorio y hamburguesa no cambió
- [x] 5.4 Comprobar que el cambio cumple el requisito "Contenido sin cambios" de la spec `diseno-responsive`, que prohíbe modificar textos, colores, enlaces ni datos de contacto. Con `git diff` sobre los 18 HTML y el generador: 19 ficheros tocados, 19 líneas eliminadas y **0 líneas añadidas**, todas las eliminaciones son el mismo `<li class="nav-mobile-heading">` del rótulo del menú. Ningún texto, enlace, color ni dato de contacto cambia, y `assets/js/` no se toca

## 6. Eliminación del rótulo "Menú" del panel

- [x] 6.1 Borrar el `<li class="nav-mobile-heading">` con su `<span>Menú</span>` de `tools/generar-fichas.mjs` y de las 18 páginas, y verificar con `grep` que no queda ninguna referencia a `nav-mobile-heading` en HTML, CSS, JS ni generador
- [x] 6.2 Retirar las tres reglas CSS del rótulo: su bloque, el `:not()` que lo excluía del borde inferior y su ocultado en escritorio, dejando el `:not()` sin rodeos, porque al no existir el elemento todos los `<li>` llevan borde. Verificar que las llaves siguen balanceadas
- [x] 6.3 Ejecutar `node tools/generar-fichas.mjs` y comprobar con `diff -rq` que reproduce las fichas ya editadas, para que el rótulo no reaparezca en la próxima generación
- [x] 6.4 Medir el panel en los ocho anchos de referencia antes y después, comprobando que se recupera 40px en cada uno y que 360×640 sigue igual, porque ahí manda el `max-height` y no el contenido
- [x] 6.5 Repetir el recorrido de las 18 páginas en los seis anchos, más los cuatro caminos de cierre y la revisión de sticky y anclas, y revisar el panel en 390px y 580px para confirmar que sin el rótulo queda limpio
- [x] 6.6 Actualizar la decisión 6 del `design.md`, que decía que el rótulo se conservaba, y las cifras del `CHANGELOG.md`

## Workflow follow-up

- Archivar el change y sincronizar la spec `navegacion-global` cuando el dueño haya visto el resultado en su móvil y en una ventana de escritorio redimensionada.
- Pendiente aparte, no parte de este change: `navegacion-global` no pasa `--strict` porque el requisito "Mega-menú al hover" tiene 912 caracteres. Este change lo mantiene tal cual, porque el schema prohíbe reescribir texto existente bajo MODIFIED solo para cumplir la longitud. Si el dueño quiere arreglarlo, es un change dedicado a recortar ese requisito.