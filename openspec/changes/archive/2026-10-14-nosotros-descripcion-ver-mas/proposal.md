# Proposal

## Why

La sección "Quiénes somos" de la página Nosotros ya resume la empresa, pero no incluye la descripción institucional completa que Juan quiere publicar (quiénes somos, alcance de capacitación y consultoría, compromiso con la inocuidad). Se añade como bloque ampliable para no alargar la vista inicial.

## What Changes

- En `nosotros/index.html`, dentro de la sección `.identidad` "Quiénes somos", se agrega un bloque plegable con el texto de descripción aportado por Juan, colapsado por defecto con el control "Ver más" (`<details>`/`<summary>`, sin JavaScript).
- Los párrafos existentes (textos literales del PDF) se mantienen sin cambios; el bloque nuevo va después de ellos.
- Estilo del control coherente con los botones y tipografía existentes; sin nuevos colores de marca.
- Sin cambios en la home ni en otras páginas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `pagina-nosotros`: el requisito "Quiénes somos" añade un bloque de descripción ampliable ("Ver más") debajo de los párrafos institucionales.

## Impact

- Archivos: `nosotros/index.html`, `assets/css/main.css` (estilo mínimo del `<details>`), `CHANGELOG.md`.
- Spec: `openspec/specs/pagina-nosotros/spec.md` (delta).
- Sin impacto en SEO: el texto queda en el HTML estático, visible para buscadores aunque esté plegado.
- Supuestos: el texto se publica tal cual lo entregó Juan; se usa la redacción de tercera persona "Proinocuidad" y se respeta la paleta actual.
