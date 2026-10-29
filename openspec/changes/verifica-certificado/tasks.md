# Tasks

## 1. Generación de datos

- [ ] 1.1 Crear `tools/generar-certificados.mjs` que lea `VERIFICA TU CERTIFICADO.xlsx` y genere `assets/data/certificados.json` con los 28 registros (código, nombre, DNI normalizado, DNI original, programa, fechas, horas, estado, enlace de Drive); verificar con `node` que el JSON es válido y tiene 28 entradas.

## 2. Página de verificación

- [ ] 2.1 Crear `verifica-tu-certificado.html` siguiendo el patrón del sitio (nav, hero azul, footer, meta tags); verificar que carga a 200 en el servidor local.
- [ ] 2.2 Añadir la tarjeta de búsqueda centrada (input + botón "Verificar" + texto informativo) y el área de resultados; verificar que el formulario es accesible (label, aria, focus).

## 3. Lógica de búsqueda (JS)

- [ ] 3.1 Implementar en `assets/js/main.js` (o script dedicado) la carga del JSON con `fetch`, la normalización de DNI (solo dígitos) y de nombre (minúsculas, sin tildes), y la búsqueda simultánea en ambos campos; verificar con un DNI real y un nombre parcial.
- [ ] 3.2 Implementar el renderizado de resultados: tarjeta con datos + badge de estado + botón "Descargar certificado" (abre Drive en pestaña nueva); verificar que el botón apunta al enlace correcto.
- [ ] 3.3 Implementar estados: inicial (área vacía), encontrado, no encontrado ("No se encontró un certificado con esos datos."), error de carga; verificar cada estado.

## 4. Estilos

- [ ] 4.1 Añadir en `assets/css/main.css` los estilos de la tarjeta de búsqueda, la tarjeta de resultado, el badge de estado (verde/rojo) y el botón de descarga (rojo); verificar que siguen las variables de marca.
- [ ] 4.2 Verificar responsive de la tarjeta a 360, 390, 768, 860, 1024 y 1280px con Playwright (sin desplazamiento horizontal).

## 5. Integración

- [ ] 5.1 Añadir enlace a la página en el footer (y en el nav si aplica) de todas las páginas; verificar que el enlace funciona.
- [ ] 5.2 Actualizar `sitemap.xml`, `llms.txt` y `llms-full.txt` con la nueva URL; verificar que los tres listan la misma cantidad de páginas.
- [ ] 5.3 Añadir la página a la lista blanca de `tools/publicar.sh` si no está cubierta por los directorios existentes.

## 6. Verificación y despliegue

- [ ] 6.1 Verificar con Playwright a 360, 390, 768, 860, 1024 y 1280px: sin desplazamiento horizontal, tarjeta centrada, resultados legibles.
- [ ] 6.2 Probar búsqueda con un DNI real (ej. 72709363), un nombre parcial (ej. "claudia"), un DNI inexistente y un nombre inexistente; verificar resultados.
- [ ] 6.3 Añadir entrada en `CHANGELOG.md` con el cambio y la evidencia.
- [ ] 6.4 Commit (CSS + HTML + JS + JSON + CHANGELOG + openspec) y push.
- [ ] 6.5 Deploy con `tools/publicar.sh` y verificar HTTP 200 de la nueva página y md5 del CSS.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.