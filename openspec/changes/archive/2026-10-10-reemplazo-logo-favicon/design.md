# Design

## Context

Los activos viven en `assets/img/` y se referencian con rutas relativas desde 13 páginas HTML: Inicio, Nosotros, Servicios, Noticias, `cursos/index.html` y las 8 fichas, que se generan con `tools/generar-fichas.mjs`. El logo aparece en el encabezado, el pie, el placeholder de tarjeta de `cursos/index.html` y el JSON-LD `Organization` (ver `proposal.md`). Los fondos que lo rodean son blancos en todos los casos, así que el PNG transparente no requiere ajustes de CSS.

El favicon actual se enlaza en `<link rel="icon" type="image/png" sizes="48x48">` y en `<link rel="apple-touch-icon">`, ambos con `favicon.png`.

## Goals / Non-Goals

**Goals:**
- Sustituir el logo y el favicon sin cambiar el contenido visible ni el diseño.
- Mantener intactas las referencias al logo, para que no haya que tocar el JSON-LD ni el CSS.
- Conservar los archivos anteriores en `_archivo/`.

**Non-Goals:**
- No se añade `site.webmanifest` ni `<link rel="manifest">`.
- No se generan PNG de 16, 32, 192 ni 512 px para el sitio.
- No se cambia `og:image` (ya usa la imagen de 1200×630).
- No se ajusta el tamaño del logo en CSS: el contenido ocupa ~90 % del lienzo en el archivo nuevo y en el anterior, así que `.brand img { height: 52px }` produce el mismo tamaño visual.

## Decisions

**1. Reemplazar `logo-proinocuidad.png` en su lugar.**
Alternativa: archivo nuevo con otro nombre. Se descarta porque obligaría a editar 13 páginas, el JSON-LD y el generador sin beneficio. Con el mismo nombre, el logo nuevo se propaga a todas las referencias en un solo paso.

**2. Enlazar `favicon.ico` en el `<link rel="icon">`.**
Se usa `<link rel="icon" href="assets/img/favicon.ico" sizes="any">`. Se omite `type="image/png"`, porque el archivo es ICO. `sizes="any"` permite que el navegador elija el tamaño adecuado dentro del ICO.
Alternativa: reemplazar el contenido de `favicon.png` por un PNG de 32 px. Se descarta porque el paquete ya trae `.ico` como formato principal y mantener el nombre `.png` enlazaría un formato con la extensión equivocada.

**3. Usar `apple-touch-icon.png` (180 px) en el `<link rel="apple-touch-icon">`.**
Es el tamaño que iOS espera. Con 48 px el sistema lo escala y se ve borroso.

**4. Mover los archivos anteriores a `_archivo/`, no borrarlos.**
Se usa `mv`. Así el cambio es reversible sin depender de un historial que el proyecto no tiene (no usa git).

**5. Regenerar las fichas desde el generador, no editarlas a mano.**
Se cambian las dos líneas de `<link>` en la plantilla de `tools/generar-fichas.mjs` y se ejecuta el generador. Antes de regenerar se comparan los cuerpos con la copia de respaldo; deben quedar idénticos.

## Risks / Trade-offs

- **[El `.ico` contiene un icono distinto del que se espera]** → Se revisa visualmente con `magick identify` y la vista previa del archivo en la verificación.
- **[Caché del navegador conserva el favicon anterior]** → Riesgo aceptado. Se verifica que el enlace apunta al archivo nuevo, no que el navegador lo muestre actualizado.
- **[Referencia olvidada a `favicon.png`]** → Búsqueda con `grep` antes y después del cambio, igual que en `estructura-base-seo`. Debe quedar cero referencias en HTML, JS y generador.
- **[Regenerar fichas altera el cuerpo]** → Se comparan los cuerpos con la copia de respaldo antes de aceptar la regeneración.

## Migration Plan

1. Copiar `assets/img/logo-proinocuidad.png`, `assets/img/favicon.png` y las páginas afectadas a `/tmp/opencode/respaldo-logo/`.
2. Mover `assets/img/logo-proinocuidad.png` a `_archivo/logo-proinocuidad-anterior.png` y copiar en su lugar el logo nuevo.
3. Copiar `favicon.ico` y `apple-touch-icon.png` a `assets/img/`. Mover `favicon.png` a `_archivo/favicon-anterior.png`.
4. Cambiar los `<link>` en las 5 páginas estáticas (Inicio, Nosotros, Servicios, Noticias y `cursos/index.html`) y en la plantilla del generador. Regenerar las 8 fichas.
5. Verificar, actualizar `STRUCTURE.md` y `CHANGELOG.md`.

**Rollback:** `mv` de los archivos desde `_archivo/` a `assets/img/`, y restaurar las páginas desde la copia de respaldo.

## Open Questions

Ninguna. Las decisiones que afectan el alcance ya están confirmadas.
