# Tasks

## 1. Respaldo y base

- [x] 1.1 Respaldar `assets/css/main.css` y verificar con `cmp` que la copia es idéntica
- [x] 1.2 Registrar los valores actuales (`clamp(360px, 55vh, 520px)` y `clamp(2.4rem, 4vw, 3.2rem)`) y verificar llaves balanceadas

## 2. Reducción del 15%

- [x] 2.1 Cambiar a `clamp(306px, 46.75vh, 442px)` y `clamp(2.04rem, 3.4vw, 2.72rem)` en el bloque `@media (min-width: 861px)` y verificar que overlay, attachment y breakpoint quedan intactos
- [x] 2.2 Verificar en Nosotros a 1440px y 1024px que el banner queda compacto, el título respira y el móvil no cambia

## 3. Registro

- [x] 3.1 Verificar con `git diff` que solo cambió `assets/css/main.css` (dos líneas) y registrar en `CHANGELOG.md`, sin commit ni push
