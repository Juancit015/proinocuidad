# Design

## Context

Ver `proposal.md` para la motivation. Aquí lo que condiciona el enfoque.

El sitio tiene 18 páginas y **`sitemap.xml` coincide exactamente con ellas**: se comprobó contraste automático y no hay ni una URL huérfana ni una página sin listar. Todas las URLs son absolutas, en `https` y terminan en `/`. Ese archivo es la fuente de verdad y ya cumple las condiciones que el estándar pide.

**No existe ninguna versión markdown de ninguna página.** El único `.md` del repo son los archivos de skills de OpenSpec.

El estándar que hay que seguir es **llmstxt.org versión 2**, publicada el 3 de septiembre de 2024 y modificada el 10 de agosto de 2026. Aporta dos cosas relevantes frente a la v1: el formato con secciones H2 y listas de enlaces, y la recomendación de que los enlaces apunten a versiones markdown de las páginas.

Restricciones del proyecto que este cambio respeta:

- `diseno-responsive` prohíbe tocar textos, colores, enlaces y datos de contacto en cambios responsive. Aquí no se toca ninguna de las 18 páginas, así que no aplica, pero es la razón de que los dos archivos nuevos sean lo único que se añade.
- `seo-base` ya gobierna `sitemap.xml` y `robots.txt`. `llms.txt` va en la misma capability, no en una nueva: es el mismo grupo de "archivos en la raíz para rastreadores".

## Goals / Non-Goals

**Goals:**

- Un `llms.txt` que un asistente pueda leer y entender sin parsear HTML con navegación y scripts.
- Que toda URL del archivo exista de verdad, verificado automáticamente.
- Corregir el desfase de "13 páginas" en `seo-base` y `diseno-responsive`.
- Que `llms.txt` y `llms-full.txt` no se queden viejos: si una URL deja de existir, el sitio avisa.

**Non-Goals:**

- No generar versiones `.md` de las páginas. Es la recomendación del estándar pero se resolvió con `llms-full.txt`; el motivo está en `proposal.md`.
- No tocar las 18 páginas HTML para enlazar el `llms.txt` con `rel="describedby"`. El estándar v2 lo sugiere, pero sería editar 18 ficheros, con el generador de fichas de por medio, para un beneficio que no aporta nada mientras exista `llms.txt` en la raíz.
- No añadir `llms.txt` a `robots.txt`. No hace falta: `robots.txt` gobierna permisos de rastreo y `llms.txt` es contenido bajo demanda. El propio estándar explica que sus propósitos son distintos.
- No registrar `llms.txt` en `sitemap.xml`. Los sitemaps son para páginas indexables, y un archivo de texto para agentes no es una página.
- No hacer nada de lo que depende del dominio en vivo. El sitio todavía no está publicado, así que nada puede verificarse contra `proinocuidad.com` hasta que lo esté.

## Decisions

### 1. `llms.txt` se escribe a mano en la raíz, no se genera

Es un archivo de texto con 18 enlaces. Un generador para eso daría un script más que mantener a cambio de no automatizar nada: el contenido cambia una vez cada pocos meses, cuando se añade un curso o un servicio, y esos cambios pasan por el generador de fichas.

Un `.md` que se queda viejo es peor que no tener `.md`. Al escribirlo a mano se ve en el diff cuándo se toca y por qué.

### 2. Las secciones son Servicios, Cursos, Información y Optional

El estándar define `Optional` como la sección de lo secundario, y el reparto sigue cómo se usa el sitio:

- **Servicios**: los 4 de consultoría, más las 4 páginas de detalle de servicio.
- **Cursos**: el listado y las 8 fichas.
- **Información**: Inicio, Nosotros, Noticias y la página pilar de inocuidad alimentaria.
- **Optional**: lo que un agente puede saltarse con contexto corto, que aquí es Noticias y la página pilar, por ser contenido editorial y no comercial.

### 3. Las descripciones son de una línea y sin lenguaje promocional

El estándar lo pide explícitamente: "concise, clear language", "brief, informative descriptions", "avoid ambiguous terms". Cada enlace describe **qué hay en esa página**, no qué buena es la empresa. El copy comercial del sitio, con eslóganes y superlativos, no se traslada: aquí la regla es que una descripción que sirva para las cuatro páginas de servicio no sirve para ninguna.

### 4. `llms-full.txt` lleva el contenido dentro

El estándar dice que los enlaces deberían apuntar a markdown. En vez de 18 archivos `.md`, el contenido viaja en un segundo archivo. Así un agente hace dos peticiones en vez de dieciocho, y no parsea nada.

Cada sección de `llms-full.txt` indica a qué página corresponde su contenido, porque si no el agente no puede citar la fuente. Y se limpian de navegación, botones y datos de contacto repetidos, que es justamente el ruido que el archivo existe para evitar.

### 5. La verificación contrasta `llms.txt` contra `sitemap.xml`

Es la comprobación que de verdad importa: un `llms.txt` con una URL muerta es peor que no tenerlo, porque el agente la sigue y recibe un 404. El contraste es una comparación de conjuntos, y se automatiza porque el fallo más probable es añadir una página y que se quede fuera.

### 6. Se corrigen las dos specs con "13 páginas"

`seo-base` es el caso grave: su requisito dice 13 y **su propio escenario exige "13 entradas `<url><loc>`"**, así que la spec se contradice con el `sitemap.xml` que tiene 18. Un agente que la leyera creería que sobran cinco páginas. `diseno-responsive` tiene el mismo número en la auditoría.


## Risks / Trade-offs

- **[El archivo puede quedarse viejo si se añade una página y nadie actualiza `llms.txt`]** → Es el riesgo principal de cualquier archivo escrito a mano. Se mitiga con la verificación de cobertura contra `sitemap.xml` en las tareas: si aparecen 19 páginas y `llms.txt` lista 18, salta. Además queda anotado en el CHANGELOG que añadir una página obliga a tocarlo.

- **[`llms.txt` enlaza a HTML, que el estándar v2 dice que no es ideal]** → Es una desviación consciente y ya decidida. Se compensa con `llms-full.txt`. La desviación se acepta porque el alternativa, mantener 18 archivos `.md` sincronizados con un generador que hoy genera las fichas, tiene un coste de mantenimiento constante a cambio de un beneficio que el segundo archivo cubre.

- **[Lighthouse audita la presencia de `llms.txt`, no su calidad]** → Se puede tener el archivo y que no sirva de nada. Por eso el contenido se ha diseñado para que un agente entienda qué hace el sitio, no solo para pasar un chequeo.

- **[El archivo no se puede probar contra el dominio hasta que se publique]** → Ahora mismo `proinocuidad.com` es el WordPress viejo. La verificación se hace contra los archivos locales y el sitemap, que es la fuente de verdad. La comprobación en vivo queda como paso posterior a la publicación.

## Migration Plan

Dos archivos nuevos en la raíz. Sin migración, sin backend, sin build, sin estado que deshacer. Si molestan, se borran y no queda rastro: ninguna página depende de ellos.

## Open Questions

Ninguno que afecte a las specs, el enfoque o el reparto del trabajo. Queda una comprobación para cuando el sitio esté publicado, que no bloquea nada: pedir el `llms.txt` a un asistente y comprobar que responde preguntas sobre los cursos y los servicios sin necesitar las páginas HTML. Si el asistente se pierde, significa que el archivo necesita más detalle y no menos.