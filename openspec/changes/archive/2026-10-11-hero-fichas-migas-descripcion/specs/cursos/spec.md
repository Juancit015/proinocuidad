# Cursos (delta)

## Purpose

Unificar el hero de las fichas con migas y descripción estilo Crecepe, eliminando la etiqueta redundante.

## ADDED Requirements

### Requirement: Migas de pan en el hero de la ficha (ADDED)
El hero de cada ficha de curso SHALL mostrar migas de pan "Inicio / Cursos / <nombre corto del curso>": "Inicio" enlazado a la página inicial, "Cursos" enlazado al índice de cursos y el nombre corto como página actual (no enlazada, niveles separados por "/" decorativo).

#### Scenario: Migas visibles en ficha
- **WHEN** el usuario abre cualquier ficha de curso
- **THEN** ve sobre el título las migas "Inicio / Cursos / <nombre corto>", con "Inicio" y "Cursos" navegables

### Requirement: Descripción del curso en el hero (ADDED)
El hero de cada ficha SHALL mostrar bajo el título un párrafo con la descripción del curso, correspondiente al primer párrafo del bloque Objetivo de la ficha.

#### Scenario: Descripción visible
- **WHEN** el usuario abre cualquier ficha de curso
- **THEN** ve bajo el título la descripción del curso
