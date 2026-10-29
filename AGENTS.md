# AGENTS.md — Proinocuidad

Sitio corporativo estático de Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L. (Trujillo, Perú).
**20 páginas HTML públicas más la página de error, sin build, sin `package.json`, sin dependencias.** Se sube tal cual al hosting.

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

- Rama `main`, remoto GitHub. **Nunca hacer push sin confirmación explícita.**
- **Nunca hacer push sin que el usuario verifique el resultado localmente** (cambios visuales, tests, capturas). El agente NO decide por su cuenta que algo está listo para producción.
- **Nunca ejecutar `tools/publicar.sh` (deploy al server) ni tocar producción sin consentimiento expreso de Juan**, aunque el push ya esté confirmado: son dos pasos independientes, cada uno se autoriza por separado.
- Un commit por cambio, y separados los de código de los de OpenSpec.
- No mezclar el trabajo de Juan con el del agente en un mismo commit: si van juntos porque comparten líneas del mismo archivo, decirlo en el mensaje.
- Mensajes en español: asunto corto, cuerpo explicando **por qué** (no un listado de cambios), y un bloque `Verificado:` con los hechos medidos.

## Formulario de inscripción (2026-10-25)

**Estado actual:** el form de las 8 fichas envía TODO por AJAX (JSON,
multipart cuando hay voucher) a `/ajax/envio-inscripcion.php`; el endpoint
valida, limita y **entrega el correo por SMTP directo con PHPMailer 6.9.3
(Zoho)**. FormSubmit se abandonó definitivamente: respondía `success:true`
y descartaba el voucher en silencio — el verde era falso. Commit de origen:
`e8c40a1`.

Puntos que hay que no romper:

- **Librería y credenciales viven FUERA del docroot**, en la home del
  cPanel: `~/phpmailer/src/` (PHPMailer v6.9.3) y
  `~/datos-formularios/credenciales-smtp.php` (host/usuario/clave del
  SMTP, chmod 640). La clave de aplicación de Zoho **no va nunca al
  repo ni a este fichero**; si se rota, se edita ahí en el server y no se
  pega en el chat.
- **Host SMTP es `smtp.zoho.com:465` (SMTPS).** `smtppro.zoho.com`
  rechaza con 554 "Access Restricted": es información de otro en la
  configuración de credenciales.
- El asunto lo reconstruye el servidor (`"Inscripción web — {curso}"`);
  `CAMPOS_PERMITIDOS` es la lista cerrada y ya no incluye
  `_subject`/`_template`/`_captcha`. El cuerpo reproduce la plantilla
  "table" (tabla HTML + `AltBody` en texto, hora de Lima).
- `SMTP_DEBUG` en el endpoint controla el log de diagnóstico
  (`~/datos-formularios/envio-log.tsv`, sin datos personales).
  **`false` en producción**; `true` solo durante una investigación, con
  borrado del .tsv al terminar.
- El voucher es **obligatorio** en el endpoint (≤ 5 MB; 6 MB → 422 con
  "El archivo supera el máximo de 5 MB") y el MIME se verifica con
  `finfo` server-side.
- El cliente (`assets/js/main.js`) tiene timeouts reales: **45 s** el
  AJAX (con `AbortController`) y **90 s** el reloj visible; progreso
  "Subiendo comprobante… puede tardar hasta 60 s"; verde solo con
  confirmación del servidor. No cambiarlos sin pensar en líneas de
  Perú lentas de subida.
- Server y repo DEBEN quedar idénticos (`md5sum` del endpoint en ambos;
  el server se edita por fs_edit del MCP aplicando los mismos parches y
  verificando con `php -l` + md5). Última verificación: mismos md5
  `ed7b939806ba8558939eb8f304c86cf4` (23454 B) ambos lados.

Pruebas hechas en producción (2026-10-25, confirmadas por Juan):
voucher 5 MB → HTTP 200 en ~5 s y correo en bandeja de Gmail con la tabla
correcta y el PDF adjunto (correo "Inscripción web — PRUEBA-TÉCNICA
PHPMailer (N3, ignorar)"); voucher 6 MB → 422 con el mensaje del límite;
sin voucher → 422 "El voucher es obligatorio".

## Aula virtual (Moodle) — instalada 2026-10-25

**Estado:** Moodle 4.5.15+ LTS (Build 20261021) instalado y en línea en
`/aula/` (https://proinocuidad.com/aula/, login 200). Idioma español activo,
logo y favicon de Proinocuidad cargando. Pendiente: crear los 10 cursos con
sus sesiones/enlaces de Drive y migrar los 50 alumnos.

Datos operativos (sin secretos aquí):

- **Código:** `/home/guanbhctsy/proinocuidad.com/aula/` (NO está en el
  repo ni en la lista blanca de `tools/publicar.sh`: el deploy no lo toca).
- **Datos:** `/home/guanbhctsy/moodledata/` (fuera del docroot, permisos 700).
- **BD:** MariaDB 11.4, `guanbhctsy_moodle`, usuario `guanbhctsy_moodle`;
  credenciales en `~/.moodle-db-credenciales` (chmod 700). Snapshot previo
  del dominio: ref `1fb9a75b967f697a4fe6c2ea83c57b70ac4e9307`.
- **PHP:** 8.3 para el dominio; extensiones necesarias presentes
  (`mysqli`, `pdo_mysql`, `zip`, `intl`, `soap`, `sodium`, `gd`,
  `mbstring`). El conflicto `mysqli`/`nd_mysqli` de cPanel se resuelve
  solo: Moodle usa `mysqli` (nd_mysqli está activo).
- **Ajustes PHP** (`.user.ini` en `/aula/`): `memory_limit=256M`,
  `max_execution_time=300`, `max_input_time=300`, `max_input_vars=5000`,
  `upload_max_filesize=64M`, `post_max_size=64M`, opcache activo.
- **`.htaccess` en `/aula/`**: `DirectoryIndex index.php` y
  `Options -Indexes` (Moodle no trae `.htaccess`; sin esto LiteSpeed
  listaba el directorio).
- **Admin:** usuario `admin`, email `admin@proinocuidad.com`; la
  contraseña se entregó a Juan el 2026-10-25 y no se guarda en el repo.
  Rotarla si se expone.

Idioma español:

- Paquete descargado de
  `https://download.moodle.org/download.php/direct/langpack/4.5/es.zip`
  y extraído en `moodledata/lang/es`.
- Idioma por defecto puesto con
  `/opt/alt/php83/usr/bin/php admin/cli/cfg.php --name=lang --set=es`,
  luego `purge_caches.php`.

Logo y favicon (truco no obvio):

- Se guardan en `mdl_files` con componente `core_admin`, fileareas
  `logo`/`logocompact`/`favicon`, **itemid 0**.
- El valor en `mdl_config_plugins` (`core_admin`) es la **ruta relativa
  del archivo** (`/logo-proinocuidad.png`, `/favicon.ico`), NO el itemid.
  Poner el itemid ahí no funciona porque `empty('0')` es `true` en PHP y
  `get_logo_url()` devuelve `false`.
- Fuente del logo: `assets/img/logo-proinocuidad.png` (59 KB) y
  `assets/img/favicon.ico` (15 KB) del sitio.

Exporte a migrar (en el server y en `/home/juan/aula-exporte/exporte-aula/`):

- `MANIFIESTO.csv`: `wp_id, login, email, nombre, n_cursos, planes`
  (50 alumnos).
- `CURSOS/`: 10 cursos, cada uno con `pagina.html` (acordeones por
  sesión con enlaces a Google Drive) y `ENLACES.txt`.
- `ALUMNOS/<nombre>/CURSOS_MATRICULADOS.txt` + carpeta por curso.

## Publicación del sitio estático (2026-10-24, server hora 2026-10-25)

- El sitio nuevo está **en producción** en la raíz de `proinocuidad.com` (commit
  `bc72d33`, luego `robots.txt`): 20 URLs a 200, `robots.txt`/`sitemap.xml`/`llms.txt`/
  `llms-full.txt` en vivo, y 404 real vía `.htaccess` (`ErrorDocument 404 /404.html`).
- El WordPress "Flavita" se borró **después** de verificado el sitio y de dejar el backup
  F0 en `server:~/backups/F0-2026-10-24/` (SQL 26.3 MB + tar 755 MiB, MD5 en el
  `MANIFIESTO.md5` del directorio). El docroot debe quedar siempre como la lista blanca
  de `tools/publicar.sh`; **`/aula/` con su `.user.ini`, `moodledata/` y la BD
  `guanbhctsy_moodle` son del lado Moodle: no tocarlas al deploy**
  (`moodledata` está fuera del docroot; si algún día se clona un Moodle local, ahí sí
  tocaría una línea de `.gitignore` — por ahora nada del aula vive en este repo).
- El botón **Aula Virtual** ya apunta a `/aula/login/`: dará 404 hasta que el Moodle
  esté instalado en `/aula/` (F3, el agente de infraestructura o Juan vía MCP).
- **FormSubmit se abandonó** (2026-10-25): dejaba correo y voucher sin
  entregar respondiendo `success:true`. El envío pasó a SMTP directo con
  PHPMailer contra Zoho; ver sección **Formulario de inscripción**. Los
  tres avisos de esa época siguen válidos como historia del flujo con
  iframe que ya no se usa con FormSubmit: el formulario ACTUAL (2026-10-25)
  envía TODO por AJAX al endpoint `/ajax/envio-inscripcion.php`, también
  con voucher (Adjunta hasta 5 MB; los timeouts del cliente son 45 s AJAX
  / 90 s máx). No añadir jamás un campo `_next` al form.
- La mutación del celular a "+51 XXX XXX XXX" va **después** del
  `checkValidity()` del listener de envío: antes del fix rompía la
  validación (el valor con prefijo no pasa `pattern` ni `maxlength`) y el
  formulario salía sin preventDefault hacia la página "Thanks".
- **Flujo futuro del deploy**: commit → push → `tools/publicar.sh` (+ `git_snapshot`
  del dominio antes, para poder retroceder con `git_restore`).
- Pendiente **de seguridad**: revocar los dos tokens de GitHub que quedaron expuestos
  en el chat (siguen sin revocar, repo conectado a deploys reales).
- Copia local del backup F0: pendiente (Juan la bajará por cPanel).

## Archivos que se quedan viejos si nadie los actualiza

- **`llms.txt` lista las 20 páginas a mano, igual que `sitemap.xml`.** Añadir o
  retirar una página obliga a tocar los dos. La comprobación es comparar sus URLs
  como conjuntos: si `sitemap.xml` tiene 19 y `llms.txt` tiene 18, alguien se ha
  olvidado de una. `404.html` no entra en ninguno de los dos.
- Un `.txt` escrito a mano con una URL muerta es **peor que no tenerlo**: el
  asistente la sigue y recibe un 404. Es el fallo más probable de estos archivos.
- **El número de páginas vive en dos sitios**: el `sitemap.xml` y lo que dicen los
  requisitos de `seo-base` y `diseno-responsive`. Sin cambios de páginas, los tres
  se actualizan juntos: hoy declaran 20 (5 fichas de servicio + nota + guías).

## Datos que se repiten por todo el sitio

Aparecen en 93 líneas de los HTML, así que tocarlos a mano es propenso a dejar incoherencias: WhatsApp `+51 981 365 982`, `formacion_academica@proinocuidad.com`, RUC `20615307603`, Yape/Plin `+51 971 625 142`, Lun-Vie 8AM-8PM.

En las fichas, el origen único son las constantes de `tools/generar-fichas.mjs`. El campo `waLargo` de `assets/js/cursos-data.js` tiene que coincidir con la constante del generador, o los mensajes de los botones de la ficha y de los listados no serán iguales.