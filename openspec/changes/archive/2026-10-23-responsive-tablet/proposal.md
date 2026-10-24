# Proposal

## Why

En el rango de tableta (≈560–860px, simulado a 683×623) el sitio se comporta como si fuera móvil en algunos puntos y como escritorio en otros, pero de forma inconsistente: las rejillas de tarjetas colapsan a una sola columna y las imágenes acaparan la pantalla, el footer mantiene dos columnas horizontales que se ven estrechas, el bloque de contacto queda demasiado ancho, y el texto del footer no se centra. El usuario percibe que "no es responsive". El motivo es que los breakpoints actuales (≤560 y ≤860) no tienen un estado intermedio pensado para tableta: saltan de 4 columnas a 1 sin pasar por 2.

## What Changes

- **Tarjetas (servicios, cursos, noticias, cursos destacados del Home):** en el rango 560–860px pasan de 1 columna a **2 columnas**, aprovechando el ancho disponible; por debajo de 560px siguen en 1 columna y por encima de 860px se mantiene la disposición actual.
- **Footer:** en el rango 560–860px se apila como en móvil (1 columna, centrado) en lugar de 2 columnas horizontales; el `.footer-bottom` se centra en ese rango.
- **Bloque "Listo para fortalecer la inocuidad" (`.nota-card`):** se ajusta el ancho/márgenes en tableta para que no ocupe toda la pantalla.
- **Sección Nosotros (`.identidad-grid`, `.mvv-grid`):** en tableta la imagen se limita a un alto razonable y las tarjetas de misión/valores pasan a 2 columnas; "asesoría sin compromiso" se mantiene como está (ya se ve bien).
- **Hero:** la imagen de personas se adapta (max-height/aspect-ratio) en tableta.
- **Giro (carrusel de logos):** la imagen se adapta para no desbordar.
- No se tocan textos, colores, enlaces ni datos de contacto (restricción de `diseno-responsive`).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `diseno-responsive`: se añaden/modifican requisitos para el rango tableta (560–860px): tarjetas en 2 columnas, footer apilado y centrado, bloque de contacto ajustado, imágenes adaptadas. Se mantiene la restricción de "contenido sin cambios".

## Impact

- `assets/css/main.css`: ajustes en media queries del rango 560–860px (cards-grid, footer-grid, footer-bottom, nota-card, identidad-grid, mvv-grid, hero img, giro).
- Posible ajuste en `index.html`/`nosotros/index.html`/`cursos/index.html` solo si hace falta markup (preferible solo CSS).
- Spec `openspec/specs/diseno-responsive/spec.md` (MODIFIED/ADDED requisitos para tableta).

## Assumptions

- El rango tableta objetivo es 560–860px (el usuario simuló 683×623). Por debajo de 560px se conserva el comportamiento móvil actual; por encima de 860px, el de escritorio.
- "Dos cards en izquierda y derecha" = 2 columnas iguales en el rango tableta para grids de tarjetas (servicios, cursos, noticias, cursos destacados).
- El footer en tableta se apila como en móvil (1 columna centrada), porque las 2 columnas horizontales se ven estrechas.
- "Asesoría sin compromiso" se deja intacta (el usuario la considera correcta).
- No se modifican textos, colores, enlaces ni datos de contacto.
- Alcance global: home + subpáginas que comparten footer/bloques (servicios, nosotros, cursos, contacto).