# Proposal

## Why

Aunque la decisión previa reservó el flyer de la edición ZOOM (19–21 de mayo) para la pestaña "En vivo" del listado de cursos, la verificación posterior del dueño del proyecto confirmó que **no existe en la fuente ninguna ficha "En vivo"**: las 8 fichas del documento base son de modalidad asíncrona, y esa edición del curso DIGESA/SENASA ya ocurrió (quedó en grabación). Mantener el flyer publicado en esa pestaña expone contenido inconsistente (fechas pasadas, 32 horas frente a las 40 horas de la ficha oficial) sin que exista hoy una oferta en vivo concreta.

## What Changes

- La pestaña "En vivo" de `cursos/index.html` **deja de mostrar el flyer ZOOM** y su texto de "Próximamente", y pasa a mostrar un aviso claro: "no hay cursos en vivo por el momento", señalando que los cursos disponibles están en la pestaña Asíncronos.
- **El flyer ZOOM deja de publicarse en el sitio** por ahora (no se muestra en ninguna página; el archivo permanece en el material fuente). Cuando el cliente genere el flyer asíncrono del curso DIGESA/SENASA, este incorporará a su tarjeta (pendiente operativo ya registrado en el change archivado).
- Las 8 fichas, el listado asíncrono y el resto del sitio **no cambian**.

## Capabilities

### New Capabilities

<!-- Ninguna: solo se modifica comportamiento existente. -->

### Modified Capabilities

- `cursos`: (1) el requisito "Pestañas de modalidad" ahora fija el contenido de la pestaña "En vivo" como aviso de ausencia (sin flyer); (2) el requisito "Tarjetas de curso con flyer" actualiza la excepción del curso DIGESA/SENASA: su flyer disponible NO se publica en ninguna pestaña hasta que exista un flyer asíncrono del cliente (antes se reservaba para "En vivo").

## Impact

- **Código:** solo `cursos/index.html` (contenido del panel "En vivo"). No hay cambios de estilos ni de datos.
- **Contenido:** el flyer `flyer-curso-04-haccp-digesa-senasca.webp` deja de estar referenciado (se conserva en `assets/img/` para uso futuro cuando haya ficha oficial en vivo del cliente).
- **Specs:** delta sobre la capacidad `cursos` (2 requisitos modificados).
- **Riesgo ninguno:** no hay enlaces ni botones que dependan del panel que cambia.
