# CHANGELOG

Todos los cambios notables del sitio web de Proinocuidad se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/).

## 2026-10-23 (Las cifras del Home pasan a tarjetas compactas)

### Changed

- **La franja de cifras del Home usa el patrón de las fichas de curso**:
  cada cifra vive en una tarjeta horizontal con icono de 44px en un cuadro
  azul claro, etiqueta en mayúsculas y gris, y valor en azul oscuro, igual que
  la barra de datos del diplomado. Reutiliza `.stat-icono` y `.stat-info`, así
  que un cambio futuro en la ficha se refleja en el Home.
- **La fila mide 820px como máximo y va centrada**, con tres columnas en
  escritorio y una sola por debajo de 860px. El H2 "Proinocuidad en cifras"
  conserva el `section-head` y el subrayado rojo del resto de secciones, y
  queda alineado con el hero en lugar de sangrado con las tarjetas.
- **El hover sube 3px y gana sombra, sin borde rojo**, igual que
  `.ficha-stat-card`; con movimiento reducido el cambio es instantáneo.
- **La sección lleva como fondo la foto de planta que aportó el dueño**: un
  AVIF de 12KB derivado de su original sin marcas de agua, cubierto por un
  velo blanco degradado (0.62 tras el título, 0.30 sobre la chica) y con
  `background-position: center 13%` para que la cara de la trabajadora se
  vea completa. El padding de la sección sube de 48px a 64px porque la
  franja visible de foto no daba para todo el rostro y quedaba cortada en
  la barbilla. El H2 va completo en el azul de marca y el subrayado en rojo:
  las reglas del velo oscuro anterior (título blanco y `#ff8f96`) se
  retiraron. El acento rosa del hero se probó en la palabra "Proinocuidad"
  y el dueño lo descartó por su bajo contraste sobre el velo; pidió azul.

### Verified

- Playwright a 390, 561, 683, 860, 861, 1024 y 1440px: tres tarjetas siempre,
  una columna hasta 860px y tres a partir de 861px, con 0px de desborde
  horizontal en todos los anchos.
- A 1440px la fila mide 820px, cada tarjeta 262.7px (antes 381px) y el H2
  empieza en 130px, alineado con el hero.
- Estilos computados idénticos a `.ficha-stat-card` del diplomado: padding
  `18px 16px`, gap 14px, icono 44×44 con fondo `rgb(238, 240, 250)`, etiqueta
  12.16px `rgb(92, 95, 106)` en mayúsculas y valor 15.36px `rgb(11, 14, 86)`.
- Hover a 1024px: la tarjeta sube 3px, la sombra pasa a `--sombra` y el borde
  no cambia; las otras dos no se mueven. Con `prefers-reduced-motion: reduce`
  la transición es `none`/`0s` y la elevación sigue aplicándose; en táctil no
  queda estado pegado.
- Los textos de las tres cifras, el H1, el `<title>`, la meta description y el
  canonical son idénticos a los de `HEAD`; `index.html` sigue siendo la única
  página con `.cifras` y no se tocaron JS ni generadores.
- Fondo con Playwright a 1440, 1024 y 390px: posiciones computadas
  `50% 50%, 50% 13%`, 0px de desborde horizontal, contraste del azul del H2
  ≈ 10:1 sobre el velo (fondo medido `rgb(206, 202, 196)`) y la
  cara completa en los tres anchos, sin marcas de agua en ninguna captura.
- Acento del H2: probado el rosa del hero `rgb(255, 143, 150)` (span
  `.slogan-destacado`, computado igual que el texto del hero) y descartado
  por el dueño tras el contraste medido (≈1.3:1 sobre el velo frente al
  10:1 del azul). El H2 queda entero en `rgb(16, 20, 119)`, texto intacto
  ("Proinocuidad en cifras") y 0px de desborde a 1440 y 390.

## 2026-10-23 (Los botones flotantes frenan sobre la barra de copyright)

### Changed

- **El WhatsApp y el botón de volver arriba se detienen al llegar al pie**:
  cuando la barra azul de copyright sube hasta tocarlos, ambos se desplazan
  hacia arriba lo justo para quedar apoyados sobre su borde superior. Ya no
  tapan el texto y tampoco desaparecen: siguen visibles y clicables.
- **El freno sigue al scroll sin retardo**: se recalcula en cada frame del
  desplazamiento y en los cambios de tamaño de ventana, leyendo el `bottom`
  real de los botones en lugar de duplicar los 26px en el JavaScript.
- **Vuelven solos al subir**: cuando la barra sale de su zona el freno regresa
  a 0 y los botones recuperan su posición base; el de volver arriba mantiene
  su umbral de 400px.

### Verified

- Playwright a 390×740, 683×623, 1024×768 y 1440×900 sobre el Home: en el
  final de la página los dos flotantes tienen `opacity: 1` y `visibility:
  visible`, y su borde inferior coincide con el borde superior de
  `.footer-bottom` con 0px de solape. El freno medido es 106.4px, 63.9px,
  64.4px y 31.4px, igual al valor de `--freno-flotantes`.
- Pasos de 10px cerca del final: el freno sube de 0 a 106.39px sin saltos y
  el solape se mantiene en 0px en cada paso.
- `elementFromPoint` sobre el centro de las dos líneas del copyright devuelve
  la propia barra; el alto de la barra (132/90/90/57px), su fondo y sus textos
  no cambian, y el alto del documento tampoco.
- Teclado: desde el último enlace del pie, Tab llega al WhatsApp y al botón de
  subir; el primero abre el chat y el segundo devuelve el scroll a 0.
- Menú móvil abierto al final: los botones siguen frenados y el velo impide el
  clic (0 popups, la URL no cambia).
- Movimiento reducido: el freno se aplica y `transition` queda en `none`.
- Misma comprobación en `nosotros/`, `cursos/`, una ficha generada y `404.html`:
  0px de solape y la barra intacta.

## 2026-10-23 (El Home presenta la cita institucional como cita)

### Changed

- **La frase institucional de la sección Nosotros del Home se presenta como
  cita**: "Compromiso con la salud pública, rigor técnico, ética profesional,
  mejora continua y cercanía con el cliente" pasa a un `blockquote` con borde
  lateral rojo de 3px e itálica, separada del texto corrido. El texto no cambió
  y el rótulo "Cita" se retiró por redundante con las comillas.

### Verified

- Playwright a 390 y 1024px sobre el Home, 14/14 aserciones: el elemento es
  `blockquote.cita-nosotros` con borde izquierdo `3px rgb(173, 52, 59)`,
  `font-style: italic`, margen superior de 20px y el texto exacto; no hay
  rótulo "Cita" ni desborde horizontal.

## 2026-10-23 (Tableta: tarjetas en dos columnas y footer apilado)

### Changed

- **Entre 560 y 860px las tarjetas se reparten en dos columnas**: servicios,
  cursos, noticias y cursos destacados dejan de apilarse en una columna y
  aprovechan el ancho de la tableta. Por debajo de 560px siguen en una columna
  y por encima de 860px se mantiene la disposición de escritorio.
- **El footer se apila como en móvil en tableta**: logo, contacto, enlaces y
  redes pasan a una columna centrada, y el texto de copyright queda centrado
  bajo las dos líneas del pie.
- **La tarjeta "Solicita una asesoría" se limita a 520px y se centra** en
  tableta, en lugar de ocupar todo el ancho; la tarjeta de noticias se limita
  a 640px.
- **Misión, visión y valores pasan a dos columnas** en tableta, y las imágenes
  que acaparaban la pantalla se acotan: la del hero a 340px de alto y la de
  "Quiénes somos" a 280px.

### Fixed

- **El menú hamburguesa vuelve a mostrarse**: el CSS había quedado con
  fragmentos de la herramienta de edición incrustados en el archivo, que
  rompían el bloque `@media (max-width: 860px)` y anulaban en silencio
  `.nav-toggle`, el panel del menú y parte de las reglas del footer. Se
  reconstruyó el archivo desde el último estado limpio y se reaplicaron la
  cita y los cambios de tableta.

### Verified

- Playwright: la hoja parsea sin errores (462 reglas, 0 excepciones); la
  hamburguesa se muestra y abre/cierra el menú a 390, 683 y 768px, y sigue
  oculta a 1024px; la cabecera sube a `z-index: 100` con el menú abierto.
- Tarjetas a 390/683/768/1024px: 1/2/2/4 columnas en el Home, 1/2/2/3 en
  cursos; footer 1 columna centrada hasta 860px y 4 en escritorio; misión y
  valores 1/2/2/3; hero de 340px y tarjeta de noticias de 628-640px en tableta.
- 0 desplazamiento horizontal en Home, Nosotros, Servicios, Cursos, Noticias
  y una ficha de curso, en los cuatro anchos.

## 2026-10-23 (El velo del menú móvil cubre también a los botones flotantes)

### Changed

- **Al abrir el menú hamburguesa en móvil, los dos botones flotantes se atenúan
  bajo el velo y dejan de ser tocables**: el contacto de WhatsApp y el botón de
  volver arriba caen bajo el velo `rgba(16, 20, 119, 0.22)`, igual que el resto
  de la página, y tocar donde están cierra el menú en lugar de abrir el chat o
  saltar al tope. Al cerrar el menú, la cota de la cabecera vuelve a su base y
  los dos botones recuperan su brillo y su toque exactos.
- **El fondo es una capa, no una excepción por clase**: con el menú abierto la
  cabecera sube de `z-index: 50` a `100`, de modo que el velo — que vive dentro
  del contexto de la cabecera — se pinta sobre todo lo que apile menos, incluido
  el par de botones flotantes en `z-index: 90`. Antes la decisión la tomaba el
  apilado por casualidad y la spec del velo no nombraba a los flotantes; ahora
  las reglas están escritas en `navegación-global` (delta del change
  `velo-cubre-flotantes`).
- **Escritorio no cambia**: por encima de 860px no hay velo, el mega menú funciona
  como hasta ahora y los dos botones flotantes se comportan como siempre.

### Verified

- Playwright a 390×740 sobre el Home, 19/19 aserciones: la cabecera pasa de
  `z-index: 50` (cerrado) a `100` (abierto) y de vuelta a `50` con Escape; el
  `elementFromPoint` del centro del botón pasa de `a.flotante-whatsapp` al
  `header` que lleva el velo y de vuelta al botón; el tap en el centro del
  botón cierra el menú con la URL intacta y 0 pestañas nuevas, y el tap en
  "Subir" lo cierra con la página quieto (scroll 800 antes y después).
- Color medido con ImageMagick (media del centro del botón): WhatsApp
  `(110.7, 225.9, 153.7)` → `(89.8, 179.8, 145.6)`, Subir
  `(51.2, 54.6, 139.0)` → `(43.7, 46.3, 133.9)`; en ambos, el Δ coincide con
  `0.22 × (velo − color cerrado)` con error ≤ 0.75 — la atenuación es exacta.
  Tras Escape, WhatsApp `(110.7, 225.9, 153.7)` == cerrado con Δ 0.00.
- A 1024px: no hay velo (`content: none` del pseudo), la cabecera queda en
  `z-index: 50` y el centro del botón vuelve a ser del botón.

## 2026-10-18 (Guía del sitio para asistentes de IA)

### Added

- **`llms.txt` en la raíz del sitio**, con el formato del estándar llmstxt.org
  versión 2: un H1 con el nombre de la empresa, un blockquote con el resumen, un
  párrafo de contexto y cuatro secciones de enlaces absolutos. Contiene las 18
  páginas públicas, repartidas en Servicios (5), Cursos (9), Información (2) y
  Optional (2).
- **`llms-full.txt` en la raíz**, con el contenido de las páginas clave ya en
  Markdown: la descripción de la empresa, los cuatro servicios de consultoría y los
  ocho programas con su duración, modalidad, tipo de certificado e inversión. Cada
  sección indica a qué página del sitio corresponde.

### Changed

- **`seo-base` y `diseno-responsive` dejan de decir "13 páginas"**: el sitio tiene
  18. En `seo-base` era peor de lo que parecía, porque su propio escenario exigía
  "13 entradas `<url><loc>`" mientras el archivo tenía 18, de modo que la spec se
  contradecía con su propio `sitemap.xml`. Quien la leyera creería que sobran
  cinco páginas.

### Notes

- **Añadir o retirar una página obliga a actualizar `llms.txt`.** Es un archivo
  escrito a mano, y su error más probable es quedarse viejo: una URL muerta es
  peor que no tener el archivo, porque el asistente la sigue y recibe un 404. La
  verificación contrasta sus URLs contra `sitemap.xml` como conjuntos.
- **Los dos archivos están verificados por URL, no a ojo**: las 18 URLs de
  `llms.txt` coinciden exactamente con las 18 del sitemap, sin una de más ni una de
  menos, todas absolutas y con barra final. Las 17 referencias de `llms-full.txt`
  resuelven a archivos reales.
- **El 404 no aparece en ninguno de los dos archivos**, ni el enlace de Aula
  Virtual, que sigue apuntando al login del WordPress viejo.
- **No se generó ninguna versión `.md` de las páginas**, que es lo que recomienda el
  estándar v2. El contenido viaja dentro de `llms-full.txt` para evitar mantener 18
  ficheros sincronizados con un generador que hoy produce las fichas. La
  alternativa descartada está escrita en el design del change.
- El reparto de secciones resuelve una contradicción del design, que colocaba
  Noticias y la página pilar a la vez en Información y en Optional. Con cuatro
  secciones obligatorias y 18 páginas, cada una va en exactamente una: Optional
  guarda el contenido editorial, que es lo que el estándar define como secundario.
- **Pendiente al publicar:** pedir `https://proinocuidad.com/llms.txt` a un
  asistente y comprobar que responde preguntas sobre cursos y servicios sin abrir
  las páginas HTML. No se puede probar antes, porque el dominio sigue sirviendo el
  WordPress viejo.

## 2026-10-18 (Decoración del hero y orden de los botones)

### Fixed

- **El círculo rojo del hero ya no tapa el texto.** `.hero::after` es un elemento
  posicionado sin `z-index`, así que el CSS lo pintaba encima del contenido de la
  caja. El Home se salvaba de casualidad, porque su contenido usa `.hero-grid`, que
  sí lleva `z-index: 2`; el 404 usa un `.container` normal y quedaba teñido. Ahora
  `.hero > .container` sube el contenido por encima de la decoración, así que
  cualquier hero queda protegido por usar esa estructura, sin importar qué
  contenedor lleve dentro.
- **Los botones de los heroes ya no dejan filas con huecos en móvil.** A 390px los
  cuatro botones del 404 medían 173, 167, 183 y 253 px, y al envolver quedaban
  filas con casi 190 px de vacío al lado. Ahora `.hero-acciones` se reparte en tres
  franjas, sin huecos en ninguna:
  - **por debajo de 560px**, una columna con los botones a ancho completo, que es el
    patrón que ya usaba `.matricula-cta-group` en las fichas;
  - **entre 560 y 860px**, dos columnas de igual anchura;
  - **por encima de 860px**, la fila de siempre, sin cambios.
- **El icono de WhatsApp del 404 pasa a relleno.** Al revisar el botón del Home se
  pidió lo contrario, pero al medir resultó que los iconos relleno son la norma: 21
  botones en 10 ficheros, y el único de trazo era el del 404. Se cambió el del 404
  para que reutilice el mismo icono que las fichas y el Home, y se borró el de
  trazo para que no queden dos. Los 21 no se tocan.

### Changed

- **El orden de las rutas de salida del 404**, que antes era accidental: ahora es
  "Volver al inicio", "Escríbenos por WhatsApp", "Ver los cursos" y "Ver los
  servicios". El botón rojo queda segundo, no primero, porque en una página de
  error quien llega no está mirando para comprar. Los mismos cuatro botones, con
  los mismos destinos y los mismos iconos: solo cambia el orden.
- **El hero del Home en móvil**: sus dos botones pasan de una fila con hueco a una
  columna a ancho completo por debajo de 560px, y a dos columnas parecidas a partir
  de ahí.
- **El corte en 560px lo decide la aritmética, no el gusto.** A 390px una columna de
  dos sería de 172px, y las etiquetas del sitio necesitan entre 162 y 279px según la
  fuente y el padding actuales: solo "Ver cursos" y "Nosotros" caben. Para que
  "Escríbenos por WhatsApp" entrara habría que bajar la fuente a unos 10px, y acortar
  las etiquetas está prohibido por el requisito "Contenido sin cambios" de la spec
  `diseno-responsive`. Por eso dos columnas solo donde caben de verdad.
- Entre 560 y 620px la etiqueta de WhatsApp se parte en dos líneas y esa fila sale
  más alta. La rejilla iguala los altos de cada fila, así que no queda descuadrada.

### Notes

- El defecto de la decoración **solo se veía por debajo de unos 600px**. A partir de
  ahí el título del hero es corto y queda a la izquierda, así que nunca alcanzaba el
  círculo. Medido píxel a píxel: con el arreglo, cero píxeles rosados en los once
  anchos entre 360 y 1280px; sin él, entre 544 y 1855 píxeles rosados de 360 a 600px.
- Cualquier comprobación de este fallo tiene que hacerse a **390px**. A 1280px el
  defecto es invisible y el escenario de la especificación se podría dar por bueno
  sin haberlo arreglado. La regla por eso fija el ancho.
- Comparar la caja del bloque `h1` con el área del círculo da un falso positivo: un
  bloque ocupa todo el ancho del contenedor mida lo que mida su texto. El `h1` del 404
  mide 1229px de ancho aunque su texto termine en 651.
- Las páginas que no tienen hero no han cambiado: seis de ellas dan el mismo hash de
  captura antes y después del cambio.
- La nueva regla es del sistema de heroes, no de la página 404. La spec `pagina-404`
  exige que no se añadan reglas "atribuibles a la página de error", y esta no lo es.

## 2026-10-18 (Página de error del sitio)

### Added

- **Se crea `404.html` en la raíz**, con la cabecera, el menú desplegable y el pie
  idénticos al resto de páginas. Reutiliza `.hero`, `.cta-sub` y `.btn`, que ya
  existían: **no se añadió ni una regla a `assets/css/main.css`**.
- **`tools/generar-fichas.mjs` emite también el 404**, con las mismas funciones de
  cabecera y pie que usan las fichas. El archivo **no se edita a mano**.
- **`404.html` declara `noindex, follow` y canonical a sí misma.** El canonical es
  inocuo y es lo que exige la especificación `seo-base` para cualquier página HTML
  del sitio.
- Siete botones de salida con icono SVG en línea (Inicio, Cursos, Servicios,
  WhatsApp, Nosotros, Noticias, Inocuidad alimentaria) y cuatro iconos nuevos en el
  catálogo de la especificación `iconografia`.

### Changed

- El generador recibe dos prefijos de ruta en lugar de uno, porque no significan lo
  mismo: `ruta` es el camino hasta la raíz y `cursos` el camino hasta
  `cursos/index.html`. Las fichas pasan `"../../"` y `"../"`; el 404 pasa `""` y
  `"cursos/"`.

### Notes

- **El 404 no entra en `sitemap.xml`** ni en el menú. `sitemap.xml` sigue con las
  mismas 18 URLs y `robots.txt` no cambia. Es lo correcto: un sitemap describe URLs
  indexables.
- **Las ocho fichas salen byte a byte idénticas.** Es la comprobación de que el
  refactor del generador no rompió nada, y por eso se automatizó con `git status`.
- En local, una ruta inexistente **no muestra el 404**: el servidor de desarrollo de
  Python responde con su propia página "Error response". Para verlo hay que abrir
  `/404.html` a mano. El 404 de verdad depende del hosting.
- **Pendiente al publicar:** comprobar que el hosting sirve `404.html` con estado
  404. El repositorio no tiene configuración de servidor, y sin ella la página puede
  no mostrarse nunca. Si el hosting resulta ser Apache o nginx sin configurar,
  hará falta un `.htaccess` con `ErrorDocument 404 /404.html`.
- La primera versión del 404 dejaba una banda blanca de 26 px entre el hero y el pie:
  `main { flex: 1 }` estira y el contenido era más corto que la ventana. Se resolvió
  con una segunda sección `.cta-sub`, sin tocar el CSS. Medido a 0 px en las 18
  páginas del sitio y en el 404.

## 2026-10-16 (Texto institucional y efecto fijo en la sección Nosotros del Home)

### Changed

- **La sección "¿Quiénes somos?" del Home cuenta ahora la historia de la empresa en tres párrafos**: quién es Proinocuidad y dónde está, a qué contribuye con sus más de 1,000 personas capacitadas, y qué soluciones ofrece con qué enfoque. Sustituyen al párrafo anterior, que volvía a decir la razón social, el RUC y la ubicación.
- **Los detalles técnicos se conservan** en un párrafo aparte debajo: BPM, POES, HACCP (Codex y FSSC 22000), programas de higiene y saneamiento, legislación sanitaria, trazabilidad, formación de auditores internos, y la elaboración e implementación de manuales y documentación técnica. También se mantiene la fecha de fundación, 29 de octubre de 2023, que el texto nuevo no traía.
- El nombre de la empresa va en negrita al principio del primer párrafo, como estaba antes. La cita institucional y el botón "Conócenos" quedan igual.
- **La imagen de la sección se queda fija en escritorio** mientras se lee el texto de al lado, con el mismo patrón que ya usa la imagen de la página Nosotros: `position: sticky`, `top: 110px` y `align-self: start`. La regla se limita al Home por su `aria-labelledby="nosotros-titulo"`, porque hay otras seis secciones del sitio con la misma estructura `.identidad-grid` que no deben verse afectadas. En móvil no se aplica, como el resto del sitio.

### Notes

- El texto no tocó el `title`, la meta description, el canonical ni el `h1`, que quedan exactamente como estaban. La sección pasó de 2 párrafos a 5 y sigue con un solo `h1`.
- **El hero del Home dice casi lo mismo** que los dos primeros párrafos nuevos: "Somos Proinocuidad..., especializada en la gestión de la calidad e inocuidad alimentaria. Con más de 1000 personas capacitadas, ayudamos a profesionales, estudiantes y empresas del rubro alimentario...". Es una repetición que ya existía en el sentido inverso, pero ahora es literal. Pendiente de decidir si el hero se acorta.
- Los 5 párrafos tienen `margin: 0`, o sea que se leen como un bloque corrido sin separación. Con 2 párrafos no se notaba; con 5 cuesta distinguir dónde acaba cada idea. Se arregla con una regla de margen, si el dueño lo quiere.
- Ahora conviven tres formatos de la misma cifra en el sitio: "1000" en el hero y en la franja de cifras, "1,000" en el texto nuevo y en la página Nosotros. Conviene unificar.
- Verificado con Chromium a 1280px y 390px: sin desbordes horizontales, la imagen se mantiene a 110px durante el recorrido y suelta al terminar la sección, y las otras seis secciones con `.identidad-grid` siguen sin sticky (la de la página Nosotros lo mantiene solo al abrir su bloque "Ver más", como antes).


## 2026-10-16 (Fuera el proyecto ajeno que estaba dentro del repo)

### Removed

- **`ai-chat-toolkit-rag-store-memory-v1.0.0/` sale del repositorio.** Eran 154 ficheros, 17 MB, de un proyecto open-source sin relación con el sitio: un toolkit para embeber un widget de chat con IA, con su propio `package.json`, su `LICENSE` y sus workflows de CI. No lo usaba ninguna página, ni el CSS, ni el JavaScript, ni los generadores.

Estaba en la raíz del repo y versionado, así que un `git clone` del sitio web descargaba también el toolkit completo. `STRUCTURE.md` ya lo listaba dentro de "Qué NO subir", o sea que hacía tiempo que estaba identificado como trabajo local ajeno al sitio.

Borrado con `git rm -r`, que lo quita del índice y del disco. Sigue siendo recuperable desde el commit anterior con `git checkout HEAD~1 -- ai-chat-toolkit-rag-store-memory-v1.0.0/`, por si algún día hace falta.

### Fixed

- **`STRUCTURE.md` ya no lista directorios que no existen.** En "Qué NO subir" seguían `_archivo/` y `openapitools.json`, y `_archivo/` seguía también en el árbol de la raíz del documento. Ninguno de los dos está en el repo. Se quitan, con lo que la lista refleja por fin lo que hay de verdad: `openspec/`, `tools/`, `.opencode/` y `logos-metodos-de-pago/`.


## 2026-10-16 (Menú móvil más compacto)

### Changed

- **El panel del menú hamburguesa ya no se come la pantalla al desplegar un submenú.** Medido con Chromium sobre `nosotros/index.html` con "Servicios" desplegado, el panel pasaba de 681px en una ventana de 900px de alto, y en un móvil de 390×740 los 664px no cabían y había que desplazarse dentro del propio menú.

| Ventana | Antes | Después |
|---|---|---|
| 860×900 (escritorio redimensionado) | 681px (76%) | **451px (50%)** |
| 700×900 | 681px (76%) | **451px (50%)** |
| 620×900 | 681px (76%) | 473px (53%) |
| 390×740 (móvil) | 664px, se desplazaba | **567px, cabe entero** |
| 390×844 | 681px | 567px (67%) |
| 360×640 | 564px, se desplazaba | 564px, se desplaza (a propósito) |

- El arreglo tiene dos partes. La primera es densidad, y aplica a todos los anchos: baja el alto mínimo de las filas de 46px a 40px, el relleno de los enlaces, del rótulo "Menú" y del submenú, y los huecos entre ítems. Con eso solo, el móvil deja de desbordar.
- La segunda son dos columnas para los ítems de cada submenú, pero **solo entre 560px y 860px**, que es la franja del escritorio redimensionado. Por debajo de 560px siguen en una sola columna porque en un teléfono no caben dos: a 559px cada ítem mediría 172px, insuficiente para el ícono, el título y la descripción. El enlace "Ver todos los servicios" o "Ver todos los cursos" sigue ocupando el ancho completo del panel.
- **El área activable de los enlaces del menú baja de 46px a 40px de alto.** Sigue por encima del mínimo de 24px de WCAG 2.2 AA, pero es un cambio real de Comfort en un teléfono. Se acepta porque la alternativa, ganar toda la altura solo con las dos columnas, no funciona por debajo de 560px y por tanto no arreglaría el móvil.
- **Se elimina el rótulo "Menú" y la cajita que lo contenía.** Era un rótulo redundante: el botón hamburguesa de la cabecera ya está a la vista y se convierte en una ✕ al pulsarse, así que el rótulo repite lo que el icono ya dice. Se borra el elemento entero, no solo el texto, y se borra también del generador de fichas para que la próxima no lo traiga de vuelta. Ahorra 40px exactos en todos los anchos. Con ello, en 390×740 el panel pasa de 607px a 567px y en 860×900 de 491px a 451px.
- El cuadro del ícono **no se toca**: sigue en 36px con el SVG de 20px en móvil, como ya estaba, y en 44px con SVG de 24px en el mega-menú de escritorio. Las descripciones de cada ítem tampoco se ocultan: se midió que no dan altura una vez ajustada la densidad, así que no hay que sacrificar contenido.

### Notes

- Los **360×640 siguen desplazándose por dentro, a propósito**, y en esa ventana quitar el rótulo no cambia nada: 564px antes y 564px después, porque ahí el alto lo manda el tope `max-height: calc(100dvh - 76px)` y no el contenido. Es un teléfono muy pequeño y el panel conserva su desplazamiento interno, que es el comportamiento que ya fija la spec. No es un pendiente. El motivo está anotado en `design.md` del change `menu-movil-mas-compacto`.
- El mega-menú de escritorio no cambia: sigue con su panel de 460px, sus dos columnas, su ícono de 44px y su SVG de 24px. Todos los cambios están dentro del bloque `@media (max-width: 860px)` o en la media query nueva, que también topada a 860px.
- El breakpoint de 860px, que decide entre el menú horizontal de escritorio y el botón hamburguesa, no se mueve.
- Cambio de **CSS y HTML, pero ningún texto, enlace, color ni dato de contacto**, que es lo que exige el requisito "Contenido sin cambios" de la spec `diseno-responsive`. El HTML solo pierde el `<li>` del rótulo del menú, en las 18 páginas y en el generador. JavaScript, cero cambios.
- Verificado con Chromium en las 18 páginas del sitio en los anchos 360, 390, 768, 860, 1024 y 1280px, más 559 y 560 para el umbral: 112 combinaciones, sin desbordes horizontales, sin contenido cortado y sin errores de JavaScript. El panel más alto de todo el recorrido es 578px en el Home a 360px de ancho.


## 2026-10-16 (Velo de atenuación y bloqueo de scroll en el menú móvil)

### Added

- Al abrir el menú hamburguesa, el contenido de la página que queda detrás se atenúa con un velo tenue en el azul marino del sitio, `rgba(16, 20, 119, 0.22)`, por debajo del nivel de los botones flotantes (`0.3` y `0.45`) para que se lea como un fondo y no como un oscurecimiento fuerte. El velo empieza en `76px`, la altura de la cabecera, así que la barra y el panel quedan nítidos y solo se atenúa lo que hay detrás.
- **Tocar el velo cierra el menú.** Antes no había ninguna forma de cerrarlo tocando fuera.
- Con el menú abierto, **el fondo deja de desplazarse**. Es lo que pidió el dueño. Se hace con una clase en `body` cuya regla vive dentro de `@media (max-width: 860px)`, de modo que en escritorio no existe la regla. El panel conserva su `overflow-y: auto`, así que si el menú no cabe en la pantalla se sigue desplazando por dentro.

### Changed

- **Eliminado el botón ✕ del panel del menú móvil.** El panel llevaba su propio botón de cerrar y, además, el botón hamburguesa de la cabecera ya se transforma en una ✕ al pulsarse: dos controles idénticos para la misma acción. Ahora el menú se cierra de tres formas, todas accesibles con teclado: la hamburguesa (que además cambia de icono, de `aria-label` y de `aria-expanded`), la tecla Escape y el fondo atenuado. El rótulo "Menú" de la fila del panel se conserva; solo se quita el botón de la derecha.

### Notes

- El bloqueo del scroll **respeta la regla del proyecto de no usar `overflow` global en `body` o `html`**, que rompía el `position: sticky`. Aquí la regla solo existe mientras el menú está abierto —momento en que el `sticky` es irrelevante porque la página no se desplaza— y se retira al cerrar, dejando el documento igual que antes. Hay tres elementos `sticky` en el sitio (cabecera, imagen de Quiénes somos y el sidebar de matrícula de las fichas) y los tres siguen funcionando con el menú cerrado.
- **Limitación conocida:** `overflow: hidden` no es fiable en iOS Safari, donde la página puede seguir desplazándose con el dedo aunque la regla aplique. En Android y escritorio funciona. Si en un iPhone resulta molesto, la alternativa es `position: fixed` en `body`, que obliga a guardar y restaurar la posición de scroll a mano en cada apertura y cierre.
- El velo reutiliza el valor de `76px` que el panel ya usa en su `max-height`. Si algún día cambia la altura de la cabecera, hay que revisar los dos sitios juntos.
- Con `prefers-reduced-motion: reduce` el velo aparece y desaparece sin transición, igual que el resto del menú.
- El `pointer-events: auto` del velo tapa el contenido de detrás, así que al cerrar tocando el fondo nunca se activa por error un enlace que estaba oculto.

## 2026-10-15 (Subtítulo de la página de Servicios)

### Changed

- El subtítulo bajo el H1 de `servicios/index.html` decía "En cada servicio, la imagen es genérica y temática — así deben mostrarse los servicios, según el documento oficial.", que era una nota interna de producción leída por el visitante y además no contenía ninguna palabra clave. Ahora dice "Consultoría, capacitación y certificación para que tu empresa cumpla la normativa sanitaria y acceda a nuevos mercados.", en línea con el subtítulo de las demás páginas del sitio.
- Sin tocar el SEO: el `<title>`, la meta description, el canonical y el `<h1>` ("Consultoría y capacitación en inocuidad alimentaria") quedan exactamente como estaban. El subtítulo nuevo suma las palabras clave que la página ya usa (consultoría, capacitación, certificación, normativa sanitaria) y aporta "acceda a nuevos mercados", que antes no estaban.

## 2026-10-16 (Cabecera fija también en móvil)

### Changed

- La cabecera del sitio pasa a ser fija (`position: sticky`) en todas las pantallas, también en móvil. Antes solo lo era en escritorio, así que al bajar en un teléfono el logo y el botón de menú se perdían y había que subir hasta arriba para volver a abrirlos. Se elimina la única regla que lo desactivaba (`.site-header { position: relative; }` dentro de `@media (max-width: 860px)`); la regla base ya decía `sticky`, así que el cambio es borrar una línea.
- El motivo por el que se puso `relative` en su día —conservar el contexto de anclaje del panel del menú móvil— ya no aplicaba: `position: sticky` también es un valor posicionado y mantiene ese contexto. Verificado a 390px: al abrir el menú, el panel queda anclado con 0px de diferencia respecto al borde inferior de la cabecera.
- Sin cambios en el diseño de la cabecera, en el menú móvil ni en su JavaScript. En escritorio no cambia nada.

### Fixed

- Los destinos de las anclas internas quedaban exactamente bajo la cabecera al navegar a ellos. No es un efecto colateral raro: es la consecuencia directa de una cabecera fija, medido en 76px, que es justamente su altura. Afectaba también a escritorio, donde la cabecera ya era fija desde antes.
- Añado `[id] { scroll-margin-top: 84px; }`. La cabecera fija mide 76px, así que 84px dejan 8px de aire. Afecta a 32 enlaces con ancla real: los 8 "Matricularme Ahora" de las fichas (`#form-inscripcion`) y los enlaces del menú a las cuatro secciones de Servicios.
- Esto también arregla un defecto preexistente en escritorio, donde la cabecera sticky ya tapaba el destino de esas anclas.

### Notes

- La cabecera fija ocupa 76px permanentes, un 19% de una pantalla de 390px. Es un coste consciente: la alternativa de ocultarla al bajar quedó descartada por decisión del dueño. Si resulta incómoda, la mejora posible es una variante compacta al hacer scroll, que requiere JavaScript y otro diseño de cabecera.
- En la spec `navegacion-global`, el escenario "móvil sin cabecera flotante" conserva su nombre aunque su contenido ya describe la cabecera fija. Se debe a que el validador de specs no permite eliminar escenarios dentro de un requisito modificado. Si se edita esa spec a mano, conviene renombrar el escenario a "cabecera fija en móvil".

## 2026-10-15 (Se retira la cifra de años de experiencia)

### Removed

- La franja de cifras del Home pasa de cuatro a tres: se retira "3 años de experiencia". Era un número fijo que no sube solo, así que en unos meses sería falso sin que nadie se acordara de cambiarlo, y era la única cifra del sitio que no se sostenía con un dato comprobable. No se sustituye por otra métrica: el proyecto ya tiene el criterio de no publicar cifras sin fuente verificada, y la fecha de fundación que aparece en la página Nosotros ("29 de octubre del 2023") permite deducirla y, a diferencia del número, nunca queda vieja.
- Se retira también la misma afirmación del párrafo "Quiénes somos" de la página Nosotros, que decía "Con 3 años de experiencia y más de 1000 personas capacitadas, ayudamos a…" y ahora dice "Con más de 1000 personas capacitadas, ayudamos a…". El resto del párrafo queda intacto.
- Se conservan sin cambios las otras tres cifras del Home ("+1000 personas capacitadas", "8 cursos y un diplomado asíncrono" y "100% compromiso con la salud pública") y la cifra de 1000 personas capacitadas del párrafo, por ser un dato de actividad y no una antigüedad.

### Changed

- El grid de la franja pasa de 4 a 3 columnas (`repeat(3, 1fr)`), para que no quede una columna vacía a la derecha. En tableta (≤1020px) se mantiene el grid de 2 columnas, con la tercera cifra sola en la segunda fila. Sin cambios de SEO: title, meta description, canonical y `<h1>` quedan idénticos en las dos páginas.

## 2026-10-15 (RUC en negrita en el topbar del Home)

### Fixed

- El número de RUC del topbar del Home aparecía como texto plano, sin negrita y sin los dos puntos, mientras que las otras 17 páginas lo muestran con el número en negrita blanca. Ahora el Home usa el mismo formato que el resto del sitio. La regla `.topbar strong` que da el color y el peso ya existía, así que no hizo falta tocar la hoja de estilos.

## 2026-10-15 (Foto institucional dentro de assets)

### Changed

- La foto de "¿Quiénes somos?" (grupo de participantes frente a la casona amarilla) deja de estar suelta en la raíz del repositorio y pasa a `assets/img/nosotros.webp`, junto al resto de imágenes y con su convención de nombre. Se actualizan las dos referencias, en `index.html` y `nosotros/index.html`. La foto que se ve es la misma: no hay cambio de contenido ni de aspecto.

## 2026-10-15 (Mensajes prellenados en los enlaces de WhatsApp)

### Changed

- Los 113 enlaces a WhatsApp del sitio abren ahora la conversación con un mensaje ya escrito: los 81 que la abrían vacía llevan un texto según dónde se presionó. Al tocar el botón, el usuario encuentra el mensaje en la caja de escritura de WhatsApp y solo tiene que enviarlo.
  - Contacto directo (barra superior y pie, 36 enlaces): presentación neutra, sin pedir nada en concreto.
  - Botón flotante "Envíanos un mensaje!" (18 páginas): el mismo texto en todo el sitio, por decisión del dueño.
  - Botones de asesoría (13): cada uno nombra su servicio (Certificación HACCP, Implementación FSSC 22000, BRCGS Food Safety, Registro Sanitario DIGESA), su programa (Inocuidad Alimentaria) o la empresa (Nosotros).
  - Tarjetas de curso (12): ahora llevan el mismo mensaje que la ficha de su curso, así que el listado, el home y la ficha dicen lo mismo.
- Los 32 mensajes que ya existían en las fichas (facturación, matriculación desde el extranjero e inscripción confirmada) quedan intactos.
- El mensaje viaja en el propio enlace, codificado, sin JavaScript: el sitio sigue funcionando igual sin él y "abrir en pestaña nueva" sigue funcionando.
- Sin cambios en el número, el texto de los botones, sus iconos, colores ni tamaños. Verificado: los 113 mensajes empiezan por "Hola", ninguno supera 117 caracteres y el más largo sigue entrando completo en el móvil.
- El catálogo de mensajes queda documentado en `STRUCTURE.md` como referencia para cuando se añada un botón nuevo: la regla de la spec `contacto-whatsapp` es que ningún enlace puede abrir el chat vacío.

## 2026-10-15 (Iconografía en todos los botones)

### Added

- Todos los botones del sitio llevan ahora un icono SVG: los **83 que estaban sin icono** quedan cubiertos, de modo que ya no hay ningún botón sin icono fuera de los 36 `.mega-cta` del panel de navegación (que ya dibujan su flecha con máscara CSS y no se tocaron). 72 de ellos están en las 8 fichas de curso y se aplicaron editando `tools/generar-fichas.mjs` y regenerando, nunca a mano; los otros 11 en `index.html` y `servicios/`.
- Nuevo bloque `SVG_BTN_*` en `tools/generar-fichas.mjs` con el catálogo cerrado, un icono por acción: portapapeles para copiar un valor, birrete para Aula Virtual, tarjeta de crédito para el pago con Culqi, envío para enviar inscripción y solicitar link de pago, edición para matricularse, soporte para contactar asesor, usuarios para Conócenos y flecha para ver/listar. Los paths se copiaron de los iconos que el sitio ya usaba, de modo que las fichas y las páginas escritas a mano son indistinguibles.
- El SVG se pinta con `currentColor`, así que cada icono hereda el color de su variante de botón sin CSS por icono, y va con `aria-hidden="true"` por decorativo. Se añadió también ese atributo al icono de WhatsApp de las fichas, que era el único icono de botón del sitio sin marcar.

### Changed

- `assets/css/main.css`: los iconos miden 18px en botones normales, 16px en `.btn-sm` y 14px en `.btn-copiar`; `.btn-copiar` pasa a ser `inline-flex` para que el icono y el texto queden en la misma línea. Sin cambios de color, radio, padding ni transiciones, y sin animaciones nuevas.
- Sin dependencias nuevas: SVG en línea, sin librería, sin fuente de iconos, sin CDN y sin peticiones de red adicionales.

## 2026-10-15 (Formulario: País como desplegable Perú/Extranjero)

### Changed

- El campo País del formulario de inscripción pasa de texto libre a lista desplegable con Perú (por defecto) y Extranjero, con estilo propio del sitio (misma base que los inputs, flecha azul, sin apariencia básica del navegador). Mismo `name="pais"`, mismo envío por FormSubmit. Aplicado a las 8 fichas vía `tools/generar-fichas.mjs`. Verificado: valor Perú, opciones Perú/Extranjero, `appearance: none` con flecha propia, sin desborde en 1280 y 390.

## 2026-10-15 (Fichas: sin banda derecha en escritorio ancho)

### Fixed

- Las fichas de curso ya no generan desplazamiento horizontal ni banda blanca a la derecha: el culpable era el honeypot antispam del formulario (`input.campo-honey`): su `width: 1px` perdía especificidad frente al `width: 100%` de inputs y quedaba de ~1572px, sumando ~219px de desborde en todos los anchos. Se reforzó el selector (1px real, sin padding/borde, anclado arriba-izquierda). Además se extendió a escritorio la contención ya usada en ≤1040px (`min-width: 0` en hijos de grids, `flex-wrap` en filas de pago, `overflow-wrap` en la fila CCI). Solo CSS (`assets/css/main.css`); sin cambios de contenido, markup, sticky ni apilado. Alcance: las 8 fichas. Verificado con Chrome headless (scrollWidth = viewport en 504, 750, 882, 1072, 1252 y 1572px; ficha corta limpia en 768/1100/1600) y captura a 1600 sin banda.

## 2026-10-15 (Home: portada en tarjeta de noticia)

### Fixed

- La tarjeta de noticia DIGESA en `index.html` (sección Noticias y eventos) muestra de nuevo la foto de portada (`assets/img/noticia-digesa-haccp.jpg`, mismo archivo y `alt` que `noticias/index.html`), con las píldoras Noticia/DIGESA legibles sobre la imagen y layout vertical (foto arriba, texto debajo). Sin cambios de textos, enlaces ni SEO.

## 2026-10-15 (CSS: revertido fix de Antigravity)

### Removed

- Revertida la regla `.ficha-main-col > .ficha-seccion:last-child { margin-bottom: 0; }` que Antigravity alcanzó a aplicar antes de agotar su cuota (no hubo bisección ni verificación). El CSS quedó byte-idéntico a su respaldo (`/tmp/opencode/respaldo-prefooter-antigravity/main.css`).

## 2026-10-15 (Fichas: formulario de inscripción embebido)

### Added

- Cada ficha incluye debajo de "¿Cómo formalizar tu inscripción?" la tarjeta "Formulario de Inscripción" (`#form-inscripcion`): curso precargado, datos, voucher (archivo), checkbox "Deseo comprobante de pago" → Boleta/Factura (factura exige RUC de 11 dígitos y razón social, con bloqueo de envío), conformidad y envío vía FormSubmit a `administracion@proinocuidad.com`. "Matricularme Ahora" hace scroll interno; Google Form queda como respaldo. Generado vía `tools/generar-fichas.mjs` en las 8 fichas. Verificado en 1280 y 390 sin desborde.

## 2026-10-15 (CSS: restaurado bloque moderno de fichas)

### Fixed

- `assets/css/main.css` había quedado revertido a la versión del commit (sin el bloque moderno de fichas: layout 2 columnas, stats, pagos, sidebar ni fixes de desborde). Restaurado byte por byte desde el respaldo `/tmp/opencode/respaldo-ficha-intermedio/main.css` (1479 líneas, llaves balanceadas). JS y fichas no fueron afectados. Verificado: ficha del diplomado en 1280 píxel-idéntica a la referencia (RMSE 0).
- El respaldo era previo al fix intermedio, por lo que tras restaurar se re-aplicó el bloque 681–1040px (`min-width: 0`, wrap en pagos/QR, grids a 1 columna) y se verificó en 900px sin desplazamiento horizontal. Respaldo actualizado al estado bueno.

## 2026-10-15 (Fichas: estilo moderno del diplomado en los 8 cursos)

### Changed

- Las 8 fichas de cursos usan el layout moderno de 2 columnas con sidebar sticky (stats, beneficios, objetivo/público, temario por módulos, metodología por pasos, tarjetas de pago con QR, inscripción y matrícula con flyer propio, precios, CTAs e incluidos). Cada ficha conserva su contenido y datos propios (horas, sesiones, temario, precios, flyer y fondo hero); "Competencias del Egresado" solo en el diplomado.
- El layout vive ahora en `tools/generar-fichas.mjs` (plantilla + bloques compartidos con parámetros por curso): el diplomado vuelve a generarse con el generador y termina la excepción manual. Verificado: diplomado regenerado píxel-idéntico al manual en 1280, fichas cortas revisadas en 1280 y 390 sin desborde.

## 2026-10-15 (Ficha: sin desplazamiento horizontal en rango intermedio)

### Fixed

- La ficha del diplomado ya no tiene desplazamiento horizontal en desktop redimensionado (768/900px): `min-width: 0` extendido a los grids, filas de pago envueltas, bloque QR con wrap y grids de pagos/metodología apilados en el rango 681–1040px. Solo CSS (`assets/css/main.css`); desktop ancho (2 columnas + sticky) y móvil 360/390 sin cambios. Verificado con capturas en 768, 900, 1280 y 360.

## 2026-10-15 (Ficha: sin desplazamiento horizontal en móvil)

### Fixed

- La ficha del diplomado ya no tiene desplazamiento horizontal en 360/390px: la fila del CCI y el botón "Copiar CCI" se envuelven, el badge "Internacional" baja dentro de su tarjeta, se redujo el padding del temario en móvil y los hijos de los grids llevan `min-width: 0`. Solo CSS (`assets/css/main.css`, media ≤680px); sin cambios de contenido ni de desktop (sticky del sidebar intacto). Verificado con capturas en 360, 390 y 1280.

## 2026-10-14 (Cursos: rediseño moderno de ficha del Diplomado SGCIA)

### Added

- **Layout de 2 columnas con Sidebar Sticky:** Estructura moderna (`.ficha-layout`) con área principal de contenidos (70%) y columna lateral fija al hacer scroll (30%) con flyer oficial, precios destacados (`S/ 120` y `US$ 37`), botones directos de inscripción/WhatsApp y checklist de beneficios incluidos.
- **Barra de Métricas Clave (Stats Grid):** 4 tarjetas destacadas con iconos SVG para horas (384 h), módulos (6), modalidad (100% asíncrono) y certificación oficial con QR.
- **Grid de Beneficios:** Tarjetas visuales con micro-interacciones hover para aula virtual 24/7, material editable/descargable, ritmo flexible y respaldo de certificación.
- **Grid de Competencias del Egresado:** Formato a 2 columnas con checkmarks SVG y acentos normativos (HACCP, ISO 9001, ISO 22000, BRCGS, ISO 19011).
- **Tarjetas Interactivas de Métodos de Pago:** Secciones diferenciadas para billeteras digitales (Yape / Plin), transferencia bancaria BBVA con número y CCI, abonos internacionales (PayPal / Western Union), pago online Culqi y bloque integrado con código QR.
- **Logos de pago optimizados y nítidos:** Se sustituyeron las imágenes antiguas por versiones vectoriales oficiales en alta resolución con fondo transparente (BBVA 2019 oficial, Yape logotipo oficial, Western Union vector y logotipo oficial de Culqi SVG importado directo), eliminando espacios vacíos y ajustando el alto visual homogéneo al nivel de PayPal.
- **Función de copiado al portapapeles:** En `assets/js/main.js`, funcionalidad para botones `.btn-copiar` con feedback visual temporal ("¡Copiado!").
- **Acordeón animado y exclusivo en Temario Modular:** En `assets/js/main.js`, animación suave de apertura/cierre (`cubic-bezier`) para `.temario-modulo` y cierre automático del módulo previo al abrir uno nuevo.
- **Icono de Asesoría Tipo Call Center:** Icono SVG personalizado de atención al cliente / asesoría con auriculares en la tarjeta de contacto/facturas del sidebar.

### Changed

- Reemplazo de bloques de texto plano seriados con numeración romana por secciones visuales estructuradas (`.ficha-seccion`) con cabeceras uniformes (`.seccion-tag` con iconos SVG institucionales).
- Eliminación de emojis en toda la ficha a favor de iconografía vectorial SVG oficial.
- Optimización responsiva: en tablets y pantallas móviles (≤ 1040px y ≤ 680px), el layout se adapta limpiamente apilando el sidebar y las tarjetas en una columna.
- Actualización de datos de pago oficiales: número de Yape/Plin establecido en `971 625 142` (con botón de copiado directo) y titular de la cuenta BBVA corregido a `Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.`.
- Tarjeta de Pago QR optimizada: encuadre cuadrado y centrado geométrico perfecto del código QR (`qr-pago-bbva-zoom.webp`), y nuevo contenedor destacado (`.pago-titular-pill`) resaltando explícitamente a nombre de quién está la cuenta: `Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.`.

## 2026-10-14 (Cursos: flyer DIGESA/SENASA visible)

### Changed

- La tarjeta del curso HACCP DIGESA/SENASA en `cursos/index.html` muestra su flyer (`assets/img/flyer-curso-04-haccp-digesa-senasca.webp`, imagen del documento "pagina web.pdf") en lugar del aviso "Flyer en preparación".
- Se retiró la excepción `SIN_FLYER_SLUG` en `tools/generar-listados.mjs` y se regeneraron los listados (8 en cursos, 4 en inicio sin cambios).
- Nota: el flyer indica edición en vivo de mayo (32 horas); la ficha actual es asíncrona de 40 horas. Se muestra por decisión de Juan.
- La tarjeta de la noticia DIGESA en `index.html` (sección Noticias y eventos) no tenía imagen: se añadió la misma foto de portada (`assets/img/noticia-digesa-haccp.jpg`) con las píldoras Noticia/DIGESA, igual que en `noticias/index.html`.

## 2026-10-14 (Noticias: foto de portada arriba)

### Added

- Foto `assets/img/noticia-digesa-haccp.jpg` (220 KB) en la tarjeta de la noticia DIGESA-HACCP: Unsplash, licencia Unsplash (uso gratuito, comercial). Fuente: https://unsplash.com/es/fotos/equipos-de-procesamiento-industrial-en-un-entorno-de-laboratorio-_iB2Ou3hca4 (aprobada por Juan; autor no visible por bloqueo antibots de Unsplash, ver fuente).

### Changed

- Tarjeta `.nota-card` a layout vertical en escritorio: foto arriba a ancho completo (`object-fit: cover`, alto 300px) y texto debajo; etiquetas conservadas sobre la imagen con degradado.
- En móvil la imagen lleva más altura (260px).
- "Noticia · Regulación sanitaria" en píldora blanca dentro de la imagen (arriba) y "DIGESA" en texto blanco sobre la pastilla roja.
- Card de noticia al 80% de ancho y centrada en desktop; en móvil a ancho completo.
- Sin cambios en el contenido de la nota, migas, CTA ni footer.

## 2026-10-14 (Subpáginas de servicios: contenido visible)

### Added

- Contenido complementario visible en las 4 subpáginas: BRCGS Food Safety, FSSC 22000, certificación HACCP y registro sanitario, sin "Ver más" (decisión del dueño: el plegable no tiene sentido en estas páginas).
- Detalle por norma con base del docx ya publicado en `servicios/index.html`: alcance y listas en BRCGS (v9) y FSSC (ISO 9001/22000/FSSC/BRCGS); "Nuestro servicio comprende" en HACCP; requisitos, expediente y objetivo en registro sanitario, con aclaración de autoridad.

### Changed

- Registro sanitario (`servicios/registro-sanitario-digesa/`): resumen y meta description sin "en el menor tiempo posible"; se aclara que la aprobación depende de la autoridad sanitaria.
- Sin cambios en CSS/JS, `servicios/index.html`, menú, canonical, JSON-LD ni CTA final.

## 2026-10-14 (Servicios: descripción detallada con "Ver más")

### Added

- Servicio "3. Inspecciones higiénico-sanitarias" en `servicios/index.html`, con resumen, "Ver más" y aclaración de asesoría privada (texto del docx "servicios descripcion.docx").
- Imagen `assets/img/servicio-inspeccion-planta.jpg`: Anna Shvets, Pexels, licencia Pexels (uso gratuito, comercial). Fuente: https://www.pexels.com/photo/5953794/
- Detalle "Ver más" en Capacitación, Normativa, Sistemas de gestión y Registro sanitario, con el texto del docx.
- Componente genérico `.ampliar` (CSS y JS) para los bloques "Ver más"; Nosotros conserva `nosotros-ampliar` para el sticky.

### Changed

- Los servicios pasan de 4 a 5 y se numeran 1 a 5 en el orden del docx.
- Registro sanitario: se retira "en el menor tiempo posible" y se aclara que la aprobación depende de la autoridad sanitaria.
- La imagen de cada bloque con "Ver más" abierto se mantiene fija al hacer scroll en escritorio (>860px), como en Nosotros.
- Al abrir un "Ver más", los demás abiertos en la página se cierran con la misma animación.

### Pendiente

- Revisión visual en escritorio y 390px (tarea 4.3 del change).
- El menú desplegable de las 18 páginas sigue diciendo "Alimentos y bebidas en el menor tiempo posible" (fuera de este change).

## 2026-10-14 (Ajustes de Nosotros, topbar, footer y WhatsApp flotante)

### Added

- Imagen sticky en escritorio (>860px) en la sección "Quiénes somos" de `nosotros/index.html`, activa solo cuando "Ver más" está abierto (regla `:has()` en `main.css`).
- Etiqueta "Envíanos un mensaje!" al pasar el mouse (o enfocar) el botón flotante de WhatsApp, con borde verde oscuro. Aplicado en las 18 páginas y en `tools/generar-fichas.mjs`.

### Changed

- Foto de "Quiénes somos" en `nosotros/index.html` e `index.html` (home): ahora `nosotros.webp` (raíz del sitio). Texto alternativo actualizado.
- Topbar de todas las páginas: se añade el RUC 20615307603 después del correo.

### Removed

- Línea "Dirección exacta: Próximamente" del footer en todas las páginas y en `tools/generar-fichas.mjs`.

### Pendiente

- Confirmar origen y licencia de `nosotros.webp` (no está registrado con URL fuente, como exige la política de fotos).

## 2026-10-14 (Nosotros: descripción ampliable)

### Added

- Bloque "Ver más" (`<details>`) debajo de "Quiénes somos" en `nosotros/index.html`, con la descripción institucional complementaria. Estilos `.nosotros-ampliar` en `main.css`. Change `nosotros-descripcion-ver-mas`.
- Botón "Ver más" con recuadro e ícono de ojo, y apertura/cierre animado en `main.js` (400 ms; respeta `prefers-reduced-motion`).

## 2026-10-14 (Piloto FX en ficha del diplomado)

### Revertido (2026-10-14)

- El piloto no gustó: generador, CSS, JS y las 8 fichas restaurados al estado previo (verificado byte por byte, regeneración idempotente). Change `ficha-piloto-diseno-fx` eliminado.

## 2026-10-14 (Meta description del inicio recortada)

### Changed

- Description de 157 a 127 caracteres (mismas keywords + "en Trujillo, Perú"); el slogan queda solo en el H1. Sin commit/push ni publicación.

## 2026-10-13 (CTA final estilo AZ en 6 subpáginas)

### Added

- Sección `.cta-sub` (badge, H2 único con keyword, texto, botones WhatsApp y "Ver todos los servicios") al final de las 4 páginas de detalle, la guía y Nosotros. Fondo y botones existentes.
- En `servicios/index.html` la sección `.cta-sub` reemplaza la tarjeta de cierre (el acceso a la guía se conserva como botón secundario).

### Verified

- H2 únicos, un `<h1>` por página, enlaces relativos correctos (incluida corrección `../servicios/` en guía y nosotros), llaves balanceadas. Sin commit/push ni publicación.

## 2026-10-13 (Refinamiento del CTA de la home)

### Changed

- Tarjeta del CTA: título a 1.4rem centrado con descripción centrada y botones a ancho completo con iconos (soporte y sobre).
- Nota de la tarjeta: "Escríbenos y recibe una propuesta personalizada. O llámanos directo." (`tel:+51981365982` en azul oscuro), sin plazos.
- Chips de contacto con color (WhatsApp verde, resto blancos con glifo azul oscuro); "inocuidad" en `#ff8f96`.

### Removed

- Subrayado al hover sobre el número de WhatsApp del bloque.

### Verified

- Un solo `<h1>`, iconos 18px por regla existente, llaves balanceadas. Archivos del change: `index.html` (bloque CTA) y `assets/css/main.css`. Sin commit/push ni publicación.

## 2026-10-13 (Banners 15% más compactos)

### Changed

- Banners en escritorio: `min-height: clamp(306px, 46.75vh, 442px)` y título `clamp(2.04rem, 3.4vw, 2.72rem)` (−15% exacto). Overlay, efecto fijo, breakpoint y móvil intactos.

### Verified

- Llaves balanceadas, valores viejos fuera, dos líneas cambiadas en `assets/css/main.css`. Sin commit/push ni publicación.

## 2026-10-13 (Títulos de banner enriquecidos con palabra clave)

### Changed

- `h1` descriptivos en los 4 índices (Servicios, Cursos, Nosotros, Noticias) y palabra clave resaltada con `<span>` en esos 4 más las 4 páginas de detalle y la guía. Fichas y Hero intactos.
- `.page-head h1 span` en `#ff8f96` (tono ya usado en el hover de la barra superior).

### Verified

- Un solo `<h1>` por página, sin enlaces rotos, llaves CSS balanceadas. Sin commit/push ni publicación.

### Fixed (2026-10-13)

- Botones del CTA de subpáginas con icono: soporte en WhatsApp, capas en "Ver todos los servicios" y libro en "Leer la guía" (SVG inline, 18px por regla `.btn svg` existente).

- Imagen de "Quiénes somos" en Nosotros con borde redondeado (la sección adopta la clase `identidad`, igual que sistemas).
- Pestañas de Cursos con iconos: reproducir en "Asíncronos" y señal en vivo en "En vivo" (SVG inline, 16px).
- Chips de modalidad en cards (Cursos e Inicio) con el icono de "Asíncronos" vía `chipModalidad()` en `tools/generar-listados.mjs`; regeneración idempotente.

## 2026-10-13 (CTA final en home, banners amplios y header no fijo en móvil)

### Added

- Bloque final de contacto en `index.html` (solo home): título con palabra resaltada, 4 contactos reales con ícono, tarjeta con botones "Solicitar asesoría por WhatsApp" y "Escríbenos un correo", y nota de horario. Fondo oscuro con `normativa-higiene-planta.jpg`, paleta y radios propios.

### Changed

- Banners de subpágina en escritorio (`min-width: 861px`): `min-height: clamp(360px, 55vh, 520px)`, contenido centrado y título `clamp(2.4rem, 4vw, 3.2rem)`; overlay, efecto fijo y móvil intactos.
- Cabecera (`.site-header`) con `position: relative` en ≤860px; `sticky` intacto en escritorio y anclaje del menú móvil conservado.

### Verified

- Un solo `<h1>` en home, enlaces wa.me/mailto correctos, CTA ausente en subpáginas, llaves CSS balanceadas, sin colores ni fuentes de Crecepe. Archivos del change: `index.html` (sección añadida, 0 líneas eliminadas), `assets/css/main.css` (estilos `cta-*`, tamaño de banners, header móvil) y `CHANGELOG.md`. Sin commit/push ni publicación.

## 2026-10-13 (Banners con fondo fijo y barra oculta en móvil)

### Changed

- Barra superior (`.topbar`) oculta cuando el ancho es ≤860px; sigue en el HTML y visible en escritorio. El teléfono y correo permanecen en el footer.
- Banners de subpágina (`.page-head--servicios`, `--nosotros`, `--noticias`, `--cursos`) con `background-attachment: fixed` en escritorio; vuelven a `scroll` en ≤860px y con `prefers-reduced-motion`. Sin cambios en el Hero, las fichas ni el HTML.

### Verified

- Llaves CSS balanceadas; Hero y fichas no usan las clases de banner; Cursos conserva un solo `<h1>` y sin enlaces rotos. Diff propio limitado a `assets/css/main.css`. Sin publicación.

## 2026-10-13 (Mejora visual de Servicios: fotos, marco uniforme y cierre)

### Changed

- Fotos de normativa y sistemas en `servicios/index.html` sustituidas por versiones de mayor resolución (1600 px de ancho): `normativa-higiene-planta.jpg` y `sistemas-operaria-planta.jpg`. Las anteriores se conservan porque `index.html` las sigue usando en sus tarjetas.
- Las 4 imágenes de servicio comparten marco (radio `--radio`, sombra) y relación de aspecto 4:3; la sección de sistemas adopta la clase `identidad`.
- Bloque de cierre "¿Quieres entender primero la base?" rediseñado como tarjeta centrada con título, texto y botón a la guía, con componentes existentes y sin colores nuevos.

### Fotos (licencia Pexels: uso comercial permitido, sin atribución obligatoria)

- `normativa-higiene-planta.jpg`: https://www.pexels.com/photo/woman-in-uniform-working-on-food-industry-factory-5953687/
- `sistemas-operaria-planta.jpg`: https://www.pexels.com/photo/food-industry-workers-5964489/

### Verified

- Un solo `<h1>`, sin enlaces internos rotos, llaves CSS balanceadas y diff limitado a `servicios/index.html`, `assets/css/main.css` y las 2 fotos nuevas. Sin cambios en metadatos, sitemap ni producción.

## 2026-10-13 (SEO por keywords en local: servicios, guía y metadatos)

### Added

- Páginas de servicio en `servicios/`: registro sanitario DIGESA, certificación HACCP, implementación FSSC 22000 y BRCGS Food Safety. Cada una con un único `<h1>`, canonical propio y JSON-LD `Service`. Texto solo del documento base, sin precios ni plazos.
- Guía `inocuidad-alimentaria/`: concepto, programas BPM/POES/HACCP y normativa citada en los cursos.
- Enlaces desde `servicios/index.html` a cada servicio y a la guía. Cinco URLs nuevas en `sitemap.xml` (de 13 a 18).

### Changed

- `<title>` y meta description de Inicio, Nosotros, Cursos y Servicios dentro de rango (título ≤ 60, descripción 120–160).
- Fichas de curso: título y descripción SEO propios (`seoTitle` y `seoDesc` en `tools/generar-fichas.mjs`). El `h1` y el contenido visible no cambian.

### Fixed

- Títulos de fichas sin "| Proinocuidad" repetido; antes salía dos veces.

### Verified

- 18 páginas HTML: un `<h1>`, canonical presente, títulos ≤ 60, descripciones 120–160 y sin enlaces internos rotos.
- Regeneración de fichas idempotente. Diff frente al respaldo: solo cambian `<title>`, `og:title` y `description`.
- Sin cambios en CSS ni JS. Sin publicación: los cambios viven en el repo local; `proinocuidad.com` no se modificó.
- Volúmenes de referencia de SE Ranking (Perú, octubre 2026); re-medir antes de publicar.

## 2026-10-12 (listados de cursos en HTML estático)

### Changed

- Listado de Cursos (`#lista-cursos`, 8 tarjetas) y "Cursos destacados" del Inicio (`#cursos-destacados`, 4 tarjetas): ahora llegan en el HTML inicial, generados por `tools/generar-listados.mjs` desde `assets/js/cursos-data.js`. Se retiraron los bloques JS que construían las tarjetas; las pestañas Asíncronos/En vivo no cambian. Sin cambios de textos, precios, enlaces, flyers ni diseño. Regenerar con `node tools/generar-listados.mjs`; no editar las tarjetas a mano.

### Verified

- Tarjetas estáticas idénticas al DOM que generaba el JS (comparación antes/después: 8/8 y 4/4 sin diferencias). Listados visibles con JavaScript deshabilitado, con enlace a cada ficha. Pestañas conmutan y conservan las 8 tarjetas; Inicio sin errores de consola. Regeneración idempotente.

## 2026-10-12 (desborde horizontal en "Quiénes somos" en móvil)

### Fixed

- Bloques de dos columnas ("Quiénes somos" en Inicio y Nosotros, y secciones de Servicios): la columna ya no se sale de la pantalla en móvil y tableta. Antes el desborde era de 9 a 18px en 360 y 390px.
- Imágenes de estos bloques con proporción conservada y ancho máximo del 100% de su columna.
- Recorte horizontal de las secciones con bloques de dos columnas, para contener el desplazamiento inicial de la animación de entrada. No cambia el aspecto en reposo.

## 2026-10-12 (footer centrado y tarjetas en una columna en móvil)

### Changed

- Footer en móvil (≤560px): logo, textos, listas, contacto, redes y línea de derechos centrados. El desplazamiento de hover de los enlaces se desactiva en móvil.
- Tarjetas de Cursos, Servicios e Inicio ("Cursos destacados" y "Nuestros servicios"): una sola columna hasta 860px (antes dos desde 561px). Escritorio no cambia.

### Verified

- Auditoría responsive en 13 páginas y 6 anchos (360 a 1280px). Pendientes fuera de alcance: imagen de "Quiénes somos" (`.identidad-grid`) que desborda 9 a 18px en 360 y 390px en Inicio, Nosotros y Servicios; y ninguno en tarjetas.

## 2026-10-11 (entrada animada en bloques de dos columnas)

### Added

- Hero de Inicio y bloques de texto e imagen (Inicio, Nosotros, Servicios) con entrada suave: texto desde la izquierda, imagen desde la derecha. Respeta movimiento reducido y no oculta contenido sin JavaScript. Sin cambios de textos ni SEO.

## 2026-10-11 (hover azul en botones Ver todos)

### Changed

- Botones "Ver todos los cursos" y "Ver todos los servicios" de los submenús: el hover pasa de rojo a azul oscuro (#0b1257); la flecha se muestra siempre, junto al texto y centrada (SVG de trazo grueso), y se desplaza al pasar el cursor. Sin cambios de tamaño, texto ni enlaces. Sin cambios SEO.

## 2026-10-11 (submenús Servicios y Cursos compactos)

### Changed

- Submenús Servicios y Cursos: paneles de 460px con ítems compactos, ícono de 44px en cuadro y altura uniforme. El submenú Cursos muestra solo los 4 cursos destacados del Home. "Ver todos" a 13px y ancho completo; 1 columna en móvil. Aplicado en las 13 páginas y en la plantilla de fichas; las fichas regeneradas solo cambian el bloque de menú. Textos y enlaces de cada página conservados. Sin cambios SEO en el contenido.

## 2026-10-11 (misión, visión y valores en tarjetas)

### Changed

- Nosotros: la sección Misión, visión y valores pasa a tres tarjetas con cabecera de color, ícono circular sobre el borde y bullets rojos; misma altura entre tarjetas y efecto hover (elevación e ícono rojo); 1 columna en móvil. Textos sin cambios, paleta del sitio. Sin cambios SEO.

## 2026-10-11 (íconos SVG en botones)

### Changed

- Íconos SVG de 18px en botones: "Más información" (+) y "WhatsApp" en tarjetas de curso, "Consultar por WhatsApp" y "Ver cursos" en el hero de Inicio, y "Aula Virtual" en el menú de cabecera. El "+" de "Más información" es un círculo contenedor (⊕). El ícono de "Aula Virtual" queda centrado verticalmente. Sin cambios de colores, destinos ni SEO.

## 2026-10-11 (botones de tarjetas apilados)

### Changed

- Las tarjetas de curso apilan sus botones al 100% ("+ Más información" y WhatsApp) con tipografía regular en una línea. Sin cambios de colores, destinos ni SEO.

## 2026-10-11 (radio global 4px en botones)

### Changed

- Todos los botones rectangulares (`.btn`, pestañas, Aula Virtual, mega-menú) usan `border-radius: 4px`. Solo cambia el radio; colores, bordes y sombras intactos. Botones circulares (redes, flotantes) e insignias sin cambios. Sin SEO.

## 2026-10-11 (fotos de fondo en heroes estilo Crecepe)

### Changed

- Los heroes de Servicios, Nosotros, Noticias y Cursos usan foto de fondo con overlay azul marino. Fotos libres Pexels autoalojadas en AVIF: Servicios (https://www.pexels.com/photo/5953804/), Nosotros (https://www.pexels.com/photo/2889093/), Noticias (https://www.pexels.com/photo/8877381/), Cursos (https://www.pexels.com/photo/8761327/). Sin cambios de textos ni SEO.
- Las 8 fichas llevan foto temática propia con overlay (diplomado 2889347, legislación 7054502, BPM/POES 39839900, HACCP DIGESA 8940349, Codex 2889193, higiene 18631424, FSSC 38336747, auditor 28196491; URLs base https://www.pexels.com/photo/<id>/).

## 2026-10-11 (hero de fichas unificado estilo Servicios)

### Changed

- Las 8 fichas muestran migas "Inicio / Cursos / <curso>" y la descripción bajo el título, como el hero de Servicios. Se elimina la etiqueta del hero (la modalidad sigue en Datos generales). Sin cambios de contenido, URLs ni SEO.

## 2026-10-11 (migas estilo Crecepe en Servicios)

### Changed

- El hero de Servicios muestra migas "Inicio / Servicios" sobre el título, como las páginas de Crecepe. Solo Servicios; sin cambios de textos, URLs ni SEO.
- Extensión: mismo bloque de migas en Nosotros ("Inicio / Nosotros"), Noticias ("Inicio / Noticias y eventos") y el índice de Cursos ("Inicio / Cursos").

## 2026-10-11 (scrollbar personalizada estilo Crecepe)

### Changed

- Barra de desplazamiento delgada en rojo corporativo con hover rojo oscuro, como la de Crecepe. Solo CSS, sin cambios SEO.

## 2026-10-11 (botones flotantes estilo Crecepe a la izquierda)

### Changed

- El botón flotante de WhatsApp usa el icono SVG oficial (58 px, sombra verde) a la izquierda, como el botón principal de Crecepe. Mismo enlace de chat.
- Nuevo botón circular azul para volver arriba, a la derecha; aparece al bajar y se oculta en el inicio (JS mínimo en `main.js`, sin cambios de librerías).
- Sin cambios de enlaces, textos ni SEO.

## 2026-10-11 (rediseño del footer con iconos de redes)

### Changed

- Los enlaces del footer y la barra superior ya no subrayan en hover/foco; el hover es por cambio de color.
- Las redes sociales (Facebook, YouTube, Instagram, LinkedIn y comunidad WhatsApp) usan iconos SVG en botones circulares en el footer y en la barra superior, con `aria-label` por red. Mismos enlaces y destinos.
- La barra de copyright ahora tiene fondo azul oscuro institucional (`#0b0e56`) con texto blanco.
- Los enlaces de contacto del footer usan texto blanco y los de la columna Enlaces muestran un guion rojo con desplazamiento al hover.
- La etiqueta "Teléfono/WhatsApp:" se acorta a "Contacto:" en footer y barra superior de todo el sitio.
- Sin cambios de textos, URLs, estructura ni SEO.

## 2026-10-11 (efecto de enlaces de tarjeta estilo Crecepe)

### Changed

- Los enlaces `.card-link` ("Saber más", "Leer la noticia completa") ya no usan el subrayado global en hover. Usan texto en 0.95rem y flecha SVG gruesa de 16 px (`stroke` 2.5) que se desplaza al pasar el cursor (gap 8px → 13px), como `.service-link` de Crecepe, en rojo corporativo. Sin cambios de `href`, textos ni SEO.

## 2026-10-11 (estilo de navegación, píldoras de sección y fuente)

### Changed

- Hover del menú de escritorio: los enlaces de nivel superior ya no usan fondo azul claro. Muestran texto azul con una línea roja animada debajo. Solo aplica con puntero en pantallas de más de 860 px. El botón "Aula Virtual" y el mega-menú no cambian.
- Cada encabezado de sección de Inicio, Servicios y Nosotros (11 en total) muestra una píldora con un nombre corto, por ejemplo "Casos reales".
- Tipografía Outfit en todo el sitio, alojada en `assets/fonts/outfit-latin-wght.woff2` (archivo variable para los pesos 400 a 800). Ya no se usa la fuente del sistema. Los botones de formulario también heredan la fuente.

## 2026-10-10 (ajuste del logo en el encabezado)

### Changed

- Retirado el texto "Proinocuidad / Consultoría alimentaria" del encabezado de las 13 páginas y de la plantilla del generador, porque el logo ya lo incluye. Se eliminaron las reglas CSS `.brand span`.
- `assets/img/logo-proinocuidad.png` recortado sin margen transparente (500×500 → 448×156), para que el logo se vea a su tamaño real en el encabezado. El original se conserva en `_archivo/logo-proinocuidad-sin-recorte.png`.

## 2026-10-10 (reemplazo de logo y favicon)

### Changed

- Logo del sitio reemplazado por la versión sin fondo (`assets/img/logo-proinocuidad.png`, 500×500). El logo anterior se conserva en `_archivo/logo-proinocuidad-anterior.png`.
- Favicon: `<link rel="icon">` apunta ahora a `assets/img/favicon.ico` (16, 32 y 48 px) y el `<link rel="apple-touch-icon">` a `assets/img/apple-touch-icon.png` (180×180), en las 13 páginas y en la plantilla del generador. `favicon.png` se conserva en `_archivo/favicon-anterior.png`.

## 2026-10-10 (estructura base de SEO)

### Added

- `sitemap.xml` con las 13 páginas públicas (dominio `https://proinocuidad.com`).
- `robots.txt` que permite el rastreo y declara el sitemap.
- `<link rel="canonical">` y `<meta property="og:url">` en las 13 páginas.
- JSON-LD `Organization` en la página de Inicio.
- JSON-LD `Course` en las 8 fichas de curso (horas, precios en PEN y USD), generado por `tools/generar-fichas.mjs`.

### Changed

- `FOTOS-(1)/` y `pagina web.pdf` movidos a `_archivo/` (material fuente, no publicado). No se borraron.
- Referencias en `STRUCTURE.md`, `assets/js/cursos-data.js` y `tools/generar-fichas.mjs` actualizadas a la nueva ruta.
- Las 8 fichas de curso regeneradas: solo cambió el `<head>`; el contenido visible es idéntico.
- `og:image` de las 12 páginas (Inicio, Nosotros, Servicios, Noticias y 8 fichas) reemplazado por `proinocuidad-og-1200x630.png` (1200×630), con URL absoluta. Antes apuntaba al logo.

## 2026-10-10

### Added

- Sitio web corporativo completo de Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.:
  - Página Inicial con el eslogan oficial, cifras de la empresa, servicios destacados,
    cursos destacados y la noticia vigente.
  - Página Nosotros (quiénes somos, RUC 20615307603, fundación, misión, visión y valores).
  - Página Servicios con los 4 servicios y los 3 casos reales de capacitación
    (Agroindustrial Laredo S.A., Productos Razzeto & Nestorovic S.A.C., Cevichería Dsumare).
  - Sección Cursos con pestañas Asíncronos / En vivo y fichas de detalle para los 8 cursos
    (datos generales, beneficios, público objetivo, objetivo, temario desplegable,
    metodología con aula virtual, inversión, inscripción online y medios de pago).
  - Página Noticias y eventos con la nota vigente de DIGESA (vigencia indeterminada del HACCP).
  - Footer global en todas las páginas: contacto, horario, ubicación, redes sociales,
    comunidad de WhatsApp y acceso al Aula Virtual.
- Favicon con el ícono institucional y metadatos de compartir en todas las páginas.

### Changed

- La pestaña "En vivo" del listado de cursos muestra ahora un aviso de que
  **no hay cursos en vivo por el momento** (anteriormente presentaba el flyer de una
  edición pasada por Zoom). Los cursos disponibles siguen en la pestaña Asíncronos.

### Pendientes (a la espera de datos del cliente)

- Botón de pago en línea (Culqi): pendiente el enlace real por curso.
- Medios de pago informativos: pendiente el número real de Yape/Plin.
- Tarjeta del curso "HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)":
  pendiente un flyer de modalidad asíncrona.
- Pestaña "En vivo": pendiente la ficha oficial del cliente cuando haya una nueva oferta.
- Dirección exacta de la oficina: se muestra "Próximamente".
