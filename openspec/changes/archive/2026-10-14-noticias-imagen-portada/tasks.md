# Tasks

## 1. Foto y respaldo

- [x] 1.1 Verificar en la página Unsplash de la candidata que la licencia sea gratuita (no Plus ni Getty), anotar autor y URL, y pedir a Juan su aprobación antes de descargar
- [x] 1.2 Respaldar `noticias/index.html` y `assets/css/main.css` en `/tmp/opencode/respaldo-*/` y verificar con `cmp` que las copias son idénticas
- [x] 1.3 Descargar la foto aprobada (~1200px) en `assets/img/`, verificar peso y formato, y registrar autor, URL fuente y licencia en `CHANGELOG.md`

## 2. Layout vertical

- [x] 2.1 Añadir el `<img>` con `alt` descriptivo en `.nota-portada` y verificar que las etiquetas siguen legibles
- [x] 2.2 Cambiar `.nota-card` a 1 columna en escritorio (foto arriba a ancho completo con `object-fit: cover`, texto debajo) y en móvil dar a la imagen un poco más de altura (se veía pequeña), y verificar llaves balanceadas en el CSS

## 3. Verificación integral

- [x] 3.1 Verificar con `diff` que solo cambió la tarjeta (contenido de la nota, migas, CTA y footer intactos) y con capturas en 1280 y 390 que no hay desbordes
- [x] 3.2 Mover "Noticia · Regulación sanitaria" arriba de la imagen y poner "DIGESA" en blanco, verificado con capturas en 1280 y 390
- [x] 3.3 "Noticia · Regulación sanitaria" en píldora blanca dentro de la imagen y card al 80% en desktop (móvil a ancho completo), verificado con capturas
