# Design

## Context

See `proposal.md` - Why. El sitio es estático (HTML/CSS/JS, sin build, sin backend salvo el endpoint del formulario). La auditoría responsive del sitio cubre 20 páginas a 360, 390, 768, 860, 1024 y 1280px. La nueva página debe seguir el mismo patrón.

## Goals / Non-Goals

**Goals:**
- Página pública de verificación de certificados con búsqueda client-side.
- Tarjeta de resultado con datos del certificado y botón de descarga (enlace de Drive).
- Responsive en todos los anchos del sitio.
- Generador de JSON desde el Excel (`tools/generar-certificados.mjs`).

**Non-Goals:**
- No backend, no BD, no PHP para esta feature.
- No validación server-side de la búsqueda (los datos son públicos por diseño).
- No autenticación de usuarios para consultar certificados.

## Decisions

1. **Datos estáticos en JSON** en vez de BD.
   - **Rationale:** 28 registros, sitio estático, sin backend. Un JSON de ~5 KB se carga en milisegundos y la búsqueda es instantánea. Añadir una BD implicaría credenciales, rate-limit y mantenimiento para 28 filas.
   - **Alternativa considerada:** endpoint PHP que consulta un archivo. Rechazada: añade complejidad sin beneficio para este volumen.

2. **Un solo campo de búsqueda** (DNI o nombre) en vez de dos campos separados.
   - **Rationale:** más simple para el usuario. Si el texto es solo dígitos, se busca por DNI; si tiene letras, por nombre. La búsqueda se hace en ambos campos simultáneamente (si el input normalizado está en el DNI o en el nombre, coincide).

3. **Normalización de DNI**: se eliminan todos los caracteres no numéricos (puntos, espacios, guiones) tanto en los datos como en la entrada del usuario. Esto resuelve formatos como " 1.010.157.556" → "1010157556".

4. **Búsqueda por nombre parcial e insensible a tildes**: se normaliza a minúsculas y se eliminan acentos (NFD normalization) para que "claudia" encuentre "Claudia Rubio".

5. **Tarjeta de resultado separada** de la tarjeta de búsqueda (como en la referencia TQI Academy), con badge de estado (verde "VÁLIDO", rojo "NO VÁLIDO").

6. **Botón de descarga** en rojo (`#ad343b`) con icono de descarga, abriendo el enlace de Drive en pestaña nueva (`target="_blank" rel="noopener"`).

7. **Generador de JSON**: script Node.js en `tools/generar-certificados.mjs` que lee el Excel y genera `assets/data/certificados.json`. Se ejecuta manualmente cuando se actualiza el Excel (igual que `generar-fichas.mjs`).

## Risks / Trade-offs

- [Riesgo] Los datos son públicos (nombre, DNI, programa, enlace de Drive). → Mitigación: los certificados ya son documentos públicos (enlaces de Drive públicos). No hay datos sensibles adicionales.
- [Riesgo] Si se actualiza el Excel, hay que regenerar el JSON y hacer deploy. → Mitigación: script de generación documentado en AGENTS.md.
- [Trade-off] La búsqueda es client-side: si el JSON crece mucho (>1000 registros), podría ser lento. → Mitigación: para el volumen actual (28 registros) es instantáneo. Si crece, migrar a endpoint PHP.
- [Riesgo] DNI con formato inconsistente (puntos, espacios, dígitos extra). → Mitigación: normalización agresiva (solo dígitos) en ambos lados.

## Migration Plan

1. Crear `tools/generar-certificados.mjs` que lee el Excel y genera `assets/data/certificados.json`.
2. Crear `verifica-tu-certificado.html` siguiendo el patrón del sitio.
3. Añadir lógica de búsqueda en `assets/js/main.js` (o script dedicado).
4. Añadir estilos de tarjeta de resultado en `assets/css/main.css`.
5. Añadir enlace en footer (y nav si aplica).
6. Actualizar `sitemap.xml`, `llms.txt`, `llms-full.txt`.
7. Verificar con Playwright a 360, 390, 768, 860, 1024 y 1280px.
8. Commit y deploy vía `tools/publicar.sh`.

## Open Questions

(none)