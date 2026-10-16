# Contacto por WhatsApp

## Purpose

Definir cómo el sitio de Proinocuidad inicia la conversación en WhatsApp: qué mensaje prellenado lleva cada enlace según dónde se presionó, y la regla de que ningún enlace del sitio abre el chat vacío. Sirve para que el asesor reciba de entrada la intención y el contexto de la consulta, y para que el mismo botón se comporte igual en todas las páginas.

## Requirements

### Requirement: Ningún enlace abre el chat vacío
Todo enlace del sitio que lleve a WhatsApp SHALL incluir un mensaje prellenado en su parámetro `text`, de modo que el usuario encuentre el mensaje ya escrito al abrir la conversación. El número SHALL seguir siendo `+51 981 365 982` en todos los enlaces y el texto visible del botón SHALL permanecer sin cambios.

#### Scenario: Botón de consulta
- **WHEN** el usuario presiona cualquier botón de consulta de WhatsApp del sitio
- **THEN** el chat se abre con un mensaje ya escrito, no vacío

#### Scenario: Botón de un servicio
- **WHEN** el usuario presiona "Solicitar asesoría" en la página de un servicio
- **THEN** el mensaje escrito menciona ese servicio concreto

#### Scenario: Botón del home
- **WHEN** el usuario presiona "Consultar por WhatsApp" en el home
- **THEN** el mensaje escrito presenta a Proinocuidad y pide información de sus cursos y servicios

### Requirement: Mensaje según el contexto del enlace
El mensaje SHALL corresponder a la intención del enlace: el contacto directo en las redes y el teléfono SHALL presentar un contacto neutro; el botón flotante global SHALL presentar el sitio y pedir información de cursos y servicios; los botones de asesoría SHALL pedir asesoría e identificar el servicio o programa; y los enlaces de cada tarjeta y ficha de curso SHALL nombrar el curso. El mensaje del botón flotante SHALL ser el mismo en todas las páginas del sitio.

#### Scenario: Contacto directo sin intención comercial
- **WHEN** el usuario presiona el número de WhatsApp del teléfono de la barra superior o del pie
- **THEN** el mensaje solo se presenta y pide comunicación, sin pedir información de ningún curso

#### Scenario: Botón flotante igual en todo el sitio
- **WHEN** se comparan los botones flotantes de todas las páginas
- **THEN** los 18 llevan el mismo mensaje, porque el flotante es global y su texto no depende de la página

#### Scenario: La ficha nombra su curso
- **WHEN** el usuario presiona el botón de WhatsApp de una ficha de curso
- **THEN** el mensaje escrito incluye el nombre de ese curso

### Requirement: Coherencia entre listados y fichas
La tarjeta de un curso SHALL llevar el mismo mensaje en el listado de cursos, en la sección de cursos destacados del home y en su propia ficha. El sitio SHALL NOT mostrar un mensaje vacío en el listado y uno con el nombre del curso en la ficha.

#### Scenario: Mismo curso, mismo mensaje en las tres vistas
- **WHEN** se compara el botón de WhatsApp de un curso en el home, en `cursos/index.html` y en su ficha
- **THEN** los tres nombres el mismo curso con la misma fórmula de saludo

#### Scenario: Tarjeta de curso en el listado
- **WHEN** el usuario presiona "WhatsApp" en una tarjeta del listado de cursos
- **THEN** el mensaje escrito nombra el curso de esa tarjeta, no uno genérico

### Requirement: Codificación del mensaje
El mensaje SHALL ir codificado para poder transportarse dentro de la URL, de modo que acentos, signos y espacios se decodifiquen correctamente al abrir el chat y el enlace no se rompa. El mensaje SHALL preservar el saludo en español y terminar en un punto o ser una frase completa.

#### Scenario: Acentos y paréntesis
- **WHEN** el curso o el servicio del mensaje lleva acentos, comillas o paréntesis
- **THEN** el texto aparece legible y completo en el chat, sin caracteres rotos ni enlaces truncados

#### Scenario: Mensaje completo
- **WHEN** se revisa el texto de cualquier enlace del sitio
- **THEN** es una frase completa en español que no termina a mitad

### Requirement: Conservación del resto del enlace
El mensaje SHALL ser el único cambio en los enlaces: el número, el texto visible del botón, su icono, color, tamaño, posición, `target` y `rel` SHALL permanecer iguales. El sitio SHALL NOT añadir JavaScript para componer el mensaje ni depender de él.

#### Scenario: Botón sin cambios visuales
- **WHEN** se revisa un botón de WhatsApp antes y después del cambio
- **THEN** se ve idéntico y solo difiere el parámetro del enlace

#### Scenario: El sitio funciona sin JavaScript
- **WHEN** el usuario navega con JavaScript deshabilitado y presiona un enlace de WhatsApp
- **THEN** el mensaje se abre igualmente, porque viaja en el propio enlace

#### Scenario: Enlaces generados y escritos a mano iguales
- **WHEN** se revisa un enlace de un botón flotante en una ficha generada y en una página escrita a mano
- **THEN** llevan el mismo mensaje y la misma codificación
