# Tasks

## 1. Código

- [x] 1.1 `generar-certificado.php`: función `un_mes_antes()` con el día
      recortado al último del mes destino, y uso en el default de `$tsIni`.
- [x] 1.2 `tools/aula-plugin-certificados/classes/emisor.php`: método
      `unMesAntes()` con la misma regla, y uso en el default de `$fechaIni`.
- [x] 1.3 Probar el cálculo con los casos límite: 27/11, 31/03, 30/03,
      31/05, 31/12, 15/01 y 31/03 en año bisiesto.

## 2. Verificación

- [x] 2.1 Generar un certificado de prueba con `fecha=2026-11-27` y comprobar
      que la página 1 dice «del 27 de octubre al 27 de noviembre del 2026» y
      que la página 2 sigue mostrando las horas del sílabo.
- [x] 2.2 Comprobar que un `fecha_inicio` explícito sigue mandando.
- [x] 2.3 Borrar el PDF de prueba y su posible ficha.

## 3. Despliegue

- [x] 3.1 Publicar el endpoint con `publicar.sh` y comprobar `php -l` y md5
      idéntico entre repo y server.
- [x] 3.2 Aplicar el mismo cambio en `classes/emisor.php` del aula (fuera del
      docroot) y comprobar `php -l`.
- [x] 3.3 Verificar que un certificado nuevo del aula sale con el período de
      un mes.

## Notas de ejecución

- `publicar.sh` **no copia** `generar-certificado.php`: no está en su lista
  blanca. El endpoint se parcheó en el server con `fs_edit` y quedó con el
  mismo md5 que el repo (`17df037d15231a912de678a6c96fb10a`).
- El plugin del aula quedó con el md5 del repo
  (`336515a716a6b88fde2c1aa252fcc70f`).
- Prueba real: `TEST-UNMES-001` (fecha 27/11/2026, 384 h) → «del 27 de
  octubre al 27 de noviembre del 2026»; `TEST-UNMES-002` con
  `fecha_inicio=2026-11-01` → «del 1 al 27 de noviembre del 2026». Ambos PDFs
  borrados después.
- `unMesAntes()` del plugin invocado por reflexión: 27/11 → 27/10,
  31/03 → 28/02, 31/05 → 30/04, 15/01 → 15/12/2025, 31/03/2024 → 29/02/2024.
