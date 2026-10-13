# Tasks

## 1. Respaldo y medición base

- [x] 1.1 Copiar `servicios/index.html`, `sitemap.xml`, `tools/generar-fichas.mjs` y las 13 páginas HTML a `/tmp/opencode/respaldo-seo-keywords/` y verificar con `ls` que el respaldo tiene las 16 piezas
- [x] 1.2 Ejecutar un conteo de `<title>` y meta description de las 13 páginas y guardar la línea base en `/tmp/opencode/seo-base.txt`, verificando que el archivo tiene 13 líneas

## 2. Páginas de servicio

- [x] 2.1 Crear `servicios/registro-sanitario-digesa/index.html` con un único `<h1>` que contenga "registro sanitario", texto del PDF (sección 2 y "Trámite de registro sanitario de alimentos y bebidas") y sin precios ni plazos, verificando con `grep -c "<h1" = 1` y con búsqueda de "S/" y "días" sin resultados
- [x] 2.2 Crear `servicios/certificacion-haccp/index.html` con la redacción "Validación Técnica Oficial del Plan HACCP" del PDF, un único `<h1>` y canonical propio, verificando el canonical con `grep`
- [x] 2.3 Crear `servicios/implementacion-fssc-22000/index.html` con un único `<h1>` que incluya "FSSC 22000" y enlace al curso `cursos/sistema-haccp-fssc-22000-codex-2022/`, verificando el enlace con `grep`
- [x] 2.4 Crear `servicios/brcgs-food-safety/index.html` con un único `<h1>` que incluya "BRCGS Food Safety" y texto del PDF (sección 3), verificando con `grep -c "<h1" = 1`
- [x] 2.5 Agregar a cada página de servicio JSON-LD `Service` con `name`, `description`, `provider` y canonical, verificando que cada página parsea como JSON válido con `python3 -c "import json,re; ..."` sobre el bloque `application/ld+json`

## 3. Página pilar

- [x] 3.1 Crear `inocuidad-alimentaria/index.html` con un único `<h1>` "Inocuidad alimentaria", secciones de concepto y enlaces a `cursos/index.html`, `servicios/index.html` y las 4 páginas de servicio, verificando los enlaces con `grep`
- [x] 3.2 Revisar que el texto de la guía no contiene cifras ni estadísticas sin fuente, verificando con `grep -nE "[0-9]+ ?%|[0-9]{3,}"` sin resultados

## 4. Metadatos de las páginas existentes

- [x] 4.1 Ajustar `<title>` de las 13 páginas (incluidas las 5 nuevas) a 60 caracteres o menos, verificando con el script de conteo de la tarea 1.2
- [x] 4.2 Ajustar meta description de las 13+5 páginas a 120–160 caracteres, verificando con el mismo script
- [x] 4.3 Ajustar `<title>` de `servicios/index.html` para que incluya "servicios" y la keyword "inocuidad alimentaria" sin superar 60 caracteres, verificando el conteo

## 5. Fichas de curso

- [x] 5.1 En `tools/generar-fichas.mjs` (línea 161), evitar agregar `| Proinocuidad` cuando `curso.title` ya lo contiene, verificando con `node --check tools/generar-fichas.mjs`
- [x] 5.2 Ejecutar `node tools/generar-fichas.mjs` y verificar que cada una de las 8 fichas tiene la cadena "Proinocuidad" exactamente una vez en `<title>`, con `grep -o "Proinocuidad" | wc -l`
- [x] 5.3 Verificar que canonical, `og:url` y JSON-LD `Course` de las 8 fichas no cambiaron, comparando con el respaldo de la tarea 1.1 con `diff`, salvo la línea del `<title>`

## 6. Enlaces, sitemap y servicios

- [x] 6.1 Agregar a `sitemap.xml` las 5 URLs nuevas (4 servicios y 1 guía) con formato igual a las existentes, verificando con `grep -c "<loc>"` que sube de 13 a 18
- [x] 6.2 En `servicios/index.html`, enlazar cada servicio prioritario a su página de detalle y agregar un enlace a `inocuidad-alimentaria/index.html`, verificando con `grep` los 5 enlaces nuevos
- [x] 6.3 Verificar que ninguna página nueva o editada cambió clases, CSS ni colores: `diff` de `<style>` y de `assets/css/main.css` frente al respaldo sin diferencias

## 7. Verificación integrada

- [x] 7.1 Recorrer las 18 páginas HTML con un script que verifique: un único `<h1>`, canonical presente, título ≤ 60, description 120–160 y ausencia de enlaces rotos internos, reportando el resultado en la consola
- [x] 7.2 Registrar en `CHANGELOG.md` una entrada con las páginas nuevas, los cambios de metadatos, el fix del generador y la fecha de medición SE Ranking
