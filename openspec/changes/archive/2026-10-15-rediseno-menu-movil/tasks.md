# Tasks

## 1. Estructura y controles accesibles

- [x] 1.1 Localizar todas las páginas y posibles generadores que contienen la navegación global; verificar el inventario con una búsqueda de `.nav-toggle` y de `nav-menu`.
- [x] 1.2 Añadir en cada plantilla un botón de cierre y controles «+» independientes para Servicios y Cursos con `aria-controls` y `aria-expanded`; verificar que los enlaces y destinos internos se conservan.

## 2. Presentación y comportamiento móvil

- [ ] 2.1 Rediseñar en `assets/css/main.css` el panel hasta 860px con tarjeta de entrada/salida animada y compacta, submenús de una columna con tarjetas legibles y padding cerrado mínimo, y botón hamburguesa animado; respetar movimiento reducido y verificar visualmente a 390px y 860px.
- [ ] 2.2 Actualizar `assets/js/main.js` para abrir, cerrar y alternar las filas desplegables; sincronizar estados accesibles, cerrar con Escape y al navegar, y limpiar estado al cruzar el breakpoint; verificar cada transición con teclado y toque.

## 3. Verificación integrada

- [ ] 3.1 Revisar todas las páginas que comparten navegación a 390px, 860px y 1024px; confirmar que el panel no se recorta, que los enlaces navegan al destino correcto y que Escritorio conserva el mega menú.
- [x] 3.2 Validar el cambio OpenSpec y confirmar que no se modificaron textos ni destinos de navegación.
