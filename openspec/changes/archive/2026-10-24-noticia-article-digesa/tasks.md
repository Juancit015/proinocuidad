# Tasks

## 1. Contenido de la nota

- [x] 1.1 Extraer el contenido completo de la tarjeta de `/noticias/` (título, resumen, impacto, obligaciones, fecha de corte del 11 de junio de 2026, recomendaciones y fuente) y redactar la meta description de 120-160 car.; verificar con el script de metadatos
- [x] 1.2 Preguntar a Juan si existe fecha de publicación confirmada para `datePublished`; registrar la respuesta (con fecha y confirmación, o sin fecha en el JSON-LD)

## 2. Página de detalle

- [x] 2.1 Crear `noticias/vigencia-indeterminada-haccp/index.html` con el contenido trasladado tal cual (sin reescribirlo), title "Vigencia indeterminada del plan HACCP | Proinocuidad" (≤60), canonical y `og:url` propios, un único `<h1>` y mías de pan de 3 niveles; verificar con el script de metadatos
- [x] 2.2 Añadir el JSON-LD `Article` (headline, author, image autoalojada, publisher; `datePublished` solo si 1.2 la confirma) y verificar que se parsea como JSON válido
- [x] 2.3 Convertir la tarjeta de `/noticias/` en resumen breve + foto + enlace "Leer la nota" hacia la URL de detalle, conservando la foto con su licencia registrada; verificar que el enlace resuelve

## 3. Integración en el sitio

- [x] 3.1 Verificar el inventario real de URLs (`sitemap.xml`, `llms.txt`) antes de editar: si es 18, el conteo va a 19; si `servicio-iso-22000` ya lo dejó en 19, ir a 20 y actualizar la enumeración del requisito "Mapa del sitio" en la spec principal al archivar
- [x] 3.2 Añadir la página a `sitemap.xml` (URL absoluta con `/` final) y a `llms.txt` en la sección Información con descripción de una línea; verificar que el conjunto de URLs de `llms.txt` coincide con el de `sitemap.xml` y que ninguna apunta a una página inexistente

## 4. Verificación y registro

- [x] 4.1 Medir con Playwright la página de detalle a 1280px y 390px y verificar 0 px de desborde horizontal y 1 sóla `<h1>`
- [x] 4.2 Verificar con `git status` que solo cambian los archivos de este change y registrar la entrada en `CHANGELOG.md` (hallazgo H5, fuente Ministerio de Salud y estado de la fecha), sin commit ni push
