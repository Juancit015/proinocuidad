# Design

## Context

Ver `proposal.md` para el porqué. Esto es lo que condiciona el enfoque.

`.hero::after` es un pseudo-elemento: posicionado, sin `z-index`, con un círculo rojo de 420 px al 35 % y desenfoque de 10 px. En el orden de pintado del CSS, un descendiente posicionado con `z-index: auto` se pinta **después** que el contenido normal de la caja. O sea que la decoración queda por encima del texto salvo que el contenido esté posicionado.

Medido con `getComputedStyle`, hoy solo hay dos bloques `.hero` en el sitio, y se comportan distinto:

```
  pagina 404    .hero > .container = .container         position=static   z-index=auto
  Home          .hero > .container = .container .hero-grid  position=relative  z-index=2
```

El Home se salva por `.hero-grid { position: relative; z-index: 2 }`, una clase que existe por el layout de dos columnas, no por intención. El 404 usa `.container` normal y por eso la bolalos encima.

Medido píxel a píxel, buscando **hasta dónde llega la tinta del texto** y cuántos píxeles salen rosados cuando la decoración queda por delante. Comparar la caja del bloque `h1` no sirve: un bloque ocupa todo el ancho del contenedor mida lo que mida su texto.

```
  ancho  el circulo desde  tinta del h1   rosados con el fallo   rosados arreglado
   360                 80          293                   1842                0
   390                110          294                   1521                0
   430                150          384                   1855                0
   500                220          387                   1226                0
   600                320          391                    544                0
   700                420          395                      0                0
   768                488          421                      3                0
   860                580          471                      0                0
  1024                744          561                      0                0
  1280               1000          651                      0                0
```

El fallo **solo muerde por debajo de unos 600 px**. A partir de ahí el título es corto y queda a la izquierda, así que nunca llega al círculo, y no hay nada que tapar. Antes de medir por píxeles se dio por hecho que sí, porque la caja del bloque sí llegaba: el `h1` del 404 mide 1229 px de ancho aunque su texto termine en 651.

La consecuencia es que **cualquier verificación de este fallo tiene que hacerse a 390 px**. A 1280 px el defecto es invisible, y un escenario de especificación sin ancho fijo se podría dar por bueno comprobándolo justo ahí.

Lo segundo: los grupos de botones.

```
  grupo                     ancho de cada boton        filas en 390px   huecos
  .hero-acciones del 404     173 / 167 / 183 / 253      3               si
  .hero-acciones del Home    145 / 245                   2               si
  .matricula-cta-group       307 / 307                   2               no
  .card-acciones (Home)      317 / 317                   2               no
  .card-body (Home)          317 / 317                   2               no
```

La diferencia no es el grupo: es que **donde los botones miden lo mismo no hay hueco**. El sitio ya tiene la solución escrita, en `.matricula-cta-group`: `flex-direction: column` y `.btn { width: 100% }`.

Restricción que este change tiene que respetar: `pagina-404` incluye un requisito que dice que aquel cambio no añadió reglas al CSS, y cuyo escenario busca reglas "atribuibles a la página de error". Aquí hay que distinguir el qué del porqué.

## Goals / Non-Goals

**Goals:**

- Que la decoración de un bloque no pueda tapar texto, sin importar qué contenedor se use.
- Que los botones de acción del hero no dejen huecos en móvil.
- Que el orden de los botones del 404 quede deliberado y no accidental.

**Non-Goals:**

- **No rediseñar los botones.** No cambian de tamaño, de color ni de variante. Solo su orden y su disposición en pantalla estrecha.
- **No tocar los grupos que ya funcionan.** `.matricula-cta-group`, `.card-acciones` y `.card-body` se dejan como están: sus botones ya se alinean.
- **No cambiar el círculo.** Se mantiene decorativo, con su color y su tamaño. Lo que cambia es que deja de estar encima.
- **No tocar la ficha de curso.** Sus grupos de botones ya son columnas a ancho completo.
- **No tocar textos, colores de marca ni datos de contacto.**

## Decisions

### 1. La protección va en el contenedor del hero, no en una página

La corrección es una regla que sube el contenido del hero por encima del decorativo. Se aplica al contenedor del hero, con el mismo valor que ya usa `.hero-grid`.

La alternativa descartada es arreglar solo el 404, cambiando su marcado para usar `.hero-grid`. Sería un parche: el siguiente hero escrito con un `.container` normal repetiría el fallo sin avisar, porque el círculo es translúcido y se confunde con el degradado.

Por eso la regla está escrita como propiedad del bloque y no de una página, y por eso la spec incluye un escenario que prohíbe escribirla para una página concreta. Así el 404 no se convierte en la excusa para meter CSS específico.

`.hero-grid` conserva su `z-index: 2`: es el mismo valor, no hay conflicto.

### 2. El apilado va en tres franjas, y la de dos columnas empieza en 560 px

La primera versión de este change puso los botones a ancho completo en una sola columna por debajo de 860 px. **El dueño lo rechazó**: pidió dos botones por fila y que no se hicieran más grandes.

La primera medición que se hizo fue comparar anchos, y de ahí salió que a 390 px solo cabían dos de los diez botones. Eso no es un problema del CSS: es que las etiquetas no caben.

```
  a 390px la columna de dos seria de 172px, y el ancho natural de cada boton es
  texto + 26 del icono + 44 de padding + 4 del borde

  Ver cursos                       97 -> 171px   cabe
  Nosotros                         88 ->  162px   cabe
  Ver los cursos                   119 ->  193px   no
  Volver al inicio                 125 ->  199px   no
  Ver los servicios                135 ->  209px   no
  Consultar por WhatsApp           197 ->  271px   no
  Escríbenos por WhatsApp          205 ->  279px   no
```

Para que el más largo, "Escríbenos por WhatsApp", quepiera en 172px habría que bajar la fuente a unos 10 px. Acortar las etiquetas resolvería, pero la spec `diseno-responsive` prohíbe que los cambios de responsive toquen textos.

Así que el punto de corte lo decide la aritmética, no el gusto: **dos columnas donde caben, una donde no caben**.

```
  < 560px    una columna, botones a ancho completo
  560-860px  rejilla de dos columnas de igual anchura
  > 860px    la fila de siempre, sin cambios
```

Los botones ocupan **toda la columna**, no su ancho natural. Si se dimensionaran por su texto volverían las filas desparejas, que es el problema original. Por eso la rejilla es `1fr 1fr` y no un `flex-wrap` de anchura automática.

El patrón de columna con botones a ancho completo sí es el que ya usa `.matricula-cta-group`, así que la franja estrecha no inventa nada. La franja de dos columnas es nueva, pero no por gusto: es lo único que permite dos botones por fila.

### 3. El orden del 404 va en el documento, no en CSS

Con los botones apilados, el orden del DOM **es** el orden que se ve. Así que ordenar por importancia es mover líneas en el generador, no escribir `order` en CSS.

La alternativa descartada es usar `flex-direction: column-reverse` u `order` para reordenar visualmente. Sería un truco: el documento seguiría mostrando otro orden que la pantalla, que es exactamente lo que se quiere evitar. Con `flex-direction: column` el orden natural del documento manda, que es el orden que lee quien usa un lector de pantalla y quien navega con el teclado.

### 4. El botón rojo no va primero en el 404

El orden es Inicio → WhatsApp → Cursos → Servicios.

Podría discutirse que la acción comercial debería ir por delante. En una página de error no: quien llega ahí no está mirando para comprar, está intentando volver a donde estaba. Poner el WhatsApp primero empujaría al visitante a un mensaje comercial en el momento menos-appropriate. El botón rojo queda segundo porque es la segunda mejor salida, no porque sea la principal.

El Home no se reordena: sus botones ya van en el orden correcto, con el destacado primero.

### 5. El icono de WhatsApp se queda relleno, y se cambia el del 404

Al revisar el botón del Home se vio que su icono de WhatsApp es relleno con `currentColor` y con `stroke-width` de 1 px heredado, al lado de una flecha de trazo de 2,5 px. Se pidió pasarlo a trazo.

La medición cambió el cuadro: **los iconos relleno son 21 botones en 10 ficheros, y el único de trazo era el del 404**, que es de este mismo change. La marca de WhatsApp se reconoce en relleno, y todas las tarjetas de curso del sitio ya lo usan así.

```
  relleno:  21 botones en 10 ficheros   (las 8 fichas, cursos/index.html, el Home)
  trazo:     1 boton                    (el 404, de este change)
```

Así que se invierte la decisión: **el que cambia es el del 404**, que pasa a relleno reutilizando el `SVG_WA` que el generador ya tenía y que es exactamente el mismo icono que usan las fichas y el Home. Un icono, una definición, y se borra el `SVG_BTN_WA_BTN` que este change había creado.

Se añade un requisito en `iconografia` que admite el relleno cuando el icono es una marca, y que prohíbe que la misma marca tenga dos tratamientos distintos en el sitio. Lo que **no** se cambia son los 21 botones, porque son la norma y funcionan.

### 6. La verificación del solapamiento es una medición, no una mirada

El círculo es translúcido y su color se parece al degradado del hero, así que "se ve raro" no es comprobable a ojo. La comprobación compara el borde izquierdo del círculo con el borde derecho del texto del hero, en cada ancho, y confirma con `getComputedStyle` que el contenedor ya no queda en `z-index: auto`.

Ese es el mismo criterio que se aplicó en el change de la página 404: un defecto de apilado no se arregla con openspec validate.

## Risks / Trade-offs

- **[La nueva regla del contenedor del hero afecta al Home]** → Es el efecto buscado y comparte valor con la que ya tenía `.hero-grid`. Se verifica midiendo que en el Home el círculo seguía detrás antes y sigue detrás después.

- **[Apilar los botones en el Home cambia su aspecto en móvil]** → En el Home los dos botones pasarán de una fila con hueco a dos filas a ancho completo, igual que los grupos de las fichas. Ese es el cambio pedido, pero es visible y conviene mirarlo antes de dar por bueno el trabajo.

- **[El orden del 404 se fija en la spec y podría cambiar después]** → Fijarlo es el punto: hoy nadie lo sabe y cualquier cambio lo mueve sin avisar. Si más adelante se decide otro orden, se cambia la spec y el generador juntos.

- **[`.hero > .container` es un selector amplio]** → Con solo dos heroes en el sitio hoy, es exacto. Si mañana un hero quiere un hijo que quede **por encima** de la decoración a propósito, tendría que declarar su propio `z-index`, que es el comportamiento esperado de un `z-index` explícito.