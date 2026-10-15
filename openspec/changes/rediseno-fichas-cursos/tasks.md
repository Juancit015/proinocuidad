# Tasks

## 1. Respaldo y estilos de centrado

- [x] 1.1 Respaldar las 8 fichas de `cursos/*/index.html`, `tools/generar-fichas.mjs` y `assets/css/main.css` en `/tmp/opencode/respaldo-fichas-centradas/`, verificado con `ls` del respaldo
- [x] 1.2 Añadir estilos de ficha centrada en `assets/css/main.css` (bloques con ancho máximo de lectura centrados, hero centrado, pagos centrado) y verificar llaves balanceadas con conteo `{`/`}`
- [ ] 1.3 Ajustar la plantilla de `tools/generar-fichas.mjs` si el markup lo requiere (sin cambiar textos, orden ni enlaces) y verificar con `node --check`

## 2. Regeneración y verificación

- [ ] 2.1 Regenerar las 8 fichas con `node tools/generar-fichas.mjs` y verificar con `diff` contra el respaldo que solo cambió el layout esperado
- [ ] 2.2 Verificar con capturas en 1280 y 390 (ficha del diplomado y una ficha corta) que bloques, hero y logos de pago se ven centrados y sin desbordes
- [ ] 2.3 Registrar la entrada en `CHANGELOG.md` y verificar que menciona las 8 fichas y el centrado de pagos
