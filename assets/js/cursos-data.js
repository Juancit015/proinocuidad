/**
 * Datos de los 8 cursos asíncronos de Proinocuidad.
 * Fuente única: documento oficial "_archivo/pagina web.pdf" (PDF).
 * - Certificación en horas académicas SEGÚN EL PDF (384 / 40).
 *   El formulario activo del cliente indica otras horas (240/32); el cliente lo corregirá.
 * - Archivos flyer: assets/img/flyer-curso-NN-<slug>.webp
 * - El contenido completo de cada curso vive en cursos/<slug>/index.html (grupo 4).
 * - urlCulqi: placeholder "#" hasta que el dueño genere los enlaces en su dashboard (TODO).
 */
window.PROINO_CURSOS = [
  {
    num: 1,
    slug: "diplomado-gestion-calidad-e-inocuidad",
    titulo: "Diplomado de Especialización: \u201CGestión de la Calidad e Inocuidad en la Industria Alimentaria\u201D",
    waLargo: "el Diplomado de Gestión de la Calidad e Inocuidad",
    etiqueta: "DIPLOMADO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "6 sesiones",
    horas: 384,
    inversionNacional: "S/ 120",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 37",
    flyer: "assets/img/flyer-curso-01-diplomado-sgcia.webp",
    urlCulqi: "#", // TODO(dueño): pegar enlace de pago Culqi de este curso
    enHome: true
  },
  {
    num: 2,
    slug: "legislacion-sanitaria-alimentos",
    titulo: "Curso: \u201CLegislación Sanitaria de Alimentos Nacional e Internacional\u201D",
    waLargo: "el Curso de Legislación Sanitaria de Alimentos Nacional e Internacional",
    etiqueta: "CURSO ESPECIALIZADO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-02-legislacion-sanitaria.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: true
  },
  {
    num: 3,
    slug: "implementacion-auditoria-bpm-poes-poe-plan-haccp",
    titulo: "Curso: \u201CImplementación y Auditoría de las BPM, Higiene y Saneamiento, POES, POE, Plan HACCP\u201D",
    waLargo: "el Curso de Implementación y Auditoría de BPM, POES, POE y Plan HACCP",
    etiqueta: "CURSO ESPECIALIZADO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-03-impl-auditoria-bpm-poes-poe-haccp.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: false
  },
  {
    num: 4,
    slug: "haccp-implementacion-certificacion-digesa-senasca",
    titulo: "Curso de Especialización: \u201CHACCP: Implementación y Certificación en Perú (DIGESA / SENASA)\u201D",
    waLargo: "el Curso de HACCP: Implementación y Certificación (DIGESA/SENASA)",
    etiqueta: "CURSO DE ESPECIALIZACIÓN",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-04-haccp-digesa-senasca.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: true
    },
  {
    num: 5,
    slug: "bpm-prerrequisitos-codex-2022-iso-22002-1",
    titulo: "Curso: \u201CBuenas Prácticas de Manufactura y Programas Prerrequisitos según Codex 2022 e ISO 22002-1:2009\u201D",
    waLargo: "el Curso de BPM y Programas Prerrequisitos según Codex 2022",
    etiqueta: "CURSO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-05-bpm-pp-codex-2022.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: false
  },
  {
    num: 6,
    slug: "programas-higiene-saneamiento",
    titulo: "Curso: \u201CProgramas de Higiene y Saneamiento en la Industria Alimentaria\u201D",
    waLargo: "el Curso de Programas de Higiene y Saneamiento",
    etiqueta: "CURSO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-06-programas-higiene-saneamiento.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: false
  },
  {
    num: 7,
    slug: "sistema-haccp-fssc-22000-codex-2022",
    titulo: "Curso: \u201CSistema HACCP según FSSC 22000 y Codex Alimentarius Revisión 2022\u201D",
    waLargo: "el Curso de Sistema HACCP según FSSC 22000 y Codex 2022",
    etiqueta: "CURSO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-07-haccp-fssc-22000-codex-2022.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: false
  },
  {
    num: 8,
    slug: "formacion-auditor-interno-haccp",
    titulo: "Curso: \u201CFormación de Auditor Interno del Sistema HACCP\u201D",
    waLargo: "el Curso de Formación de Auditor Interno HACCP",
    etiqueta: "CURSO",
    modalidad: "Asíncrono (Grabado)",
    sesiones: "3 sesiones",
    horas: 40,
    inversionNacional: "S/ 45",
    inversionNacionalNota: "no incluye IGV",
    inversionExtranjero: "US$ 15",
    flyer: "assets/img/flyer-curso-08-auditor-interno-haccp.webp",
    urlCulqi: "#", // TODO(dueño): enlace Culqi
    enHome: true
  }
];

// Constantes globales de contacto del sitio (según decisión con el dueño).
window.PROINO_SITIO = {
  whatsapp: "https://wa.me/51981365982",
  whatsappNumeroVisible: "+51 981 365 982",
  email: "administracion@proinocuidad.com",
  horario: "Lunes a viernes de 8 AM a 8 PM",
  ubicacion: "Trujillo, La Libertad, Perú",
  direccionExacta: "Próximamente",
  aulaVirtual: "https://proinocuidad.com/aula/login/",
  comunidad: "https://chat.whatsapp.com/GXh0wdFZWgEGz2dlpCTPvN",
  formularioInscripcion:
    "https://docs.google.com/forms/d/1OoggGqBor_FDBcKoo807nPf0atujRvqqXrIqDhBiRpI/viewform",
  // Medios de pago informativos — decisión del dueño: titular único en todos
  // los métodos (excepción registrada al PDF, que decía la razón social para BBVA).
  titularPagos: "Claudia Rubio Jiménez",
  numeroPagos: "+51 99999999", // TODO(dueño): reemplazar por el número real de Yape/Plin
};
