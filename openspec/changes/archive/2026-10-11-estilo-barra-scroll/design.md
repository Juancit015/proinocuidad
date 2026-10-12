# Design

## Context

- Crecepe (`styles.css` 49-70): `scrollbar-width: thin` + `scrollbar-color` en `html` para Firefox; `::-webkit-scrollbar` (10 px), track translúcido marino, thumb de acento redondeado con `border: 2px solid transparent` + `background-clip: padding-box`, hover en acento oscuro. Reglas `dark-mode` aparte con `:has()`.
- Proinocuidad (`main.css`): sin reglas de scrollbar (solo `::-webkit-details-marker` en otra línea). Paleta: `--rojo: #ad343b`, `--rojo-oscuro: #8c272e`, `--azul: #101477` (16, 20, 119 en RGB).
- Ver `proposal.md` para motivación.

## Goals / Non-Goals

**Goals:**
- Scrollbar delgada roja con hover rojo oscuro, igual estructura que Crecepe.
- Un bloque CSS global, heredado por las 13 páginas.

**Non-Goals:**
- No se copian las reglas `dark-mode` (Proinocuidad no tiene ese modo).
- No se cambia el ancho del layout ni el comportamiento de scroll (sin JS).
- No se estilizan scrollbars internas de componentes (no existen contenedores con scroll propio).

## Decisions

**1. Mapeo directo de variables: `accent` → `--rojo`, `accent-dark` → `--rojo-oscuro`, marino → `rgba(16, 20, 119, …)`.**
El rojo es el color del hover del footer que el usuario señaló. Alternativa (azul `--azul` como thumb) descartada: el usuario pidió el color del hover del footer.

**2. Misma técnica de Crecepe (`background-clip: padding-box` + borde transparente).**
El borde transparente adelgaza visualmente el thumb y respeta el radio sin solaparse con el track. Se copia tal cual.

**3. Ubicación: junto a `html { scroll-behavior: smooth; }`.**
El bloque va pegado a esa regla porque ambas afectan al viewport/root. Un solo punto de edición.

## Risks / Trade-offs

- [Riesgo] Firefox solo soporta `scrollbar-width`/`scrollbar-color` (sin radio ni hover). → Mitigación: degradación aceptada, igual que en Crecepe; el color rojo sí aplica.
- [Riesgo] `::-webkit-scrollbar` no es estándar, pero funciona en Chrome/Edge/Safari. → Mitigación: mismo soporte que Crecepe; sin él se ve la barra nativa, sin rotura.
- [Trade-off] La barra roja es más llamativa que la nativa gris. Es lo pedido (coherencia con Crecepe).

## Migration Plan

- Publicar `main.css`. Rollback: respaldo previo (tarea 1.1).

## Open Questions

Ninguna.
