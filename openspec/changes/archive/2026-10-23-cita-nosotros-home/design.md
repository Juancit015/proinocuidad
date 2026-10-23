# Design

## Context

Cambio acotado a la presentación de una cita existente en el Home (`index.html`, sección `identidad`/Nosotros). La cita hoy es un `<p><em>"..."</em></p>` sin separación visual. No hay cross-cutting, ni nueva dependencia, ni complejidad de migración: solo markup y CSS.

## Goals / Non-Goals

**Goals:**
- Que la cita se perciba como tal (blockquote con borde lateral y comillas tipográficas).
- Separarla del párrafo anterior con un margen superior mayor.
- Mantener el texto exacto y el resto de la sección intactos.

**Non-Goals:**
- No cambiar el texto de la cita ni de la sección.
- No tocar `nosotros/index.html` ni otras páginas (el cambio es solo en el Home).
- No modificar la paleta ni los estilos de otros bloques.

## Decisions

- **`<blockquote class="cita-nosotros">` en lugar de `<p><em>`**: semántica correcta para una cita y permite estilado dedicado. Alternativa considerada: mantener `<p>` y añadir una clase; descartada porque no transmite semántica y mezcla con los párrafos corridos.
- **Comillas tipográficas + borde lateral izquierdo**: dos señales de que es una cita, para que se perciba incluso sin CSS (las comillas ya están en el texto). El rótulo "Cita" se descartó porque resultaba redundante con las comillas y añadía ruido visual. Alternativa considerada: mantener el rótulo "Cita"; descartada tras ver el resultado renderizado.
- **Margen superior ≈ 1.25rem**: suficiente para separar del párrafo anterior sin romper el ritmo vertical. Alternativa: margin mayor (2rem); descartada por exceso de espacio.
- **Color de acento del borde lateral**: `--rojo` (acento institucional), para distinguir la cita del texto azul/gris.

## Risks / Trade-offs

- [Riesgo] La cita podría desbordar en móvil si el margen/borde no se ajusta → Mitigación: verificar a 390px con Playwright y ajustar si hace falta.
- [Riesgo] La cita podría resultar poco distinguible del texto corrido → Mitigación: borde lateral en --rojo y comillas tipográficas; verificado visualmente a 390 y 1024px.

## Open Questions

(none)