# Tasks

## 1. Implementación del encabezado informativo

- [x] 1.1 En `verifica-tu-certificado.html`: en el flujo de renderizado de resultados, cuando `items.length > 1` insertar como primer hijo de la zona de resultados un `<p class="verifica-resumen" role="status">` con el texto "Encontramos N certificados para tu DNI" (vía numérica) o "…para tu consulta" (vía de nombre). Verificar: buscar "72709363" en la página servida localmente muestra el encabezado y las 2 tarjetas; buscar un DNI con 1 sola ficha y un código por `?codigo=` no muestra encabezado.
- [x] 1.2 El encabezado se limpia con la zona de resultados en cada búsqueda (sin lógica extra — vive dentro del contenedor que ya se vacía). Verificar: tras "72709363" → 2 tarjetas con encabezado, una búsqueda de 1 resultado posterior no conserva el encabezado, y una búsqueda sin resultados deja la zona vacía con el aviso rojo bajo el input (comportamiento actual intacto).
- [x] 1.3 En `assets/css/main.css` (bloque `verifica-*`): regla neutra `.verifica-resumen` — fondo `--gris-linea`, texto de marca existente, sin transiciones ni pseudo-elementos posicionados, espaciado consistente con las tarjetas. Verificar con `getComputedStyle`: fondo, color de texto y sin `position` en pseudo-elementos; sin necesidad de tocar el bloque de `prefers-reduced-motion` (elemento estático).

## 2. Verificación con arnés (Playwright, Chromium de `~/.cache/ms-playwright`)

- [x] 2.1 Arnés a 1280 px: DNI duplicado → encabezado de 1 línea + 2 tarjetas; DNI único → solo tarjeta; nombre con 2 coincidencias → encabezado "para tu consulta"; `?codigo=SGCIA- 26-002` → tarjeta sin encabezado; consulta sin resultados → sin encabezado y aviso rojo bajo el input. Verificar: script que imprime asserts y sale `exit 0`.
- [x] 2.2 Arnés a 390 px: mismo set; el encabezado no desborda el viewport (sin scroll horizontal — sin `overflow-x` oculto) y no empuja las tarjetas fuera del scroll central. Verificar: `document.documentElement.scrollWidth <= 390` y captura visual a pasarle a Juan.

## 3. Cierre

- [x] 3.1 Servir localmente (`python3 -m http.server 8899`) y hacer la pasada manual de Juan en el puerto 8899 antes de commit/deploy.
- [ ] 3.2 Commit separado (código de la página + CSS juntos por compartir el mismo aspecto; CHANGELOG por aparte), push solo con confirmación de Juan, deploy con `tools/publicar.sh` solo tras autorización explícita aparte. Verificar: `git status` limpio tras el commit y md5 de `verifica-tu-certificado.html` idéntico repo/server tras el deploy.

## Workflow follow-up

- La autorización de push y la de deploy (`publicar.sh`) son dos pasos independientes, cada una se pide por separado.
- Después de archivar el change: `openspec validate` en limpio y, si se sincronizan specs, cortar los bloques delta en el próximo `## ` además del próximo `### Requirement:` (no arrastrar el encabezado `## MODIFIED Requirements` de la matriz).
