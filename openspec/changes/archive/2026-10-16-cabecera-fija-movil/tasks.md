# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `assets/css/main.css` en `/tmp/opencode/respaldo-cabecera-fija/`, verificando el respaldo con `ls` y comparación de tamaño
- [x] 1.2 Confirmar con `git status --short` y `git diff` qué cambios sin commitear hay en el árbol, y anotar cuáles son ajenos a este change, para no atribuírselos ni sobrescribirlos

## 2. Hacer la cabecera fija en móvil

- [x] 2.1 Eliminar de `assets/css/main.css` la línea `.site-header { position: relative; }` dentro del bloque `@media (max-width: 860px)`, y verificar que el diff del archivo contiene únicamente esa eliminación
- [x] 2.2 Comprobar que la regla base de `.site-header` sigue diciendo `position: sticky` y que no queda ninguna otra regla que lo condicione por ancho
- [x] 2.3 Verificar que las llaves del CSS siguen balanceadas y que el panel del menú móvil conserva intacto su `position: absolute; top: 100%` y su `max-height: calc(100dvh - 76px)`

- [x] 2.4 Añadir en `assets/css/main.css` la regla `[id] { scroll-margin-top: 84px; }` para que los destinos de anclas internas queden por debajo de la cabecera de 76px, y verificar con una medición en navegador a 390px que el ancla `#form-inscripcion` deja de quedar tapada

## 3. Verificación del menú móvil y del scroll

- [x] 3.1 Comprobar que `<html>` y `<body>` no tienen `overflow: hidden`, que es lo que rompería el sticky, y dejarlo registrado en el CHANGELOG
- [x] 3.2 Revisar en móvil a 390px que la cabecera permanece fija al desplazarse, que el botón hamburguesa sigue visible sin volver al inicio, y que el panel del menú se abre y se cierra con normalidad anclado debajo de la cabecera
- [x] 3.3 Revisar en escritorio que el mega menú sigue funcionando igual que antes, sin ningún cambio en su apertura por hover
- [x] 3.4 Comprobar con medición real en navegador que los anclas internos no quedan bajo la cabecera: medido `tapada_px=76` antes de la corrección y `tapada_px=0` después, tanto a 390px como a 1280px, sobre `#form-inscripcion` de una ficha y las cuatro secciones de Servicios

## 4. Documentación

- [x] 4.1 Registrar el cambio en `CHANGELOG.md` indicando que la cabecera pasa a ser fija también en móvil, que el motivo que impedía sticky en móvil ya no aplicaba porque `sticky` también es un valor posicionado, y que los 76px fijos son un coste consciente
- [x] 4.2 Anotar en la entrada del CHANGELOG que el escenario "móvil sin cabecera flotante" conserva su nombre por exigencia del validador de specs, aunque su contenido ya describe la cabecera fija, para que quien edite esa spec a mano pueda renombrarlo

## Workflow follow-up

- Archivar el change y sincronizar la spec `navegacion-global` cuando Juan confirme el resultado visual.
- Opcional, solo si los 76px resultaran incómodos: un change aparte con la variante "compacta al hacer scroll", que requiere JavaScript y un segundo diseño de la cabecera.