# Tasks

## 1. Antes de tocar nada

- [x] 1.1 Confirmar con `git status` que el árbol está limpio y con `grep -c '<loc>' sitemap.xml` que el mapa tiene 18 URLs. Esa cifra es la referencia para comprobar más adelante que el 404 no se coló dentro
- [x] 1.2 Ejecutar `node tools/generar-fichas.mjs` y comprobar con `git status --short` que no aparece ninguna modificación bajo `cursos/`. Sirve para demostrar que el generador actual es idempotente: si ya modificara fichas, no se podría usar ese `git status` como verificación después. Si apareciera alguna, parar aquí y explicar por qué antes de seguir

## 2. El prefijo de rutas en el generador

- [x] 2.1 Contar las apariciones de `../../` en `tools/generar-fichas.mjs` y apuntarlas todas. Es el inventario de lo que hay que parametrizar, y en este repo ya ha pasado que una regla de cinco clases anula en silencio a otra de una, así que conviene tener el número delante
- [x] 2.2 Convertir la navegación del generador en una plantilla que reciba un prefijo de ruta: las fichas pasan `"../../"` y el 404 pasará `""`. Los sitios a tocar son el logo, `assets/css/main.css`, `assets/js/main.js`, cada enlace del menú y cada entrada de los dos desplegables
- [x] 2.3 Ejecutar el generador y comprobar con `git status --short` que **ninguna** ficha bajo `cursos/` aparece como modificada. Si aparece alguna, el prefijo está mal calculado y hay que corregirlo antes de seguir
- [x] 2.4 Abrir una ficha en el navegador y seguir el logo, la hoja de estilos y dos enlaces del menú, comprobando que resuelven sin error. Es la revisión humana de lo que `git status` no puede ver

## 3. La página de error

- [x] 3.1 Hacer que el generador escriba `404.html` en la raíz, con el prefijo vacío, reutilizando la cabecera, el menú y el pie que ya emite para las fichas
- [x] 3.2 Componer el cuerpo con clases que ya existen: `.hero` para el mensaje, `.container` y `.btn` más `.btn-azul` o `.btn-blanco` para los botones. No añadir ninguna regla a `assets/css/main.css`, y comprobarlo con `git status` al terminar
- [x] 3.3 Poner un `<h1>` que diga que la página no existe, un `<title>` propio, y como rutas de salida un enlace a Inicio y otro a Contacto. Verificar que ambas rutas existen de verdad antes de escribirlas
- [x] 3.4 Añadir en el `<head>` `<meta name="robots" content="noindex, follow">` y `<link rel="canonical" href="https://proinocuidad.com/404.html">`. El canonical es inocuo y es lo que exige `seo-base` para cualquier página HTML del sitio

## 4. Lo que el 404 no debe hacer

- [x] 4.1 Confirmar que el menú de `404.html` no contiene ninguna entrada que apunte a `404.html`. Ninguna entrada
- [x] 4.2 Confirmar que `sitemap.xml` sigue con 18 entradas y que ninguna es `/404.html`, y que `robots.txt` no ha cambiado
- [x] 4.3 Servir el sitio con `python3 -m http.server 8899 --bind 127.0.0.1` y abrir `http://127.0.0.1:8899/404.html`. En este servidor de desarrollo el archivo se verá siempre, porque el 404 de verdad depende del hosting y aquí no se puede probar. Comprobar en esta pasada el aspecto y el comportamiento del menú desplegable, no el estado HTTP
- [x] 4.4 Pedir una ruta que no existe y anotar en el CHANGELOG que en local sale el listado de archivos del servidor, no la página, para que nadie lo confunda con un fallo del trabajo

## 5. Documentación

- [x] 5.1 Entrada en `CHANGELOG.md` con la fecha de hoy, sección `Added`, explicando que se crea `404.html`, que lo emite el generador y que **no** se añade al sitemap ni al menú
- [x] 5.2 Anotar en `STRUCTURE.md` que `404.html` es un archivo generado y que se edita en `tools/generar-fichas.mjs`, no en el archivo
- [x] 5.3 Añadir a `AGENTS.md`, en la sección de ficheros generados, que el 404 también sale del generador y que el prefijo de ruta es el punto a revisar si algún enlace se rompe
- [x] 5.4 Dejar anotado en `AGENTS.md`, en la sección de pendientes que morirán al publicar, que hay que **comprobar que el hosting sirve `404.html` con estado 404**, porque el repositorio no tiene configuración de servidor y sin ella la página puede no mostrarse nunca

## Workflow follow-up

- Archivar el change y sincronizar `pagina-404` cuando el dueño lo revise.
- **Pendiente de la publicación, no de este change:** comprobar que el hosting devuelve estado 404 y sirve `404.html` en lugar de su propia página de error. Si al publicar el hosting resulta ser Apache o nginx sin configuración, hará falta un `.htaccess` con `ErrorDocument 404 /404.html`, y eso sería un change aparte porque no se sabe todavía qué hosting se va a usar.
- Sin relación con este change, pero conviene no perderlo de vista: `llms-para-agentes` sigue activo y también toca `seo-base`. Este change no lo ha modificado a propósito, para que los dos puedan archivarse en cualquier orden.