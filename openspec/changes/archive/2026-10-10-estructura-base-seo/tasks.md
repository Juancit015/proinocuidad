# Tasks

## 1. Preparación

- [x] 1.1 Copiar `index.html`, `nosotros/`, `servicios/`, `noticias/`, `cursos/`, `tools/` y `assets/js/` a `/tmp/opencode/respaldo-seo/` con `cp -a`; verificar con `ls -R` que la copia contiene las 13 páginas y el generador.
- [x] 1.2 Registrar en `grep` el estado inicial de referencias a `FOTOS-(1)` y `pagina web.pdf` y guardar la salida en `/tmp/opencode/refs-antes.txt`; verificar que el archivo existe y no está vacío.

## 2. Mapa del sitio y rastreo

- [x] 2.1 Crear `sitemap.xml` en la raíz con las 13 URLs `https://proinocuidad.com/...` terminadas en `/`; verificar con `xmllint --noout sitemap.xml` que el XML es válido y contiene 13 `<loc>`.
- [x] 2.2 Crear `robots.txt` en la raíz con `User-agent: *`, `Allow: /` y `Sitemap: https://proinocuidad.com/sitemap.xml`; verificar con lectura del archivo que cumple el escenario "Robots accesible" de `specs/seo-base/spec.md`.

## 3. Canonical y og:url en páginas estáticas

- [x] 3.1 Añadir `<link rel="canonical">` y `<meta property="og:url">` en `index.html` (valor `https://proinocuidad.com/`); verificar con `grep -c 'rel="canonical"' index.html` que devuelve 1.
- [x] 3.2 Añadir canonical y `og:url` en `nosotros/index.html`, `servicios/index.html`, `noticias/index.html` y `cursos/index.html` con su URL absoluta; verificar con `grep` que cada archivo tiene exactamente un canonical igual a su URL.

## 4. JSON-LD Organization en Inicio

- [x] 4.1 Añadir `<script type="application/ld+json">` con `Organization` en `index.html` (nombre, URL, logo, RUC en `identifier`, `email`, `telephone`, `sameAs` con las 4 redes); verificar que el bloque es JSON válido con `node -e` que lo parsee.

## 5. Generador de fichas y JSON-LD Course

- [x] 5.1 Editar `tools/generar-fichas.mjs` para que la plantilla de `<head>` incluya canonical, `og:url` y un bloque `Course` construido con nombre, descripción (la misma meta description), proveedor, modalidad, horas y `offers` en PEN y USD, tomando los valores de cada curso del objeto de datos del propio generador; verificar con `node --check tools/generar-fichas.mjs`.
- [x] 5.2 Ejecutar `node tools/generar-fichas.mjs` y verificar que se regeneraron las 8 fichas; comparar con la copia de 1.1; sólo debe cambiar el `<head>` en cada ficha.
- [x] 5.3 Verificar en las 8 fichas que el JSON-LD `Course` parsea y que `offers` coincide con la inversión de la ficha (diplomado: S/ 120 / US$ 37; cursos cortos: S/ 45 / US$ 15) y las horas (384 / 40).

## 6. Movimiento de material no relevante

- [x] 6.1 Crear `_archivo/` en la raíz y mover `FOTOS-(1)/` y `pagina web.pdf` con `mv`; verificar con `ls -la _archivo/` que ambos existen y que la raíz ya no los contiene.
- [x] 6.2 Actualizar en `README.md` y `STRUCTURE.md` las referencias a `pagina web.pdf` y `FOTOS-(1)/FOTOS/` por `_archivo/...`; verificar con `grep` que no quedan referencias sin actualizar en esos dos archivos.
- [x] 6.3 Actualizar el comentario de `assets/js/cursos-data.js` y el de cabecera de `tools/generar-fichas.mjs` con la nueva ruta; verificar con `node --check tools/generar-fichas.mjs` y con `grep`.
- [x] 6.4 Comparar `grep` con `/tmp/opencode/refs-antes.txt` y verificar que HTML, CSS y JS no referencian `FOTOS-(1)` ni `pagina web.pdf`.

## 7. Verificación final

- [x] 7.1 Verificar que las 13 páginas tienen canonical y `og:url` coincidentes con su URL del sitemap (`grep` cruzado).
- [x] 7.2 Verificar que cada URL del `sitemap.xml` corresponde a un archivo existente en el repositorio (`index.html`, `<sección>/index.html` o `cursos/<slug>/index.html`).
- [x] 7.3 Confirmar que el contenido visible no cambió: comparar el `<body>` de cada página con la copia de 1.1; sólo deben diferir `<head>` y los archivos nuevos o renombrados.
- [x] 7.4 Informar de las verificaciones que no se pudieron realizar (validación del JSON-LD con herramienta externa de Google y rastreo real tras publicar).
