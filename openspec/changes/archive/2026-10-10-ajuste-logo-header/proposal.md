# Proposal

## Why

El logo nuevo ya incluye el nombre "PROINOCUIDAD" y el subtítulo "CONSULTORÍA ALIMENTARIA", pero el encabezado repite ese texto al lado. Además, el logo se ve muy pequeño: el PNG es cuadrado (500×500) y el contenido ocupa solo ~156 px de alto dentro del lienzo, así que con `height: 52px` el texto del logo mide ~16 px.

## What Changes

- Eliminar el texto `<span>Proinocuidad<small>Consultoría alimentaria</small></span>` del encabezado en las 13 páginas y en la plantilla de `tools/generar-fichas.mjs`. El logo sigue como enlace a Inicio, con `aria-label` y `alt` ya existentes.
- Eliminar las reglas CSS `.brand span` y `.brand span small` de `assets/css/main.css`, porque dejan de tener uso.
- Recortar el margen transparente de `assets/img/logo-proinocuidad.png` con `-trim` (de 500×500 a ~448×156), para que la altura del logo en el encabezado corresponda al contenido visible.
- Mantener la altura del encabezado en 52 px. Con el recorte, el logo completo mide ~52 px de alto y ~150 px de ancho.

**Supuestos registrados:**
- El recorte se aplica al archivo compartido, no solo al encabezado. Por eso también cambia el logo del pie (caja de 210 px, donde se verá más grande) y la tarjeta de marca de `cursos/index.html`. El JSON-LD sigue apuntando al mismo archivo.
- El original sin recortar (500×500, el logo entregado) se guarda en `_archivo/logo-proinocuidad-sin-recorte.png` antes de recortar.
- No se cambia la altura del encabezado en CSS, salvo que la verificación muestre que el logo recortado no encaja.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

<!-- Ninguna. `navegacion-global` exige "el logo oficial de Proinocuidad (enlazado a Inicio)" y no menciona el texto junto al logo. Ese requisito sigue cumpliéndose, por eso el change declara `skip_specs: true`. -->

## Impact

- **HTML:** bloque `<nav>` del encabezado en las 13 páginas (`<a class="brand">`). Se retira el `<span>` del texto.
- **Generador:** `tools/generar-fichas.mjs` (plantilla del encabezado). Se regeneran las 8 fichas.
- **CSS:** `assets/css/main.css`, dos reglas de `.brand span`.
- **Imágenes:** `assets/img/logo-proinocuidad.png` (recortado), `_archivo/logo-proinocuidad-sin-recorte.png` (copia del original).
- **Documentación:** `STRUCTURE.md` no cambia. `CHANGELOG.md` recibe una entrada.
- **Riesgo:** en pantallas pequeñas el logo de ~150 px más los enlaces podría forzar el menú móvil. Se verifica en la tarea de revisión.
