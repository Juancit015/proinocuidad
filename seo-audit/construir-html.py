#!/usr/bin/env python3
"""Convierte reporte.md a un HTML autocontenido con la paleta de marca.

No es un conversor de Markdown general: cubre exactamente las construcciones
que usa reporte.md (encabezados, tablas, listas, bloques de código, negritas,
código en línea, reglas y citas).
"""
import html
import re
from pathlib import Path

BASE = Path(__file__).parent
SRC = BASE / "reporte.md"
OUT = BASE / "reporte.html"


def inline(text: str) -> str:
    """Escapa y aplica negritas y código en línea.

    Los tramos entre backticks se apartan antes de buscar negritas: si no, un
    `*` dentro del código (p. ej. `*/index.html`) rompe la expresión regular y
    el `**` se queda sin convertir.
    """
    text = html.escape(text, quote=False)
    trozos: list[str] = []

    def guardar(m: re.Match) -> str:
        trozos.append(f"<code>{m.group(1)}</code>")
        return f"\x00{len(trozos) - 1}\x00"

    text = re.sub(r"`([^`]+)`", guardar, text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    return re.sub(r"\x00(\d+)\x00", lambda m: trozos[int(m.group(1))], text)


def convert(md: str) -> str:
    lines = md.split("\n")
    out: list[str] = []
    i = 0
    in_ul = False
    in_table = False

    def close_ul():
        nonlocal in_ul
        if in_ul:
            out.append("</ul>")
            in_ul = False

    def close_table():
        nonlocal in_table
        if in_table:
            out.append("</tbody></table>")
            in_table = False

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # bloque de código
        if stripped.startswith("```"):
            close_ul()
            close_table()
            i += 1
            buf = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                buf.append(html.escape(lines[i]))
                i += 1
            out.append("<pre><code>" + "\n".join(buf) + "</code></pre>")
            i += 1
            continue

        # tabla
        if stripped.startswith("|") and i + 1 < len(lines) and re.match(
            r"^\|[\s:|-]+\|$", lines[i + 1].strip()
        ):
            close_ul()
            headers = [c.strip() for c in stripped.strip("|").split("|")]
            out.append("<div class='tabla'><table><thead><tr>")
            for h in headers:
                out.append(f"<th>{inline(h)}</th>")
            out.append("</tr></thead><tbody>")
            in_table = True
            i += 2
            continue

        if in_table:
            if stripped.startswith("|"):
                cells = [c.strip() for c in stripped.strip("|").split("|")]
                out.append("<tr>")
                for c in cells:
                    out.append(f"<td>{inline(c)}</td>")
                out.append("</tr>")
                i += 1
                continue
            close_table()

        # regla
        if stripped == "---":
            close_ul()
            close_table()
            out.append("<hr>")
            i += 1
            continue

        # encabezados
        m = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if m:
            close_ul()
            close_table()
            level = len(m.group(1))
            out.append(f"<h{level}>{inline(m.group(2))}</h{level}>")
            i += 1
            continue

        # listas
        if re.match(r"^[-*]\s+", stripped):
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{inline(re.sub(r'^[-*]\s+', '', stripped))}</li>")
            i += 1
            continue

        if in_ul and not stripped:
            close_ul()
            i += 1
            continue

        if stripped:
            close_ul()
            close_table()
            out.append(f"<p>{inline(stripped)}</p>")
        i += 1

    close_ul()
    close_table()
    return "\n".join(out)


TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Auditoría SEO — proinocuidad.com</title>
<style>
  :root{{
    --azul:#101477; --rojo:#ad343b; --gris:#5c5f6a; --linea:#e3e5ee;
    --fondo:#ffffff; --suave:#f6f7fb;
  }}
  *{{box-sizing:border-box}}
  body{{
    margin:0; background:var(--suave); color:#1c1d24;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    line-height:1.65; font-size:16px;
  }}
  .hoja{{max-width:960px; margin:0 auto; background:var(--fondo); padding:56px 64px 96px;
        box-shadow:0 1px 3px rgba(16,20,119,.08)}}
  header.portada{{border-bottom:3px solid var(--azul); padding-bottom:24px; margin-bottom:40px}}
  header.portada .marca{{font-size:12px; letter-spacing:.14em; text-transform:uppercase;
        color:var(--rojo); font-weight:700; margin:0 0 8px}}
  h1{{font-size:34px; line-height:1.2; margin:0 0 12px; color:var(--azul); letter-spacing:-.02em}}
  h2{{font-size:24px; margin:52px 0 16px; padding-bottom:8px; border-bottom:1px solid var(--linea);
     color:var(--azul); letter-spacing:-.01em}}
  h3{{font-size:18px; margin:34px 0 10px; color:#1c1d24}}
  h4{{font-size:16px; margin:24px 0 8px; color:var(--gris); text-transform:uppercase;
     letter-spacing:.06em}}
  p{{margin:0 0 14px}}
  ul{{margin:0 0 18px; padding-left:22px}}
  li{{margin:0 0 7px}}
  strong{{color:#0d0f18}}
  code{{background:#eef0f8; padding:1px 5px; border-radius:4px; font-size:.9em;
       font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; color:#2a2f6b}}
  pre{{background:#12142a; color:#e8eaf6; padding:18px 20px; border-radius:10px;
      overflow-x:auto; margin:0 0 20px}}
  pre code{{background:none; color:inherit; padding:0; font-size:13.5px; line-height:1.6}}
  hr{{border:0; border-top:1px solid var(--linea); margin:40px 0}}
  .tabla{{overflow-x:auto; margin:0 0 22px; border:1px solid var(--linea); border-radius:10px}}
  table{{border-collapse:collapse; width:100%; font-size:14.5px}}
  th{{background:var(--azul); color:#fff; text-align:left; padding:10px 14px;
      font-weight:600; font-size:13px; letter-spacing:.02em; white-space:nowrap}}
  td{{padding:10px 14px; border-top:1px solid var(--linea); vertical-align:top}}
  tbody tr:nth-child(even){{background:#fafbff}}
  .meta{{display:flex; flex-wrap:wrap; gap:10px 28px; font-size:13.5px; color:var(--gris)}}
  .meta span strong{{color:var(--azul)}}
  .aviso{{background:#fdf3f3; border-left:4px solid var(--rojo); padding:14px 18px;
         border-radius:0 8px 8px 0; margin:0 0 22px; font-size:15px}}
  .pie{{margin-top:64px; padding-top:20px; border-top:1px solid var(--linea);
       font-size:13px; color:var(--gris)}}
  @media (max-width:720px){{
    .hoja{{padding:28px 20px 64px}}
    h1{{font-size:26px}} h2{{font-size:20px}}
    table{{font-size:13px}} th,td{{padding:8px 10px}}
  }}
  @media print{{
    body{{background:#fff}}
    .hoja{{box-shadow:none; padding:0; max-width:none}}
    h2{{page-break-after:avoid}}
    .tabla,pre{{page-break-inside:avoid}}
  }}
</style>
</head>
<body>
<div class="hoja">
<header class="portada">
  <p class="marca">Auditoría de solo lectura · sin cambios aplicados</p>
  <h1>Auditoría SEO — proinocuidad.com</h1>
  <div class="meta">
    <span><strong>Fecha:</strong> 27 de noviembre de 2026</span>
    <span><strong>Alcance:</strong> 22 URLs públicas</span>
    <span><strong>Stack:</strong> HTML estático, LiteSpeed</span>
  </div>
</header>
{contenido}
<p class="pie">Informe generado a partir de Search Console, rastreo directo del repositorio,
producción y medición en Chromium real. Los datos que dependían de SE Ranking están marcados
como «no disponible»: el plan venció el 2026-11-12 y no se estimó ninguna cifra en su lugar.</p>
</div>
</body>
</html>
"""


def main() -> None:
    md = SRC.read_text(encoding="utf-8")
    # quitar el H1 y la ficha de metadatos: ya están en la portada del HTML
    md = re.sub(r"\A# .*\n", "", md, count=1)
    md = re.sub(r"\A(?:\s*\*\*[^\n]*\n)+\s*---\n", "", md, count=1)
    body = convert(md)
    OUT.write_text(TEMPLATE.format(contenido=body), encoding="utf-8")
    print(f"escrito {OUT} ({OUT.stat().st_size} B)")


if __name__ == "__main__":
    main()
