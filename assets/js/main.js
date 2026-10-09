/* ==========================================================================
   LUBRICENTRO 100% — Comportamiento de la pagina
   --------------------------------------------------------------------------
   1. Enlaces de WhatsApp generados desde la configuracion central
   2. Datos del negocio (direccion, horarios, redes) desde la configuracion
   3. Menu movil
   4. Cabecera al hacer scroll
   5. Enlace activo segun la seccion visible
   6. Animaciones de aparicion (respetan "reducir movimiento")
   ========================================================================== */

(function () {
  "use strict";

  var CONFIG = window.LUBRICENTRO || {};
  var NUMERO = String(CONFIG.whatsapp || "").replace(/\D/g, "");
  var MENSAJES = CONFIG.mensajes || {};

  /* ---------------------------------------------------------------- 1. WhatsApp */

  function enlaceWhatsApp(clave) {
    var texto = MENSAJES[clave];
    if (!texto) {
      // Si la clave no existe, se usa un mensaje general para no dejar el boton sin destino.
      texto = MENSAJES.agenda || "Hola, LUBRICENTRO 100%. Quisiera más información.";
    }
    return "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(texto);
  }

  function prepararEnlacesWhatsApp() {
    var enlaces = document.querySelectorAll("a[data-wa]");

    Array.prototype.forEach.call(enlaces, function (enlace) {
      var clave = enlace.getAttribute("data-wa");
      enlace.setAttribute("href", enlaceWhatsApp(clave));
      enlace.setAttribute("target", "_blank");
      enlace.setAttribute("rel", "noopener noreferrer");

      // Accesibilidad: avisar que el enlace abre WhatsApp en otra pestaña.
      if (!enlace.getAttribute("aria-label") && !enlace.querySelector(".visually-hidden")) {
        enlace.setAttribute("title", "Se abre WhatsApp en una pestaña nueva");
      }
    });

    // Aviso en consola si el numero no es válido (solo dígitos, 8 a 15).
    if (!/^\d{8,15}$/.test(NUMERO)) {
      console.warn(
        "[LUBRICENTRO 100%] Revisa el número de WhatsApp en assets/js/whatsapp-config.js: " +
          "debe tener solo dígitos, en formato internacional (ej. 59163419872)."
      );
    }
  }

  /* ------------------------------------------------------- 2. Datos del negocio */

  function completarDatos() {
    var pendiente = "Por confirmar";

    // Textos simples: <span data-biz="direccion"></span>
    Array.prototype.forEach.call(document.querySelectorAll("[data-biz]"), function (el) {
      var valor = CONFIG[el.getAttribute("data-biz")];
      if (valor) {
        el.textContent = valor;
        el.classList.remove("contact__pending");
      } else {
        el.textContent = pendiente;
        el.classList.add("contact__pending");
      }
    });

    // Numero de WhatsApp visible: <span data-biz-phone></span>
    // Se agrupa el código de país para que sea más fácil de leer.
    var visible = "+" + NUMERO;
    if (/^591\d{8}$/.test(NUMERO)) {
      visible = "+591 " + NUMERO.slice(3);
    }
    Array.prototype.forEach.call(document.querySelectorAll("[data-biz-phone]"), function (el) {
      el.textContent = visible;
    });

    // Redes sociales: se ocultan si no hay URL configurada.
    Array.prototype.forEach.call(document.querySelectorAll("[data-social]"), function (el) {
      var red = el.getAttribute("data-social");
      var url = (CONFIG.redes || {})[red];
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    // Año actual en el aviso de derechos reservados.
    Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ----------------------------------------------------------- 3. Menu movil */

  function menuMovil() {
    var boton = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav-principal");
    if (!boton || !nav) return;

    function cerrar() {
      nav.classList.remove("is-open");
      boton.setAttribute("aria-expanded", "false");
    }

    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      if (abierto) {
        cerrar();
      } else {
        nav.classList.add("is-open");
        boton.setAttribute("aria-expanded", "true");
      }
    });

    // Cerrar al elegir una opcion, al pulsar Escape o al agrandar la ventana.
    nav.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) cerrar();
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") cerrar();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000) cerrar();
    });
  }

  /* ------------------------------------------------------- 4. Cabecera fija */

  function cabeceraFija() {
    var cabecera = document.querySelector(".site-header");
    if (!cabecera) return;

    var actualizando = false;

    function actualizar() {
      cabecera.classList.toggle("is-stuck", window.scrollY > 12);
      actualizando = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!actualizando) {
          actualizando = true;
          window.requestAnimationFrame(actualizar);
        }
      },
      { passive: true }
    );

    actualizar();
  }

  /* ------------------------------------------------------ 5. Enlace activo */

  function enlaceActivo() {
    var enlaces = document.querySelectorAll(".nav__link[href^='#']");
    if (!enlaces.length || !("IntersectionObserver" in window)) return;

    var mapa = [];
    Array.prototype.forEach.call(enlaces, function (enlace) {
      var seccion = document.querySelector(enlace.getAttribute("href"));
      if (seccion) mapa.push({ enlace: enlace, seccion: seccion });
    });

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          mapa.forEach(function (par) {
            par.enlace.classList.toggle("is-active", par.seccion === entrada.target);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    mapa.forEach(function (par) {
      observador.observe(par.seccion);
    });
  }

  /* -------------------------------------------------------- 6. Animaciones */

  function animaciones() {
    var elementos = document.querySelectorAll(".reveal");
    if (!elementos.length) return;

    var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducir || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(elementos, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observador = new IntersectionObserver(
      function (entradas, obs) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            obs.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    Array.prototype.forEach.call(elementos, function (el) {
      observador.observe(el);
    });
  }

  /* ------------------------------------------------------------- 7. Mapa */

  // Solo sirve para que Google refresque su copia en caché del mapa.
  var VERSION_MAPA = "1712000000000";

  /* Arma la dirección de inserción oficial de Google Maps. La escala se calcula
     a partir del zoom, así que al cambiar de local basta con tocar lat/lng. */
  function urlIncrustar(lat, lng, zoom, ftid, nombre) {
    if (!ftid) {
      // Sin ficha identificada: el mapa se centra en las coordenadas.
      return (
        "https://www.google.com/maps?q=" + lat + "," + lng +
        "&hl=es&z=" + zoom + "&output=embed"
      );
    }

    var radianes = (parseFloat(lat) * Math.PI) / 180;
    var escala = Math.round((156543.03392 * Math.cos(radianes) * 400) / Math.pow(2, zoom));

    return (
      "https://www.google.com/maps/embed?pb=" +
      "!1m18!1m12!1m3!1d" + escala +
      "!2d" + lng +
      "!3d" + lat +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1" +
      "!3m3!1m2!1s" + encodeURIComponent(ftid) +
      "!2s" + encodeURIComponent(nombre || "") +
      "!5e0!3m2!1ses!2sbo!4v" + VERSION_MAPA
    );
  }

  function prepararMapa() {
    var mapa = CONFIG.mapa || {};
    var lat = String(mapa.lat || "").trim();
    var lng = String(mapa.lng || "").trim();
    var zoom = parseInt(mapa.zoom, 10) || 17;
    var ftid = String(mapa.ftid || "").trim();

    // Si las coordenadas no son válidas se respeta el mapa escrito en el HTML.
    if (!/^-?\d+(\.\d+)?$/.test(lat) || !/^-?\d+(\.\d+)?$/.test(lng)) return;

    var punto = lat + "," + lng;

    // Mapa incrustado. Con el identificador de la ficha (ftid) Google dibuja el
    // marcador con el nombre del negocio; sin él, el mapa saldría sin marcador.
    var marco = document.querySelector("iframe[data-mapa]");
    if (marco) {
      marco.setAttribute("src", urlIncrustar(lat, lng, zoom, ftid, mapa.nombre));
    }

    // Botón "Cómo llegar": abre la ruta en la app de Google Maps.
    var ruta = document.querySelector("[data-mapa-ruta]");
    if (ruta) {
      ruta.setAttribute(
        "href",
        "https://www.google.com/maps/dir/?api=1&destination=" + punto
      );
      ruta.setAttribute("target", "_blank");
      ruta.setAttribute("rel", "noopener noreferrer");
    }

    // Enlace a la ficha oficial del negocio en Google Maps.
    var enlace = document.querySelector("[data-mapa-enlace]");
    if (enlace && mapa.enlace) {
      enlace.setAttribute("href", mapa.enlace);
      enlace.setAttribute("target", "_blank");
      enlace.setAttribute("rel", "noopener noreferrer");
    }
  }

  /* ------------------------------------------------------------- Arranque */

  function iniciar() {
    prepararEnlacesWhatsApp();
    completarDatos();
    prepararMapa();
    menuMovil();
    cabeceraFija();
    enlaceActivo();
    animaciones();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
