# Proposal

## Why

Seobility mide la meta description del inicio en 1000px (sobre su límite): 157 caracteres con muchas mayúsculas anchas. Recortarla la pone en verde sin tocar keywords ni el rango 120–160 del spec.

## What Changes

- `index.html`: nueva description de 127 caracteres: "Cursos, diplomados y consultoría en inocuidad alimentaria: BPM, POES, HACCP, FSSC 22000 y registro sanitario en Trujillo, Perú."
- Se retira el slogan inicial (ya está intacto en el H1; repetirlo en la description es redundante y ocupa ~40px).
- Mismas keywords, mismo rango válido, sin tocar título, H1, enlaces ni nada más.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- (ninguna: el cambio vive dentro del requisito vigente de longitud de `seo-base`)

## Impact

- `index.html`: una línea. `CHANGELOG.md`: entrada. Sin commit/push ni publicación.
- `skip_specs: true` (sin cambio de requisitos) y sin `design.md` (edición de una línea sin decisiones técnicas).
