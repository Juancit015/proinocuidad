# Proposal

## Why

En la sección "Nosotros" del Home, la frase institucional ("Compromiso con la salud pública, rigor técnico, ética profesional, mejora continua y cercanía con el cliente.") se presenta como un párrafo normal con `<em>`, sin separación ni indicación visual de que es una cita. Por eso se confunde con el texto corrido y pierde el peso que debe tener como lema institucional.

## What Changes

- En `index.html`, la cita de la sección "Nosotros" deja de ser un `<p><em>` y pasa a ser un bloque de cita (`<blockquote>`) con:
  - un margen superior mayor para separarla del párrafo anterior;
  - un borde lateral izquierdo en color de acento y comillas tipográficas que la identifiquen visualmente como cita;
  - un pequeño rótulo "Cita" en mayúsculas espaciadas sobre el texto.
- Añadir la regla CSS correspondiente en `assets/css/main.css` (dentro de la sección de la home, sin tocar la paleta ni los estilos de otros bloques).
- No se tocan textos, enlaces, colores de marca ni otras secciones. Solo la presentación de esta cita.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `pagina-inicio`: se añade el requisito de que la cita institucional de la sección "Nosotros" se presente como cita, separada del texto, con indicador visual.

## Impact

- `index.html` (solo el bloque de la cita en la sección identidad).
- `assets/css/main.css` (nueva regla para el bloque de cita).
- Spec `openspec/specs/pagina-inicio/spec.md` (nuevo requisito ADDED sobre la cita).

## Assumptions

- "Indicar que es una cita" se resuelve con un bloque `<blockquote>` con borde lateral, comillas tipográficas y un rótulo "Cita"; no se añade un autor ni una fuente externa (la cita es del propio lema institucional).
- El margen superior adicional es moderado (≈ 1.25rem) para no romper el ritmo vertical de la sección.
- No se modifica `nosotros/index.html` ni otras páginas: el cambio es solo en el Home, como pidió el usuario.