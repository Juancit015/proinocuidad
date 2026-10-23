# Design

## Context

Ver `proposal.md` para el porqué. Lo que condiciona el enfoque es cómo está montado el apilado hoy, medido en `assets/css/main.css`:

```
  .site-header            position: sticky   z-index: 50   -> crea contexto de apilado
  .site-header::after     velo, position: fixed, inset 76px 0 0 0, z-index: -1 (VIVE DENTRO del contexto de la cabecera)
  .nav-menu (móvil)       absolute, z-index: 60   (hijo de la cabecera; 60 solo importa dentro de su contexto)
  .flotante-whatsapp      position: fixed, z-index: 90
  .to-top-proi            position: fixed, z-index: 90
```

El velo es un pseudo-elemento con `z-index: -1` **dentro** del contexto de la cabecera. Sube y baja con la cabecera: no puede quedar por encima de ningún elemento de raíz que apile más de 50. Los botones flotantes apilan 90 en la raíz, así que ganan siempre, con el menú abierto o cerrado.

Es por eso que "meter el velo más arriba" a mano es imposible: su cota solo vale dentro de su propio contexto. La única palanca que existe es la de la cabecera, que es el contenedor del velo y del panel.

## Goals / Non-Goals

**Goals**
- Con el menú abierto en móvil, los dos botones flotantes quedan atenuados bajo el velo, igual que el resto del contenido.
- Tocar donde está un botón flotante con el menú abierto cierra el menú (el toque lo recibe el velo).
- Escritorio intacto: sin velo, botones nítidos y tocables.

**Non-Goals**
- No hay gestión de foco nueva: Tab ya llegaba a los botones con el menú abierto y seguirá llegando (hoy también, porque están por encima del velo). El panel del menú tampoco la tiene; no es este change el que la introduce.
- No se toca el estilo del botón flotante: ni color, ni icono, ni sombra, ni etiqueta. Solo su estado bajo el velo al abrir el menú.
- No se reordena el apilado fuera del estado abierto: con el menú cerrado las cotas quedan exactas a como están.

## Decisions

### 1. Subir la cota de la cabecera mientras el menú está abierto, no bajar la de los botones

Una regla dentro del bloque `@media (max-width: 860px)`:

```css
.site-header.menu-abierto { z-index: 100; }
```

Al subir el contexto de la cabecera por encima de 90, todo lo que vive dentro de él — barra, panel y velo — se pinta sobre los botones flotantes. El velo atenúa los botones con el mismo tinte que ya atenúa a la página, y su `pointer-events: auto` se queda con los toques que caen en su zona, incluida la de los botones: tocar allá cierra el menú. Es una regla, cubre los dos botones y a cualquier elemento futuro que apile 90.

Alternativa descartada — **bajar los botones a z-index 40**. Los pondría bajo el velo sin tocar la cabecera, pero cambia el apilado del estado normal del sitio para siempre, no solo con el menú abierto: los botones pasarían por debajo de cualquier cabecera fija de 50 hacia arriba, hoy y en el futuro. La ventaja de la regla elegida es que solo muerde cuando el menú está abierto; al cerrar, las cotas vuelven a ser las de siempre.

Alternativa descartada — **atenuarlos por clase de estado** (`body.menu-abierto-scroll .flotante-whatsapp { opacity: .35; pointer-events: none }`). Lleva el defecto de duplicar el efecto: la atenuación ya existe, es el velo, y el resultado sería un segundo tinte distinto (opacidad uniforme, no velo azul). Y el botón "subir" es un caso peor: ya trabaja con `opacity` y `visibility` para su propio aparecer/desaparecer, así que meter un tercer estado de opacidad en su misma propiedad es exactamente el tipo de combinación de estados que acaba fallando.

Alternativa descartada — **un velo aparte, fuera del contexto de la cabecera** (por ejemplo un pseudo de `body` con z 95). Funciona, pero introduciría un segundo velo que hay que mantener sincronizado con el existente (mismo aparecer/desaparecer, misma transición, mismo toque que cierra). Dos velos para un menú es una fuente de desincronización sin ninguna ventaja, porque la regla de la cabecera ya resuelve con una línea.

### 2. La cota abierta es 100

Es mayor que la capa flotante (90) y deja margen de una década para no chocar con el máximo de la raíz si alguien añade otro elemento fijo. Hoy no hay nada por encima de 90 en el sitio, así que con la regla en su sitio el máximo visible bajo el velo pasa a ser: panel del menú (dentro del contexto 100) > velo > botones flotantes (90) > contenido normal.

### 3. El alcance es "lo que no es la cabecera ni su panel", no dos clases con nombre

La spec dice "todo lo demás", no "`.flotante-whatsapp` y `.to-top-proi`". Si mañana hay otro elemento fijo que apile más de 50 — sin nombre de botón flotante — la regla del change no lo deja colarse: cubre por capa. Encaja con la intención de Juan (los dos botones de hoy), sin escribir la solución en la lista permitida.

## Risks / Trade-offs

- **El botón se sigue viendo, atenuado pero verde.** El velo es translúcido (0.22): sobre un verde vivo se nota, pero no desaparece. Es el comportamiento pedido: atenuado como el resto, no oculto. Si un día se quiere invisible, es un change aparte.
- **Tab sigue llegando al botón y Enter lo activa** con el menú abierto. Es también el comportamiento de hoy (el botón está encima de todo, incluido el velo). El change no lo empeora; arreglarlo traería un requisito de gestión de foco que el menú móvil no exige hoy.
- **La cota 100 deja en desuso el rango intermedio.** Un elemento futuro que deba verse bajo el velo abierto no puede apilar 51–100, y si deba verse por encima, más de 100. La spec del velo ya fija la regla: lo que no es cabecera ni panel va debajo. Queda escrito aquí para no redescubrirlo al siguiente elemento fijo.

## Migration Plan

Una regla en un media query; el rollback es borrar la regla y las cotas quedan como antes. No hay datos, dependencias ni páginas tocadas.

**Verificación** (Playwright, servidor `python3 -m http.server 8899`, por ejemplo sobre `nosotros/index.html`, que es la página de referencia de los changes anteriores, o el Home):

- A 390px, con el menú abierto: `getComputedStyle(header).zIndex` → `"100"` (y `"50"` con el menú cerrado).
- A 390px, con el menú abierto: `document.elementFromPoint` sobre el centro del botón de WhatsApp devuelve la cabecera — el velo es un pseudo-elemento y no aparece, pero el origen que lo lleva es `.site-header` — y NO devuelve `.flotante-whatsapp`.
- A 390px: tap en ese punto cierra el menú y no abre el WhatsApp (la URL no cambia, no hay pestaña nueva).
- A 390px: captura del botón con menú abierto frente a abierto: el color medio de la muestra del botón es claramente más oscuro, y con el menú cerrado coincide con la captura original.
- A 1024px: sin velo (la media query no existe ahí), `elementFromPoint` sobre el centro del botón devuelve el propio botón y su z-index computado sigue siendo `"90"`.

## Open Questions

(ninguna)
