# Design

## Context

La navegación se comparte como HTML estático entre páginas. `.nav-toggle` alterna `.menu-abierto`; a 860px o menos, `.nav-menu` se posiciona absolutamente debajo de `.site-header`. Los enlaces padre de `.nav-drop` interceptan el primer toque para abrir el acordeón y permiten navegar con el segundo, lo que mezcla dos acciones en el mismo control. El mega panel conserva estilos de contenido de escritorio.

## Goals / Non-Goals

**Goals:**
- Dar al menú móvil una jerarquía visual propia, con filas cómodas para tocar y un cierre visible.
- Separar enlaces de destino de los botones que expanden Servicios y Cursos.
- Mantener intacto el diseño y comportamiento de escritorio.

**Non-Goals:**
- Cambiar destinos, etiquetas, contenido de los submenús o el umbral responsive de 860px.
- Convertir el panel en una navegación a pantalla completa o añadir dependencias.
- Rediseñar la cabecera o la barra superior.

## Decisions

- **Panel móvil desplegado debajo de la cabecera.** Usar el ancho del viewport disponible, fondo blanco, separación clara entre filas y sombra para distinguirlo del contenido. Un botón de cierre visible complementa el botón hamburguesa. Se conserva el posicionamiento relativo de `.site-header` que ya permite anclar el panel. Se elige sobre una pantalla completa para mantener el contexto de página y el patrón actual.
- **El enlace y el control «+» tienen acciones distintas.** Servicios y Cursos conservan sus enlaces directos. Un botón separado «+» controla cada acordeón móvil con `aria-expanded` y `aria-controls`; el panel abierto queda en el flujo del menú y usa una sola columna. El botón no navega ni cierra el panel.
- **Despliegue animado y accesible.** La tarjeta completa del menú entra y sale con recorte, opacidad y desplazamiento; el panel del acordeón anima su fila de cuadrícula y sus enlaces aparecen con un leve desplazamiento. El botón hamburguesa anima sus tres líneas a una «X». Las filas y tarjetas de submenú usan espacios compactos. El estado cerrado no conserva padding inferior. La media query `prefers-reduced-motion` elimina estas transiciones.
- **Estado sincronizado y cierre consistente.** El botón hamburguesa y el botón de cierre actualizarán `aria-expanded` y sus nombres accesibles. Escape cerrará panel y acordeones, y los enlaces de navegación cerrarán el panel. Al cruzar el breakpoint, se limpiará el estado móvil para no dejar clases de acordeón activas en escritorio.
- **Cambios sobre las páginas estáticas existentes.** Aplicar la misma estructura de controles a las plantillas HTML que contienen la navegación global. No hay evidencia de un generador único para toda la navegación; `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` cubren las fichas y listados de cursos, por lo que se debe comprobar si generan alguna copia del encabezado antes de editar páginas individuales.

## Risks / Trade-offs

- **Desincronización entre páginas estáticas** → localizar todas las páginas con `.nav-toggle` y actualizar la estructura de forma uniforme; comparar el encabezado final entre páginas.
- **Cambio accidental del comportamiento de escritorio** → limitar reglas de panel y acordeones al breakpoint móvil y conservar las reglas hover actuales.
- **Una sola columna aumenta la altura del menú** → mantener acordeones cerrados al abrir el panel y permitir cerrar el panel de forma visible o con Escape.
