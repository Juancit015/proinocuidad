# Proposal

## Why

En móvil (360 y 390px), las secciones de texto e imagen "Quiénes somos" se salen de la pantalla entre 9 y 18px en Inicio, Nosotros y Servicios. Es el último desbordamiento horizontal del sitio: obliga a desplazar la página a los lados y se ve como un error. La causa es el diseño de la columna, no el contenido.

Medición previa (navegador local, 13 páginas × 6 anchos): desborde de 18px en 360px y 17px en 390px en Inicio y Servicios; 18px y 9px en Nosotros; 2px en 768px en Inicio y Servicios. Las imágenes afectadas son `capacitacion-laredo-auditorio.jpg` (1600×1200) y `capacitacion-cevicheria-dsumare.jpg` (1448×1086), ambas dentro de `.identidad-grid`.

## What Changes

- Bloque `.identidad-grid` ("Quiénes somos" y bloques equivalentes) en Inicio, Nosotros y Servicios: en tabletas y móviles, la columna se ajusta al ancho disponible, sin desbordar.
- La imagen ocupa el ancho de la columna y mantiene su proporción; no se recorta ni se cambia de tamaño en escritorio.
- Se revisan también los bloques `.identidad-grid` de las fichas de curso (`.ficha-cuerpo`), que comparten la clase, para confirmar que no tienen el mismo desborde.

## Assumptions

- "Móvil" y "tableta" usan el mismo umbral del bloque: ≤860px, donde hoy `.identidad-grid` ya apila en una columna.
- El cambio es solo de CSS. Textos, imágenes, enlaces y HTML no cambian.
- La animación de entrada del change `animacion-entrada-dos-columnas` no se modifica.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `diseno-responsive`: se agrega el requisito de que los bloques de dos columnas no desborden la pantalla en ningún ancho. Esta capacidad se sincronizó al archivar `responsive-footer-cards-auditoria`.

## Impact

- `assets/css/main.css`: reglas de `.identidad-grid` y `.identidad img` dentro de los bloques `@media` de ≤860px. Revisar también `.ficha-cuerpo .identidad-grid`.
- Sin cambios en HTML, JavaScript ni assets de imagen.
- Sin dependencias nuevas.
