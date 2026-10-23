# Proposal

## Why

Al abrir el menú hamburguesa en móvil, la página que queda detrás se atenúa con un velo azul de `rgba(16, 20, 119, 0.22)`, pero el velo vive dentro de la cabecera, que apila su contenido en `z-index: 50`. Los dos botones flotantes del sitio — el contacto de WhatsApp y el de volver arriba — apilan en `z-index: 90` y por eso se quedan **encima** del velo: brillan a plena luz sobre un fondo atenuado y siguen siendo tocables.

Tocar el verde mientras el menú está abierto abre el chat con el menú desplegado debajo: es la única interacción de toda la pantalla que se salta el estado del menú. Y visualmente el botón siguió vivo sobre una página apagada, que es lo que se nota al abrir el menú.

El defecto existe porque la spec del velo definió sus excepciones por lik化学: "SHALL empezar por debajo de la cabecera para que la barra y el panel sigan nítidos". De los botones flotantes no dice nada, así que su posición respecto del velo la decidió el z-index por casualidad. La spec función no debe depender de un número de apilado que puede cambiar.

## What Changes

- **El velo cubre también a los dos botones flotantes.** Con el menú abierto, el contacto de WhatsApp y el botón de volver arriba quedan bajo el velo como el resto del contenido: atenuados, sin responder a toques, y tocar donde están cierra el menú como cualquier parte del velo.
- **En pantallas de más de 860px no cambia nada.** Sin velo, los dos botones siguen como hoy: brillantes y tocables.
- **La regla es por capa, no por clase.** La spec fija qué queda encima del velo abierto (solo la cabecera y su panel) y qué queda debajo (todo lo demás de la página, sin excepciones de nombre).

## Capabilities

### New Capabilities

(ninguna: el velo ya tiene capability, `navegacion-global`)

### Modified Capabilities

- `navegacion-global`: el requisito "Velo de atenuación al abrir el menú móvil" pasa a definir por escrito las capas del estado abierto — la cabecera y su panel por encima del velo, todo lo demás por debajo — y añade los escenarios de los botones flotantes: atenuados, fuera de alcance y con el toque redirigido al cierre del menú.

## Impact

- **Toca solo `assets/css/main.css`**, con la capa de la cabecera abierta. No hay JS nuevo: el estado `menu-abierto` ya existe y lo usa el CSS actual.
- **No toca HTML**: ni las 18 páginas ni el generador. El botón no cambia de enlace, de icono ni de estilo.
- **Verificación por medición, no por mirada**: con el menú abierto a 390px, el elemento que recibe el toque donde vive el botón debe ser el velo (que cierra el menú), el botón debe verse atenuado respecto de su captura con el menú cerrado, y a 1024px nada cambia.
- **Comportamiento de foco intacto**: navegar con Tab ya llegaba a los botones flotantes hoy y seguirá llegando; este change no introduce gestión de foco nueva, como la del panel.
