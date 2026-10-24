# Tasks

## 1. Freno en el CSS

- [x] 1.1 En `assets/css/main.css`, en `.flotante-whatsapp` y `.to-top-proi`, añadir `translate: 0 calc(-1 * var(--freno-flotantes, 0px))` y dejar `translate` sin duración dentro del `transition` (`translate 0s`), para que el freno siga al scroll sin el retardo de 250ms. Comentario que explique de dónde sale la variable.
- [x] 1.2 Eliminar el bloque `body.flotantes-frenados …` de la implementación anterior (ocultaba los botones) y confirmar que no queda ninguna regla que ponga `opacity: 0`, `visibility: hidden` o `pointer-events: none` por llegar al pie.
- [x] 1.3 Comprobar que el bloque `@media (prefers-reduced-motion: reduce)` sigue dejando `transition: none` a los flotantes, de modo que el freno también sea inmediato con movimiento reducido.

## 2. Cálculo del freno en el JS

- [x] 2.1 En `assets/js/main.js`, sustituir el `IntersectionObserver` del pie por un cálculo en `scroll` (pasivo) y `resize` agrupado en `requestAnimationFrame`: `freno = max(0, (innerHeight − bottom calculado del flotante) − barra.getBoundingClientRect().top)`, escrito en `--freno-flotantes` sobre `documentElement`. Leer el `bottom` con `getComputedStyle` en vez de duplicar los 26px; un solo rAF pendiente a la vez.
- [x] 2.2 Calcular también al cargar, para que una página corta con la barra ya visible nazca con el freno aplicado.
- [x] 2.3 Verificar en consola que no hay errores, que la variable sube y baja con el scroll y que `.to-top-proi.is-visible` sigue gobernado por su umbral de 400px.

## 3. Verificación en navegador

- [x] 3.1 Con Playwright, a 390×740, 683×623, 1024×768 y 1440×900, scrollear al final de `index.html`: los dos flotantes siguen con `opacity: 1` y `visibility` visible (el de subir, si `scrollY > 400`), y su borde inferior coincide con el borde superior de `.footer-bottom` (solape 0px, tolerancia ±1px).
- [x] 3.2 Comprobar con `getComputedStyle` que la `opacity` de ambos es 1 en el estado frenado y que el valor aplicado de `--freno-flotantes` coincide con el freno medido.
- [x] 3.3 En esos mismos anchos, comprobar con `elementFromPoint` sobre el centro de cada línea del copyright que el elemento devuelto pertenece a la barra (o a su `span`), nunca a un flotante, y que el texto de las dos líneas está completo.
- [x] 3.4 Subir desde el final en pasos: el freno baja de forma monótona hasta 0 al salir la barra de la zona y los botones vuelven a `bottom: 26px`; justo en el umbral el desplazamiento es 0 y no alterna entre scrolls mínimos.
- [x] 3.5 Con teclado: con los flotantes frenados, Tab llega a ambos y Enter activa el enlace; el clic sobre el WhatsApp abre el chat y el del botón de subir lleva al inicio.
- [x] 3.6 Con `prefers-reduced-motion: reduce` emulado: el freno se aplica igual y `transition-duration` efectiva de `translate` es 0.
- [x] 3.7 Con el menú móvil abierto estando al final de la página: los flotantes siguen frenados y el velo del menú los deja sin clic mientras está abierto, como hoy.
- [x] 3.8 Comprobar que la barra de copyright no cambia (mismo alto, mismo fondo, mismas dos líneas) y que el alto total del documento no varía al aplicar el freno.
- [x] 3.9 Revisar la captura a 390px: el WhatsApp frenado queda junto al primer icono de redes; confirmar que el solape es solo de la caja de 40px y que ningún trazo del SVG queda cubierto.
- [x] 3.10 Repetir 3.1 y 3.3 en `nosotros/index.html`, `cursos/index.html`, una ficha generada (`cursos/diplomado-gestion-calidad-e-inocuidad/index.html`) y `404.html`, que cubren las variantes de pie y de contenido.
- [x] 3.11 Confirmar que `git status` solo muestra `assets/css/main.css`, `assets/js/main.js`, `CHANGELOG.md` y los artefactos del change: ni HTML ni los generadores se tocan.

## Workflow follow-up

- [ ] 4.1 Archivar el change tras la revisión y verificar el resultado archivado.
