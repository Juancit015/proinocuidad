# Design

## Context

Ver motivación en `proposal.md`. Estado verificado:

- `.cta-card h3` hereda `.card-body h3` (1.02rem, alineado a la izquierda); referencia Crecepe: `.contact-card h3` 1.4rem/800 centrado con `.contact-card { text-align: center }`.
- Nota actual: `<small>Atención de lunes a viernes...</small>`; referencia: `small` con enlace en acento oscuro (`.contact-card small a`).
- `a.cta-item:hover strong { text-decoration: underline; }` existe y se elimina.
- `.cta-icon` actual: fondo translúcido único, glifo blanco 22px. Referencia: `.ci-icon--wa` verde `#25d366` (= `--whatsapp` propio), resto blancos con glifo oscuro.
- `.btn svg` (18px) ya existe para iconos en botones.
- Restricción de contenido: sin plazos ni cifras no confirmadas (por eso la nota omite "24 horas").

## Goals / Non-Goals

**Goals:**

- Tarjeta con jerarquía y centrado como la referencia, con variables propias.
- Nota con gancho y enlace de llamada en azul oscuro.
- Chips de color e iconos en botones; fuera el underline.

**Non-Goals:**

- Cambiar estructura, contactos, destinos de botones, fondo u otras secciones.
- Prometer plazos ("24 horas") sin confirmación de Juan.

## Decisions

- **Título 1.4rem + `text-align: center` en `.cta-card`** (valor medido de la referencia) en vez de escalar proporcional: copia exacta de la jerarquía observada.
- **Nota redactada sin plazo** en vez de la idea literal de Juan: "Escríbenos y recibe una propuesta personalizada. O llámanos directo." con `tel:+51981365982` (mismo número confirmado) en `--azul-oscuro`. Si Juan confirma el plazo de 24 h, se agrega en apply.
- **Eliminar la regla de underline** sin reemplazo: el hover queda neutro como pide Juan, sin introducir otro efecto no pedido.
- **Clases modificadoras `cta-icon--wa/--mail/--reloj/--lugar`** en el HTML en vez de `:first-child`: selectores frágiles si cambia el orden.
- **Auriculares (trazo feather) y sobre** para los botones, inline, 18px por regla existente; WhatsApp del item conserva su glyph de marca.

## Risks / Trade-offs

- [Riesgo] `tel:` en escritorio sin app de llamadas no hace nada útil → Mitigación: es el patrón estándar de la referencia; el enlace solo aparece en la nota, no sustituye WhatsApp/correo.
- [Riesgo] Título 1.4rem + centrado en tarjeta angosta móvil → Mitigación: el apilado ya existe; verificar a 390px en revisión visual.

## Migration Plan

Editar `index.html` (nota, clases, 2 SVG) y `assets/css/main.css`, con respaldo previo. Rollback: respaldo. Sin commit/push ni despliegue. Revisión visual antes de archivar.
