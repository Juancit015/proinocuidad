# Design

## Contexto

La auditoría `auditoria-seo-sitio-local` dejó H7 como change aparte: crear la página de ISO 22000 requiere URL nueva y tocar el inventario de páginas (sitemap, llms.txt, conteos de specs), fuera del alcance de solo texto de la auditoría.

## Decisiones

- **Slug y ruta**: `servicios/implementacion-iso-22000/`. Sigue el patrón de nombres de las páginas de detalle existentes.
- **Title (48 car.)**: "Implementación ISO 22000 en Perú | Proinocuidad". La auditoría medirá de nuevo con el script de metadatos: \u226460 car.
- **H1**: patrón FSSC — "Implementación de <span>ISO 22000</span> y sistemas de gestión", un solo `<h1>` con la keyword.
- **Fuente del contenido**: docx ya publicado en `servicios/index.html` (grupo "sistemas de gestión" incluye ISO 9001, ISO 22000, FSSC 22000 y BRCGS Food) + afirmaciones ya visibles del sitio. Regla heredada de `servicios-detalle`: nada de precios, plazos, requisitos de trámite ni pasos no confirmados.
- **Estructura**: copia la plantilla vigente en dos páginas de detalle (hero con mías, sección `.identidad` con contenido complementario sin plegable, FAQ con `FAQPage`, CTA `.cta-sub`, no usar `overflow-x: hidden` global).
- **CTA `.cta-sub` con H2 único**: "¿Implantamos la norma **ISO 22000** en tu empresa?" — no repetir FSSC ("¿Quieres implementar FSSC 22000...?") ni BRCGS.
- **FAQ**: 4 preguntas fundadas en el texto de la página (qué es ISO 22000, diferencia con FSSC/BRCGS, qué incluye el servicio, quién otorga la certificación — organismo independiente, como ya declaran FSSC/BRCGS). Ninguna respuesta incluye datos que la página no diga; preguntas visibles iguales a la `FAQPage` por script.
- **Enlace del contenido**: hacia el Diplomado de Gestión de la Calidad e Inocuidad (módulos de ISO 9001 e ISO 22000, ya visibles en su ficha). No hay curso suelto de ISO 22000; no se inventa.
- **Mega-panel sin cambios**: el panel de Servicios muestra grupos-ancla de la página de servicios (4 ítems), no las páginas de detalle [Spec navegacion-global: "Los 4 ítems de cada panel SHALL tener el mismo tamaño"]; la página nueva se alcanza desde `servicios/index.html` y `sitemap.xml`.
- **Conteo 19 con orden de aplicación**: esta página es la #19. Si `noticia-article-digesa` se aplicó antes y ya dejó 19, al aplicar este change los conteos casi los mismos deben quedar en 20 y la enumeración del requiere listarse agregar su URL. Tarea específica en tasks.md para verificar el conteo real antes de editar esos tres archivos.
- **llms-full.txt**: la sección de servicios debe describir el servicio de sistemas de gestión con la norma ISO 22000; se revisa y ajusta en la aplicación, sin duplicar texto de pantalla.

## Verificación

- Script de metadatos (los de la auditoría): title \u226460, meta 120-160, 1 `<h1>`, FAQ visible = `FAQPage` idéntica, 0 enlaces rotos hacia archivos inexistentes.
- Playwright a 1280px y 390px: 0 px de desborde horizontal.
- `sitemap.xml`: 19 entradas (o 20 si la noticia ya se creó), con URLs absolutas que resuelven.
