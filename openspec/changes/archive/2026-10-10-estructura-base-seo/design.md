# Design

## Context

El sitio es HTML estático sin paso de build. Cada página tiene su `<head>` escrito a mano, salvo las 8 fichas de curso, que se generan con `tools/generar-fichas.mjs` (ver STRUCTURE.md: regenerar sobrescribe las fichas). Los datos de los cursos viven en `assets/js/cursos-data.js` para el listado y dentro del propio generador para las fichas. Ninguna página HTML, CSS ni JS referencia `FOTOS-(1)/` ni `pagina web.pdf`; sólo aparecen en documentación y en comentarios de código. Motivación en `proposal.md` y comportamiento exigible en `specs/seo-base/spec.md`.

## Goals / Non-Goals

**Goals:**
- Cumplir los requisitos de `specs/seo-base/spec.md` sin cambiar el contenido visible ni el diseño.
- Mantener el sitio sin dependencias ni build nuevos.
- Que una regeneración de fichas no pierda la base de SEO.

**Non-Goals:**
- No se añaden `hreflang`, `meta keywords`, `og:image` nuevas ni cambios de copy.
- No se implementa un generador automático de `sitemap.xml`. Son 13 URLs y cambian poco.
- No se configura el servidor ni el hosting (redirecciones, cabeceras, exclusión de `_archivo/`).

## Decisions

**1. `sitemap.xml` y `robots.txt` como archivos estáticos escritos a mano en la raíz.**
Alternativa: generarlos desde `tools/generar-fichas.mjs`. Se descarta porque añade lógica para 13 URLs y acopla el sitemap al generador de fichas, que sólo cubre cursos.

**2. Canonical y `og:url` escritos directamente en el `<head>` de cada página.**
Alternativa: inyectarlos con JavaScript. Se descarta porque los rastreadores pueden no ejecutar JS de forma fiable y el canonical debe estar en el HTML inicial.

**3. JSON-LD inline (`<script type="application/ld+json">`) en el `<head>`.**
- `Organization` sólo en `index.html`, porque describe a la empresa una vez.
- `Course` en cada ficha. Se genera desde el mismo objeto de datos que ya usa el generador, para que el precio, las horas y la descripción no se dupliquen a mano.

**4. Mover `FOTOS-(1)/` y `pagina web.pdf` a `_archivo/` con `mv`, sin borrar.**
Se verifica con `ls` antes y después. Se conserva el material fuente y el cambio es reversible.
Alternativa: excluirlos sólo en el despliegue. Se descarta porque el usuario eligió moverlos; la exclusión del hosting queda como pregunta abierta.

**5. Referencias documentales actualizadas en la misma tarea de movimiento.**
Se corrigen `README.md`, `STRUCTURE.md`, el comentario de `assets/js/cursos-data.js` y el de `tools/generar-fichas.mjs`. Los changes archivados no se tocan, porque son registro histórico.

**6. Fichas: el cambio se hace en `tools/generar-fichas.mjs` y se regeneran, no se editan a mano.**
STRUCTURE.md advierte que editar una ficha y regenerar pierde el cambio. Se edita el generador y luego se ejecuta `node tools/generar-fichas.mjs` una vez. La página Cursos (`cursos/index.html`) no genera fichas; sólo recibe canonical y `og:url`.

## Risks / Trade-offs

- **[Regeneración sobrescribe cambios manuales]** → Antes de regenerar se copian las 8 fichas actuales (el proyecto no usa git) y, después, se compara que sólo cambie el `<head>`.
- **[Datos de curso duplicados entre `cursos-data.js` y el generador]** → No se unifican en este cambio para no tocar la estructura de datos. Se verifica en la tarea de JSON-LD que precios y horas coinciden con la especificación.
- **[Referencias rotas a `pagina web.pdf` o `FOTOS-(1)`]** → Búsqueda con `grep` antes y después del movimiento; cero coincidencias en HTML, CSS y JS.
- **[Canonical incorrecto si el dominio cambia]** → El dominio queda en un solo lugar por página. Riesgo aceptado.
- **[`_archivo/` se publica con el sitio]** → Ver pregunta abierta.

## Migration Plan

1. Crear `sitemap.xml` y `robots.txt`.
2. Añadir canonical, `og:url` y JSON-LD `Organization` en Inicio; canonical y `og:url` en Nosotros, Servicios, Noticias y Cursos.
3. Editar `tools/generar-fichas.mjs`, regenerar las 8 fichas y verificar.
4. Mover `FOTOS-(1)/` y `pagina web.pdf` a `_archivo/`, actualizar referencias documentales.
5. Validar y revisar.

**Rollback:** `_archivo/` puede devolverse a su ubicación original con `mv`. Los cambios de `<head>` se revierten con el historial del repositorio (el proyecto no es git, así que se recomienda copiar `assets/` y las páginas antes de empezar; ver tareas).

## Open Questions

- ¿El hosting publica toda la carpeta del repositorio? Si es así, `_archivo/` quedaría accesible públicamente. Hay que decidir si se excluye en el despliegue o si el material se mueve fuera del repositorio. Esto no cambia las specs ni las tareas de este cambio; sólo afecta a la configuración del despliegue.
