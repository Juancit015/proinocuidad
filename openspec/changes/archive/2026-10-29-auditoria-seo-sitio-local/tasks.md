# Tasks

## 1. Preparación y control de créditos

- [x] 1.1 Comprobar que `http://127.0.0.1:8899/` responde y arrancar el servidor desde la raíz del repositorio si no responde; verificar con `curl -I` que devuelve 200 en la home
- [x] 1.2 Localizar en el catálogo del MCP de SE Ranking las herramientas de keywords, preguntas, SERP y datos de SERP; verificar que `informe.md` tiene una fila por capacidad con "disponible" o "no disponible"
- [x] 1.3 Crear `informe.md` con la rúbrica de puntajes, la declaración de alcance y el anexo de créditos vacío; verificar que el archivo existe y que `openspec validate auditoria-seo-sitio-local --strict` pasa

## 2. Referencia antes de cambiar nada

- [x] 2.1 Leer `sitemap.xml` y `robots.txt` del repositorio y registrar las 18 URLs con su mapeo a `127.0.0.1:8899`; verificar que el informe tiene 18 filas
- [x] 2.2 Para cada URL, registrar title, meta description, H1-H3, canonical, `og:url`, indexabilidad y el `@type` de cada JSON-LD; verificar que hay una fila por URL con esos campos
- [x] 2.3 Para cada URL, registrar alt de imágenes, enlaces internos y CTA principal con Playwright sobre el DOM renderizado; verificar que el informe lista las imágenes sin alt
- [x] 2.4 Para cada URL, comparar el HTML crudo (`curl`) con el DOM renderizado; verificar que se marcan los textos y encabezados que solo aparecen con JavaScript
- [x] 2.5 Revisar `robots.txt` para los user-agents de IA conocidos y la presencia del contenido principal en el HTML crudo de las fichas; verificar que cada conclusión lleva `[Inferencia]` si SE Ranking no la confirma
- [x] 2.6 Capturar las 18 páginas a 1280 y 390 píxeles en `/tmp/opencode/antes/` y registrar el desborde horizontal de cada una; verificar que hay 36 capturas y 18 mediciones de desborde

## 3. Demanda de mercado en SE Ranking

- [x] 3.1 Consultar `DATA_getKeywordsMetrics` con source `pe` para las 14 semillas y sus variantes con "curso", "online", "precio", "certificado", "Perú", "Trujillo" y "La Libertad", en un único lote; verificar que cada keyword tiene volumen, dificultad, CPC e intención o queda marcada "sin dato"
- [x] 3.2 Obtener preguntas y long-tail de las semillas principales con `DATA_getKeywordQuestions` y `DATA_getSimilarKeywords`, limitadas a 50; verificar que la lista tiene hasta 25 preguntas y el número real queda en el informe
- [x] 3.3 Listar `DATA_getSerpTasks` y leer con `DATA_getSerpTaskResults` las tareas de las keywords prioritarias; verificar que cada keyword indica tipo de página, features y si el dominio del sitio aparece en el top orgánico
- [x] 3.4 Lanzar con `DATA_getSerpResults` solo las keywords prioritarias que no estén en la lista de 3.3; verificar que el anexo registra cada lanzamiento con su coste estimado

## 4. Cruce y hallazgos

- [x] 4.1 Construir la matriz keyword, volumen, dificultad, intención, URL del sitio local que debería atenderla, estado y acción; verificar que cada keyword prioritaria tiene una fila
- [x] 4.2 Marcar canibalizaciones entre URLs locales que compitan por la misma keyword principal, incluida la pareja `/` y `/inocuidad-alimentaria/`; verificar que cada caso indica la URL que debe conservarla
- [x] 4.3 Para cada pregunta, marcar si el sitio local la responde de forma visible y en qué elemento; verificar que cada una tiene estado y URL
- [x] 4.4 Redactar hasta 20 hallazgos priorizados por impacto y esfuerzo, cada uno con URL, evidencia, keyword, fuente y corrección exacta de title, H1, meta, FAQ, schema o enlace; verificar que no hay más de 20 filas y que cada una cita su fuente
- [x] 4.5 Separar los hallazgos que son solo texto de los que requieren CSS, JS, layout o páginas nuevas; verificar que los segundos aparecen como propuestas para otro change

## 5. Informe y puerta de aprobación

- [x] 5.1 Escribir el veredicto (sí, parcial o no) con tres razones y los puntajes de cobertura de keywords, intención, on-page y técnico; verificar que autoridad y visibilidad IA aparecen como "no evaluable"
- [x] 5.2 Redactar el plan en tres olas (7, 30 y 90 días) con cada acción ligada a un hallazgo; verificar que no hay acciones sueltas
- [x] 5.3 Completar el anexo con cada consulta al MCP, su herramienta y los créditos estimados, declarados como estimados; verificar que el total coincide con la suma de filas
- [x] 5.4 Verificar que cada afirmación del informe tiene `[MCP: ...]`, `[Sitio: ...]` o `[Inferencia]`; verificar que no hay cifras sin fuente
- [x] 5.5 Presentar a Juan la lista de correcciones aprobables, numerada, y esperar su respuesta; verificar que la respuesta indica qué hallazgos aprueba y cuáles quedan pendientes

## 6. Correcciones de texto (solo hallazgos aprobados)

- [x] 6.1 Editar title, meta description y H1-H3 de las páginas aprobadas en su HTML fuente, respetando 60 caracteres para el title y 120 a 160 para la meta; verificar con el script de metadatos que cada valor cumple el límite
- [x] 6.2 Para cada ficha de curso aprobada, editar el texto en `tools/generar-fichas.mjs` y regenerar; verificar que la regeneración termina con `exit 0` y `diff -rq` solo lista las fichas esperadas
- [x] 6.3 Añadir los bloques de preguntas frecuentes aprobados con sus H2 o H3, usando las clases existentes del sitio, y su JSON-LD `FAQPage` idéntico al texto visible; verificar con el script de schema que el número de preguntas visibles coincide con el del JSON-LD
- [x] 6.4 Ajustar enlaces internos aprobados; verificar que ningún enlace nuevo apunta a una URL inexistente en el sitemap ni a `127.0.0.1`
- [x] 6.5 Confirmar que `canonical`, `og:url` y el JSON-LD `Course` de las fichas no han cambiado; verificar con el script de metadatos antes y después

## 7. Verificación y registro

- [x] 7.1 Repetir la medición de la fase 2 sobre las páginas corregidas; verificar que la tabla antes y después del informe muestra solo cambios en los campos aprobados
- [x] 7.2 Capturar las páginas corregidas en `/tmp/opencode/despues/` a 1280 y 390 píxeles, comparar con `antes/` y revisar desborde horizontal; verificar que no hay desbordes y que las diferencias son solo texto
- [x] 7.3 Ejecutar `openspec validate auditoria-seo-sitio-local --strict`; verificar que pasa
- [x] 7.4 Añadir una entrada en `CHANGELOG.md` por cada grupo de correcciones aplicado, con la verificación hecha; verificar que la entrada cita el hallazgo y la keyword
- [x] 7.5 Comprobar con `git status` que el sitio solo cambió en los archivos aprobados y en `CHANGELOG.md`, y que `openspec/changes/auditoria-seo-sitio-local/` tiene el informe; verificar que no hay otros cambios

## Workflow follow-up

- No commitear ni hacer push sin confirmación expresa de Juan.
- Anotar en el informe que el efecto en posiciones solo se podrá medir después de publicar el sitio.
- Archivar el change tras la revisión de Juan con `/opsx-archive`.
