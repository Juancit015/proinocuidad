# Proposal

## Why

Las 4 subpáginas de servicio (BRCGS, FSSC 22000, HACCP, registro sanitario) tienen solo 2–3 párrafos visibles y ningún "Ver más", mientras `servicios/index.html` ya publica detalle del docx con el componente `.ampliar`. Ampliar las subpáginas mejora su utilidad y su posicionamiento para búsquedas concretas.

## What Changes

- Añadir a cada una de las 4 subpáginas el contenido complementario como texto visible bajo el resumen, sin control "Ver más" (decisión de Juan: el plegable no tiene sentido en estas páginas).
- Contenido del detalle: base del docx ya publicada en `servicios/index.html` (resumen visible + detalle: alcance, listas, entregable, aclaraciones), adaptada a cada norma con agregados puntuales:
  - BRCGS: referencia v9 y módulo del diplomado (ya mencionado en la página).
  - FSSC 22000: referencia ISO 22000 / Codex y curso asociado (ya mencionado).
  - HACCP: PPH + Validación Técnica Oficial, expediente (Manual BPM, POES, PHS, Plan HACCP), DIGESA/SENASA y curso asociado.
  - Registro sanitario: requisitos, revisión técnica, expediente y aclaración de que la aprobación depende de la autoridad (sin "menor tiempo posible").
- Mantener sin cambios: un solo `<h1>` con keyword, canonical, JSON-LD `Service`, CTA final `.cta-sub`, topbar/footer/flotantes.
- Sin precios, plazos ni pasos de trámite no confirmados. Sin imágenes nuevas (las subpáginas no tienen foto; no se añade ninguna en este change).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `servicios-detalle`: las 4 páginas pasan de contenido breve a contenido breve + detalle expandible con base docx y agregados por norma.

## Impact

- Archivos afectados: `servicios/brcgs-food-safety/index.html`, `servicios/implementacion-fssc-22000/index.html`, `servicios/certificacion-haccp/index.html`, `servicios/registro-sanitario-digesa/index.html`, `CHANGELOG.md`. Sin cambios en CSS/JS salvo ajuste menor verificado (llaves balanceadas, `node --check`).
- Respaldo previo en `/tmp/opencode/respaldo-*/` antes de editar. Sin commit ni push sin confirmación de Juan.
