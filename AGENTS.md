# AGENTS.md — Proinocuidad

Sitio corporativo estático de Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L. (Trujillo, Perú).
**18 páginas HTML, sin build, sin `package.json`, sin dependencias.** Se sube tal cual al hosting.

- Juan, en español. Solo cambios visuales salvo que pida otra cosa.
- Paleta de marca en variables de `:root` (`assets/css/main.css`): `--azul #101477`, `--rojo #ad343b`, `--gris #5c5f6a`, `--gris-linea #e3e5ee`. No se tocan.

---

## Entorno

`node` y `openspec` **no están en el PATH** por defecto:

```bash
export NVM_DIR="$HOME/.config/nvm" && . "$NVM_DIR/nvm.sh"
```

No hay `npm install` que hacer para el sitio: no hay manifest. Node solo se usa para los generadores y para `openspec`.

Servidor local para probar:

```bash
cd /home/juan/proinocuidad && python3 -m http.server 8899 --bind 127.0.0.1
```

## Ficheros generados: no se editan a mano

| Qué | Se genera con |
|---|---|
| `cursos/<slug>/index.html` (8 fichas) | `node tools/generar-fichas.mjs` |
| `404.html` (página de error) | `node tools/generar-fichas.mjs`, función `pagina404` |
| Las tarjetas dentro de `cursos/index.html` (`#lista-cursos`) y `index.html` (`#cursos-destacados`) | `node tools/generar-listados.mjs`, entre los marcadores `<!-- generar-listados:inicio -->` / `:fin` |

**La trampa grande: el `generar-fichas.mjs` también emite la barra de navegación completa.** Un cambio en el menú o la cabecera hay que aplicarlo **al generador y a mano en las otras 10 páginas** que no son fichas. Si solo se edita el HTML, la siguiente generación lo revierte.

Siempre que se toque algo generado, verificar que el generador reproduce lo editado, en vez de asumirlo:

```bash
cp -r cursos /tmp/cursos-antes && node tools/generar-fichas.mjs && diff -rq /tmp/cursos-antes cursos
```

**El generador usa dos prefijos y no son intercambiables:** `ruta` va hasta la raíz del
sitio (`"../../"` en las fichas, `""` en el 404) y `cursos` hasta `cursos/index.html`
(`"../"` en las fichas, `"cursos/"` en el 404). Si se confunden, **las fichas siguen
funcionando pero cambian de bytes**, porque `../index.html` y `../../cursos/index.html`
apuntan al mismo archivo. Por eso el `diff` de arriba no es opcional: es el único
aviso. Revisar el prefijo es lo primero cuando un enlace de una ficha se rompa.

Antes de dar por buena una modificación del generador, **exigir `exit 0`**: si falla,
`git status` sale limpio porque no se escribió nada, y eso parece un éxito.

## Verificar UI: Playwright, no el navegador del MCP

**No hay suite de tests.** La única forma real de comprobar un cambio visual es Chromium.

**Las herramientas `browser.*` del MCP no llegan a esta máquina.** Comprobado: tienen internet (`https://example.com` carga) pero `http://127.0.0.1:8899` devuelve `502 Bad Gateway` y `file://` está prohibido. Un arnés con `iframe` que escriba resultados en `document.title` **servirá documentos cacheados y dará resultados falsos**. Ese patrón ya se usó aquí y produjo mediciones inventadas.

Con Playwright:

```js
import { chromium } from 'playwright';
import { homedir } from 'os';
// el headless shell NO está instalado, hay que apuntar al binario completo
const b = await chromium.launch({
  executablePath: `${homedir()}/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome`,
});
```

El Chromium ya está descargado en `~/.cache/ms-playwright/`. El paquete de npm no: hay que `npm i playwright` en `/tmp/opencode/verif` (**y `/tmp/opencode` es volátil**: se ha vaciado dos veces en una sola sesión, no confíes en nada que deba sobrevivir ahí).

Errores de medición que ya se han cometido:

- El sitio tiene `scroll-behavior: smooth` → hay que pasar `behavior: "instant"` al hacer scroll, o esperar.
- Las imágenes con `loading="lazy"` cambian el alto al hacer scroll → esperar a que carguen.
- Las transiciones duran 180-280ms → esperar antes de medir.

## CSS: lo que no se ve leyendo el archivo

- `* { box-sizing: border-box }` está en `main.css:35` → un `min-height` **es** el alto total, no se le suma el padding.
- **Las trampas de especificidad son reales.** `.nav-menu .nav-drop.abierto > .mega-panel.mega-panel-compacto` (5 clases) anula en silencio a un `.mega-panel-compacto` (1 clase). Una regla puede estar en el archivo y no hacer absolutamente nada: por eso se cambió una y no se notó hasta medir el `padding` computado. **Verificar siempre con `getComputedStyle`, nunca confiando en el CSS escrito.**
- Los pseudo-elementos no son objetos de evento: al tocar uno, el clic tiene como destino el elemento que lo origina. Por eso "cerrar al tocar fuera" pregunta por el panel y el botón, no por "dentro de la cabecera".
- Para medir un pseudo-elemento: `getComputedStyle(el, '::after')`.
- **Un pseudo-elemento posicionado se pinta ENCIMA del contenido normal.** `.hero::after`
  (el círculo rojo) no tiene `z-index`, así que sin protección tiñe el texto. Lo
  resuelve `.hero > .container { position: relative; z-index: 2 }`. Un hero nuevo queda
  cubierto por usar esa estructura: no hace falta una regla por página.
- **Los botones apilados se copian de `.matricula-cta-group`**, no se inventan: columna con
  los botones a `width: 100%`. Los grupos que ya funcionan son `.matricula-cta-group`,
  `.card-acciones` y `.card-body`; **no tocarlos**.
- **`.hero-acciones` va en tres franjas, no en dos**: columna hasta 559px, rejilla de dos
  columnas de 560 a 860px, y nada por encima. El corte de 560px es aritmético: a 390px
  una columna de dos sería de 172px y las etiquetas necesitan hasta 279px. Si se sube el
  corte sin comprobar eso, aparecen botones con el texto partido.
- **Los botones de un grupo ocupan toda su columna, nunca su ancho natural.** Si se
  dimensionan por su texto (`width: auto`) vuelven las filas desparejas, que es
  justamente el defecto que esto arregla.
- **El icono de WhatsApp es relleno y vive en `SVG_WA`**, no en `SVG_BTN_*`: es una marca,
  no una acción, y el relleno es lo que la hace reconocible. Los 21 botones de WhatsApp
  del sitio lo usan así. No volver a crear un icono de WhatsApp en trazo.
- **El orden de los botones del 404 está fijado en su especificación**
  (`pagina-404`, "Orden de las rutas de salida"). Si hay que cambiarlo, se cambian la
  spec y el generador, no solo el generador.
- **Para medir si un texto llega a un decorativo, medir la tinta, no la caja.** La caja de
  un bloque `h1` ocupa todo el ancho del contenedor mida lo que mida su texto: el del 404
  mide 1229px aunque su texto termine en 651. Comparar cajas da falsos positivos. Y
  cualquier comprobación de este fallo va **a 390px**: por encima de unos 600px el
  defecto es invisible.

### Restricciones que no hay que violar

- **Prohibido `overflow-x: hidden` global en `html`/`body`**: rompe los `position: sticky` (cabecera, imagen de "Quiénes somos", sidebar de las fichas).
- El breakpoint del menú es **860px**, y la cabecera es `position: sticky` en **todas** las pantallas, móvil incluido. Es deliberado.
- El bloque de movimiento reducido es un `@media (max-width: 860px) and (prefers-reduced-motion: reduce)` aparte: si se añade una transición hay que añadirla también ahí.
- El requisito **"Contenido sin cambios"** de la spec `diseno-responsive` prohíbe tocar textos, colores, enlaces y datos de contacto en cambios responsive. La forma de cumplirlo es cambiar solo CSS.

## OpenSpec

17 specs, 49 changes archivados. Flujo: `/opsx-propose` → `/opsx-apply` → `/opsx-archive`.

- **9 de las 17 specs no pasan `--strict`** por descripciones de más de 500 caracteres. Es **preexistente**: no es una regresión y no hay que arreglarlas de paso.
- Bajo `## MODIFIED` se conserva el bloque del requisito entero. El schema **prohíbe** reescribir texto existente solo para cumplir el límite de 500 caracteres.
- **Al extraer un bloque MODIFIED de un delta para sincronizarlo, hay que cortar en el próximo `## ` además del próximo `### Requirement:`**. Si solo se corta por `###`, el bloque **se traga el encabezado del delta** (`## ADDED Requirements`) y al pegarlo en la spec principal trunca la sección de requisitos y deja invisibles todos los que van detrás. Pasa de largo y solo lo delata el validador.
- `rediseno-fichas-cursos` es un change activo roto (2/6, falla `validate` por escenarios omitidos). Está ahí desde hace tiempo.

## Git

- Rama `main`, remoto GitHub. **Nunca hacer push sin confirmación explícita.** Hay commits sin pushear.
- Un commit por cambio, y separados los de código de los de OpenSpec.
- No mezclar el trabajo de Juan con el del agente en un mismo commit: si van juntos porque comparten líneas del mismo archivo, decirlo en el mensaje.
- Mensajes en español: asunto corto, cuerpo explicando **por qué** (no un listado de cambios), y un bloque `Verificado:` con los hechos medidos.

## Pendientes que morirán al publicar

`proinocuidad.com` sigue siendo un WordPress ("Flavita"); el sitio nuevo no está publicado. Antes hay que resolver:

- El botón **Aula Virtual** apunta a `https://proinocuidad.com/login/`, que es el login del WordPress viejo: dejará de existir al publicar.
- **FormSubmit sin activar**: necesita un envío de prueba a `administracion@proinocuidad.com`.
- **Dos tokens de GitHub quedaron expuestos en el chat y sin revocar.**
- **El hosting tiene que servir `404.html` con estado 404.** El repositorio no tiene
  ninguna configuración de servidor: no hay `.htaccess`, ni `netlify.toml`, ni
  `vercel.json`, ni `_headers`. Sin eso, un `404.html` puede existir en el repo y no
  mostrarse nunca, en silencio. Netlify, GitHub Pages y Cloudflare Pages lo sirven por
  convención; Apache o nginx sin configuración, no. Si toca el segundo caso, hace falta
  un `.htaccess` con `ErrorDocument 404 /404.html`.

## Archivos que se quedan viejos si nadie los actualiza

- **`llms.txt` lista las 18 páginas a mano, igual que `sitemap.xml`.** Añadir o
  retirar una página obliga a tocar los dos. La comprobación es comparar sus URLs
  como conjuntos: si `sitemap.xml` tiene 19 y `llms.txt` tiene 18, alguien se ha
  olvidado de una. `404.html` no entra en ninguno de los dos.
- Un `.txt` escrito a mano con una URL muerta es **peor que no tenerlo**: el
  asistente la sigue y recibe un 404. Es el fallo más probable de estos archivos.
- **El número de páginas vive en dos sitios**: el `sitemap.xml` y lo que dicen los
  requisitos de `seo-base` y `diseno-responsive`. Ya se corrigieron: ambas
  declaraban 13 cuando eran 18. Si cambia el número, cambian los tres.

## Datos que se repiten por todo el sitio

Aparecen en 93 líneas de los HTML, así que tocarlos a mano es propenso a dejar incoherencias: WhatsApp `+51 981 365 982`, `administracion@proinocuidad.com`, RUC `20615307603`, Yape/Plin `+51 971 625 142`, Lun-Vie 8AM-8PM.

En las fichas, el origen único son las constantes de `tools/generar-fichas.mjs`. El campo `waLargo` de `assets/js/cursos-data.js` tiene que coincidir con la constante del generador, o los mensajes de los botones de la ficha y de los listados no serán iguales.