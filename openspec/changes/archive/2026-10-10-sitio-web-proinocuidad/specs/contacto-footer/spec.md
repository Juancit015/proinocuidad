# Spec Delta

## Purpose

Definir el footer de contacto y los datos de contacto transversales del sitio (email, WhatsApp, horario, ubicación, redes y comunidad).

## ADDED Requirements

### Requirement: Datos de contacto
El footer de todas las páginas SHALL mostrar: correo `administracion@proinocuidad.com`, WhatsApp +51 981 365 982 (enlace `wa.me/51981365982`), horario de atención "Lunes a viernes de 8 AM a 8 PM" y ubicación "Trujillo, La Libertad, Perú" (la dirección exacta se mostrará como "Próximamente").

#### Scenario: Contacto visible
- **WHEN** el usuario mira el footer de cualquier página
- **THEN** ve el correo, el WhatsApp, el horario y la ubicación definidos, con la dirección exacta como "Próximamente"

### Requirement: Redes sociales oficiales
El footer SHALL enlazar las 4 redes sociales oficiales del documento base: Facebook, YouTube, Instagram y LinkedIn, en pestaña nueva.

#### Scenario: Enlaces de redes
- **WHEN** el usuario hace clic en un ícono de red social del footer
- **THEN** se abre la URL aproximada correspondiente del perfil de Proinocuidad en pestaña nueva

### Requirement: Comunidad WhatsApp
El footer SHALL incluir el enlace a la comunidad general "Comunidad PROINOCUIDAD" (`https://chat.whatsapp.com/GXh0wdFZWgEGz2dlpCTPvN`) con una invitación a unirse para próximos cursos y promociones.

#### Scenario: Acceso a la comunidad
- **WHEN** el usuario hace clic en el enlace de la comunidad WhatsApp
- **THEN** se abre la invitación de la comunidad en el enlace oficial

### Requirement: Marca y año en el footer
El footer SHALL mostrar el logo de Proinocuidad y la razón social "Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L."

#### Scenario: Cierre institucional
- **WHEN** el usuario ve el pie de página
- **THEN** ve el logo y la razón social completa
