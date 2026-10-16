# Design

## Context

Ver proposal.md para la motivación. Lo que condiciona el enfoque:

- La franja del home es `<section class="cifras">` con **cuatro** `<div>`, cada uno con un `<strong>` (el número) y un `<span>` (la etiqueta). La que se quita es la segunda.
- `.cifras .container` es un grid de `repeat(4, 1fr)` en escritorio y `repeat(2, 1fr)` a ≤1020px (`main.css:317` y `:510`). Quitar un hijo sin tocar el CSS deja **una columna vacía** en escritorio y un hueco en la tercera posición de la tableta.
- La misma afirmación aparece en el párrafo de "Quiénes somos" (`nosotros/index.html`), con la forma "Con 3 años de experiencia y más de 1000 personas capacitadas, ayudamos a…". Es un solo `<p>` con el resto del texto corrido, así que quitar el número es reescribir esa frase, no borrar un elemento.
- **El dato de origen ya está a la vista:** la misma página muestra "fundada el 29 de octubre del 2023". Quitar "3 años" no pierde información, porque la fecha permite deducirla y no envejece.
- Ninguna spec fijaba el texto "3 años": en `pagina-nosotros` el requisito "Quiénes somos" fija la fecha de fundación y "más de 1000 personas capacitadas", pero nunca la antigüedad. La cifra era una derivación editorial.

## Goals / Non-Goals

**Goals:**

- Que el sitio no afirme una antigüedad que se queda vieja sola.
- Que la franja de cifras siga viéndose como una franja de cifras, sin huecos.
- No perder nada de información: la fecha de fundación sigue visible.

**Non-Goals:**

- No tocar las otras tres cifras, ni "1000 personas capacitadas" en el párrafo de Nosotros (es una cifra de actividad, no envejece).
- No reescribir el resto del párrafo de Nosotros, ni la sección de cifras más allá de quitar esa tarjeta.
- No tocar SEO: title, meta description, canonical y `<h1>` quedan intactos.
- No añadir un dato nuevo que sustituya al eliminado. Se prefiere el vacío honesto a un número inventado.

## Decisions

### 1. La cifra se elimina, no se sustituye

La franja pasa de cuatro cifras a tres. La alternativa obvia —sustituir "3 años de experiencia" por otra métrica— queda descartada: el proyecto ya tiene escrito el criterio de no publicar cifras sin fuente verificada (spec `guia-inocuidad`), y cualquier número nuevo sería una afirmación que nadie ha verificado. Tres cifras verdadeiras se ven mejor que cuatro con una dudosa.

### 2. El grid pasa a 3 columnas, y el punto de quiebre de tableta se rethink

En escritorio, `repeat(3, 1fr)` da tres columnas iguales sin hueco: es el cambio mínimo y el resultado es simétrico.

En tableta el grid baja a `repeat(2, 1fr)`, y con tres hijos eso deja **2 + 1**, con la tercera cifra sola a la izquierda. Se acepta ese desequilibrio porque es el comportamiento habitual de una grilla con un número impar de elementos, y la alternativa —centrar la fila huérfana con un `::after` vacío o `justify-content`— añade marcado o CSS inventado para un caso que se ve bien así. **En móvil** el bloque hereda el apilado por defecto del contenedor, así que no hace falta nada.

### 3. El párrafo de Nosotros se reescribe sin el número, conservando el resto

La frase actual es "Con 3 años de experiencia y más de 1000 personas capacitadas, ayudamos a profesionales, estudiantes y empresas…". Se quita solo el primer dato y se reencadena la frase, dejando "Con más de 1000 personas capacitadas, ayudamos a…". El sentido se conserva entero: el párrafo sigue diciendo qué es la empresa y para quién trabaja, y sigue contendo la cifra que sí es verificable.

### 4. Solo `index.html`, `nosotros/index.html` y tres líneas de CSS

Ningún generador interviene: las dos páginas son HTML escrito a mano y las cifras no aparecen en las fichas. `main.css` se toca solo en la regla de columnas de `.cifras`; no se necesita ninguna regla nueva ni tocar `.cifras strong`, `.cifras span` o el fondo.

## Risks / Trade-offs

- **[Que la franja se vea más vacía con tres cifras que con cuatro]** → se acepta: tres columnas más anchas y mejor distribuidas se leen mejor que cuatro estrechas, y el padding vertical (`26px`) no cambia, así que la franja conserva su altura y su peso visual.
- **[Que un buscador ya haya indexado la frase "3 años de experiencia" y tarde en reflejar el cambio]** → es lo esperado al editar contenido; no requiere acción. El texto sale del DOM por completo, no queda oculto nibehind una etiqueta.
- **[Que alguien vuelva a añadir la cifra más adelante]** → por eso el requisito de `pagina-nosotros` dice explícitamente que la página SHALL NOT afirmar años de experiencia, y el de `pagina-inicio` fija que la franja son exactamente tres cifras. La decisión queda en la spec, no solo en el HTML.
- **[Que la fecha de fundación (29 de octubre de 2023) se quede vieja también]** → una fecha no envejece: siempre sigue siendo cierta. Es justamente por eso que se conserva y se prefiere a un número derivado.