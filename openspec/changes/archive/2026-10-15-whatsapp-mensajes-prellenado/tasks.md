# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `tools/generar-fichas.mjs`, `tools/generar-listados.mjs` y los 12 HTML escritos a mano en `/tmp/opencode/respaldo-wa-mensajes/`, verificando el respaldo con `ls` y comparación de tamaño
- [x] 1.2 Confirmar que las 8 fichas, `index.html` y `cursos/index.html` salen byte-idénticas de los generadores actuales antes de tocarlos, para que el diff posterior solo muestre los mensajes

## 2. Mensajes en los generadores

- [x] 2.1 En `tools/generar-fichas.mjs`, añadir el mensaje al contacto directo del pie y al botón flotante usando `encodeURIComponent`, con el texto exacto del catálogo del design; verificar que las 8 fichas pasan de 3 a 5 enlaces con `?text=` sin cambiar rótulo ni icono
- [x] 2.2 En `tools/generar-listados.mjs`, componer el mensaje de la tarjeta "WhatsApp" con `encodeURIComponent` y el nombre largo del curso, igual que el `waInfo` de la ficha; verificar que los 12 botones de los dos listados llevan mensaje y nombran su curso
- [x] 2.3 Regenerar con ambos generadores y confirmar que los 8 enlaces ya con mensaje de las fichas no cambian de texto, y que el número sigue siendo `51981365982` en los 113 enlaces

## 3. Mensajes en el HTML escrito a mano

- [x] 3.1 Añadir el mensaje de contacto directo a los enlaces del teléfono de WhatsApp de la barra superior y del pie en las 12 páginas, en total 36 enlaces, con el texto ya codificado en el `href`
- [x] 3.2 Añadir el mensaje genérico al botón flotante "Envíanos un mensaje!" en las 12 páginas, idéntico en todas, y verificar con un script que las 12 cadenas coinciden carácter a carácter
- [x] 3.3 Mensajear los botones de asesoría: los 7 CTA "Solicitar asesoría por WhatsApp" (4 servicios con su nombre, inocuidad-alimentaria con su programa, nosotros con presentación) y los 5 "Solicitar asesoría" (4 hero-acciones con su servicio, el CTA final de servicios con el texto genérico)
- [x] 3.4 Mensajear los 2 enlaces del home que faltan: "Consultar por WhatsApp" del hero y el contacto del bloque final, y verificar que en `noticias/index.html` sus enlaces de contacto y su botón flotante quedan con mensaje

## 4. Verificación integral

- [x] 4.1 Comprobar con un script que los 113 enlaces de WhatsApp llevan `?text=`, que el número es `51981365982` en todos, que cada mensaje decodifica a una frase que empieza por "Hola" y que ninguno supera 130 caracteres
- [x] 4.2 Verificar que cada tarjeta de curso lleva el mismo mensaje en el home, en `cursos/index.html` y en su ficha, comparando las cadenas decodificadas
- [x] 4.3 Confirmar que el diff de las fichas y los listados solo cambia el parámetro `href`, sin tocar rótulo, icono, `target`, `rel`, precios ni contenido, y que el formulario de inscripción sigue intacto
- [x] 4.4 Registrar el cambio en `CHANGELOG.md` y copiar el catálogo de mensajes del design a `STRUCTURE.md` como referencia del proyecto

## Workflow follow-up

- Archivar el change y sincronizar la spec `contacto-whatsapp` cuando Juan confirme el resultado.
- Opcional, solo si el dueño lo pide: unificar el nombre del curso en los 32 mensajes ya existentes, que hoy mezclan `waCorto` y `waLargo`.