# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, las 4 páginas (`servicios/`, `nosotros/`, `noticias/`, `cursos/index.html`) y `CHANGELOG.md` a `/tmp/opencode/respaldo-heroes-img/`; verificar con `ls -la /tmp/opencode/respaldo-heroes-img/`.

## 2. Selección y descarga de fotos

- [x] 2.1 Elegir 1 foto libre por página (industria alimentaria, apaisada ≥1600 px, apta para overlay oscuro) desde Unsplash/Pexels registrando URL fuente y licencia; verificar que la licencia permite uso comercial sin atribución.
- [x] 2.2 Descargar las 4 fotos, convertir a AVIF (1920 px, <200 KB c/u) como `assets/img/hero-{servicios,nosotros,noticias,cursos}.avif`; verificar con `file` y `ls -la`.

## 3. Fondos en CSS y páginas

- [x] 3.1 En `main.css`, añadir las 4 clases `.page-head--*` con overlay marino + foto; verificar llaves balanceadas y que el degradado base sigue para quien no cargue imagen.
- [x] 3.2 Añadir la clase correspondiente al `.page-head` de cada página, sin tocar migas/h1/párrafos; verificar con `grep -n 'page-head--' servicios/index.html nosotros/index.html noticias/index.html cursos/index.html` y `diff` mínimo contra el respaldo.

## 4. Verificación y documentación

- [x] 4.1 Revisar en navegador desktop y móvil que el texto blanco contrasta sobre cada foto y no hay cambios de layout; verificar por observación.
- [x] 4.2 Añadir entrada en `CHANGELOG.md` con las 4 URLs fuente (atribución); verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 5. Reemplazos y fichas (pedido del usuario)

- [x] 5.1 Reemplazar las fotos de Servicios, Nosotros y Noticias por las elegidas (grupo en labor) y añadir 1 foto temática por cada una de las 8 fichas (campo `fondo` en plantilla + fondo inline con overlay); verificar AVIF <200 KB y `file`.
- [x] 5.2 Regenerar las 8 fichas y verificar diff mínimo + foto por ficha; ampliar CHANGELOG con las nuevas URLs fuente.
