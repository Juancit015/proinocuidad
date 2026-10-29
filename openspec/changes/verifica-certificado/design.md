# Design

## Context

Segundo intento del feature. El primero (commits `89a5854`, `172e6bf`) se publicó roto — nav sin topbar completa, enlace en posición inconsistente, sin LinkedIn en la topbar de la página nueva al no está en el resto de páginas, icono del botón Aula faltante — y fue revertido en repo y servidor (sitio estable `df58f02`, ahora `8f34c6c` con la regla de deploy). El redo debe integrar la navegación completa desde la primera versión.

Fuente de datos validada: `/home/juan/Descargas/VERIFICA TU CERTIFICADO.xlsx` (Hoja1, 28 registros + cabecera): CÓDIGO, NOMBRES Y APELLIDOS, (col. 2 vacía), DNI/C.E., NOMBRE DEL PROGRAMA, FECHA DE INICIO, FECHA DE TÉRMINO, HORAS ACADÉMICAS, ESTADO, CERTIFICADO (URL de Drive de forma `/file/d/<id>/view?usp=sharing`). Los 28 registros tienen enlace.

Sitio: HTML+CSS+JS vanilla sin build (`assets/css/main.css`, `assets/js/main.js`); Plantilla replicable a mano; dos generadores (`generar-fichas.mjs` que emite fichas, 404 y —punto crítico— la nav y footer completos; `generar-listados.mjs` para tarjetas de cursos). breakpoints de nav en 860px, header sticky, protecciones hero y botones apilados documentadas en AGENTS.md. Despliegue por `tools/publicar.sh` con lista blanca;/push y deploy solo con consentimiento expreso (`8f34c6c`).

## Goals / Non-Goals

**Goals:**
- Página de verificación idéntica en cabecera/footter al resto del sitio desde su primera versión.
- Búsqueda instantánea (fetch DNI, capitalizado), con URL de Drive en pestaña nueva.
- Un único origen de datos (JSON generado) y un único generador probado.

**Non-Goals:**
- Backend, base de datos o API: la búsqueda es 100% client-side sobre JSON estático.
- Insignias automáticas, QR de verificación, y emisión de certificados (dependen del aula Moodle).
- Cambios al formulario de inscripción o al endpoint PHP.

## Decisions

1. **Stack** vanilla: fetch JSON + tarjeta de búsqueda 100% JS; sin framework. (Como en el primer intento, el único sitio con JS de ahí).
2. **Datos**: `assets/data/certificados.json` generado con `tools/generar-certificados.mjs` (leer `xlsx` del cache de bun — ya probado); campos: código, nombre, nombre_normalizado, dni_original, dni_normalizado, programa, fecha_inicio/termino (ISO), horas, estado, certificado_url. Sin un solo dato fuera de lo que ya es público en los certificados físicos.
3. **Normalización compartida**: DNI solo dígitos; nombre NFD sin diacríticos, minúsculas, espacios colapsados; mismo algoritmo en el generador y en la página para que "VÁLIDO " o "nelly" funcionen igual a "valido" ó Néli.
4. **Búsqueda**: SOLO la vía por credencial si la consulta entera es puramente numérica tras quitar espacios y puntos (subcadena en `dni_normalizado`, 6–15 dígitos garantizados por `validar()`); en cualquier otro caso, búsqueda de **nombre por tokens** (todas las palabras de ≥2 caracteres de la consulta dentro del nombre normalizado, cualquier orden — así "Marly Tuesta" encuentra "Marly Mavel Tuesta Tuesta") — sin vía híbrida: "34e" producía 3 fichas absurdas por el fragmento "34" dentro de los DNIs (detectado por Juan 2026-10-28) y de "marly 21525061" se espera no-encontrado. Submisiones vacías no buscan y devuelven el foco. Sin paginación (28 registros). **Mensaje general y corto** (2ª petición de Juan, 2026-10-28: antes una receta larga que él no quería): sin coincidencias, credencial fuera de rango y consulta alfanumérica muestran el mismo aviso: "Por favor, verifique que las credenciales ingresadas sean correctas."
5. **UI**: `page-head--verifica` estilo subpáginas (migas "Inicio / Verifica tu certificado" + h1 compacto con clamp igual al de las subpáginas + fondo `hero-cursos.avif`; el eyebrow `nombre-empresa` del hero anterior se retira, la descripción aprobada se conserva) + tarjeta de búsqueda centrada máx. 1002px (título del cuadro, input centrado y botón debajo, texto guía en `--rojo`, patrón TQI con paleta de marca); badge verde VÁLIDO; botón de descarga rojo `--rojo` con SVG de descarga. El h1 con claim aprobado ("Verifica tu certificado en Proinocuidad") se mantiene dentro del page-head compacto; la variante nueva debe incluirse en los 4 grupos CSS de los `page-head--*` (imagen/fixed-attachment, min-height/h1 en tablet, y los overrides de `background-attachment: scroll` móvil en 618 y 966) sin tocar textos (requisito "Contenido sin cambios" de `diseno-responsive`).
6. **Cabecera y footer idénticos**: la página usa el MISMO topbar con redes sociales (incluye LinkedIn), el MISMO orden del nav (…, Noticias, **Verifica tu certificado** (pedido de Juan: a la izquierda), **Aula Virtual** (btn con icono) al final) y el MISMO footer con cumplimiento de enlaces. Cualquier cambio del menú toca el generador.
7. **Rutas relativas**: `ruta=""` desde la raíz; en fichas `ruta="../.."` etc. (trampa de prefijos documentada).
8. **SEO/publicación**: sitemap/lms/llms-full con la URL; `publicar.sh` con la página y el JSON admitidos.
9. **Validación y límites (ronda de Juan, 2026-10-28)**: `maxlength="40"` en el input y validador JS: si la consulta es numérica pura (sin espacios/puntos), de 6 a 15 dígitos — la base real tiene DNI de 8 y C.E. de 10 (Colombia) y 15 —, con aviso rojo `.verifica-aviso` + foco, sin buscar. 6 en el borde inferior porque 5 dígitos no alcanza a ninguna credencial y evita búsquedas basura de 1-2 dígitos (p. ej. "215" matchearía medio archivo por subcadena).
10. **Feedback de búsqueda (mismo ronda)**: el botón marca `aria-busy="true"` y el **spinner es la bolita global del sitio** (`.btn[aria-busy="true"]::before` en `main.css`, ya usada por el form de inscripción) junto al texto "Buscando…", con `disabled` durante la consulta; minDuration 420 ms (render DESPUÉS del mínimo, no antes — así el botón nunca queda "Buscando…" con resultados ya visibles) y scroll posterior respetando `prefers-reduced-motion`. Se intentó spinner svg propio y salieron DOS círculos: el global llega solo. El aviso de fallo de carga se muestra apenas falla el fetch, no solo al buscar. El hint informativo del formulario es `--gris` (era rojo de una iteración previa en la que hacía de aviso; el aviso real es `.verifica-aviso`).
11. **Iconografía de UI**: SVG inline `stroke="currentColor"` (regla nueva en AGENTS.md): lupa en Buscar, icono por campo en fichas (persona/libro/calendario/reloj/carnet), check en el badge VÁLIDO, nada de emojis. Verificación por `getComputedStyle` (el primer intento CSS puso la clase gira en el botón y el JS la puso en el svg: no animaba nada).
12. **Canal único de avisos (3ª ronda de Juan, 2026-10-28)**: "no encontrado" y "fallo de carga" van al MISMO aviso `.verifica-aviso` rojo bajo el input (antes caja en la zona de resultados, que dejaba el footer pegado en una página corta); cada aviso reemplaza al anterior y vacía la zona (ningún mensaje persiste mezclado con otro); el scroll suave con `block: center` acompaña solo cuando hay fichas y no se dispara con mensajes; el error de carga se muestra también al fallar el fetch del preload, sin tener que buscar.

## Risks / Trade-offs

- **Nav inconsistente otra vez** (el fallo del primer intento): mitigado con diff de bytes tras generador y comparación Playwright de nav/footter contra una página existente.
- **Reutilización de la palabra clave subcadena en DNI**: con 28 registros el falso positivo es aceptable; la búsqueda por prefijo/fuzzy es overkill.
- **Excel cambia** (nuevos certificados): regenerar JSON manualmente; anotar en CHANGELOG. La página no degrada si JSON contiene otros estados ("INVALIDO", etc.) — el badge verde aplica solo a VÁLIDO.
- **Datos personales en JSON estático**: son los mismos datos que imprime el certificado público; se Publish igual que la URL pública de cada PDF de Drive.

## Plan de verificación

Playwright (`/tmp/opencode/verif`, chromium-1248, servidor `:8899`): sin scrollWidth desbordado a 360/390/768/860/1024/1280; búsqueda DNI real (21525061 → Lidia Taype), por apellido ("TUESTA"), sin resultados, vacío; botón de descarga con el href exacto del registro; nav/footter midpoints idénticos a los de `index.html`. Sin `--force` en nada; push y deploy solo con visto de Juan.
