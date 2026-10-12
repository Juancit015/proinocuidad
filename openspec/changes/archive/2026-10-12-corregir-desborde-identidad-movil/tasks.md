# Tasks

## 1. Respaldo y medición inicial

- [x] 1.1 Copiar `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-corregir-desborde-identidad/`; verificar con `ls -la /tmp/opencode/respaldo-corregir-desborde-identidad/`.
- [x] 1.2 Servir el sitio con `python3 -m http.server 8770 --bind 127.0.0.1` y medir el desborde (`scrollWidth - clientWidth`) en `index.html`, `nosotros/index.html`, `servicios/index.html` y una ficha de curso, en 360, 390, 768 y 860px. Registrar la línea base.

## 2. Estilos

- [x] 2.1 En `assets/css/main.css`, en el bloque `@media (max-width: 860px)`, cambiar `.identidad-grid` a `minmax(0, 1fr)` y añadir `.identidad-grid > * { min-width: 0; }`. Verificar con `grep -n "identidad-grid" assets/css/main.css`.
- [x] 2.2 Añadir `max-width: 100%` y `height: auto` a `.identidad img` (línea ~350). Verificar con `grep -n "^.identidad img" assets/css/main.css`.
- [x] 2.3 No aplica: ninguna ficha de curso usa `.identidad-grid` (0 de 8), así que no se agrega regla para ellas. Ver nota de implementación.
- [x] 2.4 Verificar que las llaves de `main.css` están balanceadas con `python3 -c "s=open('assets/css/main.css',encoding='utf-8').read();print(s.count('{')==s.count('}'))"`.

## 3. Verificación

- [x] 3.1 Repetir la medición de 1.2: desborde 0 en 360, 390 y 768px para Inicio, Nosotros y Servicios.
- [x] 3.2 Medir en 1024 y 1280px que la disposición de dos columnas no cambió (número de columnas de `.identidad-grid` = 2).
- [x] 3.3 Medir en 360px que el texto del bloque tiene ancho mayor a 0 y que la imagen tiene proporción igual a la del archivo (`naturalWidth/naturalHeight` frente a `width/height` renderizados).
- [x] 3.4 Confirmar que ningún archivo `.html` cambió: `find . -name "*.html" -newer /tmp/opencode/respaldo-corregir-desborde-identidad/main.css -not -path "./openspec/*" -not -path "./ai-chat*"` debe estar vacío.

## 4. Documentación

- [x] 4.1 Añadir entrada en `CHANGELOG.md` con la corrección del desborde en "Quiénes somos" y bloques equivalentes en móvil y tableta. Verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 5. Revisión

- [x] 5.1 Revisión visual del usuario en móvil (360 y 390px) y tableta (768px) de Inicio, Nosotros, Servicios y una ficha de curso.

## Notas de implementación

- 1.2: línea base medida y coincide con la medición previa (Inicio y Servicios 18px en 360 y 17px en 390; Nosotros 18 y 9px; 768px 2px).
- 2.1 y 2.2: aplicados. `.identidad-grid` usa `minmax(0, 1fr)` en ≤860px con `min-width: 0` en los hijos; `.identidad-grid img` tiene `max-width: 100%` y `height: auto`. Las columnas siguen en 2 a partir de 861px. Las proporciones de imagen coinciden con las del archivo.
- Corrección de diseño: `.identidad` no aplica a Nosotros ("Quiénes somos" no tiene esa clase); por eso el ajuste va en `.identidad-grid img`.
- 2.3 pendiente: el diseño suponía que las fichas usan `.identidad-grid`; no es cierto (0 de 8). No se agregó regla.
- 3.1 pendiente: con `en-vista` (estado final) el desborde es 0 en 360 y 390px. El residual de 18px viene de `html.js-anim .identidad-grid:not(.en-vista) > img { transform: translateX(32px) }`: la imagen se desplaza antes de entrar en pantalla y el navegador cuenta ese ancho como desplazable. Corregirlo requiere tocar la animación de `animacion-entrada`, fuera de este alcance.

## Decisión de implementación

- Opción A aprobada por el usuario: recorte horizontal de las secciones con `.identidad-grid` (`section:has(> .identidad-grid) { overflow-x: clip; }`). Medido: desborde 0 en 360, 390, 768, 860, 861, 1024 y 1280px en Inicio, Nosotros y Servicios. La animación de entrada no cambia.
- La regla inicial sobre `.identidad` no alcanzaba a Nosotros ni a una sección de Servicios sin esa clase; por eso se usa `:has`.
- 3.2: dos columnas en 861px y más (escritorio sin cambio). 3.3: proporciones de imagen iguales a las del archivo en todos los anchos. 3.4: ningún `.html` cambió.
- 2.3 no aplica: 0 fichas usan la clase.
- Pendiente: 5.1, revisión visual del usuario.
