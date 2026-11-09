# Design

## Context

El nav se genera en dos lugares: el template `cabecera()` de
`tools/generar-fichas.mjs` (escritorio línea ~664 y acordeón móvil ~696) y
a mano en las páginas no generadas (inicio, nosotros, servicios, noticias,
cursos, 404, fichas). "Aula Virtual" usa la clase `.btn-aula-nav`, una
píldora azul con icono SVG, definida en `assets/css/main.css`. "Verifica tu
certificado" es hoy un enlace de texto plano. El CSS ya excluye
`.btn-aula-nav` del subrayado rojo y de los pseudo-elementos de hover.

Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Dar a "Verifica tu certificado" un tratamiento de botón píldora comparable
  al de "Aula Virtual", con color diferenciado.
- Mantener la generación reproducible: el generador debe reproducir exactamente
  lo editado a mano (regla del proyecto).
- No romper el responsive ni el acordeón móvil.

**Non-Goals:**
- No cambiar el texto, la ruta ni el comportamiento (sigue abriendo la misma
  página en la misma pestaña).
- No rediseñar el resto del nav ni el footer (el footer mantiene el enlace
  de texto).
- No añadir animaciones nuevas.

## Decisions

**Decisión 1 — Nueva clase `.btn-verifica-nav` en lugar de reutilizar
`.btn-aula-nav`.**
Razón: dos CTAs idénticos se confundirían y competirían. Un color distinto
(rojo de marca) permite distinguirlos de un vistazo y aprovecha la paleta
existente (`--rojo`). Alternativa descartada: reutilizar `.btn-aula-nav` y
cambiar solo el icono — descartada porque todos los botones quedarían azules
y "Verifica tu certificado" no llamaría la atención.

**Decisión 2 — Icono de verificación (escudo con check).**
Razón: coherente con la función de la página y con la iconografía del sitio
(SVG inline, 18px, `stroke="currentColor"`). Alternativa descartada: lupa
(ya usada en el botón de búsqueda de la página).

**Decisión 3 — `border-radius: 4px` en el nav, igual que `.btn-aula-nav`.**
Razón: en el nav, `.btn-aula-nav` usa 4px (la regla `.nav-menu .btn-aula-nav`
sobrescribe los 999px base), así que se iguala para que ambos CTAs se vean
como el mismo tipo de botón. El radio 999px queda solo como fallback fuera
del nav. Consistencia visual con el otro CTA y con el patrón ya probado en
móvil (min-height 52px, centrado).

**Decisión 4 — Excluir `.btn-verifica-nav` de las reglas de hover/subrayado
de `.nav-menu > li > a`.**
Razón: igual que `.btn-aula-nav`, para que no aparezca la barra roja
inferior ni el desplazamiento del pseudo-elemento. Se añade a todos los
selectores `:not(.btn-aula-nav)` existentes.

**Decisión 5 — Aplicar primero en el generador y luego a mano en las 10
páginas no generadas.**
Razón: regla del proyecto (el generador emite la nav completa; si solo se
edita el HTML, la siguiente generación revierte). Se verifica con
`cp -r cursos /tmp/... && node tools/generar-fichas.mjs && diff -rq`.

## Risks / Trade-offs

- [Riesgo] Olvidar alguna de las 10 páginas no generadas → el nav quedaría
  inconsistente entre páginas. Mitigación: checklist en tasks.md y verificación
  con grep de `.btn-verifica-nav` en todos los HTML.
- [Riesgo] Regresión en móvil: el botón podría no heredar min-height/centrado.
  Mitigación: añadir las mismas reglas responsive que `.btn-aula-nav`
  (líneas ~688-692).
- [Trade-off] El footer mantiene el enlace de texto (no se convierte en botón)
  para no sobrecargar el footer; solo el nav destaca.

## Open Questions

- Ninguno. El color rojo y el icono de escudo son supuestos razonables
  documentados en el proposal; si el dueño prefiere otro tratamiento, se
  ajusta solo en el CSS sin tocar la estructura.