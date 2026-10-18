# STRUCTURE.md — Mapa del repositorio

Mapa para quien mantenga o desarrolle el sitio. Para la descripción del proyecto y su
contenido ver [README.md](README.md); el registro de cambios está en [CHANGELOG.md](CHANGELOG.md).

## Árbol de directorios

```
Proniciudad/
├── index.html                     # Página Inicial (hero, cifras, servicios, cursos, noticia, footer)
├── nosotros/index.html            # Página Nosotros
├── servicios/index.html           # Página Servicios (con anclas #capacitacion-empresarial, etc.)
├── noticias/index.html            # Página Noticias y eventos
├── cursos/
│   ├── index.html                 # Listado con pestañas Asíncronos / En vivo
│   └── <slug>/index.html          # Ficha de detalle de cada curso (8 fichas)
├── assets/
│   ├── css/main.css               # Único stylesheet del sitio (variables de la paleta institucional, media query propia para la franja 560–860px del menú móvil)
│   ├── js/main.js                 # Menú móvil (acordeón, Escape, cierre al tocar el velo) + mega-menú
│   ├── js/cursos-data.js          # Datos de los 8 cursos + constantes de contacto del sitio
│   ├── fonts/                     # Outfit (woff2 variable, subconjunto latin)
│   └── img/                       # Imágenes optimizadas (logo, favicon, flyers, fotos, QR)
│       └── pagos/                 # Logos de medios de pago (yape, plin, bbva, western-union, paypal)
├── tools/
│   └── generar-fichas.mjs         # Generador de las 8 fichas Y de la página 404
├── openspec/                      # Especificaciones y cambios del proyecto (ver sección OpenSpec)
│   ├── pagina web.pdf             # Documento oficial: fuente única de verdad del contenido
│   └── FOTOS-(1)/FOTOS/           # Material fuente (logo, flyers originales, fotos)
└── logos-metodos-de-pago/         # Logos de medios de pago tal como los entregó el dueño
```

## Dónde se edita cada contenido

| Contenido | Archivo donde se edita |
|---|---|
| Textos y secciones de la Página Inicial | `index.html` |
| Tarjetas de cursos destacados del Home | `assets/js/cursos-data.js` (campo `enHome`) |
| Listado de cursos y pestañas | `cursos/index.html` (render desde `cursos-data.js`) |
| Ficha de cada curso (temario, objetivo, inversión…) | `cursos/<slug>/index.html`; para regenerar: `tools/generar-fichas.mjs` |
| Foto de "¿Quiénes somos?" (grupo frente a la casona amarilla) | `assets/img/nosotros.webp`, referenciada en `index.html` y `nosotros/index.html` |
| Datos de contacto del sitio (email, WhatsApp, horario, comunidad) | constante `PROINO_SITIO` en `assets/js/cursos-data.js` **y** el footer repetido en cada página |
| Footer y navegación | bloque repetido en cada `index.html` (copiar de una página existente al editar) |
| Página de error `404.html` | `tools/generar-fichas.mjs` (función `pagina404`). **No se edita el HTML a mano** |
| Textos de Nosotros / Servicios / Noticias | `nosotros/index.html`, `servicios/index.html`, `noticias/index.html` |
| Colores institucionales (azul #101477, rojo #AD343B, gris #252525) | variables `:root` en `assets/css/main.css` |
| Estilos de tarjetas, fichas, pestañas y pagos | `assets/css/main.css` |

## Mensajes prellenados de WhatsApp

Los 113 enlaces a WhatsApp llevan el mensaje en el propio `href`
(`https://wa.me/51981365982?text=...`), sin JavaScript. Catálogo por contexto:

| Contexto | Mensaje |
|---|---|
| Contacto directo (barra superior y pie) | Hola, escribo desde la web de Proinocuidad. Deseo comunicarme con ustedes. |
| Botón flotante "Envíanos un mensaje!" | Hola, escribo desde la web de Proinocuidad. Quiero información sobre sus cursos y servicios de inocuidad. |
| Contacto del bloque final del home | Hola, escribo desde la web de Proinocuidad. Quiero información sobre sus cursos y servicios. |
| "Consultar por WhatsApp" (hero del home) | Hola, encontré la web de Proinocuidad y quiero información sobre sus cursos y servicios. |
| "Solicitar asesoría por WhatsApp" (CTA del home) | Hola, solicito asesoría sobre sus cursos y servicios. |
| "Solicitar asesoría" / CTA de un servicio | Hola, solicito asesoría sobre el servicio de {SERVICIO}. |
| CTA de inocuidad-alimentaria | Hola, solicito asesoría sobre el programa de Inocuidad Alimentaria. |
| CTA de nosotros | Hola, quiero conocer más sobre Proinocuidad y sus servicios. |
| CTA final de servicios | Hola, solicito asesoría sobre sus servicios de inocuidad. |
| Tarjeta de curso y botón de la ficha | Hola, deseo más información y matricularme en {CURSO}. |

`{SERVICIO}`: Certificación HACCP · Implementación FSSC 22000 · BRCGS Food Safety ·
Registro Sanitario DIGESA.

**Dónde se edita cada uno.** El contacto directo y el flotante están como constantes
`waContacto` y `waFlotante` en `tools/generar-fichas.mjs` (afectan a las 8 fichas) y
además repetidos en los 10 HTML escritos a mano, porque `cursos/index.html` conserva su
propia cabecera y pie. Si cambias uno, cambia los dos sitios. La tarjeta de curso usa
`waCurso(c)` en `tools/generar-listados.mjs` y el nombre viene del campo `waLargo` de
`assets/js/cursos-data.js`, que debe coincidir con el `waLargo` de `tools/generar-fichas.mjs`
para que la tarjeta y su ficha envíen el mismo mensaje. Los mensajes de factura,
matriculación desde el extranjero e inscripción ya confirmada también viven en el generador
de fichas y no deben tocarse sin pedirlo.

**Antes de añadir un botón nuevo**, asígnale un mensaje del catálogo. La regla de la spec
`contacto-whatsapp` es que ningún enlace puede abrir el chat vacío.

## Nombres de los slugs de curso

`diplomado-gestion-calidad-e-inocuidad` · `legislacion-sanitaria-alimentos` ·
`implementacion-auditoria-bpm-poes-poe-plan-haccp` · `haccp-implementacion-certificacion-digesa-senasca` ·
`bpm-prerrequisitos-codex-2022-iso-22002-1` · `programas-higiene-saneamiento` ·
`sistema-haccp-fssc-22000-codex-2022` · `formacion-auditor-interno-haccp`

## Regenerar las fichas de cursos

```bash
node tools/generar-fichas.mjs
```

El generador reescribe los 8 archivos `cursos/<slug>/index.html` a partir del contenido
definido dentro del propio script. Regenerar **sobrescribe** los HTML de las fichas:
si una ficha se editó a mano, el cambio se pierde al regenerar — editar el script o la ficha, no ambos.

También emite `404.html` en la raíz, con las mismas funciones de cabecera y pie
(`cabecera()`, `pie()`, `cierre()`) que usan las fichas. Editar `404.html` a mano es
inútil: el siguiente `node tools/generar-fichas.mjs` lo sobrescribe.

**Los dos prefijos de ruta no son intercambiables.** `ruta` es el camino hasta la raíz
del sitio (`"../../"` en las fichas, `""` en el 404) y `cursos` es el camino hasta
`cursos/index.html` (`"../"` en las fichas, `"cursos/"` en el 404). Confundirlos
cambia las rutas sin avisar, y las fichas seguirían funcionando porque `../index.html`
y `../../cursos/index.html` apuntan al mismo sitio. Por eso la comprobación de que
las fichas salen idénticas es `git status`, no una mirada.

`404.html` **no** entra en `sitemap.xml` ni en el menú, y declara `noindex, follow`.

## Assets: convenciones

- Flyers de curso: `assets/img/flyer-curso-NN-<slug>.webp` (derivados de `_archivo/FOTOS-(1)/FOTOS/FLYER CURSOS/`).
- Fotos reales: `capacitacion-laredo-auditorio.jpg`, `capacitacion-laredo-aula.jpg`,
  `conferencia-razzeto-zoom.jpg`, `capacitacion-cevicheria-dsumare.jpg`, `consultoria-planta.jpg`,
  `inspeccion-calidad.jpg`, `registro-sanitario-alimentos.webp`, `qr-pago-bbva.webp`.
- Logo: `logo-proinocuidad.png` · Favicon: `favicon.ico` · Icono Apple: `apple-touch-icon.png` (180×180).
- Imagen para compartir (`og:image`, 1200×630): `proinocuidad-og-1200x630.png`. Se referencia con URL absoluta.
- El flyer `flyer-curso-04-haccp-digesa-senasca.webp` (edición en vivo por Zoom) **no se
  publica en el sitio** por decisión del dueño; queda disponible hasta que el cliente
  defina su uso o entregue un flyer asíncrono para esa tarjeta.

## Pendientes marcados en el código (TODO)

- `assets/js/cursos-data.js` → campo `urlCulqi` de cada curso (hoy `#`): pegar el enlace de pago Culqi.
- Cada ficha → clase `num-pagos` (hoy `+51 99999999`): número real de Yape/Plin.
- Ubicación en el footer: "Próximamente" hasta tener la dirección exacta.

## OpenSpec

- `openspec/specs/` — 9 especificaciones vivas (contrato de comportamiento del sitio):
  `navegacion-global`, `pagina-inicio`, `pagina-nosotros`, `pagina-servicios`, `cursos`,
  `pagos-e-inscripcion`, `noticias`, `contacto-footer`, `seo-base`.
- `openspec/changes/archive/` — cambios completados y archivados:
  `2026-10-10-sitio-web-proinocuidad` (construcción del sitio),
  `2026-10-10-en-vivo-sin-flyer` (aviso de la pestaña En vivo),
  `2026-10-10-estructura-base-seo` (sitemap, robots, canonical, JSON-LD).
- Flujo de trabajo: proponer un cambio con `/opsx-propose`, implementarlo con `/opsx-apply`,
  archivarlo con `/opsx-archive`. Los cambios de comportamiento del sitio deben partir de
  esas especificaciones (actualizarlas en el change, nunca a mano suelto).

## Despliegue (publicación a proinocuidad.com)

Sitio 100% estático, sin build ni CI: se publica subiendo archivos al hosting.
Los cambios de la sesión 2026-10-15 pendientes de publicar son 3 (ver `CHANGELOG.md`):

1. **Home con portada en noticia** (`home-noticia-con-portada`, archivado):
   `index.html` (tarjeta `#noticias` con `<img noticia-digesa-haccp.jpg>`).
2. **Fichas sin banda derecha** (`ficha-sin-desborde-general`, archivado):
   `assets/css/main.css` (fix honeypot `.campo-honey` + contención en escritorio).
3. **País como desplegable** (`formulario-select-pais`, implementado 6/6, pendiente de archivar):
   `tools/generar-fichas.mjs` + las 8 fichas regeneradas + `assets/css/main.css`
   (regla `.form-inscripcion select`).

### Qué subir (mínimo)

- `index.html`
- `assets/css/main.css`
- `cursos/*/index.html` (las 8 fichas)
- `CHANGELOG.md` (opcional, informativo)

### Qué NO subir

- `openspec/`, `tools/`, `.opencode/`, `logos-metodos-de-pago/`
  (trabajo local, generadores y especificaciones; no forman parte del sitio).

### Verificación post-deploy (Ctrl+F5 para evitar caché)

- Home: la tarjeta DIGESA muestra la foto con las píldoras legibles.
- Ficha del diplomado en 1280 y en móvil: sin scroll horizontal ni banda
  blanca a la derecha (el bug medía +219px por el honeypot).
- Formulario de cualquier ficha: País es desplegable con Perú por defecto
  y opción Extranjero, con flecha azul integrada.
- Enviar una inscripción de prueba llega a `administracion@proinocuidad.com`
  con `pais=Perú` (o `Extranjero`).

### Rollback

- CSS y generador: respaldos en `%TEMP%\opencode\respaldo-*` de cada change.
- Todo el repo: `git diff` / `git stash` antes de subir; último commit
  publicado: `aa1676b FORM:CONTENT-CURSOS`.
