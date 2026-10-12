# Tasks

## 1. Ajuste de la pestaña "En vivo" (cursos/index.html)

- [x] 1.1 Reemplazar el contenido del panel `#panel-envivo` de `cursos/index.html`: retirar el flyer (`assets/img/flyer-curso-04-haccp-digesa-senasca.webp`), su pie de foto y el texto "Próximamente", dejando el aviso textual definido en design.md ("No hay cursos en vivo por el momento…"), conservando el estilo `.proximamente` y el mensaje final que remite a la pestaña Asíncronos. Verificar: el panel renderiza el aviso y el flyer no aparece en la página.
- [x] 1.2 Verificación estática del sitio tras el edición: ninguna página referencia `flyer-curso-04-haccp-digesa-senasca.webp` (rastreo de src/href, excluyendo la carpeta del material fuente), el rastreo de enlaces internos sigue sin 404 y los 8 cursos siguen listados en la pestaña Asíncronos. Verificar con el script de rastreo y un grep del nombre del flyer.
