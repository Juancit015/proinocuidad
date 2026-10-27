# Tasks

## 1. Corrección CSS de `.cta-grid` en Inicio

- [x] 1.1 Cambiar `.cta-grid` a `minmax(0, 1.1fr) minmax(0, 0.9fr)` y a `minmax(0, 1fr)` en `@media (max-width: 860px)`, añadir `min-width: 0` a `.cta-info` y `.cta-items`, y `overflow-wrap: anywhere` a `.cta-info > p` y `.cta-item > span`; verificar con `grep` que las reglas quedaron en `assets/css/main.css`.
- [x] 1.2 Añadir `word-break: break-word` a `.cta-item > span` para tokens largos; verificar que no se rompe el layout en escritorio (≥1024px) con Playwright.

## 2. Verificación responsive

- [x] 2.1 Medir con Playwright a 360, 390, 412 y 768px: `scrollWidth === clientWidth` y `cta-info` dentro del contenedor; capturar evidencia.
- [x] 2.2 Revisar visualmente la sección CTA a 360px y 1280px (sin texto cortado ni banda blanca a la derecha).
- [x] 2.3 Verificar que no aparecieron desbordamientos nuevos en otras secciones de Inicio (auditoría rápida a 360px).

## 3. Documentación y despliegue

- [ ] 3.1 Añadir entrada en `CHANGELOG.md` con el fix y la evidencia medida.
- [ ] 3.2 Commit del cambio CSS + CHANGELOG (mensaje en español con bloque `Verificado:`).
- [ ] 3.3 Deploy con `tools/publicar.sh` y verificar `md5sum` del CSS en server y HTTP 200 de `/`.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.