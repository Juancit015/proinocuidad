# Navegacion global (delta)

## Purpose

Mantener el botón "Ver todos" de los submenús en azul marino también al pasar el cursor, con la flecha visible y un desplazamiento leve.

## MODIFIED Requirements

### Requirement: Mega-menú al hover
Al colocar el puntero sobre un elemento que tiene submenús, la barra de navegación SHALL desplegar una ventana flotante con los subenuncios agrupados (título breve del grupo y descripción corta opcional por ítem), igual al patrón referencial indicado por el dueño del proyecto. Los submenús "Servicios" y "Cursos" SHALL mostrar sus ítems en una grilla de 2 columnas dentro de un panel de 460px de ancho con padding de 10px. Cada ítem SHALL tener un ícono SVG de 24px dentro de un cuadro de 44px. Los 4 ítems de cada panel SHALL tener el mismo tamaño. El enlace "Ver todos los servicios" o "Ver todos los cursos" SHALL ocupar todo el ancho del panel. Al pasar el cursor sobre ese enlace, el fondo SHALL oscurecerse a `#0b1257` sin usar rojo, y la flecha SHALL mantenerse visible junto al texto, centrada en el botón (color blanco, opacidad 1, 16px, trazo grueso) y desplazarse 4px a la derecha al pasar el cursor.

#### Scenario: Hover en Servicios
- **WHEN** el usuario coloca el puntero sobre "Servicios"
- **THEN** se despliega un panel con los 4 servicios (Capacitación Empresarial, Implementación de normativa sanitaria, Sistemas de gestión, Registro sanitario) que enlazan a la página de Servicios

#### Scenario: Hover en Cursos
- **WHEN** el usuario coloca el puntero sobre "Cursos"
- **THEN** se despliega un panel con los 4 cursos destacados (Diplomado SGCIA, Legislación Sanitaria de Alimentos, HACCP: certificación en Perú y Auditor Interno del Sistema HACCP) con sus enlaces a las fichas

#### Scenario: Salida del panel
- **WHEN** el puntero abandona el elemento y el panel desplegado
- **THEN** el panel desaparece

#### Scenario: Ítems uniformes
- **WHEN** el usuario despliega cualquiera de los dos submenús
- **THEN** los 4 ítems tienen el mismo tamaño y cada uno muestra su ícono dentro de un cuadro de 44px

#### Scenario: Botón Ver todos con hover azul
- **WHEN** el usuario pasa el cursor sobre "Ver todos los servicios" o "Ver todos los cursos"
- **THEN** el fondo cambia a `#0b1257` (no rojo), la flecha "→" permanece visible y se desplaza 4px a la derecha

#### Scenario: Móvil
- **WHEN** el usuario ve el menú en una pantalla de 860px o menos
- **THEN** los ítems de cada submenú se muestran en una sola columna
