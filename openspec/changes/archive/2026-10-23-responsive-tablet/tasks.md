# Tasks

## 1. Tarjetas en 2 columnas en tableta (560–860px)

- [x] 1.1 En `assets/css/main.css`, modificar `@media (max-width: 860px)` para que `.cards-grid` y `.cards-grid.four` usen `repeat(2, 1fr)` en lugar de `1fr` cuando el ancho sea ≥560px; mantener `1fr` por debajo de 560px; verificar con Playwright a 768px que las tarjetas se reparten en 2 columnas. Verificado: 768px → 2 cols; 390px → 1 col; 1024px → 4 cols.
- [x] 1.2 Verificar a 768px en `index.html` ("Nuestros servicios" y "Cursos destacados"), `servicios/index.html` y `cursos/index.html` que las tarjetas se ven en 2 columnas sin desbordamiento; capturar pantallas. Verificado: sin overflow horizontal en las 5 páginas a 683 y 768px; capturas en /tmp/opencode/verif/resp-shots/.

## 2. Footer apilado y centrado en tableta

- [x] 2.1 En `assets/css/main.css`, en el rango 560–860px, aplicar al `.footer-grid` el mismo apilado que en móvil (1 columna centrada) y centrar `.footer-bottom`; verificar a 768px que el footer se ve como en móvil. Verificado: footer-bottom flexDir=column, alignItems=center, textAlign=center a 768px.
- [x] 2.2 Verificar a 768px que el footer no tiene columnas horizontales estrechas y que el texto del `.footer-bottom` queda centrado. Verificado (capturas).

## 3. Bloque de contacto y sección Nosotros en tableta

- [x] 3.1 En el rango 560–860px, limitar `.cta-card` ("Solicita una asesoría") a 520px centrada y `.nota-card` a 640px; verificar a 683 y 768px. Verificado: cta-card 520px en 683 y 406px en 1024; nota-card 628px en 683 y 640px en 768; sin desborde de botones.
- [x] 3.2 Ajustar `.mvv-grid` para que en 560–860px use 2 columnas; verificar en `nosotros/index.html` a 768px. Verificado: mvv-grid = 2 cols a 768px.
- [x] 3.3 Ajustar la imagen de `.identidad-grid` en tableta (max-height razonable) para que no acapare la pantalla; verificar a 768px que el texto se lee sin scroll excesivo. Verificado: max-height 280px en 560–860; sin overflow.

## 4. Hero y giro de logos en tableta

- [x] 4.1 Ajustar la imagen del hero en el rango 560–860px (max-height/aspect-ratio) para que se adapte; verificar a 768px. Verificado: hero img max-height 280px en 560–860.
- [x] 4.2 Ajustar el giro de logos en tableta para que las imágenes no desborden; verificar a 768px. No aplica: no existe elemento `.giro` en el sitio (la búsqueda por "giro"/carrusel/marquee no devolvió resultados). El usuario probablemente se refería a la imagen del hero o de Nosotros, ya cubierta por 3.3/4.1.

## 5. Verificación visual global

- [x] 5.1 Levantar el servidor estático y revisar a 683×623 (y 768×1024) las páginas: `index.html`, `nosotros/index.html`, `servicios/index.html`, `cursos/index.html`, `contacto/index.html` (si existe) y una ficha de curso; capturar pantallas. Verificado: 5 páginas revisadas a 683 y 768, capturas en /tmp/opencode/verif/resp-shots/.
- [x] 5.2 Confirmar que no hay desplazamiento horizontal en ninguna página a 768px y que el texto/colores/enlaces no cambian (solo CSS). Verificado: 0 overflow horizontal en todas las páginas a 683 y 768; git diff solo toca CSS.
- [x] 5.3 Confirmar que `git status` solo muestra cambios en `assets/css/main.css` (y los artefactos del change); ninguna página HTML ni el generador se tocan. Verificado: git status --short = M assets/css/main.css + ?? openspec/changes/responsive-tablet/.

## Workflow follow-up

- Archivar el change tras la revisión y verificar el resultado archivado.