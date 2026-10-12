# Tasks

## 1. Respaldo e inventario

- [x] 1.1 Copiar `assets/css/main.css`, las 5 páginas manuales, una ficha de muestra, `tools/generar-fichas.mjs` y `CHANGELOG.md` a `/tmp/opencode/respaldo-flotantes/`; verificar con `ls -R /tmp/opencode/respaldo-flotantes/`.
- [x] 1.2 Confirmar los 14 bloques `.flotante-whatsapp` (13 páginas + plantilla) con `grep -rn 'flotante-whatsapp' --include='*.html' --include='*.mjs' . | wc -l` y que todos usan el mismo `href` y el carácter "✆".

## 2. CSS estilo Crecepe a la izquierda

- [x] 2.1 Redefinir `.flotante-whatsapp` (58 px, `left: 26px`, fondo `--whatsapp`, sombra verde `0 8px 26px rgba(37,211,102,0.45)`, icono SVG 30 px, hover con escala) y añadir `.to-top-proi` (48 px, `left: 30px; bottom: 96px`, fondo `--azul`, flecha 20 px, hover `scale(1.1)`); verificar con `grep -n "flotante-whatsapp\|to-top-proi" assets/css/main.css` y llaves balanceadas.
- [x] 2.2 Confirmar que no se añade ni modifica ningún JS (`grep -rn 'to-top\|flotante' assets/js/` vacío) y que el resto del CSS no cambia (`diff` contra respaldo salvo el bloque de flotantes).

## 3. HTML en las 5 páginas manuales

- [x] 3.1 En `index.html`, sustituir el "✆" por el SVG de WhatsApp (mismo path del footer) y añadir el ancla `.to-top-proi` con `href="#"` y `aria-label="Volver arriba"`; verificar con `grep -n 'flotante-whatsapp\|to-top-proi' index.html`.
- [x] 3.2 Replicar ambos bloques en `servicios/`, `nosotros/`, `noticias/` y `cursos/index.html`; verificar con `diff` de los bloques entre páginas y conteo de 10 bloques nuevos en total (5 + 5).

## 4. Fichas vía plantilla

- [x] 4.1 Aplicar ambos bloques en `tools/generar-fichas.mjs` y regenerar las 8 fichas; verificar con `diff` de una ficha contra su respaldo que solo cambian esos bloques.
- [x] 4.2 Confirmar 14 `.flotante-whatsapp` con SVG y 14 `.to-top-proi` con `href="#"` en todo el sitio; verificar con `grep -rn -c` por archivo.

## 5. Verificación y documentación

- [ ] 5.1 Revisar en navegador desktop y móvil (360 px) que ambos botones quedan a la izquierda sin tapar contenido, el WhatsApp abre el chat y el subir vuelve arriba; verificar por observación.
- [x] 5.2 Añadir entrada en `CHANGELOG.md` (botones flotantes estilo Crecepe a la izquierda, sin JS, sin cambios SEO); verificar con `grep -n "^## 2026" CHANGELOG.md`.

## 6. Subir a la derecha con aparición por scroll (pedido del usuario)

Sustituye lo verificado en 2.1/2.2 sobre posición izquierda y ausencia de JS, por instrucción explícita del usuario. El HTML no cambia.

- [x] 6.1 En `main.css`, mover `.to-top-proi` a la derecha (`right: 26px; bottom: 96px`; 18/82 px en móvil), oculto por defecto y visible con `.is-visible`; verificar con `grep -n "to-top-proi" assets/css/main.css` y llaves balanceadas.
- [x] 6.2 En `assets/js/main.js`, alternar `.is-visible` con `scrollY > 400` (listener `passive`, chequeo inicial); verificar con `node --check assets/js/main.js` y que las 13 páginas cargan `main.js`.
- [x] 6.3 Actualizar el CHANGELOG con la nueva posición y el comportamiento; verificar con `grep -n "^## 2026" CHANGELOG.md`.
- [x] 6.4 Bajar `.to-top-proi` a `bottom: 26px` (misma altura que el WhatsApp, sin choque por estar en lados opuestos); verificar con `grep -n "to-top-proi" assets/css/main.css`.
