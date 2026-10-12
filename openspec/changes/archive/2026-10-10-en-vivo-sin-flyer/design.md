# Design

## Context

Ver `proposal.md`. El change es mínimo: la pestaña "En vivo" del listado de cursos (`cursos/index.html`, panel `#panel-envivo`) muestra hoy un bloque `.proximamente` con título "Próximamente: cursos sincrónicos en vivo", un párrafo y el flyer ZOOM del curso DIGESA/SENASA (`flyer-curso-04-haccp-digesa-senasca.webp`), con su pie de foto.

## Goals / Non-Goals

**Goals:**
- Reemplazar el contenido del panel "En vivo" por un aviso de ausencia de cursos, con el mismo estilo visual (clase `.proximamente` existente, sin cambios de CSS).
- Retirar el flyer ZOOM del sitio (archive de la referencia en el HTML; el archivo queda en `assets/img/`).

**Non-Goals:**
- No se tocan los 8 cursos asíncronos, sus tarjetas ni fichas (la tarjeta del curso 4 sigue con su espacio de marca).
- No se elimina el archivo del flyer de `assets/img/` ni se modifica `assets/js/cursos-data.js`.
- No se crean nuevas páginas ni se cambia la navegación.

## Decisions

1. **Aviso textual exacto:** mantener el bloque con la clase actual `.proximamente`, la marca "EN VIVO" como etiqueta de pestaña, y como texto: "No hay cursos en vivo por el momento. Mantente atento: cuando haya nuevas cohortes en vivo las publicaremos aquí. Mientras tanto, revisa la oferta en la pestaña Asíncronos." — literal, sin datos de la edición pasada ni promociones.
   - Alternativa descartada: conservar el flyer como "edición pasada" — fue rechazada por el dueño (expone 32 h/fechas contrastantes con las 40 h oficiales).
2. **Sin cambios de CSS ni de JS:** el panel existe y las pestañas funcionan; solo cambia el contenido del `#panel-envivo`.
3. **La imagen del flyer no se borra del disco:** dejamos de referenciarla en HTML (búsqueda posterior de uso con el cliente).

## Risks / Trade-offs

- [Si el cliente lanza cursos en vivo pronto] → el aviso es neutro y no promete nada; reactivar contenido será un change nuevo con la ficha oficial.
- [El flyer queda sin usar] → se documenta aquí; la ficha in-Campus de la edición (19–21 mayo) no existe en la fuente, así que no había contenido publicable más allá del flyer.

## Migration Plan

Un solo cambio en página y una verificación estática post-edición (flyer sin referencias, aviso presente, enlaces intactos). Sin despleado especial: es edición de una página; se publica junto al ciclo normal.

## Open Questions

Ninguna que cambie el alcance: si el cliente quiere recuperar el flyer como"edición pasada" en el futuro, será un change nuevo con su ficha oficial.
