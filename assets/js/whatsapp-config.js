/* ==========================================================================
   LUBRICENTRO 100% — Configuracion central de WhatsApp
   --------------------------------------------------------------------------
   ESTE ES EL UNICO ARCHIVO QUE DEBES EDITAR PARA CAMBIAR EL NUMERO.
   El numero va en formato internacional, solo digitos: sin +, sin espacios
   y sin guiones.  Ejemplo: 59163419872  (Bolivia +591 63419872)

   Los mensajes de cada boton se definen aqui. Para agregar un boton nuevo:
     1) añade su texto en "mensajes" con una clave nueva;
     2) en el HTML pon  data-wa="esa-clave"  en el enlace <a>.
   El archivo assets/js/main.js construye el enlace wa.me y codifica el
   mensaje automaticamente (tildes, ñ y signos incluidos).
   ========================================================================== */

window.LUBRICENTRO = {
  /* --- Datos del negocio (completar los que faltan) ------------------ */
  negocio: "LUBRICENTRO 100%",
  whatsapp: "59163419872",

  /* Se muestran en la seccion de contacto y en el pie. */
  direccion: "Doble Vía La Guardia km 8 y 1/2, frente al Balneario Fabio Andrés",
  horarios: "Lunes a sábado, de 8:00 a 19:00",
  ciudad: "Santa Cruz, Bolivia",

  /* --- Ubicación en el mapa -----------------------------------------
     Ficha oficial del negocio en Google Maps: "Lubricentro 100%"
     Pin: 17°50'47.8"S  63°14'50.2"W  —  Doble Vía Santa Cruz-La Guardia
     (Municipio de La Guardia, Santa Cruz).

     "ftid" es el identificador de tu ficha en Google: es lo que hace que el
     mapa muestre el marcador con el nombre del negocio. No lo cambies.
     Si algún día te mudas, abre tu ficha nueva en Google Maps, copia el nuevo
     enlace y actualiza lat, lng, ftid y enlace. Después ejecuta:
         node tools/build_links.mjs */
  mapa: {
    lat: "-17.8465961",
    lng: "-63.2472729",
    zoom: 17,
    nombre: "Lubricentro 100%",
    ftid: "0x93f1c376e51590c9:0x3bc7a74153d599ee",
    enlace:
      "https://www.google.com/maps/place/Lubricentro+100%25/@-17.8465961,-63.2472729,17z/data=!4m6!3m5!1s0x93f1c376e51590c9:0x3bc7a74153d599ee!8m2!3d-17.8465961!4d-63.2472729!16s%2Fg%2F11rv6ly50f?hl=es",
  },

  /* Redes sociales: pega la URL completa cuando las tengas.
     Deja "" para ocultar el icono. */
  redes: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  /* --- Mensajes por tipo de boton ----------------------------------- */
  mensajes: {
    /* Cabecera y llamados generales */
    agenda:
      "Hola, LUBRICENTRO 100%. Quiero consultar sus servicios de cambio de aceite y mantenimiento para mi vehículo. ¿Podrían brindarme información y ayudarme a agendar una atención?",

    /* Hero: cambio de aceite */
    aceite:
      "Hola, quiero agendar un cambio de aceite en LUBRICENTRO 100%. Mi vehículo es: marca, modelo y año. ¿Me podrían informar el precio y la disponibilidad?",

    /* Hero: ver servicios (boton interno, no necesita mensaje) */
    servicios:
      "Hola, LUBRICENTRO 100%. Quisiera conocer más sobre sus servicios de mantenimiento para mi vehículo.",

    /* Servicios */
    servicioAceite:
      "Hola, LUBRICENTRO 100%. Quiero agendar un cambio de aceite de motor. Mi vehículo es: marca, modelo y año. ¿Me informan el precio y la disponibilidad?",
    servicioFiltros:
      "Hola, LUBRICENTRO 100%. Quisiera consultar por el cambio de filtros (aceite, aire y otros). Mi vehículo es: marca, modelo y año. ¿Qué filtros tienen disponibles y a qué precio?",
    servicioLubricantes:
      "Hola, LUBRICENTRO 100%. Quisiera comprar lubricantes para mi vehículo (marca, modelo y año). ¿Qué aceites recomiendan y cuáles son los precios?",
    servicioNiveles:
      "Hola, LUBRICENTRO 100%. Quisiera agendar la revisión de niveles y fluidos de mi vehículo (marca, modelo y año). ¿Qué incluye el servicio y cuánto cuesta?",
    servicioPreventivo:
      "Hola, LUBRICENTRO 100%. Quisiera coordinar un mantenimiento preventivo básico para mi vehículo (marca, modelo y año). ¿Qué servicios realizan y qué disponibilidad tienen?",
    servicioAsesoria:
      "Hola, LUBRICENTRO 100%. Necesito orientación para elegir el lubricante adecuado para mi vehículo (marca, modelo, año y tipo de motor). ¿Me pueden asesorar?",

    /* Lubricantes */
    lubricantes:
      "Hola, quisiera consultar qué lubricante recomiendan para mi vehículo y conocer los precios y la disponibilidad.",
    disponibilidad:
      "Hola, LUBRICENTRO 100%. Quiero consultar la disponibilidad y el precio de los lubricantes y filtros para mi vehículo (marca, modelo y año). ¿Me pueden ayudar?",

    /* Por que elegirnos */
    visita:
      "Hola, LUBRICENTRO 100%. Quiero agendar una visita para el mantenimiento de mi vehículo. Mi vehículo es: marca, modelo y año. ¿Me ayudan a coordinar día y hora?",

    /* Proceso */
    proceso:
      "Hola, LUBRICENTRO 100%. Quiero agendar una atención en LUBRICENTRO 100%. Mi vehículo es: marca, modelo y año. ¿Qué disponibilidad tienen?",

    /* Contacto y pie */
    contacto:
      "Hola, LUBRICENTRO 100%. Estoy listo para cuidar mi vehículo. Quisiera consultar por el servicio que necesito. ¿Me pueden ayudar?",
  },
};
