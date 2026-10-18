# Design

## Context

Ver `proposal.md` para el porqué. Esto es lo que condiciona el enfoque.

El generador `tools/generar-fichas.mjs` produce hoy las 8 fichas de curso. Su plantilla de navegación tiene **`../../` escrito a mano en veinte sitios distintos**: el logo, la hoja de estilos, el script y cada enlace del menú. Funciona porque toda ficha vive a dos niveles: `cursos/<slug>/index.html`.

El 404 vive en la raíz. Su profundidad es cero. **Las rutas de la plantilla no se pueden reutilizar tal cual.**

Ese prefijo es el único obstáculo técnico real de este cambio, y parece pequeño pero no lo es: el mismo `../../` aparece en la cabecera, en el pie y dentro de los enlaces de los dos desplegables del menú. Un fallo aquí rompe las ocho fichas y produce enlaces rotos en páginas que hoy funcionan perfectamente.

Lo segundo que condiciona el enfoque: **no existe ninguna configuración de servidor en el repositorio**. No hay `.htaccess`, ni `netlify.toml`, ni `vercel.json`, ni `_headers`. El repositorio no dice nada sobre cómo se sirve el sitio.

## Goals / Non-Goals

**Goals:**

- Que el 404 se vea como una página más del sitio, con la misma cabecera, menú y pie.
- Que los cambios futuros de navegación lleguen al 404 sin tocarlo a mano.
- Que el generador siga produciendo las 8 fichas exactamente igual.
- No añadir CSS.

**Non-Goals:**

- **No decidir cómo se sirve el 404.** Eso depende del hosting, que todavía no está elegido porque el sitio no está publicado. Se deja escrito como requisito de publicación, no como trabajo de código.
- **No meter el 404 en `sitemap.xml` ni en `robots.txt`.** Decidido: `noindex` basta y un sitemap es para URLs indexables.
- **No tocar la especificación `seo-base`.** El change `llms-para-agentes` sigue activo y ya está modificando el requisito "Mapa del sitio" de esa capability. Si este change lo tocara también, dos changes en activo editarían el mismo bloque y el orden de sincronización empezaría a importar.
- **No añadir el 404 al menú.** No es una página a la que se navegue.
- **No diseñar la pantalla.** Se reutilizan `.hero`, `.container` y `.btn` tal cual están.

## Decisions

### 1. El prefijo de ruta pasa a ser un parámetro de la plantilla

Hoy la navegación se construye con `../../` incrustado. La opción mínima sería copiar la plantilla entera y buscar-reemplazar para el 404, dejando dos bloques de navegación que se desincronizan en cuanto alguien añada un enlace.

La opción elegida es que la plantilla reciba un prefijo. Las fichas pasan `"../../"` y el 404 pasa `""`. Con eso hay **una sola fuente de la navegación**, que es exactamente el motivo por el que las fichas se generan en lugar de escribirse a mano.

La alternativa descartada es la de duplicar y reemplazar: es menos código hoy y garantiza que el próximo cambio de menú deja el 404 con la navegación vieja, que es el fallo que este repositorio ya sufrió una vez con las fichas.

### 2. La comprobación de que las fichas no cambian es obligatoria, no opcional

Cambiar el prefijo toca la plantilla que genera las ocho fichas. Es el punto donde este cambio puede romper algo que hoy funciona.

Por eso la verificación no es "abrir las fichas y mirar que están bien", sino objetiva: ejecutar el generador y comprobar que **`git status` no muestra ninguna modificación bajo `cursos/`**. Si el prefijo está mal calculado, esa comprobación salta en el segundo, sin depender de que alguien abra ocho páginas.

### 3. El 404 lleva canonical aunque no sirva para nada

`seo-base` exige que "cada página HTML del sitio" declare `rel="canonical"`. El 404 es una página HTML del sitio, así que la lectura literal de ese requisito lo incluye.

Declarar un canonical hacia sí mismo es inocuo: con `noindex` los buscadores ni la miran. La alternativa era declarar que el 404 es una excepción a `seo-base` y eso obligaba a modificar la especificación, que es justo lo que este change quiere evitar. Se resuelve siguiendo la especificación al pie de la letra y anotando la rareza aquí.

### 4. `noindex, follow` y no `noindex, nofollow`

El `follow` sí tiene sentido en un 404: la página contiene enlaces a Inicio y Contacto, y no tiene sentido que un rastreador que la encuentre Ignore esos enlaces. La página no se indexa, pero lo que enlaza sí se sigue.

### 5. Sin CSS nuevo

Existen `.hero`, `.container`, `.btn`, `.btn-azul`, `.btn-blanco` y `.section-head`. La pantalla del 404 es un mensaje y dos botones: no hay nada que justifies una regla nueva, y añadirla sería deuda que nadie pidió.

## Risks / Trade-offs

- **[El prefijo mal calculado rompe las ocho fichas]** → Es el riesgo principal. Se cubre con la comprobación objetiva de `git status` sobre `cursos/`, que está en las tareas y en la especificación como escenario, no como nota.

- **[El archivo existe en el repositorio y nunca se sirve]** → El riesgo más probable a largo plazo, porque es silencioso: no da error, simplemente nadie ve la página. En un servidor sin configurar, un `404.html` no se sirve solo.Netlify, GitHub Pages y Cloudflare Pages sí lo hacen por convención; un nginx o Apache sin configuración, no. Queda como comprobación obligatoria en el momento de publicar, junto con las otras cosas que morirán al publicar.

- **[El 404 se añade por costumbre a algún `sitemap.xml` de una actualización futura]** → Se corta en la especificación con un escenario que cuenta las entradas del mapa antes y después. Es un cambio pequeño en un archivo que alguien va a editar pronto, que es exactamente cuando se cuela una línea de más.

- **[El 404 se enlaza desde el menú por "completar" las páginas]** → Es lo que pasó con la columna fantasma de la hoja de certificados: alguien rellena un hueco porque se ve raro. Se corta con un escenario explícito que comprueba que ningún destino del menú apunta al propio 404.