# Proposal

## Why

Una decoración del hero se está pintando **encima del texto**. `.hero::after` dibuja un círculo rojo de 420 px con desenfoque, y como es un elemento posicionado sin `z-index`, el CSS lo pinta después que el contenido normal de la caja. Hoy solo se nota en el 404, y solo por casualidad: el Home se libra porque su contenido usa `.hero-grid`, que sí lleva `position: relative; z-index: 2`. El 404 usa un `.container` normal, sin protección, así que el círculo le tiñe el título, el párrafo y los botones.

Lo grave no es el 404. Es que **la corrección depende del contenedor que se use por casualidad**: el próximo hero que se escriba con un `.container` normal repetirá el fallo sin que nadie lo note, porque el círculo es translúcido y se confunde con parte del degradado.

Y hay un segundo problema, en móvil. Los botones de `.hero-acciones` tienen el ancho de su texto, así que al envolver dejan filas desparejas: en el 404 miden 173, 167, 183 y 253 px, y la segunda fila queda con un hueco de casi 190 px al lado de "Ver los servicios". Se lee como un descuido, no como una decisión. Los otros grupos de botones del sitio no lo tienen porque sus botones miden lo mismo y se alinean solos.

## What Changes

- **El contenido de cualquier hero queda por encima de la decoración.** Se añade una regla que da `position: relative; z-index: 2` al contenedor del hero, el mismo valor que ya usa `.hero-grid`. El círculo rojo sigue viéndose como detalle de fondo, pero deja de tapar y de tintar texto.
- **Los botones de `.hero-acciones` se reparten en tres franjas**, sin huecos en ninguna: una columna a ancho completo por debajo de 560px, dos columnas de igual anchura entre 560 y 860px, y la fila actual por encima. El corte en 560px lo decide la aritmética, no el gusto: a 390px solo dos de los diez botones del sitio caben en media fila, y el resto necesita entre 193 y 279 píxeles donde solo hay 172.
- **Los botones del 404 se ordenan por importancia**: primero "Volver al inicio", después el WhatsApp, y al final los dos botones de navegación. Al apilarse, el orden del documento pasa a ser el orden que se ve, así que el orden deja de ser arbitrario.
- Se aplica a los `.hero-acciones` del 404 y del Home. El Home solo recibe el reparto: sus botones ya van en el orden correcto.
- **El icono de WhatsApp del 404 pasa de trazo a relleno.** Al revisar el botón del Home se pidió lo contrario, pero al medir resultó que los iconos relleno son la norma del sitio: 21 botones en 10 ficheros, y el único de trazo era el del 404, que es de este change. Se cambia el del 404 para que reutilice el mismo icono que ya usan las fichas y el Home, y se añade un requisito en `iconografia` que admite el relleno cuando el icono es una marca y prohíbe que la misma marca tenga dos tratamientos.

## Capabilities

### New Capabilities

- `capas-visuales`: qué capa se pinta sobre cuál. Hoy nadie lo escribe en las especificaciones, y por eso un elemento decorativo puede terminar tapando contenido sin que ninguna regla lo impida.

### Modified Capabilities

- `diseno-responsive`: se añade un requisito para que los grupos de botones de acción del hero se apilen a ancho completo en móvil, que es exactamente el tipo de regla por ancho de pantalla que esta spec ya gobierna.
- `pagina-404`: se añade un requisito con el orden de las rutas de salida, que hoy no está fijado en ninguna parte y por eso cualquier cambio puede reordenarlas sin avisar.

## Impact

- **Toca `assets/css/main.css`**, con dos reglas: una de apilado para el hero en móvil y otra de protección de capas. Es la primera vez que este cambio toca el CSS, y la razón está justificada arriba.
- **`tools/generar-fichas.mjs`**: cambia el orden de los botones del 404, dentro de la función `pagina404`. Las ocho fichas no se tocan.
- **Sin tocar** las 18 páginas del sitio, `sitemap.xml`, `robots.txt`, los colores de marca ni los textos.
- **Verificación:** el solapamiento se comprueba midiendo, no mirando. Se compara el borde izquierdo del círculo con el borde derecho del texto del hero en cada ancho entre 360 y 1280 px, y se comprueba con `getComputedStyle` que el contenedor del hero ya no queda en `z-index: auto`.
- **Interacción con una spec existente:** `pagina-404` tiene un requisito que dice que ese cambio no añadió reglas al CSS. Este change no lo incumple, porque la regla nueva pertenece al sistema de heroes y no a la página 404: es general y no menciona esa página. Queda escrito en la spec para que nadie use el 404 como excusa para meter CSS específico.

## Una decisión que conviene ver antes de aprobar

Ordenar por importancia es una decisión de contenido, no de CSS, y la spec la va a fijar. El orden propuesto para el 404 es **"Volver al inicio" → "Escríbenos por WhatsApp" → "Ver los cursos" → "Ver los servicios"**: primero la salida más útil para alguien que se perdió y después la acción comercial. El botón rojo de WhatsApp queda segundo, no primero, porque en una página de error nadie está mirando para comprar.

Si prefieres que la acción comercial vaya por delante, se cambia el orden y ya.