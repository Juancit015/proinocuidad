# Design

## Context

El CSS es un único archivo, `assets/css/main.css`, sin paso de build. El menú de escritorio usa `.nav-menu` con enlaces en `li` y, en Servicios y Cursos, un `.nav-drop` con un `.mega-panel` dentro del mismo `li`. El hover actual está en las líneas 128-136: fondo `--azul-claro` y texto `--azul`. La fuente está en `body` (línea 32) como pila del sistema, y no existe ninguna `@font-face`. Los encabezados de sección usan `.section-head` con `h2` y, a veces, `.subrayado`.

CrecePE (`/home/juan/crecepe/assets/css/styles.css`) resuelve el hover con un `::after` de 2 px que crece con `transition: width 0.3s`, y la píldora con `.section-badge`. Su fuente se carga desde Google Fonts. Ver `proposal.md` para el alcance.

## Goals / Non-Goals

**Goals:**
- Hover de navegación con línea animada, en los enlaces de nivel superior únicamente.
- Píldora en los 11 encabezados de sección listados en `proposal.md`.
- Outfit servida desde el propio sitio, sin peticiones a Google en cada visita.

**Non-Goals:**
- No se cambian colores de base, layout ni contenido, salvo las píldoras.
- No se toca el mega-menú: sigue desplegándose igual.
- No se añade modo oscuro ni se cambia el drawer móvil.
- No se usa el `<link>` de Google Fonts.

## Decisions

**1. Selector del hover limitado a los enlaces de nivel superior, sin el botón de Aula.**
`.nav-menu a` también coincide con los enlaces del `.mega-panel`, que están dentro del `li` del menú, y con el botón `a.btn-aula-nav`. Por eso el selector será `.nav-menu > li > a:not(.btn-aula-nav)`. Los enlaces del panel quedan como `li > div.mega-panel > div.mega-panel-inner > a`, fuera del selector, porque no son hijos directos del `li`.
Alternativa: `.nav-menu a` excluyendo `.mega-panel a` y `.btn-aula-nav`. Se descarta porque obliga a sobrescribir reglas en cada variante.

**2. Línea del hover con `::after`, como en CrecePE.**
`position: relative` en el enlace, `::after` absoluto en `bottom: -5px`, `height: 2px`, `width: 0` y `transition: width 0.3s ease`. En hover pasa a `width: 100%`. Se usa `--rojo` para la línea y `--azul` para el texto.
Alternativa: `border-bottom` con transición. Se descarta porque la transición de `border` no anima el ancho, y el efecto de referencia es de ancho.

**3. Hover solo en escritorio con puntero: `@media (min-width: 861px) and (hover: hover)`.**
En dispositivos táctiles el hover queda "pegado" tras tocar, así que se exige `(hover: hover)`. Además, por debajo de 860 px el menú es un acordeón que usa `.nav-drop > a::after` para mostrar "+". Si la línea del hover se aplicara también ahí, las dos pelearían por el mismo pseudo-elemento. Por eso la media query empieza en 861 px, justo después del breakpoint móvil de `main.css`.

**4. Fuente local con `@font-face` y `font-display: swap`.**
Se descarga un único archivo woff2 variable de Outfit (subconjunto latin, eje de peso) en `assets/fonts/outfit-latin-wght.woff2`. Google sirve un solo archivo para los pesos 400 a 800, así que un bloque `@font-face` con `font-weight: 400 800` cubre los cuatro pesos. El `src` usa `url(../fonts/...)`, relativo a `main.css`. `font-display: swap` evita que el texto quede invisible mientras carga.
Alternativa: `<link>` a Google Fonts, como CrecePE. Se descarta porque conecta con un servicio externo en cada visita, y tus reglas exigen confirmación explícita para eso.
Riesgo de descarga: los archivos se obtienen de internet una sola vez. Antes de hacerlo se pide tu confirmación.

**5. Píldora como `<span class="section-badge">` dentro de `.section-head`, antes de `h2`.**
Es un elemento en línea dentro de un bloque. Se coloca como primer hijo de `.section-head`. El CSS usa `display: inline-block`, con las mismas medidas de la referencia y colores de Proinocuidad: texto `--azul`, fondo `--azul-claro`, borde `1px solid var(--gris-linea)`.
Alternativa: generar la píldora con `::before` a partir de `data-` en el `h2`. Se descarta porque el texto quedaría oculto en el HTML y no sería leído por lectores de pantalla ni por buscadores.

**6. Cambios repetidos en HTML sin generador.**
Las 3 páginas con `.section-head` (`index.html`, `servicios/index.html`, `nosotros/index.html`) se editan a mano, una inserción por encabezado. No hay generador que las regenere.

## Risks / Trade-offs

- **[Descarga de fuentes falla o es de otra versión]** → Se verifica con `identify`/`file` que son woff2 y se comprueba la familia en el navegador. Si falla, se detiene la tarea y se consulta.
- **[Pesos de fuente aumentan la descarga]** → Se usan los cuatro pesos de la referencia. Si pesa demasiado, se reduce en una tarea posterior.
- **[Píldora en Servicios genera texto repetido en el `h2`]** → Aceptado: la píldora es una etiqueta corta; el `h2` no cambia.
- **[Hover en el menú de Servicios y Cursos]** → Se verifica que el enlace de nivel superior tiene subrayado y que los enlaces del panel no.
- **[Texto de píldora fuera de lugar]** → Se confirma la tabla de `proposal.md` antes de aplicar.

## Migration Plan

1. Copiar `assets/css/main.css`, `index.html`, `servicios/`, `nosotros/`, `noticias/`, `cursos/` y `STRUCTURE.md` a `/tmp/opencode/respaldo-estilo/`.
2. Descargar los archivos de Outfit a `assets/fonts/` (tras confirmación).
3. Editar `main.css`: `@font-face`, `body`, hover del menú, `.section-badge`.
4. Insertar las 11 píldoras en las 3 páginas.
5. Verificar y actualizar `STRUCTURE.md` y `CHANGELOG.md`.

**Rollback:** restaurar `main.css` y las 3 páginas desde la copia de respaldo; borrar `assets/fonts/`.

## Open Questions

Ninguna sobre alcance. Los textos de las píldoras y la descarga de fuentes quedan como pasos de confirmación antes de aplicar, según `proposal.md`.
