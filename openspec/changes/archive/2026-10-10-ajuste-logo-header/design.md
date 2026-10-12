# Design

## Context

El encabezado de las 13 páginas tiene `<a class="brand">` con la imagen del logo y un `<span>` con el nombre y el subtítulo. El estilo está en `assets/css/main.css`: `.brand img { height: 52px; width: auto; }` y las reglas de `.brand span`. El logo nuevo (`assets/img/logo-proinocuidad.png`, 500×500 RGBA) ya contiene el mismo texto. Su contenido real mide 448×156 px, tal como lo calculó `magick -trim` sobre el archivo.

El mismo archivo se usa en el encabezado, en el pie (caja blanca de 210 px), en el placeholder de tarjeta de `cursos/index.html` y en el JSON-LD `Organization`. Ver `proposal.md` para el alcance.

## Goals / Non-Goals

**Goals:**
- Quitar el texto redundante del encabezado.
- Que el logo visible mida ~52 px de alto en el encabezado.
- No cambiar el contenido ni el enlace del logo.

**Non-Goals:**
- No se cambia la estructura del menú de navegación ni el mega-menú.
- No se cambian los colores ni las tipografías.
- No se cambia el favicon ni la imagen OG.
- No se crea un archivo de logo derivado solo para el encabezado. Se recorta el archivo compartido.

## Decisions

**1. Quitar el `<span>` del HTML, no ocultarlo con CSS.**
Alternativa: `.brand span { display: none }`. Se descarta porque dejaría código sin uso en 14 lugares. Quitarlo del HTML y las reglas del CSS deja el marcado limpio.

**2. Recortar el archivo compartido con `magick -trim`, no ajustar solo la altura en CSS.**
Con el margen actual, subir la altura a ~150 px en CSS haría que el encabezado creciera de forma innecesaria y dejaría espacio vacío alrededor. El recorte cambia la proporción real: 52 px de alto dan un logo visible de ~52 px de alto.
Alternativa: archivo derivado solo para el encabezado. Se descarta porque obliga a mantener dos logos y el pie también necesita el logo más visible.

**3. Conservar el original sin recortar en `_archivo/`.**
Se copia `assets/img/logo-proinocuidad.png` a `_archivo/logo-proinocuidad-sin-recorte.png` antes de recortar. Así el recorte es reversible.

**4. Mantener la altura de 52 px.**
No se ajusta el CSS de `.brand img`. Si la verificación en móvil o escritorio muestra que el logo queda muy grande, se reconsidera la altura en una tarea posterior.

**5. Regenerar las fichas desde el generador.**
Se quita el `<span>` de la plantilla del encabezado y se regeneran las 8 fichas. Se comparan los cuerpos con una copia de respaldo; el encabezado sí cambia, así que la comparación del cuerpo se hace después de `</header>` (`<main>` y el pie no cambian).

## Risks / Trade-offs

- **[El logo recortado en el pie se ve demasiado grande]** → El pie tiene caja de 210 px. Con el recorte, el logo ocupa casi todo el ancho de la caja y su altura sube a ~73 px. Se revisa visualmente. Si no encaja, se ajusta `.footer-brand img` en una tarea posterior.
- **[Menú móvil con logo de ~150 px]** → Se verifica con el ancho de móvil antes de cerrar.
- **[El recorte pierde margen de seguridad alrededor del logo]** → Aceptado: el logo se usa siempre dentro de un contenedor con espacio propio.
- **[`magick -trim` depende de la transparencia del borde]** → El archivo es RGBA con borde transparente (verificado con `identify`), así que el recorte es predecible.

## Migration Plan

1. Copiar los archivos afectados a `/tmp/opencode/respaldo-ajuste-logo/`.
2. Copiar el logo a `_archivo/logo-proinocuidad-sin-recorte.png`.
3. Recortar el logo activo con `magick` y verificar sus dimensiones.
4. Quitar el `<span>` y las reglas CSS. Regenerar las 8 fichas.
5. Verificar, actualizar `CHANGELOG.md`.

**Rollback:** copiar `_archivo/logo-proinocuidad-sin-recorte.png` sobre `assets/img/logo-proinocuidad.png` y restaurar las páginas y el CSS desde la copia de respaldo.

## Open Questions

Ninguna. El alcance está confirmado.
