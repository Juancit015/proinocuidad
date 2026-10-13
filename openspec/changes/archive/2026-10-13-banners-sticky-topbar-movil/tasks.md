# Tasks

## 1. Respaldo y base

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-*/` y verificar con `cmp` que la copia es idéntica
- [x] 1.2 Registrar que la barra se muestra siempre y los banners usan scroll, y verificar que el CSS actual no tiene errores de llaves

## 2. Barra superior oculta en móvil

- [x] 2.1 Añadir `.topbar { display: none; }` en el media query ≤860px existente de `assets/css/main.css` y verificar que la regla queda dentro de ese bloque y no afecta al escritorio
- [x] 2.2 Verificar que el teléfono y correo siguen presentes en el footer de las páginas principales

## 3. Fondo fijo en banners

- [x] 3.1 Añadir `background-attachment: fixed` en regla compartida para las 4 variantes `.page-head--*` y verificar que el Hero y las fichas no usan esas clases
- [x] 3.2 Añadir las excepciones con `scroll` en ≤860px y bajo `prefers-reduced-motion`, y verificar que las llaves del CSS quedan balanceadas

## 4. Verificación integrada y registro

- [x] 4.1 Verificar la página Cursos como referencia: banner con fondo fijo en escritorio, barra oculta y banner estático en 390px, un solo `<h1>` y sin enlaces rotos
- [x] 4.2 Verificar con `git status`/`git diff` que solo cambió `assets/css/main.css` (sin HTML, metadatos ni producción)
- [x] 4.3 Registrar el cambio en `CHANGELOG.md` y verificar que la entrada describe lo implementado
