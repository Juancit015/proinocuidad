# Spec Delta

## MODIFIED Requirements

### Requirement: Pestañas de modalidad
La página Cursos SHALL ofrecer dos pestañas: "Asíncronos" (activa, con los 8 cursos) y "En vivo" (sin cursos por hoy, según decisión del dueño: la edición en vivo disponibles ya ocurrió y no existe en la fuente una ficha de oferta en vivo). La pestaña "En vivo" SHALL mostrar un aviso de ausencia de cursos en vivo — sin flyers, sin contenido de marketing — y indicar que los cursos disponibles están en la pestaña Asíncronos.

#### Scenario: Pestaña por defecto
- **WHEN** el usuario abre la página Cursos
- **THEN** ve activa la pestaña "Asíncronos" con los 8 cursos listados

#### Scenario: Pestaña En vivo
- **WHEN** el usuario cambia a la pestaña "En vivo"
- **THEN** ve el aviso "No hay cursos en vivo por el momento…" (texto definido en design.md), sin ningún curso ni flyer listado

### Requirement: Tarjetas de curso con flyer
Cada curso asíncrono SHALL mostrarse como tarjeta con su flyer correspondiente, el nombre completo del curso, la modalidad asíncrona (grabada), la certificación en horas y la inversión, y dos botones: "Más información" y "WhatsApp". Excepción aprobada por el dueño: el curso de HACCP Implementación y Certificación en Perú (DIGESA / SENASA) no usa flyer para su tarjeta hasta que el cliente genere un flyer de modalidad asíncrona (su único flyer disponible es de una edición EN VIVO ya ocurrida, el cual NO se publica en ninguna pestaña del sitio); mientras tanto su tarjeta muestra un espacio de marca sin flyer.

#### Scenario: Botón WhatsApp de tarjeta
- **WHEN** el usuario hace clic en el botón "WhatsApp" de una tarjeta de curso
- **THEN** se abre la conversación con el número +51 981 365 982 en `wa.me/51981365982`

#### Scenario: Tarjeta del curso DIGESA/SENASA sin flyer asíncrono
- **WHEN** el usuario ve la tarjeta del curso "HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)" en el listado asíncrono
- **THEN** la tarjeta muestra la información del curso (nombre, modalidad, horas, inversión, botones) con un espacio de marca en lugar de flyer

#### Scenario: Flyer de edición en vivo fuera del sitio
- **WHEN** se revisa cualquier página o pestaña del sitio
- **THEN** el flyer de la edición ZOOM del curso DIGESA/SENASA no aparece en ninguna página (se conservará solo como archivo en el material fuente hasta que el cliente defina su uso)
