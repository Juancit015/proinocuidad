# Proposal

## Why

El sitio sigue mostrando el logo anterior, que tiene fondo blanco opaco, y un favicon de 48×48 px que ya no corresponde a la identidad vigente. Se reemplazan ambos activos por las versiones entregadas por el cliente: el logo PNG sin fondo y el paquete de favicon.

## What Changes

- Reemplazar `assets/img/logo-proinocuidad.png` por el logo sin fondo entregado (`LOGO_PROINOCUIDAD-removebg-preview.png`, 500×500 RGBA). Se conserva el mismo nombre de archivo, así que las referencias existentes siguen válidas.
- Mover el logo anterior a `_archivo/logo-proinocuidad-anterior.png` como respaldo.
- Añadir `assets/img/favicon.ico` (16 y 32 px) desde `favicon_io/favicon.ico`.
- Añadir `assets/img/apple-touch-icon.png` (180×180) desde `favicon_io/apple-touch-icon.png`.
- Cambiar el `<link rel="icon">` de `favicon.png` a `favicon.ico` y el `<link rel="apple-touch-icon">` a `apple-touch-icon.png` en las 13 páginas y en la plantilla de `tools/generar-fichas.mjs`.
- Mover `assets/img/favicon.png` a `_archivo/favicon-anterior.png`.
- Actualizar la convención de assets en `STRUCTURE.md` y registrar el cambio en `CHANGELOG.md`.

**Supuestos registrados:**
- El nombre del respaldo en `_archivo/` (`logo-proinocuidad-anterior.png`, `favicon-anterior.png`) es una decisión de este plan.
- No se añade `site.webmanifest` ni los PNG de 16, 32, 192 y 512 px. Solo se usan los archivos que se confirmaron.
- El logo transparente se ve bien en los fondos actuales: encabezado blanco, caja blanca del pie y tarjetas con `background: #fff`.

## Capabilities

### New Capabilities

<!-- Ninguna. -->

### Modified Capabilities

<!-- Ninguna. El cambio no altera requisitos de las specs existentes. `navegacion-global` y `contacto-footer` exigen "el logo oficial" sin fijar un archivo, y eso sigue cumpliéndose. Por eso el change declara `skip_specs: true`. -->

## Impact

- **Imágenes:** `assets/img/logo-proinocuidad.png` (reemplazado), `assets/img/favicon.ico` (nuevo), `assets/img/apple-touch-icon.png` (nuevo), `assets/img/favicon.png` (movido a `_archivo/`).
- **HTML:** bloque `<head>` de las 13 páginas. El cuerpo no cambia, salvo porque el logo nuevo sustituye al anterior en el mismo archivo.
- **Generador:** `tools/generar-fichas.mjs` (plantilla de `<head>`). Se regeneran las 8 fichas.
- **Documentación:** `STRUCTURE.md` y `CHANGELOG.md`.
- **Dependencias:** ninguna.
- **Riesgo:** el logo aparece también en el JSON-LD `Organization`. Al conservar el nombre, la URL sigue apuntando al logo nuevo.
