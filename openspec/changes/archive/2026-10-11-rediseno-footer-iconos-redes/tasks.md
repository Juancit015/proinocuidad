# Tasks

## 1. Respaldo e inventario

- [x] 1.1 Copiar `assets/css/main.css`, las 5 páginas manuales (`index.html`, `servicios/`, `nosotros/`, `noticias/`, `cursos/index.html`), una ficha de muestra, `tools/generar-fichas.mjs` y `CHANGELOG.md` a `/tmp/opencode/respaldo-footer/`; verificar con `ls -R /tmp/opencode/respaldo-footer/`.
- [x] 1.2 Inventariar bloques `.redes-sociales`, `.topbar-social` y `.footer-bottom` en las 13 páginas con `grep -rn` y confirmar que los `href` de redes son los 5 conocidos (Facebook, YouTube, Instagram, LinkedIn + comunidad WhatsApp); verificar registrando el conteo antes de editar.

## 2. CSS sin underline + barra azul

- [x] 2.1 En `assets/css/main.css`, añadir `text-decoration: none` en `:hover` y `:focus-visible` para `.site-footer a` y `.topbar a`, con hover por color (footer a blanco, topbar a blanco pleno); verificar con `grep -n "site-footer a\|topbar a" assets/css/main.css` y que `a:hover` global sigue intacta.
- [x] 2.2 Redefinir `.footer-bottom` con `background: var(--azul-oscuro)`, `color: #fff`, sin `border-top`, `font-size: 0.82rem`; verificar llaves balanceadas con `python3 -c` y con `grep -n "footer-bottom" assets/css/main.css`.
- [x] 2.3 Añadir estilos de iconos: `.redes-sociales` en fila con botones circulares de 40 px (fondo translúcido, hover `--rojo`, SVG 20 px) y `.topbar-social a svg` de 16 px; verificar con `grep -n "redes-sociales\|topbar-social" assets/css/main.css`.

## 3. Iconos en las 5 páginas manuales

- [x] 3.1 En `index.html` (bloque canónico), convertir los 5 enlaces de `.redes-sociales` a SVG inline con `aria-label` por red, sin tocar `href`/`target`/`rel`; verificar con `grep -c 'redes-sociales' ` y conteo de `<svg` y `aria-label` en el bloque.
- [x] 3.2 Convertir los 4 enlaces de `.topbar-social` a SVG de 16 px con `aria-label`; verificar con `grep -n 'topbar-social' -A6 index.html`.
- [x] 3.3 Replicar ambos bloques en `servicios/`, `nosotros/`, `noticias/` y `cursos/index.html` ajustando solo rutas relativas de assets; verificar con `diff` de los bloques entre páginas (idénticos salvo rutas).

## 4. Fichas vía plantilla

- [x] 4.1 Aplicar los mismos bloques footer/topbar en `tools/generar-fichas.mjs` y regenerar las 8 fichas; verificar regenerando una ficha primero y con `diff` contra su respaldo que solo cambia footer/topbar.
- [x] 4.2 Confirmar en las 8 fichas que cada icono conserva su `href`, `target="_blank"`, `rel="noopener"` y `aria-label`; verificar con `grep -rn 'aria-label="Facebook"\|aria-label="YouTube"' cursos/ | wc -l` (8 por red en fichas).

## 5. Verificación y documentación

- [ ] 5.1 Confirmar que ningún enlace de footer/topbar subraya en hover/foco, que `.card-link`, nav y botones no cambiaron y que el `contacto-footer` sigue cumplido (mismos datos, redes y razón social); verificar con `diff` contra respaldos y revisión en navegador desktop + móvil.
- [x] 5.2 Añadir entrada en `CHANGELOG.md` (footer con iconos, sin underline, barra azul oscuro, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 6. Ajustes finos del usuario

- [x] 6.1 En `main.css`: centrar iconos del topbar (`align-items` + `li` flex + SVG en bloque), enlaces de contacto del footer en blanco, y hover en `.footer-links a` con desplazamiento a la derecha + guion rojo `::before` (con `prefers-reduced-motion`); verificar con `grep -n "topbar-social\|footer-contacto a\|footer-links a" assets/css/main.css` y llaves balanceadas.
- [x] 6.2 Cambiar la etiqueta `Teléfono/WhatsApp:` por `Contacto:` en footer y topbar de las 5 páginas manuales y la plantilla, y regenerar las 8 fichas; verificar 0 menciones restantes y 26 "Contacto:" (13 topbar + 13 footer).
- [x] 6.3 Confirmar con `diff` que fichas y páginas solo cambian en topbar/redes/etiqueta, y actualizar el CHANGELOG; verificar con `diff` contra `/tmp/opencode/respaldo-footer/`.
