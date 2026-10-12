# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-hover-ver-todos/`; verificar con `ls -la /tmp/opencode/respaldo-hover-ver-todos/`.

## 2. CSS

- [x] 2.1 En `assets/css/main.css`, reemplazar `.mega-panel .mega-cta:hover { background: var(--rojo); }` por fondo `#0b1257` sin rojo; verificar con `grep -n "mega-cta:hover" assets/css/main.css` y que no queda `--rojo` en esa regla.
- [x] 2.2 Añadir la regla de la flecha `.mega-panel .mega-cta > span[aria-hidden="true"]` (`display: inline-block; color: #fff; opacity: 1; font-size: 16px; transition: transform .2s ease;`) y `.mega-panel .mega-cta:hover > span[aria-hidden="true"] { transform: translateX(4px); }`; verificar con `grep -n 'aria-hidden="true"\]' assets/css/main.css` y llaves balanceadas.
- [x] 2.3 Verificar que tamaño, padding, texto y enlaces no cambian (`diff` contra el respaldo solo muestra líneas de `.mega-cta`).

## 3. Verificación

- [x] 3.1 Confirmar con `grep -rc 'class="mega-cta"' --include=*.html .` que el número de botones coincide con lo esperado (13 páginas × 2 submenús) y que el marcado no cambió.
- [x] 3.2 Medir en navegador (escritorio) con un iframe a 1280px: color de fondo en reposo `rgb(16, 20, 119)`, en hover `rgb(11, 18, 87)`, flecha 16px blanca con opacidad 1, desplazamiento 4px en hover, y altura del botón sin cambios (45px).
- [x] 3.3 Revisar por observación en escritorio que el hover se ve azul y la flecha se mueve.

## 4. Documentación y cierre

- [x] 4.1 Añadir entrada en `CHANGELOG.md` (hover azul en botones "Ver todos" de submenús, flecha visible); verificar con `grep -n "^## 2026" CHANGELOG.md`.
- [x] 4.2 Revisión visual del usuario en navegador (hover azul, flecha visible y desplazada).

## 5. Ajuste de revisión

- [x] 5.1 La flecha va junto al texto (centrada con `gap: 8px`, no al final del botón) y con trazo más grueso (`font-weight: 800`); verificar con `grep -n "justify-content: center; gap: 8px" assets/css/main.css` y que la flecha queda a la izquierda del borde derecho del texto en el navegador.
- [x] 5.2 Revisión visual del usuario del ajuste de flecha y hover.
- [x] 5.3 La flecha se dibuja con `mask` SVG (trazo grueso, 16px) en lugar del carácter `→`, centrada verticalmente en el botón y a 8px del texto; verificada en navegador (centro de la flecha = centro del botón).
