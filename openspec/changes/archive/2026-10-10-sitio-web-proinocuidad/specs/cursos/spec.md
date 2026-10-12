# Spec Delta

## Purpose

Definir la sección Cursos: listado con pestañas Asíncono/En vivo, tarjetas de los 8 cursos asyncrónicos y la ficha de detalle de cada curso con los 9 bloques del documento base.

## ADDED Requirements

### Requirement: Pestañas de modalidad
La página Cursos SHALL ofrecer dos pestañas: "Asíncono" (activa, con los 8 cursos) y "En vivo" (estado "Próximamente", sin cursos por decisión del dueño coordinada con el cliente).

#### Scenario: Pestaña por defecto
- **WHEN** el usuario abre la página Cursos
- **THEN** ve activa la pestaña "Asíncrono" con los 8 cursos listados

#### Scenario: Pestaña En vivo
- **WHEN** el usuario cambia a la pestaña "En vivo"
- **THEN** ve un mensaje de "Próximamente" y ningún curso listado

### Requirement: Tarjetas de curso con flyer
Cada curso asíncrono SHALL mostrarse como tarjeta con su flyer correspondiente, el nombre completo del curso, la modalidad asíncrona (grabada), la certificación en horas y la inversión, y dos botones: "Más información" y "WhatsApp". Excepción aprobada por el dueño: el curso de HACCP Implementación y Certificación en Perú (DIGESA / SENASA) no necesita flyer para su tarjeta hasta que el cliente genere un flyer de modelo asíncrono (su único flyer disponible es de una edición EN VIVO, reservado exclusivamente para la pestaña "En vivo"); mientras tanto su tarjeta muestra un espacio de marca sin flyer.

#### Scenario: Botón WhatsApp de tarjeta
- **WHEN** el usuario hace clic en el botón "WhatsApp" de una tarjeta de curso
- **THEN** se abre la conversación con el número +51 981 365 982 en `wa.me/51981365982`

#### Scenario: Tarjeta del curso DIGESA/SENASA sin flyer asíncrono
- **WHEN** el usuario ve la tarjeta del curso "HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)" en el listado asíncrono
- **THEN** la tarjeta muestra la información del curso (nombre, modalidad, horas, inversión, botones) con un espacio de marca en lugar de flyer, y el flyer disponible NO aparece en el listado asíncrono

### Requirement: Ficha de detalle del curso
Al hacer clic en "Más información", el sitio SHALL mostrar la ficha completa del curso con estos bloques en orden: (I) Datos generales (número de sesiones, modalidad, certificación en horas), (II) Beneficios, (III) Público objetivo, (IV) Objetivo; y para el diplomado además "Perfil del egresado"; luego (V) Temario desplegable por módulos, (VI) Metodología, (VII) Inversión, (VIII) Inscripción online y (IX) Medios de pago.

#### Scenario: Contenido completo de la ficha
- **WHEN** el usuario abre la ficha del Diplomado de Especialización en Gestión de la Calidad e Inocuidad
- **THEN** ve los 9 bloques más "Perfil del egresado", con 6 sesiones, modalidad asíncrona (grabada), certificación de 384 horas académicas y inversión de S/120 (no incluye IGV) / US$37

#### Scenario: Datos de un curso corto
- **WHEN** el usuario abre la ficha de "Legislación Sanitaria de Alimentos Nacional e Internacional"
- **THEN** ve 3 sesiones, 40 horas académicas y inversión de S/45 (no incluye IGV) / US$15, y el objetivo textual del documento base

### Requirement: Temario desplegable
El temario de cada ficha SHALL mostrarse en desplegables por módulo (cerrados por defecto) con sus contenidos según el documento base.

#### Scenario: Desplegar un módulo
- **WHEN** el usuario hace clic en el encabezado de un módulo del temario
- **THEN** el contenido de ese módulo se expande; los demás módulos conservan su estado

### Requirement: Horas académicas según documento base
Las certificaciones mostradas SHALL ser las del documento base: 384 horas para el diplomado y 40 horas para cada curso corto, aunque el formulario activo del cliente indique otras cifras (el cliente corregirá su formulario).

#### Scenario: Certificado de horas
- **WHEN** el usuario compara las horas de "Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP" en la ficha
- **THEN** ve 40 horas académicas

### Requirement: Aula virtual permanente (metodología)
El bloque Metodología de toda ficha asíncrona SHALL indicar el aula virtual permanente disponible en `https://proinocuidad.com/login/` con usuario y contraseña asignados por participante, y el requisito de nota mínima de 14/20 para el certificado de aprobación (o de participación en caso contrario).

#### Scenario: Metodología visible
- **WHEN** el usuario lee el bloque Metodología de cualquier curso
- **THEN** encuentra la URL del aula virtual y la regla de nota mínima 14
