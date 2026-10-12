# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css`, `index.html`, `cursos/index.html` y `CHANGELOG.md` a `/tmp/opencode/respaldo-tarjetas-btn/`; verificar con `ls -la /tmp/opencode/respaldo-tarjetas-btn/`.

## 2. Botones apilados

- [x] 2.1 En `main.css`, redefinir `.card-acciones` (columna, stretch, gap 8px, `margin-top: auto`) y `.card-acciones .btn` (100%, peso 500, 1rem, nowrap, centrado); verificar con `grep -n -A6 "card-acciones" assets/css/main.css` y llaves balanceadas.
- [x] 2.2 Cambiar "Más información" por "+ Más información" en los 2 templates inline (`index.html`, `cursos/index.html`); verificar que ambos bloques quedan idénticos salvo rutas y que el botón WhatsApp no cambia (`diff` de los bloques).
- [x] 2.3 Confirmar con `diff` contra el respaldo que solo cambian esas líneas y que ningún otro `.btn` fuera de tarjetas cambia de estilo.

## 3. Verificación y documentación

- [x] 3.1 Revisar en navegador (desktop, 2 columnas y móvil) que los botones apilan al 100% en una línea sin desborde; verificar por observación.
- [x] 3.2 Añadir entrada en `CHANGELOG.md` (botones de tarjetas apilados, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
