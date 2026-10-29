# Tasks

## 1. Datos y generador

- [x] 1.1 Crear `tools/generar-certificados.mjs` que lea `/home/juan/Descargas/VERIFICA TU CERTIFICADO.xlsx` (xlsx del cache de bun) y genere `assets/data/certificados.json` con los 28 registros: código, nombre, nombre_normalizado, dni_original, dni_normalizado, programa, fecha_inicio/termino (ISO), horas, estado, certificado_url.
- [x] 1.2 Verificar que la normalización coincide con la de la página (DNI solo dígitos; nombre NFD sin tildes, minúsculas, espacios colapsados) y que hay 28 registros con enlace de Drive.

## 2. Página de verificación

- [x] 2.1 Crear `verifica-tu-certificado.html` con plantilla completa: topbar con redes sociales (incl. LinkedIn), cabecera sticky con nav idéntico al resto (… Noticias, Verifica tu certificado a la izquierda de Aula Virtual con icono), hero azul, footer completo y meta tags con canonical. *(Superado por 2.3: el hero pasa a `page-head` de subpágina)*
- [x] 2.2 Añadir la tarjeta de búsqueda centrada (título, un input, botón "Buscar", texto guía debajo, modelos TQI adaptados a la paleta de marca).
- [x] 2.3 Sustituir en `verifica-tu-certificado.html` el `.hero` por `section.page-head.page-head--verifica` con `nav.breadcrumbs` ("Inicio / Verifica tu certificado"), el mismo h1 compacto aprobado y la descripción actual; retirar el eyebrow `nombre-empresa`; verificar con Playwright que h1/altura/migas quedan al nivel de las subpáginas y que el claim aprobado sigue presente.

## 3. Lógica de búsqueda (JS)

- [x] 3.1 Implementar fetch del JSON, búsqueda simultánea por DNI y nombre normalizado, y gestión de consulta vacía (sin búsqueda, foco en el campo).
- [x] 3.2 Renderizar tarjetas de resultado con badge de estado y botón "Descargar certificado" (Drive en pestaña nueva); scroll a los resultados.
- [x] 3.3 Implementar los estados sin coincidencias y de fallo de carga del JSON sin excepciones sin manejar.
- [x] 3.4 Validación de credencial y límites: markup con `maxlength="40"` en el input y validador por JS que pide 6–15 dígitos cuando la consulta es numérica (DNI peruano 8; C.E. 10 y 15 en la base) con aviso rojo `.verifica-aviso` + foco, sin ejecutar búsqueda.
- [x] 3.5 Estados de búsqueda visibles: el botón marca `disabled`/`aria-busy="true"` y la carga la muestra la **bolita global del sitio** (`.btn[aria-busy="true"]::before` — un spinner svg propio salió DOBLE junto a la bolita, Juan lo detectó y se retiró), mensaje `.verifica-cargando` en la zona de resultados, mínimo perceptible de 420 ms, ficha de resultados y scroll suave después del mínimo, y error de carga visible apenas falla el fetch (no solo al buscar).
- [x] 3.6 Canal único de avisos bajo el input (pedido de Juan, 2026-10-28): "no encontrado" y error de carga reutilizan `.verifica-aviso` (mismo canal que la validación), cada aviso reemplaza al anterior y vacía la zona de resultados (ningún mensaje persiste mezclado), scroll suave `block: center` solo cuando hay fichas y sin desplazamiento cuando hay mensajes.

## 4. Estilos

- [x] 4.1 Añadir los estilos `.verifica-*` en `assets/css/main.css` (tarjeta, badge verde/rojo, botón de descarga rojo) usando las variables de marca.
- [x] 4.3 Añadir la variante `.page-head--verifica` (imagen `hero-cursos.avif` + tratamiento idéntico a los demás `page-head--*`) en los 4 grupos CSS de variantes (imagen y `background-attachment: fixed`, `min-height`/tamaño de h1 en tablet, y ambos overrides móviles con `background-attachment: scroll`), sin tocar textos ni colores existentes (requisito "Contenido sin cambios" de `diseno-responsive`); verificar con `getComputedStyle` que la variante coge todos los grupos.
- [x] 4.2 Añadir ajustes responsive necesarios respetando `diseno-responsive` (coo cambia solo CSS, contenido intacto).
- [x] 4.4 Iconografía y estados: SVG inline stroke (lupa en Buscar, persona/libro/calendario/reloj/carnet en fichas, check en badge, flecha de descarga), spinner con `@keyframes` + bloque `prefers-reduced-motion`, y hint informativo en gris (`--gris`, no rojo de aviso); verificar la animación con `getComputedStyle` (regla de iconografía de AGENTS.md).

## 5. Integración en navegación y documentación

- [x] 5.1 Añadir el enlace "Verifica tu certificado" en nav y footer de las páginas editables a mano (inicio, nosotros, servicios ×7, noticias ×2, inocuidad-alimentaria, index de cursos) con la ruta relativa correcta.
- [x] 5.2 Añadir el enlace en `tools/generar-fichas.mjs` (nav y footer, con prefijos `ruta`/`cursos` correctos) y regenerar las 8 fichas + 404; verificar con `cp -r cursos /tmp/cursos-antes && node tools/generar-fichas.mjs && diff -rq /tmp/cursos-antes cursos` (exit 0 y falso limpio).
- [x] 5.3 Añadir la URL a `sitemap.xml`, `llms.txt` y `llms-full.txt` y verificar que los tres conjuntos de URLs son consistentes.
- [x] 5.4 Añadir `verifica-tu-certificado.html` y `assets/data/certificados.json` a la lista blanca de `tools/publicar.sh`.
- [x] 5.5 Añadir la entrada correspondiente en `CHANGELOG.md`.
- [x] 5.6 Registrar la regla de iconografía de UI en `AGENTS.md` (sección "Iconografía de UI (2026-10-28)": SVG inline stroke en botones y campos de datos, estados de proceso con feedback, nada de emojis).

## 6. Verificación y despliegue

- [x] 6.1 Verificar con Playwright a 360, 390, 768, 860, 1024 y 1280 px: 0 desbordamiento (`scrollWidth === clientWidth`), nav/footter idénticos a `index.html` (comparación de estructura/enlaces/topbar con LinkedIn).
- [x] 6.2 Verificar búsquedas: DNI real (ej. 21525061), por apellidos (ej. "TUESTA"), parcial con tilde (ej. "marly tuesta"), sin coincidencias y vacía; y el href exacto del botón de descarga en una tarjeta real. *(href ahora directo `uc?export=download`, cambio posterior a la redacción; verificado)*
- [x] 6.3 Presentar evidencia (capturas y resultados) a Juan; commit solo con confirmación explícita.
- [ ] 6.4 Deploy ejecutando `tools/publicar.sh` uniquement con consentimiento expreso; verificar 200 de la página y el JSON en producción, y 404 para nada de esto ya clasificado.
