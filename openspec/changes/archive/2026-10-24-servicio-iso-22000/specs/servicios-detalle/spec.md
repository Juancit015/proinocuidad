# Spec Delta

## MODIFIED Requirements

### Requirement: Página propia por servicio prioritario
El sitio SHALL tener una página HTML propia para cada uno de estos servicios: trámite de registro sanitario de alimentos y bebidas, certificación HACCP (validación técnica del plan HACCP), implementación de FSSC 22000, BRCGS Food Safety e implementación de ISO 22000. Cada página SHALL tener un único `<h1>` que contenga la keyword principal de su servicio.

#### Scenario: Página de registro sanitario
- **WHEN** el usuario abre la página de registro sanitario
- **THEN** ve un único `<h1>` que contiene "registro sanitario" y el texto del servicio del documento base

#### Scenario: Cuatro páginas creadas
- **WHEN** se revisa el sitio tras aplicar el cambio
- **THEN** existen las cinco páginas de servicio y cada una tiene canonical propio

#### Scenario: Página de ISO 22000
- **WHEN** el usuario abre la página de implementación de ISO 22000 desde el enlace de `servicios/index.html`
- **THEN** ve un único `<h1>` que contiene "ISO 22000" y un `title` que también contiene "ISO 22000"

### Requirement: Contenido complementario visible en subpáginas de servicio
Cada una de las 5 páginas de detalle (registro sanitario, certificación HACCP, FSSC 22000, BRCGS, ISO 22000) SHALL mostrar su contenido complementario como texto visible directamente bajo el resumen, sin control "Ver más" ni elemento plegable. El contenido SHALL estar en el HTML como párrafos, subtítulos y listas normales.

#### Scenario: Contenido visible por subpágina
- **WHEN** el usuario abre cualquier página de detalle de servicio
- **THEN** ve el resumen y, a continuación, el contenido complementario sin necesidad de desplegar nada

#### Scenario: Sin plegables en subpáginas
- **WHEN** se revisa el HTML de cualquier página de detalle de servicio
- **THEN** no existe ningún `<details>` ni control "Ver más"

### Requirement: Contenido del detalle por norma
El contenido complementario de cada subpágina SHALL basarse en el docx ya publicado en `servicios/index.html` y adaptarse a su norma con agregados puntuales ya visibles o confirmados en el sitio: BRCGS v9 y su módulo del diplomado; FSSC 22000 junto a ISO 9001/ISO 22000 y su curso asociado; HACCP con PPH, expediente (Manual BPM, POES, PHS, Plan HACCP), DIGESA/SENASA y su curso asociado; registro sanitario con orientación de requisitos, revisión técnica, expediente y la aclaración de que la aprobación depende de la autoridad sanitaria; ISO 22000 dentro del grupo de sistemas de gestión, con su alcance común (elaboración documentaria, seguimiento de cumplimiento, capacitaciones, auditorías internas y acompañamiento durante la auditoría de certificación) y el enlace al Diplomado de Gestión de la Calidad e Inocuidad, que incluye módulos de ISO 9001 e ISO 22000. Ningún contenido SHALL incluir precios, plazos, requisitos de trámite ni pasos de proceso no confirmados, ni la frase "en el menor tiempo posible".

#### Scenario: Contenido BRCGS
- **WHEN** el usuario lee la página BRCGS Food Safety
- **THEN** ve alcance del servicio (documentación, seguimiento, capacitaciones, auditorías, acompañamiento en auditoría de certificación) y la referencia a BRCGS v9

#### Scenario: Contenido FSSC 22000
- **WHEN** el usuario lee la página FSSC 22000
- **THEN** ve alcance del servicio y las normas de referencia ISO 9001, ISO 22000, FSSC 22000 y BRCGS

#### Scenario: Contenido HACCP
- **WHEN** el usuario lee la página de certificación HACCP
- **THEN** ve PPH, expediente (Manual BPM, POES, PHS, Plan HACCP) e implementación, sin pasos de trámite no confirmados

#### Scenario: Contenido registro sin promesa de plazo
- **WHEN** el usuario lee la página de registro sanitario
- **THEN** ve orientación de requisitos, revisión técnica y expediente, con la aclaración de que la aprobación depende de la autoridad sanitaria y sin promesas de plazo

#### Scenario: Contenido ISO 22000
- **WHEN** el usuario lee la página de implementación de ISO 22000
- **THEN** ve el alcance común del servicio y el enlace al Diplomado, sin precios ni plazos

### Requirement: CTA final en páginas de detalle
Cada una de las 5 páginas de detalle (registro sanitario, certificación HACCP, FSSC 22000, BRCGS, ISO 22000) SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 único de esa página con su keyword en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). El bloque SHALL usar fondo azul oscuro con imagen existente y botones existentes. Ningún H2 SHALL repetirse entre páginas.

#### Scenario: CTA visible al final
- **WHEN** el usuario llega al final de cualquier página de detalle
- **THEN** ve badge, titular propio con keyword resaltada, texto y los 2 botones antes del footer

#### Scenario: titulares únicos
- **WHEN** se comparan los H2 del CTA de las 5 páginas
- **THEN** no hay dos iguales

#### Scenario: botones del CTA
- **WHEN** el usuario pulsa cada botón
- **THEN** WhatsApp abre wa.me/51981365982 y el secundario navega a `servicios/index.html`
