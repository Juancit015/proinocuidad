# Design

## Context

Estado actual, medido con Chromium sobre `nosotros/index.html` con el menú hamburguesa abierto y el submenú "Servicios" desplegado. Ver `proposal.md` para la motivation; aquí solo lo que condiciona el enfoque.

| Ancho | Alto del panel | Cabe entero |
|---|---|---|
| 860×900 | 681px | sí, pero es el 76% de la ventana |
| 620×900 | 681px | sí, 76% |
| 390×740 | 664px | **no**, se desplaza dentro |
| 360×640 | 564px | **no**, se desplaza dentro |

Desglose de los 681px: 48px del rótulo "Menú", 296px de los seis enlaces principales (47–61px cada uno) y 359px del submenú desplegado. Dentro de esos 359px, los cuatro ítems miden 54px cada uno y el enlace "Ver todos" 44px.

La altura de cada ítem del submenú la manda el cuadro de icono, no el texto: el ícono mide 36px dentro de un cuadro que la spec fija en 44px en escritorio y que una regla existente ya reduce a 36px en móvil (`main.css:634`).

Restricciones que vienen de otras specs y que este diseño no puede contradecir:

- `diseno-responsive` → "Contenido sin cambios": los cambios responsive **no** modifican textos, colores, enlaces ni datos, y el escenario de revisión exige que **solo cambien los archivos CSS**.
- `navegacion-global` → "Mega-menú al hover": cada ítem lleva "un ícono SVG de 24px dentro de un cuadro de 44px" y los submenús van "en una grilla de 2 columnas" en el panel de 460px.

## Goals / Non-Goals

**Goals:**

- Que el panel desplegado quepa entero en 390×740 y en 390×844, sin desplazamiento interno.
- Bajar el alto del panel en la franja de escritorio redimensionado, de 681px a menos de 520px.
- Dejar intactos el mega-menú de escritorio (861px o más), el JavaScript del menú y todo el HTML.
- Mantener el área activable de los enlaces por encima de 40px de alto.

**Non-Goals:**

- No tocar el mega-menú de escritorio ni el breakpoint de 860px que decide cuándo aparece el menú hamburguesa. Ese breakpoint ya está bien: a 900px el menú horizontal de escritorio ocupa 576px y funciona.
- No rediseñar el panel a dos columnas con los enlaces principales y el submenú lado a lado. Se midió y no mejora lo suficiente para el coste.
- No ocultar las descripciones de los ítems. Se midió que no hacen falta.
- No tocar los 360×640, donde el panel seguirá desplazándose por dentro.
- No resolver el aviso de `--strict` que arrastra la spec `navegacion-global` por un requisito de 912 caracteres. Es un problema anterior y ajeno.

## Decisions

### 1. Solo CSS, y por tanto nada de markup nuevo

La spec `diseno-responsive` obliga. No es una limitación que aceptamos con resignación: encaja con el problema, porque lo que falla es la distribución vertical, no la estructura. Todo el HTML del submenú ya tiene lo que hace falta (`.mega-panel-inner` es una grilla, el enlace de todos es `.mega-cta`). No hace falta ni un elemento nuevo.

### 2. Bajar densidad antes que el cuadro de icono

La palanca más tentadora es encoger el ícono de 36px a 30px, que reduciría cada fila unos 8px. Se descartó por dos motivos: la spec fija el cuadro en 44px y móvil ya lo reduce a 36px, así que bajarlo más aleja el código de lo especificado; y en un teléfono cada punto de alto es área táctil, que es lo último que conviene gastar.

La palanca real es el relleno: `padding` de 8px a 4px, `min-height` de 46px a 40px, huecos entre ítems de 8px a 4px y relleno del panel de 10px a 6px. Suman unos 100px sin tocar nada que la spec mida.

Medido: solo con esta densidad el panel pasa de 681px a **574px**, y en 390×740 deja de desbordar. Es decir, **la mitad del arreglo no necesita la regla de dos columnas**.

### 3. Las dos columnas van en su propia media query, no en la regla base

`grid-template-columns: 1fr 1fr` se añade dentro de `@media (min-width: 560px) and (max-width: 860px)`, encima del bloque `@media (max-width: 860px)` que ya existe, y no en la regla base de `.mega-panel-inner`.

Motivo: la regla base la hereda el mega-menú de escritorio, que ya usa dos columnas con `grid-template-rows: repeat(2, 1fr) auto` y un panel de 460px. Tocarla arriesga el escritorio, que hoy funciona y no se va a tocar.

El enlace `.mega-cta` lleva `grid-column: 1 / -1` para que siga ocupando todo el ancho, como ya fija el escenario "Botón Ver todos con hover azul".

### 4. El umbral es 560px porque es donde dos columnas dejan de estorbar

Se midió el ancho que le toca a cada ítem en dos columnas:

| Ancho | Ancho por ítem | Efecto |
|---|---|---|
| 860px | 413px | Las descripciones caben en una línea, no cuestan altura |
| 700px | 333px | Igual, sin coste |
| 620px | 255px | La descripción pasa a dos líneas: **cuesta 42px** |
| 559px | 172px | Insuficiente para ícono, título y descripción juntos |

Por debajo de 560px dos columnas no aportan nada y estorban, así que ahí se queda en una. El coste de 42px entre 560 y 700px es el precio de no recortar las descripciones, y se acepta: son las que explican en qué consiste cada servicio.

### 5. Se conservan las descripciones

Medido que **no aportan altura** por encima de 700px: con y sin ellas el panel mide 482px. Entre 560 y 700px cuestan 42px. Ocultarlas ahorraría ese margen a costa de quitar el texto que dice qué hace cada servicio, que es justo la información que hace útil el desplegable. No vale la pena.

### 6. El rótulo "Menú" del panel se elimina

**Cambiado a petición del dueño durante la implementación.** La decisión original era conservarlo, con el argumento de que 40px no compensan quitar el rótulo que da nombre al panel. El dueño lo pidió tras ver el resultado: lo que aporta es un rótulo redundante, porque el botón hamburguesa de la cabecera ya está a la vista y se convierte en una ✕ al pulsarse, así que el rótulo repite lo que el icono ya dice.

La eliminación reporta 40px exactos en todos los anchos, medidos, sin excepciones. Sale mejor de lo previsto: en 390×740 el panel pasa de 607px a 567px y en 860×900 de 491px a 451px, el 50% de la ventana.

- **Se borra el elemento entero**, el `<li class="nav-mobile-heading">` con su `<span>`, no solo el texto. Dejar la cajita vacía ocuparía los mismos 40px.
- **Va también en el generador**, `tools/generar-fichas.mjs`, para que la próxima ficha no lo traiga de vuelta. Verificado ejecutando el generador y comparando con `diff`: reproduce las fichas idénticas.
- **Tres reglas de CSS se retiran**: el bloque del rótulo, el `:not()` que lo excluía del borde inferior y su ocultado en escritorio. Ese `:not()` además sobra: al no existir el elemento, todos los `<li>` llevan borde.
- **No lo menciona ninguna spec**, así que no hay nada que enmendar. La decisión 6 de este documento era la única que lo recogía, y se actualiza aquí.
- **En 360×640 no mejora nada**, porque ahí el alto lo manda el tope `max-height: calc(100dvh - 76px)` y no el contenido. Sigue desplazándose, igual que antes y por el mismo motivo.

## Risks / Trade-offs

- **[El área táctil de los enlaces baja de 46px a 40px]** → Sigue por encima del mínimo de 24px de WCAG 2.2 AA y el nuevo requisito fija 40px como suelo, de modo que el valor queda escrito y es verificable. Si el dueño lo considera inaceptable en un teléfono, la alternativa es ganar toda la altura solo con la regla de dos columnas, pero esa regla no aplica por debajo de 560px y por tanto **no arregla el móvil**, que es la mitad del problema. Se ha preferido el arreglo real asumiendo el coste, y queda anotado para que la decisión sea consciente.

- **[El panel da un salto de 594px a 512px al cruzar los 560px]** → Es el comportamiento propio de una media query y no hay forma suave de evitarlo sin usar consultas de rango, que complicarían el CSS sin ganar nada. El salto es hacia arriba en el ancho, o sea al ganar espacio, así que no oculta contenido.

- **[El bloque `@media (max-width: 860px)` del menú es un solo bloque largo en `main.css`** → Añadir una media query nueva al lado es coherente con cómo está organizado el archivo, que ya tiene ese patrón en varios sitios. Se mantiene dentro del bloque existente en vez de crear un media query paralelo para que quien lea el menú móvil lo encuentre todo junto.

- **[Los 40px no se pueden verificar solo por cálculo]** → La verificación tiene que medir el alto real de los enlaces renderizados en cada ancho, no leer el valor de `min-height`. Queda escrito así en las tareas.

- **[`navegacion-global` sigue sin pasar `--strict`** → El requisito modificado ya medía 912 caracteres antes de este cambio. No se recorta porque el schema prohíbe reescribir texto existente bajo MODIFIED solo para cumplir la longitud. Arreglarlo sería un change aparte, dedicado a eso.

## Migration Plan

Cambio de un solo archivo (`assets/css/main.css`), sin migraciones, sin build, sin estado que limpiar. Si molesta, revertir es sacar las reglas añadidas; no hay nada que deshacer en el HTML ni en el JavaScript.

## Open Questions

Ninguno que afecte a las specs o al enfoque. Queda una comprobación para durante la implementación, no una decisión pendiente: hay que confirmar visualmente que con dos columnas las descripciones no se cortan de forma desagradable entre 560 y 620px, donde el ancho por ítem cae a 255px y el texto pasa a dos líneas.