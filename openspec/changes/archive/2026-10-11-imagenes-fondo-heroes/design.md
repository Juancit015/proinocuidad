# Design

## Context

- Heroes actuales: `.page-head` con `linear-gradient(135deg, azul, azul-oscuro)`, texto blanco, migas blancas (4 páginas).
- Crecepe: `style="background: linear-gradient(...rgba marino...), url('...avif') center/cover no-repeat fixed"` + clase `.has-bg` con texto blanco y `text-shadow`.
- `assets/img/` ya mezcla jpg/webp/png; los flyers usan webp. AVIF preferido para fotos nuevas (mejor compresión), como los fondos de Crecepe.
- Ver `proposal.md` para motivación y criterios.

## Goals / Non-Goals

**Goals:**
- 4 fotos de fondo con overlay que garantice contraste del texto blanco.
- Archivos livianos (<200 KB c/u) y rutas relativas.

**Non-Goals:**
- No se tocan migas, h1, párrafos ni layout del hero.
- No hay `background-attachment: fixed` (en iOS provoca zoom/reacomodos; Crecepe lo condiciona y aquí se evita).
- No cambian las fichas.

## Decisions

**1. Clases por página en `main.css`, no estilos inline.**
`.page-head--servicios`, `--nosotros`, `--noticias`, `--cursos` con `background: linear-gradient(rgba(11,14,86,.72), rgba(11,14,86,.55)), url('../img/hero-x.avif') center/cover no-repeat`. Alternativa (inline como Crecepe) descartada: 4 páginas × repetición del degradado; la clase centraliza el overlay.

**2. AVIF como formato único.**
Sin fallback JPG: AVIF cubre >95% de navegadores actuales y el sitio ya sirve webp/avif en flyers y fondos de referencia. Si una foto no convierte bien, se usa WebP. Verificación con `file` + peso.

**3. Overlay azul marino (no negro).**
`rgba(11,14,86,…)` mantiene identidad frente al negro de fotos genéricas; garantiza contraste ~10:1 del blanco.

**4. Atribución en CHANGELOG.**
Licencia Unsplash/Pexels no exige atribución, pero se registran las URLs fuente para trazabilidad.

## Risks / Trade-offs

- [Riesgo] Foto demasiado clara arruina el contraste. → Mitigación: overlay .72/.55 + preferir fotos oscuras; QA visual lo confirma.
- [Riesgo] Peso excesivo en móvil. → Mitigación: redimensionar a 1920 px de ancho y comprimir (<200 KB); la misma imagen sirve a desktop y móvil.
- [Trade-off] Descarga externa (solo esta tarea, autorizada). Se verifica licencia libre antes de descargar.

## Migration Plan

- Publicar `assets/img/` + `main.css` + las 4 páginas (solo clase añadida). Rollback: respaldos (tarea 1.1).

**5. Fichas con foto (extensión).**
Campo `fondo` por curso en la plantilla con `style="background-image: linear-gradient(...), url('../../assets/img/ficha-<slug>.avif')"` inline sobre `.ficha-head` (el degradado base queda como fallback). La verificación exige diff mínimo + foto visible por ficha.

## Open Questions

Ninguna. La selección concreta de fotos ocurre en la tarea 2.1 (requiere navegar el catálogo).
