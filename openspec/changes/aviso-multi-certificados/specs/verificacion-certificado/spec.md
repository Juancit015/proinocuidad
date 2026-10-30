# Spec Delta — verificacion-certificado

## MODIFIED Requirements

### Requirement: Presentación del resultado
El sistema SHALL mostrar cada coincidencia como una tarjeta con código, badge de estado (verde para VÁLIDO), nombre completo, programa, fecha de inicio, fecha de término, horas académicas y DNI/C.E. original. Cuando una búsqueda por DNI o por nombre produce **más de una** coincidencia, el sistema SHALL mostrar además un encabezado informativo de una línea antes de la pila de tarjetas — estilo neutro, distinto del aviso rojo de error — que indique cuántos certificados se encontraron y que pertenecen a la misma persona; la vía por código de certificado no lo muestra nunca.

#### Scenario: Tarjeta de resultado
- **WHEN** una búsqueda produce una o más coincidencias
- **THEN** el área de resultados muestra una tarjeta por certificado con todos sus datos y la zona de resultados se centra en el viewport con scroll suave (respetando `prefers-reduced-motion`)

#### Scenario: Persona con varios certificados (vía DNI)
- **WHEN** una búsqueda por DNI devuelve más de una tarjeta (caso real: el DNI 72709363 tiene el diplomado "SGCIA- 26-002" y el curso "010-2026-03-NFP-CIABPPH")
- **THEN** la zona de resultados muestra primero un encabezado de una línea ("Encontramos 2 certificados para tu DNI") seguido de las dos tarjetas completas
- **AND** el encabezado usa un estilo neutro/informativo (no el aviso rojo del canal de errores) y no sustituye ninguna tarjeta

#### Scenario: Persona con varios certificados (vía nombre)
- **WHEN** una búsqueda por nombre devuelve más de una tarjeta
- **THEN** la misma zona muestra un encabezado equivalente ("Encontramos N certificados para tu consulta") antes de las tarjetas

#### Scenario: Una sola coincidencia sin encabezado
- **WHEN** una búsqueda por DNI o por nombre devuelve exactamente una tarjeta
- **THEN** se muestra solo la tarjeta, sin ningún encabezado informativo (la presentación actual no cambia)

#### Scenario: Vía por código sin encabezado
- **WHEN** la búsqueda llega por código de certificado (campo del QR, `?codigo=`)
- **THEN** la presentación es la actual: tarjeta única sin encabezado, aunque el registro sea el único de su persona

#### Scenario: Sin coincidencias
- **WHEN** ninguna consulta encuentra coincidencias
- **THEN** se muestra el mensaje general "Por favor, verifique que las credenciales ingresadas sean correctas." en el aviso bajo el campo de búsqueda — el mismo canal del error de validación —, la zona de resultados queda vacía y la vista no se desplaza hacia el footer

#### Scenario: Fallo al cargar los datos
- **WHEN** el fetch de `assets/data/certificados.json` falla (red, 404 o JSON inválido)
- **THEN** se muestra el aviso de error en el canal bajo el campo de búsqueda y no se produce ninguna excepción sin manejar

#### Scenario: Estados que no se mezclan
- **WHEN** el usuario envía una nueva consulta después de cualquier mensaje anterior (sin coincidencias, validación o fallo de carga)
- **THEN** el aviso se reemplaza por el del estado actual y la zona de resultados se vacía antes de cada búsqueda, sin dejar mensajes antiguos en pantalla
- **AND** el encabezado informativo también se limpia: una consulta posterior con una sola coincidencia no conserva el encabezado de la anterior
