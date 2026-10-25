# Design

## Contexto

H5 quedó como change aparte de la auditoría por crear URL nueva y mover el inventario de páginas. La nota completa ya existe como HTML en la tarjeta de `/noticias/` (líneas ~112-193, con 4 subtítulos promovidos a H2 por H3): este change traslada ese contenido a su URL y deja el listado como sumario enlazado.

## Decisiones

- **Slug**: `noticias/vigencia-indeterminada-haccp/`. Derivado del subject de la nota (vigencia indeterminada del HACCP), en minúsculas con guiones, sin acentos.
- **Title**: "Vigencia indeterminada del plan HACCP | Proinocuidad" (52 car. por script). Meta description a redactar en 1.1 y verificar 120-160.
- **Contenido**: se MUEVE el texto completo ya visible de la tarjeta (resumen, impacto, obligaciones, fecha de corte del 11 de junio de 2026, recomendaciones, fuente "Ministerio de Salud") sin reescribirlo. La tarjeta conserva un resumen corto (2-3 líneas) + la foto + enlace "Leer la nota".
- **`Article` JSON-LD**: headline = título de la nota, author "Equipo Proinocuidad", image con la portada autoalojada, publisher = Organization existente. `datePublished` queda condicional: solo si Juan confirma una fecha real; sin confirmación no se añade (nadie inventa la fecha).
- **Estructura**: misma cabecera/footer/topbar del sitio, hero del patrón Noticias con mías "Inicio / Noticias / Vigencia del HACCP" (mías con 3 niveles, enlazadas los 2 primeros), secciones con los H2 ya promovidos.
- **Fuente**: la cita "Fuente: Ministerio de Salud" permanece como texto como hoy; no se añade un enlace externo no confirmado.
- **llms.txt**: la página entra en la sección Información, con una línea descriptiva sin lenguaje promocional; verificar cobertura conjunto-conjunto contra `sitemap.xml`.
- **Conteo 19 con orden de aplicación**: si `servicio-iso-22000` ya dejó el sitio en 19, este change lleva los conteos a 20 y amplía la enumeración del requisito "Mapa del sitio" al archivarse. Las tareas lo verifican contra el inventario real antes de editar.
- **La auditoría responsive (19 páginas)** corre después con la página nueva en la tanda; no es un gate de este change ni se re-corre la auditoría completa aquí.

## Verificación

- Script de metadatos: title ≤60, meta 120-160, 1 `<h1>`, canonical = `og:url`.
- FAQ-page no aplica: esta página no lleva FAQ (nada que responder en forma de pregunta; no se inventan entradas).
- Enlaces: la tarjeta enlaza a la URL de detalle y esta resuelve sin enlaces rotos; Playwright 1280/390 con 0 px de desborde.
