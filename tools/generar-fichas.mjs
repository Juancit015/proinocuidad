/**
 * Generador de fichas estáticas de cursos de Proinocuidad.
 * Ejecutar:  node tools/generar-fichas.mjs
 * Emite:     cursos/<slug>/index.html  (HTML estático, sin build al navegar)
 *
 * Layout moderno de 2 columnas (main + sidebar sticky), igual al de la ficha
 * del diplomado: hero, stats, secciones estructuradas, temario por módulos,
 * metodología por pasos, tarjetas de pago modernas con QR, inscripción y
 * sidebar de matrícula con flyer propio, precios, CTAs e incluidos.
 * Cada curso conserva su propio contenido y datos; solo el layout es compartido.
 *
 * Contenido fuente: documento oficial "_archivo/pagina web.pdf" (fuente única de verdad).
 * - Decimal del objetivo del curso 5 (BPM Codex 2022): se publica tal como está en el PDF
 *   (decisión del dueño: coincide con el objetivo del curso DIGESA/SENASA en el documento).
 * - El curso 2 (Legislación) y el curso 3 (BPM/POES/POE/HACCP) comparten el mismo objetivo
 *   exacto en el PDF; se publica igual (fiel al documento).
 * - Bloque de pagos con la decisión del dueño: botón Culqi (placeholder #) + tarjetas
 *   con titular "Claudia Rubio Jiménez" (Yape/Plin) y cuenta BBVA del documento base.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const img_og = "https://proinocuidad.com/assets/img/proinocuidad-og-1200x630.png";
/* Respaldo documentado: Google Form externo (antes destino de "Matricularme Ahora";
   ahora los CTA hacen scroll al formulario embebido #form-inscripcion). */
const FORM_INSCRIPCION = "https://docs.google.com/forms/d/1OoggGqBor_FDBcKoo807nPf0atujRvqqXrIqDhBiRpI/viewform";
const WA_NUM = "51981365982";

/* ---------- mensajes prellenados de WhatsApp (spec `contacto-whatsapp`) ----------
   El texto viaja en el propio href (sin JavaScript), codificado con
   encodeURIComponent. Catálogo completo documentado en STRUCTURE.md. */
const wa = (texto) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(texto)}`;

// Contacto directo (barra superior y pie de página): neutro, no pide nada.
const waContacto = wa(
  "Hola, escribo desde la web de Proinocuidad. Deseo comunicarme con ustedes.",
);
// Botón flotante: genérico e idéntico en todas las páginas, por decisión del
// dueño. Si se cambia, hay que cambiarlo también en las 10 páginas escritas a
// mano (home, inocuidad-alimentaria, nosotros, noticias, servicios y sus 4).
const waFlotante = wa(
  "Hola, escribo desde la web de Proinocuidad. Quiero información sobre sus cursos y servicios de inocuidad.",
);

/* ---------- iconos SVG reutilizables ---------- */

const SVG_RELOJ = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const SVG_LIBRO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const SVG_MONITOR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
const SVG_LIBRO_TAG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const SVG_ESCUDO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`;
const SVG_ESTRELLA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_DIANA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
const SVG_BIRRETE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
const SVG_INFO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
const SVG_TARJETA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
const SVG_PORTAPAPEL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`;
const SVG_CUBO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;
const SVG_DOC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
const SVG_CALENDARIO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const SVG_CHECK = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_CHECK_GRANDE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_FLECHA_ABAJO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>`;
const SVG_AVISO = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: -2px; margin-right: 4px; color: var(--rojo);"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
const SVG_WA = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;
const SVG_ASESOR = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M14 14a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1"/><path d="M21 16v2a3 3 0 0 1-3 3h-2"/><circle cx="15" cy="21" r="1"/></svg>`;

/* ---------- Iconos de botón (spec `iconografia`) ----------
   24x24, trazo 2 con remates redondeados, `currentColor` (hereda el color de
   cada variante de botón) y `aria-hidden="true"` por ser decorativos: el
   nombre accesible del botón es su texto. El tamaño (18px / 16px en `.btn-sm`
   / 14px en `.btn-copiar`) lo fija `assets/css/main.css`, no el SVG.

   Los `SVG_*` decorativos de arriba (reloj, libro, escudo…) son otro slot:
   llevan tamaño fijo o trazo 1 y se usan en tarjetas y etiquetas de sección,
   no en botones. Por eso birrete, tarjeta y portapapeles tienen aquí su
   variante de botón en lugar de reusarse.

   Catálogo por acción (un icono por acción, en todo el sitio):
     portapapeles -> copiar un valor      birrete -> Aula Virtual
     tarjeta     -> pago con Culqi        envio   -> enviar / link de pago
     editar      -> matricularme          soporte -> contactar asesor
   Los dos iconos que faltan en esta tabla (usuarios para "Conócenos" y flecha
   para "Ver...") solo los usan páginas escritas a mano —el home y servicios—,
   así que viven ahí y no se declaran aquí.
*/
const svgBtn = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const SVG_BTN_COPIAR = svgBtn(
  '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
);
const SVG_BTN_AULA = svgBtn(
  '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
);
const SVG_BTN_TARJETA = svgBtn(
  '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
);
const SVG_BTN_ENVIO = svgBtn(
  '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
);
const SVG_BTN_EDITAR = svgBtn(
  '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
);
const SVG_BTN_SOPORTE = svgBtn(
  '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5Z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z"/>',
);
const SVG_BTN_CASA = svgBtn(
  '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/>',
);
const SVG_BTN_CURSOS = svgBtn(
  '<path d="M4 19V5"/><path d="M4 5h7a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H4"/><path d="M20 19V5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H20"/>',
);
const SVG_BTN_SERVICIOS = svgBtn(
  '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
);
const SVG_BTN_NOSOTROS = svgBtn(
  '<path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7" r="3.2"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.8"/><path d="M16.5 4.2a3.2 3.2 0 0 1 0 5.6"/>',
);
const SVG_BTN_NOTICIAS = svgBtn(
  '<path d="M4 5h13v14a1 1 0 0 0 1 1H5a1 1 0 0 1-1-1V5Z"/><path d="M17 8h2a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2"/><path d="M7 8.5h7M7 12h7M7 15.5h4"/>',
);
const SVG_BTN_INOCUIDAD = svgBtn(
  '<path d="M12 21s7.5-3.5 7.5-9.5V5.5L12 2.5 4.5 5.5V11.5C4.5 17.5 12 21 12 21Z"/><path d="M9 11.8l2.2 2.2L15.4 9.8"/>',
);

/* ---------- piezas del layout moderno ---------- */

function statCard(svg, etiqueta, valor) {
  return `<div class="ficha-stat-card">
<div class="stat-icono">${svg}</div>
<div class="stat-info"><span>${etiqueta}</span><strong>${valor}</strong></div>
</div>`;
}

function statsGrid(curso) {
  return `<div class="ficha-stats-grid">
${statCard(SVG_RELOJ, "Duración", `${curso.horas} Horas Académicas`)}
${statCard(SVG_LIBRO, "Estructura", curso.estructura)}
${statCard(SVG_MONITOR, "Modalidad", "100% Asíncrono (Grabado)")}
${statCard(SVG_ESCUDO, "Certificación", "Con Código QR Oficial")}
</div>`;
}

function seccion(svgTag, titulo, inner) {
  return `<article class="ficha-seccion">
<div class="ficha-seccion-header">
<span class="seccion-tag" aria-hidden="true">${svgTag}</span>
<h2>${titulo}</h2>
</div>
${inner}
</article>`;
}

function beneficioItem(svg, titulo, texto) {
  return `<div class="beneficio-item">
<div class="beneficio-icon">${svg}</div>
<div class="beneficio-texto"><strong>${titulo}</strong><p>${texto}</p></div>
</div>`;
}

function beneficiosBloque(curso) {
  return seccion(
    SVG_ESTRELLA,
    "¿Por qué especializarte con nosotros?",
    `<div class="beneficios-grid">
${beneficioItem(SVG_CUBO, "Aula Virtual Permanente", "Accede las 24 horas del día, los 7 días de la semana, sin límites ni caducidad de acceso.")}
${beneficioItem(SVG_DOC, "Material y Recursos de Aplicación", "Libros, plantillas editables de registros, manuales y casos prácticos reales para tu trabajo.")}
${beneficioItem(SVG_RELOJ, "A Tu Propio Ritmo", "Avanza según tu disponibilidad de tiempo y compatibiliza tus estudios con tus labores profesionales.")}
${beneficioItem(SVG_CALENDARIO, "Certificado Verificable con QR", `Respaldo institucional de ${curso.horas} horas académicas para postular a mejores oportunidades laborales.`)}
</div>`
  );
}

function objetivoBloque(curso) {
  return seccion(
    SVG_DIANA,
    "Objetivo y Público",
    `<p style="font-size: 1.02rem; line-height: 1.6; color: var(--azul-oscuro); margin-bottom: 16px;">
<strong>${curso.objetivoTitulo}</strong> ${curso.objetivo}
</p>
<div style="background: var(--fondo); border-left: 4px solid var(--azul); padding: 14px 18px; border-radius: 0 var(--radio-sm) var(--radio-sm) 0;">
<strong style="color: var(--azul); display: block; margin-bottom: 4px;">¿A quién está dirigido?</strong>
<p style="margin: 0; font-size: 0.92rem; color: var(--gris);">
${curso.publico}
</p>
</div>`
  );
}

function egresadoBloque(curso) {
  if (!curso.egresado) return "";
  const items = curso.egresado.items
    .map((t) => `<div class="competencia-item">
<span class="competencia-check" aria-hidden="true">${SVG_CHECK}</span>
<span>${t}</span>
</div>`)
    .join("\n");
  return seccion(
    SVG_BIRRETE,
    "Competencias del Egresado",
    `<p style="margin-bottom: 18px; color: var(--gris); font-size: 0.95rem;">
${curso.egresado.intro}
</p>
<div class="competencias-grid">
${items}
</div>`
  );
}

function temarioModulo(modulo) {
  return `<details class="temario-modulo"${modulo.abierto ? " open" : ""}>
<summary>
<div class="temario-header-left">
<span class="badge-modulo-num">${modulo.badge}</span>
<span class="modulo-titulo">${modulo.titulo}</span>
</div>
<span class="modulo-arrow">${SVG_FLECHA_ABAJO}</span>
</summary>
<ul class="modulo-lista">
${modulo.html}
</ul>
</details>`;
}

function temarioBloque(curso) {
  return seccion(
    SVG_LIBRO_TAG,
    "Plan de Estudios Modular",
    `<p style="margin-bottom: 20px; color: var(--gris); font-size: 0.94rem;">
${curso.temarioIntro}
</p>
${curso.modulos.map(temarioModulo).join("\n\n")}`
  );
}

function metodologiaBloque(curso) {
  return seccion(
    SVG_INFO,
    "Metodología de Aprendizaje",
    `<p style="color: var(--gris); font-size: 0.95rem; line-height: 1.6;">
${curso.metodologiaIntro}
</p>
<div class="metodologia-steps">
<div class="step-card">
<div class="step-numero">1</div>
<h4>Estudia a tu ritmo</h4>
<p>Mira las sesiones grabadas de alta definición y descarga las diapositivas y manuales.</p>
</div>
<div class="step-card">
<div class="step-numero">2</div>
<h4>Aplica lo aprendido</h4>
<p>Revisa casos de estudio reales de plantas alimentarias y plantillas de trabajo.</p>
</div>
<div class="step-card">
<div class="step-numero">3</div>
<h4>Certifícate</h4>
<p>Rinde tu evaluación final en la plataforma virtual y recibe tu certificado digital oficial con QR.</p>
</div>
</div>
<div style="margin-top: 20px; padding: 14px 18px; background: var(--fondo); border-radius: var(--radio-sm); font-size: 0.88rem; color: var(--gris); display: flex; align-items: flex-start; gap: 10px;">
<span style="color: var(--azul); flex-shrink: 0; margin-top: 2px;">
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
</span>
<span><strong>Requisitos de Aprobación:</strong> Para obtener el <em>Certificado de Aprobación</em> se requiere una calificación mínima de <strong>14 puntos</strong> en la evaluación final. En caso contrario, se expedirá el <em>Certificado de Participación</em> por las horas académicas correspondientes.</span>
</div>`
  );
}

function pagosBloque(curso, ruta) {
  const waExtranjero = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola, deseo matricularme al ${curso.waCorto} desde el extranjero`)}`;
  return `<article class="ficha-seccion" id="medios-pago">
<div class="ficha-seccion-header">
<span class="seccion-tag" aria-hidden="true">${SVG_TARJETA}</span>
<h2>Medios de Pago y Matrícula</h2>
</div>
<p style="color: var(--gris); font-size: 0.93rem; margin-bottom: 20px;">
Elige la opción que más te acomode para realizar tu inversión:
</p>
<div class="pagos-grid-moderno">
<div class="pago-card">
<div class="pago-card-top">
<div class="pago-card-logos">
<img src="${ruta}assets/img/pagos/yape-logo.webp" alt="Yape" class="pago-logo-yape">
<img src="${ruta}assets/img/pagos/plin-logo.webp" alt="Plin" class="pago-logo-plin">
</div>
<span class="pago-badge">Sin comisión</span>
</div>
<h4>Yape / Plin</h4>
<p>Transfiere de forma inmediata desde tu app móvil. Titular: <strong>Claudia Rubio Jiménez</strong></p>
<div class="pago-copiable">
<span>+51 971 625 142</span>
<button type="button" class="btn-copiar" data-copiar="971625142">${SVG_BTN_COPIAR}Copiar</button>
</div>
</div>
<div class="pago-card">
<div class="pago-card-top">
<div class="pago-card-logos">
<img src="${ruta}assets/img/pagos/bbva-logo.webp" alt="BBVA" class="pago-logo-bbva">
</div>
<span class="pago-badge">Banca Móvil</span>
</div>
<h4>Transferencia BBVA</h4>
<p>Cuenta Ahorros Soles (vía app móvil). Titular: <strong>Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.</strong></p>
<div class="pago-copiable" style="margin-bottom: 6px;">
<span style="font-size: 0.82rem;">0011-0900-0200684705</span>
<button type="button" class="btn-copiar" data-copiar="0011-0900-0200684705">${SVG_BTN_COPIAR}Copiar</button>
</div>
<div class="pago-copiable">
<span style="font-size: 0.78rem;">CCI: 011-900-000200684705-83</span>
<button type="button" class="btn-copiar" data-copiar="011-900-000200684705-83">${SVG_BTN_COPIAR}Copiar CCI</button>
</div>
</div>
<div class="pago-card">
<div class="pago-card-top">
<div class="pago-card-logos">
<img src="${ruta}assets/img/pagos/paypal-logo.webp" alt="PayPal">
<img src="${ruta}assets/img/pagos/western-union-logo.webp" alt="Western Union" class="pago-logo-wu">
</div>
<span class="pago-badge">Internacional</span>
</div>
<h4>Extranjero (US$ ${curso.usd})</h4>
<p>Paga fácilmente desde cualquier país mediante PayPal o giro Western Union.</p>
<div style="margin-top: auto;">
<a href="${waExtranjero}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="width: 100%; justify-content: center;">
${SVG_BTN_ENVIO}Solicitar link de PayPal / WU
</a>
</div>
</div>
<div class="pago-card">
<div class="pago-card-top">
<div class="pago-card-logos">
<img src="${ruta}assets/img/pagos/culqi-logo.webp" alt="Culqi" class="pago-logo-culqi">
</div>
<span class="pago-badge">Tarjetas de Débito/Crédito</span>
</div>
<h4>Pago Online con Tarjeta</h4>
<p>Acepta Visa, Mastercard, Diners y Amex con procesamiento seguro e instantáneo.</p>
<div style="margin-top: auto;">
<a class="btn btn-culqi btn-sm" href="#" aria-disabled="true" style="width: 100%; justify-content: center;">
${SVG_BTN_TARJETA}Pagar Online con Culqi
</a>
</div>
</div>
</div>
<div class="pago-qr-destacado">
<div class="pago-qr-img-wrap">
<a href="${ruta}assets/img/qr-pago-bbva.webp" target="_blank" rel="noopener" title="Clic para ver afiche completo">
<img src="${ruta}assets/img/qr-pago-bbva-zoom.webp" alt="QR oficial de pago BBVA Proinocuidad">
</a>
</div>
<div class="pago-qr-info">
<h4>¿Prefieres escanear el QR?</h4>
<p>Abre tu aplicación bancaria o billetera digital favorita (<strong>Yape, Plin o BBVA</strong>) y escanea directamente este código para realizar tu abono en segundos.</p>
<div class="pago-titular-pill">
<span class="titular-label">Titular de la cuenta:</span>
<strong>Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.</strong>
</div>
<div class="nota-banco">
${SVG_AVISO}
<strong>Aviso bancario:</strong> La cuenta BBVA aplica sin comisión únicamente para transferencias móviles. En caso de realizar abono en ventanilla bancaria o agente físico fuera de Trujillo, considerar adicionar S/ 7.50 por comisión interplaza.
</div>
</div>
</div>
</article>`;
}

function inscripcionBloque(curso) {
  const waInscripcion = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola, acabo de enviar mi inscripción al ${curso.waCorto}`)}`;
  return seccion(
    SVG_PORTAPAPEL,
    "¿Cómo formalizar tu inscripción?",
    `<ol style="padding-left: 20px; color: var(--grafito); font-size: 0.95rem; line-height: 1.8;">
<li>Efectúa tu pago correspondiente mediante cualquiera de los medios oficiales de Proinocuidad señalados arriba.</li>
<li>Completa el formulario de inscripción adjuntando tu comprobante o voucher de pago.</li>
<li>Envíanos un mensaje a nuestro WhatsApp <a href="${waInscripcion}" target="_blank" rel="noopener"><strong>+51 981 365 982</strong></a> para la confirmación y habilitación inmediata de tu usuario en el Aula Virtual.</li>
</ol>`
  );
}

function formInscripcionBloque(curso) {
  return `<article class="ficha-seccion" id="form-inscripcion">
<div class="ficha-seccion-header">
<span class="seccion-tag" aria-hidden="true">${SVG_DOC}</span>
<h2>Formulario de Inscripción</h2>
</div>
<form class="form-inscripcion" action="https://formsubmit.co/administracion@proinocuidad.com" method="POST" enctype="multipart/form-data">
<input type="hidden" name="_subject" value="Inscripción web — ${curso.miga}">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_captcha" value="false">
<input type="text" name="_honey" class="campo-honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="form-fila">
<label>Curso
<input type="text" name="curso" value="${curso.h1}" readonly>
</label>
</div>
<div class="form-grid">
<label>Nombre y apellidos
<input type="text" name="nombre" required autocomplete="name" placeholder="Ej.: María Torres Quispe">
</label>
<label>DNI
<input type="text" name="dni" required inputmode="numeric" autocomplete="off" pattern="[0-9]{8}" maxlength="8" title="El DNI tiene 8 dígitos." placeholder="8 dígitos">
</label>
<label>
<span class="label-tit">Empresa/Institución <span class="opcio-campo">(opcional)</span></span>
<input type="text" name="empresa" autocomplete="organization" placeholder="Ej.: Conservas del Norte S.A.C.">
</label>
<label>
<span class="label-tit">Cargo/Ocupación <span class="opcio-campo">(opcional)</span></span>
<input type="text" name="cargo" placeholder="Ej.: Jefa de Calidad">
</label>
<label>Celular
<span class="campo-con-prefijo"><span class="prefijo" aria-hidden="true">+51</span>
<input type="tel" name="celular" required autocomplete="tel" pattern="[0-9]{9}" maxlength="9" title="El celular peruano lleva 9 dígitos que empiezan en 9." placeholder="999 999 999">
</span>
</label>
<label>Correo
<input type="email" name="correo" required autocomplete="email" placeholder="correo@ejemplo.com">
</label>
<label>País
<select name="pais" autocomplete="country-name">
<option value="Perú" selected>Perú</option>
<option value="Extranjero">Extranjero</option>
</select>
</label>
<label>Enviar Comprobante De Pago
<input type="file" name="voucher" accept="image/*,.pdf" required>
</label>
</div>
<label class="form-check">
<input type="checkbox" name="desea_comprobante" value="si">
Deseo comprobante de pago
</label>
<fieldset class="form-tipo-comp" hidden>
<legend>Tipo de comprobante</legend>
<label class="form-check"><input type="radio" name="tipo_comprobante" value="boleta" checked> Boleta</label>
<label class="form-check"><input type="radio" name="tipo_comprobante" value="factura"> Factura</label>
<div class="form-grid form-factura" hidden>
<label>RUC (11 dígitos)
<input type="text" name="ruc" inputmode="numeric" maxlength="11">
</label>
<label>Razón social
<input type="text" name="razon_social">
</label>
</div>
<p class="campo-error" hidden></p>
</fieldset>
<label class="form-check">
<input type="checkbox" name="conformidad" required>
El envío de este formulario representa la conformidad con los datos registrados, así como la aceptación de la modalidad de pago, las reglas y políticas de Proinocuidad.
</label>
<button class="btn btn-rojo" type="submit">${SVG_BTN_ENVIO}Enviar inscripción</button>
</form>
</article>`;
}

function sidebar(curso, ruta) {
  const esDiplomado = curso.tipo === "diplomado";
  const etiqueta = esDiplomado ? "Diplomado Oficial" : "Curso Oficial";
  const incluyeTitulo = esDiplomado ? "Este Diplomado incluye:" : "Este Curso incluye:";
  const waInfo = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola, deseo más información y matricularme en ${curso.waLargo}`)}`;
  const waFactura = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola, tengo consultas sobre la facturación del ${curso.waCorto}`)}`;
  const incluyeItems = curso.incluye
    .map((t) => `<li>
${SVG_CHECK_GRANDE}
<span>${t}</span>
</li>`)
    .join("\n");
  return `<aside class="ficha-sidebar">
<div class="card-matricula">
<div class="card-matricula-flyer">
<img src="${ruta}assets/img/${curso.flyer}" alt="Flyer ${curso.waCorto} Proinocuidad">
<span class="flyer-tag">${etiqueta}</span>
</div>
<div class="card-matricula-body">
<div class="precios-wrapper">
<div class="precio-fila">
<div class="precio-etiqueta">
Precio Perú
<small>Pago único · No incluye IGV</small>
</div>
<div class="precio-numero">S/ ${curso.pen}</div>
</div>
<div class="precio-fila">
<div class="precio-etiqueta">
Internacional
<small>PayPal / Western Union</small>
</div>
<div class="precio-numero" style="color: var(--azul);">US$ ${curso.usd}</div>
</div>
</div>
<div class="matricula-cta-group">
<a class="btn btn-rojo" href="#form-inscripcion">
${SVG_BTN_EDITAR}Matricularme Ahora
</a>
<a class="btn btn-whatsapp" href="${waInfo}" target="_blank" rel="noopener">
${SVG_WA}
Consultar por WhatsApp
</a>
</div>
<div class="matricula-incluye">
<h4>${incluyeTitulo}</h4>
<ul>
${incluyeItems}
</ul>
</div>
</div>
</div>
<div class="card-asesoria-sidebar">
<div style="width: 50px; height: 50px; border-radius: 50%; background: var(--azul-claro); color: var(--azul); display: grid; place-items: center; margin: 0 auto 12px;">
${SVG_ASESOR}
</div>
<h4>¿Tienes dudas o requieres factura?</h4>
<p>Nuestro equipo de asesoría académica está disponible para atender requerimientos corporativos o facturas con RUC.</p>
<a href="${waFactura}" target="_blank" rel="noopener" class="btn btn-borde btn-sm" style="width: 100%; justify-content: center;">
${SVG_BTN_SOPORTE}Contactar Asesor
</a>
</div>
</aside>`;
}

function cuerpoModerno(curso, ruta) {
  return `<div class="ficha-layout">
<div class="ficha-main-col">
${statsGrid(curso)}
${beneficiosBloque(curso)}
${objetivoBloque(curso)}
${egresadoBloque(curso)}
${temarioBloque(curso)}
${metodologiaBloque(curso)}
${pagosBloque(curso, ruta)}
${inscripcionBloque(curso)}
${formInscripcionBloque(curso)}
</div>
${sidebar(curso, ruta)}
</div>`;
}

/* ---------- maqueta de la ficha ---------- */

function jsonLdCurso(curso) {
  const datos = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: curso.h1,
    description: curso.desc,
    url: `https://proinocuidad.com/cursos/${curso.slug}/`,
    provider: {
      "@type": "Organization",
      name: "Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.",
      url: "https://proinocuidad.com/",
    },
    courseMode: "Asíncrono (grabado)",
    timeRequired: `PT${curso.horas}H`,
    offers: [
      { "@type": "Offer", price: String(curso.pen), priceCurrency: "PEN" },
      { "@type": "Offer", price: String(curso.usd), priceCurrency: "USD" },
    ],
  };
  return JSON.stringify(datos, null, 2);
}

/* ---------- chrome compartido entre fichas y la pagina 404 ----------
   Dos prefijos, porque significan cosas distintas:
     ruta   = camino hasta la RAIZ del sitio  ("../../" en fichas, "" en 404)
     cursos = camino hasta cursos/index.html  ("../" en fichas, "cursos/" en 404)
   Un solo origen para la navegacion, para que un cambio de menu no se desincronice. */
function cabecera(ruta, cursos) {
  return `<div class="topbar">
<div class="container">
<span>
Contacto:
<a href="${waContacto}" target="_blank" rel="noopener">+51 981 365 982</a>
&nbsp;·&nbsp;
<a href="mailto:administracion@proinocuidad.com">administracion@proinocuidad.com</a>
&nbsp;·&nbsp;
RUC: <strong>20615307603</strong>
</span>
<ul class="topbar-social">
<li><a href="https://www.facebook.com/share/16XUyQ5JDR/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a></li>
<li><a href="https://www.youtube.com/@proinocuidad" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></li>
<li><a href="https://www.instagram.com/proinocuidad" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a></li>
<li><a href="https://www.linkedin.com/company/proinocuidad/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
</ul>
</div>
</div>

<header class="site-header">
<nav class="navbar container" aria-label="Navegación principal">
<a class="brand" href="${ruta}index.html" aria-label="Proinocuidad — inicio">
<img src="${ruta}assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad">
</a>
<button class="nav-toggle" aria-expanded="false" aria-label="Abrir menú" aria-controls="menu-principal">
<span class="hamburger" aria-hidden="true"></span>
</button>
<ul class="nav-menu" id="menu-principal">
<li><a href="${ruta}index.html">Inicio</a></li>
<li><a href="${ruta}nosotros/index.html">Nosotros</a></li>
<li class="nav-drop">
<a href="${ruta}servicios/index.html" aria-haspopup="true" aria-expanded="false">Servicios</a>
<button class="nav-accordion-toggle" type="button" aria-expanded="false" aria-controls="submenu-servicios" aria-label="Mostrar opciones de Servicios"><span aria-hidden="true">+</span></button>
<div class="mega-panel mega-panel-compacto" id="submenu-servicios" role="menu">
<div class="mega-panel-inner">
<a href="${ruta}servicios/index.html#capacitacion-empresarial"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4"/><path d="M18 14.2c2.3.7 3.5 2.6 3.5 5.8"/></svg></span><strong>Capacitación Empresarial</strong><span>Programas in house, cursos y diplomados a medida.</span></a>
<a href="${ruta}servicios/index.html#normativa-sanitaria"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14l2 2 4-4"/></svg></span><strong>Implementación de normativa sanitaria</strong><span>PPH y Validación Técnica Oficial del Plan HACCP.</span></a>
<a href="${ruta}servicios/index.html#sistemas-gestion"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.2 7 21l5-2.6 5 2.6-1.5-6.8"/></svg></span><strong>Sistemas de gestión</strong><span>ISO 9001, ISO 22000, FSSC 22000 y BRCGS FOOD.</span></a>
<a href="${ruta}servicios/index.html#registro-sanitario"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><path d="M9 13.5l2 2 4-4"/></svg></span><strong>Registro sanitario</strong><span>Alimentos y bebidas en el menor tiempo posible.</span></a>
<a class="mega-cta" href="${ruta}servicios/index.html"><strong>Ver todos los servicios</strong><span aria-hidden="true">→</span></a>
</div>
</div>
</li>
<li class="nav-drop">
<a href="${cursos}index.html" aria-haspopup="true" aria-expanded="false">Cursos</a>
<button class="nav-accordion-toggle" type="button" aria-expanded="false" aria-controls="submenu-cursos" aria-label="Mostrar opciones de Cursos"><span aria-hidden="true">+</span></button>
<div class="mega-panel mega-panel-compacto" id="submenu-cursos" role="menu">
<div class="mega-panel-inner">
<a href="${cursos}diplomado-gestion-calidad-e-inocuidad/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg></span><strong>Diplomado SGCIA</strong><span>Calidad e Inocuidad en la Industria Alimentaria · 384 h</span></a>
<a href="${cursos}legislacion-sanitaria-alimentos/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M6 21h12"/><path d="M4 7h16"/><path d="M4 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/><path d="M20 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/></svg></span><strong>Legislación Sanitaria de Alimentos</strong><span>Marco normativo nacional e internacional · 40 h</span></a>
<a href="${cursos}haccp-implementacion-certificacion-digesa-senasca/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span><strong>HACCP: certificación en Perú</strong><span>DIGESA / SENASA · 40 h</span></a>
<a href="${cursos}formacion-auditor-interno-haccp/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M8 11l2 2 4-4"/></svg></span><strong>Auditor Interno HACCP</strong><span>Formación de auditores · 40 h</span></a>
<a class="mega-cta" href="${cursos}index.html"><strong>Ver todos los cursos</strong><span aria-hidden="true">→</span></a>
</div>
</div>
</li>
<li><a href="${ruta}noticias/index.html">Noticias</a></li>
<li><a class="btn-aula-nav" href="https://proinocuidad.com/login/" target="_blank" rel="noopener">${SVG_BTN_AULA}Aula Virtual</a></li>
</ul>
</nav>
</header>`;
}

function pie(ruta, cursos) {
  return `<footer class="site-footer">
<div class="container footer-grid">
<div class="footer-brand">
<img src="${ruta}assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad">
<p><strong>Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.</strong></p>
<p>¡Formamos profesionales, construimos inocuidad!</p>
<p>RUC 20615307603 · Trujillo, La Libertad, Perú</p>
</div>
<div class="footer-contacto">
<h4>Contacto</h4>
<ul>
<li><strong>Contacto:</strong> <a href="${waContacto}" target="_blank" rel="noopener">+51 981 365 982</a></li>
<li><strong>Correo:</strong> <a href="mailto:administracion@proinocuidad.com">administracion@proinocuidad.com</a></li>
<li><strong>Horario de atención:</strong> Lunes a viernes de 8 AM a 8 PM</li>
<li><strong>Ubicación:</strong> Trujillo, La Libertad, Perú</li>
</ul>
</div>
<div class="footer-links">
<h4>Enlaces</h4>
<ul>
<li><a href="${ruta}index.html">Inicio</a></li>
<li><a href="${ruta}nosotros/index.html">Nosotros</a></li>
<li><a href="${ruta}servicios/index.html">Servicios</a></li>
<li><a href="${cursos}index.html">Cursos</a></li>
<li><a href="${ruta}noticias/index.html">Noticias y eventos</a></li>
<li><a href="https://proinocuidad.com/login/" target="_blank" rel="noopener">Aula Virtual</a></li>
</ul>
</div>
<div>
<h4>Síguenos</h4>
<div class="redes-sociales">
<a href="https://www.facebook.com/share/16XUyQ5JDR/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
<a href="https://www.youtube.com/@proinocuidad" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
<a href="https://www.instagram.com/proinocuidad" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
<a href="https://www.linkedin.com/company/proinocuidad/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
<a href="https://chat.whatsapp.com/GXh0wdFZWgEGz2dlpCTPvN" target="_blank" rel="noopener" aria-label="Comunidad WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
</div>
</div>
</div>
<div class="footer-bottom">
<div class="container">
<span>© 2026 Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L. Todos los derechos reservados.</span>
<span>Comprometidos con la salud pública y la inocuidad alimentaria.</span>
</div>
</div>
</footer>`;
}

function cierre(ruta) {
  return `<a class="flotante-whatsapp" href="${waFlotante}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg><span class="flotante-texto">Envíanos un mensaje!</span></a>
<a class="to-top-proi" href="#" aria-label="Volver arriba"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></a>

<script src="${ruta}assets/js/main.js"></script>`;
}

function ficha(curso) {
  const ruta = "../../";    // hasta la raiz del sitio
  const cursos = "../";      // hasta cursos/index.html
  const url = `https://proinocuidad.com/cursos/${curso.slug}/`;
  const tituloFicha = curso.seoTitle || (/Proinocuidad/.test(curso.title) ? curso.title : `${curso.title} | Proinocuidad`);
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tituloFicha}</title>
<meta property="og:title" content="${tituloFicha.replace(/"/g, "&quot;")}">
<meta property="og:image" content="${img_og}">
<meta property="og:url" content="${url}">
<meta name="description" content="${curso.seoDesc || curso.desc}">
<link rel="canonical" href="${url}">
<script type="application/ld+json">
${jsonLdCurso(curso)}
</script>
<link rel="icon" href="${ruta}assets/img/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="${ruta}assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="${ruta}assets/css/main.css">
</head>
<body>

${cabecera(ruta, cursos)}

<main>
<section class="ficha-head" style="background-image: linear-gradient(rgba(11, 14, 86, 0.72), rgba(11, 14, 86, 0.55)), url('${ruta}assets/img/${curso.fondo}')">
<div class="container">
<nav class="breadcrumbs" aria-label="Migajas de pan">
<a href="${ruta}index.html">Inicio</a> <span aria-hidden="true">/</span> <a href="${cursos}index.html">Cursos</a> <span aria-hidden="true">/</span> <span>${curso.miga}</span>
</nav>
<h1>${curso.h1}</h1>
<p class="ficha-desc">${curso.descripcion}</p>
</div>
</section>

<div class="container ficha-cuerpo">
${cuerpoModerno(curso, ruta)}
</div>
</main>

${pie(ruta, cursos)}

${cierre(ruta)}
</body>
</html>
`;
}

/* ---------- pagina de error (spec `pagina-404`) ----------
   Vive en la raiz, asi que sus dos prefijos son distintos de los de las fichas.
   No se declara en el menu: no es una pagina a la que se navegue. */
function pagina404() {
  const ruta = "";            // ya estamos en la raiz del sitio
  const cursos = "cursos/";   // y el directorio de cursos cuelga de ella
  const url = "https://proinocuidad.com/404.html";
  const titulo = "Página no encontrada | Proinocuidad";
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo}</title>
<meta name="robots" content="noindex, follow">
<meta property="og:title" content="${titulo}">
<meta property="og:url" content="${url}">
<meta name="description" content="La página solicitada no existe en Proinocuidad. Vuelve al inicio o escríbenos por WhatsApp.">
<link rel="canonical" href="${url}">
<link rel="icon" href="${ruta}assets/img/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="${ruta}assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="${ruta}assets/css/main.css">
</head>
<body>

${cabecera(ruta, cursos)}
<main>
  <section class="hero" aria-labelledby="error404-titulo">
    <div class="container">
      <h1 id="error404-titulo">404 · Esta página no existe</h1>
      <p>
        La dirección que abriste no corresponde a ninguna página de Proinocuidad.
        Puede que el enlace esté mal escrito o que la página haya cambiado de sitio.
      </p>
      <div class="hero-acciones">
        <a class="btn btn-blanco" href="${ruta}index.html">${SVG_BTN_CASA}Volver al inicio</a>
        <a class="btn btn-rojo" href="${waContacto}" target="_blank" rel="noopener">${SVG_WA}Escríbenos por WhatsApp</a>
        <a class="btn btn-blanco" href="${cursos}index.html">${SVG_BTN_CURSOS}Ver los cursos</a>
        <a class="btn btn-blanco" href="${ruta}servicios/index.html">${SVG_BTN_SERVICIOS}Ver los servicios</a>
      </div>
    </div>
  </section>

  <section class="cta-sub" aria-labelledby="ayuda404-titulo">
    <div class="container">
      <h2 id="ayuda404-titulo">¿No encuentras lo que buscabas?</h2>
      <p>Estas son las otras secciones del sitio. Si de verdad falta algo, escríbenos y lo Publicamos.</p>
      <div class="hero-acciones">
        <a class="btn btn-blanco" href="${ruta}nosotros/index.html">${SVG_BTN_NOSOTROS}Nosotros</a>
        <a class="btn btn-blanco" href="${ruta}noticias/index.html">${SVG_BTN_NOTICIAS}Noticias y eventos</a>
        <a class="btn btn-blanco" href="${ruta}inocuidad-alimentaria/index.html">${SVG_BTN_INOCUIDAD}Inocuidad alimentaria</a>
      </div>
    </div>
  </section>
</main>

${pie(ruta, cursos)}

${cierre(ruta)}
</body>
</html>
`;
}

/* ---------- fichas (contenido propio por curso) ---------- */

const DIPLOMADO = {
  tipo: "diplomado",
  slug: "diplomado-gestion-calidad-e-inocuidad",
  horas: 384,
  pen: 120,
  usd: 37,
  estructura: "6 Módulos Clave",
  flyer: "flyer-curso-01-diplomado-sgcia.webp",
  waCorto: "Diplomado de Calidad e Inocuidad",
  waLargo: "el Diplomado de Gestión de la Calidad e Inocuidad",
  title: "Diplomado de Especialización: Gestión de la Calidad e Inocuidad en la Industria Alimentaria | Proinocuidad",
  seoTitle: "Diplomado en gestión de calidad e inocuidad | Proinocuidad",
  seoDesc: "Diplomado de 6 sesiones asíncronas en gestión de la calidad e inocuidad: HACCP, ISO 9001, ISO 22000 y BRCGS. Certificado digital con QR.",
  desc:
    "Diplomado asíncrono (grabado) de 384 horas académicas en 6 sesiones: programas prerrequisitos, HACCP, ISO 9001, ISO 22000, BRCGS V9 y auditoría de sistemas integrados. Certificado digital con QR y aula virtual permanente.",
  fondo: "ficha-diplomado.avif",
  miga: "Diplomado",
  descripcion:
    "Desarrollar competencias para implementar y auditar sistemas de gestión de calidad e inocuidad alimentaria basados en HACCP, ISO 9001, ISO 22000 y BRCGS.",
  h1: "Diplomado de Especialización: “Gestión de la Calidad e Inocuidad en la Industria Alimentaria”",
  objetivoTitulo: "Objetivo General:",
  objetivo:
    "Desarrollar competencias sólidas para diseñar, implementar, mantener y auditar sistemas integrados de gestión de calidad e inocuidad alimentaria bajo los estándares más exigentes: <strong>HACCP, ISO 9001, ISO 22000 y BRCGS Food Safety</strong>.",
  publico:
    "Profesionales, supervisores y técnicos de plantas de alimentos, jefes de control y aseguramiento de la calidad (QA/QC), auditores internos, consultores, docentes y estudiantes de últimos ciclos de Ingeniería de Industrias Alimentarias, Agroindustrial, Biología, Química, Nutrición y carreras afines.",
  egresado: {
    intro: "Al culminar con éxito este diplomado, estarás plenamente capacitado para:",
    items: [
      "Implementar y liderar sistemas de gestión de calidad e inocuidad en empresas del sector agroalimentario.",
      "Diseñar y fiscalizar Programas Prerrequisitos (BPM, POE y POES) según normativa vigente.",
      "Elaborar, validar y actualizar planes HACCP adaptados a diversos procesos industriales.",
      "Interpretar y articular con solidez las cláusulas de las normas <strong>ISO 9001:2015</strong> e <strong>ISO 22000:2018</strong>.",
      "Aplicar los requisitos fundamentales del estándar global <strong>BRCGS Food Safety V.9</strong>.",
      "Planificar y ejecutar auditorías internas de sistemas integrados bajo la directriz <strong>ISO 19011</strong>.",
    ],
  },
  temarioIntro: "Programa estructurado en 6 módulos exhaustivos con enfoque técnico y normativo de vanguardia:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Contexto Nacional e Internacional de la Calidad e Inocuidad",
      abierto: false,
      html: `<li>Contexto de la Inocuidad Global y cadenas de suministro alimentarias.</li>
<li>Enfermedades Transmitidas por Alimentos (ETAS) y su impacto en salud pública.</li>
<li>Organismos reguladores en el Perú (DIGESA, SANIPES, SENASA) y rol de la COMPIAL.</li>
<li>Regulación Nacional vs. Codex Alimentarius (Directrices internacionales).</li>
<li>Exigencias para exportación: FDA (EE.UU.) y Unión Europea.</li>
<li>Principios Generales de Higiene de los Alimentos CAC/RCP 1-1969 (Revisión y actualización 2022).</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "Programas Prerrequisitos del Sistema HACCP (BPM, POE y POES)",
      abierto: false,
      html: `<li>Buenas Prácticas de Manufactura como cimiento indispensable para ISO 22000 y BRCGS.</li>
<li>Infraestructura, diseño higiénico de instalaciones, líneas y utensilios.</li>
<li>Higiene del personal, estado de salud y programas de capacitación continua.</li>
<li>MIP: Manejo Integrado y Control de Plagas.</li>
<li>Mantenimiento preventivo, calibración de equipos y calidad microbiológica/fisicoquímica del agua.</li>
<li>Prevención rigurosa de la contaminación cruzada física, química y biológica.</li>
<li>Elaboración, implementación y validación de POE y POES en planta.</li>`,
    },
    {
      badge: "MÓDULO III",
      titulo: "Sistema HACCP: Análisis de Peligros y Puntos Críticos de Control",
      abierto: false,
      html: `<li>Fundamentos y los 7 principios del Sistema HACCP.</li>
<li>Los 5 pasos preliminares: Equipo multidisciplinario, descripción técnica del producto, uso previsto, diagramas de flujo y confirmación in situ.</li>
<li>Metodología de Análisis de Peligros y determinación de significancia.</li>
<li>Árbol de decisiones para identificación certera de PCC (Puntos Críticos de Control).</li>
<li>Establecimiento de Límites Críticos y sistemas de vigilancia operativa continua.</li>
<li>Diseño de acciones correctoras inmediatas y planes de contingencia.</li>
<li>Procedimientos de verificación, validación técnica y sistema documental y de registros.</li>`,
    },
    {
      badge: "MÓDULO IV",
      titulo: "Sistemas de Gestión de Calidad e Inocuidad (ISO 9001 e ISO 22000)",
      abierto: false,
      html: `<li><strong>ISO 9001:2015 e ISO 22000:2018 (Estructura de Alto Nivel y Visión Integrada):</strong>
<ul class="modulo-sublista">
<li>Enfoque basado en procesos y pensamiento basado en riesgos integrales.</li>
<li>Sinergia entre satisfacción del cliente e inocuidad alimentaria garantizada.</li>
</ul>
</li>
<li><strong>Elementos clave de la norma ISO 22000:</strong>
<ul class="modulo-sublista">
<li>Programas Prerrequisito Operativos (PPRO) vs. PCC.</li>
<li>Comunicación interactiva a lo largo de la cadena alimentaria.</li>
</ul>
</li>
<li><strong>Evolución y tendencias normativas:</strong> cambios proyectados en las normas internacionales hacia 2026.</li>`,
    },
    {
      badge: "MÓDULO V",
      titulo: "Norma BRCGS Estándar Global de Seguridad Alimentaria (Versión 9)",
      abierto: false,
      html: `<li>Introducción y alcance del esquema GFSI mediante BRCGS Food Safety V.9.</li>
<li>Requisitos fundamentales y cláusulas de no conformidad crítica.</li>
<li>Liderazgo, compromiso de la dirección y fortalecimiento de la <strong>Cultura de Inocuidad</strong>.</li>
<li>Plan de seguridad alimentaria y gestión de proveedores de materias primas/empaques.</li>
<li>Control de operaciones, estándares ambientales de las instalaciones e inspección de procesos.</li>
<li>Gestión de alérgenos, defensa alimentaria (Food Defense) y prevención del fraude alimentario (Food Fraud).</li>`,
    },
    {
      badge: "MÓDULO VI",
      titulo: "Auditoría de Sistemas Integrados de Gestión (ISO 19011)",
      abierto: false,
      html: `<li>Principios de auditoría y directrices según la norma ISO 19011.</li>
<li>Perfil, competencias, ética y habilidades de comunicación del auditor líder e interno.</li>
<li>Planificación, programa de auditoría y elaboración de listas de verificación eficaces.</li>
<li>Técnicas de muestreo, entrevista y recopilación de evidencias objetivas.</li>
<li>Redacción de no conformidades, hallazgos de auditoría e informe final.</li>
<li>Cierre de acciones correctivas, seguimiento de la eficacia y tendencias ISO 19011:2026.</li>`,
    },
  ],
  metodologiaIntro:
    "El diplomado se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "6 módulos temáticos especializados",
    "Material descargable (libros y manuales)",
    "Plantillas de registros y formatos de auditoría",
    "Certificado digital con código QR (384 horas)",
  ],
};

/* ---------- resto de cursos ---------- */

const LEGISLACION = {
  tipo: "curso",
  slug: "legislacion-sanitaria-alimentos",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-02-legislacion-sanitaria.webp",
  waCorto: "Curso de Legislación Sanitaria",
  waLargo: "el Curso de Legislación Sanitaria de Alimentos Nacional e Internacional",
  title: "Curso: Legislación Sanitaria de Alimentos Nacional e Internacional | Proinocuidad",
  seoTitle: "Legislación sanitaria de alimentos | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones sobre la normativa sanitaria de alimentos en el Perú y el marco internacional. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: marco normativo sanitario peruano (DL 1062, DS 007-98, RM 591-2008, entre otras) y normativa internacional (Codex Alimentarius, Estados Unidos). Certificado digital con QR.",
  fondo: "ficha-legislacion.avif",
  miga: "Legislación sanitaria",
  descripcion:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",
  h1: "Curso: “Legislación Sanitaria de Alimentos Nacional e Internacional”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",
  publico:
    "Dirigido a profesionales, técnicos y estudiantes de últimos ciclos vinculados a la industria alimentaria: responsables de calidad e inocuidad, supervisores de producción, personal de control de calidad, consultores, auditores internos, docentes y emprendedores del sector alimentos y bebidas.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "1. Aspectos generales · 2. Marco nacional",
      abierto: false,
      html: `<li>1. Aspectos generales</li>
<li><strong>2. Marco nacional</strong></li>
<li>2.1. Ley de Inocuidad de los alimentos - DL 1062-2008.</li>
<li>2.2. Reglamento de la Ley de Inocuidad de los alimentos DS N° 034-2008.</li>
<li>2.3. Reglamento sobre vigilancia y control sanitario de alimentos y bebidas DS 007-98.</li>
<li>2.4. Modificatoria del DS 007-98 / DS 004-2014</li>
<li>2.5. Resolución 624-2015/MINSA Norma Sanitaria que establece la lista de alimentos de Alto Riesgo.</li>
<li>2.6. Decreto Supremo 038-2014 / MINSA</li>
<li>2.7. Norma Sanitaria para la aplicación del Sistema HACCP en la fabricación de alimentos y bebidas. Resolución Ministerial N° 449-2006 / MINSA</li>
<li>2.8. Guía técnica para el análisis microbiológico de superficies en contacto con alimentos y bebidas. Resolución Ministerial N° 461-2007 / MINSA</li>
<li>2.9. Criterios Microbiológicos de calidad sanitaria e inocuidad para los alimentos y bebidas de consumo humano. Resolución Ministerial N° 591-2008 - MINSA.</li>
<li>2.10. Reglamento de la calidad del agua para consumo humano. Decreto Supremo N° 031-2010 / MINSA.</li>
<li>2.11. Resolución Ministerial 106-2023. DS: 147 MINSA/DIGESA-2023. Rastreabilidad para la inocuidad de los alimentos.</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "3. Normativa Sanitaria internacional · 4. Talleres prácticos",
      abierto: false,
      html: `<li><strong>3. Normativa Sanitaria internacional</strong></li>
<li>3.1. Codex Alimentarius</li>
<li>3.2. Regulación sanitaria en Estados Unidos</li>
<li>3.3. Otras normativas voluntarias.</li>
<li><strong>4. Talleres prácticos</strong></li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const BPM_POES = {
  tipo: "curso",
  slug: "implementacion-auditoria-bpm-poes-poe-plan-haccp",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-03-impl-auditoria-bpm-poes-poe-haccp.webp",
  waCorto: "Curso de BPM, POES y HACCP",
  waLargo: "el Curso de Implementación y Auditoría de BPM, POES, POE y Plan HACCP",
  title: "Curso: Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP | Proinocuidad",
  seoTitle: "Curso BPM, POES y plan HACCP en Perú | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones sobre implementación y auditoría de BPM, higiene y saneamiento, POES, POE y plan HACCP. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: BPM, los POES 1 al 8, POE 1 al 9 y el Sistema HACCP con sus 7 principios y 12 pasos, con talleres prácticos. Certificado digital con QR.",
  fondo: "ficha-bpm.avif",
  miga: "BPM, POES, POE y Plan HACCP",
  descripcion:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",
  h1: "Curso: “Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",
  publico:
    "Dirigido a profesionales, técnicos y estudiantes de últimos ciclos vinculados a la industria alimentaria: responsables de calidad e inocuidad, supervisores de producción, personal de control de calidad, consultores, auditores internos, docentes y emprendedores del sector alimentos y bebidas.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Introducción a la inocuidad alimentaria, peligros y BPM",
      abierto: false,
      html: `<li>Introducción a la inocuidad alimentaria</li>
<li>Peligros en los alimentos</li>
<li>Taller de búsqueda de normas en Codex Alimentarius</li>
<li>Taller de identificación de peligros</li>
<li>Buenas Prácticas de Manufactura
<ul>
<li>Proyecto y construcción de las instalaciones</li>
<li>Control de operaciones</li>
<li>Higiene y salud del personal</li>
<li>Taller de distribución esquemática de planta</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "Higiene y Saneamiento, POES y POE",
      abierto: false,
      html: `<li><strong>Procedimientos Operativos Estandarizados de Saneamiento (POES)</strong>
<ul>
<li>POES 1: Seguridad del agua potable</li>
<li>POES 2: Superficies en contacto con alimentos</li>
<li>POES 3: Prevención de la contaminación cruzada</li>
<li>POES 4: Higiene del personal</li>
<li>POES 5: Adulteración de los alimentos</li>
<li>POES 6: Etiquetado apropiado, almacenamiento y uso de compuestos tóxicos</li>
<li>POES 7: Control de salud de los empleados</li>
<li>POES 8: Exclusión de plagas</li>
</ul>
</li>
<li>Taller práctico de identificación de POES</li>
<li><strong>Higiene y saneamiento</strong>
<ul>
<li>Definiciones</li>
<li>Tipos y métodos de limpieza</li>
<li>Agentes de limpieza y desinfectantes</li>
<li>Tipos de desinfectantes</li>
<li>Plan de higiene y saneamiento</li>
<li>Verificación y validación de limpieza y desinfección</li>
<li>Taller práctico de elaboración de procedimiento</li>
</ul>
</li>
<li><strong>Procedimientos Operativos Estandarizados (POE)</strong>
<ul>
<li>POE 1: Manejo de reclamos de clientes</li>
<li>POE 2: Trazabilidad</li>
<li>POE 3: Recuperación de productos</li>
<li>POE 4: Mantenimiento preventivo</li>
<li>POE 5: Calibración de instrumentos</li>
<li>POE 6: Capacitación</li>
<li>POE 7: Control de proveedores</li>
<li>POE 8: Control de transporte</li>
<li>POE 9: Control de documentos</li>
<li>Etiquetado e información al consumidor</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO III",
      titulo: "Sistema HACCP y auditoría",
      abierto: false,
      html: `<li>Generalidades del Sistema HACCP</li>
<li>7 principios y 12 pasos
<ul>
<li>Paso 01: Formación de un equipo encargado del HACCP.</li>
<li>Paso 02: Descripción del Producto.</li>
<li>Paso 03: Identificación del Uso Final.</li>
<li>Paso 04: Elaboración de un Diagrama de Flujo</li>
<li>Paso 05: Confirmación in situ</li>
<li>Paso 06: Análisis de peligros y determinación de las medidas para controlar los peligros identificados.</li>
<li>Paso 07: Determinación de los puntos críticos de control.</li>
<li>Paso 08: Establecimiento de límites críticos para cada punto crítico de control.</li>
<li>Paso 09: Establecimiento de un sistema de vigilancia para cada punto crítico de control.</li>
<li>Paso 10: Establecimiento de medidas correctoras.</li>
<li>Paso 11: Establecimiento de procedimientos de comprobación.</li>
<li>Paso 12: Establecimiento de un sistema de documentación y registro.</li>
</ul>
</li>
<li>Taller de identificación y evaluación de peligros</li>
<li>Taller de identificación de PCC</li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const DIGESA = {
  tipo: "curso",
  slug: "haccp-implementacion-certificacion-digesa-senasca",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-04-haccp-digesa-senasca.webp",
  waCorto: "Curso HACCP DIGESA/SENASA",
  waLargo: "el Curso de HACCP: Implementación y Certificación (DIGESA/SENASA)",
  title: "Curso de Especialización: HACCP Implementación y Certificación en Perú (DIGESA/SENASA) | Proinocuidad",
  seoTitle: "Curso HACCP DIGESA y SENASA en Perú | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones para implementar y certificar un sistema HACCP según DIGESA y SENASA en Perú. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: fundamentos de HACCP y marco normativo peruano, diseño e implementación del sistema y validación, certificación y auditoría conforme a DIGESA y SENASA.",
  fondo: "ficha-haccp.avif",
  miga: "HACCP DIGESA / SENASA",
  descripcion:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",
  h1: "Curso de Especialización: “HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",
  publico:
    "Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes; empresarios y emprendedores del sector alimentario (industria alimentaria, restaurantes y afines); estudiantes y público en general.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Fundamentos de HACCP y marco normativo peruano",
      abierto: false,
      html: `<li><strong>1. Introducción a la inocuidad alimentaria</strong>
<ul>
<li>Concepto de inocuidad vs. calidad</li>
<li>Importancia del HACCP en la industria alimentaria</li>
<li>Casos de brotes y lecciones aprendidas</li>
</ul>
</li>
<li><strong>2. Principios del sistema HACCP</strong>
<ul>
<li>Origen del HACCP (Codex Alimentarius)</li>
<li>Los 7 principios del HACCP</li>
<li>Beneficios y limitaciones del sistema</li>
</ul>
</li>
<li><strong>3. Marco normativo en Perú</strong>
<ul>
<li>Rol de DIGESA (Ministerio de Salud)</li>
<li>Rol de SENASA (sector agropecuario)</li>
<li>Normativa nacional aplicable</li>
<li>Relación con estándares internacionales (Codex Alimentarius, ISO 22000)</li>
</ul>
</li>
<li><strong>4. Programas prerrequisito (PPR)</strong>
<ul>
<li>Buenas Prácticas de Manufactura (BPM)</li>
<li>Programas de higiene y saneamiento (POES)</li>
<li>Control de proveedores y trazabilidad</li>
</ul>
</li>
<li><strong>5. Taller Práctico</strong></li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "Diseño e implementación del Sistema HACCP",
      abierto: false,
      html: `<li><strong>1. Etapas preliminares</strong>
<ul>
<li>Formación del equipo HACCP</li>
<li>Descripción del producto</li>
<li>Identificación del uso esperado</li>
<li>Elaboración y verificación del diagrama de flujo</li>
</ul>
</li>
<li><strong>2. Análisis de peligros</strong>
<ul>
<li>Tipos de peligros: biológicos, químicos y físicos</li>
<li>Evaluación de riesgos</li>
<li>Medidas de control</li>
</ul>
</li>
<li><strong>3. Determinación de PCC (Puntos Críticos de Control)</strong>
<ul>
<li>Árbol de decisiones</li>
<li>Ejemplos prácticos</li>
</ul>
</li>
<li><strong>4. Establecimiento del sistema HACCP</strong>
<ul>
<li>Límites críticos</li>
<li>Sistemas de monitoreo</li>
<li>Acciones correctivas</li>
<li>Procedimientos de verificación</li>
<li>Sistema de documentación y registros</li>
</ul>
</li>
<li><strong>5. Taller Práctico</strong></li>`,
    },
    {
      badge: "MÓDULO III",
      titulo: "Validación, certificación y auditoría HACCP",
      abierto: false,
      html: `<li><strong>1. Validación y verificación</strong>
<ul>
<li>Diferencias entre validación y verificación</li>
<li>Métodos de validación</li>
<li>Frecuencia y responsabilidades</li>
</ul>
</li>
<li><strong>2. Auditorías internas y externas</strong>
<ul>
<li>Tipos de auditoría</li>
<li>Preparación para auditorías</li>
<li>Manejo de no conformidades</li>
</ul>
</li>
<li><strong>3. Proceso de certificación en Perú</strong>
<ul>
<li>Requisitos de DIGESA</li>
<li>Requisitos de SENASA</li>
<li>Documentación exigida</li>
<li>Etapas del proceso de certificación</li>
</ul>
</li>
<li><strong>4. Mejora continua del sistema HACCP</strong>
<ul>
<li>Indicadores de desempeño</li>
<li>Gestión de riesgos</li>
<li>Cultura de inocuidad alimentaria</li>
</ul>
</li>
<li><strong>5. Taller práctico</strong></li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const BPM_CODEX = {
  tipo: "curso",
  slug: "bpm-prerrequisitos-codex-2022-iso-22002-1",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-05-bpm-pp-codex-2022.webp",
  waCorto: "Curso de BPM según Codex 2022",
  waLargo: "el Curso de BPM y Programas Prerrequisitos según Codex 2022",
  title: "Curso: Buenas Prácticas de Manufactura y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009 | Proinocuidad",
  seoTitle: "Curso BPM según Codex 2022 e ISO 22002-1 | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones sobre BPM y programas prerrequisitos según Codex 2022 e ISO 22002-1. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: BPM y programas prerrequisitos según Codex Alimentarius 2022 e ISO 22002-1:2009, con talleres prácticos. Certificado digital con QR.",
  fondo: "ficha-codex.avif",
  miga: "BPM y prerrequisitos Codex 2022",
  descripcion:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",
  h1: "Curso: “Buenas Prácticas de Manufactura y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",
  publico:
    "Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes; empresarios y emprendedores del sector alimentario (industria alimentaria, restaurantes y afines); estudiantes y público en general.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Introducción a las BPM y programas prerrequisitos · Parte I",
      abierto: false,
      html: `<li><strong>Definiciones importantes</strong>
<ul>
<li>Contaminantes</li>
<li>Relación de los alcances de un SGCIA</li>
</ul>
</li>
<li><strong>Peligros en alimentos</strong>
<ul>
<li>Tipos de peligros</li>
<li>Enfoque general de control de peligros</li>
</ul>
</li>
<li><strong>Programas Prerrequisitos – Establecimiento</strong>
<ul>
<li>Exterior</li>
<li>Diseño de procesos</li>
<li>Estructura de instalaciones (internas y accesorios)</li>
<li>Instalaciones para el personal</li>
<li>Servicios</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "Programas prerrequisitos · Parte II",
      abierto: false,
      html: `<li><strong>Programas Prerrequisitos – Equipos</strong>
<ul>
<li>Equipos</li>
<li>Mantenimiento</li>
<li>Calibración</li>
</ul>
</li>
<li><strong>Programas Prerrequisitos – POE</strong>
<ul>
<li>Control de la contaminación química</li>
<li>Control de la contaminación física</li>
<li>Gestión de plagas</li>
<li>Aprobación y seguimiento de proveedores</li>
<li>Controles en la recepción</li>
<li>Controles durante la expedición y transporte</li>
<li>Almacenamiento</li>
<li>Control de producto no conforme</li>
<li>Trazabilidad</li>
<li>Gestión de incidentes, retirada y recuperación de productos</li>
<li>Gestión de alérgenos</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO III",
      titulo: "Programas prerrequisitos · Parte III",
      abierto: false,
      html: `<li><strong>Programas Prerrequisitos – Personal</strong>
<ul>
<li>Formación</li>
<li>Normas de higiene</li>
<li>Salud</li>
<li>Indumentaria</li>
</ul>
</li>
<li>Programas Prerrequisitos – Control de las Operaciones</li>
<li>Limpieza y saneamiento</li>
<li>Actualización de los Principios Generales de Higiene de los Alimentos (CXC 1-1969) – Codex Alimentarius 2022.</li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const PHS = {
  tipo: "curso",
  slug: "programas-higiene-saneamiento",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-06-programas-higiene-saneamiento.webp",
  waCorto: "Curso de Higiene y Saneamiento",
  waLargo: "el Curso de Programas de Higiene y Saneamiento",
  title: "Curso: Programas de Higiene y Saneamiento en la Industria Alimentaria | Proinocuidad",
  seoTitle: "Curso de programas de higiene y saneamiento | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones sobre higiene y saneamiento en alimentos: agua, limpieza, plagas y residuos. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS): agua, limpieza y desinfección, higiene del personal, plagas, residuos, productos químicos y gestión documentaria.",
  fondo: "ficha-higiene.avif",
  miga: "Higiene y saneamiento",
  descripcion:
    "Establecer los lineamientos técnicos para el diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS), con el fin de garantizar que la infraestructura, equipos y utensilios se mantengan libres de agentes contaminantes, asegurando un entorno de trabajo seguro que cumpla con los estándares de inocuidad y la normativa legal vigente.",
  h1: "Curso: “Programas de Higiene y Saneamiento en la Industria Alimentaria”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Establecer los lineamientos técnicos para el diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS), con el fin de garantizar que la infraestructura, equipos y utensilios se mantengan libres de agentes contaminantes, asegurando un entorno de trabajo seguro que cumpla con los estándares de inocuidad y la normativa legal vigente.",
  publico:
    "Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes; empresarios y emprendedores del sector alimentario (industria alimentaria, restaurantes y afines); estudiantes y público en general.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Temario completo",
      abierto: false,
      html: `<li><strong>Introducción:</strong> Terminología y conceptos básicos. Importancia de la Higiene y saneamiento en el procesamiento de alimentos.</li>
<li><strong>Aspectos regulatorios.</strong></li>
<li><strong>Control de abastecimiento y suministro de agua:</strong> Conceptos generales. Control de agua. Programa y monitoreo de agua.</li>
<li><strong>Limpieza y desinfección:</strong> Conceptos generales. Consideraciones para el desarrollo de un programa limpieza y desinfección</li>
<li><strong>Higiene y salud del personal:</strong> Conceptos generales. Higiene y conducta del manipulador.</li>
<li><strong>Gestión de plagas:</strong> Consideraciones preliminares. Programa de control de plagas.</li>
<li><strong>Manejo y disposición de residuos:</strong> Conceptos generales. Tipos de desechos. Programa de gestión de residuos.</li>
<li><strong>Control de productos químicos:</strong> Conceptos generales. Tipos de productos químicos.</li>
<li><strong>Validación, vigilancia y verificación de los programas de higiene y saneamiento:</strong> Conceptos generales. Mecanismos para la validación. Vigilancia y verificación.</li>
<li><strong>Gestión documentaria de los programas de Higiene y Saneamiento:</strong> Importancia de la gestión documentaria de los programas de higiene y saneamiento. Principales entregables de los programas de higiene y saneamiento.</li>
<li><strong>Talleres prácticos</strong></li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const FSSC = {
  tipo: "curso",
  slug: "sistema-haccp-fssc-22000-codex-2022",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-07-haccp-fssc-22000-codex-2022.webp",
  waCorto: "Curso HACCP FSSC 22000",
  waLargo: "el Curso de Sistema HACCP según FSSC 22000 y Codex 2022",
  title: "Curso: Sistema HACCP según FSSC 22000 y Codex Alimentarius Revisión 2022 | Proinocuidad",
  seoTitle: "Curso HACCP según FSSC 22000 y Codex 2022 | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones sobre el sistema HACCP según FSSC 22000 y el Codex Alimentarius revisión 2022. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: Sistema HACCP según la revisión 2022 del Codex Alimentarius y los requisitos de certificación del esquema FSSC 22000 V6. Certificado digital con QR.",
  fondo: "ficha-fssc.avif",
  miga: "HACCP FSSC 22000 y Codex 2022",
  descripcion:
    "Desarrollar la competencia para diseñar, implementar y gestionar un sistema HACCP robusto, integrando los principios científicos de la revisión 2022 del Codex Alimentarius con los requisitos de certificación del esquema FSSC 22000, asegurando un control eficaz de los peligros significativos y garantizando el cumplimiento de los estándares internacionales de inocuidad más exigentes del mercado global.",
  h1: "Curso: “Sistema HACCP según FSSC 22000 y Codex Alimentarius Revisión 2022”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Desarrollar la competencia para diseñar, implementar y gestionar un sistema HACCP robusto, integrando los principios científicos de la revisión 2022 del Codex Alimentarius con los requisitos de certificación del esquema FSSC 22000, asegurando un control eficaz de los peligros significativos y garantizando el cumplimiento de los estándares internacionales de inocuidad más exigentes del mercado global.",
  publico:
    "Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes; empresarios y emprendedores del sector alimentario (industria alimentaria, restaurantes y afines); estudiantes y público en general.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Fundamentos, ISO 22000 y FSSC 22000",
      abierto: false,
      html: `<li>Generalidades del Sistema HACCP</li>
<li>Definiciones básicas</li>
<li>Generalidades ISO 22000:2018</li>
<li>Pensamiento basado en riesgos</li>
<li>Programas Prerrequisitos ISO/TS 22000-1:2009</li>
<li><strong>FSSC 22000 V6</strong>
<ul>
<li>Parte 1: Resumen del esquema</li>
<li>Parte 2: Requisitos para las organizaciones sujetas a auditoría</li>
</ul>
</li>
<li><strong>Programas Prerrequisitos según ISO/TS 22000-1:2009</strong>
<ul>
<li>Construcción y distribución de edificios.</li>
<li>Distribución de los locales y espacio de trabajo</li>
<li>Servicios – agua, aire y energía</li>
<li>Eliminación de desechos</li>
<li>Idoneidad de los equipos, limpieza y mantenimiento</li>
<li>Gestión de los materiales comprados</li>
<li>Medidas para la prevención de la contaminación cruzada</li>
<li>Limpieza y sanitización</li>
<li>Control de plagas</li>
<li>Higiene personal</li>
<li>Retrabajo</li>
<li>Procedimientos de retiro de producto</li>
<li>Almacenamiento</li>
<li>Información del producto y concientización del consumidor</li>
<li>Defensa de los alimentos</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "HACCP según ISO 22000 y Codex Alimentarius",
      abierto: false,
      html: `<li>Definiciones ISO 22000</li>
<li><strong>7 pasos y 12 principios:</strong>
<ul>
<li>Paso 01: Formación de un equipo encargado del HACCP.</li>
<li>Paso 02: Descripción del Producto.</li>
<li>Paso 03: Identificación del Uso Final.</li>
<li>Paso 04: Elaboración de un Diagrama de Flujo</li>
<li>Paso 05: Confirmación in situ</li>
<li>Paso 06: Análisis de peligros y determinación de las medidas para controlar los peligros identificados.</li>
<li>Paso 07: Determinación de los puntos críticos de control.</li>
<li>Paso 08: Establecimiento de límites críticos para cada punto crítico de control.</li>
<li>Paso 09: Establecimiento de un sistema de vigilancia para cada punto crítico de control.</li>
<li>Paso 10: Establecimiento de medidas correctoras.</li>
<li>Paso 11: Establecimiento de procedimientos de comprobación.</li>
<li>Paso 12: Establecimiento de un sistema de documentación y registro</li>
</ul>
</li>
<li>Taller de identificación y evaluación de peligros y riesgos para los alimentos – caso práctico.</li>
<li>Taller de identificación de PCC y PPRO</li>
<li>Taller de elaboración de Sistema de Vigilancia de PCC y PPRO</li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const AUDITOR = {
  tipo: "curso",
  slug: "formacion-auditor-interno-haccp",
  horas: 40,
  pen: 45,
  usd: 15,
  estructura: "3 Sesiones Clave",
  flyer: "flyer-curso-08-auditor-interno-haccp.webp",
  waCorto: "Curso de Auditor Interno HACCP",
  waLargo: "el Curso de Formación de Auditor Interno HACCP",
  title: "Curso: Formación de Auditor Interno del Sistema HACCP | Proinocuidad",
  seoTitle: "Curso de auditor interno HACCP | Proinocuidad",
  seoDesc: "Curso asíncrono de 3 sesiones para planificar, ejecutar y cerrar auditorías internas del sistema HACCP según ISO 19011. Certificado digital con QR.",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: planificación, ejecución y cierre de auditorías internas del sistema HACCP bajo la norma ISO 19011, con hallazgos, informe de auditoría y acciones correctivas.",
  fondo: "ficha-auditor.avif",
  miga: "Auditor interno HACCP",
  descripcion:
    "Especializar al participante en la planificación, ejecución y cierre de auditorías internas del sistema HACCP, desarrollando el juicio crítico necesario para verificar no solo el cumplimiento documental, sino también la eficacia operativa y la validación científica de los controles, bajo los lineamientos de la norma ISO 19011 y los estándares internacionales de inocuidad alimentaria.",
  h1: "Curso: “Formación de Auditor Interno del Sistema HACCP”",
  objetivoTitulo: "Objetivo:",
  objetivo:
    "Especializar al participante en la planificación, ejecución y cierre de auditorías internas del sistema HACCP, desarrollando el juicio crítico necesario para verificar no solo el cumplimiento documental, sino también la eficacia operativa y la validación científica de los controles, bajo los lineamientos de la norma ISO 19011 y los estándares internacionales de inocuidad alimentaria.",
  publico:
    "Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes; empresarios y emprendedores del sector alimentario (industria alimentaria, restaurantes y afines); estudiantes y público en general.",
  temarioIntro: "Contenidos del curso:",
  modulos: [
    {
      badge: "MÓDULO I",
      titulo: "Generalidades del Sistema HACCP e introducción a la auditoría",
      abierto: false,
      html: `<li>¿Qué es HACCP?</li>
<li>Características</li>
<li>Programas Prerrequisitos</li>
<li>Revisión rápida 7 principios y 12 pasos</li>
<li><strong>Introducción a la auditoría</strong>
<ul>
<li>Objetivo de auditoría</li>
<li>Tipos de auditoría</li>
<li>Características de una auditoría</li>
<li>Principios de la auditoría</li>
<li>Competencias de los auditores</li>
<li>Taller práctico</li>
</ul>
</li>
<li><strong>Etapas de la auditoría</strong>
<ul>
<li>Conceptos útiles</li>
<li>Proceso de auditoría</li>
<li>Finalidad de las auditorías</li>
<li>Etapas de la auditoría (PHVA)</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO II",
      titulo: "Planeación y ejecución de la auditoría",
      abierto: false,
      html: `<li><strong>Planeación de la auditoría</strong>
<ul>
<li>Gestión del programa de auditoría</li>
<li>Objetivos del programa de auditoría</li>
<li>Riesgos y oportunidades del programa de auditoría</li>
<li>Establecer el programa de auditoría</li>
<li>Implementación del programa de auditoría</li>
<li>Selección del equipo auditor</li>
<li>Funciones y responsabilidades del equipo auditor</li>
<li>Seguimiento del programa de auditoría</li>
<li>Programa de auditoría</li>
<li>Frecuencia de las auditorías</li>
</ul>
</li>
<li><strong>Ejecución de la auditoría</strong>
<ul>
<li>Inicio de la auditoría</li>
<li>Preparación de las actividades
<ul>
<li>Plan de auditoría</li>
<li>Asignación de tareas al equipo auditor</li>
<li>Listas de verificación</li>
</ul>
</li>
<li>Realización de las actividades de auditoría
<ul>
<li>Reunión de apertura</li>
<li>Comunicación durante la auditoría</li>
<li>Revisión de la documentación</li>
<li>Selección de fuentes de información</li>
<li>La entrevista</li>
</ul>
</li>
</ul>
</li>`,
    },
    {
      badge: "MÓDULO III",
      titulo: "Ejecución y hallazgos de auditoría, informe, seguimiento y acciones correctivas",
      abierto: false,
      html: `<li><strong>Recopilación de información</strong>
<ul>
<li>Verificación preliminar, in situ, del establecimiento</li>
<li>Auditoría de los Prerrequisitos (BPM, POES, POE)</li>
<li>Auditoría de los PCC</li>
<li>Auditoría documentaria (gabinete)</li>
</ul>
</li>
<li><strong>Hallazgos de auditoría</strong>
<ul>
<li>Generación de hallazgos</li>
<li>Clasificación de hallazgos</li>
<li>Elementos de una no conformidad</li>
<li>Ejemplos de redacción de no conformidades</li>
</ul>
</li>
<li><strong>Determinación de conclusiones de la auditoría</strong>
<ul>
<li>Preparación de la reunión de cierre</li>
<li>Realización de la reunión de cierre</li>
</ul>
</li>
<li><strong>Elaboración de informe de auditoría</strong>
<ul>
<li>Preparación de informe de auditoría</li>
<li>Distribución de informe de auditoría</li>
<li>Finalización de auditoría</li>
</ul>
</li>
<li><strong>Seguimiento y acciones correctivas</strong>
<ul>
<li>Cuadro de control para el seguimiento de acciones correctivas</li>
<li>Evaluación del auditor</li>
</ul>
</li>`,
    },
  ],
  metodologiaIntro:
    "El curso se imparte en modalidad 100% asíncrona, brindándote flexibilidad total para avanzar sin presiones de horarios. Cuentas con un campus virtual moderno con acceso las 24 horas:",
  incluye: [
    "Acceso ilimitado y permanente 24/7",
    "3 sesiones asíncronas especializadas",
    "Material descargable (libros y manuales)",
    "Certificado digital con código QR (40 horas)",
  ],
};

const FICHAS = [DIPLOMADO, LEGISLACION, BPM_POES, DIGESA, BPM_CODEX, PHS, FSSC, AUDITOR];

for (const f of FICHAS) {
  const dir = join(RAIZ, "cursos", f.slug);
  mkdirSync(dir, { recursive: true });
  const destino = join(dir, "index.html");
  const contenidoFinal = ficha(f);
  writeFileSync(destino, contenidoFinal, "utf8");
  if (!existsSync(destino)) throw new Error("no se generó " + destino);
  console.log("Ficha generada:", destino);
}
console.log("Total:", FICHAS.length, "fichas");

// La pagina de error vive en la raiz: no entra en el sitemap ni en el menu.
const destino404 = join(RAIZ, "404.html");
writeFileSync(destino404, pagina404(), "utf8");
if (!existsSync(destino404)) throw new Error("no se genero " + destino404);
console.log("Pagina de error generada:", destino404);
