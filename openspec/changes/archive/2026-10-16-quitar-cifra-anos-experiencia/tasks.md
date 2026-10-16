# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `index.html`, `nosotros/index.html` y `assets/css/main.css` en `/tmp/opencode/respaldo-cifra-anos/`, verificando el respaldo con `ls` y comparación de tamaño
- [x] 1.2 Confirmar con `git status --short` que el árbol está limpio antes de empezar, para que el diff final contenga solo este cambio

## 2. Quitar la cifra del Home

- [x] 2.1 Borrar de `index.html` la tarjeta `<div><strong>3</strong><span>años de experiencia</span></div>` de la sección `.cifras` y verificar que la franja queda con exactamente tres tarjetas
- [x] 2.2 Comprobar que las otras tres cifras siguen intactas y en el mismo orden: "+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública"

## 3. Ajustar el grid de la franja

- [x] 3.1 Cambiar en `assets/css/main.css` la regla `.cifras .container` de `grid-template-columns: repeat(4, 1fr)` a `repeat(3, 1fr)`, y verificar que el diff de `main.css` contiene solo esa línea
- [x] 3.2 Revisar el punto de quiebre de ≤1020px y confirmar que las tres cifras se reparten en dos columnas más una sin desbordarse del ancho visible, sin necesidad de reglas nuevas

## 4. Quitar la afirmación de Nosotros

- [x] 4.1 Reescribir en `nosotros/index.html` la frase "Con 3 años de experiencia y más de 1000 personas capacitadas, ayudamos a…" para que quede "Con más de 1000 personas capacitadas, ayudamos a…", conservando el resto del párrafo sin cambios
- [x] 4.2 Verificar que la fecha de fundación "29 de octubre del 2023" sigue visible en la misma página y que ninguna otra línea del párrafo se alteró

## 5. Verificación integral

- [x] 5.1 Confirmar con `grep -ri "años de experiencia" .` que no queda ninguna aparición de la afirmación en todo el sitio, y revisar que no se arrastró a specs ni al CHANGELOG como texto visible
- [x] 5.2 Verificar que el SEO de las dos páginas quedó intacto: `<title>`, meta description, canonical, un solo `<h1>` por página y HTML balanceado
- [x] 5.3 Revisar visualmente el home en escritorio, tableta y móvil que la franja de tres cifras se ve centrada, sin huecos y sin desborde
- [x] 5.4 Registrar el cambio en `CHANGELOG.md` indicando qué se quitó, que las otras tres cifras no se tocaron y que el grid pasó a tres columnas

## Workflow follow-up

- Archivar el change y sincronizar las specs `pagina-inicio` y `pagina-nosotros` cuando Juan confirme que el resultado visual es el esperado.
- Revisar con el dueño si "1000 personas capacitadas" es un dato vigente; queda fuera de este change, pero es la única cifra restante que depende de un conteo.