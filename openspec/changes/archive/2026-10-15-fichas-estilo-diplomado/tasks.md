# Tasks

## 1. Portar layout al generador y regenerar fichas

- [x] 1.1 Respaldar `tools/generar-fichas.mjs` y `cursos/*/index.html` en `/tmp/opencode/respaldo-fichas-estilo/`, verificado con `ls` del respaldo, y capturar la ficha actual del diplomado en 1280 y 390 como referencia visual
- [x] 1.2 Portar el layout moderno del diplomado a la plantilla `ficha()` y bloques compartidos de `tools/generar-fichas.mjs` (stats, sidebar sticky con flyer/precios/CTAs/incluidos, tarjetas de pago modernas + QR), con parámetros por curso y secciones opcionales condicionales, y verificar sintaxis con `node --check`
- [x] 1.3 Regenerar las 8 fichas con el generador, verificar equivalencia visual del diplomado contra la referencia (capturas 1280 y 390) y revisar las 7 fichas cortas en 1280 y 390 (contenido propio, sin desborde horizontal), y registrar la entrada en `CHANGELOG.md`
