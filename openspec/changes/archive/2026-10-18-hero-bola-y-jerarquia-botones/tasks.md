# Tasks

## 1. Antes de tocar nada

- [x] 1.1 Registrar la medición de partida, que es la que demuestra que el fallo existe: para cada bloque `.hero` del sitio, el `position` y el `z-index` calculados de su contenedor, y el borde izquierdo del círculo frente al borde derecho del texto. Anotar que en el 404 el contenedor queda en `z-index: auto` y que en el Home queda en `z-index: 2` por `.hero-grid`
- [x] 1.2 Confirmar con `git status` que el árbol está limpio salvo lo pendiente de otros changes, y copiar `404.html` a un temporal: al regenerar hay que poder comparar byte a byte lo que no debería cambiar

## 2. La decoración por detrás del contenido

- [x] 2.1 En `assets/css/main.css`, subir el contenido del hero por encima de su decoración con `position: relative` y `z-index: 2` sobre el contenedor del hero, con el mismo valor que ya usa `.hero-grid`. No tocar el círculo: conserva color, tamaño y desenfoque
- [x] 2.2 Comprobar con `getComputedStyle` que el contenedor del hero **deja de quedar en `z-index: auto`** en el 404 y en el Home, y que sigue quedando en `z-index: 2` en el Home
- [x] 2.3 Repetir la medición de la tarea 1.1 en los nueve anchos entre 360 y 1280 px y confirmar que el círculo **queda por detrás** del texto en todas las páginas que tienen hero, sin excepciones por ancho
- [x] 2.4 Abrir el 404 y el Home en el navegador y comparar el color de píxel del texto dentro del área del círculo con el del texto fuera. Deben coincidir, que es la comprobación de que la decoración ya no lo tiñe

## 3. Los botones en móvil

- [x] 3.1 En `assets/css/main.css`, repartir `.hero-acciones` en tres franjas: una columna a ancho completo por debajo de 559px, rejilla de dos columnas iguales entre 560 y 860px, y nada por encima de 860px. Los botones ocupan toda su columna, nunca su ancho natural
- [x] 3.2 Verificar con `getComputedStyle` que a 390px el grupo del 404 y el del Home están en columna, y que cada botón mide lo mismo que el grupo, sin filas con espacio vacío
- [x] 3.3 Verificar a 1024px que el grupo sigue en fila, exactamente igual que antes del cambio
- [x] 3.4 Comprobar que **no** se han tocado `.matricula-cta-group`, `.card-acciones` ni `.card-body`, que ya funcionaban, y que su apariencia a 390px es la misma que antes
- [x] 3.5 Verificar la franja de 560 a 860px en varios anchos: dos columnas de igual anchura, sin huecos, y comprobar los **altos**, porque entre 560 y 620px la etiqueta más larga se parte en dos líneas y la fila sale más alta. La rejilla tiene que igualar los altos de cada fila
- [x] 3.6 Dejar el icono de WhatsApp del 404 en relleno, que es la norma del sitio, reutilizando el `SVG_WA` del generador en vez del `SVG_BTN_WA_BTN` de trazo que este change había creado. Verificar que el 404 queda con el mismo icono que las fichas y el Home, y que se borró el icono de trazo para que no queden dos

## 4. El orden de los botones del 404

- [x] 4.1 En la función `pagina404` de `tools/generar-fichas.mjs`, reordenar los botones del hero a: Volver al inicio, Escríbenos por WhatsApp, Ver los cursos, Ver los servicios. **No tocar** el grupo del final, que conserva su orden
- [x] 4.2 Ejecutar el generador y comprobar con `git status --short -- cursos/` que **ninguna** ficha cambió, exigiendo `exit 0` antes de mirar: si el generador falla, `git status` sale limpio porque no escribió nada
- [x] 4.3 Comprobar que los enlaces y sus iconos SVG siguen siendo los mismos que estaban, solo en otro orden, comparando el conjunto de destinos del 404 contra el que había antes del cambio

## 5. Revisión visual

- [x] 5.1 Servir el sitio con `python3 -m http.server 8899 --bind 127.0.0.1` y abrir el 404 y el Home a 1280×900 y a 390×844, mirando los dos: el apilado del Home es un cambio visible y hay que confirmarlo, no solo medirlo
- [x] 5.2 Comprobar que no hay scroll horizontal en ninguna de las dos páginas ni en ningún ancho de 360 a 1280 px
- [x] 5.3 Confirmar que los botones de cada fila tienen el mismo alto y que el texto dentro no se parte, a 360 px, que es el ancho más estrecho
- [x] 5.4 Recorrer las páginas que no tienen hero para confirmar que la regla nueva del contenedor no ha cambiado nada en ellas: los bloques de dos columnas y los banners de subpágina siguen igual

## 6. Documentación

- [x] 6.1 Entrada en `CHANGELOG.md` con la fecha de hoy, sección `Fixed`, explicando las dos cosas: la decoración que tapaba texto y las filas de botones con huecos. Anotar que el apilado del Home cambia su aspecto en móvil a propósito
- [x] 6.2 Anotar en `STRUCTURE.md` que `.hero > .container` lleva `z-index: 2` para que la decoración no tape el contenido, y que un hero nuevo queda protegido solo por usar esa estructura
- [x] 6.3 Añadir a `AGENTS.md`, en la sección de CSS, que el apilado de botones se hace con el patrón de `.matricula-cta-group` y no inventando uno nuevo, y que el orden de los botones del 404 está fijado en su especificación

## Workflow follow-up

- Archivar el change y sincronizar `capas-visuales`, `diseno-responsive` y `pagina-404` cuando el dueño lo revise.
- **Pendiente, no de este change:** sigue sin decidirse el hosting, así que la comprobación de que `404.html` se sirva con estado 404 sigue esperando a la publicación, igual que el botón de Aula Virtual y la activación de FormSubmit.
- `llms-para-agentes` sigue activo y también toca `seo-base`. Este change no lo toca, así que los dos pueden archivarse en cualquier orden.