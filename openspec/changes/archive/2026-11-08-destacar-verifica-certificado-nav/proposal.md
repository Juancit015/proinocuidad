# Proposal

## Why

El enlace "Verifica tu certificado" del nav principal es un enlace de texto
ordinario, igual que "Noticias". En el mismo menú, "Aula Virtual" se muestra
como un botón píldora destacado (`.btn-aula-nav`), por lo que atrae la mirada
y se percibe como una acción principal. "Verifica tu certificado" compite con
los enlaces de texto y pasa desapercibido, aunque es una de las acciones más
usadas por los alumnos y empresas que validan un certificado.

El dueño del proyecto quiere que "Verifica tu certificado" llame la atención de
forma comparable a "Aula Virtual", sin ser idéntico, para que ambos CTAs del
nav se distingan y no se confundan.

## What Changes

- El enlace "Verifica tu certificado" del nav principal pasa de texto plano a
  un botón píldora destacado, con icono, en todas las páginas del sitio.
- Se añade una clase CSS dedicada (`.btn-verifica-nav`) con estilo propio
  (píldora roja de marca, texto blanco, icono), distinta de `.btn-aula-nav`
  (azul) para que ambos CTAs se diferencien.
- El cambio se aplica en el generador (`tools/generar-fichas.mjs`, dos
  ocurrencias: escritorio y acordeón móvil) y a mano en las páginas no
  generadas (inicio, nosotros, servicios, noticias, etc.), incluyendo el footer.
- El botón se mantiene en el menú móvil (acordeón) y hereda el
  comportamiento responsive ya existente para `.btn-aula-nav`.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `navegacion-global`: se añade el requisito de que "Verifica tu certificado"
  se muestre como botón píldora destacado en el nav principal, con estilo
  propio diferenciado de "Aula Virtual".
- `verificacion-certificado`: la integración en la navegación global se
  actualiza para exigir el estilo destacado del enlace.

## Impact

- Archivos afectados: `tools/generar-fichas.mjs`, las 10 páginas HTML no
  generadas, `404.html`, las 8 fichas de curso regeneradas, `assets/css/main.css`.
- No hay cambios en lógica, datos ni en el generador de certificados.
- El despliegue sigue el flujo habitual (commit, push, `tools/publicar.sh`).
- Supuesto (a confirmar en apply): el estilo destacado será una píldora roja
  de marca (`--rojo`) con icono de escudo/verificación, diferenciada del azul
  de "Aula Virtual". Si el dueño prefiere otro color o icono, se ajusta en
  el CSS sin tocar la estructura.