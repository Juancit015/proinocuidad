# Proposal

## Why

Un asistente de IA que responde sobre Proinocuidad tiene que adivinar. Hoy el sitio expone 18 páginas HTML construidas para personas: cada una lleva barra de navegación, barra superior, botones de WhatsApp, pie con cuatro bloques de contacto y JavaScript que monta un menú desplegable. Un agente que las lee gasta tokens en todo eso antes de llegar al contenido, y un sitio sin `llms.txt` no le ofrece ningún punto de entrada ordenado.

Es además una comprobación que Lighthouse ya incluye en su auditoría de navegación agéntica, así que no es una curiosidad de moda: es un estándar que ya se verifica automáticamente y este sitio no lo tiene.

## What Changes

- **Se crea `/llms.txt`** en la raíz del sitio, siguiendo el estándar de llmstxt.org en su **versión 2** (publicada el 3 de septiembre de 2024, modificada el 10 de agosto de 2026). Estructura: un H1 con el nombre, un blockquote con el resumen, un párrafo corto de contexto y secciones H2 con listas de enlaces absolutos y descripción de una línea.
- **Se crea `/llms-full.txt`** con el contenido de las páginas clave ya en Markdown, dentro del propio archivo.
- **Se corrigen dos specs que dicen "13 páginas"** cuando el sitio tiene 18: `seo-base` y `diseno-responsive`. En `seo-base` el error es más grave: su propio escenario exige "13 entradas `<url><loc>`", así que la spec se contradice con el `sitemap.xml` que tiene 18.
- No se tocan las 18 páginas HTML, ni el CSS, ni el JavaScript, ni el generador de fichas. Los dos archivos nuevos son texto plano en la raíz, al lado de `robots.txt` y `sitemap.xml`.

## Capabilities

### New Capabilities

Ninguna. El comportamiento encaja en la spec de SEO que ya existe.

### Modified Capabilities

- `seo-base`: se añaden dos requisitos, uno para `llms.txt` y otro para `llms-full.txt`. Además, el requisito "Mapa del sitio" pasa a decir 18 páginas en lugar de 13, con su escenario corregido.
- `diseno-responsive`: el requisito "Auditoría responsive" pasa a auditar las 18 páginas, no 13.

## Impact

- **Archivos nuevos:** `llms.txt` y `llms-full.txt` en la raíz. Se sirven como texto plano, igual que `robots.txt`.
- **Specs tocadas:** `seo-base` y `diseno-responsive`, por el desfase de "13 páginas".
- **Sin tocar:** las 18 páginas HTML, `assets/css/main.css`, `assets/js/main.js`, `tools/generar-fichas.mjs` y los dos generadores.
- **Verificación:** se comprueba que **cada URL del `llms.txt` exista de verdad**. La fuente de verdad es `sitemap.xml`, que ya coincide exactamente con los 18 archivos del sitio, sin una sola URL huérfana ni página sin listar. Ese contraste se automatiza, porque es el error más probable: añadir una página y que se quede fuera.
- **Sin dependencias ni backend.** `llms.txt` es un archivo estático más, sin PHP ni Node ni build.

## Una decisión que conviene que sepas antes de aprobar

El estándar v2 dice textualmente que *"los enlaces de un llms.txt deberían apuntar a contenido LLM-friendly, como las versiones markdown de las páginas"*, y recomienda publicar cada página en `.md` o `.html.md`. **Este sitio no tiene ninguna versión markdown de ninguna página.**

Se decidió no generar 18 archivos `.md` y resolverlo con `llms-full.txt`: el contenido de las páginas clave viaja dentro de ese segundo archivo, en Markdown, para que un agente lo lea sin parsear 18 páginas HTML ni saltarse navegación y scripts. Es el mismo objetivo que persigue el estándar, sin el coste de mantener un `.md` por página que además tendría que generarse aparte, porque las fichas ya se generan hoy.

La alternativa descartada era generar las versiones `.md`: es lo más fiel al estándar, pero obligaría a decidir qué 18 páginas se documentan y cómo se mantienen sincronizadas con el HTML. Un `.md` que se queda viejo es peor que ningún `.md`.