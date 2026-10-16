# Spec Delta

## Purpose

Define el sistema de iconografía de los botones del sitio Proinocuidad: cómo se dibujan los iconos, qué icono corresponde a cada acción, con qué reglas de tamaño y accesibilidad, y qué botones deben llevarlos. Sirve para que la misma acción se reconozca igual en todas las páginas y para que las fichas generadas y el HTML escrito a mano no se separen.

## ADDED Requirements

### Requirement: Iconos en línea sin dependencias
Los botones del sitio SHALL llevar su icono como SVG en línea dentro del propio `<a>` o `<button>`, antes del texto, y el sitio SHALL NOT depender de ninguna librería de iconos, fuente de iconos, `<use>` externo ni CDN. El SVG SHALL usar `viewBox="0 0 24 24"`.

#### Scenario: El icono viaja con el botón
- **WHEN** se revisa el marcado de un botón del sitio
- **THEN** el SVG está dentro del propio `<a>` o `<button>`, antes del texto, no en un contenedor aparte

#### Scenario: Sin peticiones de red por iconos
- **WHEN** se carga cualquier página del sitio
- **THEN** no se realiza ninguna petición a un origen externo por iconos

### Requirement: Color y accesibilidad del icono
El icono SHALL colorearse con `currentColor` —`fill="currentColor"` para iconos de marca macizos y `fill="none" stroke="currentColor"` para los de trazo— de modo que hereda el color de cada variante de botón, y SHALL declarar `aria-hidden="true"` por ser decorativo.

#### Scenario: El icono toma el color del botón
- **WHEN** se revisa un botón `.btn-whatsapp`, `.btn-rojo` o `.btn-borde`
- **THEN** su icono se ve en el color de texto del propio botón, sin color propio ni CSS específico por icono

#### Scenario: El icono no duplica la etiqueta
- **WHEN** un lector de pantalla recorre un botón con icono
- **THEN** lee solo el texto visible del botón, porque el SVG está marcado como decorativo

### Requirement: Cobertura de todos los botones
Todo botón del sitio que no sea `.mega-cta` SHALL llevar icono, incluidos los botones de las fichas de curso. El texto visible, el destino, el `target` y el orden de los botones SHALL permanecer sin cambios; los botones `.mega-cta` del panel de navegación quedan excluidos porque ya dibujan su flecha con máscara CSS.

#### Scenario: Botones de las fichas de curso
- **WHEN** se abre cualquiera de las 8 fichas de `cursos/*/index.html`
- **THEN** sus botones "Copiar", "Copiar CCI", "Aula Virtual", "Pagar Online con Culqi", "Solicitar link de PayPal / WU", "Enviar inscripción", "Matricularme Ahora" y "Contactar Asesor" muestran icono

#### Scenario: Botones de páginas estáticas
- **WHEN** se abre el home o la sección de servicios
- **THEN** los botones "Conócenos", "Ver todos los cursos", "Solicitar asesoría", "Ver certificación HACCP", "Ver FSSC 22000", "Ver BRCGS Food Safety" y "Ver registro sanitario" muestran icono

#### Scenario: Botón con icono deshabilitado
- **WHEN** se ve el botón "Pagar Online con Culqi", marcado como no disponible
- **THEN** muestra su icono y conserva exactamente su rótulo, destino y estado, sin cambiar de comportamiento

### Requirement: Un icono por acción
La misma acción SHALL usar el mismo icono en todo el sitio y una acción SHALL tener un solo icono en todo el sitio, aunque cambie la página. Un icono de marca como el de WhatsApp SHALL conservar su relleno macizo propio.

#### Scenario: Misma acción, mismo icono
- **WHEN** se comparan los botones de asesoría de un servicio, del listado de servicios y de una ficha de curso
- **THEN** los tres usan el icono de soporte y el texto que ya tenía cada uno

#### Scenario: Copiar en cualquier contexto
- **WHEN** se revisan los botones "Copiar" y "Copiar CCI" de una ficha
- **THEN** ambos usan el icono de portapapeles y se distinguen solo por su texto

### Requirement: Catálogo de iconos por acción
El sitio SHALL tener un catálogo cerrado que fije un icono por acción: portapapeles para copiar un valor, birrete para "Aula Virtual", tarjeta de crédito para el pago con Culqi, envío para "Enviar inscripción" y "Solicitar link de PayPal / WU", edición para "Matricularme Ahora", soporte para "Contactar Asesor" y "Solicitar asesoría", usuarios para "Conócenos", flecha o grilla para "Ver todos..." y "Ver <servicio>". Ninguna acción SHALL quedar sin icono definido en el catálogo.

#### Scenario: Acción sin icono definido
- **WHEN** se revisa el catálogo contra los botones del sitio
- **THEN** todo botón tiene una acción con icono asignado, y ninguna acción aparece con dos iconos distintos

### Requirement: Tamaño y alineación de los iconos
Los iconos SHALL medir 18px en botones normales, 16px en botones pequeños (`.btn-sm`) y 14px en `.btn-copiar`; SHALL ser `flex: none` para que no cambien de ancho al alinear texto, y el botón SHALL mantener su alineación vertical y su separación actual entre icono y texto. El sitio SHALL NOT introducir animaciones nuevas por la presencia de iconos.

#### Scenario: Icono en botón pequeño
- **WHEN** se mide el icono de "Pagar Online con Culqi", que es un botón pequeño
- **THEN** el icono es menor que el de los botones normales del mismo bloque y el texto queda alineado

#### Scenario: Texto largo no descuadra el botón
- **WHEN** el texto de un botón ocupa varias líneas en móvil
- **THEN** el icono mantiene su tamaño y no se estira ni se deforma

#### Scenario: Sin movimiento añadido
- **WHEN** se revisan las transiciones del sitio
- **THEN** ninguna depende de la presencia del icono y no hay animaciones nuevas

### Requirement: Consistencia entre HTML escrito a mano y generadores
Los iconos emitidos por `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` SHALL coincidir con los de las páginas escritas a mano en la misma familia, grosor de trazo y color. Las fichas de curso SHALL regenerarse desde el generador y SHALL NOT editarse a mano, y una regeneración con el generador actualizado SHALL producir fichas equivalentes salvo por los iconos añadidos.

#### Scenario: Ficha regenerada sin edition manual
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** las 8 fichas quedan con icono en sus botones y ningún `cursos/*/index.html` se modifica a mano

#### Scenario: Coherencia entre páginas
- **WHEN** se compara el icono de "Aula Virtual" de una ficha con el de una página de servicio
- **THEN** ambos son el mismo birrete con el mismo estilo de trazo