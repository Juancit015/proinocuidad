# Design

## Contexto

La sección `.identidad` "Quiénes somos" de `nosotros/index.html` tiene dos columnas: texto (izquierda) e imagen (derecha). El bloque nuevo va dentro de la columna de texto, después del último párrafo existente.

## Decisiones

- **Elemento `<details>` nativo** con `<summary>Ver más</summary>`: accesible por teclado, sin JavaScript, el texto queda en el HTML para SEO. Se descarta un botón con JS por añadir código sin beneficio.
- **Control como botón**: `summary` con recuadro azul de marca (`#101477`), fondo blanco, hover en `--azul-claro`, e ícono de ojo SVG inline que alterna abierto/cerrado con `[open]`. Foco visible en `#ad343b`.
- **Animación suave (revisión de Juan)**: `main.js` anima la altura del `<details>` con `element.animate` (400 ms, cúbica), sin saltos. Con `prefers-reduced-motion` no interviene y queda el comportamiento nativo. Se cancela y reversa si se pulsa durante la animación. Esto añade JavaScript a una sección que antes era solo HTML/CSS; el texto sigue en el HTML.
- **Contenido**: el texto de Juan se publica tal cual en un único `<p>` dentro del `<details>`. El `<summary>` es solo "Ver más", sin texto visible previo.
- **Textos literales del PDF**: intactos.

## Estructura prevista

```html
<details class="nosotros-ampliar">
  <summary>Ver más</summary>
  <p>…texto de Juan…</p>
</details>
```

Estilos previstos (nombres provisionales): `.nosotros-ampliar` (margen superior), `.nosotros-ampliar summary` (color azul de marca, subrayado al hover desactivado, cursor pointer, foco visible), marcador ocultado y reemplazado por un chevron CSS o SVG inline ya usado en el sitio.

## Móvil

En ≤860px la columna de texto ya se apila; el `<details>` ocupa el ancho de la columna sin desbordar. Se verifica a 390px.

## Riesgos

- El texto nuevo menciona "Trujillo" y "más de 1,000 personas", coherente con el spec. Si se desea un formato distinto (número escrito, comas), se decide en revisión.
- Duplicidad parcial con el párrafo de Capacitación: se acepta porque el texto lo entregó Juan.
