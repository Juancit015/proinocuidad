/* Proinocuidad - JS global: nav móvil + mega-menú accesible */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  var mobileQuery = window.matchMedia("(max-width: 860px)");

  function actualizarMenu(abierto) {
    if (!header || !toggle) return;
    header.classList.toggle("menu-abierto", abierto);
    // Bloquea el desplazamiento del fondo SOLO en móvil: la regla que lee esta
    // clase vive dentro de @media (max-width: 860px), así que en escritorio la
    // clase es inocua y no afecta a ningún position: sticky.
    if (mobileQuery.matches) {
      document.body.classList.toggle("menu-abierto-scroll", abierto);
    } else {
      document.body.classList.remove("menu-abierto-scroll");
    }
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  }

  function cerrarAcordeones() {
    document.querySelectorAll(".nav-accordion-toggle").forEach(function (boton) {
      boton.setAttribute("aria-expanded", "false");
      var nombre = boton.getAttribute("data-label");
      if (nombre) boton.setAttribute("aria-label", "Mostrar opciones de " + nombre);
      var indicador = boton.querySelector("span[aria-hidden='true']");
      if (indicador) indicador.textContent = "+";
      var grupo = boton.closest(".nav-drop");
      if (grupo) grupo.classList.remove("abierto");
      var enlace = grupo && grupo.querySelector("a");
      if (enlace) enlace.setAttribute("aria-expanded", "false");
    });
  }

  function cerrarMenu(devolverFoco) {
    actualizarMenu(false);
    cerrarAcordeones();
    if (devolverFoco && toggle) toggle.focus();
  }

  // --- Menú móvil (botón hamburguesa) ---
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var abierto = !header.classList.contains("menu-abierto");
      if (abierto) actualizarMenu(true);
      else cerrarMenu(false);
    });
  }

  // --- Acordeón de submenús en móvil ---
  document.querySelectorAll(".nav-accordion-toggle").forEach(function (boton) {
    var nombre = boton.getAttribute("aria-label").replace("Mostrar opciones de ", "");
    boton.setAttribute("data-label", nombre);
    boton.addEventListener("click", function () {
      if (!mobileQuery.matches) return;
      var grupo = boton.closest(".nav-drop");
      var abrir = boton.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".nav-accordion-toggle").forEach(function (otro) {
        if (otro !== boton) {
          otro.setAttribute("aria-expanded", "false");
          otro.setAttribute("aria-label", "Mostrar opciones de " + otro.getAttribute("data-label"));
          var otroIndicador = otro.querySelector("span[aria-hidden='true']");
          if (otroIndicador) otroIndicador.textContent = "+";
          var otroGrupo = otro.closest(".nav-drop");
          if (otroGrupo) {
            otroGrupo.classList.remove("abierto");
            var otroEnlace = otroGrupo.querySelector("a");
            if (otroEnlace) otroEnlace.setAttribute("aria-expanded", "false");
          }
        }
      });
      boton.setAttribute("aria-expanded", abrir ? "true" : "false");
      boton.setAttribute("aria-label", (abrir ? "Ocultar opciones de " : "Mostrar opciones de ") + nombre);
      var indicador = boton.querySelector("span[aria-hidden='true']");
      if (indicador) indicador.textContent = abrir ? "−" : "+";
      if (grupo) grupo.classList.toggle("abierto", abrir);
      var enlace = grupo && grupo.querySelector("a");
      if (enlace) enlace.setAttribute("aria-expanded", abrir ? "true" : "false");
    });
  });

  mobileQuery.addEventListener("change", function (e) {
    if (!e.matches) cerrarMenu(false);
  });

  // --- Cerrar con Escape (accesibilidad) ---
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !header || !header.classList.contains("menu-abierto")) return;
    cerrarMenu(true);
    document.querySelectorAll(".mega-panel a").forEach(function (a) { a.blur(); });
  });

  // --- Cerrar al tocar el velo (fuera del panel) ---
  // El velo es un pseudo-elemento: no existe como elemento ni puede escucharse,
  // y el clic sobre él tiene como destino .site-header, no el velo. Por eso no
  // se pregunta "¿he tocado dentro de la cabecera?" sino "¿he tocado el panel
  // o el botón?", que es lo que de verdad no debe cerrar el menú. El velo tiene
  // pointer-events para tapar el contenido de detrás: un toque fuera nunca
  // debería activar un enlace que está oculto.
  document.addEventListener("click", function (e) {
    if (!header || !header.classList.contains("menu-abierto")) return;
    if (!mobileQuery.matches) return;
    if (menu && menu.contains(e.target)) return;
    if (toggle && toggle.contains(e.target)) return;
    cerrarMenu(false);
  });

  // --- Cerrar menú móvil al navegar ---
  document.querySelectorAll(".nav-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (a.getAttribute("target") || mobileQuery.matches) cerrarMenu(false);
      // Ancla de la misma página en escritorio: el foco queda en el enlace
      // dentro del .nav-drop y :focus-within mantiene el mega-panel abierto
      // sobre el contenido de destino. Al soltar el foco el panel se cierra
      // por su regla CSS; si el cursor sigue encima, :hover lo mantiene y
      // la clase guard inferior lo oculta hasta que el ratón sale del drop
      // (la apertura por teclado no se toca: esto solo corre en el clic).
      else if (a.getAttribute("href").charAt(0) === "#") {
        a.blur();
        var drop = a.closest(".nav-drop");
        if (drop) drop.classList.add("cerrado-por-ancla");
      }
    });
  });
  // --- Limpia la clase guard del cierre por ancla ---
  // Sin esto el drop quedaría cerrado aunque el cursor se apartara. Sale el
  // ratón (mouseleave) o vuelve el foco por teclado (focusin) y el drop
  // vuelve a comportarse como siempre.
  document.querySelectorAll(".nav-drop").forEach(function (d) {
    var limpiar = function () { d.classList.remove("cerrado-por-ancla"); };
    d.addEventListener("mouseleave", limpiar);
    d.addEventListener("focusin", limpiar);
  });
  // --- Entrada animada de bloques de dos columnas (sin JS = contenido visible) ---
  var raiz = document.documentElement;
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    raiz.classList.add("js-anim");
    var bloques = document.querySelectorAll(".identidad-grid");
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("en-vista"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    bloques.forEach(function (b) { obs.observe(b); });
  }
  // --- Botón subir: visible solo al bajar, oculto en el inicio ---
  var subir = document.querySelector(".to-top-proi");
  if (subir) {
    var mostrarSubir = function () {
      subir.classList.toggle("is-visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", mostrarSubir, { passive: true });
    mostrarSubir();
  }

  // --- Flotantes: frenan sobre la barra de copyright ---
  // Los botones están a `bottom: 26px`, así que su borde inferior se apoya en
  // `innerHeight - 26`. Cuando la barra sube por encima de esa línea, el freno
  // la compensa y deja el botón justo encima de ella; al subir vuelve a 0.
  // Se lee el `bottom` calculado para no duplicar el valor del CSS.
  var barraPie = document.querySelector(".footer-bottom");
  var flotanteWa = document.querySelector(".flotante-whatsapp");
  if (barraPie && flotanteWa && window.requestAnimationFrame) {
    var raizFreno = document.documentElement;
    var frenoPendiente = false;
    var medirFreno = function () {
      frenoPendiente = false;
      var separacion = parseFloat(getComputedStyle(flotanteWa).bottom) || 0;
      var limite = window.innerHeight - separacion;
      var freno = Math.max(0, limite - barraPie.getBoundingClientRect().top);
      raizFreno.style.setProperty("--freno-flotantes", (freno > 0.5 ? freno : 0) + "px");
    };
    var pedirFreno = function () {
      if (frenoPendiente) return;
      frenoPendiente = true;
      window.requestAnimationFrame(medirFreno);
    };
    window.addEventListener("scroll", pedirFreno, { passive: true });
    window.addEventListener("resize", pedirFreno);
    medirFreno();
  }

  // --- Desplegable "Ver más" con transición suave ---
  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  function activarAcordeonSuave(selector) {
    document.querySelectorAll(selector).forEach(function (det) {
      var resumen = det.querySelector("summary");
      if (!resumen) return;
      var anim = null;
      var alturaCerrada = function () {
        return resumen.getBoundingClientRect().bottom - det.getBoundingClientRect().top;
      };
      var terminar = function () {
        det.style.overflow = "";
        anim = null;
      };
      resumen.addEventListener("click", function (e) {
        if (reducirMovimiento.matches) return;
        e.preventDefault();
        if (anim) { anim.cancel(); terminar(); }
        var abriendo = !det.open;
        if (abriendo) {
          document.querySelectorAll(selector + "[open]").forEach(function (otro) {
            if (otro !== det) {
              var otroResumen = otro.querySelector("summary");
              if (otroResumen) otroResumen.click();
            }
          });
        }
        var desde = abriendo ? alturaCerrada() : det.getBoundingClientRect().height;
        if (abriendo) det.open = true;
        var hasta = abriendo ? det.getBoundingClientRect().height : alturaCerrada();
        det.style.overflow = "hidden";
        anim = det.animate({ height: [desde + "px", hasta + "px"] }, { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });
        anim.onfinish = function () {
          if (!abriendo) det.open = false;
          terminar();
        };
      });
    });
  }

  activarAcordeonSuave(".ampliar");
  activarAcordeonSuave(".temario-modulo");

  // --- Formulario de inscripción: comprobante boleta/factura condicional ---
  document.querySelectorAll(".form-inscripcion").forEach(function (form) {
    var check = form.querySelector('input[name="desea_comprobante"]');
    var bloqueTipo = form.querySelector(".form-tipo-comp");
    var bloqueFactura = form.querySelector(".form-factura");
    var inputRuc = form.querySelector('input[name="ruc"]');
    var inputRazon = form.querySelector('input[name="razon_social"]');
    // SU párrafo de error (fieldset de factura), no el primero del form
    // (antes caía en el del voucher y se lo cebaba).
    var error = form.querySelector('.form-tipo-comp .campo-error');
    if (!check || !bloqueTipo) return;
    function tipoElegido() {
      var r = form.querySelector('input[name="tipo_comprobante"]:checked');
      return r ? r.value : "boleta";
    }
    function actualizar() {
      var conComprobante = check.checked;
      bloqueTipo.hidden = !conComprobante;
      var esFactura = conComprobante && tipoElegido() === "factura";
      bloqueFactura.hidden = !esFactura;
      inputRuc.required = esFactura;
      inputRazon.required = esFactura;
      if (!esFactura && error) error.hidden = true;
    }
    check.addEventListener("change", actualizar);
    form.querySelectorAll('input[name="tipo_comprobante"]').forEach(function (r) {
      r.addEventListener("change", actualizar);
    });
    actualizar();
    form.addEventListener("submit", function (ev) {
      // La mutación del celular a "+51 " NO va aquí: se hace en el listener
      // de envío, después de la verificación de validez, porque el valor con
      // prefijo no pasa el pattern ni el maxlength del input y dejaba el
      // form.checkValidity() en false justo cuando el otro listener lo
      // re-checka: el envío salia sin preventDefault, sin AJAX y sin _next.
      if (check.checked && tipoElegido() === "factura") {
        var rucOk = /^\d{11}$/.test(inputRuc.value.trim());
        var razonOk = inputRazon.value.trim().length > 1;
        if (!rucOk || !razonOk) {
          ev.preventDefault();
          error.textContent = !rucOk
            ? "Para factura ingresa un RUC válido de 11 dígitos."
            : "Para factura ingresa la razón social.";
          error.hidden = false;
          (!rucOk ? inputRuc : inputRazon).focus();
          return;
        }
      }
      if (error) error.hidden = true;
    });
  });

  // --- Reglas de documento y celular por país (Perú / Extranjero) ---
  // El HTML nace con Perú predeterminado por el generador; este bloque
  // intercambia etiqueta, pattern, placeholder y prefijo cuando el usuario
  // cambia el select. La mutación del celular con "+51 " corre SOLO en el
  // submit, para que el correo llegue con el número completo y el valor
  // editado no se asome en el campo entre envíos.
  var REGLAS_PAIS = {
    "Perú": {
      docLabel: "DNI",
      docPattern: "[0-9]{8}",
      docTitle: "El DNI tiene 8 dígitos.",
      docPlaceholder: "8 dígitos",
      celPattern: "[0-9]{9}",
      celMax: "9",
      celTitle: "El celular peruano lleva 9 dígitos que empiezan en 9.",
      celPlaceholder: "999 999 999",
      prefijo: true
    },
    "Extranjero": {
      docLabel: "Documento/Pasaporte",
      docPattern: "[A-Za-z0-9]{5,17}",
      docTitle: "Número de pasaporte o documento (letras y números).",
      docPlaceholder: "N.º de pasaporte",
      celPattern: "[0-9+ ()-]{5,20}",
      celMax: "20",
      celTitle: "Incluye el código de país, ej. +57 300 123 4567.",
      celPlaceholder: "+57 300 123 4567",
      prefijo: false
    }
  };
  document.querySelectorAll(".form-inscripcion").forEach(function (form) {
    var pais = form.querySelector('select[name="pais"]');
    var docLabel = form.querySelector("label:has(> input[name='dni'])");
    var inputDni = form.querySelector('input[name="dni"]');
    var inputCel = form.querySelector('input[name="celular"]');
    var prefijo = form.querySelector(".campo-con-prefijo .prefijo");
    if (!pais || !inputDni || !inputCel) return;
    function aplicarPais(nombre) {
      var r = REGLAS_PAIS[nombre];
      if (!r) return;
      if (docLabel) {
        // el texto de la etiqueta vive directo en el label (dni) o dentro de
        // .label-tit (los campos con la marca "(opcional)")
        var contenedor = docLabel.querySelector(".label-tit") || docLabel;
        var tn = contenedor.childNodes[0];
        if (tn && tn.nodeType === 3) { tn.nodeValue = r.docLabel; }
        else { docLabel.insertBefore(document.createTextNode(r.docLabel + "\n"), docLabel.firstChild); }
      }
      inputDni.setAttribute("pattern", r.docPattern);
      inputDni.setAttribute("title", r.docTitle);
      inputDni.setAttribute("placeholder", r.docPlaceholder);
      inputCel.setAttribute("pattern", r.celPattern);
      inputCel.setAttribute("maxlength", r.celMax);
      inputCel.setAttribute("title", r.celTitle);
      inputCel.setAttribute("placeholder", r.celPlaceholder);
      if (prefijo) prefijo.hidden = !r.prefijo;
    }
    pais.addEventListener("change", function () { aplicarPais(pais.value); });
    // Estado vigente del form al cargar (Perú no cambia nada; por si el HTML
    // llegara a traer otro select pre-elegido en el futuro)
    aplicarPais(pais.value);
    // 2.4: mensaje del documento en SU párrafo (bajo el input del DNI, no
    // el genérico del form). El evento invalid SÍ se dispara aunque el
    // navegador cancele el submit; preventDefault lo corta para que solo
    // hable el mensajito inline (la burbuja nativa de Chrome salía encima
    // del campo y tapaba la cabecera en móvil).
    var errorDoc = form.querySelector('[data-campo-error="dni"]');
    if (errorDoc) {
      inputDni.addEventListener("invalid", function (ev) {
        ev.preventDefault(); // sin burbuja nativa: el párrafo bajo el input
        errorDoc.textContent = inputDni.getAttribute("title") || "Ingresa un documento válido.";
        errorDoc.hidden = false;
      });
      inputDni.addEventListener("input", function () {
        // validity.valid (lectura) NO dispara el evento invalid: si usara
        // checkValidity() aquí, cada dígito a la mitad del DNI abriría el
        // mensajito antes de que el usuario lo intente enviar.
        if (inputDni.validity.valid) errorDoc.hidden = true;
      });
    }
  });

  // --- Envío de inscripción: confirmación inline sin saltar de página ---
  // Dos vías, según el voucher. Sin archivo va AJAX (/ajax/), que responde
  // JSON sin navegar. Con archivo el POST clásico multipart es lo único que
  // entrega el adjunto al correo, pero FormSubmit dejó de honrar el _next
  // (responde 200 con su página "Thanks" sin redirigir; comprobado el
  // 2026-10-24 con el header de respuesta y en navegador real), así que el
  // POST clásico se manda dentro de un iframe oculto con form.target: el
  // "Thanks" de FormSubmit se carga ahí y el usuario nunca sale de la
  // ficha. Sin JS (o sin fetch), el flujo clásico queda intacto.
  document.querySelectorAll(".form-inscripcion").forEach(function (form) {
    var boton = form.querySelector('button[type="submit"]');
    if (!boton) return;
    var mensaje = document.createElement("p");
    mensaje.className = "form-aviso";
    mensaje.setAttribute("role", "status");
    mensaje.setAttribute("aria-live", "polite");
    mensaje.hidden = true;
    boton.insertAdjacentElement("afterend", mensaje);
    // Retorno del envío con voucher: el _next vuelve con el hash y el aviso
    // aparece en el mismo lugar que en la vía AJAX.
    if (location.hash === "#inscripcion-enviada") {
      mensaje.textContent = "✓ Tu inscripción se envió. Te escribiremos al correo para completar la matrícula.";
      mensaje.hidden = false;
      history.replaceState(null, "", location.pathname);
    }
    // --- Estado compartido por TODOS los envíos de este form ---
    // El listener de submit corre por envío y cada llamada tiene su propio
    // scope: un var dentro suyo NO lo ve el listener load del iframe (que se
    // registró una sola vez, en el primer envío, y capturó ESA invocación).
    // Así quedó el segundo envío entregando el correo con el botón atorado
    // en "Cargando…": el load miraba la binding vieja, que quedó en false
    // tras la primera respuesta. Esto vive en el callback del forEach, que
    // NO se recrea por envío.
    var pendienteIframe = false;
    var textoBotonBase = null;
    var restaurarBoton = function () {
      boton.disabled = false;
      boton.removeAttribute("aria-busy");
      if (textoBotonBase) boton.innerHTML = textoBotonBase;
    };
    // --- Cooldown de usabilidad tras cada éxito (el límite real es el
    // del servidor): 60 s con cuenta regresiva en el botón. localStorage
    // lo hace sobrevivir a la recarga; manipularlo no sirve de nada
    // porque en cada POST igual pasa por los límites del endpoint.
    var CD_SEGUNDOS = 60;
    var CLAVE_CD = "inscripcion-cooldown";
    var cdTimer = null;
    textoBotonBase = textoBotonBase || boton.innerHTML;
    var arrancarCuenta = function () {
      if (cdTimer) clearInterval(cdTimer);
      var tic = function () {
        var recuerdo = parseInt(localStorage.getItem(CLAVE_CD) || "0", 10);
        var falta = CD_SEGUNDOS - Math.round((Date.now() - recuerdo) / 1000);
        if (falta > 0) {
          boton.disabled = true;
          boton.innerHTML = "Espera " + falta + "s…";
        } else {
          clearInterval(cdTimer);
          cdTimer = null;
          localStorage.removeItem(CLAVE_CD);
          restaurarBoton();
        }
      };
      tic();
      cdTimer = setInterval(tic, 500);
    };
    var iniciarCooldown = function () {
      localStorage.setItem(CLAVE_CD, String(Date.now()));
      arrancarCuenta();
    };
    if (localStorage.getItem(CLAVE_CD)) {
      var recuerdo = parseInt(localStorage.getItem(CLAVE_CD) || "0", 10);
      if (Date.now() - recuerdo < CD_SEGUNDOS * 1000) arrancarCuenta();
      else localStorage.removeItem(CLAVE_CD);
    }
    // --- Validación del voucher: solo imagen o PDF, hasta 5 MB ---
    var PESO_MAXIMO = 5 * 1024 * 1024;
    var errorVoucher = form.querySelector('[data-campo-error="voucher"]');
    var marcarVoucher = function (input, texto) {
      if (errorVoucher) {
        errorVoucher.textContent = texto;
        errorVoucher.hidden = !texto;
      }
      // Con mensaje hay que descartar el archivo (no se lo debe poder
      // enviar); con la limpieza del mensaje el archivo seleccionado
      // VÁLIDO se conserva.
      if (input && texto) {
        try {
          input.value = "";
        } catch (e) {
          // Navegador que no permite reasignar el value de un file input:
          // se clona el input; el form escucha el change por delegación.
          var clon = input.cloneNode(true);
          input.parentNode.replaceChild(clon, input);
        }
      }
    };
    var voucherInvalido = function () {
      var input = form.querySelector('input[name="voucher"]');
      if (!input || !input.files || !input.files.length) return false; // vacío: required y checkValidity lo cubren
      var f = input.files[0];
      var esPdf = f.type === "application/pdf" || (/\.pdf$/i.test(f.name || ""));
      var ok = (f.type && f.type.indexOf("image/") === 0) || esPdf;
      if (!ok) {
        marcarVoucher(input, "Solo se aceptan imágenes o PDF (máximo 5 MB).");
        return true;
      }
      if (f.size > PESO_MAXIMO) {
        marcarVoucher(input, "El archivo supera el máximo de 5 MB.");
        return true;
      }
      marcarVoucher(input, "");
      return false;
    };
    // Por delegación en el form: sobrevive a un eventual clon del input.
    form.addEventListener("change", function (ev) {
      if (!ev.target || ev.target.name !== "voucher") return;
      voucherInvalido(); // marca o limpia el aviso sin esperar el submit
    });
    form.addEventListener("submit", function (ev) {
      // Un listener anterior (el bloque boleta/factura) ya pudo decidir
      // bloquear el envío con su preventDefault (RUC corto) pese a que el
      // form es válido a la vista del navegador. El preventDefault NO corta
      // este listener: hay que respetarlo, o sale a la vez el error rojo y
      // el envío con el aviso verde.
      if (ev.defaultPrevented) return;
      var honey = form.querySelector(".campo-honey");
      if (honey && honey.value) return; // bot: no envía nada
      // Validación del voucher ANTES de las vías de envío: tipo (imagen o
      // PDF) y peso (5 MB). Corre en change (error inmediato al elegir) y
      // otra vez aquí; falla => el error se muestra y no hay envío.
      if (voucherInvalido && voucherInvalido()) {
        ev.preventDefault();
        return;
      }
      if (!form.checkValidity()) return; // el navegador marca los campos
      // Formato "+51 XXX XXX XXX" para el correo y el POST clásico: DESPUÉS
      // del checkValidity() porque el valor con prefijo no pasa el pattern
      // ni el maxlength del input. Se prepone una sola vez (reintentos no
      // duplican el prefijo).
      var inputCelular = form.querySelector('input[name="celular"]');
      var paisForm = form.querySelector('select[name="pais"]');
      if (paisForm && paisForm.value === "Perú" && inputCelular && inputCelular.value.indexOf("+51 ") !== 0) {
        var solos = inputCelular.value.replace(/\D/g, "");
        inputCelular.value = "+51 " + (solos.length === 9 ? solos.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3") : inputCelular.value.trim());
      }
      var voucher = form.querySelector('input[name="voucher"]');
      var conAdjunto = voucher && voucher.files && voucher.files.length;
      if (conAdjunto) {
        // POST clásico multipart dentro de un iframe oculto: retiene al
        // usuario en la ficha (el _next de FormSubmit ya no redirige).
        ev.preventDefault();
        var marco = form.querySelector("iframe[data-inscripcion]");
        if (!marco) {
          marco = document.createElement("iframe");
          marco.setAttribute("data-inscripcion", "");
          marco.name = "inscripcion-retorno-" + Math.floor(Math.random() * 1e6);
          marco.style.display = "none";
          marco.style.border = "0";
          marco.setAttribute("aria-hidden", "true");
          marco.tabIndex = -1;
          marco.title = "Envío de inscripción";
          form.appendChild(marco);
          marco.addEventListener("load", function () {
            // La carga inicial de about:blank dispara load también: se distingue
            // porque about:blank es de origen propio. La respuesta llega del
            // endpoint (same-origin, legible), así que además del vacía se
            // lee data-resultado de la página que el endpoint devuelve.
            var vacia = false;
            try { vacia = marco.contentWindow.location.href === "about:blank"; } catch (e) { vacia = false; }
            if (vacia || !pendienteIframe) return;
            pendienteIframe = false;
            var doc = null;
            try { doc = marco.contentDocument || marco.contentWindow.document; } catch (e) { doc = null; }
            var res = doc ? doc.querySelector("[data-resultado]") : null;
            var exito = res && res.getAttribute("data-resultado") === "exito";
            if (!exito) {
              // 429/409/422: el mensaje del servidor en el aviso rojo y el
              // botón restaurado; SIN reset para conservar los datos y el
              // voucher ya elegidos.
              restaurarBoton();
              mensaje.hidden = false;
              mensaje.classList.add("form-aviso-error");
              var malo = res ? doc.querySelector(".mensaje") : null;
              mensaje.textContent = (malo && malo.textContent) || "No se pudo enviar. Prueba de nuevo o escríbenos directo al WhatsApp.";
              return;
            }
            restaurarBoton();
            form.reset();
            if (inputCelular) inputCelular.value = "";
            var cambio = form.querySelector('input[name="desea_comprobante"]');
            if (cambio) cambio.dispatchEvent(new Event("change"));
            mensaje.hidden = false;
            mensaje.classList.remove("form-aviso-error");
            mensaje.textContent = "✓ Tu inscripción se envió. Te escribiremos al correo para completar la matrícula.";
            iniciarCooldown();
          });
        }
        form.target = marco.name;
        textoBotonBase = boton.innerHTML;
        pendienteIframe = true;
        boton.disabled = true;
        boton.setAttribute("aria-busy", "true");
        boton.innerHTML = "Cargando…";
        form.submit();
        form.removeAttribute("target");
        return;
      }
      if (!window.fetch) return; // flujo clásico de FormSubmit vía endpoint
      // El action del form ya apunta al endpoint propio (/ajax/envio-
      // inscripcion.php); si una plantilla vieja trae otro action, mejor
      // dejar el flujo clásico intacto.
      var accion = form.getAttribute("action") || "";
      if (accion.indexOf("envio-inscripcion.php") === -1) return;
      ev.preventDefault();
      textoBotonBase = boton.innerHTML;
      boton.disabled = true;
      boton.setAttribute("aria-busy", "true");
      boton.innerHTML = "Cargando…";
      fetch(accion, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      }).then(function (r) {
        return r.json().then(function (d) { return { r: r, d: d }; }).catch(function () { return { r: r, d: null }; });
      }).then(function (x) {
        var ok = x.r.status === 200 && x.d && (x.d.success === "true" || x.d.success === true);
        if (!ok) {
          // 429 (límite por IP), 409 (DNI ya inscrito) y errores del
          // servidor traen un mensaje legible: se muestra tal cual y
          // SIN cooldown (el usuario debe poder reintentar).
          restaurarBoton();
          mensaje.hidden = false;
          mensaje.classList.add("form-aviso-error");
          mensaje.textContent = (x.d && x.d.message) || "No se pudo enviar. Prueba de nuevo o escríbenos directo al WhatsApp.";
          if (inputCelular && inputCelular.value.indexOf("+51 ") === 0) {
            inputCelular.value = inputCelular.value.slice(4).replace(/\s/g, "");
          }
          return;
        }
        form.reset();
        restaurarBoton();
        // Re-actualiza el bloque de comprobante que el reset ocultó
        var cambio = form.querySelector('input[name="desea_comprobante"]');
        if (cambio) cambio.dispatchEvent(new Event("change"));
        mensaje.hidden = false;
        mensaje.classList.remove("form-aviso-error");
        mensaje.textContent = "✓ Tu inscripción se envió. Te escribiremos al correo para completar la matrícula.";
        iniciarCooldown();
      }).catch(function () {
        restaurarBoton();
        // El valor quedó con "+51 " (pattern-inválido) y el navegador
        // bloquearía el reintento antes de llegar a este listener: se
        // devuelve el celular a 9 dígitos para que pueda volver a enviar.
        if (inputCelular && inputCelular.value.indexOf("+51 ") === 0) {
          inputCelular.value = inputCelular.value.slice(4).replace(/\s/g, "");
        }
        mensaje.hidden = false;
        mensaje.classList.add("form-aviso-error");
        mensaje.textContent = "No se pudo enviar. Prueba de nuevo o escríbenos directo al WhatsApp.";
      });
    });
  });

  // --- Botón de copiado para números de pago / cuentas ---
  document.querySelectorAll(".btn-copiar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var texto = btn.getAttribute("data-copiar");
      if (!texto) return;
      // El botón es icono SVG + texto: se cambia SOLO el nodo de texto para
      // que el icono del portapapeles no desaparezca (antes se pisaba el
      // innerHTML/innerText entero y el SVG se perdía para siempre).
      var textoNodo = function (nuevo) {
        for (var i = btn.childNodes.length - 1; i >= 0; i--) {
          var n = btn.childNodes[i];
          if (n.nodeType === 3 && n.nodeValue.trim()) { if (nuevo) n.nodeValue = nuevo; return n; }
        }
        return null;
      };
      var restablecer = function () {
        var n = textoNodo();
        if (n) n.nodeValue = btn.getAttribute("data-texto");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function () {
          if (!btn.getAttribute("data-texto")) btn.setAttribute("data-texto", textoNodo().nodeValue);
          textoNodo("¡Copiado!");
          setTimeout(restablecer, 2000);
        });
      } else {
        var input = document.createElement("input");
        input.value = texto;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        if (!btn.getAttribute("data-texto")) btn.setAttribute("data-texto", textoNodo().nodeValue);
        textoNodo("¡Copiado!");
        setTimeout(restablecer, 2000);
      }
    });

  });
})();
