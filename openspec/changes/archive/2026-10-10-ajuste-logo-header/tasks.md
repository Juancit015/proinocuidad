# Tasks

## 1. Preparación

- [x] 1.1 Copiar `assets/img/logo-proinocuidad.png`, `assets/css/main.css`, `index.html`, `nosotros/`, `servicios/`, `noticias/`, `cursos/` y `tools/generar-fichas.mjs` a `/tmp/opencode/respaldo-ajuste-logo/` con `cp -a`; verificar con `ls -R` que la copia existe completa.
- [x] 1.2 Verificar con `identify` que `assets/img/logo-proinocuidad.png` mide 500×500 y tiene canal alfa, y con `magick ... -trim -format "%wx%h"` que el recorte da 448×156; si no, detenerse.

## 2. Recorte del logo

- [x] 2.1 Copiar `assets/img/logo-proinocuidad.png` a `_archivo/logo-proinocuidad-sin-recorte.png` con `cp -a`; verificar con `cmp` que ambos archivos son idénticos.
- [x] 2.2 Recortar `assets/img/logo-proinocuidad.png` in situ con `magick assets/img/logo-proinocuidad.png -trim +repage assets/img/logo-proinocuidad.png`; verificar con `identify` que mide 448×156 y conserva el canal alfa.

## 3. Quitar el texto del encabezado

- [x] 3.1 En `index.html`, `nosotros/index.html`, `servicios/index.html`, `noticias/index.html` y `cursos/index.html`, eliminar la línea `<span>Proinocuidad<small>Consultoría alimentaria</small></span>` dentro de `<a class="brand">`; verificar con `grep -c "Consultoría alimentaria</small>"` que devuelve 0 en esas 5 páginas.
- [x] 3.2 En `tools/generar-fichas.mjs`, eliminar la misma línea de la plantilla del encabezado; verificar con `node --check tools/generar-fichas.mjs` y con `grep` que ya no aparece.
- [x] 3.3 En `assets/css/main.css`, eliminar las reglas `.brand span` y `.brand span small`; verificar con `grep -n "\.brand span" assets/css/main.css` que no quedan coincidencias.

## 4. Regenerar fichas

- [x] 4.1 Ejecutar `node tools/generar-fichas.mjs` y verificar que se regeneraron las 8 fichas sin error.
- [x] 4.2 Comparar, en las 8 fichas, todo lo posterior a `</header>` con la copia de 1.1; deben ser idénticos. Verificar que ninguna ficha contiene `Consultoría alimentaria</small>`.

## 5. Verificación de cuerpos y referencias

- [x] 5.1 Comparar en las 5 páginas estáticas todo lo posterior a `</header>` con la copia de 1.1; deben ser idénticos.
- [x] 5.2 Verificar que `index.html` sigue con el enlace `<a class="brand" href="index.html" aria-label="Proinocuidad — inicio">` y con `<img src="assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad">` dentro del enlace.
- [x] 5.3 Verificar que el JSON-LD `Organization` de `index.html` sigue apuntando a `https://proinocuidad.com/assets/img/logo-proinocuidad.png`.

## 6. Documentación

- [x] 6.1 Registrar el cambio en `CHANGELOG.md` en una sección nueva con fecha `2026-10-10`, arriba de las demás entradas del día, con "Changed": texto retirado del encabezado, logo recortado y copia del original en `_archivo/`. Verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 7. Verificación final

- [ ] 7.1 Confirmar que el logo recortado mide ~52 px de alto en el encabezado: revisar en navegador con `file:///home/juan/Proniciudad/index.html` a ancho de escritorio (1366 px) y móvil (360 px) y reportar lo observado.
- [ ] 7.2 Confirmar que el pie se ve bien con el logo recortado en la caja de 210 px y que el menú móvil no se desborda a 360 px.
- [x] 7.3 Informar de lo que no se pudo verificar: la pantalla real de dispositivos y el comportamiento del menú móvil bajo otros navegadores.
