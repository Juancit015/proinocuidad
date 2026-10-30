# Design

## Context

La búsqueda (`buscar()` en `verifica-tu-certificado.html`) ya devuelve el arreglo completo de coincidencias y `renderResultados()` dibuja una tarjeta por elemento — el caso de Nelly ya llega a render como lista de 2 (la 5ª ronda de Juan de 2026-10-29 fijó la igualdad exacta de DNI). El canal de avisos bajo el input (`.verifica-aviso`) es rojo y está reservado a errores de validación, "sin resultados" y fallo de carga; su contenido se gestiona por `textContent` y se reemplaza entre estados. Los estilos de verificación viven en `assets/css/main.css` (bloque `verifica-*`, alrededor de `main.css:1916`).

## Goals / Non-Goals

**Goals:**
- Un contenedor informativo condicional entre la carga de resultados y la pila de tarjetas, visible solo con >1 coincidencia y texto con el conteo.
- Que el flujo de estados siga siendo único: cada búsqueda limpia resultados (y el encabezado) antes de renderizar.

**Non-Goals:**
- No agrupar ni colapsar tarjetas, no añadir filtros ni pestañas por persona/programa.
- No tocar `certificados.json`, ni su generador, ni la vía por código.
- No reutilizar el canal rojo de avisos para esto: es información, no error.

## Decisions

1. **Encabezado como elemento dentro de `renderResultados()`, no como otro canal de avisos.** Se añade un `<p class="verifica-resumen" role="status">` como primer hijo de la zona de resultados, renderizado solo si `items.length > 1`. Alternativa descartada: reusar el aviso bajo el input — contaminaría un canal reservado a errores (rojo) y rompería los escenarios "estados que no se mezclan" ya specificados. Con `role="status"` queda anunciado lectores de pantalla sin competir con el `aria-live` del canal de errores.
2. **Texto diferenciado por vía.** "Encontramos N certificados para tu DNI" cuando la consulta es numérica; "…para tu consulta" en la vía de nombre. La función de búsqueda ya sabe qué vía eligió (`esCredencial`): se pasa como parámetro al render, sin recalcular.
3. **CSS neutro propio (`.verifica-resumen`) en `main.css`.** Sin transiciones ni animaciones — un elemento estático no obliga a tocar el bloque de `prefers-reduced-motion` —, sin `overflow-x` global ni `z-index` nuevos, sin pseudo-elementos posicionados. Fondo con la línea del sistema (`--gris-linea #e3e5ee`) para distinguirse del aviso rojo y de las tarjetas, texto con los colores de marca existentes.
4. **Limpieza en el mismo punto que las tarjetas.** El contenedor de resultados ya se vacía con `resultados.innerHTML = ''` antes de cada render; al vivir el encabezado dentro de esa zona se limpia sin lógica adicional.

## Risks / Trade-offs

- [El encabezado muestra un texto construido con la consulta del usuario] → El encabezado usa `textContent` (o el mismo `escapeHtml` de las tarjetas); nunca html interpolado con la query cruda.
- [A 390 px el agregado puede reorganizar el bloque de resultados] → Se verifica con el arnés Playwright a 390 px y a 1280 px: encabezado visible, las dos tarjetas tras el scroll central, mismas reglas del spec `diseno-responsive` (cambios solo de CSS/JS de presentación, contenido inalterado).
- [El caso de prueba es único en los datos (28 registros, solo 1 DNI duplicado)] → Se prueba además la vía de nombre con consultas que devuelvan varias tarjetas si el cliente emite más certs similares, y en el arnés con un JSON local aumentado (dos fichas fabricadas) — el spec es genérico y la prueba no depende del caso real.
