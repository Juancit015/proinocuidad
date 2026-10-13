# Tasks

## 1. Respaldo y base

- [x] 1.1 Respaldar `servicios/index.html` y `assets/css/main.css` en `/tmp/opencode/respaldo-*/` y verificar con `cmp` que las copias son idénticas
- [x] 1.2 Registrar el estado actual (sección de sistemas sin clase `identidad`, cierre como párrafo suelto) y verificar que el sitio abre sin errores antes de tocar nada

## 2. Marco uniforme de imágenes

- [x] 2.1 Añadir la clase `identidad` a la sección `#sistemas-gestion` en `servicios/index.html` y verificar que su imagen recibe el mismo radio de borde y sombra que las demás
- [x] 2.2 Añadir la regla de aspecto común (`aspect-ratio` + `object-fit: cover`) para las 4 imágenes de servicio en `assets/css/main.css` y verificar visualmente que las 4 muestran la misma relación de aspecto en escritorio
- [x] 2.3 Ajustar `object-position` solo en las imágenes donde el recorte corte contenido relevante y verificar visualmente cada una

## 3. Sustitución de fotos pequeñas (autorizada)

- [x] 3.1 Descargar 2 fotos de Pexels con licencia libre comercial (higiene/manipulación en planta para normativa, operación de equipos para sistemas), autoalojarlas en `assets/img/` con resolución ≥ 1200 px de ancho y verificar licencia, dimensiones y composición para el recorte 4:3
- [x] 3.2 Cambiar las referencias en `servicios/index.html` a las fotos nuevas (las anteriores se conservan porque `index.html` las sigue usando en sus tarjetas) y verificar que las nuevas cargan en su lugar

## 4. Bloque de cierre hacia la guía

- [x] 4.1 Reemplazar el párrafo suelto por una tarjeta centrada (título, texto y botón a `../inocuidad-alimentaria/index.html`) con componentes existentes y verificar que el enlace existe y navega a la guía
- [x] 4.2 Verificar que el bloque usa solo colores y componentes existentes, sin estilos nuevos de marca

## 5. Verificación integrada y registro

- [x] 5.1 Verificar página completa: las 4 imágenes con marco uniforme, sin pixelado evidente, cierre diseñado visible, un solo `<h1>`, sin enlaces rotos y responsive en móvil
- [x] 5.2 Verificar con `git status`/`git diff` que solo cambiaron `servicios/index.html` y `assets/css/main.css` (sin tocar metadatos, sitemap, otras secciones ni producción)
- [x] 5.3 Registrar el cambio en `CHANGELOG.md` (incluidas las URLs fuente de las 2 fotos Pexels) y verificar que la entrada describe lo implementado

Nota: Juan autorizó las fotos nuevas el 2026-10-13; las URLs fuente quedan en CHANGELOG según la regla del proyecto.
