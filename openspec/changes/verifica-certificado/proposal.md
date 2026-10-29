# Proposal

## Why

Los alumnos y empleadores necesitan comprobar si un certificado emitido por Proinocuidad es auténtico y descargarlo. Hoy ese proceso es manual (el administrador busca en un Excel y envía el PDF por correo). Una página pública de verificación automatiza la consulta y reduce la carga administrativa.

## What Changes

- **Nueva página** `verifica-tu-certificado.html` con una tarjeta de búsqueda centrada (input + botón "Verificar") y un área de resultados separada.
- **Búsqueda client-side** sobre un JSON estático (`assets/data/certificados.json`) generado desde el Excel "VERIFICA TU CERTIFICADO.xlsx" (28 certificados). La búsqueda acepta DNI o nombre (parcial, insensible a tildes), normalizando DNI quitando puntos y espacios.
- **Tarjeta de resultado** con: código, nombre del participante, programa, fechas de inicio/término, horas académicas, estado (VÁLIDO) y botón "Descargar certificado" que abre el enlace público de Drive en pestaña nueva.
- **Estados de UI**: inicial, encontrado (uno o varios), no encontrado, error.
- **Responsive**: tarjeta al 100% con max 1002px; footer en columna única en móvil (patrón del sitio).
- **Integración**: enlace en footer (y nav si aplica), actualización de `sitemap.xml`, `llms.txt` y `llms-full.txt`.
- **Script de generación** `tools/generar-certificados.mjs` para regenerar el JSON si se actualiza el Excel.

## Capabilities

### New Capabilities

- `verificacion-certificado`: página pública que permite verificar la autenticidad de un certificado emitido por Proinocuidad buscando por DNI o nombre, y descargar el PDF desde Google Drive.

### Modified Capabilities

(none)

## Impact

- `verifica-tu-certificado.html`: nueva página (patrón del sitio: nav, hero, footer).
- `assets/data/certificados.json`: nuevo archivo de datos (28 registros).
- `assets/css/main.css`: estilos de tarjeta de resultado, badge de estado, botón de descarga.
- `assets/js/main.js`: lógica de búsqueda client-side.
- `tools/generar-certificados.mjs`: nuevo script de generación.
- `sitemap.xml`, `llms.txt`, `llms-full.txt`: añadir la URL de la nueva página.
- `CHANGELOG.md`: entrada del cambio.