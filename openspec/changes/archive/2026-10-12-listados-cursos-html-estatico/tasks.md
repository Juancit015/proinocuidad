# Tasks

## 1. Marcadores y generador

- [x] 1.1 Agregar marcadores `generar-listados:inicio/fin` dentro de `#lista-cursos` y `#cursos-destacados` sin cambiar su contenido visible, y verificar que ambas páginas se ven igual que antes en el navegador
- [x] 1.2 Crear `tools/generar-listados.mjs` con la plantilla `tarjetaCurso(c, prefijo)` que replica el markup actual (incluida la excepción de flyer DIGESA/SENASA) y verificar con `node --check tools/generar-listados.mjs` que no hay errores de sintaxis
- [x] 1.3 Ejecutar `node tools/generar-listados.mjs` y verificar idempotencia ejecutándolo dos veces y comprobando que la segunda no cambia ningún byte

## 2. Página Cursos

- [x] 2.1 Generar las 8 tarjetas en `#lista-cursos` y verificar sin JavaScript (deshabilitado) que se ven nombre, modalidad, certificación, inversión, flyer/bloque marca y botones, con un enlace a cada ficha `cursos/<slug>/index.html`
- [x] 2.2 Retirar solo el bloque JS constructor de tarjetas conservando `activar()` y listeners de pestañas, y verificar que Asíncronos/En vivo conmutan y el listado conserva sus 8 tarjetas

## 3. Página Inicio

- [x] 3.1 Generar las 4 tarjetas con `enHome: true` en `#cursos-destacados` y verificar sin JavaScript que se ven flyer, nombre, modalidad, horas, inversión y botones, con enlace `cursos/<slug>/index.html` por cada una
- [x] 3.2 Retirar el IIFE constructor de destacados y verificar que el Inicio carga sin errores en consola y la sección "Cursos destacados" sigue visible con sus 4 tarjetas

## 4. Verificación integrada

- [x] 4.1 Comparar el DOM de tarjetas antes/después (texto, atributos `src`/`href`, clases) y verificar que no hay diferencias salvo el origen estático vs JS
- [x] 4.2 Registrar en `CHANGELOG.md` la entrada del change con archivos tocados y comando de regeneración, y verificar que `node tools/generar-listados.mjs` deja el árbol sin cambios pendientes
