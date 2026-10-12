# Design

## Context

- Footer (`index.html` líneas 289-335, replicado en 13 páginas): 4 columnas (marca, contacto, enlaces, Síguenos con `.redes-sociales` en texto) + `.footer-bottom` gris `#9fa2b3` sobre grafito con borde superior translúcido.
- CSS actual (`main.css` 316-338): `.footer-links a:hover { color: #ff8f96; }` (sin subrayado propio, pero hereda `a:hover { text-decoration: underline; }` global); `.redes-sociales a` en texto `#c9cbd4`; `.footer-bottom` sin fondo propio.
- Topbar (`main.css` 113-119, HTML `index.html` 37-52): fondo `--azul-oscuro`, enlaces blancos en negrita, `.topbar-social` como lista de texto; oculta en móvil (`max-width: 860px`).
- Las 8 fichas de cursos se generan desde `tools/generar-fichas.mjs` (footer en líneas 283-292, topbar en 184): cualquier cambio de marcado debe entrar en la plantilla y regenerarse.
- Precedente: el change anterior introdujo SVG inline con `aria-hidden` para la flecha de `.card-link`. Mismo patrón para los iconos.
- Ver `proposal.md` para motivación y justificación del color.

## Goals / Non-Goals

**Goals:**
- Footer y topbar con iconos de redes, sin subrayados en hover, barra inferior azul oscuro con blanco.
- Un solo juego de reglas CSS reutilizado por las 13 páginas.

**Non-Goals:**
- No cambian textos, URLs, orden de columnas, ni responsive actual (topbar-social sigue oculta en móvil).
- No se tocan hovers fuera del ámbito footer/topbar (incluido `.card-link`, nav y botones).
- No se añade ninguna red nueva ni se reescriben `aria-label` existentes salvo añadir el nombre de la red donde el icono sustituye al texto.

## Decisions

**1. Ámbito del "sin underline": selectores footer/topbar, no regla global.**
Se añade `text-decoration: none` en `:hover` y `:focus-visible` para `.site-footer a` y `.topbar a`. No se toca `a:hover` global. Alternativa (eliminar la regla global) descartada por el usuario: el alcance elegido es solo footer.

**2. Hover por color, coherente con la paleta.**
Footer sobre grafito: hover a blanco (`var(--blanco)`); enlaces de navegación del footer conservan su hover rosado `#ff8f96` actual menos el subrayado. Topbar sobre azul oscuro: hover a un blanco pleno o `#ff8f96` según contraste; se define en implementación con la misma variable. Alternativa (línea inferior animada tipo nav) descartada: el usuario pidió quitar líneas, no sustituirlas.

**3. Iconos SVG inline `currentColor`, 5 en footer + 4 en topbar.**
Cada enlace de texto se convierte en icono + `aria-label` con el nombre de la red (el texto visible desaparece, el lector de pantalla conserva el nombre). Tamaños: footer 20 px en botones circulares de 40 px con fondo `rgba(255,255,255,0.08)` y hover con fondo `--rojo`; topbar 16 px directos sobre el azul, hover blanco pleno. `stroke="currentColor"`, `aria-hidden="true"` en el SVG. Alternativa (iconos como imágenes/archivos) descartada: más peticiones HTTP y no heredan `currentColor` en hover. Alternativa (emoji/texto) descartada: inconsistente entre plataformas.

**4. Barra `.footer-bottom` con `background: var(--azul-oscuro)` y `color: #fff`.**
Se elimina el `border-top` translúcido (pierde sentido sobre fondo sólido) y se sube el `font-size` a 0.82rem para legibilidad del legal. Contraste ~14:1.

**5. Fichas vía plantilla, no a mano.**
Los bloques footer/topbar de las 8 fichas se actualizan editando `tools/generar-fichas.mjs` y regenerando con el script, nunca editando fichas sueltas. Las 5 páginas manuales se editan con el mismo bloque canónico (el de `index.html` como referencia).

## Risks / Trade-offs

- [Riesgo] 13 copias del footer a mano divergen con el tiempo (ya divergen en rutas relativas). → Mitigación: bloque canónico único documentado en tareas; la verificación por diff exige bloques idénticos salvo rutas de assets.
- [Riesgo] Al quitar el texto visible, el `aria-label` es la única etiqueta accesible. → Mitigación: cada icono lleva `aria-label` ("Facebook", "YouTube", "Instagram", "LinkedIn", "Comunidad WhatsApp"); la tarea de verificación lo exige por grep.
- [Riesgo] Regenerar fichas puede arrastrar cambios de la plantilla no relacionados. → Mitigación: antes de regenerar, `diff` de una ficha contra su respaldo para confirmar que solo cambia footer/topbar.
- [Trade-off] SVG inline repite ~5 iconos × 13 páginas (~15 KB totales aprox.). Aceptable frente a una petición extra o sprite con `use` y rutas frágiles en ficheros estáticos.

## Migration Plan

- Publicar juntos `main.css`, las 5 páginas manuales, `generar-fichas.mjs` y las 8 fichas regeneradas.
- Rollback: respaldos previos de esos archivos (la tarea 1.1 lo exige).

**6. Ajustes finos pedidos por el usuario (sin underline en footer, iconos centrados, guion en hover, contacto en blanco, etiqueta "Contacto").**
Se aplican sobre lo ya implementado; no cambian decisiones 1-5.

## Open Questions

Ninguna.
