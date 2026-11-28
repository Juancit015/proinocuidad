# Consultas para medir visibilidad en asistentes de IA

Línea base manual. No hay herramienta contratada para medirlo (SE Ranking AI Search está en el plan vencido), así que estas 14 consultas se lanzan a mano en ChatGPT, Perplexity, Gemini y Google AI Overviews, y se anota si la marca aparece, en qué puesto y con qué URL citada.

**Cómo registrar:** una fila por consulta y motor, con fecha. Repetir cada mes para ver evolución. Sin fecha no sirve como línea base.

**Escala de resultado:**

- `citada` — menciona Proinocuidad y enlaza el dominio
- `mencionada` — nombra la marca sin enlace
- `ausente` — no aparece
- `no disponible` — el motor no respondió o no se pudo comprobar

---

## A. Marca

| # | Consulta | Qué mide | Esperado hoy |
|---|---|---|---|
| 1 | ¿Qué es Proinocuidad? | Entidad reconocida | `mencionada` (solo fuentes propias) |
| 2 | ¿Proinocuidad es confiable? | Reputación | `ausente` |
| 3 | ¿Dónde queda Proinocuidad? | Datos de contacto | `mencionada` sin dirección exacta |

## B. Cursos (intención de compra)

| # | Consulta | Qué mide | Esperado hoy |
|---|---|---|---|
| 4 | ¿Dónde puedo hacer un curso de HACCP online en Perú con certificado? | Comparativa de oferta | `ausente` |
| 5 | ¿Cuánto cuesta un curso de HACCP en Perú? | Precio publicado | `ausente` — el precio está en el sitio pero ningún modelo lo cita |
| 6 | ¿Qué curso de BPM online me recomiendas para manipulación de alimentos? | Categoría sin página propia | `ausente` |
| 7 | ¿Qué diplomado en inocuidad alimentaria hay en Perú? | Programa largo | `ausente` |

## C. Servicios (intención B2B)

| # | Consulta | Qué mide | Esperado hoy |
|---|---|---|---|
| 8 | ¿Quién implementa HACCP en Trujillo? | Local + servicio | `ausente` |
| 9 | ¿Cómo obtengo el registro sanitario de un alimento en Perú? | Guía de trámite | `ausente` |
| 10 | ¿Qué consultora me ayuda con la certificación FSSC 22000 en Perú? | Comparativa B2B | `ausente` |
| 11 | ¿La validación técnica del plan HACCP sigue venciendo cada 2 años? | Autoridad temática | `ausente` — hay un artículo que lo responde |

## D. Entidad y contexto

| # | Consulta | Qué mide | Esperado hoy |
|---|---|---|---|
| 12 | ¿Qué empresas peruanas dan capacitación en inocuidad alimentaria? | Listado del sector | `ausente` |
| 13 | ¿Qué es la vigencia indeterminada del plan HACCP en Perú? | Tema de la noticia | `ausente` |
| 14 | ¿Quién es el equipo de Proinocuidad? | Personas / E-E-A-T | `ausente` |

---

## Hoja de registro

| Fecha | Motor | # | Resultado | Posición | URL citada | Notas |
|---|---|---|---|---|---|---|
| | | | | | | |

**Nota:** si un motor cita `https://proinocuidad.com/servicios/index.html` en lugar de `/servicios/`, es la misma causa raíz del hallazgo T-01 del informe: la variante `.html` es la que está indexada.
