# Spec Delta

## MODIFIED Requirements

(ninguno: los requisitos vigentes de `emision-certificados` — URL pública, llenado por nombre de campo, derivación única, QR estampado, guardas — se conservan tal cual)

## ADDED Requirements

### Requirement: Emisión al completar un curso
Cuando a un alumno se le marca **curso completado** en el aula (`course_completed` de Moodle), el aula SHALL encolar la emisión de su certificado y una tarea programada SHALL emitirlo dentro de una ventana corta (minutos) usando el pipeline de emisión vigente, sin intervención del operador. La emisión nunca SHALL ejecutarse sincrónicamente dentro del handler del evento.

#### Scenario: Curso completado genera el certificado
- **WHEN** un alumno completó un curso mapeado y el evento se procesa
- **THEN** en cuestión de minutos existe `certificados/<codigo>.pdf` con sus datos (nombre, programa, fechas, horas, nota) y una ficha VÁLIDA en `certificados.json`, verificable por nombre y por código, sin que nadie armó una URL a mano

#### Scenario: La emisión corre en la tarea, no en el handler
- **WHEN** la tarea programada procesa la cola de un completado registrado en cualquier momento previo
- **THEN** la emisión ocurre en la tarea, no cuando el alumno finaliza (la acción de completar en el aula no se atasca ni se ralentiza)

### Requirement: Mapeo administrable de cursos
Existe SHALL una configuración del operador en el aula que registra, por curso de Moodle, el nombre del programa que va al PDF, las horas, los créditos, el sufijo de curso para el código y su sílabo. Solo los cursos en ese mapeo se emiten automáticamente; los demás SHAN'T emitirse y SHALL quedar con constancia en el log (curso sin programa configurado).

#### Scenario: Curso sin mapeo se completa
- **WHEN** un curso no registrado en el mapeo queda completado por un alumno
- **THEN** no se emite el PDF ni la ficha, y el registro del pendiente queda marcado como saltado con el motivo visible en el log del plugin para que el operador decida (agregar el mapeo, o re-encolar)

#### Scenario: Operador agrega un curso al mapeo
- **WHEN** el operador registra un curso nuevo con su programa, horas, créditos, sufijo y sílabo
- **THEN** los completados subsiguientes de ese curso se emiten automáticamente sin cambios de código

### Requirement: Nota desde el aula con guardas
La nota del certificado SHALL tomarse de la nota final del curso en el aula. Si el curso no tiene nota cargada para el alumno, la nota está en 0 o es menor al mínimo aprobatorio configurado del curso, la emisión SHAN'T avanzar y el pendiente SHALL quedar con constancia del motivo en el log.

#### Scenario: Curso completado sin nota
- **WHEN** la tarea procesa un pendiente cuyo curso no tiene nota registrada para ese alumno
- **THEN** no se emite el PDF ni la ficha, el pendiente queda marcado como saltado con el motivo y la cola no pierde el registro

#### Scenario: Nota válida fluye al PDF y a la ficha
- **WHEN** la tarea procesa un pendiente con nota final válida
- **THEN** el PDF muestra la nota en `Calificación` y en el sílabo, y la ficha queda con los mismos datos que el certificado

### Requirement: Código con correlativo automático
El código de registro del certificado automático SHALL formarse con el próximo número del correlativo global (`NNN` = máximo ya usado + 1, consultando los códigos de `certificados.json` y los PDFs ya publicados), el año y mes del término, las iniciales derivadas del nombre del alumno y el sufijo de curso del mapeo (formato `NNN-YYYY-MM-INI-CURSO`). El código SHAN'T repetirse entre fichas ni archivos publicados.

#### Scenario: Próximo correlativo
- **WHEN** se procesa una emisión y el máximo correlativo publicado es `015`
- **THEN** el certificado nuevo sale con `016-<YYYY-MM>-<iniciale>-<CURSO>` y ese código es único en las fichas y en `certificados/`

#### Scenario: Colisión o formato imposible no escribe
- **WHEN** el código calculado colisiona con uno ya publicado o el nombre del alumno no permite derivar iniciales
- **THEN** la emisión se salta con motivo en log y no se publica ningún archivo ni ficha

### Requirement: Esquema de la ficha generada
Tras generar el PDF, el sistema SHALL registrar la ficha nueva en `assets/data/certificados.json` con el mismo esquema de las fichas vigentes: código, nombre y su versión normalizada, DNI — vacío cuando el aula no lo tenga —, programa, fechas de inicio y término, horas, estado `VÁLIDO` y `certificado_url` apuntando al PDF del propio sitio (`https://proinocuidad.com/certificados/<codigo>.pdf`).

#### Scenario: Ficha consultable y descargable
- **WHEN** la emisión termina bien
- **THEN** buscar en la página de verificación por nombre (y por código, escaneando el QR) muestra la ficha nueva con enlace de descarga al PDF hospedado en el sitio

#### Scenario: Fichas existentes intactas
- **WHEN** se compara el `certificados.json` antes y después de una emisión
- **THEN** solo cambia la adición de la ficha nueva (sin pérdida ni alteración de las fichas vigentes, sin duplicado de la misma emisión)

### Requirement: Escritura atómica del registro de fichas
El alta de la ficha SHALL escribirse de forma atómica y con respaldo (bloqueo, ficha temporal y renombrado, backup previo) porque la página de verificación consulta ese archivo en vivo. Un archivo corrupto o perdido SHAN'T resultar nunca de la emisión.

#### Scenario: JSON no queda corrupto
- **WHEN** el proceso se corta a mitad de la escritura o dos emisiones corren en paralelo
- **THEN** el archivo queda siempre con JSON válido (bloqueo y escritura temporal + renombrado) y las fichas no se duplican ni pierden

### Requirement: Duplicados y re-encolado
La emisión automática SHAN'T repetirse para el mismo alumno y el mismo curso completado: si ya existe ficha de esa persona y ese programa (o el PDF ya publicado bajo un código con el mismo par), el pendiente SHALL marcarse como duplicado sin emitir. Los pendientes fallidos por causas transitorias (falla de red o del generador, JSON no escribible) SHALL re-intentarse en corridas siguientes de la tarea.

#### Scenario: El mismo completado llega dos veces
- **WHEN** el evento del mismo curso y alumno entra dos veces a la cola
- **THEN** solo hay un certificado y una ficha; el segundo registro queda marcado como duplicado con log

#### Scenario: Falla transitoria se recupera sola
- **WHEN** una corrida falla por causa transitoria (generador caído, JSON momentáneamente no escribible)
- **THEN** la siguiente corrida de la tarea reintenta el pendiente y lo completa sin duplicar el certificado

### Requirement: Observabilidad de la emisión
El sistema SHALL registrar en el log del plugin cada decisión de la cola (emitida, saltada por mapeo, saltada por nota, saltada por duplicado, fallada con reintento) con código y motivo, y la operación SHALL poder replicarse en seco (sin emitir) para comprobación del operador.

#### Scenario: Prueba en seco
- **WHEN** el operador ejecuta la corrida en modo comprobación sobre la cola actual
- **THEN** obtiene lo que se haría (código calculado, datos de ficha) sin escribir PDF ni ficha, y el resultado queda en el log

#### Scenario: Emitida auditada
- **WHEN** el operador quiere saber por qué se emitió un certificado
- **THEN** el log muestra fecha, curso, alumno, código y el estado de la cola que lo originó
