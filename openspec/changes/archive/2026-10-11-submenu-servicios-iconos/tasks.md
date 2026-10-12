# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `index.html`, `tools/generar-fichas.mjs` y `CHANGELOG.md` a `/tmp/opencode/respaldo-submenu-servicios/`; verificar con `ls -la /tmp/opencode/respaldo-submenu-servicios/`.

## 2. Plantilla y marcado

- [x] 2.1 En `tools/generar-fichas.mjs`, actualizar el bloque de menú de Servicios con los 4 ítems, el `span.mega-icono` con SVG y el enlace "Ver todos los servicios"; verificar con `grep -n "mega-icono" tools/generar-fichas.mjs`.
- [x] 2.2 En las 13 páginas HTML, reemplazar el bloque de Servicios del `ul.nav-menu` por el mismo marcado de 2.1, sin cambiar textos ni enlaces; verificar con `grep -rc "mega-icono" --include=*.html . | grep -v ":0"` y que el conteo es 13.
- [x] 2.3 Regenerar las fichas con `node tools/generar-fichas.mjs`; verificar con `diff` contra el respaldo que solo cambia el bloque de menú de Servicios.
- [x] 2.4 Submenú "Cursos" en las 13 páginas y en `tools/generar-fichas.mjs`: dejar solo los 4 cursos con `enHome: true` (Diplomado SGCIA, Legislación Sanitaria de Alimentos, HACCP: certificación en Perú, Auditor Interno del Sistema HACCP), conservar textos y enlaces de cada página, y añadir un ícono por curso (birrete, balanza, escudo con check, lupa con check); verificar con `grep -rc 'class="mega-icono"'` (4 por página) y que los 4 enlaces siguen apuntando a sus fichas.
- [x] 2.5 Renombrar la clase de ambos paneles a `mega-panel-compacto` en las 13 páginas y en la plantilla; verificar con `grep -rc "mega-panel-compacto"`.

## 3. Estilos

- [x] 3.1 Reglas compactas para `.mega-panel-compacto`: panel 460px con padding 10px; ítem con padding `8px 10px` y gap 10px; título 14px, line-height 1.25, sin margen; descripción 12px, line-height 1.35, margin-top 2px; grilla de 2 columnas con `grid-auto-rows: 1fr` (escritorio) para igualar alturas.
- [x] 3.2 Ícono de 44px con radio 10px, fondo `#eef1f8`, color azul marino; SVG de 24px con `stroke-width: 2`.
- [x] 3.3 CTA "Ver todos los servicios" y "Ver todos los cursos" a ancho completo, 13px, padding `10px 16px`.
- [x] 3.4 En móvil (≤860px) el panel ocupa el ancho del menú y los ítems van en 1 columna; verificar con `grep -n "mega-panel-compacto" assets/css/main.css`.
- [x] 3.5 Verificar que el menú principal, el resto de colores y la tipografía base no cambian (`diff` contra el respaldo solo muestra reglas `mega-panel-compacto`/`mega-icono`).

## 4. Verificación y documentación

- [x] 4.1 Medir en navegador (escritorio ≥861px) que los 4 ítems de cada panel miden lo mismo, el panel mide 460px y los CTA ocupan el ancho; revisar por observación en escritorio y móvil.
- [x] 4.2 Confirmar en las fichas regeneradas que el menú coincide con el de las páginas principales (`grep -c "mega-icono"` igual).
- [x] 4.3 Actualizar la entrada de `CHANGELOG.md` con el submenú compacto de Servicios y Cursos; verificar con `grep -n "^## 2026" CHANGELOG.md`.
