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
│   ├── css/main.css               # Único stylesheet del sitio (variables de la paleta institucional)
│   ├── js/main.js                 # Menú móvil + mega-menú (acordeón, Escape)
│   ├── js/cursos-data.js          # Datos de los 8 cursos + constantes de contacto del sitio
│   ├── fonts/                     # Outfit (woff2 variable, subconjunto latin)
│   └── img/                       # Imágenes optimizadas (logo, favicon, flyers, fotos, QR)
│       └── pagos/                 # Logos de medios de pago (yape, plin, bbva, western-union, paypal)
├── tools/
│   └── generar-fichas.mjs         # Generador de las 8 fichas estáticas de cursos
├── openspec/                      # Especificaciones y cambios del proyecto (ver sección OpenSpec)
├── _archivo/                      # Material fuente no publicado (no forma parte del sitio)
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
| Datos de contacto del sitio (email, WhatsApp, horario, comunidad) | constante `PROINO_SITIO` en `assets/js/cursos-data.js` **y** el footer repetido en cada página |
| Footer y navegación | bloque repetido en cada `index.html` (copiar de una página existente al editar) |
| Textos de Nosotros / Servicios / Noticias | `nosotros/index.html`, `servicios/index.html`, `noticias/index.html` |
| Colores institucionales (azul #101477, rojo #AD343B, gris #252525) | variables `:root` en `assets/css/main.css` |
| Estilos de tarjetas, fichas, pestañas y pagos | `assets/css/main.css` |

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
