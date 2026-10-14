# Design

## Contexto

`servicios/index.html` tiene 4 bloques `<section class="identidad">` con `identidad-grid` (imagen + texto), numerados 1 a 4. Ya existe el patrón de "Ver más" en `nosotros/index.html` (`<details class="nosotros-ampliar">`, con botón con recuadro, ojo SVG y animación en `main.js`). Se reutiliza ese mismo componente.

## Decisiones

- **Componente**: el bloque ampliable de Nosotros se reutiliza. El selector actual es `.nosotros-ampliar`; para no duplicar CSS, se renombra a una clase genérica (`.ampliar`) y se conserva la clase vieja en Nosotros, o se añade la clase genérica en paralelo. Se elige la opción de menor cambio al apply.
- **Animación**: el listener de `main.js` se aplica a todos los `.nosotros-ampliar`. Se amplía el selector a la clase genérica, sin cambiar su lógica.
- **Imagen sticky**: no aplica en Servicios. La regla `:has()` queda limitada a Nosotros.
- **Orden**: los bloques se numeran del 1 al 5 en el orden del docx. El bloque de inspecciones se inserta entre el 2 y el 4 (que pasa a 4) y el de registro sanitario pasa a 5.
- **Resumen visible**: se toma el primer párrafo del docx de cada servicio, sin promesas de plazo ni resultado.
- **Detalle dentro del `<details>`**: listas de áreas, alcance, "Dirigido a" y entregable, en el HTML. Los títulos de las listas usan `<h3>`, sin cambiar el único `<h1>` de la página.
- **Registro sanitario**: el resumen usa el texto del docx, que dice que la aprobación depende de la autoridad. Se retira "en el menor tiempo posible".
- **Imagen del servicio de inspecciones**: se propone una foto temática de inspección en planta. Antes de descargar, Juan autoriza la fuente y la licencia; la URL se registra en CHANGELOG. Si no hay una foto aprobada, el bloque usa una imagen ya existente del sitio y se registra como provisional.

## Estructura prevista

```html
<section id="inspecciones-higiene" class="identidad">
  <div class="container identidad-grid">
    <img src="../assets/img/..." alt="...">
    <div>
      <div class="section-head">…</div>
      <p>Resumen del docx.</p>
      <details class="ampliar">
        <summary>…Ver más</summary>
        <h3>Evaluamos aspectos como</h3>
        <ul>…</ul>
        <p>Entregable: …</p>
        <p>Nuestro servicio es de asesoría…</p>
      </details>
    </div>
  </div>
</section>
```

## Riesgos

- Un solo `<h1>` y el canonical no cambian.
- La numeración cambia (4→5 en registro). Si hay enlaces internos con anclas (`#registro-sanitario`), se mantienen los `id` existentes.
- Revisar en 390px que las listas largas no desborden.
