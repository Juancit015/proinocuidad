# Spec Delta

## Purpose

Permite a alumnos y empleadores verificar la autenticidad de un certificado emitido por Proinocuidad buscando por DNI o nombre, y descargar el PDF desde Google Drive, sin intervención del administrador.

## ADDED Requirements

### Requirement: Página de verificación de certificado
El sitio SHALL ofrecer una página pública (`verifica-tu-certificado.html`) con un formulario de búsqueda por DNI o nombre y un área de resultados separada.

#### Scenario: Carga inicial
- **WHEN** el usuario abre la página
- **THEN** se muestra la tarjeta de búsqueda centrada y el área de resultados está vacía

### Requirement: Búsqueda por DNI o nombre
El sistema SHALL buscar en los datos de certificados por DNI (normalizado, sin puntos ni espacios) o por nombre (coincidencia parcial, insensible a mayúsculas y tildes) usando un solo campo de texto.

#### Scenario: Búsqueda por DNI exacto
- **WHEN** el usuario ingresa un DNI válido (ej. 72709363)
- **THEN** se muestra la tarjeta del certificado correspondiente

#### Scenario: Búsqueda por nombre parcial
- **WHEN** el usuario ingresa un fragmento del nombre (ej. "claudia")
- **THEN** se muestran todos los certificados cuyo nombre contiene ese fragmento

#### Scenario: Sin resultados
- **WHEN** no hay coincidencia para el término ingresado
- **THEN** se muestra el mensaje "No se encontró un certificado con esos datos."

#### Scenario: Varios resultados
- **WHEN** la búsqueda devuelve más de un certificado
- **THEN** se muestran todas las tarjetas, una por certificado

### Requirement: Tarjeta de resultado con descarga
Cada resultado SHALL mostrar: código del certificado, nombre del participante, programa, fechas de inicio y término, horas académicas, estado y un botón "Descargar certificado" que abre el enlace público de Drive en pestaña nueva.

#### Scenario: Resultado válido
- **WHEN** se encuentra un certificado con estado VÁLIDO
- **THEN** la tarjeta muestra todos los datos y el botón de descarga apunta al enlace de Drive

#### Scenario: Descarga
- **WHEN** el usuario hace clic en "Descargar certificado"
- **THEN** se abre el PDF en una pestaña nueva (enlace de Drive público)

### Requirement: Datos estáticos desde JSON
Los datos de certificados SHALL estar en `assets/data/certificados.json` (generado desde el Excel) y la búsqueda SHALL ser client-side, sin llamadas al servidor.

#### Scenario: Carga de datos
- **WHEN** la página carga
- **THEN** se descarga el JSON y la búsqueda es instantánea (sin petición al servidor por cada búsqueda)

### Requirement: Responsive
La tarjeta de búsqueda y las tarjetas de resultado SHALL ajustarse al ancho de la pantalla en móvil, tableta y escritorio, sin desplazamiento horizontal.

#### Scenario: Móvil
- **WHEN** el ancho es 360px
- **THEN** la tarjeta de búsqueda ocupa el 100% del ancho disponible y no hay desplazamiento horizontal

#### Scenario: Escritorio
- **WHEN** el ancho es 1024px o más
- **THEN** la tarjeta de búsqueda tiene un ancho máximo de 1002px y está centrada