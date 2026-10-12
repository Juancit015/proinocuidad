# Design

## Context

- Radios actuales: `.btn` 999px, `.pestanas button` 999px, `.btn-aula-nav` 999px `!important`, `.mega-panel .mega-cta` y `.mega-panel a` `--radio-sm` (9px). Circulares 50%: `.redes-sociales a`, `.flotante-whatsapp`, `.to-top-proi`.
- No hay `input[type="submit"]` ni `button[type="submit"]` en el sitio; se incluyen los selectores por pedido (inocuos).
- Ver `proposal.md` para motivación.

## Goals / Non-Goals

**Goals:**
- Todos los botones rectangulares a 4px con un solo bloque, incluidas las pestañas y el mega-menú.
- Cero cambios fuera de `border-radius`.

**Non-Goals:**
- No cambian circulares, insignias, tarjetas, imágenes, ni subrayados/líneas decorativas con `border-radius: 2px`.
- No se tocan las clases excluidas aunque compartan archivo.

## Decisions

**1. Bloque único al final de la sección Botones.**
```css
/* ---------- Radio global de botones: 4px (redes del footer excluidas) ---------- */
.btn:not(.redes-sociales a),
.pestanas button,
.btn-aula-nav,
.mega-panel .mega-cta,
button[type="submit"],
input[type="submit"] { border-radius: 4px; }
.nav-menu .btn-aula-nav { border-radius: 4px !important; }
```
El `:not()` es defensivo (ningún `.btn` vive en `.redes-sociales`, verificado por `grep -c`) y deja constancia de la exclusión pedida. Alternativa (regla por regla) descartada: dispersa el cambio y futuros botones quedarían fuera.

**2. `!important` solo para `.btn-aula-nav`.**
Su regla actual usa `!important`; sin él no vencería. El resto vence por orden (bloque al final). Alternativa (`!important` global) descartada: ensucia la cascada.

**3. Exclusiones documentadas, no tocadas.**
Circulares flotantes y de redes, insignias/chips, `nav-toggle`, líneas decorativas de 2px y tarjetas: fuera por diseño; cambiarlas rompería círculos o componentes no-botón.

## Risks / Trade-offs

- [Riesgo] Un futuro botón con otra clase no queda cubierto. → Mitigación: convención documentada (usar `.btn`); la tarea de verificación lista las clases con radio distinto de 4px/50% tras el cambio.
- [Riesgo] `.mega-cta` pasa de 9px a 4px (el cambio más visible). → Mitigación: es lo pedido (global); QA visual lo confirma.

## Migration Plan

- Publicar `main.css`. Rollback: respaldo (tarea 1.1).

## Open Questions

Ninguna.
