# Tasks

## 1. Regla CSS de la capa abierta

- [x] 1.1 Añadir en `assets/css/main.css`, dentro del bloque `@media (max-width: 860px)` junto a las reglas del velo, la regla `.site-header.menu-abierto { z-index: 100; }` con un comentario de una línea que diga qué sostiene: con el menú abierto, la cabecera y su velo pasan sobre la capa flotante de los botones (90).
- [x] 1.2 Comprobar que no existe ninguna otra regla que toque `z-index` de `.site-header` ni de los `.flotante-*` en el archivo, para que la única palanca del apilado abierto sea esta regla.

## 2. Verificación medida con Playwright

- [x] 2.1 Levantar el servidor estático (`python3 -m http.server 8899 --bind 127.0.0.1`) y abrir una página con navegación — el Home o `nosotros/` — a 390px de ancho. Con el menú cerrado, anotar `getComputedStyle(header).zIndex` (esperado `50`) y capturar la zona del botón flotante de WhatsApp como referencia.
- [x] 2.2 Abrir el menú hamburguesa a 390px y comprobar: `getComputedStyle(header).zIndex` es `100`; `document.elementFromPoint` sobre el centro del botón de WhatsApp NO devuelve `.flotante-whatsapp` (devuelve el elemento del velo, `.site-header`); el color medio de la muestra del botón es más oscuro que la captura del paso 2.1.
- [x] 2.3 Con el menú abierto, enviar un tap con Playwright en el centro del botón de WhatsApp y comprobar que el menú se cierra, que la URL no cambia y que no se abre ninguna pestaña nueva (el toque lo recibió el velo, no el enlace).
- [x] 2.4 Repetir 2.2 y 2.3 con el botón de volver arriba (bajar la página primero para que sea visible con el scroll): mismo resultado atenuado y cierre del menú.
- [x] 2.5 Cerrar el menú (Escape) y comprobar que el botón recupera su nitidez y su toque: `elementFromPoint` vuelve a devolver `.flotante-whatsapp` y su z-index computado es `90`.
- [x] 2.6 A 1024px comprobar que nada cambia: al no abrirse el menú no hay velo, `elementFromPoint` sobre el centro del botón devuelve el botón, y el z-index computado de la cabecera sigue siendo `50`.

## 3. Documentación y commit

- [x] 3.1 Añadir en `CHANGELOG.md` la entrada del día por el formato de la casa: qué cambia con el menú abierto (los dos botones flotantes quedan atenuados bajo el velo y tocarlos cierra), por qué (apilaban 90 sobre el velo de 50) y cómo se midió (elementFromPoint y capturas a 390/1024).
- [x] 3.2 Confirmar que `git status` no muestra cambios en páginas ni en el generador: este change solo toca `assets/css/main.css` y `CHANGELOG.md`.
- [x] 3.3 Hacer el commit por estilo de la casa: asunto corto, cuerpo con el por qué y bloque `Verificado` con los resultados de la sección 2.
