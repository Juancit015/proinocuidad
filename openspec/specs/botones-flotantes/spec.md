# Botones flotantes

## Purpose

Los dos botones fijos del sitio (WhatsApp y volver arriba) acompañan al usuario durante todo el documento; esta capability define hasta dónde llegan cuando el pie de página entra en su zona y cómo recuperan su posición al subir.

## Requirements

### Requirement: Los flotantes frenan sobre la barra de copyright
En todas las páginas y en todos los anchos, cuando el borde superior de la barra de copyright (`.footer-bottom`) sube por encima del borde inferior de los botones flotantes, los dos botones SHALL desplazarse hacia arriba exactamente la diferencia entre ambos bordes, de modo que su borde inferior quede apoyado sobre la barra. La barra y sus dos líneas de texto SHALL permanecer visibles, completas y sin cambios.

#### Scenario: Frenado en móvil
- **WHEN** el usuario llega al final de cualquier página con un ancho de 390px
- **THEN** el botón de WhatsApp y el de volver arriba se ven, su borde inferior coincide con el borde superior de la barra y ninguna parte del texto de copyright queda tapada

#### Scenario: Frenado en tableta
- **WHEN** el usuario llega al final de cualquier página con un ancho de 683px
- **THEN** los dos flotantes siguen visibles, apoyados sobre la barra, sin solaparla

#### Scenario: Frenado en escritorio
- **WHEN** el usuario llega al final de una página con un ancho de 1024px
- **THEN** los dos flotantes siguen visibles, apoyados sobre la barra, sin solaparla

#### Scenario: La barra no cambia
- **WHEN** los flotantes se desplazan para frenar
- **THEN** el alto de la barra, su color de fondo y sus dos líneas de texto son los mismos que sin el cambio

### Requirement: Frenados siguen visibles y utilizables
Con el freno aplicado, los dos botones SHALL conservar su opacidad y visibilidad plenas, y SHALL seguir recibiendo clic y foco de teclado.

#### Scenario: Siguen siendo utilizables
- **WHEN** los flotantes están frenados sobre la barra
- **THEN** un clic en el botón de WhatsApp abre el chat y un clic en el de volver arriba lleva al inicio; ambos siguen recibiendo foco con Tab

### Requirement: El freno acompaña al scroll
El desplazamiento del freno SHALL recalcularse al desplazarse y al cambiar el tamaño de la ventana, sin una transición propia que lo retrase: mientras la barra sube, los botones SHALL mantenerse pegados a su borde superior.

#### Scenario: La barra sube
- **WHEN** el usuario sigue bajando mientras la barra de copyright ya toca los flotantes
- **THEN** los botones suben con ella, sin quedarse atrás ni adelantarse, y sin saltos

#### Scenario: Sin parpadeo en el umbral
- **WHEN** el usuario se detiene justo en el punto en que la barra toca a los flotantes
- **THEN** el desplazamiento es 0 y el estado es estable, sin alternar entre scrolls mínimos

### Requirement: Los flotantes vuelven a su posición al subir
Cuando la barra de copyright vuelve a quedar por debajo del umbral, el freno SHALL volver a 0 y los botones SHALL recuperar su posición base (`bottom: 26px`). El botón de volver arriba SHALL seguir aplicando su regla vigente: visible solo con más de 400px de desplazamiento.

#### Scenario: Subir desde el final
- **WHEN** el usuario está al final de la página con los flotantes frenados y sube hasta que la barra sale de la zona
- **THEN** los dos botones vuelven a su posición base y el de volver arriba sigue visible mientras el desplazamiento supere 400px

### Requirement: Sin JavaScript no se altera el sitio
Si el JavaScript no se ejecuta, los flotantes SHALL conservar su comportamiento y su posición actuales, y el contenido SHALL seguir siendo legible.

#### Scenario: JavaScript deshabilitado
- **WHEN** se carga cualquier página con el JavaScript deshabilitado
- **THEN** los dos botones flotantes se muestran como hoy y el resto de la página no cambia

### Requirement: El freno respeta el movimiento reducido
Con `prefers-reduced-motion: reduce`, el freno SHALL aplicarse igual pero sin animación añadida: el botón se mueve con el scroll, no con una transición propia.

#### Scenario: Movimiento reducido
- **WHEN** el usuario tiene activada la preferencia de movimiento reducido y llega al final de la página
- **THEN** los flotantes se detienen sobre la barra en el mismo instante en que esta los toca, sin transición
