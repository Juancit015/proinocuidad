# Tasks

## 1. Campo País como desplegable

- [x] 1.1 Respaldar `tools/generar-fichas.mjs`, `assets/css/main.css` y 1 ficha en `/tmp/opencode/respaldo-select-pais/` y verificar con `ls` del respaldo que los archivos existen
- [x] 1.2 Cambiar en `formInscripcionBloque()` el input de País por `<select name="pais" autocomplete="country-name">` con opciones Perú (selected) y Extranjero, y verificar con `node --check tools/generar-fichas.mjs` que no hay errores de sintaxis

## 2. Estilo propio y regeneración

- [x] 2.1 Añadir en `assets/css/main.css` la regla `.form-inscripcion select` (misma base que inputs, `appearance: none` con flecha propia, `:focus` igual) y verificar llaves balanceadas con conteo `{`/`}`
- [x] 2.2 Regenerar las 8 fichas con `node tools/generar-fichas.mjs` y verificar con `diff` contra el respaldo que en cada ficha solo cambió el campo País
- [x] 2.3 Verificar con capturas en 1280 y 390 (diplomado + 1 ficha corta) que el desplegable muestra Perú por defecto, ofrece Extranjero, se ve integrado (sin estilo básico) y no hay desborde ni regresión del formulario

## 3. Registro

- [x] 3.1 Registrar la entrada en `CHANGELOG.md` (select de País Perú/Extranjero en las 8 fichas) y verificar que la menciona
