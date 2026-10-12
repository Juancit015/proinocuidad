# Design

## Context

- Ficha actual (plantilla `generar-fichas.mjs` 239-245): `.ficha-head` (degradado azul, igual que `.page-head`) con `span.etiqueta` + `h1` + `.subrayado`. Sin migas ni descripción.
- `.breadcrumbs` globales ya existen y son blancas: sirven directo sobre el fondo oscuro de la ficha.
- Los 8 Objetivos son un solo `<p>` (verificado en la plantilla): reutilizables como descripción.
- El spec `cursos` exige modalidad en Datos generales (se conserva) pero no la etiqueta: quitarla es seguro.
- Ver `proposal.md` y `specs/cursos/spec.md`.

## Goals / Non-Goals

**Goals:**
- Hero de ficha: migas 3 niveles + h1 + descripción, sin etiqueta ni subrayado.
- Un solo cambio en la plantilla + regeneración.

**Non-Goals:**
- No cambian h1, bloques, textos del contenido, ni estilos de `.ficha-head` salvo lo necesario para la descripción.
- No se tocan índice de Cursos, Servicios ni demás páginas.

## Decisions

**1. Hero en plantilla con campos `miga` y `descripcion` por curso.**
`<nav class="breadcrumbs">…<a href="../../index.html">Inicio</a> / <a href="../index.html">Cursos</a> / <span>{miga}</span></nav>` + `<h1>{h1}</h1>` + `<p class="ficha-desc">{descripcion}</p>`. `descripcion` copia el párrafo del Objetivo (decisión del usuario). Alternativa (extraerlo por código del HTML del Objetivo) descartada: los objetivos están inline en llamadas `bloque()`; el refactor de 8 cursos es más invasivo que 8 campos.

**2. Nombres cortos propuestos para `miga`.**
Diplomado; Legislación sanitaria; BPM, POES, POE y Plan HACCP; HACCP DIGESA / SENASA; BPM y prerrequisitos Codex 2022; Higiene y saneamiento; HACCP FSSC 22000 y Codex 2022; Auditor interno HACCP. El usuario puede ajustarlos en revisión.

**3. Estilo de la descripción.**
Reutilizar el patrón de `.page-head p` (claro `#d7d9f2`, `max-width`, `margin-top`); si no encaja en `.ficha-head`, regla mínima `.ficha-head .ficha-desc` equivalente. Sin subrayado rojo (se elimina con la etiqueta).

**4. Fichas vía regeneración, nunca a mano.**
Igual que changes anteriores; verificación por diff de una ficha.

## Risks / Trade-offs

- [Riesgo] `descripcion` duplica el texto del Objetivo y pueden divergir. → Mitigación: la tarea de verificación exige igualdad exacta entre hero y primer párrafo del Objetivo en las 8 fichas.
- [Riesgo] Regenerar arrastra cambios no relacionados. → Mitigación: diff de muestra contra respaldo antes de aceptar.
- [Trade-off] Se elimina `.etiqueta`/`.subrayado` del hero (quedan sin uso; el CSS se conserva por si se reutiliza, o se limpia si el usuario lo pide).

## Migration Plan

- Publicar plantilla + 8 fichas (+ `main.css` si hubo retoque). Rollback: respaldos (tarea 1.1).

## Open Questions

Ninguna.
