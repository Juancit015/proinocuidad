# Spec Delta

## MODIFIED Requirements

### Requirement: Presentación del resultado
El sistema SHALL mostrar cada coincidencia como una tarjeta con código, badge de estado (verde para VÁLIDO), nombre completo, programa, fecha de inicio, fecha de término, horas académicas y DNI/C.E. original.

#### Scenario: Tarjeta de resultado
- **WHEN** una búsqueda produce una o más coincidencias
- **THEN** el área de resultados muestra una tarjeta por certificado con todos sus datos y la zona de resultados se centra en el viewport con scroll suave (respetando `prefers-reduced-motion`)

#### Scenario: Sin coincidencias
- **WHEN** ninguna consulta encuentra coincidencias
- **THEN** se muestra el mensaje general "Por favor, verifique que las credenciales ingresadas sean correctas." en el aviso bajo el campo de búsqueda — el mismo canal del error de validación —, la zona de resultados queda vacía y la vista no se desplaza hacia el footer

#### Scenario: Fallo al cargar los datos
- **WHEN** el fetch de `assets/data/certificados.json` falla (red, 404 o JSON inválido), ya sea en una búsqueda manual o en la búsqueda automática disparada por `?codigo=`
- **THEN** se muestra el aviso de error en el canal bajo el campo de búsqueda, el estado de carga (spinner y botón deshabilitado) se restablece y no se produce ninguna excepción sin manejar

#### Scenario: Estados que no se mezclan
- **WHEN** el usuario envía una nueva consulta después de cualquier mensaje anterior (sin coincidencias, validación o fallo de carga)
- **THEN** el aviso se reemplaza por el del estado actual y la zona de resultados se vacía antes de cada búsqueda, sin dejar mensajes antiguos en pantalla

## ADDED Requirements

### Requirement: Búsqueda automática por código del certificado
Cuando la página se abre con el parámetro `codigo` en la URL (caso de escaneo del QR de un certificado), el sistema SHALL ejecutar la búsqueda automáticamente una vez que los datos estén disponibles, mostrando la tarjeta del certificado o el aviso correspondiente; bajo ninguna circunstancia SHALL quedar el indicador de carga visible sin resultado ni aviso.

#### Scenario: Código válido con datos ya cargados
- **WHEN** la página se abre con `?codigo=<código válido>` y los datos ya están cargados
- **THEN** se ejecuta la búsqueda automáticamente y se muestra la tarjeta del certificado (o el aviso de sin coincidencias) sin intervención del usuario

#### Scenario: Código válido con datos aún no cargados
- **WHEN** la página se abre con `?codigo=<código válido>` y el fetch de datos aún no ha terminado
- **THEN** la búsqueda se difiere hasta que los datos estén disponibles y, una vez cargados, se ejecuta automáticamente y muestra el resultado o el aviso correspondiente

#### Scenario: Fetch falla durante la búsqueda automática
- **WHEN** la página se abre con `?codigo=...` y el fetch de datos falla
- **THEN** se muestra el aviso de error de carga, el botón se restablece y no queda el spinner visible

#### Scenario: Sin excepción sin manejar
- **WHEN** ocurre cualquier error durante el flujo de búsqueda (manual o automática)
- **THEN** el error se captura y se muestra como aviso de error, el estado de carga se restablece y no queda ninguna excepción sin manejar en la consola