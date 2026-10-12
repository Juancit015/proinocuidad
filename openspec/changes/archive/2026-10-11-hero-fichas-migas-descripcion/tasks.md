# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `tools/generar-fichas.mjs`, una ficha de muestra y `CHANGELOG.md` a `/tmp/opencode/respaldo-hero-fichas/`; verificar con `ls -la /tmp/opencode/respaldo-hero-fichas/`.

## 2. Hero de fichas en plantilla

- [x] 2.1 En `tools/generar-fichas.mjs`, sustituir el hero por migas de 3 niveles + `h1` + `<p class="ficha-desc">`, eliminando `span.etiqueta` y `.subrayado`; verificar que la plantilla ya no contiene `class="etiqueta"` en el hero.
- [x] 2.2 Añadir campos `miga` y `descripcion` a los 8 cursos (`descripcion` = primer párrafo del Objetivo); verificar con `grep -c "miga:\|descripcion:" tools/generar-fichas.mjs` (8 y 8).
- [x] 2.3 Ajustar el estilo de `.ficha-desc` en `main.css` si el patrón existente no encaja; verificar llaves balanceadas y que `.breadcrumbs` no necesita cambios.
- [x] 2.4 Regenerar las 8 fichas y verificar con `diff` de una muestra contra el respaldo que solo cambia el hero; confirmar `h1` único por ficha.

## 3. Verificación y documentación

- [x] 3.1 Confirmar en las 8 fichas: migas de 3 niveles con enlaces correctos, descripción idéntica al primer párrafo del Objetivo, sin `.etiqueta`, modalidad conservada en Datos generales; verificar con `grep` por ficha y script Python de igualdad.
- [x] 3.2 Revisar en navegador una ficha desktop y móvil; verificar por observación.
- [x] 3.3 Añadir entrada en `CHANGELOG.md` (hero de fichas unificado, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
