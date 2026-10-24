# Tasks

## 1. Markup de la franja en `index.html`

- [x] 1.1 Sustituir el bloque `<section class="cifras">…</section>` entero por el de `2ed234e~1`: `<section class="cifras" aria-label="Cifras de Proinocuidad">` con un `.container` que lleva tres `<div><strong><valor></strong><span><etiqueta></span></div>` ("+1000/personas capacitadas", "8/cursos y un diplomado asíncrono", "100%/compromiso con la salud pública").
- [x] 1.2 Desaparecer del bloque el `.cifras-head` con el H2 `id="cifras-titulo"`, el `subrayado` y las tres `.cifra-card` con sus `.stat-icono`/`.stat-info` en línea.
- [x] 1.3 Confirmar que el texto de las tres cifras es idéntico, que ningún texto nuevo entra en la página y que el H1, el `<title>`, la meta description y el canonical no cambian.

## 2. Estilos en `assets/css/main.css`

- [x] 2.1 Reemplazar el bloque actual de columnas (`.cifras` con fondo de imagen y velo, `.cifras-head`, `.cifras-grid`, `.cifra-card` y su hover) por el de `2ed234e~1`: `.cifras { background: var(--fondo); border-bottom: 1px solid var(--gris-linea); padding: 26px 0; }`, `.cifras .container` grid de tres columnas con gap 18px y centrado, `.cifras strong` a 1.7rem en `--rojo` y `.cifras span` a 0.88rem en `--gris`.
- [x] 2.2 En `@media (max-width: 1020px)` restaurar `.cifras .container { grid-template-columns: repeat(2, 1fr); }` y retirar las reglas de la franja dentro del `@media (max-width: 860px)` (la de una columna para `.cifras-grid`), sin tocar el resto del bloque.
- [x] 2.3 Quitar la línea `.cifra-card { transition: none; }` del bloque `@media (prefers-reduced-motion: reduce)`, dejando las demás reglas del bloque intactas.
- [x] 2.4 Confirmar que los estilos de fichas que reutilizan `.stat-icono`/`.stat-info`, `.ficha-stat-card` y cualquiera de las clases globales que siguen en uso no cambian de valor.

## 3. Activo retirado

- [x] 3.1 Borrar `assets/img/cifras-fondo.avif` del proyecto; verificar con grep que ninguna referencia activa ninguna URL ni ruta a la imagen en el sitio.

## 4. Verificación en navegador y documentos

- [x] 4.1 Verificar con Playwright a 1440, 1024 y 390: tres pares visibles, dos columnas hasta 1020px (con la tercera cifra sola en fila inferior), sin tarjetas ni fondo de foto ni hover del change anterior, y 0 desborde horizontal en todos los anchos.
- [x] 4.2 Medir los estilos de la barra: `.cifras strong` en `rgb(173, 52, 59)` a 1.7rem y `.cifras span` en `rgb(92, 95, 106)` a 0.88rem, fondo `rgb(246, 247, 251)` y el margen izquierdo de la grilla alineado con el resto de secciones (el mismo del `.container` del hero).
- [x] 4.3 Confirmar con grep que `assets/js/main.js`, `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` no se tocan y que `index.html` sigue siendo la única página con `.cifras`.
- [x] 4.4 Añadir la entrada al `CHANGELOG.md` con el resultado medido, y ejecutar `openspec validate cifras-barra-plana --strict`.
- [ ] 4.5 Archivar el change tras el visto bueno del dueño y verificar el resultado archivado.
