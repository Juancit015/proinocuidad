# Design

## Context

Sitio estático sin backend ni build. La matrícula hoy deriva a un Google Form externo (`FORM_INSCRIPCION` en `tools/generar-fichas.mjs`, usado por "Matricularme Ahora" en las 8 fichas). La referencia del cliente pide campos de datos + voucher + comprobante condicional (boleta/factura con RUC y razón social). El formulario va embebido en cada ficha, debajo de "¿Cómo formalizar tu inscripción?". Ver proposal para motivación y specs del change para requisitos.

## Goals / Non-Goals

**Goals:**
- Inscripción sin salir de la ficha, con la lógica condicional que el Google Form no da.
- Funcionar sin backend (envío por servicio externo de formularios).

**Non-Goals:**
- Backend propio, pasarela de pago online ni cuentas de usuario.
- Cambiar precios, pagos, temarios u otras páginas.

## Decisions

- **Bloque de formulario en el generador (`formInscripcionBloque(curso)`)** después del bloque de inscripción: curso oculto + visible por ficha, respeta la regla fichas-vía-generador. Alternativa descartada (página dedicada): el usuario pidió el formulario en la ficha.
- **"Matricularme Ahora" como ancla `#form-inscripcion`**: scroll interno, sin salida externa. El paso 3 de "¿Cómo formalizar tu inscripción?" ya menciona WhatsApp; se mantiene.
- **Envío vía FormSubmit a `administracion@proinocuidad.com`**: HTML+JS puro, sin servidor. Si Juan prefiere otro destino, es un cambio de endpoint como dato.
- **Lógica condicional en `assets/js/main.js`**: checkbox comprobante → radio Boleta/Factura; Factura → exige RUC (regex `^\d{11}$`) y razón social, bloqueo de submit con mensajes inline. Sin dependencia nueva.
- **Estilos en `assets/css/main.css`** con clases propias (`.form-inscripcion`), 1 columna en móvil (≤680px), misma paleta; respeta `prefers-reduced-motion` en el scroll (CSS `scroll-behavior` ya es `smooth` global con `html`).

## Risks / Trade-offs

- [Riesgo] FormSubmit requiere activación del correo (primer envío) → Mitigación: verificación con envío de prueba antes de publicar.
- [Riesgo] Adjunto de voucher con límite de tamaño del servicio → Mitigación: `accept` + nota de tamaño máximo; fallback WhatsApp ya presente en la ficha.
- [Trade-off] Formulario repetido en 8 fichas (HTML más pesado) — aceptable: es estático y cada uno lleva su curso precargado.

## Open Questions

Ninguna.
