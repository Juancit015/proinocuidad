# Spec Delta

## Purpose

Define el contrato de la auditoría SEO del sitio local de Proinocuidad y de las correcciones de texto que Juan apruebe a partir de ella: qué se mide, qué se puede escribir y en qué orden, cómo se verifica cada cambio y cómo se controla el consumo de créditos del MCP de SE Ranking.

## ADDED Requirements

### Requirement: Escritura limitada por fase
La auditoría SHALL escribir solo el informe dentro de la carpeta del change. Las correcciones SHALL limitarse a texto de metadatos, encabezados, preguntas frecuentes, schema y enlaces internos, y SHALL NOT cambiar CSS, JS, layout, navegación ni cabecera.

#### Scenario: Auditoría sin escritura en el sitio
- **WHEN** termina la fase de auditoría y el informe no ha sido aprobado
- **THEN** los archivos HTML, CSS, JS, `sitemap.xml`, `robots.txt` y `llms.txt` del sitio tienen el mismo contenido que antes de empezar

#### Scenario: Cambio fuera de texto
- **WHEN** una corrección requiere modificar CSS, JS o la estructura visual de una página
- **THEN** esa corrección queda fuera de este change y se registra en el informe como propuesta para otro change

### Requirement: Aprobación antes de editar
El sitio SHALL NOT modificarse hasta que Juan apruebe, de forma explícita, la lista de correcciones del informe.

#### Scenario: Sin aprobación
- **WHEN** el informe está terminado pero Juan no ha respondido
- **THEN** no se edita ningún archivo del sitio y el informe queda como única salida

#### Scenario: Aprobación parcial
- **WHEN** Juan aprueba solo algunos hallazgos
- **THEN** solo se aplican esos hallazgos y los demás se listan como pendientes en el informe

### Requirement: Objeto de la auditoría
La auditoría SHALL medir únicamente el sitio local servido desde el repositorio. Los datos que dependen de `proinocuidad.com` como dominio público SHALL NOT usarse para el veredicto ni para los puntajes.

#### Scenario: Dominio público fuera de alcance
- **WHEN** la auditoría llega a la fase de datos de SE Ranking
- **THEN** no consulta auditoría del dominio, backlinks ni visibilidad IA de `proinocuidad.com`, y el informe lo declara como fuera de alcance

### Requirement: Evidencia citada
Cada afirmación del informe y cada corrección aplicada SHALL llevar una fuente con uno de estos formatos: `[MCP: herramienta]`, `[Sitio: URL]` o `[Inferencia]`. Una cifra sin fuente SHALL NOT aparecer en el informe.

#### Scenario: Cifra de mercado sin fuente
- **WHEN** el informe menciona un volumen de búsqueda, dificultad o CPC
- **THEN** la cifra va acompañada de `[MCP: herramienta]` con la herramienta que la devolvió

#### Scenario: Dato no disponible
- **WHEN** una herramienta del MCP no existe, o no devuelve el dato para una keyword
- **THEN** el informe lo declara como no disponible y no lo trata como cero

#### Scenario: Corrección trazable
- **WHEN** se aplica un cambio de título, H1, meta description o FAQ
- **THEN** el informe lo vincula al hallazgo que lo motiva, a la keyword y a su fuente

### Requirement: Medición del sitio local
La auditoría SHALL medir las páginas listadas en el `sitemap.xml` servido localmente, registrando por URL el title, la meta description, los encabezados H1 a H3, la canonical, el schema, los enlaces internos, el alt de las imágenes y el CTA principal.

#### Scenario: Cobertura de páginas
- **WHEN** la auditoría termina la medición del sitio local
- **THEN** ha revisado todas las URLs del sitemap servido en `127.0.0.1:8899`, con una fila por URL

#### Scenario: Contenido sin JavaScript
- **WHEN** se evalúa una página de curso o de servicio
- **THEN** el informe indica si su contenido principal aparece en el HTML sin ejecutar JavaScript

#### Scenario: Agentes de IA
- **WHEN** se evalúa la accesibilidad para agentes de IA
- **THEN** el informe indica si el contenido principal es rastreable en el HTML y si `robots.txt` bloquea algún agente conocido

### Requirement: Cruce con demanda de mercado
La auditoría SHALL asignar a cada keyword prioritaria una URL del sitio local que debería atenderla, con el estado cubierta, parcial, no cubierta o canibalizada.

#### Scenario: Keyword sin página
- **WHEN** una keyword prioritaria no tiene URL del sitio local que la atienda
- **THEN** el informe la marca como no cubierta y la registra como propuesta para un change aparte

#### Scenario: Canibalización
- **WHEN** dos URLs del sitio local compiten por la misma keyword principal
- **THEN** el informe marca la keyword como canibalizada e indica cuál URL debe conservarla

### Requirement: Preguntas de búsqueda
La auditoría SHALL listar hasta 25 preguntas de búsqueda con datos de SE Ranking y marcar si el sitio local las responde de forma visible, indicando el elemento donde aparece la respuesta.

#### Scenario: Menos preguntas con datos que las pedidas
- **WHEN** SE Ranking devuelve menos de 25 preguntas con datos para Perú
- **THEN** el informe lista las que existen, indica el número real y no rellena el resto con preguntas sin datos

### Requirement: Límites de seo-base en las correcciones
Las correcciones SHALL respetar los requisitos vigentes de `seo-base`: title de hasta 60 caracteres, meta description de 120 a 160, canonical y `og:url` sin cambios, y JSON-LD `Course` intacto en las fichas.

#### Scenario: Título fuera de límite
- **WHEN** una corrección propuesta supera 60 caracteres en el título
- **THEN** se reduce o se descarta antes de aplicarla

#### Scenario: Fichas regeneradas
- **WHEN** se corrige el texto de una ficha de curso
- **THEN** el cambio se hace en `tools/generar-fichas.mjs`, la regeneración termina con `exit 0` y `diff -rq` solo muestra las fichas esperadas

### Requirement: Verificación tras corregir
Cada corrección aplicada SHALL verificarse con la misma medición de la auditoría y con una comprobación visual en 1280 y 390 píxeles, y el informe SHALL incluir una tabla antes y después.

#### Scenario: Sin cambio de diseño
- **WHEN** termina la verificación de una página corregida
- **THEN** no hay desbordes horizontales y las capturas de antes y después coinciden salvo en el texto corregido

#### Scenario: Límite de la verificación
- **WHEN** el informe evalúa el efecto de una corrección en posiciones
- **THEN** declara que SE Ranking no puede medirlo hasta publicar el sitio y que la verificación es técnica

### Requirement: Puntajes y veredicto
El informe SHALL presentar un veredicto (sí, parcial o no) con tres razones y un puntaje de 0 a 100 para cada una de estas dimensiones: cobertura de keywords, intención, on-page y técnico. Las dimensiones de autoridad y visibilidad IA SHALL marcarse como no evaluables.

#### Scenario: Dimensión no evaluable
- **WHEN** una dimensión no tiene datos suficientes o depende de datos fuera de alcance
- **THEN** su puntaje se marca como no evaluable y no se rellena con un valor estimado

### Requirement: Hallazgos priorizados
El informe SHALL listar como máximo 20 hallazgos ordenados por impacto y esfuerzo. Cada hallazgo SHALL indicar URL, evidencia y la corrección exacta: title, H1, meta, FAQ, schema o enlace sugerido.

#### Scenario: Más de 20 problemas detectados
- **WHEN** la auditoría detecta más de 20 problemas
- **THEN** el informe conserva los 20 de mayor impacto y deja constancia del total detectado

### Requirement: Plan en tres olas
El informe SHALL incluir un plan de acciones en tres olas: 7 días, 30 días y 90 días. Cada acción SHALL referirse a un hallazgo o a una página del contenido faltante.

#### Scenario: Acción sin hallazgo
- **WHEN** una acción del plan no corresponde a ningún hallazgo ni a contenido faltante
- **THEN** se elimina del plan

### Requirement: Control de créditos
Antes de cada bloque de consultas al MCP de SE Ranking, la auditoría SHALL estimar sus llamadas, agruparlas, limitar los resultados a 50 como máximo y no repetir una consulta ya hecha. El anexo del informe SHALL listar las consultas y los créditos usados.

#### Scenario: Consulta repetida
- **WHEN** una consulta ya devolvió resultados en la misma auditoría o en las últimas 24 horas
- **THEN** se reutiliza su resultado en vez de lanzarla de nuevo

#### Scenario: Anexo de consumo
- **WHEN** el informe se da por terminado
- **THEN** su anexo lista cada consulta al MCP con su herramienta y los créditos estimados, y declara los créditos como estimados si el MCP no los devuelve
