# Tasks

## 1. Base de contenido

- [x] 1.1 Releer la sección "sistemas de gestión" del docx publicado en `servicios/index.html` y las referencias a ISO 9001/ISO 22000 visibles en el sitio; verificar que hay lista de afirmaciones reutilizables sin precios ni plazos
- [x] 1.2 Releer la plantilla vigente tomando `servicios/implementacion-fssc-22000/index.html` como referencia (hero, `.identidad`, FAQ, `.cta-sub`) y verificar que el inventario actual de URLs es 18 o 19 (`llms.txt` y `sitemap.xml`) para fijar el conteo meta

## 2. Página nueva

- [x] 2.1 Crear `servicios/implementacion-iso-22000/index.html` con title "Implementación ISO 22000 en Perú | Proinocuidad" (≤60 car.), meta de 120-160 car., canonical y `og:url` propios, y un único `<h1>` con la keyword; verificar con el script de metadatos
- [x] 2.2 Redactar el contenido complementario con la base del docx (alcance común: documentación, seguimiento, capacitaciones, auditorías, acompañamiento; enlace al Diplomado) sin plegables y verificar que no hay precios, plazos ni "en el menor tiempo posible"
- [x] 2.3 Añadir FAQ visible de 4 preguntas y su `FAQPage` JSON-LD con texto idéntico; verificar con el script de igualdad de la auditoría
- [x] 2.4 Cerrar con `.cta-sub` con H2 único ("¿Implantamos la norma ISO 22000 en tu empresa?"), badge, texto y los 2 botones existentes; verificar que no repite H2 de las otras 4 páginas

## 3. Integración en el sitio

- [x] 3.1 Añadir en `servicios/index.html` el enlace a la página de detalle de ISO 22000 y verificar que la URL resuelve (0 enlaces rotos)
- [x] 3.2 Revisar y actualizar `llms-full.txt` para que la sección de servicios cubra el servicio de sistemas de gestión con ISO 22000, sin duplicar el texto de pantalla
- [x] 3.3 Actualizar conteos tras el paso 1.2: `sitemap.xml` a 19 (o 20 si la noticia ya se creó), `llms.txt` con la página en la sección Servicios, y la enumeración del requires "Mapa del sitio" en la spec principal `seo-base` cuando el change se archive; verificar que las 19 URLs de `llms.txt` coinciden como conjunto con `sitemap.xml`

## 4. Verificación y registro

- [x] 4.1 Medir con Playwright la página nueva a 1280px y 390px y verificar 0 px de desborde horizontal
- [x] 4.2 Verificar con `git status` que solo cambian los archivos de este change y registrar la entrada en `CHANGELOG.md` con la keyword "iso 22000" y la verificación hecha, sin commit ni push
