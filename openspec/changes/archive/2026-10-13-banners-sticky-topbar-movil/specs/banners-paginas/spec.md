# Spec Delta

## Purpose

Definir la presentación de los banners de título de las subpáginas (imagen de fondo con efecto fijo en escritorio y alternativa estática en móvil y con movimiento reducido).

## ADDED Requirements

### Requirement: Fondo fijo en banners de subpágina
Los banners de título de subpágina (`.page-head--servicios`, `.page-head--nosotros`, `.page-head--noticias` y `.page-head--cursos`) SHALL mostrar su imagen de fondo con `background-attachment: fixed` cuando el ancho sea mayor a 860px, de modo que el fondo permanece fijo mientras el contenido se desplaza. El Hero de Inicio, las fichas de curso y las imágenes de contenido SHALL NOT recibir este efecto.

#### Scenario: banner fijo en escritorio
- **WHEN** el usuario abre Cursos, Servicios, Nosotros o Noticias con un ancho de 1024px o más y se desplaza
- **THEN** la imagen de fondo del banner permanece fija mientras el título y el texto se mueven con la página

#### Scenario: hero excluido
- **WHEN** el usuario abre el Inicio en escritorio y se desplaza
- **THEN** el Hero conserva su comportamiento actual, sin fondo fijo

### Requirement: Banner estático en móvil y con movimiento reducido
Cuando el ancho sea ≤860px o aplique `prefers-reduced-motion`, los banners de subpágina SHALL usar `background-attachment: scroll` (comportamiento actual), sin efecto fijo.

#### Scenario: móvil sin efecto
- **WHEN** el usuario abre cualquier subpágina con banner a 390px u 768px y se desplaza
- **THEN** el fondo del banner se desplaza con el contenido, sin saltos ni parpadeos

#### Scenario: movimiento reducido
- **WHEN** el sistema tiene activado `prefers-reduced-motion` y el ancho es de escritorio
- **THEN** el banner usa fondo con desplazamiento normal, sin efecto fijo
