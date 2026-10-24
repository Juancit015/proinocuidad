# Design

## Context

Ver `proposal.md - Why`. La sección vive solo en `index.html`, entre el hero y "Servicios". La primera versión se implementó con tarjetas verticales de 381px de ancho a 1440px: el valor grande quedaba flotando en una caja casi vacía. La referencia que pide ahora el dueño es la barra de datos de las fichas de curso (`cursos/diplomado-gestion-calidad-e-inocuidad/index.html`): tarjetas horizontales y compactas, con icono de 44px en un cuadro `--azul-claro`, etiqueta en mayúsculas de 0.76rem en `--gris` y valor de 0.96rem en `--azul-oscuro`. Medido a 1440px, esa barra tiene 4 tarjetas de 184px dentro de una columna de 784px; el Home tiene 3 cifras.

## Goals / Non-Goals

**Goals:**
- Que las tres cifras se lean como datos compactos, no como cajas anchas con un número suelto.
- Que la tarjeta sea reconocible como la misma familia visual de las fichas de curso.
- Mantener el título de sección y la fila de tres, sin inventar una cuarta cifra.

**Non-Goals:**
- No se toca la barra de datos de las fichas ni sus clases.
- No se añade conteo animado ni JavaScript.
- No se cambia el contenido de las cifras ni el SEO de la página.

## Decisions

- **Copiar el patrón de `.ficha-stat-card`.** Tarjeta horizontal con `padding: 18px 16px`, `gap: 14px`, icono de 44px, etiqueta en mayúsculas y valor en azul oscuro. Es exactamente la pieza que el dueño señaló; inventar una variante solo para el Home rompería la comparación.
- **Reutilizar `.stat-icono` y `.stat-info`.** Son clases globales que ya definen el cuadro del icono (44px, radio 12, `--azul-claro`, `--azul`) y la jerarquía etiqueta/valor. Reutilizarlas garantiza que las dos barras se vean iguales y evita duplicar valores que se desincronicen.
- **Iconos de la misma familia y grosor.** Usuarios (el mismo SVG de "Conócenos") para personas capacitadas, libro (el de "Estructura" de la ficha) para cursos y diplomado, y escudo con check (el de "Certificación") para compromiso. Todos son SVG en línea, `viewBox="0 0 24 24"`, trazo 2 y `aria-hidden="true"`.
- **Fila de 820px centrada, no el contenedor de 1180px.** Con 820px cada tarjeta mide ~263px a 1440, frente a los 381px anteriores y los 184px de la ficha. Es el punto medio: conserva la densidad de la ficha sin que tres tarjetas queden perdidas en una franja demasiado estrecha. El límite se aplica a `.cifras-grid` (`max-width: 820px; margin-inline: auto`) y no al `.container`, para que el H2 siga alineado a la izquierda con el hero y el resto de secciones; con el límite en el contenedor el título quedaba sangrado 180px respecto a la página. Alternativa descartada: 584px (el ancho exacto de tres tarjetas de 184px), que deja la sección como una isla bajo un título de 300px.
- **Tres columnas solo por encima de 860px.** A 561px, tres columnas darían 161px por tarjeta y el icono de 44px más el texto no caben; la ficha ya apila a una columna en móvil. Por debajo de 860px se apilan tres filas horizontales de ancho completo, que es el patrón de la ficha en pantallas pequeñas.
- **Hover de 3px y sombra, sin borde rojo.** Es el hover que ya tiene `.ficha-stat-card`; el borde rojo de la versión anterior era un acento que la referencia no tiene. El cambio no altera el layout porque usa `transform`.
- **Fondo fotográfico con velo blanco degradado, no plano.** Primera condición del dueño: velo "un poco blanco" y que la cara de la chica se vea. Un velo oscuro tipo `.page-head` desdibujaba el rostro y contradecía el pedido; un velo blanco plano y denso (0.9) convertía la foto en niebla; a 0.45 uniforme el título quedaba founded sobre la zona de máquinas y la cara se veía menos. El degradado a 90° `rgba(246,247,251,0.62)→0.30` deja el lado del título más cubierto y la zona de la trabajadora más limpia. Medido: fondo bajo el H2 `rgb(206,202,196)` → contraste ≈ 10:1.
- **`background-position: center, center 13%` y padding de 64px.** Con `cover`, la franja muestra una sola banda de la foto. Con 48px la banda medía 275px y la cara escalada ocupa ≈298px: quedaba cortada en la barbilla. Con 64px (banda de 307px) y el desplazamiento 13% la cabeza entra completa con aire. La cara queda detrás de la tarjeta central a 1440: ojos sobre la tarjeta, sonrisa debajo; es el encuadre consciente, no un recorte accidental.
- **El AVIF final parte del original que aportó el dueño.** Las capturas grandes de Unsplash+ traen marcas de agua en mosaico y quedaron visibles en la primera prueba; el `.avif` definitivo (12KB) se genera desde el original de 870×580 limpio. Peso pequeño porque la foto va cubierta por el velo: la nitidez la da el marco, no la resolución.
- **Título con el patrón del sitio.** `.section-head` + H2 y el subrayado rojo que llevan las demás secciones del Home, para que la sección no quede como un bloque suelto.
- **Movimiento reducido.** La transición se anula en el bloque `@media (prefers-reduced-motion: reduce)` existente; la elevación sigue ocurriendo, pero instantánea.

## Risks / Trade-offs

- [Riesgo] La etiqueta "cursos y un diplomado asíncrono" es la más larga y a 263px puede ocupar dos líneas → Mitigación: la tarjeta crece en alto y las tres se igualan por la grilla; se verifica a 861, 1024 y 1440px.
- [Riesgo] A 860px las tarjetas apiladas miden 791px de ancho y parecen filas de lista → Mitigación: es el mismo patrón de la ficha en móvil y el icono mantiene la lectura; se revisa en captura.
- [Riesgo] Reutilizar `.stat-info` acopla el Home a los estilos de la ficha → Mitigación: es deliberado, para que un cambio futuro en la barra de datos se refleje en ambos; si la ficha cambia de patrón, el Home debe seguirlo.
- [Riesgo] La fila de 820px es más estrecha que el resto de secciones y deja márgenes grandes a los lados → Mitigación: va centrada dentro del contenedor normal del sitio, con el título alineado al hero; en tablet y móvil el `92%` del contenedor manda y la fila ocupa el ancho disponible.
- [Riesgo] Los iconos podrían añadir peticiones → Mitigación: son SVG en línea, sin `<use>` ni CDN.

## Migration Plan

Sitio estático: se publican `index.html` y `assets/css/main.css` juntos. Revertir el commit devuelve la franja plana; no hay datos ni URLs que migrar.

## Open Questions

(none)
