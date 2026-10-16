# Design

## Context

Ver proposal.md para la motivación. Estado actual que condiciona el enfoque:

- Hay **113 enlaces a WhatsApp**: 81 abren el chat vacío y 32 ya llevan mensaje. Todos apuntan al mismo número, `51981365982`, y ninguno se construye en tiempo de carga: el texto viaja en el propio `href`.
- Los 32 con mensaje salen todos de `tools/generar-fichas.mjs`, que ya tiene el helper de composición: `waInfo`, `waFactura`, `waExtranjero` y `waInscripcion`, cada uno con `encodeURIComponent`. Las dos variantes de nombre por curso, `curso.waCorto` y `curso.waLargo`, ya existen en los datos.
- `tools/generar-listados.mjs` tiene `const WA_URL = "https://wa.me/51981365982"` **sin mensaje**, y sí dispone de los datos del curso (`c.titulo`, `c.slug`), que ya usa para el resto de la tarjeta.
- Las 8 fichas se generan exclusivamente con su generador y los 2 listados con el suyo; el resto del HTML —home, servicios, inocuidad-alimentaria, nosotros, noticias— se escribe a mano y está duplicado en las 18 páginas.
- El sitio es estático sin build: no hay paso de compilación donde centralizar nada.

Inventario de los 81 enlaces a cambiar, agrupados por contexto:

| Contexto | Etiqueta visible | Cant. | Origen |
|---|---|---|---|
| Contacto directo | `+51 981 365 982` | 36 | barra superior + pie, en las 18 páginas |
| Botón flotante | `Envíanos un mensaje!` | 18 | las 18 páginas |
| Botón de la tarjeta de curso | `WhatsApp` | 12 | `generar-listados.mjs` (4 en el home, 8 en el listado) |
| CTA de subpágina | `Solicitar asesoría por WhatsApp` | 7 | inocuidad-alimentaria, nosotros y 4 servicios |
| Botón de servicio | `Solicitar asesoría` | 5 | hero-acciones de 4 servicios + CTA final de servicios |
| Botón del hero | `Consultar por WhatsApp` | 1 | `index.html` |
| Contacto del bloque final | `+51 981 365 982 · Escríbenos directo` | 1 | `index.html` |
| | | **81** | |

## Goals / Non-Goals

**Goals:**

- Que el asesor sepa, leyendo el primer mensaje, qué quiere el usuario y de dónde viene.
- Que el mismo botón diga lo mismo en todas las páginas, para que el texto se pueda cambiar en un solo lugar.
- Que las 8 fichas y los 2 listados sigan saliendo de su generador, sin ediciones a mano.

**Non-Goals:**

- No cambiar el número, ni el rótulo de los botones, ni su icono, color, tamaño o posición.
- No tocar el formulario de inscripción ni FormSubmit: el enlace `waInscripcion` ya lleva su mensaje y funciona.
- No meter JavaScript para componer el mensaje en el cliente (ver decisión 3).
- No reescribir los 32 mensajes ya existentes salvo para unificar el nombre del curso (ver decisión 2).

## Decisions

### 1. Los textos viven en un catálogo documentado, no en un archivo de datos

El proyecto no tiene paso de build ni un lugar natural dondetoday centralizar strings compartidos entre dos generadores y 12 HTML a mano. Se opta por un **catálogo escrito en `design.md` y en `STRUCTURE.md`**, que es la referencia que un humano lee antes de tocar un botón.

- **Alternativa A (descartada):** `assets/js/whatsapp-msgs.js` con los textos y lectura desde los generadores. Mezcla un archivo de runtime con dos scripts de Node, obliga a los 12 HTML a mano a hardcodear igual, y no reduce el trabajo real: el 75% de los enlaces están en HTML escrito a mano y hay que editarlos de todas formas.
- **Alternativa B (descartada):** `data-*` en el botón y JS que arma el `href` al hacer clic. Descartada por dos razones duras: sin JS no habría mensaje (la spec lo exige), y complica el `target="_blank"` y el clic derecho / abrir en pestaña nueva, que hoy funcionan.

El precio de no centralizar es que un texto repetido vive en 18 sitios (el flotante). Se acepta: el sitio ya duplica cabecera, pie y flotantes completos en las 18 páginas, así que es el status quo, y el texto del flotante es genérico a propósito, lo que hace que cambie raramente.

### 2. Catálogo de mensajes

Textos ya revisados con el criterio "el asesor entiende la intención sin preguntar". Los nombres de servicio y programa son los de la página donde vive el botón.

| Contexto | Mensaje |
|---|---|
| Contacto directo (barra superior y pie) | `Hola, escribo desde la web de Proinocuidad. Deseo comunicarme con ustedes.` |
| Botón flotante (las 18 páginas) | `Hola, escribo desde la web de Proinocuidad. Quiero información sobre sus cursos y servicios de inocuidad.` |
| Contacto del bloque final del home | `Hola, escribo desde la web de Proinocuidad. Quiero información sobre sus cursos y servicios.` |
| "Consultar por WhatsApp" (hero del home) | `Hola, encontré la web de Proinocuidad y quiero información sobre sus cursos y servicios.` |
| "Solicitar asesoría por WhatsApp" — CTA final del home | `Hola, solicito asesoría sobre sus cursos y servicios.` |
| "Solicitar asesoría por WhatsApp" — servicio | `Hola, solicito asesoría sobre el servicio de {SERVICIO}.` |
| "Solicitar asesoría por WhatsApp" — inocuidad-alimentaria | `Hola, solicito asesoría sobre el programa de Inocuidad Alimentaria.` |
| "Solicitar asesoría por WhatsApp" — nosotros | `Hola, quiero conocer más sobre Proinocuidad y sus servicios.` |
| "Solicitar asesoría" (hero y CTA final de servicios) | `Hola, solicito asesoría sobre el servicio de {SERVICIO}.` |
| Tarjeta de curso en listados | `Hola, deseo más información y matricularme en {CURSO}.` — idéntico al `waInfo` de la ficha |

`{SERVICIO}` por subpágina: Certificación HACCP · Implementación FSSC 22000 · BRCGS Food Safety · Registro Sanitario DIGESA. El CTA final de `servicios/index.html` no tiene servicio propio, así que usa `Hola, solicito asesoría sobre sus servicios de inocuidad.`

El mensaje del botón flotante es el mismo en las 18 páginas por decisión del dueño: el flotante es global y un texto variable obligaría a editarlo 18 veces para un cambio que casi nunca ocurre.

### 3. La tarjeta de curso usa el mismo texto que su ficha

`generar-listados.mjs` ya tiene los datos del curso; solo hay que componer el mismo texto que compone `generar-fichas.mjs`. Se **no** introduce un archivo compartido porque los dos generadores no se importan entre sí hoy y unirlos es un refactor que excede este change. El texto queda duplicado en dos generadores, que es el mismo trato que ya reciben `WA_URL` y el marcado de la tarjeta.

Lo que sí se hace es que ambos usen **el mismo campo del nombre del curso**, para que no diverjan: los dos tomarán la variante larga, que es el nombre oficial completo.

Sobre `waCorto` / `waLargo`: hoy conviven porque "Diplomado de Calidad e Inocuidad" (corto) no coincide con el título oficial "Diplomado de Especialización: Gestión de la Calidad e Inocuidad en la Industria Alimentaria". Unificar el nombre en todos los mensajes es correcto pero **se documenta como paso opcional**: los mensajes ya funcionan y los 32 existentes no se tocan salvo que el dueño lo pida, para no mezclar dos cosas en un mismo commit.

### 4. Codificación con `encodeURIComponent` en los generadores

Las fichas ya lo hacen. `generar-listados.mjs`ioxupirá a hacerlo con la misma función. En el HTML a mano no hay función disponible, así que el texto se **escribe ya codificado** en el `href` (`%2C` para la coma, `%20` para el espacio, `%C3%A9` para la á), que es como ya están los 32 existentes y evita tener que hacerlo a mano con errores. La verificación de la sección 6 comprueba que el enlace decodifica a la frase completa.

## Risks / Trade-offs

- **[Un texto mal codificado rompe el enlace]** → verificación automática de que cada `href` con `?text=` decodifique a una frase que empieza por "Hola" y termina en punto, y que los 113 enlaces conserven el número correcto.
- **[Regenerar fichas y listados puede pisar ediciones a mano]** → se verifica antes que las fichas y los listados actuales son byte-idénticos a lo que producen los generadores sin cambios; si no lo son, se detiene y se reporta en vez de sobrescribir.
- **[El texto del flotante queda duplicado en 18 archivos]** → aceptado a conciencia (decisión 1); el texto es genérico y cambia muy rara vez. Se mitiga documentándolo en `STRUCTURE.md` para que quien lo cambie sepa que son 18 sitios.
- **[Los mensajes largos en WhatsApp se ven mal en el móvil]** → se verificó que ninguno de los textos del catálogo supera ~130 caracteres, que es lo que WhatsApp muestra completo en una pantalla de móvil.
- **[Que el mensaje prellenado se sienta invasivo si el usuario solo quería el número]** → por eso el contacto directo de la barra y el pie lleva un mensaje neutro de presentación, sin pedir nada concreto.