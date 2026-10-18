# Spec Delta

## ADDED Requirements

### Requirement: Botones de acción del hero por franjas de ancho
Los grupos de botones de acción de los heroes SHALL disponerse en tres franjas, sin dejar espacio vacío al lado de un botón en ninguna. Por debajo de 560px: una columna a ancho completo. Entre 560px y 860px: rejilla de dos columnas de igual anchura. Por encima de 860px: la fila actual. Cada botón SHALL ocupar toda la anchura de su columna, no su ancho natural, porque medidos por su texto vuelven las filas desparejas.

#### Scenario: Una columna cuando no caben dos
- **WHEN** se ve un hero a 390px
- **THEN** cada botón ocupa una fila completa y no queda espacio vacío a su lado

#### Scenario: Dos columnas donde sí caben
- **WHEN** se ve un hero entre 560px y 860px
- **THEN** los botones se reparten en dos columnas de la misma anchura

#### Scenario: Sin cambio en escritorio
- **WHEN** el ancho es mayor a 860px
- **THEN** el grupo de botones se mantiene en fila, como antes

#### Scenario: El punto de corte está donde caben de verdad
- **WHEN** se calcula la anchura que necesita el botón más largo del sitio a 390px
- **THEN** supera la mitad del ancho disponible, y por eso la franja de dos columnas empieza en 560px y no antes

#### Scenario: Aplica a todas las páginas con hero de acción
- **WHEN** se revisan los grupos de botones de acción de los heroes del sitio
- **THEN** todos se reparten igual en las tres franjas, incluido el hero de Inicio y el de la página de error

### Requirement: Orden visible de los botones
Cuando los botones de un grupo se apilen en móvil, el orden en el que se ven SHALL ser el orden en que aparecen en el documento. El orden SHALL deliberate, no accidental: el grupo SHALL ordenar sus botones de más importante a menos importante.

#### Scenario: El orden del documento es el orden que se ve
- **WHEN** se leen los botones de un grupo apilado de arriba abajo
- **THEN** siguen el mismo orden que aparecen en el código fuente

#### Scenario: El botón principal no es el primero por casualidad
- **WHEN** un grupo tiene un botón destacado por su variante de color
- **THEN** su posición responde al orden de importancia acordado para ese grupo, no al azar del texto que ocupa cada botón