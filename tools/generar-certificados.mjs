// tools/generar-certificados.mjs
// Genera assets/data/certificados.json a partir de "VERIFICA TU CERTIFICADO.xlsx".
// Uso: node tools/generar-certificados.mjs [ruta-al-xlsx]
// Requiere: npm i xlsx (en tools/) o el cache de bun en ~/.cache/.bun/install/cache/xlsx@0.18.5@@@1

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(__dirname, "..");

let X;
try {
  const require = createRequire(import.meta.url);
  X = require("/home/juan/.cache/.bun/install/cache/xlsx@0.18.5@@@1/xlsx.mjs");
} catch (e) {
  try {
    const require = createRequire(import.meta.url);
    X = require("xlsx");
  } catch (e2) {
    console.error("Falta la libreria xlsx. Instalala con: cd tools && npm i xlsx");
    process.exit(1);
  }
}

const xlsxPath = process.argv[2] || "/home/juan/Descargas/VERIFICA TU CERTIFICADO.xlsx";
const outPath = join(RAIZ, "assets", "data", "certificados.json");

function normalizeDni(v) {
  return String(v == null ? "" : v).replace(/\D/g, "");
}
function normalizeName(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}
function toIso(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "number") {
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    return d.toISOString().slice(0, 10);
  }
  return String(v || "").trim();
}

const buf = readFileSync(xlsxPath);
const wb = X.read(buf, { type: "buffer", cellDates: true });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = X.utils.sheet_to_json(ws, { header: 1, raw: false, defval: null });

const records = [];
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r || !r[1]) continue;
  records.push({
    codigo: r[0],
    nombre: String(r[1]).trim(),
    nombre_normalizado: normalizeName(r[1]),
    dni_original: String(r[3] == null ? "" : r[3]).trim(),
    dni_normalizado: normalizeDni(r[3]),
    programa: String(r[4] || "").trim(),
    fecha_inicio: toIso(r[5]),
    fecha_termino: toIso(r[6]),
    horas: r[7],
    estado: String(r[8] || "VALIDO").trim(),
    certificado_url: String(r[9] || "").trim(),
  });
}

mkdirSync(join(RAIZ, "assets", "data"), { recursive: true });
writeFileSync(outPath, JSON.stringify(records, null, 2) + "\n", "utf-8");
console.log("Generados", records.length, "registros en", outPath);