# Proposal

## Why

La navegación y los encabezados de sección de Proinocuidad son funcionales pero planos. La referencia de CrecePE muestra un estilo más claro: el menú reacciona con una línea animada al pasar el cursor, cada sección tiene una etiqueta en píldora y el texto usa una fuente con más personalidad. Se adoptan solo estos tres cambios, sin tocar el resto del diseño.

## What Changes

- **Hover de la navegación:** en los enlaces del menú (`.nav-menu a` y los `.nav-drop > a`), el hover deja de usar el fondo azul claro. Pasa a texto azul con una línea de 2 px debajo que crece de 0 a 100 % de ancho. El mega-menú sigue desplegándose al hover.
- **Píldora de sección:** cada encabezado de sección muestra una etiqueta en píldora encima del título, con texto corto.
- **Tipografía Outfit en todo el sitio:** el cuerpo, los títulos, el menú y los botones usan Outfit (pesos 400, 600, 700 y 800, los mismos de CrecePE). Los archivos se alojan en `assets/fonts/`, sin conexión a Google en cada visita.

**Textos propuestos para las píldoras** (pendientes de confirmación antes de aplicar):

| Página | Encabezado actual | Píldora propuesta |
|---|---|---|
| index.html | Nuestros servicios | Servicios |
| index.html | ¿Quiénes somos? | Nosotros |
| index.html | Cursos destacados | Cursos |
| index.html | Noticias y eventos | Noticias |
| servicios/index.html | 1. Capacitación Empresarial | Capacitación |
| servicios/index.html | Experiencia en capacitación empresarial | Casos reales |
| servicios/index.html | 2. Implementación de normativa sanitaria de alimentos | Normativa |
| servicios/index.html | 3. Implementación de sistemas de gestión de la calidad e inocuidad alimentaria | Gestión de calidad |
| servicios/index.html | 4. Trámite de registro sanitario de alimentos y bebidas | Registro sanitario |
| nosotros/index.html | Quiénes somos | Nosotros |
| nosotros/index.html | Misión, visión y valores | Misión y valores |

**Supuestos registrados:**
- Los colores son los de Proinocuidad: azul `#101477` para texto y píldora, rojo `#AD343B` para la línea del hover. No se usan los colores de CrecePE.
- Las medidas de la píldora son las de la referencia: mayúsculas, 0.8 rem, peso 700, espaciado 0.08 em, radio 50 px, relleno 6 px × 16 px.
- El estado `.nav-activo` (página actual) conserva su fondo. Solo cambia el hover.
- El botón "Aula Virtual" de la barra no cambia.
- En el menú móvil (drawer) no hay hover, así que no se añade la línea allí.
- Proinocuidad no tiene modo oscuro, así que no se incluye.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

<!-- Ninguna. El mega-menú al hover de `navegacion-global` sigue igual en comportamiento: se despliega al pasar el cursor y muestra los mismos 4 servicios. Solo cambia el estilo del enlace. Ninguna spec fija tipografía ni encabezados de sección. Por eso el change declara `skip_specs: true`. -->

## Impact

- **CSS:** `assets/css/main.css`. Se añade `@font-face` para Outfit, se cambia `body` y se ajustan las reglas de hover del menú. Se añade la regla `.section-badge`.
- **Fuentes:** nueva carpeta `assets/fonts/` con los archivos de Outfit. Hay que descargarlos desde internet; ese paso requiere tu confirmación explícita al aplicar.
- **HTML:** 11 `<span class="section-badge">` dentro de los `.section-head` de `index.html` (4), `servicios/index.html` (5) y `nosotros/index.html` (2). Las 8 fichas y `cursos/index.html` no usan `.section-head`, así que no cambian.
- **Documentación:** `STRUCTURE.md` (carpeta `assets/fonts/`) y `CHANGELOG.md`.
- **Riesgo:** los pesos de Outfit añaden peso de descarga. Se aceptan los cuatro pesos de la referencia; si pesan demasiado se reducen en una tarea posterior.
