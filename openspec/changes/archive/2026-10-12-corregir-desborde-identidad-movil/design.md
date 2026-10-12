# Design

## Context

- `assets/css/main.css` línea ~349: `.identidad-grid { grid-template-columns: 1fr 1fr; gap: 40px; }`. En ≤860px pasa a `1fr` (línea ~456 y ~649 para `.ficha-cuerpo .identidad-grid`).
- `.identidad img` (línea ~350): `width: 100%`, sin `max-width` ni `min-width` en el grid.
- Causa observada: `1fr` equivale a `minmax(auto, 1fr)`. El mínimo automático de la columna es el ancho intrínseco de la imagen (1600px o 1448px), así que la columna no se encoge por debajo de ese valor y el bloque sobresale del contenedor en pantallas estrechas.
- Medición previa: desborde de 18px en 360px en Inicio y Servicios; 9 a 18px en Nosotros; 2px en 768px.
- Las imágenes tienen `border-radius` y `box-shadow`, que no afectan al ancho.

## Goals / Non-Goals

**Goals:**
- Eliminar el desborde horizontal de `.identidad-grid` en ≤860px.
- Conservar la proporción de la imagen sin recortarla.

**Non-Goals:**
- No cambiar la disposición de escritorio (1024px y más).
- No cambiar la animación de entrada (`animacion-entrada`).
- No modificar `.identidad .mvv-grid` ni las tarjetas de misión, visión y valores.
- No reducir ni recomprimir las imágenes.

## Decisions

**1. Columna con mínimo cero en ≤860px.** Se cambia `1fr` por `minmax(0, 1fr)` en el bloque de 860px para `.identidad-grid`, y `.identidad-grid > * { min-width: 0; }`. Así la columna puede encogerse por debajo del ancho intrínseco de la imagen.

**2. Imagen limitada al ancho de su columna.** Se añade `max-width: 100%` y `height: auto` a `.identidad img`, que ya tiene `width: 100%`. Esto mantiene la proporción del archivo porque `height: auto` no fija la altura.

**3. Ficha de curso.** Corregido tras implementar: ninguna ficha usa `.identidad-grid` (0 de 8). No se agrega regla para fichas.

**Alternativa descartada:** reducir el ancho de la imagen con `max-width` fijo (por ejemplo 320px). Se descarta porque en tabletas la imagen se vería pequeña, y el problema es de la columna, no del tamaño de la imagen.

## Risks / Trade-offs

- [Riesgo] Con `minmax(0, 1fr)` el texto podría comprimirse en columnas muy estrechas. → Se verifica en 360px que el texto tiene al menos el ancho del contenedor menos el padding.
- [Riesgo] Cambiar `.identidad img` afecta también a otras imágenes con la clase `identidad`. → Se revisan las 6 secciones `.identidad-grid` del sitio y la ficha.

## Migration Plan

Cambio solo en `assets/css/main.css`. Respaldo previo en `/tmp/opencode/respaldo-corregir-desborde-identidad/`. Revertir restaurando ese respaldo.

## Open Questions

Ninguna.
