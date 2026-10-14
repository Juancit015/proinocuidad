# Spec Delta

## ADDED Requirements

### Requirement: Contenido complementario visible en subpáginas de servicio
Cada una de las 4 páginas de detalle (registro sanitario, certificación HACCP, FSSC 22000, BRCGS) SHALL mostrar su contenido complementario como texto visible directamente bajo el resumen, sin control "Ver más" ni elemento plegable. El contenido SHALL estar en el HTML como párrafos, subtítulos y listas normales.

#### Scenario: Contenido visible por subpágina
- **WHEN** el usuario abre cualquier página de detalle de servicio
- **THEN** ve el resumen y, a continuación, el contenido complementario sin necesidad de desplegar nada

#### Scenario: Sin plegables en subpáginas
- **WHEN** se revisa el HTML de cualquier página de detalle de servicio
- **THEN** no existe ningún `<details>` ni control "Ver más"

### Requirement: Contenido del detalle por norma
El contenido complementario de cada subpágina SHALL basarse en el docx ya publicado en `servicios/index.html` y adaptarse a su norma con agregados puntuales ya visibles o confirmados en el sitio: BRCGS v9 y su módulo del diplomado; FSSC 22000 junto a ISO 9001/ISO 22000 y su curso asociado; HACCP con PPH, expediente (Manual BPM, POES, PHS, Plan HACCP), DIGESA/SENASA y su curso asociado; registro sanitario con orientación de requisitos, revisión técnica, expediente y la aclaración de que la aprobación depende de la autoridad sanitaria. Ningún contenido SHALL incluir precios, plazos, requisitos de trámite ni pasos de proceso no confirmados, ni la frase "en el menor tiempo posible".

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
