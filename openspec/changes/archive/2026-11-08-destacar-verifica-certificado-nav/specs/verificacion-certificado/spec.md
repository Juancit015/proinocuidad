# Spec Delta

## MODIFIED Requirements

### Requirement: Integración en la navegación global
Todas las páginas del sitio SHALL incluir el enlace "Verifica tu certificado" en el nav principal (junto a "Aula Virtual") y en el footer, incluidas las 8 fichas de curso y el 404 generados por `tools/generar-fichas.mjs`. En el nav principal el enlace SHALL mostrarse como un botón destacado (`.btn-verifica-nav`), con fondo rojo de marca y texto blanco, de forma comparable a `.btn-aula-nav` pero visualmente diferenciado, en escritorio y en el acordeón móvil.

#### Scenario: Enlace en páginas no generadas
- **WHEN** se revisa el nav y el footer de las páginas editables del sitio (inicio, nosotros, servicios, noticias, etc.)
- **THEN** ambas secciones contienen el enlace con la ruta relativa correcta según la profundidad de la página, y el nav lo muestra como botón rojo

#### Scenario: Enlace en fichas y 404 generados
- **WHEN** se ejecuta `node tools/generar-fichas.mjs` y se comparan los ficheros generados con lo editado a mano
- **THEN** el diff regenerado está vacío y el enlace usa los prefijos correctos (`ruta` a la raíz del sitio y `cursos` a la indexación de cursos), con la clase `.btn-verifica-nav`

#### Scenario: Listado documental consistente
- **WHEN** se comparan `sitemap.xml`, `llms.txt` y `llms-full.txt`
- **THEN** los tres listan la URL `https://proinocuidad.com/verifica-tu-certificado.html` y sus conjuntos de URLs son consistentes entre sí

#### Scenario: Publicación incluida en el despliegue
- **WHEN** se ejecuta `tools/publicar.sh`
- **THEN** `verifica-tu-certificado.html` y `assets/data/certificados.json` están en su lista blanca y se publican con el resto del sitio