# Spec Delta

## Purpose

Definir la barra de navegación presente en todas las páginas del sitio: identidad (logo), enlaces principales, mega-menú al hover y acceso al aula virtual, con comportamiento adaptado a móvil.

## ADDED Requirements

### Requirement: Identidad y modo de navegación
Toda página del sitio SHALL mostrar la barra de navegación con el logo oficial de Proinocuidad (enlazado a Inicio) y un menú con los enlaces: Inicio, Nosotros, Servicios, Cursos, Noticias y Aula Virtual.

#### Scenario: Clic en logo
- **WHEN** el usuario hace clic en el logo de la barra de navegación desde cualquier página
- **THEN** llega a la página de Inicio

### Requirement: Mega-menú al hover
Al colocar el puntero sobre un elemento que tiene submenús, la barra de navegación SHALL desplegar una ventana flotante con los subenuncios agrupados (título breve del grupo y descripción corta opcional por ítem), igual al patrón referencial indicado por el dueño del proyecto.

#### Scenario: Hover en Servicios
- **WHEN** el usuario coloca el puntero sobre "Servicios"
- **THEN** se despliega un panel con los 4 servicios (Capacitación Empresarial, Implementación de normativa sanitaria, Sistemas de gestión ISO, Registro Sanitario) que enlazan a la página de Servicios

#### Scenario: Salida del panel
- **WHEN** el puntero abandona el elemento y el panel desplegado
- **THEN** el panel desaparece

### Requirement: Aula Virtual en pestaña nueva
El enlace "Aula Virtual" SHALL dirigir a `https://proinocuidad.com/login/` abierto en una pestaña nueva.

#### Scenario: Acceso al aula virtual
- **WHEN** el usuario hace clic en "Aula Virtual"
- **THEN** se abre `https://proinocuidad.com/login/` en una pestaña nueva del navegador

### Requirement: Navegación en móvil
En pantallas móviles, la navegación SHALL colapsar tras un botón de menú; los grupos con submenús SHALL abrirse en modo acordeón, y al seleccionar un enlace el menú SHALL cerrarse y navegar a la página.

#### Scenario: Menú móvil
- **WHEN** el usuario en móvil pulsa el botón de menú y luego "Cursos"
- **THEN** el submenú se despliega como acordeón y al tocar un curso el menú se cierra y navega a la página correspondiente
