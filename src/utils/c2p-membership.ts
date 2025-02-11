export const c2pMembership: Netsystems.c2pMembershipInfo[] = [
  {
    code: "0163",
    head: {
      title: "Banco del Tesoro",
      image: "/images/c2p-membership/banks/tesoro.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "¿Cómo solicitar Token para realizar pagos C2P vía BT Móvil?",
      },
      {
        type: "list",
        source: [
          "Ingresa a BT Móvil.",
          "Despliega las opciones en el menú y selecciona Cobro C2P.",
          "Obtén el código o token para finalizar la operación de cobro C2P.",
        ],
      },
      {
        type: "text",
        text: "¿Cómo solicitar Token para realizar pagos C2P vía SMS?",
      },
      {
        type: "list",
        source: [
          "Envía un mensaje de texto al 2383, escribe la palabra comercio, seguido de un espacio V/E y el número de cédula.",
          "Recibirás un SMS con la clave o token de compras.",
        ],
      },
    ],
  },
  {
    code: "0105",
    head: {
      title: "Banco Mercantil",
      image: "/images/c2p-membership/banks/mercantil.webp",
      desc: "Para solicitar la clave C2P del Banco Mercantil, puedes usar la aplicación de Tpago o enviar un SMS al 24024.",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P a través de la aplicación de Tpago:",
      },
      {
        type: "list",
        source: [
          "Abre la aplicación de Tpago",
          "Presiona el botón Clave C2P",
          "Si aún no has generado una clave, presiona Generar Clave",
        ],
      },
      {
        type: "text",
        text: "Para solicitar la clave C2P a través de un SMS:",
      },
      {
        type: "list",
        source: ["Envía un SMS con la palabra SCP al 24024"],
      },
      {
        type: "text",
        text: "La clave C2P es de un solo uso y tiene una duración de 6 horas. ",
      },
      {
        type: "text",
        text: "Para usar el servicio C2P, debes ser cliente de Mercantil y estar afiliado a Tpago.",
      },
    ],
  },
  {
    code: "0134",
    head: {
      title: "Banesco",
      image: "/images/c2p-membership/banks/banesco.webp",
      desc: "Para solicitar la clave C2P en Banco Banesco, se puede enviar un mensaje de texto al número 2846. ",
    },
    blocks: [
      {
        type: "text",
        text: "Para ello, se debe:",
      },
      {
        type: "list",
        source: [
          "Enviar un mensaje de texto al 2846",
          "Escribir la frase 'clave dinámica'",
          "Agregar el literal V, E o J, según el caso",
          "Ingresar el número de cédula o RIF",
        ],
      },
    ],
  },
  {
    code: "0172",
    head: {
      title: "Bancamiga",
      image: "/images/c2p-membership/banks/bancamiga.webp",

      desc: "Para solicitar la clave C2P de Bancamiga Banco Universal C.A., puedes ingresar a Bancamiga Suite y seleccionar la opción de pago móvil. Para cobrar a través de la web, puedes: ",
    },
    blocks: [
      {
        type: "text",
        text: "",
      },
      {
        type: "list",
        source: [
          "Acceder a www.bancamiga.com",
          "Hacer clic en el botón C2P",
          "Ser dirigido a la plataforma Admin Pagos",
        ],
      },
    ],
  },
  {
    code: "0102",
    head: {
      title: "Banco de Venezuela",
      image: "/images/c2p-membership/banks/venezuela.webp",
      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Ingresar a la página web del Banco de Venezuela: ",
      },
      {
        type: "list",
        source: [
          "Seleccionar la opción 'Personas'",
          "Completar los datos solicitados",
          "Pulsar la pestaña 'Pagos'",
          "Seleccionar la opción 'Pago Móvil'",
          "Hacer clic en el botón 'Generador de Clave C2P'",
          "Seleccionar la cantidad de claves a generar",
          "Pulsar la opción 'Continuar'",
        ],
      },
    ],
  },
  {
    code: "0191",
    head: {
      title: "BNC",
      image: "/images/c2p-membership/banks/nacional-credito.webp",
      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P en el Banco Nacional de Crédito (BNC), se puede seguir el siguiente procedimiento: ",
      },
      {
        type: "list",
        source: [
          "Ingresar a www.bncenlinea.com",
          "Seleccionar la opción Personas",
          "Completar los datos solicitados",
          "En el menú principal, seleccionar la pestaña Pagos / Pago Móvil",
          "Hacer clic en el botón Generador de Clave C2P",
          "Seleccionar la cantidad de claves a generar",
          "Presionar la opción Continuar",
          "Introducir el Número de Control y el Número de Coordenadas de BINGO BNC",
          "Hacer clic en Continuar",
        ],
      },
    ],
  },
  {
    code: "0175",
    head: {
      title: "Banco Bicentenario",
      image: "/images/c2p-membership/banks/bicentenario.webp",

      desc: "Para solicitar la clave C2P del Banco Bicentenario, puedes ingresar a la página web bncenlinea.com o utilizar la aplicación TuBancaMóvil. ",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P en la página web, puedes seguir estos pasos: ",
      },
      {
        type: "list",
        source: [
          "Ingresar a bncenlinea.com",
          "Seleccionar la opción Personas",
          "Completar los datos solicitados",
          "Seleccionar la pestaña Pagos / Pago Móvil",
          "Hacer clic en el botón Generador de Clave C2P",
          "Seleccionar la cantidad de claves a generar",
          "Presionar la opción Continuar",
        ],
      },
    ],
  },
  {
    code: "0174",
    head: {
      title: "Banplus",
      image: "/images/c2p-membership/banks/banplus.webp",
      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para generar la clave OTP de Banplus, se pueden seguir los siguientes pasos: ",
      },
      {
        type: "list",
        source: [
          "Instalar la aplicación Pago Plus, Banplus Pay o President's Club Móvil",
          "Ingresar a la aplicación",
          "Seleccionar la opción 'Generar tu Clave'",
        ],
      },
    ],
  },
  {
    code: "0115",
    head: {
      title: "Banco Exterior",
      image: "/images/c2p-membership/banks/exterior.webp",

      desc: "Para solicitar la clave de Cobro Comercio (C2P) del Banco Exterior, se puede utilizar la aplicación Exterior NEXO Pago Móvil.",
    },
    blocks: [
      {
        type: "text",
        text: "Para ello, se debe: ",
      },
      {
        type: "list",
        source: [
          "Abrir la aplicación Exterior NEXO Pago Móvil.",
          "Seleccionar la opción 'Clave a Comercio'.",
        ],
      },
      {
        type: "text",
        text: "Para utilizar el servicio de pago móvil del Banco Exterior, se debe ser cliente del banco y estar afiliado al servicio Exterior NEXO Pago Móvil. ",
      },
    ],
  },
  {
    code: "0114",
    head: {
      title: "Bancaribe",
      image: "/images/c2p-membership/banks/bancaribe.webp",

      desc: "Para solicitar una clave C2P en Bancaribe, puedes usar la aplicación Mi Pago Bancaribe o enviar un SMS. ",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave por SMS:",
      },
      {
        type: "list",
        source: [
          "Escribe 'Clavemipago' al 22741",
          "Proporciona los datos de pago: número de celular, cédula de identidad, banco y la clave Mi Pago Comercio",
          "Espera a que el comercio apruebe la operación",
        ],
      },
      {
        type: "text",
        text: "Para solicitar la clave por la aplicación Mi Pago Bancaribe:",
      },
      {
        type: "list",
        source: [
          "Solicita una clave temporal",
          "Proporciona los datos de pago: número de celular, cédula de identidad, banco y la clave Mi Pago Comercio",
          "Espera a que el comercio apruebe la operación.",
        ],
      },
    ],
  },
  {
    code: "0108",
    head: {
      title: "Banco Provincial",
      image: "/images/c2p-membership/banks/provincial.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P en el Banco Provincial, puedes generar un código QR desde la app de Dinero Rápido.  Para generar el código QR:",
      },
      {
        type: "list",
        source: [
          "Inicia sesión en la app de Dinero Rápido",
          "Si tienes activa la opción 'Recuérdame', puedes generar el código QR desde el inicio de sesión",
          "Si no tienes activa la opción 'Recuérdame', puedes generar el código QR desde la opción 'Mis Datos'",
        ],
      },
      {
        type: "text",
        text: "La clave C2P es una clave de compra que se solicita al comercio para autorizar los pagos.",
      },
    ],
  },
  {
    code: "0104",
    head: {
      title: "Banco Venezolano de Crédito",
      image: "/images/c2p-membership/banks/venezolano-credito.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para generar la clave C2P en VOL.móvil, puedes seguir estos pasos:",
      },
      {
        type: "list",
        source: [
          "Ingresa a VOL.móvil",
          "Selecciona la opción Claves",
          "Selecciona la opción Clave Dinámica C2P",
          "El sistema mostrará un QR y un código para validar la transacción",
        ],
      },
    ],
  },
  {
    code: "0156",
    head: {
      title: "100%banco",
      image: "/images/c2p-membership/banks/100-banco.webp",

      desc: "Para solicitar la clave C2P de 100% Banco, puedes enviar un mensaje de texto al número 100102.",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P de 100% Banco por SMS, debes:",
      },
      {
        type: "list",
        source: [
          "Enviar un mensaje de texto al 100102",
          "Escribir 'C2P'",
          "Colocar un espacio",
          "Escribir 'Pago'",
          "Colocar un espacio",
          "Escribir el monto del pago",
          "Colocar un espacio",
          "Escribir la clave de transacciones especiales de Pago Móvil",
          "Enviar el mensaje",
        ],
      },
      {
        type: "text",
        text: "En breve, recibirás un mensaje de respuesta automática con tu Código de Autorización. ",
      },
    ],
  },
  {
    code: "0171",
    head: {
      title: "Banco Activo",
      image: "/images/c2p-membership/banks/activo.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para afiliarse a C2P, se deben seguir los siguientes pasos:",
      },
      {
        type: "list",
        source: [
          "Entrar a Activo en línea Empresas",
          "Ir a la sección Cobro Activo",
          "Ingresar el número de afiliación en la página de Ubii Pagos C2P",
          "Descargar la aplicación Cobro Activo desde la tienda de aplicaciones",
        ],
      },
    ],
  },
  {
    code: "0128",
    head: {
      title: "Banco Caroni",
      image: "/images/c2p-membership/banks/caroni.webp",

      desc: "Para solicitar la clave C2P del Banco Caroní, puedes ingresar a Click Caroní, iniciar sesión con tu usuario y contraseña, y seguir los pasos para solicitar la Tarjeta de Seguridad. ",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la Tarjeta de Seguridad:",
      },
      {
        type: "list",
        source: [
          "Ingresa a Click Caroní",
          "Ingresa tu usuario y contraseña",
          "Busca la pestaña Otros Servicios",
          "Selecciona la opción Solicitar Tarjeta de Seguridad",
          "Completa la información solicitada",
        ],
      },
      {
        type: "text",
        text: "El Pago Móvil C2P (Comercio a Persona) es un servicio que permite cobrar a clientes naturales de manera segura.",
      },
    ],
  },
  {
    code: "0177",
    head: {
      title: "Banco de la Fuerza Armada",
      image: "/images/c2p-membership/banks/banfanb.webp",

      desc: "Para solicitar la clave C2P del Banco de la Fuerza Armada, puedes seguir los siguientes pasos: ",
    },
    blocks: [
      {
        type: "text",
        text: "",
      },
      {
        type: "list",
        source: [
          "Ingresa a la página web del banco",
          "Selecciona la opción de Personas",
          "Completa los datos solicitados",
          "En el menú principal, selecciona la pestaña de Pagos o Pago Móvil",
          "Haz clic en el botón Generador de Clave C2P",
          "Selecciona la cantidad de claves a generar",
          "Presiona la opción Continuar",
        ],
      },
    ],
  },
  {
    code: "0138",
    head: {
      title: "Banco Plaza",
      image: "/images/c2p-membership/banks/plaza.webp",

      desc: "Para solicitar una clave temporal de pago móvil en el Banco Plaza, puedes llamar al Centro de Atención Telefónica al 0501-PLAZA-00 (0501-75292-00). También puedes generar una clave temporal a través de la aplicación Tu Dinero Ya o de Tu Plaza en Línea. ",
    },
    blocks: [
      {
        type: "text",
        text: "Por teléfono",
      },
      {
        type: "list",
        source: [
          "Llama al 0501-PLAZA-00 (0501-75292-00) ",
          "Selecciona la opción 4 'Mantenimiento de Claves de Tarjetas de Débito e Identificadores E-plaza' ",
          "Elige la opción 1 'Creación de Clave' y luego selecciona la opción 2 'Clave Telefónica' ",
        ],
      },
      {
        type: "text",
        text: "Por la aplicación Tu Dinero Ya ",
      },
      {
        type: "list",
        source: [
          "Instala la aplicación Tu Dinero Ya",
          "Ingresa a la aplicación y busca la opción 'Generar Token'",
        ],
      },
      {
        type: "text",
        text: "Por Tu Plaza en Línea ",
      },
      {
        type: "list",
        source: [
          "Ingresa a Tu Plaza en Línea Personas",
          "En el menú de Tu Dinero Ya, busca la opción Clave",
        ],
      },
    ],
  },
  {
    code: "0137",
    head: {
      title: "Banco Sofitasa",
      image: "/images/c2p-membership/banks/sofitasa.webp",

      desc: "Para solicitar la clave C2P del Banco Sofitasa, se puede generar un token a través de la App Sofimóvil. ",
    },
    blocks: [
      {
        type: "text",
        text: "Para generar el token, se debe:",
      },
      {
        type: "list",
        source: [
          "Ingresar a la App Sofimóvil.",
          "Seleccionar la opción Token.",
          "Pulsar el botón Generar Token.",
        ],
      },
      {
        type: "text",
        text: "Una vez generado el token, se puede compartir con el comercio para realizar el pago. ",
      },
      {
        type: "text",
        text: "El servicio C2P (Comercio a Persona) del Banco Sofitasa permite a los clientes realizar pagos móviles. ",
      },
    ],
  },
  {
    code: "0128",
    head: {
      title: "Bancrecer",
      image: "/images/c2p-membership/banks/bancrecer.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para afiliarse al pago móvil C2P de Bancrecer, se puede contactar al centro de atención telefónica del banco. ",
      },
      {
        type: "text",
        text: "Los números de teléfono de Bancrecer son: 0500-CRECEYA (2732392), 0212 610.8888, 0212-278.88.88. ",
      },
      {
        type: "text",
        text: "También se puede enviar un correo electrónico a atencion.cliente@bancrecer.com.ve.",
      },
    ],
  },
  {
    code: "0151",
    head: {
      title: "BFC Banco Fondo Común",
      image: "/images/c2p-membership/banks/fondo-comun.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P del Banco Fondo Común (BFC) puedes comunicarte con el banco. ",
      },
      {
        type: "text",
        text: "El BFC tiene un canal de atención personalizado a través de WhatsApp, al que puedes comunicarte al número 0412-5760020 (+58-412-5760020). ",
      },
      {
        type: "text",
        text: "También puedes enviar un mensaje de texto al número 88232 para consultar tu saldo, realizar pagos móviles y más. ",
      },
    ],
  },
  {
    code: "0157",
    head: {
      title: "Del Sur",
      image: "/images/c2p-membership/banks/del-sur.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "¿Dónde solicito la clave? A través de un sms al 6787 escriba la palabra clave 'Cobrod2', llegará un mensaje de respuesta con el número de la clave de pago OTP.",
      },
    ],
  },
  {
    code: "0169",
    head: {
      title: "R4 - Mi Banco",
      image: "/images/c2p-membership/banks/mi-banco.webp",

      desc: "",
    },
    blocks: [
      {
        type: "text",
        text: "Para solicitar la clave C2P del Banco R4 - Mi Banco: ",
      },
      {
        type: "list",
        source: [
          "Ingresar a tu Pago Móvil desde Banca en Línea.",
          "Selecciona la opción Clave Temporal.",
          "El sistema arrojará una clave de 8 dígitos",
        ],
      },
    ],
  },
];
