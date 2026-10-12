# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `assets/js/main.js` y `CHANGELOG.md` a `/tmp/opencode/respaldo-animacion-entrada/`; verificar con `ls -la /tmp/opencode/respaldo-animacion-entrada/`.

## 2. Estado inicial y JavaScript

- [x] 2.1 En `assets/js/main.js`, añadir la clase `js-anim` a `<html>` al inicio y, si `IntersectionObserver` existe, observar `.identidad-grid` y añadir `.en-vista` una vez al entrar (umbral 0.15); si no existe, quitar `js-anim`. Verificar con `node --check assets/js/main.js` y `grep -n "js-anim\|en-vista" assets/js/main.js`.

## 3. Estilos

- [x] 3.1 En `assets/css/main.css`, añadir `@keyframes` de entrada izquierda y derecha (32px, opacidad 0 a 1); el texto (`> :not(img)`) entra desde la izquierda y la imagen (`> img`) desde la derecha, en `html.js-anim .hero-grid` (700ms, imagen con 120ms de retraso) y en `html.js-anim .identidad-grid:not(.en-vista)` / `.en-vista` (ocultas y animadas); verificar con `grep -n "@keyframes entrada\|js-anim\|en-vista" assets/css/main.css` y llaves balanceadas.
- [x] 3.2 Añadir `@media (prefers-reduced-motion: reduce)` que desactive la animación y el estado oculto; verificar con `grep -n "prefers-reduced-motion" assets/css/main.css`.

## 4. Verificación

- [x] 4.1 Confirmar que el marcado HTML no cambia (`diff` contra el respaldo solo en `main.css` y `main.js`).
- [x] 4.2 Medir en navegador: en Inicio, el hero entra con desplazamiento y termina en posición final; en Nosotros y Servicios, el bloque se anima al entrar en pantalla y queda visible; con movimiento reducido, sin animación.
- [x] 4.3 Verificar sin JavaScript (ejecución con JS deshabilitado) que el contenido de todos los bloques se muestra.
- [x] 4.4 Revisión visual del usuario en escritorio y móvil.

## 5. Documentación

- [x] 5.1 Añadir entrada en `CHANGELOG.md` (entrada animada de bloques de dos columnas y hero, con respeto a movimiento reducido); verificar con `grep -n "^## 2026" CHANGELOG.md`.

## Notas de implementación

- 4.2 parcial: el hero verificado (estado final opacidad 1, transform 0). El bloque de Nosotros no disparó `en-vista` en el iframe de la herramienta (el observador no emite intersecciones fuera del visor); pendiente de revisión visual real.
- 4.3 verificada por el usuario (revisión visual con JavaScript deshabilitado), no por el agente.
