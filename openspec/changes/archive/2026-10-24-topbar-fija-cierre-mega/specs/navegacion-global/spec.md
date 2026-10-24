# Spec Delta: navegacion-global

## MODIFIED Requirements

### Requirement: Los anclas internas se despegan de la cabecera fija
Los destinos de anclas internas del sitio SHALL reservar espacio por encima de su posición mediante `scroll-margin-top`, para que la cabecera fija no tape su contenido. En escritorio (más de 860px), donde la barra superior de contacto es visible y queda pegada junto a la cabecera, el valor SHALL superar la altura del conjunto pegado (barra superior más cabecera) más un pequeño margen de aire. En móvil (860px o menos), donde la barra superior no existe, SHALL conservar el valor actual. En ambos casos el usuario SHALL ver completo el primer contenido de la sección de destino tras la navegación por ancla.

#### Scenario: Navegar a un ancla con la cabecera fija
- **WHEN** el usuario navega a un ancla interna, como el botón "Matricularme Ahora" de una ficha o una sección de Servicios
- **THEN** el contenido de destino queda por debajo de la cabecera y ninguno de sus elementos queda tapado por ella

#### Scenario: El destino sigue siendo alcanzable
- **WHEN** la navegación por ancla termina
- **THEN** el usuario ve completo el primer contenido de la sección de destino, sin necesidad de desplazarse hacia arriba

## ADDED Requirements

### Requirement: El mega-panel se cierra al entrar en un enlace de ancla
En escritorio, cuando el usuario activa desde el mega-panel un enlace de ancla de la misma página (por ejemplo, los servicios de `servicios/index.html`), el panel desplegable SHALL cerrarse para dejar legible el contenido de destino. El cierre SHALL producirse sin recargar la página y sin impedir el salto del ancla.

#### Scenario: Clic en un servicio del mega-panel
- **WHEN** el usuario, con el mega-panel de "Servicios" desplegado en escritorio, hace clic en "Registro sanitario" (ancla de la misma página)
- **THEN** la página salta a la sección y el mega-panel desaparece, dejando visible el contenido de destino

#### Scenario: El cierre no rompe los demás casos
- **WHEN** el usuario activa un enlace con `target="_blank"` o navega en el menú móvil
- **THEN** el menú se cierra como hasta ahora, y el salto de ancla se produce con normalidad en todos los casos

### Requirement: La barra superior acompaña el scroll en escritorio
En pantallas de más de 860px, la barra superior de contacto (`.topbar`) SHALL permanecer visible pegada al borde superior durante el desplazamiento, y la cabecera SHALL quedar pegada inmediatamente debajo de ella, formando un conjunto unido. La barra superior SHALL seguir por encima visualmente de la cabecera y del resto del contenido durante el scroll. En 860px o menos la barra superior SHALL seguir oculta y la cabecera SHALL seguir pegada en su posición actual, sin cambios de comportamiento.

#### Scenario: Scroll en escritorio con la barra visible
- **WHEN** el usuario se desplaza hacia abajo en una pantalla de más de 860px
- **THEN** la barra de contacto permanece pegada arriba y la cabecera queda unida justo debajo, ambas visibles durante todo el scroll

#### Scenario: Móvil sin cambios
- **WHEN** el usuario se desplaza en una pantalla de 860px o menos
- **THEN** la barra superior no aparece y la cabecera se comporta exactamente como hoy
