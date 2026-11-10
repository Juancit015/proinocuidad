# Design

## Context

La sección Cursos se emite con dos generadores y una fuente de datos:

- `assets/js/cursos-data.js` (`window.PROINO_CURSOS`): alimenta las tarjetas del
  listado y los destacados del Inicio.
- `tools/generar-listados.mjs`: reescribe `#lista-cursos` de `cursos/index.html` y
  `#cursos-destacados` de `index.html` entre marcadores `generar-listados:inicio/fin`.
  Hoy vuelca **todos** los cursos en el listado asíncrono.
- `tools/generar-fichas.mjs`: emite las 8 fichas de `cursos/<slug>/` y `404.html`.
  Los textos de modalidad asíncrona están fijos en `statsGrid` («100% Asíncrono
  (Grabado)»), `beneficiosBloque` («A tu propio ritmo»), `metodologiaBloque`
  (pasos de sesiones grabadas y nota mínima 14) y `jsonLdCurso`
  (`courseMode: "Asíncrono (grabado)"`).

Restricciones que condicionan el diseño:

- El HTML del listado y de las fichas es estático: nada de render por JS.
- El formulario de inscripción ya existe en la plantilla y el endpoint acepta
  cualquier `curso`; no hay que tocar `ajax/envio-inscripcion.php`.
- Regenerar debe dejar las 8 fichas existentes **byte a byte** iguales.
- `.card-img` recorta a 16:10 con `object-fit: cover`; el flyer de esta edición es
  cuadrado y su texto llegaría cortado.

## Goals / Non-Goals

**Goals:**

- Publicar la cohorte en vivo con ficha completa, tarjeta en «En vivo» y entrada SEO,
  sin duplicar plantillas ni crear un endpoint nuevo.
- Parametrizar por modalidad lo que hoy está fijo en el generador, con valores por
  defecto que reproduzcan exactamente las 8 fichas asíncronas.
- Dejar el listado asíncrono y los destacados del Inicio intactos.

**Non-Goals:**

- No se crea una cohorte en vivo reutilizable ni un panel de administración: la
  edición se edita como un objeto más del generador.
- No se toca la emisión de certificados, el aula Moodle ni el endpoint del formulario.
- No se cambia el diseño de las 8 fichas asíncronas ni el CSS global de tarjetas.

## Decisions

### 1. La cohorte vive en `PROINO_CURSOS` con `modalidad` como discriminador

Se añade una entrada más a `window.PROINO_CURSOS` con `modalidad: "En vivo (Zoom)"`,
`fechas`, `prontoPago` y `enHome: false`. Alternativa descartada: un array separado
`PROINO_CURSOS_EN_VIVO`; obligaría a duplicar `cargarCursos`, la tarjeta y el
mantenimiento de dos fuentes.

El generador filtra por prefijo: `#lista-cursos` toma solo `Asíncrono*` y el bloque
nuevo `#lista-envivo` toma solo `En vivo*`. Así el curso no se cuela en Asíncronos ni
en el Inicio aunque `enHome` cambie por error.

### 2. El panel «En vivo» pasa a tener marcadores propios

`cursos/index.html` mantiene el `<h2>` y cambia el `.proximamente` por:

```html
<div class="cards-grid" id="lista-envivo">
  <!-- generar-listados-envivo:inicio -->…<!-- generar-listados-envivo:fin -->
</div>
```

`generar-listados.mjs` gana un `reemplazar()` con nombre de marcador y escribe:
tarjetas si hay cohortes, o el aviso `.proximamente` con `grid-column: 1 / -1` si no
las hay. El aviso sigue existiendo como estado vacío sin lógica de cliente.

### 3. La ficha en vivo es un objeto más de `FICHAS`, con variantes opcionales

`EN_VIVO` se añade a `FICHAS` y `ficha()` lo emite igual que a las demás. Las
diferencias se resuelven con campos opcionales y valores por defecto idénticos a los
actuales:

| Punto | Campo opcional | Valor por defecto (asíncrono) |
|---|---|---|
| Stats: modalidad | `modalidadStat` | `100% Asíncrono (Grabado)` |
| Stats: certificación | `certificacionStat` | `Con Código QR Oficial` |
| Stats: estructura | `estructura` | ya existente |
| Beneficios | `beneficios[]` | los 4 actuales |
| Metodología | `metodologiaPasos[]`, `metodologiaNota` | pasos grabados + nota 14 |
| JSON-LD | `courseMode` | `Asíncrono (grabado)` |
| Sidebar | `etiquetaFlyer`, `fechas`, `prontoPago` | sin bloque extra |

Alternativa descartada: una función `fichaEnVivo()` aparte; duplicaría 200 líneas de
layout y las dos versiones se separarían con el primer cambio de diseño.

Para la cohorte en vivo: `estructura: "3 Sesiones · 8 al 10 dic"`, modalidad
«En vivo (Zoom)», certificación «Opcional con QR». El horario (7:30–10:00 PM) va en
el hero, en el sidebar y en la metodología; la barra de stats no admite una quinta
tarjeta porque la rejilla es de 4 columnas fijas.

### 4. Dos versiones del mismo flyer

El JPEG de 1080×1080 se convierte a WebP en dos versiones:

- `flyer-curso-09-bpm-haccp-en-vivo.webp` (1080×1080, 140 KB): sidebar de la ficha,
  donde la imagen se muestra completa.
- `flyer-curso-09-bpm-haccp-en-vivo-card.webp` (1200×675, 84 KB): tarjeta del listado,
  que recorta a 16:10. Se compone con el flyer completo (675×675) centrado sobre una
  copia ampliada y desenfocada del mismo flyer. Así se lee todo el póster y la tarjeta
  no muestra texto cortado.

Se probó primero un recorte 16:10 directo; cortaba por la mitad las etiquetas de
«CERTIFICADO CON QR», «AULA VIRTUAL» e «INCLUYE MANUALES» y se descartó.
Alternativa descartada: `object-fit: contain` con fondo plano; dejaba franjas
laterales duras y rompía la alineación visual con las otras 8 tarjetas.

El hero de la ficha usa `ficha-bpm.avif` (foto de planta ya existente): el póster
cuadrado con texto no se lee bajo el degradado azul del `.ficha-head`.

### 5. Precio regular y pronto pago en el sidebar

`pen: 60`, `usd: 17` y `prontoPago: { pen: 45, usd: 15, hasta: "4 de diciembre de 2026" }`.
El sidebar mantiene las dos filas de precio actuales y añade debajo una línea
`.pronto-pago` con el monto y la fecha. La tarjeta repite la línea bajo el párrafo de
certificación. Alternativa descartada: poner el pronto pago como precio principal y
tachar el regular; confunde la oferta y contradice la nota «no incluye IGV» del precio
base.

### 6. Certificado opcional descrito sin evaluación

El documento fuente dice «certificado digital por 40 horas con QR (opcional)» y no
define examen ni nota para la modalidad en vivo. La ficha lo describe como opcional,
sin costo adicional y solicitado al finalizar, y **no** publica la nota mínima 14 de
las fichas asíncronas. Si el dueño luego define una evaluación, se añade como texto y
se actualiza la spec.

### 7. SEO y documentación manual

`sitemap.xml` (21 entradas), `llms.txt` (21 páginas listadas) y `llms-full.txt`
(sección nueva tras las 8 fichas) se editan a mano, como el resto de páginas nuevas.
El JSON-LD de la ficha en vivo declara `courseMode: "En vivo (Zoom)"` — misma
convención en español que las otras 8 fichas — y ofertas PEN 60 / USD 17.

## Risks / Trade-offs

- **El generador emite las 8 fichas con bytes distintos al parametrizar** → se
  regenera antes y después con `diff -rq` contra una copia en `/tmp`; cualquier
  diferencia en las 8 existentes es un fallo, no un efecto aceptable.
- **El pronto pago caduca el 4 de diciembre de 2026** → la fecha queda en un solo
  campo (`prontoPago.hasta`) y en la tarea de seguimiento; después hay que quitar el
  bloque o actualizarlo, no hay expiración automática en un sitio estático.
- **El recorte 16:10 pierde la banda inferior del flyer** → el recorte se hace sobre
  un punto controlado (antes de «CERTIFICADO OPCIONAL») y el texto de la tarjeta
  vuelve a decir que el certificado es opcional.
- **La ficha en vivo no está en Moodle** → el formulario envía el curso por correo y
  la matrícula se gestiona a mano, igual que hoy por WhatsApp; no se promete emisión
  automática.
- **Duplicar el flyer en dos archivos** → ~200 KB extra; se compensa con que la
  tarjeta no muestra texto cortado. Ambos se generan desde el mismo JPEG.
