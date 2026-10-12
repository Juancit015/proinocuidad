# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `servicios/index.html` y `CHANGELOG.md` a `/tmp/opencode/respaldo-hero-servicios/`; verificar con `ls -la /tmp/opencode/respaldo-hero-servicios/`.

## 2. Migas estilo Crecepe en Servicios

- [x] 2.1 En `assets/css/main.css`, añadir reglas globales `.breadcrumbs` (flex, gap 8 px, texto blanco, enlace blanco con hover rosado sin subrayado); verificar con `grep -n "breadcrumbs" assets/css/main.css` y llaves balanceadas con `python3 -c`.
- [x] 2.2 En `servicios/index.html`, insertar el `nav.breadcrumbs` ("Inicio" a `../index.html` / "Servicios" actual) como primer hijo del `.container` del `.page-head`, sin tocar `h1` ni párrafo; verificar con `grep -n -A3 'class="breadcrumbs"' servicios/index.html`.
- [x] 2.3 Confirmar con `diff` contra el respaldo que solo cambian esas líneas, que el `h1` sigue siendo único (`grep -c '<h1' servicios/index.html` = 1) y que Nosotros/Noticias/Cursos no cambian.

## 3. Verificación y documentación

- [x] 3.1 Revisar en navegador desktop y móvil que las migas se ven sobre el título en blanco, el enlace Inicio navega y no hay cambios de layout; verificar por observación. (Aprobado por el usuario: "se ve bien".)
- [x] 3.2 Añadir entrada en `CHANGELOG.md` (migas estilo Crecepe en Servicios, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 4. Extensión a Nosotros, Noticias y Cursos

- [x] 4.1 Insertar el mismo `nav.breadcrumbs` en `nosotros/`, `noticias/` ("Noticias y eventos") y `cursos/index.html` ("Cursos"), con "Inicio" a `../index.html`, sin tocar `h1` ni párrafos; verificar con `grep -rn -A3 'class="breadcrumbs"' nosotros/index.html noticias/index.html cursos/index.html`.
- [x] 4.2 Confirmar con `diff` contra el respaldo que esas 3 páginas solo añaden el bloque, que cada `h1` sigue único y que las 8 fichas no cambian (no usan `.page-head`); verificar con `grep -c '<h1'` por página.
- [x] 4.3 Revisar en navegador las 3 páginas (migas blancas, enlace navegable, móvil); verificar por observación.
- [x] 4.4 Ampliar la entrada del CHANGELOG a las 4 páginas; verificar con `grep -n "^## 2026" CHANGELOG.md`.
