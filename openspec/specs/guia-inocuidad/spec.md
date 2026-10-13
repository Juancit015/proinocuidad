# Guía inocuidad

## Purpose

Definir una página pilar informativa sobre inocuidad alimentaria que atiende la búsqueda general "inocuidad alimentaria" y enlaza a los cursos y servicios de Proinocuidad, sin competir con términos de volumen general como "haccp".

## Requirements

### Requirement: Página pilar de inocuidad alimentaria
El sitio SHALL tener una página HTML en `inocuidad-alimentaria/` con un único `<h1>` que contenga "inocuidad alimentaria", que explique el concepto con secciones y que enlace al listado de cursos y a la página de servicios.

#### Scenario: Página pilar visible
- **WHEN** el usuario abre `inocuidad-alimentaria/`
- **THEN** ve un único `<h1>` con "inocuidad alimentaria" y enlaces a `cursos/index.html` y `servicios/index.html`

#### Scenario: Enlaces internos desde la guía
- **WHEN** se lee el HTML de la página pilar
- **THEN** contiene al menos un enlace a cada una de las 4 páginas de servicio nuevas o existentes

### Requirement: Sin contenido no verificado en la guía
La página pilar SHALL limitar sus afirmaciones a conceptos generales de inocuidad y a la normativa citada en el documento base. No SHALL incluir cifras, estadísticas ni citas sin fuente verificada.

#### Scenario: Sin estadísticas sin fuente
- **WHEN** se revisa el texto de la página pilar
- **THEN** no aparece ninguna cifra o estadística que no tenga una fuente citada

### Requirement: CTA final en la guía
La guía de inocuidad SHALL cerrar con una sección `.cta-sub` como última de `main`: badge "Asesoría sin compromiso", H2 "¿Necesitas ayuda con la inocuidad de tu empresa?" con "inocuidad" en `#ff8f96`, una línea de texto sin plazos ni cifras, botón "Solicitar asesoría por WhatsApp" (wa.me/51981365982) y botón "Ver todos los servicios" (enlace relativo a `servicios/index.html`). Fondo azul oscuro con imagen existente y botones existentes.

#### Scenario: CTA visible en la guía
- **WHEN** el usuario llega al final de `inocuidad-alimentaria/`
- **THEN** ve el CTA con su titular, texto y los 2 botones antes del footer
