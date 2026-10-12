# Animacion entrada (delta)

## Purpose

Dar una entrada suave a los bloques de dos columnas (texto a la izquierda, imagen a la derecha) del hero de Inicio y de las secciones equivalentes, respetando la preferencia de movimiento reducido del usuario.

## ADDED Requirements

### Requirement: Entrada del hero de Inicio
El hero de la página Inicio SHALL animar su entrada al cargar la página: el bloque de texto SHALL entrar desde la izquierda y la imagen desde la derecha, con un desplazamiento de 32px, opacidad de 0 a 1, duración de 700ms y curva ease-out.

#### Scenario: Carga de Inicio
- **WHEN** el usuario abre la página Inicio
- **THEN** el texto del hero entra desde la izquierda y la imagen desde la derecha, sin que el contenido desaparezca al terminar

### Requirement: Entrada de bloques de dos columnas al desplazarse
Los bloques de dos columnas `.identidad-grid` (Inicio, Nosotros y Servicios) SHALL animar su entrada cuando entran en pantalla por primera vez en la carga, con el mismo patrón: texto desde la izquierda, imagen desde la derecha.

#### Scenario: Quiénes somos en Nosotros
- **WHEN** el usuario se desplaza hasta la sección "Quiénes somos" de Nosotros
- **THEN** el texto entra desde la izquierda y la imagen desde la derecha una sola vez

#### Scenario: Bloque fuera de pantalla
- **WHEN** la página carga y un bloque de dos columnas no está visible
- **THEN** el bloque permanece en su posición final hasta que entra en pantalla, sin animarse antes

### Requirement: Movimiento reducido
Si el usuario tiene activada la preferencia de movimiento reducido, las animaciones de entrada SHALL desactivarse y el contenido SHALL mostrarse en su posición final.

#### Scenario: Preferencia activa
- **WHEN** el sistema del usuario reporta movimiento reducido
- **THEN** el hero y los bloques de dos columnas aparecen sin desplazamiento ni fundido

### Requirement: Contenido visible sin JavaScript
Si el JavaScript no se ejecuta, el contenido de los bloques SHALL mostrarse sin estar oculto.

#### Scenario: Sin JavaScript
- **WHEN** la página se carga con JavaScript deshabilitado
- **THEN** los bloques de dos columnas y el hero se muestran completos
