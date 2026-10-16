# Design

## Context

Ver proposal.md para la motivación. Lo que condiciona el enfoque:

- El panel móvil ya tiene su propia sombra: `box-shadow: 0 18px 34px rgba(16, 20, 119, 0.2)`. Lo que falta no es esa sombra sino **atenuar el contenido de detrás**, que hoy se ve igual de iluminado que si el menú no estuviera ahí.
- La referencia de intensidad que pidió el dueño son los botones flotantes: `0 8px 26px rgba(37, 211, 102, 0.45)` y `0 8px 24px rgba(16, 20, 119, 0.3)`. Son sombras con borde difuso, no un velo. Para un velo de pantalla completa, un valor equivalente o algo menor se lee como "un poco, no tanto": se propone **0.22**.
- La cabecera es `position: sticky` con `z-index: 50` y el panel `z-index: 60`, ambos dentro del contexto de apilamiento de la cabecera. La cabecera mide **76px** en móvil (logo de 52px + padding 12+12), el mismo valor que el panel ya usa en su `max-height`.
- La clase `.menu-abierto` ya se añade y se quita en `cerrarMenu()`, que es el único punto por el que pasa el cierre del menú (botón ✕, Escape, navegación y salto de breakpoint). No hay ningún cierre por clic fuera.
- El panel es hijo directo de la cabecera y se posiciona con `top: 100%`.

## Goals / Non-Goals

**Goals:**

- Que se perciba que el menú está **por encima** de la página y no pegado a ella.
- Que tocar el fondo oscurecido cierre el menú, que es lo que el usuario espera.
- Que el velo sea una adición de CSS mínima, sin marcado nuevo.

**Non-Goals:**

- No cambiar el panel, la cabecera ni su aspecto.
- No implementarlo con `position: fixed` en `body`, que es la técnica que funciona en iOS pero obliga a guardar y restaurar la posición de scroll a mano.
- No añadir un botón de cierre nuevo: la ✕ ya existe.
- No tocar los botones flotantes.

## Decisions

### 1. El velo es un `::after` de la cabecera, sin HTML ni marcado nuevo

```css
@media (max-width: 860px) {
  .site-header::after {
    content: ""; position: fixed; inset: 76px 0 0 0;
    background: rgba(16, 20, 119, 0.22);
    z-index: -1; opacity: 0; visibility: hidden;
    transition: opacity 200ms ease, visibility 0s linear 200ms;
  }
  .site-header.menu-abierto::after { opacity: 1; visibility: visible; }
}
```

Tres decisiones dentro de esa regla:

- **Va en la cabecera, no en `body`.** Así el estado lo aporta la clase `.menu-abierto` que ya existe: no hay que añadir ninguna clase al `<body>` ni un elemento al HTML, y no se toca el JavaScript para la parte visual.
- **`z-index: -1`.** La cabecera crea un contexto de apilamiento (`z-index: 50`), así que el pseudo-elemento queda por encima de todo el contenido de la página pero por debajo del panel (`z-index: 60`). Es la única posición que cumple las dos cosas sin tocar ninguno de los dos valores existentes.
- **`inset: 76px 0 0 0` en vez de `inset: 0`.** Si el velo cubriera también la cabecera, la banda blanca de 76px quedaría teñida de azul. Empezando en 76px la barra y el panel quedan intactos y solo se atenúa lo que hay detrás, que es lo que se pidió. Reutiliza el valor que el panel ya tiene, así que no introduce un número nuevo.

- **Alternativa A (descartada):** un `<div class="velo">` en el HTML de las 18 páginas. Añade marcado duplicado en todas las páginas —justo lo que el proyecto evita— para algo que CSS puede generar.
- **Alternativa B (descartada):** oscurecer con `backdrop-filter: brightness()` sobre la página. Es más elegante, pero emborrosa en móviles y no funciona en todos los navegadores; un `rgba` es universal y rendimiento igual de bueno.

### 2. Cerrar al tocar el velo, enganchado a `document`

El velo no es un elemento: es un pseudo-elemento, así que no se puede escuchar directamente. Se engancha un `click` en `document` que cierra solo si:

- el menú está abierto,
- el clic **no** cae dentro del panel ni dentro del botón hamburguesa, y
- el ancho es de móvil.

La comprobación del ancho es importante: en escritorio el mismo `document` recibe los clics de navegación y cerrarlos sería un bug. Se reutiliza el `mobileQuery` que ya existe en el archivo.

Se reutiliza `cerrarMenu()`, con `devolverFoco` en `false` porque el foco ya está dentro del panel y no hay dónde devolverlo: el usuario tocó fuera a propósito.

La alternativa de cerrar con `pointer-events: none` en el velo (para que el toque lo atraviese) se descarta: el toque caería en la página y cerraría el menú mientras el usuariooun interactúa con el contenido, que es peor que no hacer nada.

### 3. Mismo ritmo que el panel y `prefers-reduced-motion` incluido

El panel tarda 280ms en desplegarse. El velo usa 200ms, un poco menos porque es un plano de color sin forma: si coincidieran, el velo parecería "pegado" al panel. La línea del velo se añade al bloque `@media (max-width: 860px) and (prefers-reduced-motion: reduce)` que ya existe, que pone `transition: none`, de modo que con movimiento reducido el velo aparece y desaparece sin transición.

### 4. El bloqueo de scroll se hace con una clase en `body`, solo mientras el menú está abierto

El dueño pidió que el fondo quede bloqueado, lo que contradecía el diseño inicial (que solo atenuaba visualmente). Se implementa con una clase que `actualizarMenu()` añade y quita en el mismo sitio donde ya añade `menu-abierto` a la cabecera:

```css
@media (max-width: 860px) {
  body.menu-abierto-scroll { overflow: hidden; }
}
```

- **El bloqueo vive dentro de `@media (max-width: 860px)`.** Así el `overflow: hidden` no existe en escritorio, ni siquiera como regla; no queda estado que limpiar al cambiar de tamaño.
- **Es una regla nueva, no una modificación de `html`/`body`.** El proyecto tiene prohibido un `overflow-x: hidden` global porque rompía el `position: sticky`; aquí se cumple porque la regla **solo existe mientras el menú está abierto** y se retira al cerrar. Con el menú cerrado no hay ninguna regla de `overflow` en el documento, igual que hoy.
- **El panel conserva su propio desplazamiento.** Lleva `overflow-y: auto`, así que si el menú no cabe en la pantalla se sigue desplazando por dentro, que es lo que pide la spec.

**La tensión con los elementos `sticky` y por qué aquí no es un problema.** Hay tres: la cabecera (línea 155), la imagen de "Quiénes somos" (393) y el sidebar de matrícula de las fichas (1205). Un `overflow` en un ancestro convierte a ese ancestro en contenedor de desplazamiento y desactiva el `sticky` de sus descendientes. Pero el efecto solo existe **mientras el menú está abierto**, y en ese momento el `sticky` es irrelevante: la página no se puede desplazar, así que no hay nada que fijar. Al cerrar, la clase se retira y los tres vuelven a funcionar. La verificación lo comprueba de forma explícita.

- **Alternativa A (descartada):** `position: fixed` en `body` con su `top` ligado a la posición de scroll, que es la técnica que sí funciona en iOS Safari. Se descarta porque obliga a guardar y restaurar la posición de scroll a mano en cada apertura y cierre, y un fallo ahí deja la página desplazada de forma permanente.
- **Alternativa B (descartada):** `touchmove` con `preventDefault` en JavaScript. Descartada porque bloquearía también el desplazamiento dentro del panel, salvo que se discrimine el origen del gesto, lo que es más frágil.

**Limitación conocida de `overflow: hidden`:** en iOS Safari el cuerpo de la página puede seguir desplazándose con el dedo pese a la regla. En Android y escritorio sí funciona. Se anota en el CHANGELOG para que el dueño lo pruebe en un iPhone y, si molesta, se evalúe la alternativa A.

### 5. El botón ✕ del panel se elimina: la hamburguesa ya cumple ese papel

El panel llevaba un `<button class="nav-close">×</button>` propio, y el botón hamburguesa de la cabecera ya se transforma en una ✕ al pulsarse. Dos controles idénticos para la misma acción son ruido, y el propio dueño lo señaló: el botón de cerrar no tenía sentido.

- **Se quita el marcado, no solo se oculta.** El `<button>` desaparece de `tools/generar-fichas.mjs` y de las 18 páginas, junto con sus tres reglas de CSS (`.nav-close`, su `:focus-visible` y su ocultado en escritorio) y las dos líneas de JavaScript que lo escuchaban. Escribirlo en el generador y no solo en el HTML evita que la próxima ficha lo vuelva a traer.
- **El `aria-label` de la fila se conserva.** La fila `<li class="nav-mobile-heading">Menú</li>` sigue siendo el rótulo del panel; solo desaparece el botón de la derecha. Su `justify-content: space-between` queda sin segundo hijo, lo que es inocuo: el texto sigue a la izquierda.
- **La accesibilidad no se pierde.** Quedan tres vías de cerrar: el botón hamburguesa, con `aria-label` que alterna entre "Abrir menú" y "Cerrar menú" y `aria-expanded` sincronizado; la tecla Escape; y el fondo atenuado. Ninguna función se queda sin cobertura de teclado, porque el botón que se borra no era el único ni el necesario para teclado.
- **Efecto colateral desirable:** el `pointer-events: auto` del velo ya impedía activar los enlaces que quedan detrás, así que al cerrar tocando el fondo nunca se navega por error.

## Risks / Trade-offs

- **[El velo usa `z-index: -1` y depende del contexto de apilamiento de la cabecera]** → si algún día la cabecera dejara de tener `z-index`, el velo se iría detrás de la página y dejaría de verse. Se mitiga documentando la dependencia en el CHANGELOG y verificando en la tarea de comprobación que el velo aparece por encima del contenido y por debajo del panel.
- **[El valor `76px` vuelve a aparecer como número mágico]** → es el mismo valor que ya usa el `max-height` del panel, así que no es un número nuevo: si la cabecera cambiara de alto, ambos quedarían mal juntos y se verían juntos. Queda anotado como punto a revisar si algún día se toca la altura de la cabecera.
- **[Un velo del 0.22 puede verse TooWeak en pantallas muy bright o demasiado fuerte en tema oscuro]** → el sitio no tiene tema oscuro, así que no aplica. Si al verlo no convence, se ajusta el número, que es un cambio de una línea.
- **[Tocar el velo cierra el menú, pero tocar el panel no]** → deliberado: dentro del panel hay enlaces, acordeones y el botón ✕, y cerrar al tocarlos sería molesto. El velo es la única superficie que cierra.
- **[El fondo queda bloqueado, no solo atenuado]** → así lo pidió el dueño, al revés del criterio inicial. El coste es que la regla `overflow` en `body` convive con los tres `position: sticky` del sitio; se mitiga porque solo existe mientras el menú está abierto, cuando el `sticky` es irrelevante, y la verificación comprueba que todo vuelve a funcionar al cerrar.