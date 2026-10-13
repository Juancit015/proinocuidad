# Proposal

## Why

En móvil la barra superior ocupa espacio vertical con datos que ya están en el footer, y los banners de título de subpágina (Cursos, Servicios, Nosotros, Noticias) se ven estáticos y planos frente al resto del sitio. Ocultar la barra en móvil limpia la cabecera y el fondo fijo en banners les da profundidad sin tocar contenidos ni la marca.

## What Changes

- La barra superior (`.topbar`: línea "Contacto: +51 981 365 982 · administracion@proinocuidad.com" e iconos de redes) SHALL ocultarse por completo cuando el ancho sea ≤860px. Por encima de 860px se mantiene tal cual (iconos ya ocultos en móvil por regla existente).
- Los datos de contacto siguen disponibles en el footer en móvil (sin cambios en el footer).
- Los banners de subpágina (`.page-head--servicios`, `--nosotros`, `--noticias`, `--cursos`, usados en 9 páginas) SHALL mostrar su imagen de fondo con efecto fijo (el fondo no se desplaza con el contenido) en escritorio.
- El efecto se desactiva con `background-attachment: scroll` cuando el ancho sea ≤860px y cuando aplique `prefers-reduced-motion`.
- Quedan fuera: el Hero de Inicio, las fichas de curso, imágenes de contenido y cualquier otra imagen que no sea banner de título de subpágina.

## Capabilities

### New Capabilities

- `banners-paginas`: presentación de los banners de título de subpágina (imagen de fondo + efecto fijo en escritorio, alternativa estática en móvil y con movimiento reducido).

### Modified Capabilities

- `diseno-responsive`: ADDED requisito de visibilidad de la barra superior por ancho de pantalla (oculta ≤860px). El Purpose del spec se ampliará en el sync ("...y la visibilidad de la barra superior por ancho de pantalla"). Ningún requisito existente cambia.

## Impact

- `assets/css/main.css`: regla de ocultado de `.topbar` en el media query ≤860px existente; `background-attachment: fixed` en las 4 variantes de banner + excepciones móvil y `prefers-reduced-motion`.
- Sin cambios de HTML (la barra se oculta por CSS, no se elimina del DOM), textos, enlaces, metadatos, sitemap ni producción (trabajo en local).
