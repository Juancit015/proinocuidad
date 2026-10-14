# Tasks

## 1. Respaldo y componente

- [x] 1.1 Respaldar `servicios/index.html`, `assets/css/main.css` y `assets/js/main.js` en `/tmp/opencode/respaldo-servicios-detallada/` y verificar con `cmp`
- [x] 1.2 Generalizar el componente de "Ver más" para que sirva en Servicios sin cambiar el comportamiento de Nosotros (clase genérica en CSS y selector en `main.js`), y verificar que Nosotros sigue igual

## 2. Contenido de servicios

- [x] 2.1 Reescribir el resumen de los 4 servicios existentes (Capacitación, Normativa, Sistemas de gestión, Registro) con el primer párrafo del docx, manteniendo los `id` existentes
- [x] 2.2 Añadir en cada uno de los 4 bloques un `<details class="ampliar">` con el detalle del docx (áreas, alcance, "Dirigido a" y entregable cuando exista)
- [x] 2.3 Reemplazar en registro sanitario el resumen actual por el del docx, sin "en el menor tiempo posible", e incluir la aclaración de que la aprobación depende de la autoridad
- [x] 2.4 Renumerar los encabezados a 1 a 5 en el orden del docx

## 3. Servicio de inspecciones

- [x] 3.1 Pedir a Juan autorización de fuente y licencia para la imagen del servicio, antes de descargarla
- [x] 3.2 Añadir el bloque "Inspecciones higiénico-sanitarias" con su resumen, su detalle y la aclaración de asesoría privada
- [x] 3.3 Registrar la URL fuente y la licencia de la imagen en CHANGELOG

## 4. Estilos y verificación

- [x] 4.1 Ajustar CSS solo si hace falta para las listas del detalle; verificar llaves balanceadas
- [x] 4.2 Verificar que hay un solo `<h1>`, canonical sin cambios, anclas existentes funcionan y el detalle está en el HTML
- [ ] 4.3 Verificar en escritorio y 390px que los "Ver más" se despliegan, se pliegan y no desbordan
- [x] 4.4 Registrar la entrada en `CHANGELOG.md`, sin commit ni push
