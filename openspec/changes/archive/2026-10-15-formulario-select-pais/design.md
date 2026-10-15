# Design

## Context

Ver proposal.md (Why). Estado actual: `País` es `<input type="text" name="pais" value="Perú">` en `formInscripcionBloque()` de `tools/generar-fichas.mjs` (línea ~343), replicado en las 8 fichas. El CSS de `.form-inscripcion` estila `input[type=text/tel/email/file]` pero no `select` (solo `font-family: inherit` global). Sin JS sobre este campo.

## Goals / Non-Goals

**Goals:**
- Desplegable nativo accesible con apariencia del sitio, mismo `name="pais"`.
- Un solo cambio en el generador + CSS, replicado a las 8 fichas por regeneración.

**Non-Goals:**
- Dropdown custom con JS, más países/opciones, cambios en validaciones o en el destino FormSubmit.

## Decisions

- **D1: `<select>` nativo con estilo propio, sin JS.** `appearance: none` + flecha SVG propia en color de marca como fondo, mismo padding/borde/radio/foco que los inputs. Alternativa (dropdown custom con divs + JS) descartada: exige teclado/lector de pantalla a mano y rompe la semántica POST del formulario.
- **D2: Valores legibles `Perú` / `Extranjero`, Perú seleccionado por defecto.** El correo que lee el dueño sigue diciendo "Perú" como hoy; sin códigos que obliguen a traducir. Alternativa (`PE`/`EXT`) descartada: no aporta nada a un buzón leído por humanos.
- **D3: Estilos junto a la familia de inputs del formulario.** Nueva regla `.form-inscripcion select` con la misma base + `width: 100%`, `max-width: 100%` y `padding-right` reservado a la flecha; `:focus` igual que inputs. Alternativa (clase nueva aislada) descartada: duplicaría la base.
- **D4: Sin cambios en `main.js`.** El campo no es condicional (a diferencia de boleta/factura); el navegador exige selección válida por construcción al no haber opción vacía.

## Risks / Trade-offs

- [La lista abierta la dibuja el SO/navegador, no el CSS] → Aceptado: el cerrado (lo visible el 99% del tiempo) sí lleva el estilo; en móvil se usa el picker nativo, que es lo esperado.
- [Regenerar sobrescribe las 8 fichas] → El generador es fuente única (ya establecido); verificar con `diff` que solo cambia el campo País.
- [Ancho en móvil] → `width/max-width: 100%` + verificación a 390px sin desborde.

## Migration Plan

Regenerar las 8 fichas con `node tools/generar-fichas.mjs`. Rollback: revertir generador + CSS y regenerar. Sin commit/push sin confirmación.

## Open Questions

Ninguna.
