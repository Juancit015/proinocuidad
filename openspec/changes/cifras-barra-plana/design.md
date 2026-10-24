# Design

## Context

La franja vive solo en `index.html`, entre el hero y "Servicios". Después del change archivado `cifras-home-tarjetas` muestra un H2, tres tarjetas con icono, fondo fotográfico con velo y elevación al pasar el puntero. El dueño pidió volver al formato de "mucho antes": una barra plana solo con texto y números. Ese formato existe verificado en el historial: el markup y el CSS de `2ed234e~1` (el commit anterior al código de las tarjetas) son la referencia exacta. Además, la spec vigente de `pagina-inicio` hereda los 10 escenarios que la versión con tarjetas escribió, y todos hay que re-escriturarlos al comportamiento plano.

## Goals / Non-Goals

**Goals:**
- Devolver la franja al estado verificado de `2ed234e~1`: markup y CSS idénticos, tomados del historial y no re-inventados.
- Dejar la spec coherente con lo que quedará publicado: los 10 escenarios de "Franja de cifras del Home" re-escritos para la barra plana, sin requisitos contradictorios.
- Borrar el activo de imagen que ya no se usa y no dejar reglas ni clases huérfanas.

**Non-Goals:**
- No se rediseña nada: ni nuevos breakpoints, ni una grilla mejorada, ni conservar el hover como opción.
- No se toca la barra de datos de las fichas de curso: `.ficha-stat-card`, `.stat-icono` y `.stat-info` quedan intactos porque otra spec los exige.
- No se tocan `assets/js/main.js` ni los generadores: el freno de los flotantes y las fichas no dependen de `.cifras`.

## Decisions

- **Restaurar el markup literal de `2ed234e~1`, no reescribirlo.** El bloque es: `section.cifras` con `aria-label="Cifras de Proinocuidad"` + `.container` con tres pares `<strong>/<span>`. Es el estado que el dueño llama "mucho antes" y que ya se verificó en su día; cualquier variante propia añadiría comportamientos que no se pidieron.
- **Restaurar el CSS literal de las cinco líneas + media de 1020px.** `.cifras` con `padding: 26px 0`, grilla de 3 columnas en `.container` con gap de 18px y texto centrado, `.cifras strong` a 1.7rem en `--rojo`, `.cifras span` a 0.88rem en `--gris`, y `.cifras .container { grid-template-columns: repeat(2, 1fr); }` en `@media (max-width: 1020px)`. No existían más breakpoints: el móvil veía 2 columnas y así queda.
- **Los 10 escenarios actuales re-escritos con el mismo nombre.** El validador exige que el bloque MODIFIED conserve todo escenario vigente; los seis que describían tarjetas, H2, foto y la fila de 820px se re-escrituran hacia el comportamiento plano (por ejemplo, "Título de la sección" pasa a exigir la ausencia del H2 y el uso del `aria-label`). Conservar el nombre evita dejar escenarios huérfanos cuyo objetivo ya no existe.
- **Borrar `assets/img/cifras-fondo.avif` y no dejarlo sin uso.** Solo lo usaba el velo de esta franja; dejarlo en el repo dejaba un activo muerto. La foto original sigue en las descargas del dueño si algún día se retoma el fondo.
- **Sin regla de una columna en móvil.** La versión de "mucho antes" no la tenía, y volver a añadir una sería la clase de mejora discreta que este change evita. Si al verla el dueño la pide, será otro change.

## Risks / Trade-offs

- [Riesgo] Quitar el H2 le quita a la franja su único encabezado: la sección queda identificada solo por el `aria-label` → Mitigación: es exactamente el estado verificado previo; el `<title>`, la meta y el H1 de la página no cambian, y el escenario "Conservación del SEO" lo re-escritura.
- [Riesgo] En móvil se ven 2 columnas con la tercera sola en una fila, lo que puede parecer descuidado → Mitigación: es el comportamiento que el dueño pidió ("como era mucho antes"); el escenario "Franja legible en móvil" lo define y se verifica a 390px.
- [Riesgo] El valor grande a 1.7rem en un móvil de 390px podría empujar el ancho → Mitigación: el histórico era así, la etiqueta envuelve a otra línea y la verificación mide 0px de desborde.
- [Trade-off] Revertir el change archivado retira su trabajo visual del Home aunque siga en el historial → es lo que pide el dueño; el historial de git conserva lo anterior y la spec queda coherente con lo publicado.

## Migration Plan

Sitio estático: publicar `index.html` y `assets/css/main.css` junto con la baja de `assets/img/cifras-fondo.avif`. Revertir el commit devuelve el Home con tarjetas; no hay datos, URLs ni caché relevantes más allá del despliegue.

## Open Questions

(none)
