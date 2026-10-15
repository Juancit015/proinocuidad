# Tasks

## 1. Diagnóstico de la banda derecha

- [x] 1.1 Respaldar `assets/css/main.css`, `tools/generar-fichas.mjs` y 1 ficha (diplomado) en `/tmp/opencode/respaldo-desborde-general/` y verificar con `ls` del respaldo que los archivos existen
- [x] 1.2 Medir el desborde real por ancho en la ficha del diplomado (360, 390, 768, 900, 1280): registrar por ancho si hay scroll horizontal y cuántos px desborda (si no hay overflow en ningún ancho, reportarlo y no forzar CSS: el caso vuelve a `rediseno-fichas-cursos`)
- [x] 1.3 Aislar al culpable por bisección (ocultar bloques de a uno: sidebar, stats, beneficios, temario, metodología, pagos/CCI/QR, formulario, hero) con capturas hasta que la banda desaparezca, y verificar llaves balanceadas si se inspecciona el CSS

## 2. Fix mínimo y verificación

- [x] 2.1 Aplicar el ajuste mínimo de contención sobre el culpable en `assets/css/main.css` (o en `tools/generar-fichas.mjs` + `node tools/generar-fichas.mjs` solo con causa de markup probada) y verificar con `node --check` donde aplique y conteo de llaves `{`/`}` balanceadas
- [x] 2.2 Verificar con capturas en 360, 390, 768, 900 y 1280 (diplomado + 1 ficha corta) que no hay scroll horizontal ni banda derecha, que en 1280 el layout de 2 columnas con sticky sigue intacto y en ≤1040px el apilado se conserva

## 3. Registro

- [x] 3.1 Registrar la entrada en `CHANGELOG.md` (culpable, ajuste y anchos verificados) y verificar que menciona las 8 fichas o el alcance real del fix
