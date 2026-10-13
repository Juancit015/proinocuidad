# Servicios detalle

## Purpose

Definir las páginas individuales de servicio que responden a búsquedas concretas (registro sanitario DIGESA, certificación HACCP, implementación FSSC 22000 y BRCGS Food Safety), con contenido derivado solo del documento base y datos estructurados de servicio.

## Requirements

### Requirement: Página propia por servicio prioritario
El sitio SHALL tener una página HTML propia para cada uno de estos servicios: trámite de registro sanitario de alimentos y bebidas, certificación HACCP (validación técnica del plan HACCP), implementación de FSSC 22000 y BRCGS Food Safety. Cada página SHALL tener un único `<h1>` que contenga la keyword principal de su servicio.

#### Scenario: Página de registro sanitario
- **WHEN** el usuario abre la página de registro sanitario
- **THEN** ve un único `<h1>` que contiene "registro sanitario" y el texto del servicio del documento base

#### Scenario: Cuatro páginas creadas
- **WHEN** se revisa el sitio tras aplicar el cambio
- **THEN** existen las cuatro páginas de servicio y cada una tiene canonical propio

### Requirement: Contenido derivado del documento base
Cada página de servicio SHALL usar solo afirmaciones presentes en el documento base o confirmadas por el dueño. Ninguna página SHALL publicar precios, plazos, requisitos de trámite ni pasos de proceso que no estén confirmados.

#### Scenario: Sin datos no confirmados
- **WHEN** se revisa el texto de cualquier página de servicio
- **THEN** no aparece ningún precio, plazo en días o paso de trámite que no esté en el documento base

### Requirement: Datos estructurados Service
Cada página de servicio SHALL incluir JSON-LD de tipo `Service` con nombre, descripción, `provider` apuntando a la organización y URL canónica.

#### Scenario: JSON-LD en registro sanitario
- **WHEN** se lee el `<head>` de la página de registro sanitario
- **THEN** existe un bloque `application/ld+json` con `@type` `Service`, `name` y `provider` de Proinocuidad

### Requirement: CTA final en páginas de detalle
Cada una de las 4 páginas de detalle (registro sanitario, certificación HACCP, FSSC 22000, BRCGS) SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 único de esa página con su keyword en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). El bloque SHALL usar fondo azul oscuro con imagen existente y botones existentes. Ningún H2 SHALL repetirse entre páginas.

#### Scenario: CTA visible al final
- **WHEN** el usuario llega al final de cualquier página de detalle
- **THEN** ve badge, titular propio con keyword resaltada, texto y los 2 botones antes del footer

#### Scenario: titulares únicos
- **WHEN** se comparan los H2 del CTA de las 4 páginas
- **THEN** no hay dos iguales

#### Scenario: botones del CTA
- **WHEN** el usuario pulsa cada botón
- **THEN** WhatsApp abre wa.me/51981365982 y el secundario navega a `servicios/index.html`
