# Tasks

## 1. Preparación

- [ ] 1.1 Confirmar con `git status` que el árbol está limpio antes de empezar, y que `sitemap.xml` sigue teniendo 18 entradas `<url><loc>` que corresponden a los 18 archivos `index.html` del sitio. Ese contraste es el que se va a reutilizar en cada paso, y si ya fallara hay que saberlo antes de escribir nada
- [ ] 1.2 Anotar en un archivo temporal la lista de las 18 rutas tal como las devuelve el sitemap, con su `<h1>` y su meta description, que es el material con el que se redactan las descripciones de los enlaces. Verificar que las 18 tienen `<h1>` y meta description, porque una página sin las dos impediría escribir una descripción fiable

## 2. El archivo `llms.txt`

- [ ] 2.1 Crear `llms.txt` en la raíz con la estructura del estándar llmstxt.org v2: H1 con el nombre de la empresa, blockquote con un resumen de una o dos líneas, un párrafo corto de contexto, y después las secciones H2. Verificar que el H1 es el único H1 del archivo y que el blockquote empieza por `>`
- [ ] 2.2 Redactar la sección `## Servicios` con los 4 servicios de consultoría y sus 4 páginas de detalle, y la sección `## Cursos` con el listado y las 8 fichas, tomando cada título y cada descripción de los `<h1>` y las meta description reales anotados en la tarea 1.2. Ninguna descripción puede ser promocional: debe decir qué hay en esa página
- [ ] 2.3 Redactar `## Información` con Inicio, Nosotros, Noticias y la página pilar de inocuidad alimentaria, y `## Optional` con lo secundario que un agente puede saltarse, y comprobar que **cada una de las 18 páginas aparece exactamente una vez** en el archivo, sin duplicados y sin omitir ninguna
- [ ] 2.4 Comprobar con un script que extraiga todas las URLs de `llms.txt` y las compare como conjuntos contra las de `sitemap.xml`: deben coincidir exactamente, sin URLs que no existan ni páginas sin listar. Verificar también que todas son absolutas, empiezan por `https://proinocuidad.com` y terminan en `/`

## 3. El archivo `llms-full.txt`

- [ ] 3.1 Crear `llms-full.txt` en la raíz con el contenido en Markdown de las páginas clave: la descripción de la empresa tomada de la sección Nosotros del Home, los 4 servicios y los 8 cursos con su título, su descripción y sus datos de duración, modalidad, certificación e inversión. Todo copiado de las páginas reales, sin redactar de memoria
- [ ] 3.2 Limpiar el contenido de navegación, llamadas a la acción y datos de contacto repetidos, de modo que el archivo no repita el menú, los botones de WhatsApp ni el pie en cada sección. Verificar con `grep` que no aparecen cadenas como "Conócenos", "Ver cursos", "Solicitar asesoría" ni el pie del footer
- [ ] 3.3 Comprobar que cada sección de `llms-full.txt` indica a qué página del sitio corresponde su contenido, y que los datos de contacto aparecen una sola vez y solo en la sección que los agrupa

## 4. Corrección del desfase de "13 páginas"

- [ ] 4.1 En el requisito "Mapa del sitio" de `openspec/specs/seo-base/spec.md`, cambiar las dos apariciones de 13 por 18: la del texto del requisito y la del escenario "Sitemap accesible", que hoy exige "13 entradas `<url><loc>`" cuando el archivo tiene 18 y por eso la spec se contradice consigo misma. Verificar con `grep` que no queda ningún 13 en ese requisito y que el recuento de `<loc>` del sitemap sigue siendo 18
- [ ] 4.2 En el requisito "Auditoría responsive" de `openspec/specs/diseno-responsive/spec.md`, cambiar "las 13 páginas" por "las 18 páginas", conservando el resto del requisito y sus dos escenarios intactos. Verificar que el cambio es de una sola línea
- [ ] 4.3 Comprobar con `grep -rn "13 páginas\|13 entradas"` en `openspec/specs/` que no queda ninguna aparición del número obsoleto, y con `openspec validate --specs` que ninguna spec nueva ha empeorado

## 5. Verificación conjunta

- [ ] 5.1 Servir el sitio con `python3 -m http.server 8899 --bind 127.0.0.1` desde la raíz y comprobar con `curl` que `llms.txt` y `llms-full.txt` responden 200 y que su `Content-Type` no obliga a descargar
- [ ] 5.2 Comprobar que los dos archivos son texto plano válido, sin BOM, y que `llms.txt` conserva el orden de secciones que exige el estándar: H1, blockquote, párrafos sin encabezados y después las secciones H2
- [ ] 5.3 Verificar que **ninguna de las 18 páginas se ha modificado** con `git status --short`, para confirmar que el cambio no toca el contenido del sitio y que el requisito "Contenido sin cambios" de la spec `diseno-responsive` se respeta
- [ ] 5.4 Releer `llms.txt` como lo leería un agente y comprobar que con ese archivo solo se puede responder qué hace la empresa, qué servicios ofrece, qué cursos tiene y cómo contactar, sin abrir ninguna página

## 6. Documentación

- [ ] 6.1 Registrar el cambio en `CHANGELOG.md` indicando que se añaden `llms.txt` y `llms-full.txt` con el motivo, que el formato sigue la versión 2 del estándar, y sobre todo que **añadir una página nueva obliga a actualizar `llms.txt`**, que es el riesgo principal de un archivo escrito a mano
- [ ] 6.2 Anotar en `STRUCTURE.md` que la raíz publica tres archivos para rastreadores, `robots.txt`, `sitemap.xml` y `llms.txt` más `llms-full.txt`, junto con quién los mantiene y cuándo hay que tocarlos
- [ ] 6.3 Añadir a `AGENTS.md`, en la sección de datos que se repiten, una nota de que `llms.txt` tiene que contrastarse con `sitemap.xml` cuando se añada o retire una página

## Workflow follow-up

- Archivar el change y sincronizar `seo-base` y `diseno-responsive` cuando el dueño lo revise.
- **Pendiente de la publicación, no de este change**: pedir `https://proinocuidad.com/llms.txt` a un asistente y comprobar que responde preguntas sobre cursos y servicios sin abrir las páginas HTML. Mientras el sitio no esté publicado en `proinocuidad.com` esto no se puede probar, porque el dominio sigue sirviendo el WordPress viejo. Si el asistente se pierde con el archivo, significa que `llms.txt` necesita más detalle y no menos.
- Opcional, en un change aparte si algún día se nota falta de detalle en los agentes: publicar versiones `.md` de las páginas con `rel="alternate"`, que es lo que recomienda el estándar v2, pero que aquí se resolvió con `llms-full.txt`.