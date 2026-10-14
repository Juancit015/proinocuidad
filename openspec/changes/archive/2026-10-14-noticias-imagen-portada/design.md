# Design

## Context

Ver proposal.md (Why). Estado actual: `.nota-card` es grid de 2 columnas en escritorio (panel azul `.nota-portada` a la izquierda, `.nota-texto` a la derecha) y 1 columna en móvil. No hay foto. Restricciones: colores de marca intactos; foto con licencia libre comercial, autoalojada, fuente en CHANGELOG; sin descargas sin autorización de Juan; respaldo previo; sin commit/push sin confirmación.

## Goals / Non-Goals

**Goals:**
- Tarjeta vertical en escritorio: foto arriba (ancho completo), texto debajo.
- Foto temática laboratorio/inspección con licencia verificada y aprobada.

**Non-Goals:**
- No cambiar el contenido de la nota, migas, CTA, footer ni otras tarjetas.
- No tocar el apilado móvil (ya es 1 columna).

## Decisions

- **D1: `<img>` dentro de `.nota-portada` como fondo superior + etiquetas superpuestas.** Alternativa (figure separado encima de la tarjeta) descartada: rompería el marco redondeado/sombra de `.card` y duplicaría estructura.
- **D2: `.nota-card` a 1 columna en escritorio con la foto a ancho completo y altura fija con `object-fit: cover`; en móvil la imagen lleva un poco más de altura (pedido de Juan: se veía pequeña).** Reutiliza el quiebre móvil existente como base. Alternativa (mantener 2 columnas con foto a la izquierda) descartada: Juan pidió imagen arriba y texto abajo.
- **D3: Descarga solo tras autorización.** Se presenta candidata + licencia a Juan; sin su OK no se descarga (regla del proyecto). Alternativa (Pexels) como respaldo si ninguna candidata Unsplash es gratuita.

## Risks / Trade-offs

- [Foto Plus/Getty no gratuita] → Mitigación: verificar en la página de la foto que no sea Unsplash+ ni Getty antes de proponerla.
- [Foto pesada ralentiza la página] → Mitigación: descargar en ancho ~1200px y comprimir; verificar peso.
- [Etiquetas ilegibles sobre la foto] → Mitigación: conservar fondo azul degradado o pastilla con contraste; verificación visual.

## Migration Plan

Estático sin build: respaldar, editar HTML/CSS, verificar (`diff`, captura 1280 y 390), registrar CHANGELOG. Rollback: restaurar respaldo.
