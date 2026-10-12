/**
 * Generador de fichas estáticas de cursos de Proinocuidad (tasks 4.4).
 * Ejecutar:  node tools/generar-fichas.mjs
 * Emite:     cursos/<slug>/index.html  (HTML estático, sin build al navegar)
 *
 * Contenido fuente: documento oficial "_archivo/pagina web.pdf" (fuente única de verdad).
 * - Decimal del objetivo del curso 5 (BPM Codex 2022): se publica tal como está en el PDF
 *   (decisión del dueño: coincide con el objetivo del curso DIGESA/SENASA en el documento).
 * - El curso 2 (Legislación) y el curso 3 (BPM/POES/POE/HACCP) comparten el mismo objetivo
 *   exacto en el PDF; se publica igual (fiel al documento).
 * - Bloque de pagos con la decisión del dueño: botón Culqi (placeholder #) + logos
 *   informativos con titular "Claudia Rubio Jiménez" y número placeholder.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const img_og = "https://proinocuidad.com/assets/img/proinocuidad-og-1200x630.png";

/* ---------- piezas reutilizables ---------- */

function bloque(indice, titulo, htmlInterno) {
  return `<article class="bloque">\n<h2><span class="indice">${indice}</span> ${titulo}</h2>\n${htmlInterno}\n</article>`;
}

function detalle(titulo, abierta, htmlInterno) {
  return `<details class="modulo"${abierta ? " open" : ""}>\n<summary>${titulo}</summary>\n<div class="modulo-contenido">\n${htmlInterno}\n</div>\n</details>`;
}

function bloquePagos() {
  return bloque(
    "IX",
    "Medios de pago",
    `<div class="pagos-info">
<div class="ficha-cta">
<!-- TODO(responsable): pegar aquí el enlace de pago Culqi de este curso (assets/js/cursos-data.js, campo urlCulqi) -->
<a class="btn btn-culqi" href="#" aria-disabled="true">Pagar online con Culqi</a>
<!-- Enlace público del formulario (mismo ID del documento base, sufijo /viewform) -->
<a class="btn btn-rojo" href="https://docs.google.com/forms/d/1OoggGqBor_FDBcKoo807nPf0atujRvqqXrIqDhBiRpI/viewform" target="_blank" rel="noopener">Solicitar más información / Inscribirme</a>
<a class="btn btn-whatsapp" href="https://wa.me/51981365982" target="_blank" rel="noopener">WhatsApp</a>
</div>
<div class="pagos-logos" aria-label="Medios de pago disponibles">
<figure><img src="../../assets/img/pagos/yape-logo.webp" alt="Logo Yape"><figcaption>Yape</figcaption></figure>
<figure><img src="../../assets/img/pagos/plin-logo.webp" alt="Logo Plin"><figcaption>Plin</figcaption></figure>
<figure><img src="../../assets/img/pagos/bbva-logo.webp" alt="Logo BBVA"><figcaption>Transferencia BBVA</figcaption></figure>
<figure><img src="../../assets/img/pagos/western-union-logo.webp" alt="Logo Western Union"><figcaption>Western Union</figcaption></figure>
<figure><img src="../../assets/img/pagos/paypal-logo.webp" alt="Logo PayPal"><figcaption>PayPal</figcaption></figure>
</div>
<!-- TODO(responsable): reemplazar '+51 99999999' por el número real de Yape/Plin -->
<div class="pagos-datos">
<ul>
<li><strong>Yape / Plin:</strong> Número <span class="num-pagos">+51 99999999</span> — Titular: Claudia Rubio Jiménez</li>
<li><strong>Western Union / PayPal:</strong> datos de cobro con el titular Claudia Rubio Jiménez (solicítalos al WhatsApp corporativo).</li>
<li><strong>BBVA (solo transferencia móvil):</strong> Cuenta de ahorros soles <strong>0011-0900-0200684705</strong> · CCI <strong>011-900-000200684705-83</strong></li>
</ul>
</div>
<div class="pagos-qr">
<div>
<img src="../../assets/img/qr-pago-bbva.webp" alt="QR de pago BBVA de Proinocuidad: escanea el QR y paga con cualquier billetera digital">
</div>
<p>
<strong>Pago con QR:</strong> escanea el QR con Yape, Plin u otra billetera digital.
Nota del documento oficial: la cuenta BBVA es solo para transferencias desde aplicativo móvil; si realiza
depósito por ventanilla o agente, adicionar S/ 7.50 (comisión interplaza).
</p>
</div>
</div>`
  );
}

const PUBLICO_A = `Dirigido a profesionales, técnicos y estudiantes de últimos ciclos vinculados a la industria alimentaria:
responsables de calidad e inocuidad, supervisores de producción, personal de control de calidad, consultores,
auditores internos, docentes y emprendedores del sector alimentos y bebidas.`;

const PUBLICO_B = `Profesionales del sector alimentos, inspectores, analistas, supervisores, jefes;
empresarios y emprendedores del sector alimentario (industria alimentaria,
restaurantes y afines); estudiantes y público en general.`;

const BENEFICIOS = `<ul class="lista-check">
<li>Acceso a Aula virtual de manera permanente</li>
<li>Material actualizado (libros, plantillas, manuales, etc)</li>
<li>Aprende a tu propio ritmo y disponibilidad de tiempo</li>
<li>Certificado digital con QR</li>
</ul>`;

const METODOLOGIA = bloque(
  "VI",
  "Metodología",
  `<p>
En la modalidad asíncrona los participantes desarrollan los contenidos didácticos, a su propio ritmo, a través
del aula virtual y sus escenarios virtuales de aprendizaje implementados, que ha sido diseñado de forma modular.
En cada módulo se exponen distintos contenidos de aprendizaje tales como grabaciones de clases, diapositivas,
lecturas, videos, bibliografía complementaria actualizada.
</p>
<p>
La plataforma del curso estará disponible en:
<a href="https://proinocuidad.com/login/" target="_blank" rel="noopener">https://proinocuidad.com/login/</a>.
A cada participante se le asignará un usuario y contraseña.
</p>
<p>
Para obtener el certificado de aprobación se requiere aprobar un examen con una nota mínima de <strong>14 puntos</strong>;
caso contrario, se emitirá certificado de participación.
</p>`
);

function bloqueInversion(montoNacional, montoExtranjero) {
  return bloque(
    "VII",
    "Inversión",
    `<div class="inversion-box">
<div class="inversion-item"><span class="monto">${montoNacional}</span><span>Perú (no incluye IGV)</span></div>
<div class="inversion-item"><span class="monto">${montoExtranjero}</span><span>Extranjero</span></div>
</div>`
  );
}

function bloqueInscripcion() {
  return bloque(
    "VIII",
    "Inscripción online",
    `<ol>
<li>Realizar el pago a nuestras cuentas (revisa los medios de pago en el bloque <em>Medios de pago</em> de esta misma ficha).</li>
<li>Completar el formulario con sus datos, adjuntar el voucher o comprobante de pago en el formulario y hacer clic en el botón «Enviar».</li>
<li>Enviar mensaje al WhatsApp <a href="https://wa.me/51981365982" target="_blank" rel="noopener">+51 981 365 982</a> confirmando su inscripción.</li>
</ol>`
  );
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

function ficha(curso, contenido) {
  const url = `https://proinocuidad.com/cursos/${curso.slug}/`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${curso.title} | Proinocuidad</title>
<meta property="og:title" content="${curso.title.replace(/"/g, "&quot;")} | Proinocuidad">
<meta property="og:image" content="${img_og}">
<meta property="og:url" content="${url}">
<meta name="description" content="${curso.desc}">
<link rel="canonical" href="${url}">
<script type="application/ld+json">
${jsonLdCurso(curso)}
</script>
<link rel="icon" href="../../assets/img/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="../../assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="../../assets/css/main.css">
</head>
<body>

<div class="topbar">
<div class="container">
<span>
Contacto:
<a href="https://wa.me/51981365982" target="_blank" rel="noopener">+51 981 365 982</a>
&nbsp;·&nbsp;
<a href="mailto:administracion@proinocuidad.com">administracion@proinocuidad.com</a>
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
<a class="brand" href="../../index.html" aria-label="Proinocuidad — inicio">
<img src="../../assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad">
</a>
<button class="nav-toggle" aria-expanded="false" aria-label="Abrir menú" aria-controls="menu-principal">
<span class="hamburger" aria-hidden="true"></span>
</button>
<ul class="nav-menu" id="menu-principal">
<li><a href="../../index.html">Inicio</a></li>
<li><a href="../../nosotros/index.html">Nosotros</a></li>
<li class="nav-drop">
<a href="../../servicios/index.html" aria-haspopup="true" aria-expanded="false">Servicios</a>
<div class="mega-panel mega-panel-compacto" role="menu">
<div class="mega-panel-inner">
<a href="../../servicios/index.html#capacitacion-empresarial"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4"/><path d="M18 14.2c2.3.7 3.5 2.6 3.5 5.8"/></svg></span><strong>Capacitación Empresarial</strong><span>Programas in house, cursos y diplomados a medida.</span></a>
<a href="../../servicios/index.html#normativa-sanitaria"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14l2 2 4-4"/></svg></span><strong>Implementación de normativa sanitaria</strong><span>PPH y Validación Técnica Oficial del Plan HACCP.</span></a>
<a href="../../servicios/index.html#sistemas-gestion"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.2 7 21l5-2.6 5 2.6-1.5-6.8"/></svg></span><strong>Sistemas de gestión</strong><span>ISO 9001, ISO 22000, FSSC 22000 y BRCGS FOOD.</span></a>
<a href="../../servicios/index.html#registro-sanitario"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><path d="M9 13.5l2 2 4-4"/></svg></span><strong>Registro sanitario</strong><span>Alimentos y bebidas en el menor tiempo posible.</span></a>
<a class="mega-cta" href="../../servicios/index.html"><strong>Ver todos los servicios</strong><span aria-hidden="true">→</span></a>
</div>
</div>
</li>
<li class="nav-drop">
<a href="../index.html" aria-haspopup="true" aria-expanded="false">Cursos</a>
<div class="mega-panel mega-panel-compacto" role="menu">
<div class="mega-panel-inner">
              <a href="../diplomado-gestion-calidad-e-inocuidad/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg></span><strong>Diplomado SGCIA</strong><span>Calidad e Inocuidad en la Industria Alimentaria · 384 h</span></a>
              <a href="../legislacion-sanitaria-alimentos/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M6 21h12"/><path d="M4 7h16"/><path d="M4 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/><path d="M20 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/></svg></span><strong>Legislación Sanitaria de Alimentos</strong><span>Marco normativo nacional e internacional · 40 h</span></a>
              <a href="../haccp-implementacion-certificacion-digesa-senasca/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span><strong>HACCP: certificación en Perú</strong><span>DIGESA / SENASA · 40 h</span></a>
              <a href="../formacion-auditor-interno-haccp/index.html"><span class="mega-icono"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M8 11l2 2 4-4"/></svg></span><strong>Auditor Interno HACCP</strong><span>Formación de auditores · 40 h</span></a>
              <a class="mega-cta" href="../index.html"><strong>Ver todos los cursos</strong><span aria-hidden="true">→</span></a>
</div>
</div>
</li>
<li><a href="../../noticias/index.html">Noticias</a></li>
<li><a class="btn-aula-nav" href="https://proinocuidad.com/login/" target="_blank" rel="noopener">Aula Virtual</a></li>
</ul>
</nav>
</header>

<main>
<section class="ficha-head" style="background-image: linear-gradient(rgba(11, 14, 86, 0.72), rgba(11, 14, 86, 0.55)), url('../../assets/img/${curso.fondo}')">
<div class="container">
<nav class="breadcrumbs" aria-label="Migajas de pan">
<a href="../../index.html">Inicio</a> <span aria-hidden="true">/</span> <a href="../index.html">Cursos</a> <span aria-hidden="true">/</span> <span>${curso.miga}</span>
</nav>
<h1>${curso.h1}</h1>
<p class="ficha-desc">${curso.descripcion}</p>
</div>
</section>

<div class="container ficha-cuerpo">
${contenido}
</div>
</main>

<footer class="site-footer">
<div class="container footer-grid">
<div class="footer-brand">
<img src="../../assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad">
<p><strong>Proinocuidad Consultoría y Capacitación Alimentaria E.I.R.L.</strong></p>
<p>¡Formamos profesionales, construimos inocuidad!</p>
<p>RUC 20615307603 · Trujillo, La Libertad, Perú</p>
</div>
<div class="footer-contacto">
<h4>Contacto</h4>
<ul>
<li><strong>Contacto:</strong> <a href="https://wa.me/51981365982" target="_blank" rel="noopener">+51 981 365 982</a></li>
<li><strong>Correo:</strong> <a href="mailto:administracion@proinocuidad.com">administracion@proinocuidad.com</a></li>
<li><strong>Horario de atención:</strong> Lunes a viernes de 8 AM a 8 PM</li>
<li><strong>Ubicación:</strong> Trujillo, La Libertad, Perú</li>
<li class="pendiente">Dirección exacta: Próximamente</li>
</ul>
</div>
<div class="footer-links">
<h4>Enlaces</h4>
<ul>
<li><a href="../../index.html">Inicio</a></li>
<li><a href="../../nosotros/index.html">Nosotros</a></li>
<li><a href="../../servicios/index.html">Servicios</a></li>
<li><a href="../index.html">Cursos</a></li>
<li><a href="../../noticias/index.html">Noticias y eventos</a></li>
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
</footer>

<a class="flotante-whatsapp" href="https://wa.me/51981365982" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
<a class="to-top-proi" href="#" aria-label="Volver arriba"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></a>

<script src="../../assets/js/main.js"></script>
</body>
</html>
`;
}

/* ---------- fichas (contenido del documento oficial) ---------- */
/* El diplomado ya existe como ficha escrita a mano; el generador lo reescribe a partir
   de aquí también, para que la fuente única sea este archivo. */

const DIPLOMADO = {
  slug: "diplomado-gestion-calidad-e-inocuidad",
  horas: 384,
  pen: 120,
  usd: 37,
  title: "Diplomado de Especialización: Gestión de la Calidad e Inocuidad en la Industria Alimentaria | Proinocuidad",
  desc:
    "Diplomado asíncrono (grabado) de 384 horas académicas en 6 sesiones: programas prerrequisitos, HACCP, ISO 9001, ISO 22000, BRCGS V9 y auditoría de sistemas integrados. Certificado digital con QR y aula virtual permanente.",
  fondo: "ficha-diplomado.avif",
  miga: "Diplomado",
  descripcion:
    "Desarrollar competencias para implementar y auditar sistemas de gestión de calidad e inocuidad alimentaria basados en HACCP, ISO 9001, ISO 22000 y BRCGS.",  h1: "Diplomado de Especialización: “Gestión de la Calidad e Inocuidad en la Industria Alimentaria”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 6 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 384 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_A}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Desarrollar competencias para implementar y auditar sistemas de gestión de calidad e inocuidad alimentaria basados en HACCP, ISO 9001, ISO 22000 y BRCGS.</p>`
    ),
    bloque(
      "✔",
      "Perfil del egresado",
      `<p>Al finalizar el diplomado, el participante estará capacitado para:</p>
<ul class="lista-check">
<li>Implementar y mantener sistemas de gestión de calidad e inocuidad alimentaria en organizaciones del sector.</li>
<li>Aplicar programas prerrequisitos (BPM, POE y POES) como base del control sanitario.</li>
<li>Desarrollar e implementar planes HACCP en procesos alimentarios.</li>
<li>Interpretar y aplicar los requisitos de ISO 9001 e ISO 22000 en entornos productivos.</li>
<li>Reconocer y aplicar los lineamientos de la norma BRCGS Food Safety.</li>
<li>Participar en auditorías internas de sistemas integrados de gestión según ISO 19011.</li>
<li>Identificar oportunidades de mejora para fortalecer la calidad e inocuidad en la cadena alimentaria.</li>
</ul>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "MÓDULO I. Contexto Nacional e Internacional de la Calidad e Inocuidad Alimentaria",
        true,
        `<ul>
<li>Contexto de la Inocuidad Global</li>
<li>Enfermedades Transmitidas por Alimentos (ETAS)</li>
<li>Organismos Reguladores en el Perú en materia de Inocuidad Alimentaria</li>
<li>COMPIAL</li>
<li>Regulación Nacional</li>
<li>Codex Alimentarius</li>
<li>FDA y Unión Europea</li>
<li>Principios Generales de Higiene de los Alimentos CAC/RCP 1-1969, actualización 2022</li>
</ul>`
      ) +
        detalle(
          "MÓDULO II. Programas Prerrequisitos del Sistema HACCP (BPM, POES y POE)",
          false,
          `<ul>
<li>Buenas Prácticas de Manufactura como base para la norma ISO 22000 y BRCGS</li>
<li>Infraestructura y utensilios</li>
<li>Personal</li>
<li>Control de Plagas</li>
<li>Mantenimiento</li>
<li>Capacitación</li>
<li>Contaminación Cruzada</li>
<li>Calidad de Agua</li>
<li>Otros</li>
<li>Procedimientos Operativos Estandarizados (POE)</li>
<li>Procedimientos Operativos Estandarizados de Saneamiento (POES)</li>
</ul>`
        ) +
        detalle(
          "MÓDULO III. Sistema HACCP: Análisis de Peligros y Puntos Críticos de Control",
          false,
          `<ul>
<li>Introducción al Sistema HACCP</li>
<li>Principios del Sistema HACCP</li>
<li>Pasos del Sistema HACCP
<ul>
<li>Formación del equipo HACCP</li>
<li>Descripción del producto</li>
<li>Descripción del uso previsto del alimento</li>
<li>Elaboración del Diagrama de Flujo</li>
<li>Confirmación in situ del Diagrama de Flujo</li>
<li>Análisis de peligros</li>
<li>Identificación de los PCC</li>
<li>Establecimiento de Límites Críticos</li>
<li>Establecimiento de un Sistema de Vigilancia para cada PCC</li>
<li>Establecimiento de Medidas Correctoras</li>
<li>Establecimiento de Procedimientos de Verificación</li>
<li>Establecimiento del Sistema de Documentación y Registro</li>
</ul>
</li>
</ul>`
        ) +
        detalle(
          "MÓDULO IV. Sistema de Gestión de la Calidad e Inocuidad (ISO 9001 e ISO 22000)",
          false,
          `<ul>
<li><strong>1. ISO 9001:2015 e ISO 22000:2018 (visión integrada)</strong>
<ul>
<li>Principios comunes de los sistemas de gestión.</li>
<li>Enfoque basado en procesos.</li>
<li>Gestión de riesgos y mejora continua.</li>
<li>Relación entre calidad e inocuidad alimentaria.</li>
</ul>
</li>
<li><strong>2. Elementos clave de ISO 22000</strong>
<ul>
<li>Programas prerrequisito (PPR).</li>
<li>Control de peligros y enfoque HACCP integrado.</li>
<li>Comunicación en la cadena alimentaria.</li>
</ul>
</li>
<li><strong>3. Cambios y tendencias (ISO 9001 e ISO 22000 – versiones 2026)</strong></li>
</ul>`
        ) +
        detalle(
          "MÓDULO V. Norma BRCGS Estándar Global de Seguridad Alimentaria, V.9",
          false,
          `<ul>
<li>Introducción a los estándares BRCGS.</li>
<li>Alcance y beneficios para mercados nacionales e internacionales.</li>
<li>Requisitos fundamentales de BRCGS Food Safety.</li>
<li>Compromiso de la dirección y cultura de inocuidad.</li>
<li>Sistema de gestión de calidad e inocuidad.</li>
<li>Estándares de instalaciones y control de procesos.</li>
<li>Gestión de proveedores y materias primas.</li>
<li>Gestión de productos, personal y procesos.</li>
</ul>`
        ) +
        detalle(
          "MÓDULO VI. Auditoría de Sistemas Integrados de Gestión de Calidad e Inocuidad",
          false,
          `<ul>
<li>Directrices para auditorías según ISO 19011.</li>
<li>Principios y competencias del auditor.</li>
<li>Auditorías internas y externas.</li>
<li>Planificación y ejecución de auditorías.</li>
<li>Elaboración de listas de verificación.</li>
<li>Técnicas de entrevista y recopilación de evidencias.</li>
<li>Identificación y clasificación de hallazgos.</li>
<li>Elaboración de informes de auditoría.</li>
<li>Gestión de acciones correctivas y seguimiento.</li>
<li>Principales cambios y tendencias de ISO 19011:2026.</li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 120", "US$ 37"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const LEGISLACION = {
  slug: "legislacion-sanitaria-alimentos",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Legislación Sanitaria de Alimentos Nacional e Internacional | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: marco normativo sanitario peruano (DL 1062, DS 007-98, RM 591-2008, entre otras) y normativa internacional (Codex Alimentarius, Estados Unidos). Certificado digital con QR.",
  fondo: "ficha-legislacion.avif",
  miga: "Legislación sanitaria",
  descripcion:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",  h1: "Curso: “Legislación Sanitaria de Alimentos Nacional e Internacional”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_A}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "1. Aspectos generales · 2. Marco nacional",
        true,
        `<ul>
<li>1. Aspectos generales</li>
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
<li>2.11. Resolución Ministerial 106-2023. DS: 147 MINSA/DIGESA-2023. Rastreabilidad para la inocuidad de los alimentos.</li>
</ul>`
      ) +
        detalle(
          "3. Normativa Sanitaria internacional · 4. Talleres prácticos",
          false,
          `<ul>
<li><strong>3. Normativa Sanitaria internacional</strong></li>
<li>3.1. Codex Alimentarius</li>
<li>3.2. Regulación sanitaria en Estados Unidos</li>
<li>3.3. Otras normativas voluntarias.</li>
<li><strong>4. Talleres prácticos</strong></li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const BPM_POES = {
  slug: "implementacion-auditoria-bpm-poes-poe-plan-haccp",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: BPM, los POES 1 al 8, POE 1 al 9 y el Sistema HACCP con sus 7 principios y 12 pasos, con talleres prácticos. Certificado digital con QR.",
  fondo: "ficha-bpm.avif",
  miga: "BPM, POES, POE y Plan HACCP",
  descripcion:
    "Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.",  h1: "Curso: “Implementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_A}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Desarrollar la capacidad de interpretar y aplicar el marco normativo sanitario vigente, tanto a nivel nacional como internacional, para gestionar procesos de producción, etiquetado y comercialización de alimentos que garanticen la inocuidad, protejan la salud del consumidor y aseguren la competitividad en mercados globales.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "Módulo 1: Introducción a la inocuidad alimentaria, peligros y BPM",
        true,
        `<ul>
<li>Introducción a la inocuidad alimentaria</li>
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
</li>
</ul>`
      ) +
        detalle(
          "Módulo 2: Higiene y Saneamiento, POES y POE",
          false,
          `<ul>
<li><strong>Procedimientos Operativos Estandarizados de Saneamiento (POES)</strong>
<ul>
<li>POES 1: Seguridad del agua potable</li>
<li>POES 2: Superficies en contacto con alimentos</li>
<li>POES 3: Prevención de la contaminación cruzada</li>
<li>POES 4: Higiene del personal</li>
<li>POES 5: Adulteración de los alimentos</li>
<li>POES 6: Etiquetado apropiado, almacenamiento y uso de compuestos tóxicos</li>
<li>POES 7: Control de salud de los empleados</li>
<li>POES 8: Exclusión de plagas</li>
<li>Taller práctico de identificación de POES</li>
</ul>
</li>
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
</li>
</ul>`
        ) +
        detalle(
          "Módulo 3: Sistema HACCP y auditoría",
          false,
          `<ul>
<li>Generalidades del Sistema HACCP</li>
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
<li>Taller de identificación de PCC</li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const DIGESA = {
  slug: "haccp-implementacion-certificacion-digesa-senasca",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso de Especialización: HACCP Implementación y Certificación en Perú (DIGESA/SENASA) | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: fundamentos de HACCP y marco normativo peruano, diseño e implementación del sistema y validación, certificación y auditoría conforme a DIGESA y SENASA.",
  fondo: "ficha-haccp.avif",
  miga: "HACCP DIGESA / SENASA",
  descripcion:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",  h1: "Curso de Especialización: “HACCP: Implementación y Certificación en Perú (DIGESA / SENASA)”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_B}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "MÓDULO 1: Fundamentos de HACCP y Marco Normativo Peruano",
        true,
        `<ul>
<li><strong>1. Introducción a la inocuidad alimentaria</strong>
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
<li><strong>5. Taller Práctico</strong></li>
</ul>`
      ) +
        detalle(
          "MÓDULO 2: Diseño e Implementación del Sistema HACCP",
          false,
          `<ul>
<li><strong>1. Etapas preliminares</strong>
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
<li><strong>5. Taller Práctico</strong></li>
</ul>`
        ) +
        detalle(
          "MÓDULO 3: Validación, Certificación y Auditoría HACCP",
          false,
          `<ul>
<li><strong>1. Validación y verificación</strong>
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
<li><strong>5. Taller práctico</strong></li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const BPM_CODEX = {
  slug: "bpm-prerrequisitos-codex-2022-iso-22002-1",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Buenas Prácticas de Manufactura y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009 | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: BPM y programas prerrequisitos según Codex Alimentarius 2022 e ISO 22002-1:2009, con talleres prácticos. Certificado digital con QR.",
  fondo: "ficha-codex.avif",
  miga: "BPM y prerrequisitos Codex 2022",
  descripcion:
    "Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.",  h1: "Curso: “Buenas Prácticas de Manufactura y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_B}</p>`),
    bloque(
      "IV",
      "Objetivo",
      /* Objetivo publicado tal como está en el documento oficial (la fuente coincide con el
         del curso de HACCP DIGESA/SENASA; decisión del dueño de mantener fidelidad al PDF). */
      `<p>Desarrollar las competencias necesarias para diseñar, implementar, validar y gestionar un sistema HACCP conforme a la normativa vigente en Perú, cumpliendo los requisitos establecidos por DIGESA y SENASA, con el fin de garantizar la inocuidad de los alimentos y facilitar procesos de certificación.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "Módulo 1: Introducción a las BPM y Programas Prerrequisitos parte I",
        true,
        `<ul>
<li><strong>Definiciones importantes</strong>
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
</li>
</ul>`
      ) +
        detalle(
          "Módulo 2: Programas Prerrequisitos – parte II",
          false,
          `<ul>
<li><strong>Programas Prerrequisitos – Equipos</strong>
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
</li>
</ul>`
        ) +
        detalle(
          "Módulo 3: Programas Prerrequisitos – parte III",
          false,
          `<ul>
<li><strong>Programas Prerrequisitos – Personal</strong>
<ul>
<li>Formación</li>
<li>Normas de higiene</li>
<li>Salud</li>
<li>Indumentaria</li>
</ul>
</li>
<li>Programas Prerrequisitos – Control de las Operaciones</li>
<li>Limpieza y saneamiento</li>
<li>Actualización de los Principios Generales de Higiene de los Alimentos (CXC 1-1969) – Codex Alimentarius 2022.</li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const PHS = {
  slug: "programas-higiene-saneamiento",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Programas de Higiene y Saneamiento en la Industria Alimentaria | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS): agua, limpieza y desinfección, higiene del personal, plagas, residuos, productos químicos y gestión documentaria.",
  fondo: "ficha-higiene.avif",
  miga: "Higiene y saneamiento",
  descripcion:
    "Establecer los lineamientos técnicos para el diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS), con el fin de garantizar que la infraestructura, equipos y utensilios se mantengan libres de agentes contaminantes, asegurando un entorno de trabajo seguro que cumpla con los estándares de inocuidad y la normativa legal vigente.",  h1: "Curso: “Programas de Higiene y Saneamiento en la Industria Alimentaria”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_B}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Establecer los lineamientos técnicos para el diseño, ejecución y validación de los Programas de Higiene y Saneamiento (PHS), con el fin de garantizar que la infraestructura, equipos y utensilios se mantengan libres de agentes contaminantes, asegurando un entorno de trabajo seguro que cumpla con los estándares de inocuidad y la normativa legal vigente.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "Temario completo",
        true,
        `<ul>
<li><strong>Introducción:</strong> Terminología y conceptos básicos. Importancia de la Higiene y saneamiento en el procesamiento de alimentos.</li>
<li><strong>Aspectos regulatorios.</strong></li>
<li><strong>Control de abastecimiento y suministro de agua:</strong> Conceptos generales. Control de agua. Programa y monitoreo de agua.</li>
<li><strong>Limpieza y desinfección:</strong> Conceptos generales. Consideraciones para el desarrollo de un programa limpieza y desinfección</li>
<li><strong>Higiene y salud del personal:</strong> Conceptos generales. Higiene y conducta del manipulador.</li>
<li><strong>Gestión de plagas:</strong> Consideraciones preliminares. Programa de control de plagas.</li>
<li><strong>Manejo y disposición de residuos:</strong> Conceptos generales. Tipos de desechos. Programa de gestión de residuos.</li>
<li><strong>Control de productos químicos:</strong> Conceptos generales. Tipos de productos químicos.</li>
<li><strong>Validación, vigilancia y verificación de los programas de higiene y saneamiento:</strong> Conceptos generales. Mecanismos para la validación. Vigilancia y verificación.</li>
<li><strong>Gestión documentaria de los programas de Higiene y Saneamiento:</strong> Importancia de la gestión documentaria de los programas de higiene y saneamiento. Principales entregables de los programas de higiene y saneamiento.</li>
<li><strong>Talleres prácticos</strong></li>
</ul>`
      )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const FSSC = {
  slug: "sistema-haccp-fssc-22000-codex-2022",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Sistema HACCP según FSSC 22000 y Codex Alimentarius Revisión 2022 | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: Sistema HACCP según la revisión 2022 del Codex Alimentarius y los requisitos de certificación del esquema FSSC 22000 V6. Certificado digital con QR.",
  fondo: "ficha-fssc.avif",
  miga: "HACCP FSSC 22000 y Codex 2022",
  descripcion:
    "Desarrollar la competencia para diseñar, implementar y gestionar un sistema HACCP robusto, integrando los principios científicos de la revisión 2022 del Codex Alimentarius con los requisitos de certificación del esquema FSSC 22000, asegurando un control eficaz de los peligros significativos y garantizando el cumplimiento de los estándares internacionales de inocuidad más exigentes del mercado global.",  h1: "Curso: “Sistema HACCP según FSSC 22000 y Codex Alimentarius Revisión 2022”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_B}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Desarrollar la competencia para diseñar, implementar y gestionar un sistema HACCP robusto, integrando los principios científicos de la revisión 2022 del Codex Alimentarius con los requisitos de certificación del esquema FSSC 22000, asegurando un control eficaz de los peligros significativos y garantizando el cumplimiento de los estándares internacionales de inocuidad más exigentes del mercado global.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "Fundamentos, ISO 22000 y FSSC 22000",
        true,
        `<ul>
<li>Generalidades del Sistema HACCP</li>
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
</li>
</ul>`
      ) +
        detalle(
          "HACCP según ISO 22000 y Codex Alimentarius",
          false,
          `<ul>
<li>Definiciones ISO 22000</li>
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
<li class="bloque-interno">Taller de identificación y evaluación de peligros y riesgos para los alimentos – caso práctico.</li>
<li class="bloque-interno">Taller de identificación de PCC y PPRO</li>
<li class="bloque-interno">Taller de elaboración de Sistema de Vigilancia de PCC y PPRO</li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const AUDITOR = {
  slug: "formacion-auditor-interno-haccp",
  horas: 40,
  pen: 45,
  usd: 15,
  title: "Curso: Formación de Auditor Interno del Sistema HACCP | Proinocuidad",
  desc:
    "Curso asíncrono (grabado) de 40 horas académicas: planificación, ejecución y cierre de auditorías internas del sistema HACCP bajo la norma ISO 19011, con hallazgos, informe de auditoría y acciones correctivas.",
  fondo: "ficha-auditor.avif",
  miga: "Auditor interno HACCP",
  descripcion:
    "Especializar al participante en la planificación, ejecución y cierre de auditorías internas del sistema HACCP, desarrollando el juicio crítico necesario para verificar no solo el cumplimiento documental, sino también la eficacia operativa y la validación científica de los controles, bajo los lineamientos de la norma ISO 19011 y los estándares internacionales de inocuidad alimentaria.",  h1: "Curso: “Formación de Auditor Interno del Sistema HACCP”",
  contenido: [
    bloque("I", "Datos generales", `<ul class="lista-datos">
<li><strong>Número de sesiones:</strong> 3 sesiones</li>
<li><strong>Modalidad:</strong> Asíncrono (Grabado)</li>
<li><strong>Certificación:</strong> 40 horas académicas</li>
</ul>`),
    bloque("II", "Beneficios", BENEFICIOS),
    bloque("III", "Público objetivo", `<p>${PUBLICO_B}</p>`),
    bloque(
      "IV",
      "Objetivo",
      `<p>Especializar al participante en la planificación, ejecución y cierre de auditorías internas del sistema HACCP, desarrollando el juicio crítico necesario para verificar no solo el cumplimiento documental, sino también la eficacia operativa y la validación científica de los controles, bajo los lineamientos de la norma ISO 19011 y los estándares internacionales de inocuidad alimentaria.</p>`
    ),
    bloque(
      "V",
      "Temario",
      detalle(
        "Módulo 1: Generalidades del Sistema HACCP e introducción a la auditoría",
        true,
        `<ul>
<li>¿Qué es HACCP?</li>
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
<li class="bloque-interno">Taller práctico</li>
</ul>
</li>
<li><strong>Etapas de la auditoría</strong>
<ul>
<li>Conceptos útiles</li>
<li>Proceso de auditoría</li>
<li>Finalidad de las auditorías</li>
<li>Etapas de la auditoría (PHVA)</li>
</ul>
</li>
</ul>`
      ) +
        detalle(
          "Módulo 2: Planeación y ejecución de la auditoría",
          false,
          `<ul>
<li><strong>Planeación de la auditoría</strong>
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
</li>
</ul>`
        ) +
        detalle(
          "Módulo 3: Ejecución y hallazgos de auditoría, informe de auditoría, seguimiento y acciones correctivas",
          false,
          `<ul>
<li><strong>Recopilación de información</strong>
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
</li>
</ul>`
        )
    ),
    METODOLOGIA,
    bloqueInversion("S/ 45", "US$ 15"),
    bloqueInscripcion(),
    bloquePagos(),
  ].join("\n\n"),
};

const FICHAS = [DIPLOMADO, LEGISLACION, BPM_POES, DIGESA, BPM_CODEX, PHS, FSSC, AUDITOR];

for (const f of FICHAS) {
  const dir = join(RAIZ, "cursos", f.slug);
  mkdirSync(dir, { recursive: true });
  const destino = join(dir, "index.html");
  const contenidoFinal = ficha(f, f.contenido);
  writeFileSync(destino, contenidoFinal, "utf8");
  if (!existsSync(destino)) throw new Error("no se generó " + destino);
  console.log("Ficha generada:", destino);
}
console.log("Total:", FICHAS.length, "fichas");
