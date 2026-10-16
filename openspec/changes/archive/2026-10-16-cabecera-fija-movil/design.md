# Design

## Context

Ver proposal.md para la motivación. Lo que condiciona el enfoque:

- La regla base de `.site-header` **ya dice `position: sticky`**. Lo que desactiva el comportamiento en móvil es una única línea dentro de `@media (max-width: 860px)`: `.site-header { position: relative; }` (`main.css:518`). El cambio es borrar esa línea, nada más.
- Esa línea tiene su razón documentada en la spec: "no `static`, para conservar el contexto de anclaje del menú móvil desplegable". El panel es `.nav-menu { position: absolute; top: 100%; }`, que necesita un ancestro posicionado.
- **El motivo quedó obsoleto.** `position: sticky` también establece un ancestro posicionado para sus descendientes absolutos, igual que `relative`. Con sticky el panel seguiría anclando a la cabecera, así que no hace falta nada más.
- La spec actual tiene un requisito llamado "Cabecera fija solo en escritorio" con un escenario llamado "móvil sin cabecera flotante" que afirma lo contrario de lo que este change quiere.
- En móvil la barra superior (`.topbar`) se oculta (`display: none` a ≤860px), así que la cabecera mide solo el navbar: logo de 52px + padding 12+12 = **76px**, que es justo el valor que el panel ya usa en su `max-height: calc(100dvh - 76px)`.
- Las 18 páginas comparten la misma clase `.site-header`; no hay HTML que tocar.

## Goals / Non-Goals

**Goals:**

- Que el logo y el botón de menú estén siempre al alcance del pulgar en móvil.
- No romper el panel del menú móvil, que depende de la cabecera como ancestro posicionado.

**Non-Goals:**

- No cambiar el diseño, la altura, el contenido ni la animación de la cabecera.
- No tocar el menú móvil, los acordeones, el botón de cerrar ni el JavaScript.
- No añadir JS para detectar el scroll: la opción de ocultar la cabecera al bajar quedó descartada por decisión del dueño.
- No tocar la regla del panel ni su `max-height`: ya es correcta con cabecera fija.

## Decisions

### 1. Se borra la línea, no se añade una regla que la anule

`@media (max-width: 860px) { .site-header { position: relative; } }` se elimina. La alternativa —mantener la línea y añadir `position: sticky` con `!important` o con un selector más específico— dejaría dos reglas contradictorias en el mismo bloque y el siguiente que edite el CSS no sabría cuál manda. Borrar deja una sola fuente de verdad: la regla base.

### 2. `sticky` y no `fixed`

`sticky` mantiene al header en su sitio dentro del flujo normal del documento, así que:

- No hay que recalcular altura ni añadir `padding-top` al body, como ocurriría con `fixed`.
- El mega menú de escritorio y el panel móvil siguen midiéndose con `top: 100%` respecto de la cabecera, sin ajustes.
- El comportamiento de escritorio no se toca en absoluto: ya usa `sticky` y esta decisión no lo altera.

`fixed` queda descartada por el padding de compensación que exige y por romper el contexto de posicionamiento del resto de la cabecera.

### 3. El panel conserva su `max-height` sin cambios

`calc(100dvh - 76px)` ya estaba calculado para una cabecera de 76px, porque el valor existe desde antes de este change y la cabecera móvil mide eso. No hay nada que recalcular. El `100dvh` además ya contempla la barra de direcciones de iOS, que se encoge al desplazarse: con cabecera fija, la franja útil baja y el panel se adapta solo.

### 4. El escenario con nombre contradictorio se conserva

La spec no deja eliminar un escenario existente dentro de un `MODIFIED`, y el escenario "móvil sin cabecera flotante" afirma exactamente lo que este change revierte. Se conserva su nombre para no romper la validación y se reescribe su contenido para que describa el comportamiento nuevo.

Es un nombre que ya no describe lo que dice. Es el precio de la regla del validador, no una decisión de diseño. Queda anotado aquí y en el CHANGELOG para que, si en algún momento se toca esa spec a mano, el nombre se renombre a algo como "cabecera fija en móvil" junto con su `RENAMED`.

### 5. Los anclas se despegan con `scroll-margin-top`

Al hacer la cabecera fija en móvil, medir el resultado dio un efecto secundario que la verificación de escritorio no podía anticipar: al navegar a un ancla, el destino queda **exactamente 76px bajo la cabecera**, que es justo su altura. En escritorio esto ya pasaba, pero allí el destino suele ser la etiqueta de una sección y se reconoce; en móvil, `#form-inscripcion` es el destino del botón "Matricularme Ahora", y el usuario tocaría el botón viendo los primeros campos del formulario escondidos.

La causa es conocida y tiene arreglo estándar: `scroll-margin-top` reserva espacio para que el destino quede por debajo de cualquier elemento fijo.

```css
[id] { scroll-margin-top: 84px; }   /* 76 de cabecera + 8 de aire */
```

Se aplica al conjunto de destinos con `id`, no a una lista, para que un ancla nuevo herede el comportamiento sin tener que acordarse. Y como la cabecera mide 76px **ya en móvil y también en escritorio**, la misma regla arregla los dos casos de una vez: el defecto de escritorio desaparece de paso.

- **Alternativa A (descartada):** `scroll-padding-top` en `html`. El navegador lo respeta, pero `scroll-padding` aplica al contenedor de scroll y obliga a pensar el valor cada vez que cambia la altura de la cabecera; `scroll-margin-top` acompaña al destino y sobrevive a que la cabecera cambie de alto.
- **Alternativa B (descartada):** hacer que el JS compensara el desplazamiento al pulsar el ancla. El sitio tiene `scroll-behavior: smooth` y funciona sin JavaScript; meter JS para esto rompe el caso sin JS y añade una ruta de código para algo que el CSS resuelve solo.

## Risks / Trade-offs

- **[La cabecera ocupa 76px fijos, un 19% de una pantalla de 390px, de forma permanente]** → es el coste consciente de "fija siempre", y la razón por la que se descartó la opción de ocultarla al bajar. En las fichas de curso, que son largas, el tradeoff compensa. Si molesta, la mejora es la variante "compacta al hacer scroll", que requiere JS y un segundo diseño de cabecera: otro change.
- **[El panel móvil podría descolgarse de la cabecera al desplazarse]** → no ocurre: el panel es hijo directo de la cabecera y se posiciona con `top: 100%` respecto de ella; si la cabecera se mueve, el panel la acompaña por definición.
- **[Contenido que quede tapado por la cabecera al navegar a un ancla]** → **medido y confirmado: 76px exactos**, que es la altura de la cabecera. No se acepta como "coste", porque afecta al botón "Matricularme Ahora" de las 8 fichas: el usuario tocaría el botón y vería el inicio del formulario escondido. Se resuelve con la decisión 5 (`scroll-margin-top: 84px`), que además arregla el mismo defecto preexistente de escritorio. Verificado a 390px después del cambio: `tapada_px=0`.
- **[Que sticky no funcione si algún ancestro tiene `overflow: hidden`]** → hay que comprobarlo: `overflow` en un ancestro crea un contenedor de scroll que puede impedir el sticky. Se verifica en la tarea de comprobación; si existiera, la cabecera ya estaría rota también en escritorio, así que la evidencia sería inequívoca.