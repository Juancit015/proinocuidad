# Tasks

## 1. Respaldo

- [x] 1.1 Respaldar las 4 subpáginas en `/tmp/opencode/respaldo-*/` y verificar con `cmp` que las copias son idénticas
- [x] 1.2 Releer el detalle de Sistemas, Normativa y Registro en `servicios/index.html` como base de texto y verificar los `id`, `<h1>` y canonical actuales de las 4 subpáginas con `grep`

## 2. Contenido visible por subpágina

- [x] 2.1 Mostrar el contenido BRCGS (alcance + referencia v9) como texto visible sin plegable y verificar que está en el HTML y no hay `<details>`
- [x] 2.2 Mostrar el contenido FSSC 22000 (alcance + normas ISO 9001/22000/FSSC/BRCGS) como texto visible y verificar que no hay `<details>` ni enlace al curso duplicado
- [x] 2.3 Mostrar el contenido HACCP (PPH + expediente Manual BPM/POES/PHS/Plan HACCP + implementación) como texto visible y verificar que no hay `<details>` ni pasos de trámite no confirmados
- [x] 2.4 Mostrar el contenido de registro sanitario (requisitos, revisión técnica, expediente + aclaración de autoridad) como texto visible y verificar que no hay `<details>` ni "menor tiempo posible" ni plazos

## 3. Verificación integral y registro

- [x] 3.1 Verificar en las 4 páginas que hay un solo `<h1>` con su keyword, canonical y JSON-LD `Service` intactos, con `grep` y `diff` contra el respaldo
- [x] 3.2 Verificar en escritorio y 390px que el contenido visible no desborda y que el CTA final sigue intacto
- [x] 3.3 Registrar la entrada en `CHANGELOG.md` (4 subpáginas ampliadas, fuente docx + agregados), sin commit ni push
