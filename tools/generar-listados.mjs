/**
 * Generador de listados estáticos de cursos de Proinocuidad.
 * Ejecutar:  node tools/generar-listados.mjs
 * Emite:     tarjetas HTML dentro de cursos/index.html (#lista-cursos)
 *            y de index.html (#cursos-destacados), entre los marcadores
 *            <!-- generar-listados:inicio --> / <!-- generar-listados:fin -->.
 *
 * Fuente única: assets/js/cursos-data.js (window.PROINO_CURSOS).
 * La plantilla replica el markup que generaba el JS en línea de cada página
 * (mismas clases, mismos SVG, misma excepción de flyer DIGESA/SENASA).
 * No editar las tarjetas a mano: se sobrescriben al regenerar.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const WA_URL = "https://wa.me/51981365982";
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";
const SVG_MAS =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>';
const SVG_WA =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' +
  WA_PATH +
  '"/></svg>';
const SIN_FLYER_SLUG = "haccp-implementacion-certificacion-digesa-senasca";

function sinComillas(t) {
  return String(t).replace(/"/g, "");
}

/* Tarjeta de la página Cursos (8 cursos, con sesiones, número y certificación). */
function tarjetaCursos(c, P) {
  const tieneFlyer = c.slug !== SIN_FLYER_SLUG;
  const imgBloque = tieneFlyer
    ? '<div class="card-img"><img src="' +
      P +
      c.flyer +
      '" alt="Flyer del curso ' +
      sinComillas(c.titulo) +
      '" loading="lazy"></div>'
    : '<div class="card-img marca"><img src="' +
      P +
      'assets/img/logo-proinocuidad.png" alt="Logo Proinocuidad"><p>Flyer en preparación. Escríbenos para más información de este curso.</p></div>';
  return (
    '<article class="card card-curso">' +
    imgBloque +
    '<div class="card-body">' +
    '<ul class="chips"><li>' +
    c.modalidad +
    "</li><li>" +
    c.sesiones +
    "</li><li>Curso " +
    c.num +
    '</li><li class="precio">' +
    c.inversionNacional +
    " (" +
    c.inversionNacionalNota +
    ")</li></ul>" +
    "<h3>" +
    c.titulo +
    "</h3>" +
    "<p><strong>Certificación:</strong> " +
    c.horas +
    " horas académicas con certificado digital con QR.</p>" +
    '<div class="card-acciones">' +
    '<a class="btn btn-rojo btn-sm" href="' +
    c.slug +
    '/index.html">' +
    SVG_MAS +
    "Más información</a>" +
    '<a class="btn btn-whatsapp btn-sm" href="' +
    WA_URL +
    '" target="_blank" rel="noopener">' +
    SVG_WA +
    "WhatsApp</a>" +
    "</div>" +
    "</div></article>"
  );
}

/* Tarjeta de "Cursos destacados" del Inicio (filtro enHome). */
function tarjetaHome(c) {
  return (
    '<article class="card card-curso">' +
    '<div class="card-img"><img src="' +
    c.flyer +
    '" alt="Flyer del curso ' +
    sinComillas(c.titulo) +
    '" loading="lazy"></div>' +
    '<div class="card-body">' +
    '<ul class="chips"><li>' +
    c.modalidad +
    "</li><li>" +
    c.horas +
    " h</li>" +
    '<li class="precio">' +
    c.inversionNacional +
    " (" +
    c.inversionNacionalNota +
    ")</li></ul>" +
    "<h3>" +
    c.titulo +
    "</h3>" +
    '<div class="card-acciones">' +
    '<a class="btn btn-rojo btn-sm" href="cursos/' +
    c.slug +
    '/index.html">' +
    SVG_MAS +
    "Más información</a>" +
    '<a class="btn btn-whatsapp btn-sm" href="' +
    WA_URL +
    '" target="_blank" rel="noopener">' +
    SVG_WA +
    "WhatsApp</a>" +
    "</div>" +
    "</div></article>"
  );
}

function cargarCursos() {
  const fuente = readFileSync(join(RAIZ, "assets/js/cursos-data.js"), "utf8");
  const m = fuente.match(/window\.PROINO_CURSOS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error("No se encontró window.PROINO_CURSOS en cursos-data.js");
  return new Function("return (" + m[1] + ");")();
}

function reemplazar(archivo, htmlTarjetas) {
  const ruta = join(RAIZ, archivo);
  const s = readFileSync(ruta, "utf8");
  const ini = "<!-- generar-listados:inicio -->";
  const fin = "<!-- generar-listados:fin -->";
  const i = s.indexOf(ini);
  const j = s.indexOf(fin);
  if (i === -1 || j === -1 || j < i)
    throw new Error("Marcadores no encontrados en " + archivo);
  const antes = s.slice(0, i + ini.length);
  const despues = s.slice(j);
  writeFileSync(ruta, antes + htmlTarjetas + despues);
}

const cursos = cargarCursos();
reemplazar("cursos/index.html", cursos.map((c) => tarjetaCursos(c, "../")).join(""));
const destacados = cursos.filter((c) => c.enHome);
reemplazar("index.html", destacados.map((c) => tarjetaHome(c)).join(""));
console.log(
  "listados generados: " + cursos.length + " en cursos, " + destacados.length + " en inicio"
);
