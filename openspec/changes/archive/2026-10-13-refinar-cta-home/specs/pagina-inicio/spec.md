# Spec Delta

## MODIFIED Requirements

### Requirement: Bloque final de contacto en la home
La página Inicio SHALL cerrar con un bloque de contacto después de la sección de noticias y antes del footer, solo en `index.html` de la raíz. El bloque SHALL incluir: título "¿Listo para fortalecer la inocuidad de tu empresa?" con la palabra "inocuidad" resaltada en `#ff8f96`, descripción breve sin plazos ni cifras, 4 contactos reales con ícono (WhatsApp +51 981 365 982, correo administracion@proinocuidad.com, horario lunes a viernes de 8 AM a 8 PM, Trujillo, La Libertad, Perú), tarjeta con botones "Solicitar asesoría por WhatsApp" (wa.me/51981365982, con ícono de soporte) y "Escríbenos un correo" (mailto:, con ícono de sobre), y nota inferior "Escríbenos y recibe una propuesta personalizada. O llámanos directo." con enlace `tel:+51981365982` en azul oscuro. El título y la descripción de la tarjeta SHALL estar centrados, con el título en 1.4rem. El chip del icono de WhatsApp SHALL ser verde `--whatsapp` con glifo blanco; los de correo, horario y ubicación SHALL ser blancos con glifo `--azul-oscuro`. Al hover sobre el número de WhatsApp no SHALL aparecer subrayado. El resto del bloque SHALL usar la paleta de Proinocuidad (fondo oscuro con imagen existente de `assets/img/`, tarjeta blanca, texto claro `#d7d9f2`/blanco) y los radios y sombras existentes. En móvil las columnas SHALL apilarse. Ninguna subpágina SHALL llevar este bloque.

#### Scenario: cierre visible en la home
- **WHEN** el usuario llega al final de `index.html`
- **THEN** ve el título con "inocuidad" en tono claro, los 4 contactos con chips de color, la tarjeta centrada con título grande, los 2 botones con ícono y la nota con enlace, antes del footer

#### Scenario: botones de contacto
- **WHEN** el usuario pulsa "Solicitar asesoría por WhatsApp" o "Escríbenos un correo"
- **THEN** se abre wa.me/51981365982 o el correo a administracion@proinocuidad.com respectivamente

#### Scenario: nota con llamada directa
- **WHEN** el usuario pulsa "llámanos directo" en la nota de la tarjeta
- **THEN** se inicia una llamada a `tel:+51981365982`

#### Scenario: sin subrayado en WhatsApp
- **WHEN** el usuario pasa el cursor sobre el número de WhatsApp del bloque
- **THEN** no aparece ningún subrayado

#### Scenario: solo en la home
- **WHEN** el usuario abre cualquier subpágina
- **THEN** no ve el bloque final de contacto
