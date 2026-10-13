# Spec Delta

## ADDED Requirements

### Requirement: Bloque final de contacto en la home
La página Inicio SHALL cerrar con un bloque de contacto después de la sección de noticias y antes del footer, solo en `index.html` de la raíz. El bloque SHALL incluir: título "¿Listo para fortalecer la inocuidad de tu empresa?" con una palabra resaltada, descripción breve sin plazos ni cifras, 4 contactos reales con ícono (WhatsApp +51 981 365 982, correo administracion@proinocuidad.com, horario lunes a viernes de 8 AM a 8 PM, Trujillo, La Libertad, Perú), tarjeta con botones "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y "Escríbenos un correo" (mailto:), y nota inferior. El bloque SHALL usar la paleta de Proinocuidad (fondo oscuro con imagen existente de `assets/img/`, palabra resaltada y acentos en rojo, tarjeta blanca, texto claro `#d7d9f2`/blanco) y los radios y sombras existentes. En móvil las columnas SHALL apilarse. Ninguna subpágina SHALL llevar este bloque.

#### Scenario: cierre visible en la home
- **WHEN** el usuario llega al final de `index.html`
- **THEN** ve el título con palabra resaltada, los 4 contactos, la tarjeta con los 2 botones y la nota, antes del footer

#### Scenario: botones de contacto
- **WHEN** el usuario pulsa "Solicitar asesoría por WhatsApp" o "Escríbenos un correo"
- **THEN** se abre wa.me/51981365982 o el correo a administracion@proinocuidad.com respectivamente

#### Scenario: solo en la home
- **WHEN** el usuario abre cualquier subpágina
- **THEN** no ve el bloque final de contacto
