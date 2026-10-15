# Spec Delta

## MODIFIED Requirements

### Requirement: Bloque informativo de medios de pago
La ficha de cada curso SHALL mostrar los medios de pago en formato moderno: tarjetas por método (billeteras Yape/Plin con número y botón de copiado, transferencia BBVA con cuenta/CCI y botones de copiado, abonos internacionales PayPal/Western Union, pago online Culqi) con los logos provistos, bloque QR destacado con titular de la cuenta y nota bancaria, y los datos bancarios BBVA del documento base (cuenta de ahorros 0011-0900-0200684705, CCI 011-900-000200684705-83, nota de comisión interplaza S/7.50 por depósito en ventanilla o agente) con el QR de pago.

#### Scenario: Info de medios de pago
- **WHEN** el usuario revisa el bloque de Medios de pago de un curso
- **THEN** ve las tarjetas modernas con su información: titular y número con copiado, y los datos bancarios BBVA del documento base con el QR destacado

#### Scenario: Tarjetas de pago en curso corto
- **WHEN** el usuario revisa los medios de pago de la ficha de un curso corto
- **THEN** ve las tarjetas modernas con copiado, el QR destacado y los mismos datos de pago oficiales del diplomado
