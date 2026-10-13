# Proposal

## Why

Las subpáginas (4 detalle, guía, nosotros) terminan sin invitar al contacto: el visitante interesado no tiene un siguiente paso visible. Un CTA final estilo AZ (badge + titular + 2 botones), adaptado a la paleta y con titular único por página, cierra ese hueco sin riesgo SEO.

## What Changes

- Nueva sección `.cta-sub` (centrada, una columna) como última de `main` en 6 páginas: registro-sanitario-digesa, certificacion-haccp, implementacion-fssc-22000, brcgs-food-safety, inocuidad-alimentaria y nosotros.
- Estructura (patrón AZ, estilos propios): badge "Asesoría sin compromiso", H2 único por página con keyword en `#ff8f96`, línea de texto sin promesas, botones "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y "Ver todos los servicios" (ruta relativa a `servicios/index.html`).
- Fondo azul oscuro con imagen existente + overlay (reutiliza el patrón de `.cta-home`); botones `.btn-rojo` y `.btn-azul` existentes.
- Fuera: home, servicios (conserva su tarjeta), noticias, cursos, fichas.
- Sin commit ni push.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `servicios-detalle`: ADDED CTA final en las 4 páginas de detalle.
- `guia-inocuidad`: ADDED CTA final en la guía.
- `pagina-nosotros`: ADDED CTA final en Nosotros.

## Impact

- 6 HTML: una sección antes de `</main>` en cada uno.
- `assets/css/main.css`: reglas `.cta-sub` con variables (más excepción móvil si hace falta).
- `CHANGELOG.md`: entrada. Trabajo en local, sin publicación.
