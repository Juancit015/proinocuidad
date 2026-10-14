# Proposal

## Why

La tarjeta de la noticia DIGESA-HACCP en `noticias/` no tiene foto: la portada es un panel azul con etiquetas y en escritorio va al lado del texto (grid 2 columnas). Juan pide foto arriba y texto abajo en desktop.

## What Changes

- Añadir una foto real (licencia libre comercial, autoalojada en `assets/img/`) a la tarjeta `.nota-card`, ubicada arriba y con el texto debajo en escritorio.
- Reordenar `.nota-card` a layout vertical en escritorio (imagen arriba, `.nota-texto` debajo); en móvil conserva el apilado actual.
- Conservar etiquetas (`fecha-destacado`, `genero`) sobre la imagen, contenido de la nota, migas, CTA y footer sin cambios.
- Sin precios, plazos ni afirmaciones nuevas. Sin commit ni push sin confirmación de Juan.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `noticias`: la tarjeta de noticia pasa de portada-panel lateral a foto superior con texto debajo en escritorio.

## Impact

- Archivos afectados: `noticias/index.html`, `assets/css/main.css`, `assets/img/noticia-*.jpg` (nueva), `CHANGELOG.md` con URL fuente y licencia.
- Candidata Unsplash (pendiente verificar licencia gratuita y aprobación de Juan antes de descargar): laboratorio/equipos de inspección — https://unsplash.com/photos/industrial-processing-equipment-in-a-laboratory-setting-_iB2Ou3hca4 ; alternativa: microscopio en laboratorio — https://unsplash.com/photos/a-woman-looking-through-a-microscope-in-a-laboratory-lTocuU-UMfA. Se descartan resultados Getty/Unsplash+ (no gratuitos).
- Respaldo previo en `/tmp/opencode/respaldo-*/` antes de editar.
