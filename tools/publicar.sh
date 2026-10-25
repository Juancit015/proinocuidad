#!/usr/bin/env bash
# Publicar el sitio estático en el hosting (vía SSH NO; se ejecuta en un clon
# temporal en el server o se replica la lista a mano vía MCP). La lista
# blanca es el contrato: estos 13 ítems son TODO el sitio público.
#
# Uso en el server (desde una sesión efímera /tmp):
#   git clone --depth 1 https://github.com/Juancit015/proinocuidad.git /tmp/dep
#   cp -r index.html 404.html .htaccess robots.txt sitemap.xml llms.txt \
#         llms-full.txt assets servicios cursos noticias nosotros \
#         inocuidad-alimentaria /home/guanbhctsy/proinocuidad.com/
#   rm -rf /tmp/dep
#
# LISTA BLANCA del sitio público (12 ítems):
#   index.html  404.html  .htaccess  robots.txt  sitemap.xml
#   llms.txt  llms-full.txt
#   assets/  servicios/  cursos/  noticias/  nosotros/  inocuidad-alimentaria/
#   ajax/ (endpoint PHP del formulario: /ajax/envio-inscripcion.php)
#
# EXCLUIDOS a propósito (existen en el repo, no en el docroot):
#   openspec/  tools/  .opencode/  logos-metodos-de-pago/  STRUCTURE.md
#   README.md  AGENTS.md  CHANGELOG.md  .git/
#   _archivo/ (no está trackeado: jamás entra)
#
# VERIFICACIÓN post-deploy (TODAS debieron pasar el 2026-10-25):
#   - http_probe de las 20 URLs del sitemap: 200
#   - /robots.txt, /llms.txt, /llms-full.txt, /sitemap.xml: 200
#   - /pagina-inexistente y /404.html: estado 404
#   - /aula/ (y su .user.ini) INTACTA tras el deploy
#   - aula/login/ → 404 hasta que el Moodle (F3) exista
set -euo pipefail
SRC="${1:-.}"
DST="${2:-/home/guanbhctsy/proinocuidad.com}"
cd "$SRC"
for item in index.html 404.html .htaccess robots.txt sitemap.xml llms.txt \
            llms-full.txt assets servicios cursos noticias nosotros \
            inocuidad-alimentaria ajax; do
  cp -r "$item" "$DST/"
done
echo "Deploy de la lista blanca completo hacia $DST"
