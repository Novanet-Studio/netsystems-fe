/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace Netsystems {
  //? utils
  type Bank = {
    code: string;
    name: string;
    legalName: string;
    shortName: string;
    rif: string;
    url: string;
  };

  type Input = {
    id: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    inputName: string;
    inputType?: string;
    inputInfo?: string;
    inputRequiredMessage?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    showInputErros?: boolean;
    source?: { label: string; value: string }[];
    errors?: any;
    register?: any;
    options?: any;
  };

  //? stepper items
  interface PaymentFormInfo {
    title: string;
    subtitle: string;
    bannerImage: string;
    form: JSX.Element;
    label?: string;
    stepIndicator?: JSX.Element;
  }

  //? payment form context
  type PayContextType = {
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    getUserData: () => LoginResponse;
    setUserData: (userData: any) => void;

    getPaymentResult: () => any;
    setPaymentResult: (paymentStatus: any) => void;
  };

  //? payment form items <PaymentMethod />
  interface PaymentMethodItem {
    bank: string;
    logoImage: string;
  }

  //? login user response <Login />
  interface LoginResponse {
    estado: string;
    mensaje?: string;
    datos: UserData[];

    currentContract?: string;
  }

  interface UserData {
    id: number;
    nombre: string;
    estado: string;
    correo: string;
    telefono: string;
    movil: string;
    cedula: string;
    pasarela: string;
    codigo: string;
    direccion_principal: string;
    Plan_Contratado: string;
    mantenimiento: boolean;
    fecha_suspendido: string;
    servicios: Servicio[];
    facturacion: Facturacion;
  }

  interface Facturacion {
    facturas_nopagadas: number;
    total_facturas: string;
  }

  interface Servicio {
    id: number;
    idperfil: number;
    nodo: number;
    costo: string;
    ipap: string;
    mac: string;
    ip: string;
    instalado: Date;
    pppuser: string;
    ppppass: string;
    emisor: string;
    tiposervicio: string;
    status_user: string;
    coordenadas: string;
    direccion: string;
    snmp_comunidad: string;
    firewall_state: string;
    smartolt: string;
    limitado: number;
    ppp_routes: string;
    ppp_localaddress: string;
    idnap: number;
    portnap: number;
    onu_sn: string;
    onu_ssid_wifi: string;
    onu_password_wifi: string;
    personalizados: string;
    smartolt_catv: number;
    ipv6: string;
    ipv6_duid: string;
    last_connected: string;
    perfil: string;
  }

  //? login user response <ReportPayment />
  export interface InvoiceDebtsResponse {
    code: string;
    facturas: Factura[];
    mensaje: string;
  }

  export interface Factura {
    IDFactura: number;
    detalle: string;
    valor: string;
  }

  //? login user response <ReportPayment />
  export interface BcvUsdResponse {
    status: "ERROR" | "SUCCESS";
    rate: number;
  }

  //? data
  export interface c2pMembershipInfo {
    code: string;
    head: {
      title: string;
      image: string;
      desc: string;
    };
    blocks: {
      type: string;
      text?: string;
      source?: string[];
    }[];
  }

  interface Window {
    accordions: Array<c2pMembershipInfo & { open: boolean }>;
  }
}
