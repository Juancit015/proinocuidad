# Tasks

## 1. Respaldo

- [x] 1.1 Respaldar `nosotros/index.html` y `assets/css/main.css` en `/tmp/opencode/respaldo-nosotros-ver-mas/` y verificar con `cmp`

## 2. Contenido y estructura

- [x] 2.1 Añadir en `nosotros/index.html`, dentro de la columna de texto de la sección `.identidad` "Quiénes somos" y después del último párrafo existente, un `<details class="nosotros-ampliar">` con `<summary>Ver más</summary>` y el texto aportado por Juan en un `<p>`
- [x] 2.2 Verificar que los párrafos existentes (razón social, RUC, fundación, Capacitación, Consultoría) no cambian (`diff` limitado al bloque nuevo)

## 3. Estilos

- [x] 3.1 Añadir en `assets/css/main.css` las reglas `.nosotros-ampliar` y su `summary` (color de marca, cursor, foco visible, marcador reemplazado por chevron), sin nuevos colores de marca
- [x] 3.2 Verificar llaves balanceadas y que no hay reglas que afecten a otras secciones

- [x] 3.3 Convertir el "Ver más" en botón con recuadro e ícono de ojo (abierto/cerrado), sin chevron
- [x] 3.4 Animar apertura y cierre del desplegable en `assets/js/main.js` (suave, respeta `prefers-reduced-motion`)

## 4. Verificación

- [x] 4.1 Comprobar en escritorio y a 390px: el control se ve, se despliega y se pliega, sin desborde horizontal
- [x] 4.2 Verificar un único `<h1>`, canonical sin cambios y que el texto complementario está en el HTML
- [x] 4.3 Registrar la entrada en `CHANGELOG.md`, sin commit ni push
