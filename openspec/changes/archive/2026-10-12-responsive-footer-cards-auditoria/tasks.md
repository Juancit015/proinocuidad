# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-responsive-footer-cards/`; verificar con `ls -la /tmp/opencode/respaldo-responsive-footer-cards/`.

## 2. Auditoría inicial (antes de cambios)

- [x] 2.1 Servir el sitio con `python3 -m http.server 8770 --bind 127.0.0.1` desde la raíz del proyecto; verificar con `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8770/index.html`.
- [x] 2.2 Medir las 13 páginas en los anchos 360, 390, 768, 860, 1024 y 1280px: desbordamiento horizontal, texto o botones cortados, footer alineado a la izquierda, tarjetas de Cursos y Servicios en dos columnas en 561–860px. Registrar cada hallazgo con página, ancho, selector y estado "pendiente".

## 3. Footer

- [x] 3.1 En `assets/css/main.css`, dentro de `@media (max-width: 560px)`, centrar `.footer-grid` (texto y bloques), `.footer-brand`, `.footer-contacto`, `.footer-links` y `.redes-sociales` (`justify-content: center`). Verificar con `grep -n "max-width: 560px" assets/css/main.css` y llaves balanceadas con `python3 -c "s=open('assets/css/main.css',encoding='utf-8').read();print(s.count('{')==s.count('}'))"`.
- [x] 3.2 Ajustar el hover de `.footer-links a` en móvil para que el desplazamiento de 14px no descentre el texto; verificar en 390px.

## 4. Tarjetas de Cursos y Servicios

- [x] 4.1 En `assets/css/main.css`, dentro de `@media (max-width: 860px)`, cambiar `.cards-grid` a una columna. No tocar `.cards-grid.four`. Verificar con `grep -n "cards-grid" assets/css/main.css`.
- [x] 4.2 Medir en 768px y 390px que las tarjetas de `cursos/index.html` y `servicios/index.html` ocupan el ancho completo y que sus botones no se cortan.

- [x] 4.3 Añadir `.cards-grid.four { grid-template-columns: 1fr; }` en `@media (max-width: 860px)` de `assets/css/main.css`, para "Cursos destacados" y "Nuestros servicios" de Inicio. Verificar con `grep -n "cards-grid.four" assets/css/main.css` y medir en 390 y 768px que las tarjetas de `index.html` quedan en una columna.

## 5. Auditoría final

- [x] 5.1 Repetir la medición de la tarea 2.2 en las 13 páginas y los 6 anchos.
- [x] 5.2 Entregar el informe completo: cada hallazgo con página, ancho, selector, descripción y estado (corregido, pendiente o sin cambios). Los hallazgos fuera del footer y de las tarjetas quedan como pendientes.
- [x] 5.3 Confirmar que ningún archivo `.html` cambió: comparar `assets/css/main.css` contra el respaldo y verificar con `find . -name "*.html" -newer /tmp/opencode/respaldo-responsive-footer-cards/main.css -not -path "./openspec/*"` que la lista está vacía.

## 6. Documentación

- [x] 6.1 Añadir entrada en `CHANGELOG.md` con el footer centrado en móvil, una columna de tarjetas hasta 860px y la auditoría responsive; verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 7. Revisión

- [x] 7.1 Revisión visual del usuario en móvil y tableta antes de archivar.

## Notas de implementación

- 2.2 / 5.1: medición en 13 páginas × 6 anchos con navegador local. El navegador de la herramienta conserva la hoja de estilos en caché; las mediciones inyectan el CSS actual de `main.css` en cada iframe (equivale a carga sin caché).
- 3.2: en ≤560px se desactiva el desplazamiento de hover y la línea roja (`::before`) de los enlaces del footer. El hover no se puede simular con la herramienta; verificado en CSS, no en interacción.
- 4.2: en 390px y 768px, las tarjetas de Cursos y Servicios ocupan el ancho completo (350px y 697px) y no hay botones cortados.
- 5.2 pendientes fuera de alcance (no corregidos): imagen de "Quiénes somos" (`.identidad-grid`) desborda 9 a 18px en 360 y 390px en Inicio, Nosotros y Servicios; 2px en 768px en Inicio y Servicios; (resuelto después por petición del usuario: tarea 4.3, `.cards-grid.four` en una columna hasta 860px; medido en 360, 390, 768, 860 y 861px).
- 7.1: revisión visual confirmada por el usuario ("todo bien") antes de archivar.
