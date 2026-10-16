# Tasks

## 1. Fix de desborde en rango intermedio

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-ficha-intermedio/`, verificado con `ls` del respaldo
- [x] 1.2 Extender `min-width: 0` a los hijos de los grids de ficha, envolver `.pago-copiable` y `.pago-card-top`, apilar o envolver `.pago-qr-destacado` y colapsar `.pagos-grid-moderno` y `.metodologia-steps` en el rango 681–1040px de `assets/css/main.css`, y verificar llaves balanceadas con conteo `{`/`}`
- [x] 1.3 Verificar con capturas en 768 y 900 que la ficha no tiene desplazamiento horizontal (revisar tarjeta BBVA/CCI, bloque QR y temario), que en 1280 el layout de 2 columnas con sticky sigue intacto y que en 360/390 no hay regresión, y registrar la entrada en `CHANGELOG.md`
