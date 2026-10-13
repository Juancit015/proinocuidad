# Proposal

## Why

La página Servicios se percibe básica e inconsistente: las imágenes no comparten el mismo tratamiento (la de sistemas de gestión no tiene ningún borde redondeado), la foto de normativa es de baja resolución (326×326) y se degrada al mostrarse grande, y el bloque "¿Quieres entender primero la base?" es un párrafo suelto sin diseño. Hay que unificar el lenguaje visual sin tocar contenidos ni colores de marca.

## What Changes

- Unificar el tratamiento de las 4 imágenes de servicio: mismo radio de borde (`--radio: 14px`), misma sombra y misma relación de aspecto/recorte en escritorio.
- La sección de sistemas de gestión adopta el mismo marco visual que las demás (hoy su `<section>` no lleva la clase que aplica el borde).
- Limitar el tamaño de visualización de las fotos pequeñas (normativa 326px, sistemas 567×376) para que no se estiren más allá de su resolución útil; como referencia, el tamaño de registro sanitario (640×480) es el tope aceptable.
- Rediseñar el bloque "¿Quieres entender primero la base?" como tarjeta o banda de cierre con título, texto y botón hacia la guía de inocuidad, reutilizando componentes existentes (sin colores nuevos).
- Añadir contenido solo desde fuentes ya validadas: documento base (PDF), páginas de detalle de servicio existentes y guía de inocuidad. Sin servicios, precios ni plazos nuevos.
- Mantener responsive actual: 1 columna en móvil, sin desbordes, y `prefers-reduced-motion` donde aplique.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `pagina-servicios`: los requisitos de presentación cambian — marco visual uniforme para las 4 imágenes (radio, sombra, aspecto), tope de tamaño según resolución real, y bloque de cierre a la guía como componente diseñado en vez de párrafo suelto. El contenido (4 servicios, casos reales, migas) no cambia.

## Impact

- `servicios/index.html`: clases del bloque de sistemas y del cierre; `width`/`height` o `sizes` en imágenes si aplica.
- `assets/css/main.css`: reglas de marco uniforme y del bloque de cierre (solo CSS, sin colores de marca nuevos).
- `assets/img/`: posible sustitución de fotos pequeñas por versiones de mayor resolución con licencia libre comercial y autoalojadas (requiere autorización y URLs fuente en CHANGELOG; si no se autoriza, el tope de tamaño por CSS es la solución).
- Sin cambios en `sitemap.xml`, metadatos ni JSON-LD.
