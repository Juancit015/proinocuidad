# Spec Delta

## ADDED Requirements

### Requirement: Un icono de marca puede ir relleno
Los iconos de botón SHALL ir en trazo de 24×24 con `currentColor`, salvo los que representen una **marca reconocible**, que MAYCyAN ir relleno en `currentColor` para que se reconozcan de un vistazo. En un mismo sitio SHALLVerse el mismo tratamiento para todos los iconos de esa marca: no SHALL haber botones de WhatsApp en trazo junto a otros rellenos, ni al revés. Un icono de marca en relleno SHALL conservar un `viewBox` de 24×24, para que mida lo mismo que los de trazo y no se deforme.

#### Scenario: La marca tiene un único tratamiento en el sitio
- **WHEN** se revisan todos los botones con icono de WhatsApp del sitio
- **THEN** usan todos el mismo tratamiento, relleno o trazo, y el mismo `viewBox`

#### Scenario: El icono relleno no se deforma
- **WHEN** se mide el ancho y el alto dibujados de un icono relleno
- **THEN** son iguales, porque el `viewBox` es cuadrado

#### Scenario: Un icono de marca convive con iconos de acción
- **WHEN** un grupo de botones mezcla una acción con una marca
- **THEN** ambos se leen bien: el relleno pesa visualmente más que el trazo, y esa diferencia es intencionada por ser una marca, no un descuido