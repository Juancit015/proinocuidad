/* Proinocuidad - JS global: nav móvil + mega-menú accesible */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  // --- Menú móvil (botón hamburguesa) ---
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var abierto = header.classList.toggle("menu-abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
  }

  // --- Acordeón de submenús en móvil ---
  document.querySelectorAll(".nav-drop > a").forEach(function (enlace) {
    enlace.addEventListener("click", function (e) {
      var soloMovil = window.matchMedia("(max-width: 860px)").matches;
      if (!soloMovil) return;
      var li = enlace.parentElement;
      if (!li.classList.contains("abierto")) {
        e.preventDefault();
        document.querySelectorAll(".nav-drop.abierto").forEach(function (otro) {
          otro.classList.remove("abierto");
          otro.querySelector("a").setAttribute("aria-expanded", "false");
        });
        li.classList.add("abierto");
        enlace.setAttribute("aria-expanded", "true");
      }
      // Si ya está abierto, el segundo toque navega al enlace padre.
    });
  });

  // --- Cerrar con Escape (accesibilidad) ---
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (header) header.classList.remove("menu-abierto");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-drop.abierto").forEach(function (li) {
      li.classList.remove("abierto");
      var a = li.querySelector("a");
      if (a) a.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".mega-panel a").forEach(function (a) { a.blur(); });
  });

  // --- Cerrar menú móvil al navegar ---
  document.querySelectorAll(".nav-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (a.getAttribute("target") || window.matchMedia("(max-width: 860px)").matches) {
        if (header) header.classList.remove("menu-abierto");
      }
    });
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
