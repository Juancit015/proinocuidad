# Proposal

## Why

Los enlaces tipo "Saber más →" de Proinocuidad usan el subrayado genérico de `a:hover`, mientras que la referencia Crecepe usa un efecto propio en sus enlaces de tarjeta ("Ver plan Presencia / Tienda / Automatiza"): sin subrayado y con desplazamiento de la flecha al hover. Unificar ese micro-interacción da coherencia visual entre ambos sitios sin tocar contenido ni URLs.

## What Changes

- En `assets/css/main.css`, redefinir `.card .card-link` como enlace inline-flex con flecha desplazable al hover, replicando `.service-link` de Crecepe adaptado a la paleta Proinocuidad (`--rojo`).
- Excluir `.card-link` del subrayado global `a:hover` (solo ese selector; el resto de enlaces conserva su hover actual).
- Aplicar a todos los `.card-link` existentes del sitio (5 en `index.html`: 4 "Saber más →" + 1 "Leer la noticia completa →"). Sin cambios de `href`, texto visible, ni HTML salvo que la verificación lo exija.
- Sin cambios en `.btn`, `.mega-cta`, nav, footer ni flotante de WhatsApp.
- Solo CSS, sin JS ni cambios de marcado SEO (canonical, OG, JSON-LD, sitemap intactos).

## Capabilities

### New Capabilities

Ninguna. Cambio puramente visual de interacción.

### Modified Capabilities

Ninguna. No cambian requisitos de comportamiento a nivel de spec (textos, destinos, estructura y SEO intactos).

## Impact

- Archivo afectado: `assets/css/main.css` (regla `.card .card-link` + override de `a:hover`).
- Páginas afectadas visualmente: las que contienen `.card-link` (hoy solo `index.html`, 5 enlaces).
- Sin dependencias nuevas, sin JS, sin cambios de HTML/SEO.
- Riesgo SEO: ninguno por el efecto en sí (detalle en design.md). El cambio es solo `:hover` en CSS; crawlers leen el mismo `href` y texto ancla.

## Riesgos SEO (respuesta directa)

No hay riesgo SEO siempre que se cumplan estas condiciones, que este change impone como restricciones:

1. No se tocan `href`, textos ancla, canonical, `og:url`, JSON-LD, sitemap ni `robots.txt`.
2. El efecto es solo CSS `:hover` (sin JS, sin ocultar enlaces, sin `display:none`, sin cambiar el DOM).
3. El desplazamiento de la flecha (gap 8px → 13px) solo ocurre en hover, no en carga: no genera CLS medible en Core Web Vitals.
4. Se mantiene el contraste actual (rojo `#AD343B` sobre blanco) y el foco visible de teclado.
5. Nota no bloqueante: "Saber más" es un texto ancla genérico, pero ya existe hoy y este change no lo empeora; mejorarlo (ej. `aria-label` descriptivo) queda fuera de alcance salvo que lo pidas.
