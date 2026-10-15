# Tasks

## 1. Eliminar el aire pre-footer de la ficha

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-prefooter/`, verificado con `ls` del respaldo, y medir el aire actual con captura en 1280 (distancia entre el botón "Enviar inscripción" y el footer)
- [ ] 1.2 Aislar la causa por bisección (ocultar secciones de a una con capturas hasta que el aire desaparezca) y aplicar el ajuste mínimo en `assets/css/main.css` (o en `tools/generar-fichas.mjs` + regenerar si la causa es markup), verificando llaves balanceadas y `node --check` donde aplique
- [ ] 1.3 Verificar con capturas en 1280 y 390 que el aire quedó en la separación coherente (~70px), que el sticky, los fixes de desborde y el formulario siguen intactos, y registrar la entrada en `CHANGELOG.md`
