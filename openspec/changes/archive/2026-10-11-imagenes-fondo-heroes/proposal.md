# Proposal

## Why

Los 4 heroes de sección (Servicios, Nosotros, Noticias, Cursos) usan degradado azul plano mientras Crecepe usa foto con overlay. Añadir foto de fondo temática acerca el diseño al de referencia y da identidad visual. Las fichas siguen con degradado (decisión del usuario).

## What Changes (ampliado por el usuario)

- Reemplazos: Servicios → obreros en láctea (grupo), Nosotros → obreros clasificando (grupo en labor), Noticias → mujeres clasificando tomates (actividad del sector). Cursos conserva su seminario.
- Extensión a las 8 fichas: cada `ficha-head` lleva su foto temática + overlay (diplomado: planta láctea; legislación: firma de contrato; BPM/POES: operario con guantes; HACCP DIGESA: laboratorio cárnico; BPM Codex: control calidad láctea; higiene: vestimenta higiénica; FSSC: embotelladora; auditor: inspección con portapapeles).
- En `tools/generar-fichas.mjs`, nuevo campo `fondo` por curso con la foto inline (patrón overlay de Crecepe); regeneración de las 8 fichas.

- 4 fotos de stock libre (Unsplash/Pexels, temática industria alimentaria) descargadas y alojadas en `assets/img/` en AVIF (nombres: `hero-servicios.avif`, `hero-nosotros.avif`, `hero-noticias.avif`, `hero-cursos.avif`).
- Cada `.page-head` recibe su foto con overlay oscuro degradado (patrón Crecepe), texto blanco intacto; migas, h1 y párrafos sin cambios.
- Criterios de selección: apaisada ≥1600 px, tono profesional alimentario, zona oscura o apta para overlay con texto blanco.
- Las URLs fuente se registran en el CHANGELOG como atribución.
- Sin cambios de textos, estructura, JS ni SEO (las fotos llevan `alt` n/a por ser decorativas de fondo CSS).

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual.

### Modified Capabilities

Ninguna. Ningún spec cubre fondos de hero; todo lo existente sigue intacto.

## Impact

- `assets/img/` (4 archivos nuevos) + `assets/css/main.css` (fondos) + retoque mínimo en las 4 páginas si el fondo va inline.
- Descarga externa autorizada por el usuario solo para esta tarea (licencia libre Unsplash/Pexels).
- Sin JS, sin cambios SEO.
