# Tasks

## 1. Preparación y respaldo

- [x] 1.1 Respaldar `tools/generar-fichas.mjs`, `assets/css/main.css` y los 6 HTML estáticos a modificar en `/tmp/opencode/respaldo-iconografia-botones/`, y verificar el respaldo con `ls -R` y una comparación de tamaño
- [x] 1.2 Confirmar que las 8 fichas están limpias respecto de su generador (`git status --short` sin modificaciones en `cursos/*/index.html`) antes de regenerar, para que un diff posterior solo muestre iconos

## 2. Catálogo de iconos en el generador de fichas

- [x] 2.1 Ampliar el bloque `SVG_*` de `tools/generar-fichas.mjs` con las constantes que faltan: portapapeles, envío, editar, soporte (headset), usuarios y flecha derecha; reutilizar `SVG_BIRRETE`, `SVG_TARJETA` y `SVG_WA` ya existentes en lugar de duplicarlas, y verificar que no quedan dos constantes con el mismo icono
- [x] 2.2 Aplicar las constantes a los 9 puntos de la plantilla que hoy emiten botones sin icono: los 3 `.btn-copiar`, `.btn-aula-nav`, "Solicitar link de PayPal / WU", "Pagar Online con Culqi", el `submit` "Enviar inscripción", "Matricularme Ahora" y "Contactar Asesor", verificando con `grep -c "<svg"` que los 9 sitios contienen ya su icono

## 3. Regeneración de las 8 fichas

- [x] 3.1 Ejecutar `node tools/generar-fichas.mjs` y verificar que las 8 fichas se regeneran sin error y que cada una pasó de 1 a 10 iconos dentro de botones (el WhatsApp ya existente se mantiene)
- [x] 3.2 Revisar el diff de `cursos/*/index.html` y confirmar que el único cambio es la aparición de los `<svg>` en esos botones, sin alteration de texto, `href`, `target`, precios ni contenido
- [x] 3.3 Confirmar que el formulario de inscripción sigue operando en una ficha: el `submit` con icono sigue siendo `type="submit"`, el honeypot y el `select` de País siguen presentes, y `#form-inscripcion` sigue siendo el destino del ancla "Matricularme Ahora"

## 4. Iconos en el HTML estático

- [x] 4.1 Añadir el icono a los 2 botones del home (`index.html`: "Conócenos" y "Ver todos los cursos") y a los 5 de `servicios/index.html` ("Ver certificación HACCP", "Ver FSSC 22000", "Ver BRCGS Food Safety", "Ver registro sanitario" y "Solicitar asesoría"), usando los mismos paths que el generador
- [x] 4.2 Añadir el icono de soporte al "Solicitar asesoría" del `.hero-acciones` de las 4 subpáginas de `servicios/`, copiando el path exacto del headset que ya usa "Solicitar asesoría por WhatsApp" en esas mismas páginas
- [x] 4.3 Verificar que `inocuidad-alimentaria/`, `nosotros/`, `noticias/` y `cursos/index.html` quedan intactos, y que los 36 `.mega-cta` siguen con su flecha CSS y sin SVG añadido

## 5. CSS de tamaño y alineación

- [x] 5.1 Añadir a `assets/css/main.css` la regla `.btn-sm svg { width: 16px; height: 16px; }` y comprobar que no existe ya una regla equivalente
- [x] 5.2 Convertir `.btn-copiar` en `inline-flex` con `align-items: center; gap: 6px` y añadir `.btn-copiar svg { width: 14px; height: 14px; }`, verificando que el botón sigue usando su color `--rojo`, su radio y su hover actuales
- [x] 5.3 Confirmar que el diff de `main.css` solo contiene esas reglas y que las llaves del archivo quedan balanceadas

## 6. Verificación integral

- [x] 6.1 Comprobar con un script de conteo que quedan 0 botones sin icono fuera de `.mega-cta` en los 22 HTML, y que los 36 `.mega-cta` siguen intactos
- [x] 6.2 Verificar que todo `<svg>` tiene su `</svg>` cerrado, que el HTML queda balanceado y que `aria-hidden="true"` está en cada icono añadido
- [x] 6.3 Revisar visualmente en escritorio y móvil (1280 y 390) una ficha, `servicios/index.html` y el home: iconos alineados, botones pequeños con icono de 16px, tarjetas de pago centradas y sin desborde
- [x] 6.4 Registrar el cambio en `CHANGELOG.md` indicando que los 83 botones llevan icono, que las fichas se regeneraron y que no se añadió ninguna dependencia

## Workflow follow-up

- Archivar el change y sincronizar la spec `iconografia` cuando Juan confirme que el resultado visual es el esperado.
- Tras el archivado, copiar a `STRUCTURE.md` el catálogo de iconos por acción si se quiere documentarlo fuera de OpenSpec.