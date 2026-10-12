# Tasks

## 1. Preparación

- [x] 1.1 Copiar `assets/css/main.css`, `index.html`, `servicios/`, `nosotros/`, `noticias/`, `cursos/` y `STRUCTURE.md` a `/tmp/opencode/respaldo-estilo/` con `cp -a`; verificar con `ls -R` que la copia existe completa.
- [x] 1.2 Confirmar con el usuario la tabla de textos de píldoras de `proposal.md` antes de editar HTML. Si cambia algún texto, actualizar `proposal.md` antes de continuar.

## 2. Fuente Outfit alojada en el sitio

- [x] 2.1 Pedir confirmación explícita antes de descargar los archivos de Outfit desde internet. No descargar sin ella. (Confirmada por el usuario.)
- [x] 2.2 Con la confirmación, descargar Outfit (subconjunto latin) en formato woff2 para los pesos 400, 600, 700 y 800 a `assets/fonts/`; verificar con `file` que cada archivo es Web Open Font Format y que existen los cuatro pesos. (Ajuste: Google sirve un único archivo variable para los cuatro pesos. Se descargó `assets/fonts/outfit-latin-wght.woff2` (32 KB), verificado con `file` como WOFF2 y con `fc-scan` como fuente variable con instancias Regular, SemiBold, Bold y ExtraBold.)
- [x] 2.3 En `assets/css/main.css`, añadir `@font-face` para Outfit con `src: url("../fonts/outfit-latin-wght.woff2") format("woff2")`, `font-weight: 400 800`, `font-display: swap`. Verificar con `grep -n "@font-face" assets/css/main.css` que aparece un bloque con `font-weight: 400 800`. (Ajuste: un solo bloque, en lugar de cuatro.)
- [x] 2.4 Cambiar `body { font-family }` en `main.css` a `"Outfit", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Verificar con `grep -n "Outfit" assets/css/main.css` que `body` la usa.
- [x] 2.5 Verificar que ninguna página HTML ni CSS carga fuentes desde Google: `grep -rn "fonts.googleapis\|fonts.gstatic" . --include=*.html --include=*.css --exclude-dir=openspec --exclude-dir=_archivo` debe devolver cero coincidencias.

## 3. Hover de la navegación

- [x] 3.1 En `main.css`, reemplazar el hover actual de `.nav-menu a` (fondo `--azul-claro`) por: `.nav-menu > li > a:not(.btn-aula-nav)` con `position: relative`, `::after` de 2 px en `--rojo` con `width: 0` y `transition: width 0.3s ease`, y en hover `color: var(--azul)` con `::after { width: 100% }`. Verificar con `grep -n "btn-aula-nav\|::after" assets/css/main.css`. (Hecho dentro de la media query de 3.2.)
- [x] 3.2 Envolver el hover de 3.1 en `@media (hover: hover)` para que el drawer móvil no quede con líneas tras tocar. Verificar con `grep -n "hover: hover" assets/css/main.css`. (Ajuste: la media query es `(min-width: 861px) and (hover: hover)`. El menú móvil usa `.nav-drop > a::after` para el "+" y la línea no debe pelear por ese pseudo-elemento. Ver design.md, decisión 3.)
- [x] 3.3 Confirmar que la regla `.nav-activo` conserva su fondo `--azul-claro` y que el hover de los enlaces del `.mega-panel` no cambió: revisar en CSS que ningún selector coincide con `.mega-panel a`. Verificar con `grep -n "mega-panel" assets/css/main.css`. (Verificado: `.nav-menu a:hover` ya no existe; `.mega-panel a:hover` conserva fondo azul claro y añade `color: var(--azul)` para mantener el color anterior.)

## 4. Píldora de sección

- [x] 4.1 En `main.css`, añadir `.section-badge` con: `display: inline-block`, `padding: 6px 16px`, `border-radius: 50px`, `font-size: 0.8rem`, `font-weight: 700`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `margin-bottom: 14px`, `color: var(--azul)`, `background: var(--azul-claro)`, `border: 1px solid var(--gris-linea)`. Verificar con `grep -n "section-badge" assets/css/main.css`.
- [x] 4.2 En `index.html`, insertar `<span class="section-badge">` como primer hijo de cada uno de los 4 `.section-head`, con los textos confirmados en 1.2 (Servicios, Nosotros, Cursos, Noticias). Verificar con `grep -c 'class="section-badge"' index.html` que devuelve 4.
- [x] 4.3 En `servicios/index.html`, insertar la píldora en los 5 `.section-head` con los textos confirmados (Capacitación, Casos reales, Normativa, Gestión de calidad, Registro sanitario). Verificar con `grep -c 'class="section-badge"' servicios/index.html` que devuelve 5.
- [x] 4.4 En `nosotros/index.html`, insertar la píldora en los 2 `.section-head` con los textos confirmados (Nosotros, Misión y valores). Verificar con `grep -c 'class="section-badge"' nosotros/index.html` que devuelve 2.
- [x] 4.5 Verificar que el total de píldoras es 11 y que cada `h2` sigue con su texto original: `grep -rc 'class="section-badge"' index.html servicios/index.html nosotros/index.html` suma 11.

## 5. Verificación de cuerpos

- [x] 5.1 Comparar en `index.html`, `servicios/index.html` y `nosotros/index.html` el contenido de cada página sin las líneas `section-badge` con la copia de 1.1; deben ser idénticos.
- [x] 5.2 Verificar que `cursos/index.html`, las 8 fichas y `noticias/index.html` no cambiaron en HTML: comparar cada archivo con la copia de 1.1; deben ser idénticos, porque la fuente y el hover viven en `main.css`.

## 6. Documentación

- [x] 6.1 Actualizar `STRUCTURE.md` para incluir `assets/fonts/` con los archivos de Outfit. Verificar con `grep -n "fonts" STRUCTURE.md`.
- [x] 6.2 Registrar el cambio en `CHANGELOG.md` en una sección nueva con fecha `2026-10-11`, arriba de las entradas existentes, con "Changed": hover de la navegación con línea animada, píldoras de sección y tipografía Outfit alojada en el sitio. Verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 7. Verificación final

- [ ] 7.1 Revisar en navegador (escritorio y móvil) que el hover muestra la línea roja y el menú móvil no la conserva tras tocar. Si no es posible abrir la página en el navegador, informarlo sin marcar la tarea.
- [x] 7.2 Informar de lo que no se pudo verificar: la carga real de Outfit en navegador y el comportamiento del hover en dispositivos táctiles.
