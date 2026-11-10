# Spec Delta — Iconografía

## MODIFIED Requirements

### Requirement: Cobertura de todos los botones
Todo botón del sitio que no sea `.mega-cta` SHALL llevar icono, incluidos los botones de las fichas de curso. El texto visible, el destino, el `target` y el orden de los botones SHALL permanecer sin cambios; los botones `.mega-cta` del panel de navegación quedan excluidos porque ya dibujan su flecha con máscara CSS.

#### Scenario: Botones de las fichas de curso
- **WHEN** se abre cualquiera de las fichas de `cursos/*/index.html`, incluidas las de modalidad en vivo
- **THEN** sus botones "Copiar", "Copiar CCI", "Aula Virtual", "Pagar Online con Culqi", "Solicitar link de PayPal / WU", "Enviar inscripción", "Matricularme Ahora" y "Contactar Asesor" muestran icono

#### Scenario: Botones de páginas estáticas
- **WHEN** se abre el home o la sección de servicios
- **THEN** los botones "Conócenos", "Ver todos los cursos", "Solicitar asesoría", "Ver certificación HACCP", "Ver FSSC 22000", "Ver BRCGS Food Safety" y "Ver registro sanitario" muestran icono

#### Scenario: Botón con icono deshabilitado
- **WHEN** se ve el botón "Pagar Online con Culqi", marcado como no disponible
- **THEN** muestra su icono y conserva exactamente su rótulo, destino y estado, sin cambiar de comportamiento

### Requirement: Consistencia entre HTML escrito a mano y generadores
Los iconos emitidos por `tools/generar-fichas.mjs` y `tools/generar-listados.mjs` SHALL coincidir con los de las páginas escritas a mano en la misma familia, grosor de trazo y color. Las fichas de curso SHALL regenerarse desde el generador y SHALL NOT editarse a mano, y una regeneración con el generador actualizado SHALL producir fichas equivalentes salvo por los iconos añadidos.

#### Scenario: Ficha regenerada sin edition manual
- **WHEN** se ejecuta `node tools/generar-fichas.mjs`
- **THEN** todas las fichas quedan con icono en sus botones y ningún `cursos/*/index.html` se modifica a mano

#### Scenario: Coherencia entre páginas
- **WHEN** se compara el icono de "Aula Virtual" de una ficha con el de una página de servicio
- **THEN** ambos son el mismo birrete con el mismo estilo de trazo
