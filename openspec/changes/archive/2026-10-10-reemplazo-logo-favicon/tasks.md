# Tasks

## 1. Preparación

- [x] 1.1 Copiar `assets/img/logo-proinocuidad.png`, `assets/img/favicon.png`, `index.html`, `nosotros/`, `servicios/`, `noticias/`, `cursos/index.html` y `tools/generar-fichas.mjs` a `/tmp/opencode/respaldo-logo/` con `cp -a`; verificar con `ls -R` que la copia existe completa.
- [x] 1.2 Verificar con `identify` que el logo nuevo (`/home/juan/Descargas/LOGO_PROINOCUIDAD-removebg-preview.png`) mide 500×500 y tiene canal alfa, y que `favicon_io/favicon.ico` y `favicon_io/apple-touch-icon.png` (180×180) existen; si no, detenerse.

## 2. Reemplazo de activos

- [x] 2.1 Mover `assets/img/logo-proinocuidad.png` a `_archivo/logo-proinocuidad-anterior.png` con `mv`; copiar el logo nuevo a `assets/img/logo-proinocuidad.png`. Verificar con `cmp` que el archivo activo es idéntico al de Descargas y que `_archivo/logo-proinocuidad-anterior.png` existe.
- [x] 2.2 Copiar `favicon_io/favicon.ico` a `assets/img/favicon.ico` y `favicon_io/apple-touch-icon.png` a `assets/img/apple-touch-icon.png`. Verificar con `identify` que el `.ico` contiene 16×16 y 32×32 y que el PNG mide 180×180.
- [x] 2.3 Mover `assets/img/favicon.png` a `_archivo/favicon-anterior.png`. Verificar con `ls` que ya no existe en `assets/img/`.

## 3. Enlaces en páginas estáticas

- [x] 3.1 En `index.html`, sustituir `<link rel="icon" type="image/png" sizes="48x48" href="assets/img/favicon.png">` por `<link rel="icon" href="assets/img/favicon.ico" sizes="any">` y `<link rel="apple-touch-icon" href="assets/img/favicon.png">` por `href="assets/img/apple-touch-icon.png"`. Verificar con `grep -n 'favicon\|apple-touch' index.html`.
- [x] 3.2 Aplicar el mismo cambio en `nosotros/index.html`, `servicios/index.html`, `noticias/index.html` y `cursos/index.html`, con la ruta relativa de cada página (`../assets/img/...`). Verificar con `grep` que ninguno contiene `favicon.png`.

## 4. Generador de fichas

- [x] 4.1 En la plantilla de `<head>` de `tools/generar-fichas.mjs`, sustituir las dos líneas de `<link>` de favicon por las versiones `.ico` y `apple-touch-icon.png` con ruta `../../assets/img/...`. Verificar con `node --check tools/generar-fichas.mjs`.
- [x] 4.2 Ejecutar `node tools/generar-fichas.mjs` y comparar los cuerpos (todo lo posterior a `</head>`) de las 8 fichas con la copia de 1.1; deben ser idénticos. Verificar además que cada ficha enlaza `favicon.ico` y `apple-touch-icon.png`.

## 5. Documentación

- [x] 5.1 Actualizar en `STRUCTURE.md` la convención de assets: el logo sigue siendo `logo-proinocuidad.png` y el favicon pasa a `favicon.ico` con `apple-touch-icon.png`. Verificar con `grep -n 'Favicon\|favicon' STRUCTURE.md`.
- [x] 5.2 Registrar el cambio en `CHANGELOG.md` en una sección nueva con fecha `2026-10-10`, bajo "Changed". Verificar con `grep` que la entrada aparece antes de la sección de estructura SEO.

## 6. Verificación final

- [x] 6.1 Buscar referencias sueltas: `grep -rn "favicon.png" . --include=*.html --include=*.mjs --include=*.js --include=*.css --exclude-dir=openspec --exclude-dir=_archivo` no debe devolver coincidencias. Verificar que el resultado está vacío.
- [x] 6.2 Confirmar que ninguna página cambió en su cuerpo: comparar `<body>` de las 13 páginas con la copia de 1.1; solo debe diferir el `<head>`.
- [x] 6.3 Verificar que el JSON-LD `Organization` de `index.html` sigue apuntando a `https://proinocuidad.com/assets/img/logo-proinocuidad.png` y que ese archivo existe.
- [x] 6.4 Informar de lo que no se pudo verificar: el render del logo en navegador real y la visualización del favicon, que puede estar en caché.
