# Design

## Context

La ficha del diplomado (`cursos/diplomado-gestion-calidad-e-inocuidad/index.html`) es edición manual (+510/-231 líneas: layout `.ficha-layout`, stats, beneficios, competencias, temario `.temario-modulo`, pagos modernos, sidebar sticky) y divergió de `tools/generar-fichas.mjs`, que aún emite el formato antiguo de bloques apilados para las 8 fichas (datos por curso: slug, horas, pen/usd, flyer propio `flyer-curso-0X-*.webp`, fondo hero, bloques de contenido). Los 8 cursos tienen flyer propio en `assets/img/`. El CSS del layout moderno ya existe en `assets/css/main.css` con fixes de desborde verificados en 360/390/768/900/1280. Ver proposal para motivación y specs del change para requisitos.

## Goals / Non-Goals

**Goals:**
- Las 8 fichas con el mismo layout moderno, cada una con su contenido y datos.
- El diplomado vuelve a generarse con el generador (fin de la excepción manual).
- `rediseno-fichas-cursos` se archiva sin aplicar por superado.

**Non-Goals:**
- Cambiar precios, datos de pago, textos comerciales o el diseño del diplomado.
- Tocar listados, otras páginas o el CSS (salvo ajustes menores si una ficha corta lo exige).

## Decisions

- **Portar el layout del diplomado a la plantilla `ficha()` y bloques compartidos del generador** (stats, sidebar, pagos modernos, QR) con parámetros por curso (horas, sesiones/módulos, pen/usd, flyer, fondo, checklist de incluidos): una sola fuente de verdad, respeta la regla fichas-vía-generador. Alternativa descartada: copiar el HTML a mano en 7 fichas — rompe la regla y multiplica el mantenimiento por 8.
- **Contenido por curso desde los objetos de datos existentes** (los 8 ya tienen slug/horas/precios/bloques): el layout es compartido, los datos no se mezclan. Las secciones opcionales (p. ej. "Perfil del egresado" solo en diplomado) se emiten condicionalmente.
- **Verificación por dif visual contra la ficha actual del diplomado**: la regenerada SHALL ser visualmente equivalente (capturas 1280 + 390 antes/después); las 7 nuevas se revisan en 1280 + 390.
- **Conflicto conocido**: la spec principal `pagos-e-inscripcion` describe datos antiguos (titular "Claudia Rubio Jiménez", placeholder +51 99999999) que la ficha real ya no tiene (titular Proinocuidad, 971 625 142). El delta describe el comportamiento real actual; el sync actualizará la spec principal. Si Juan indica otro titular/número, se ajusta en el generador como dato, no como rediseño.

## Risks / Trade-offs

- [Riesgo] Algún curso corto carece de dato para un stat (p. ej. n.º de módulos) → Mitigación: el generador usa el dato real de cada curso (sesiones) o el stat correspondiente muestra su propio valor; verificar ficha por ficha.
- [Riesgo] Regenerar el diplomado introduce difs visuales vs la edición manual → Mitigación: comparación de capturas antes/después; solo se acepta equivalencia visual.
- [Trade-off] Plantilla del generador más compleja — aceptable: es el costo de no mantener 8 HTML a mano.

## Migration Plan

Sin despliegue especial (sitio estático). Rollback: respaldos previos + regenerar con la plantilla anterior desde git.

## Open Questions

Ninguna.
