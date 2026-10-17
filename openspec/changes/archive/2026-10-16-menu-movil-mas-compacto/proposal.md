# Proposal

## Why

El panel del menú hamburguesa se vuelve desmedido en cuanto se despliega un submenú. Medido con Chromium sobre `nosotros/index.html`: con "Servicios" desplegado el panel mide **681px**, el **76%** de una ventana de 900px de alto, y en un móvil de 390×740 los **664px no caben** en los 664px disponibles, así que el usuario tiene que desplazarse dentro del propio menú para ver el resto.

El dueño lo reportó por dos vías distintas y las dos son el mismo defecto: al redimensionar una ventana de escritorio hasta la franja de 860px, y al usar el menú en el móvil. En ambos casos la causa es la misma: el panel reparte sus filas a lo ancho completo de la pantalla con una altura de fila y un relleno que no están ajustados a la cantidad de contenido, y desperdicia el ancho disponible cuando el viewport es ancho.

## What Changes

- **El panel del menú móvil se hace más compacto en todos los anchos**, bajando la altura mínima de las filas, el relleno vertical y los huecos entre ítems. Solo CSS, sin tocar el tamaño del cuadro de icono, que ya viene reducido a 36px en móvil por una regla existente.
- **Los ítems de cada submenú se reparten en 2 columnas cuando el ancho lo permite**, es decir entre 560px y 860px, que es la franja del escritorio redimensionado. Por debajo de 560px siguen en una sola columna, porque en un teléfono no caben dos. El enlace "Ver todos los servicios" o "Ver todos los cursos" ocupará el ancho completo del panel en ambos casos.
- **El panel desplegado deja de desbordar la pantalla en los tamaños de móvil habituales.** Con un submenú abierto pasa de 664px a 574px en 390×740, con lo que el menú se ve entero sin desplazarse dentro.
- **Se corrige la afirmación de la spec que dice que los ítems van "en una sola columna" en móvil**, porque a partir de ahora eso solo es cierto por debajo de 560px.

Efecto medido, con el cuadro de icono intacto:

| Ancho | Antes | Después |
|---|---|---|
| 860×900 (escritorio redimensionado) | 681px (76%) | 474px (53%) |
| 700×900 | 681px (76%) | 474px (53%) |
| 620×900 | 681px (76%) | 512px (57%) |
| 390×740 (móvil) | 664px, se desplaza | 574px, cabe entero |
| 390×844 (móvil alto) | 681px | 574px |
| 360×640 (móvil pequeño) | 564px, se desplaza | 564px, se desplaza |

El último caso, 360×640, no se resuelve: es un teléfono muy pequeño y el panel mantiene su desplazamiento interno, que es el comportamiento previsto por la spec. Se deja así a propósito.

## Capabilities

### New Capabilities

Ninguna. El comportamiento sigue siendo el del menú móvil, que ya tiene su capability.

### Modified Capabilities

- `navegacion-global`: el escenario "Móvil" del requisito "Mega-menú al hover" deja de afirmar una sola columna para todos los anchos móviles y pasa a describir las dos columnas de la franja 560–860px. Se añade además un requisito nuevo que fija que el panel desplegado no debe desbordar la pantalla en los tamaños de móvil habituales.

## Impact

- **Código**: `assets/css/main.css` y nada más. La spec de `diseno-responsive` obliga a que los cambios responsive no toquen textos, colores, enlaces ni datos de contacto, y la forma de cumplirlo es exactamente esta: cero cambios de HTML.
- **Sin JavaScript**: el JS del menú no se toca. El comportamiento de apertura, acordeón, velo y cierre ya funciona y está verificado.
- **Sin dependencias ni APIs nuevas.**
- **Verificación**: con Chromium, en las 18 páginas del sitio, en los anchos que ya fija la spec de `diseno-responsive` (360, 390, 768, 860, 1024 y 1280px), más 559px y 560px para comprobar que el cambio de comportamiento ocurre justo en el umbral.
- **Riesgo asumido**: bajar la altura mínima de las filas de 46px a 40px reduce el área táctil de los enlaces del menú en móvil. Sigue por encima del mínimo de 24px de WCAG 2.2 AA, pero baja del valor de 46px que había. Si el dueño prefiere no tocarlo, la alternativa es ganar la altura solo con la regla de 2 columnas, que no funciona por debajo de 560px y por tanto no arregla el móvil. Queda anotado en `design.md`.