# Proposal

## Why

El dueño describe dos defectos del modo pantalla completa (PC) al navegar entre las secciones de Servicios:

1. **El mega-panel permanece abierto tras entrar a un enlace de ancla.** En `servicios/index.html`, los ítems del panel ("Capacitación Empresarial", "Registro sanitario", etc.) son anclas de la misma página. Al tocar uno, el enlace queda con el foco dentro del `.nav-drop`, y la regla CSS que mantiene el panel abierto (`:hover` y `:focus-within`) nunca se limpia: el panel sigue tapando el contenido que acaba de aparecer. El listener de cierre que ya existe en `assets/js/main.js` solo actúa con enlaces `target="_blank"` o en móvil, por eso en escritorio no le toca este caso.
2. **La barra superior de contacto se pierde al hacer scroll.** La fila con "Contacto:", el correo, el RUC y los iconos de redes (`.topbar`, ~35px medidos) es estática: cuando se hace scroll entre secciones desaparece y solo queda la cabecera pegada. El dueño la quiere acompañando mientras navega, como la cabecera.

## What Changes

- **Cierre del mega-panel al activar un ancla en escritorio**: el listener global de clics de `.nav-menu a` (que ya existe en `main.js`) pasa a cubrir también los enlaces de ancla de la misma página en escritorio (cualquier `href` que empiece por `#`), haciendo `blur()` del enlace tras el clic. Sin foco dentro del `.nav-drop`, el panel se cierra por su propia regla CSS, sin borrado de clases ni estado extra, y sin usar la vía del menú móvil que ya cerraba en móvil y en `target="_blank"`.
- **Barra superior pegada en escritorio**: `.topbar` pasa a `position: sticky; top: 0` con z-index por encima del header en pantallas de más de 860px (donde hoy es visible), y `.site-header` desplaza su punto de pegado de `top: 0` a la altura de la topbar, de modo que el conjunto (barra superior 35px + cabecera 76px) queda unido arriba mientras se hace scroll.
- **Anclas internas recalculadas**: en escritorio el `scroll-margin-top` global pasa de 84px a la cabecera más la barra superior (más el aire de 8px que ya reserva), para que las secciones de Servicios y demás destinos de ancla sigan quedando legibles bajo el conjunto pegado. En ≤860px no cambia nada: la topbar sigue oculta y la cabecera se pega en `top: 0` como hoy.
- **Sin cambios de markup**: ni HTML ni generadores tocan nada; las dos mejoras salen de JS y CSS puros, sobre la estructura que ya existe en las 18 páginas.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `navegacion-global`: se añade el requisito "El mega-panel se cierra al entrar en un enlace de ancla" (cierre determinista en el modo de anclas internas de Servicios) y el requisito "La barra superior acompaña el scroll en escritorio" (sticky de la topbar + cabecera desplazada), y se re-escritura el requisito "Los anclas internas se despegan de la cabecera fija" para incluir la altura del conjunto pegado en escritorio.

## Impact

- `assets/js/main.js`: se extiende el listener existente de clics de `.nav-menu a` con el caso de ancla de la misma página en escritorio y el `blur()` correspondiente.
- `assets/css/main.css`: reglas `.topbar` (sticky + z-index), `.site-header` (`top` con la altura de la topbar en ≥861px) y `[id]` (`scroll-margin-top` con el desplazamiento del conjunto en ≥861px).
- `CHANGELOG.md`: entrada del cambio.
- Sin cambios en HTML, generadores (`tools/generar-fichas.mjs`, `tools/generar-listados.mjs`), `sitemap.xml`, `llms.txt` ni en la paleta de marca.
