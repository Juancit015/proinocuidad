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
})();
