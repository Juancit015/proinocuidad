# Proposal

## Why

El cliente pidió que la descripción de los servicios sea más detallada, tomando como base el documento "servicios descripcion.docx" (Descargas). Hoy la página Servicios muestra 4 servicios con un párrafo breve cada uno. El docx describe 5 servicios con áreas, alcance, público objetivo y entregables. Mostrar el detalle en un "Ver más" mantiene la página corta y responde al pedido del cliente.

## What Changes

- Cada servicio de la página Servicios muestra un resumen visible y un botón "Ver más" (mismo componente que en Nosotros: botón con recuadro, ojo y apertura animada) que despliega el detalle del docx: áreas o componentes, alcance, "Dirigido a" y entregable cuando existe.
- Se agrega el servicio **"Inspecciones higiénico-sanitarias"**, que está en el docx y no en el sitio, con su propio bloque, imagen y "Ver más". Su texto incluye la aclaración de que es asesoría privada y no sustituye las inspecciones de la autoridad.
- El número de servicios pasa de 4 a 5. Quedan numerados en el orden del docx: 1 Capacitación, 2 Normativa, 3 Inspecciones, 4 Sistemas de gestión, 5 Registro sanitario.
- Los textos del resumen de cada servicio se toman del docx, sin promesas de tiempo ni de resultado. En registro sanitario se retira "en el menor tiempo posible" y se usa el texto del docx, que aclara que la aprobación depende de la autoridad.
- El PDF del documento base sigue siendo la fuente de la spec. El docx es un texto aparte que amplía el detalle; el PDF no se reemplaza.
- Sin cambios en las páginas de detalle (`servicios-detalle`), en los banners, ni en otras secciones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `pagina-servicios`: el listado pasa de 4 a 5 servicios, con resumen y "Ver más" en cada uno, y se agrega el servicio de inspecciones.

## Impact

- Archivos: `servicios/index.html`, `assets/css/main.css` (solo si hace falta ajustar el bloque ampliable), `assets/img/` (foto del nuevo servicio), `CHANGELOG.md`.
- Imagen nueva: requiere licencia libre comercial verificada, URL fuente en CHANGELOG, y autorización de Juan antes de descargar.
- SEO: el detalle queda en el HTML dentro del `<details>`, así que sigue indexable. Un solo `<h1>` y canonical sin cambios.
- Supuesto: el docx es fuente válida para este texto aparte; si el cliente pide que pase a ser fuente oficial, se abre un change aparte.
