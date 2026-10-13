# Proposal

## Why

La home termina en Noticias sin un cierre que invite al contacto, los banners de subpágina se ven pequeños frente al referente (Crecepe ocupa media pantalla) y la cabecera fija en móvil resta espacio y puede interferir al desplazar. Tres mejoras visuales acotadas, sin tocar contenidos existentes ni la marca.

## What Changes

- Bloque final de contacto solo en `index.html` (raíz): título con palabra resaltada, 4 contactos reales con ícono, tarjeta blanca con 2 botones y nota inferior; paleta y radios de Proinocuidad, fondo oscuro con imagen existente. Estructura inspirada en Crecepe, sin copiar sus colores, tipografía ni textos.
- Banners de subpágina más grandes en escritorio: `min-height: clamp(360px, 55vh, 520px)`, contenido centrado verticalmente y título mayor; mismo overlay y efecto fijo actuales.
- Cabecera fija solo en escritorio: `position: relative` en ≤860px (no `static`, para conservar el contexto de anclaje del menú móvil); sin cambios por encima de 860px.
- Sin commit ni push al terminar (lo hará Juan).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `pagina-inicio`: ADDED bloque final de contacto (CTA) solo en la home, con contenido propio de Proinocuidad.
- `banners-paginas`: MODIFIED tamaño y centrado del banner en escritorio (el efecto fijo y las excepciones no cambian).
- `navegacion-global`: ADDED cabecera fija solo en escritorio (`relative` en móvil).

## Impact

- `index.html` (raíz): nueva sección entre `#noticias` y `</main>` (última dentro de `main`); ninguna subpágina cambia su HTML.
- `assets/css/main.css`: estilos del bloque CTA (variables existentes), tamaño de banners y excepción del header en el media ≤860px.
- `CHANGELOG.md`: entrada del cambio.
- Sin cambios de textos existentes, enlaces, metadatos, sitemap, fotos nuevas ni producción (trabajo en local).
