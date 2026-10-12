# Tasks

## 1. Respaldo

- [x] 1.1 Copiar `assets/css/main.css` y `CHANGELOG.md` a `/tmp/opencode/respaldo-radio-btn/`; verificar con `ls -la /tmp/opencode/respaldo-radio-btn/`.

## 2. Radio global 4px

- [x] 2.1 En `main.css`, añadir el bloque global (`.btn:not(.redes-sociales a)`, `.pestanas button`, `.btn-aula-nav` + override `!important`, `.mega-panel .mega-cta`, `button/input[type="submit"]`); verificar con `grep -n "Radio global" -A8 assets/css/main.css` y llaves balanceadas.
- [x] 2.2 Confirmar con `diff` que solo se añade el bloque y que `.redes-sociales a`, flotantes, insignias y tarjetas conservan su radio (`grep -n "border-radius: 50%\|999px" assets/css/main.css` solo en excluidos).

## 3. Verificación y documentación

- [x] 3.1 Revisar en navegador que botones, pestañas y mega-menú muestran 4px y los círculos/insignias no cambian; verificar por observación.
- [x] 3.2 Añadir entrada en `CHANGELOG.md` (radio global 4px, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.
