# Design

## Context

Ver punto de partida en `proposal.md` (Why). Estado actual verificado en el repo:

- `assets/css/main.css`: `.identidad img` aplica `border-radius: var(--radio)` (14 px) y sombra; `.identidad-grid` es 1fr 1fr en escritorio y 1 columna en móvil.
- La sección `#sistemas-gestion` en `servicios/index.html` es la única sin clase `identidad`: su imagen no recibe borde ni sombra.
- Resoluciones reales: `consultoria-planta.jpg` 326×326 (30 KB), `inspeccion-calidad.jpg` 567×376 (53 KB), `registro-sanitario-alimentos.webp` 640×480, `capacitacion-laredo-aula.jpg` 1600×1066. Las dos primeras se estiran al ancho de columna (~500 px o más) y pierden calidad.
- El cierre hacia la guía es un `<section>` con un solo `<p>` sin componente visual.

Restricciones: solo cambios visuales; no tocar otras secciones ni colores de marca; fotos nuevas solo con licencia libre comercial, autoalojadas y fuente en CHANGELOG (requieren autorización); respaldo previo en `/tmp/opencode/respaldo-*/`; trabajo en local, sin publicar en `proinocuidad.com`.

## Goals / Non-Goals

**Goals:**

- Las 4 imágenes de servicio comparten marco (radio, sombra) y aspecto en escritorio.
- Ninguna foto se renderiza por encima de su resolución real.
- El cierre a la guía es un componente diseñado con componentes existentes.

**Non-Goals:**

- Nuevos servicios, precios, plazos o textos fuera del PDF y las páginas existentes.
- Cambios de metadatos, sitemap, JSON-LD o SEO.
- Conseguir fotos nuevas sin autorización expresa (queda como vía opcional).
- Tocar otras secciones, la marca o el responsive global.

## Decisions

- **Marco uniforme reutilizando `identidad` en vez de una clase nueva.** La sección de sistemas adopta la clase existente; el aspecto común se logra con una regla de `aspect-ratio` + `object-fit: cover` solo para esas imágenes. Alternativa descartada: crear `.servicio-marco` nuevo, que duplica un sistema que ya existe.
- **Tope de ancho por CSS en vez de sustituir fotos.** Las fotos pequeñas se limitan a su ancho real y se centran en su columna. Alternativa (fotos de mayor resolución con licencia libre) queda como seguimiento opcional porque exige autorización y fuentes en CHANGELOG; el tope resuelve lo visible sin ella.
- **Sustitución autorizada de las 2 fotos pequeñas (resuelve Open Questions: sí).** Juan autorizó fotos nuevas con licencia libre comercial. Se usan 2 fotos de Pexels (licencia verificada: uso comercial permitido, sin atribución obligatoria), autoalojadas en `assets/img/`, con URLs fuente en CHANGELOG. Criterio: temática genérica de planta de alimentos (higiene/manipulación para normativa, operación de equipos para sistemas), resolución ≥ 1200 px de ancho y composición verificada visualmente para el recorte 4:3. Las fotos anteriores se retiran (quedan en el respaldo y en el historial git).
- **Cierre como tarjeta centrada con componentes existentes** (estilos de `.card` y `.btn`), con título, texto y botón a la guía. Alternativa descartada: banda a ancho completo, que compite con el `page-head` y los bloques `identidad`.
- **`object-position` por imagen si el recorte corta contenido relevante** (p. ej. verificar rostros en capacitación). Se fija solo donde se observe el problema, no por defecto.

## Risks / Trade-offs

- [Riesgo] La columna de imagen con tope de ancho queda más angosta que la de texto y desbalancea la fila → Mitigación: centrar la imagen en su columna y revisar visualmente en escritorio y móvil.
- [Riesgo] El recorte con `aspect-ratio` corta partes relevantes de alguna foto → Mitigación: ajustar `object-position` por imagen tras revisión visual.
- [Riesgo] El tope por resolución fija (`max-width` en px) se vuelve obsoleto si luego se sustituyen las fotos → Mitigación: documentar en el CHANGELOG que el tope depende de la foto actual; retirarlo si se reemplazan.

## Migration Plan

Sitio estático sin build: editar `servicios/index.html` y `assets/css/main.css` en local, con respaldo previo en `/tmp/opencode/respaldo-*/`. Sin despliegue (publicación en `proinocuidad.com` fuera de alcance). Rollback: restaurar el respaldo. Revisión visual antes de archivar.

## Open Questions

- ~~¿Autoriza Juan conseguir fotos de mayor resolución (licencia libre comercial, autoalojadas) para normativa y sistemas? Por defecto no: se aplica el tope por CSS. Si se autoriza, es un seguimiento con sus URLs fuente en CHANGELOG.~~ **Resuelta: sí, autorizado por Juan (2026-10-13).** Se sustituyen las fotos; el tope por CSS ya no aplica.
