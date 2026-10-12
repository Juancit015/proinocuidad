# Proposal

## Why

Los bloques de dos columnas del sitio (hero de Inicio y "Quiénes somos" de Nosotros) aparecen de golpe. Una entrada suave, con el texto desde la izquierda y la imagen desde la derecha, da una lectura más guiada y hace que el sitio se sienta más vivo. Se aplica al hero y a los bloques de dos columnas equivalentes, para mantener un solo patrón de movimiento en todo el sitio.

## What Changes

- Hero de Inicio (`.hero-grid` en `index.html`): al cargar la página, el bloque de texto entra desde la izquierda y la imagen desde la derecha.
- Bloques `.identidad-grid` de dos columnas en Inicio (1), Nosotros (1) y Servicios (4): la misma entrada, pero al entrar en pantalla (una sola vez por carga).
- Movimiento: desplazamiento horizontal de 32px y opacidad de 0 a 1, duración 700ms, curva ease-out. El texto y la imagen se escalonan 120ms.
- Preferencia de movimiento reducido: si el usuario la tiene activada, no hay animación; el contenido se muestra directamente.
- Sin animaciones en las cabeceras de página de una sola columna (`.page-head`), tarjetas, menú, botones ni pie de página.
- Sin cambios de textos, colores, tamaños, enlaces ni SEO. El contenido sigue presente en el HTML sin JavaScript.

## Capabilities

### New Capabilities

- `animacion-entrada`: entrada animada de los bloques de dos columnas (hero y secciones de texto e imagen), con respeto a `prefers-reduced-motion`.

### Modified Capabilities

Ninguna.

## Impact

- `assets/css/main.css`: reglas de estado inicial y de animación, acotadas a `.hero-grid` y `.identidad-grid`, con `@media (prefers-reduced-motion: reduce)`.
- `assets/js/main.js`: un observador (`IntersectionObserver`) que añade una clase al entrar en pantalla, para los bloques que no están en el primer pliegue.
- HTML: sin cambios de marcado. Las clases de animación se aplican por CSS y JS a los contenedores existentes.
- Delta spec en `specs/animacion-entrada/spec.md`.
