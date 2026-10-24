# Tasks

## 1. Estructura en el Home

- [x] 1.1 En `index.html`, sustituir el contenido de `<section class="cifras">` por: H2 "Proinocuidad en cifras" dentro de un `.section-head` con su `.subrayado`, y una `.cifras-grid` con tres `.cifra-card`.
- [x] 1.2 Cada tarjeta lleva un `.stat-icono` con SVG en línea (usuarios, libro y escudo con check) y un `.stat-info` con `<span>` para la etiqueta y `<strong>` para el valor. Los SVG van con `viewBox="0 0 24 24"`, trazo 2 y `aria-hidden="true"`.
- [x] 1.3 Mantener los textos exactos ("+1000"/"personas capacitadas", "8"/"cursos y un diplomado asíncrono", "100%"/"compromiso con la salud pública") y cambiar `aria-label` por `aria-labelledby="cifras-titulo"` apuntando al H2.
- [x] 1.4 Confirmar que el H1, el `<title>`, la meta description y el canonical no cambian.

## 2. Estilos de la sección y las tarjetas

- [x] 2.1 En `assets/css/main.css`, reemplazar las reglas `.cifras`, `.cifras-grid`, `.cifra-card`, `.cifra-etiqueta` y `.cifra-valor` por: sección con `padding` de 48px y `.cifras-grid` de tres columnas, gap de 16px, `max-width: 820px` y `margin-inline: auto`.
- [x] 2.2 Copiar el patrón de `.ficha-stat-card` en `.cifra-card`: fondo blanco, borde `--gris-linea`, radio `--radio`, `--sombra-suave`, `padding: 18px 16px`, `display: flex`, `align-items: center` y `gap: 14px`.
- [x] 2.3 Reutilizar `.stat-icono` y `.stat-info` de las fichas (44px, `--azul-claro`, etiqueta en mayúsculas de 0.76rem en `--gris`, valor de 0.96rem en `--azul-oscuro`) y no duplicar esos estilos en clases nuevas.
- [x] 2.4 Añadir el hover dentro de `@media (hover: hover)`: `translateY(-3px)` y `--sombra`, con `transition` de 0.25s para transform y sombra, sin cambiar el borde.
- [x] 2.5 Quitar la regla `.cifras .container` del breakpoint de 1020px, el ajuste compacto de 560–860px y la regla de una columna de 560px; añadir una sola columna para `.cifras-grid` en `@media (max-width: 860px)`.
- [x] 2.6 Añadir `.cifra-card { transition: none; }` al bloque `@media (prefers-reduced-motion: reduce)` existente al final de `main.css`.
- [x] 2.7 Añadir como fondo de `.cifras` la foto de planta que aportó el dueño (`assets/img/cifras-fondo.avif`, derivada de su original sin marcas de agua) en dos capas `background-image`: velo degradado blanco `rgba(246,247,251,0.62)→0.30` a 90° y la foto con `cover`, `background-position: center, center 13%`.
- [x] 2.8 Subir el `padding` de la sección a `64px 0`: la franja de foto pasa de 275px a 307px y la cara de la trabajadora (≈298px en la imagen escalada) entra completa, con gorro y barbilla dentro del cuadro.
- [x] 2.9 Devolver el título a los colores por defecto del sitio (H2 en `--azul`, subrayado en `--rojo`): retirar las reglas de título blanco y `#ff8f96` de la iteración de velo oscuro.

## 3. Verificación en navegador

- [x] 3.1 Con Playwright a 390×740, 561×740, 683×623, 860×700, 861×740, 1024×768 y 1440×900: la sección muestra el H2 y exactamente tres tarjetas, sin desborde horizontal (`scrollWidth === clientWidth`).
- [x] 3.2 Medir las columnas: tres de igual ancho a 861, 1024 y 1440; una sola a 390, 561, 683 y 860, con las tarjetas apiladas y sin solaparse.
- [x] 3.3 Comprobar la jerarquía con `getComputedStyle`: icono de 44×44 con fondo `--azul-claro`, etiqueta en mayúsculas, `rgb(92, 95, 106)` y 0.76rem, valor en `rgb(11, 14, 86)` y 0.96rem; el icono va antes que el bloque de texto y la etiqueta antes que el valor.
- [x] 3.4 Medir el ancho a 1440: la fila no supera 820px, cada tarjeta queda por debajo de 280px, la fila está centrada y el H2 sigue alineado con el hero (130px).
- [x] 3.5 Comparar los estilos computados de `.cifra-card`, `.stat-icono` y `.stat-info` con los de `.ficha-stat-card`, `.stat-icono` y `.stat-info` en la ficha del diplomado: padding, gap, tamaño del icono y tamaños/colores de etiqueta y valor deben coincidir.
- [x] 3.6 Verificar el hover a 1024: la tarjeta sube 3px (`matrix` de traslación), cambia la sombra y no cambia el borde; los rectángulos de las otras dos no se mueven y no aparece scroll horizontal.
- [x] 3.7 Con `prefers-reduced-motion: reduce`: `transition-property`/`duration` de la tarjeta es `none`/`0s`, y el hover sigue aplicando la elevación.
- [x] 3.8 Comparar antes/después: el texto de las tres cifras es idéntico, el H1, el `<title>` y el canonical no cambian, y no hay scroll lateral.
- [x] 3.9 Confirmar que `assets/js/main.js`, `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` no se tocan, y que `index.html` sigue siendo la única página con `.cifras`.
- [x] 3.10 Verificar el fondo con Playwright a 1440, 1024 y 390: posiciones computadas (`50% 50%, 50% 13%`), 0 desbordes, H2 en `rgb(16, 20, 119)`, cara completa visible a 1440 y 390, sin marcas de agua, y contraste del H2 sobre el velo ≈ 10:1 (fondo medido `rgb(206,202,196)`).

## 4. Cierre

- [x] 4.1 Añadir la entrada al `CHANGELOG.md` con el resultado medido.
- [ ] 4.2 Archivar el change tras la revisión y verificar el resultado archivado.
