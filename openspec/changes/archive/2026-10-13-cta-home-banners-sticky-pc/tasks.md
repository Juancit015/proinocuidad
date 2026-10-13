# Tasks

## 1. Respaldo y base

- [x] 1.1 Respaldar `index.html` y `assets/css/main.css` en `/tmp/opencode/respaldo-*/` y verificar con `cmp` que las copias son idénticas
- [x] 1.2 Registrar el bloque final actual (`#noticias`), el tamaño de banner y el header sticky, y verificar llaves CSS balanceadas

## 2. Bloque CTA en la home

- [x] 2.1 Insertar la sección CTA como última de `main` en `index.html` (título, 4 contactos con ícono, tarjeta con 2 botones y nota, sin textos de Crecepe) y verificar un solo `<h1>` y enlaces wa.me/mailto correctos
- [x] 2.2 Añadir los estilos `cta-*` en `main.css` con variables existentes (fondo oscuro + imagen existente, tarjeta blanca, apilado en móvil) y verificar que no aparecen colores ni fuentes de Crecepe
- [x] 2.3 Verificar que ninguna subpágina contiene el bloque CTA

## 3. Tamaño de banners

- [x] 3.1 Aplicar `min-height: clamp(360px, 55vh, 520px)`, centrado vertical y título `clamp(2.4rem, 4vw, 3.2rem)` a las variantes de banner sin tocar overlay ni attachment, y verificar en `nosotros/index.html` el parecido con el referente manteniendo la paleta
- [x] 3.2 Verificar que el Hero, las fichas y el móvil (≤860px) conservan su aspecto actual

## 4. Sticky solo en PC y registro

- [x] 4.1 Cambiar `.site-header` a `position: relative` dentro del media ≤860px y verificar que el menú hamburguesa abre y cierra con normalidad a 390px
- [x] 4.2 Verificar con `git status`/`git diff` que solo cambiaron `index.html`, `assets/css/main.css` y `CHANGELOG.md`
- [x] 4.3 Registrar el cambio en `CHANGELOG.md`, listar archivos modificados y qué cambió en cada uno, sin hacer commit ni push
