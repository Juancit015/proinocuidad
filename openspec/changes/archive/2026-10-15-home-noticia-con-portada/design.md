# Design

## Context

Ver proposal.md (Why). Estado actual: `noticias/index.html` tiene `.nota-portada` con `<img src="../assets/img/noticia-digesa-haccp.jpg">` + dos píldoras superpuestas; `index.html` tiene la misma estructura pero sin `<img>` (solo fondo azul + píldoras). El CSS ya define `.nota-portada img` absoluto con `object-fit: cover`, degradado `::after` y `.nota-card` vertical (foto arriba, texto debajo). Foto ya autoalojada y licenciada (ver CHANGELOG 2026-10-14).

## Goals / Non-Goals

**Goals:**
- Igualar la tarjeta del Home a la de Noticias con el mínimo diff posible.
- Reutilizar markup, ruta de imagen, `alt` y clases CSS existentes.

**Non-Goals:**
- Nueva foto, nuevo layout, cambio de textos, SEO, responsive nuevo, tocar `noticias/index.html` o generadores.

## Decisions

- **D1: Copiar el `<img>` de Noticias al Home con ruta relativa a raíz.** En `index.html` la ruta es `assets/img/noticia-digesa-haccp.jpg` (en Noticias es `../assets/...` por subcarpeta). Mismo `alt`: "Equipos de procesamiento industrial en un laboratorio de producción de alimentos". Alternativa (ruta absoluta) descartada: el sitio usa relativas en tarjetas.
- **D2: Conservar clases de píldoras del Home (`fecha-destacado` sin `fecha-pildora`).** El CSS posiciona `.fecha-pildora` absoluta arriba-izquierda; la del Home hoy usa solo `.fecha-destacado` sin posicionamiento propio y podría quedar bajo la foto. Decisión: añadir `fecha-pildora` si la verificación visual muestra la píldora ilegible o mal ubicada; si ya se ve bien, no tocar clases. Alternativa (reescribir estilos de píldoras) descartada: ajuste mínimo.
- **D3: Sin cambio CSS salvo verificación.** Se reutiliza `.nota-card` vertical + `.nota-portada img` existentes. Solo si la captura muestra desborde o píldora ilegible se añade regla mínima en `main.css`. Alternativa (nuevo componente) descartada: duplicaría estructura.

## Risks / Trade-offs

- [Píldora superior ilegible sobre la foto en el Home] → Verificar con captura en 1280 y 390; añadir `fecha-pildora` o z-index mínimo solo si hace falta.
- [Divergencia futura Home vs Noticias] → Mitigación: mismo archivo de imagen y mismo `alt`; documentado en tasks como verificación explícita.
- [Regresión del CHANGELOG 2026-10-14 que decía que el Home ya tenía la foto] → Verificar con `grep` que el `<img>` existe tras el cambio; la entrada nueva aclara que se repone.

## Migration Plan

Sin migración. Cambio estático en `index.html` (+ CSS puntual si aplica). Rollback: quitar el `<img>`. Sin commit/push sin confirmación.

## Open Questions

Ninguna.
