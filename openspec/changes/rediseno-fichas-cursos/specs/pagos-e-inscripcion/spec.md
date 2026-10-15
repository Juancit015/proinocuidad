# Spec Delta

## MODIFIED Requirements

### Requirement: Bloque informativo de medios de pago
La ficha de cada curso SHALL mostrar un bloque de medios de pago con los logos provistos (Yape, Plin, BBVA, Western Union y PayPal — `logos-metodos-de-pago/`) y la información: titular "Claudia Rubio Jiménez" en todos los métodos y el número de contacto por definir (placeholder `+51 99999999` hasta que el dueño lo reemplace); la BBVA incluye además los datos del documento base (cuenta de ahorros 0011-0900-0200684705, CCI 011-900-000200684705-83, nota de comisión interplaza S/7.50 por depósito en ventanilla o agente) y el QR de pago (imagen provista). El bloque SHALL presentarse centrado: logos en fila centrada, botones de pago centrados, y datos y QR centrados.

#### Scenario: Info de medios de pago
- **WHEN** el usuario revisa el bloque de Medios de pago de un curso
- **THEN** ve los logos con su información: titular y número, y los datos bancarios BBVA del documento base con el QR

#### Scenario: Medios de pago centrados
- **WHEN** el usuario revisa el bloque de Medios de pago en escritorio
- **THEN** ve los logos centrados en fila, los botones de pago centrados, y los datos y el QR centrados
