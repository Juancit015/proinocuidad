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
    var error = form.querySelector(".campo-error");
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

  // --- Botón de copiado para números de pago / cuentas ---
  document.querySelectorAll(".btn-copiar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var texto = btn.getAttribute("data-copiar");
      if (!texto) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function () {
          var orig = btn.innerText;
          btn.innerText = "¡Copiado!";
          setTimeout(function () { btn.innerText = orig; }, 2000);
        });
      } else {
        var input = document.createElement("input");
        input.value = texto;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        var orig = btn.innerText;
        btn.innerText = "¡Copiado!";
        setTimeout(function () { btn.innerText = orig; }, 2000);
      }
    });
  });
})();
