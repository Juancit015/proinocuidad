# Tasks

## 1. Marca HTML de la cita en el Home

- [x] 1.1 En `index.html`, dentro de la sección `identidad` (Nosotros), reemplazar el párrafo `<p><em>"Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente."</em></p>` por un bloque de cita `<blockquote class="cita-nosotros">` con las comillas tipográficas del texto y el mismo texto sin cambios (sin rótulo "Cita", retirado por redundante); verificar que el texto de la cita no se altera y que el bloque queda dentro del contenedor de la sección.
- [x] 1.2 Confirmar que ningún otro archivo HTML repite esta cita como párrafo con `<em>` (grep por "Compromiso con la salud pública, rigor técnico") y que `nosotros/index.html` no se toca. Verificado: la única otra ocurrencia es `nosotros/index.html:87` como texto plano (sin `<em>` ni comillas), no se tocó.

## 2. Estilo CSS de la cita

- [x] 2.1 En `assets/css/main.css`, añadir la regla `.cita-nosotros` (dentro de la sección de estilos de la home, fuera de media queries o junto a las reglas de `.identidad`) con: margen superior mayor que el de un párrafo normal (≈ 1.25rem), borde lateral izquierdo en color de acento (`--rojo`), padding izquierdo y tipografía en itálica; verificar con `getComputedStyle` que el margen superior computado sea mayor que el de un `<p>` normal de la misma sección.
- [x] 2.2 Añadir la regla `.cita-etiqueta` (rótulo "Cita" en mayúsculas espaciadas, tamaño pequeño, color gris) y verificar que se pinta encima del texto de la cita. No aplica: el rótulo "Cita" se retiró (redundante con las comillas). La regla `.cita-etiqueta` no se añadió; no queda CSS muerto.
- [x] 2.3 Añadir la regla de movimiento reducido en `@media (prefers-reduced-motion: reduce)` si la cita incorpora alguna transición (si no la tiene, documentar que no aplica y no añadir regla vacía). No aplica: la cita no tiene transición, por lo que no se añade regla vacía.

## 3. Verificación visual

- [x] 3.1 Levantar el servidor estático (`python3 -m http.server 8899`) y abrir `index.html` a 390px y 1024px con Playwright; capturar la sección Nosotros y comprobar que la cita se ve como bloque separado, con margen superior mayor al del párrafo anterior (sin rótulo "Cita", retirado). Verificado: Playwright a 390 y 1024px — blockquote presente, margen superior 20px > 0px del párrafo normal, borde lateral 3px --rojo, italic, texto exacto, sin desborde. El rótulo "Cita" ya no se renderiza.
- [x] 3.2 Verificar que el texto de la cita es exactamente "Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente." (sin cambios) y que el resto de la sección (párrafos, botón "Conócenos") no se altera. Verificado: textContent contiene la cita exacta; diff del HTML solo toca el bloque de la cita.
- [x] 3.3 Confirmar que `git status` solo muestra cambios en `index.html` y `assets/css/main.css` (y los artefactos del change); ningún cambio en páginas generadas ni en el generador. Verificado tras el ajuste.

## Workflow follow-up

- Archivar el change tras la revisión y verificar el resultado archivado.