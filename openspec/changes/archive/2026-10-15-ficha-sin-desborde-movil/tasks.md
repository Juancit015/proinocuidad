# Tasks

## 1. Fix de desborde en móvil

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-ficha-nodesborde/`, verificado con `ls` del respaldo
- [x] 1.2 Añadir `min-width: 0` a los hijos de los grids de ficha, `flex-wrap` + `word-break` a `.pago-copiable` y padding reducido a `.modulo-lista` en el media ≤680px de `assets/css/main.css`, y verificar llaves balanceadas con conteo `{`/`}`
- [x] 1.3 Verificar con capturas en 360 y 390 que la ficha no tiene desplazamiento horizontal (revisar tarjeta BBVA/CCI y temario) y que en 1280 el sticky del sidebar sigue funcionando, y registrar la entrada en `CHANGELOG.md`
