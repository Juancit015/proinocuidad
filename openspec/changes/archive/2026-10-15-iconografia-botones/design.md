# Design

## Context

Ver proposal.md para la motivación. Estado actual relevante para decidir el enfoque:

- El sitio es HTML estático sin build. `assets/css/main.css` y `assets/js/main.js` se sirven tal cual; no hay paso de compilación donde inyectar iconos.
- **Ya existe un patrón de iconos consolidado** en 64 botones: SVG en línea, `viewBox="0 0 24 24"`, `stroke="currentColor"` con `stroke-width="2"` y `stroke-linecap="round"`, y `fill="currentColor"` para los de marca (WhatsApp). `.btn` ya es `display: inline-flex` con `gap: 8px`, y ya existe la regla `.btn svg { width: 18px; height: 18px; flex: none; }`.
- `tools/generar-fichas.mjs` ya declara un bloque de constantes `SVG_*` (reloj, libro, escudo, birrete, tarjeta, portapapeles, documento, check…) reutilizadas en la plantilla; `tools/generar-listados.mjs` tiene su propio juego reducido. Las fichas se regeneran exclusivamente con esos generadores.
- El proyecto tiene una regla dura: **las fichas solo se editan vía su generador, nunca a mano**. Y otra: no se agregan dependencias ni recursos externos sin necesidad.
- La regla global `.btn:not(.redes-sociales a)` fija radio 4px a las botones; los iconos no interactúan con ella.
- Los `.mega-cta` del panel mega renderizan su flecha con `mask` + data-URI en CSS sobre un `<span aria-hidden="true">→</span>`; no son SVG y no se deben tocar.

Inventario verificado de los 83 botones sin icono (los otros 36 del total de 119 son `.mega-cta`, ya con icono CSS):

| Acción | Cant. | Dónde | Icono elegido |
|---|---|---|---|
| Copiar (Yape/Plin, BBVA) | 16 | fichas | portapapeles |
| Copiar CCI | 8 | fichas | portapapeles |
| Aula Virtual | 8 | fichas (las páginas ya lo tienen) | birrete |
| Solicitar link de PayPal / WU | 8 | fichas | envío |
| Pagar Online con Culqi | 8 | fichas | tarjeta de crédito |
| Enviar inscripción | 8 | fichas | envío |
| Matricularme Ahora | 8 | fichas | edición |
| Contactar Asesor | 8 | fichas | soporte (headset) |
| Solicitar asesoría | 5 | `servicios/index.html` + 4 subpáginas | soporte (headset) |
| Ver certificación HACCP / FSSC 22000 / BRCGS / registro sanitario | 4 | `servicios/index.html` | flecha derecha |
| Conócenos | 1 | `index.html` | usuarios |
| Ver todos los cursos | 1 | `index.html` | grilla de cursos |

## Goals / Non-Goals

**Goals:**

- Una única fuente de verdad por icono para el HTML generado, de modo que las 8 fichas no puedan divergir entre sí.
- Reutilizar el patrón SVG ya existente en vez de introducir un patrón paralelo.
- Cambios de CSS mínimos y Surgicales: solo tamaño/alineación donde falte, sin tocar radio, padding, color ni transiciones.

**Non-Goals:**

- No unificar ni redibujar los 64 botones que ya llevan icono (aunque coincida con el catálogo, no se re-normalizan aquí).
- No tocar `.mega-cta`, ni el botón hamburguesa `.nav-toggle`, ni los flotantes de WhatsApp / volver arriba, que ya tienen icono.
- No cambiar texto, `href`, `target`, `rel`, orden de botones ni el comportamiento del botón Culqi (`aria-disabled="true"` se mantiene tal cual).
- No introducir librería de iconos, webfont ni sprite externo.

## Decisions

### 1. SVG en línea repetido, no sprite externo ni `<use>`

Se mantiene el SVG en línea ya usado en las 64 ocurrencias existentes.

- **Alternativa A (descartada):** `assets/img/sprite.svg` + `<use href="...#id">`. Una sola fuente de verdad y menos repetición, pero agrega una petición de red, necesita *cache busting* en un sitio sin build, y rompe el modo `file://` con el que se revisa el sitio localmente. Además obligaría a migrar los 64 iconos existentes para no tener dos estilos conviviendo, lo que contradice el non-goal de no re-normalizar.
- **Alternativa B (descartada):** CSS `mask` con data-URI, como hace `.mega-cta` con su flecha. Evita tocar el HTML, pero el icono deja de ser seleccionable con el color de texto y obliga a escribir el path en CSS; para 10 iconos distintos y 8 botones por ficha es peor mantenible que una constante en el generador.

Se acepta la repetición de markup: es el status quo del sitio (cabecera, footer y flotantes ya están duplicados en los 22 HTML), y el costo se acota porque las fichas —el 87% de los botones— se generan.

### 2. Constantes `SVG_*` en el generador como fuente de verdad de las fichas

`tools/generar-fichas.mjs` ya tiene un bloque `const SVG_RELOJ = ...`, `SVG_BIRRETE = ...`, etc. Se amplía ese bloque con las constantes que faltan (`SVG_PORTAPAPELES_BTN`, `SVG_TARJETA`, `SVG_ENVIO`, `SVG_EDITAR`, `SVG_SOPORTE`, `SVG_USUARIOS`, `SVG_FLECHA_DER`, `SVG_BIRRETE_NAV`, `SVG_WA` ya existe) y se interpolan en la plantilla. Así las 8 fichas salen idénticas entre sí y regenerar es idempotente.

Se reutilizan constantes ya existentes cuando el icono coincide (`SVG_BIRRETE` para Aula Virtual, `SVG_TARJETA` para Culqi, `SVG_WA` para WhatsApp) en lugar de crear duplicados con otro nombre.

`tools/generar-listados.mjs` no se toca: sus botones ya llevan icono.

### 3. Coherencia con el HTML escrito a mano

Los 11 botones estáticos reciben el mismo path SVG que emite el generador. El criterio: si el icono ya existe literalmente en alguna página (WhatsApp macizo, birrete, headset de "Solicitar asesoría por WhatsApp", flecha), se copia ese path exacto en lugar de buscar uno equivalente. Con eso las fichas y las páginas quedan indistinguibles.

### 4. CSS: una sola regla nueva de tamaño + el alineado de `.btn-copiar`

`.btn svg` ya resuelve 18px y `flex: none` para `.btn` y derivados. Solo hacen falta:

- `.btn-sm svg { width: 16px; height: 16px; }` — el `btn-sm` no tiene regla propia de svg, así que heredaría 18px y desbalancearía los botones pequeños de pago.
- `.btn-copiar` necesita `display: inline-flex; align-items: center; gap: 6px;` porque hoy es un `<button>` de texto plano y el SVG se iría a su propia línea; y `.btn-copiar svg { width: 14px; height: 14px; }` para su texto de 0.76rem.

Ninguna regla toca color, radio, padding ni `transition`. No se agregan animaciones: los botones ya hacen `transform: translateY(-1px)` en hover y eso se mantiene igual.

## Risks / Trade-offs

- **[Los `.btn` con `style="width: 100%; justify-content: center;"` en las tarjetas de pago podrían descentrarse al añadir el icono]** → esos botones ya son flex con `justify-content: center`; el icono entra en la fila igual que el texto. Se verifica midiendo el botón en la tarjeta de pago de una ficha tras regenerar.
- **[`.btn-copiar` cambia de caja al pasar a `inline-flex` y podría desalinearse dentro de `.pago-copiable`]** → esa fila ya es flex con `align-items` y `gap`; se revisa visualmente el bloque de pagos. Si molesta, se ajusta el `gap` del padre y no el botón.
- **[Un path SVG mal cerrado rompe el botón entero]** → verificación automática de que cada `<svg>` tenga su `</svg>` y que el HTML quede balanceado, en cada archivo tocado.
- **[Regenerar las fichas puede pisar ediciones manuales pendientes]** → las 8 fichas están limpias respecto de su generador (verificado: el árbol de trabajo no tiene modificaciones sin commitear). Se respalda `cursos/` y `main.css` antes de regenerar, y se compara el diff para confirmar que el único cambio sea la aparición de los iconos.
- **[Que el sitio crezca en peso por HTML repetido]** → el SVG de un botón ronda los 200-400 bytes; 83 botones suman del orden de 25 KB en total, que el hosting sirve comprimido. Sin impacto medible en Core Web Vitals.