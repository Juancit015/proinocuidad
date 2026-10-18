# Spec Delta

## Purpose

Definir el orden de apilado de un bloque: qué se pinta encima de qué. Hoy el sitio lo resuelve por casualidad, con el resultado de que un elemento decorativo puede quedar por encima del texto y teñirlo sin que ninguna regla lo impida.

## ADDED Requirements

### Requirement: La decoración de un bloque nunca tapa su contenido
Un bloque con un elemento decorativo posicionado SHALL colocar su contenido por encima de esa decoración, de forma que el decorativo nunca se pinte sobre el texto ni altere su color. La protección SHALL venir de las reglas del bloque y no de reglas específicas de una página, para que todo bloque del mismo tipo quede cubierto por la misma regla.

#### Scenario: El decorativo queda detrás del texto
- **WHEN** un bloque tiene un elemento decorativo posicionado y sin capa propia
- **THEN** el contenido del bloque se pinta por encima y el decorativo se ve detrás

#### Scenario: La protección no depende del contenedor que se use
- **WHEN** se abre un bloque del mismo tipo con un contenedor distinto al que usa hoy
- **THEN** su contenido sigue por encima del decorativo sin tocar el CSS de esa página

#### Scenario: El decorativo no altera el color del texto
- **WHEN** se cuentan los píxeles rosados del texto en un ancho de 390px, que es donde el texto sí alcanza al decorativo
- **THEN** no hay ninguno, y el texto conserva su color original

#### Scenario: La comprobación se hace donde el fallo existe
- **WHEN** se revisa el escenario anterior
- **THEN** fija un ancho concreto, porque por encima de unos 600px el texto no llega al decorativo y la comprobación daría igual sin arreglar nada

#### Scenario: Sin CSS específico de página
- **WHEN** se revisan las reglas que protegen el contenido del decorativo
- **THEN** ninguna está escrita para una página concreta: valen para cualquier bloque del mismo tipo