import { useCallback } from "react";
import type { Netsystems } from "../../../env";

interface ApiOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

//? users
interface GetClientDetailsParams {
  cedula: string;
}

interface GetInvoiceDebtsParams {
  cedula: string;
}

interface SetPaymentParams {
  IDFactura: number;
  valor: number;
  fecha: string;
  secuencial: number;
}

//? bdt
interface GetBanksParams {
  body: any;
}

interface GetOTPParams {
  ci: string;
}

interface SetBdTPaymentParams {
  celular: string;
  banco: string;
  cedula: string;
  monto: string;
  token: string;
  nombre: string;
}

// interface SetConformationParams {
//   body: any;
// }

interface UseNetsystemsService {
  //? users
  getClientDetails: (params: GetClientDetailsParams) => Promise<any>;
  getInvoiceDebts: (params: GetInvoiceDebtsParams) => Promise<any>;
  setPayment: (params: SetPaymentParams) => Promise<any>;

  //? bdt
  getBanks: (params: GetBanksParams) => Promise<any>;
  getOTP: (params: GetOTPParams) => Promise<any>;
  setBdTPayment: (params: SetBdTPaymentParams) => Promise<any>;
  //setConformation: (params: SetConformationParams) => Promise<any>;
}

function useNetsystemsService(): UseNetsystemsService {
  const URL = import.meta.env.PUBLIC_NET_API_URL;

  //? cluster fetch
  const fetchData = useCallback<any>(
    async (endpoint: string, options: ApiOptions = {}) => {
      try {
        const response = await fetch(`${URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    [URL]
  );

  //? users
  const getClientDetails = useCallback(
    async ({
      cedula,
    }: GetClientDetailsParams): Promise<Netsystems.LoginResponse> =>
      fetchData("/user/get-client-details", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData]
  );

  const getInvoiceDebts = useCallback(
    async ({
      cedula,
    }: GetInvoiceDebtsParams): Promise<Netsystems.InvoiceDebtsResponse> =>
      fetchData("/user/consulta-deuda", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData]
  );

  const setPayment = useCallback(
    async (body: SetPaymentParams): Promise<any> =>
      fetchData("/user/registrar-pago", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    [fetchData]
  );

  //? bdt
  const getBanks = useCallback(
    async ({ body }: GetBanksParams): Promise<any> =>
      fetchData("/bdt/getBanks", {
        method: "POST",
        body,
      }),
    [fetchData]
  );

  const getOTP = useCallback(
    async ({ ci }: GetOTPParams): Promise<any> =>
      fetchData("/bdt/getOTP", {
        method: "POST",
        body: JSON.stringify({ celularDestino: ci }),
      }),
    [fetchData]
  );

  const setBdTPayment = useCallback(
    async (body: SetBdTPaymentParams): Promise<any> =>
      fetchData("/bdt/setPayment", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    [fetchData]
  );

  // const setConformation = useCallback(
  //   async ({ body }: SetConformationParams): Promise<any> =>
  //     fetchData("/bdt/conformation", {
  //       method: "POST",
  //       body,
  //     }),
  //   [fetchData]
  // );

  return {
    //? users
    getInvoiceDebts,
    getClientDetails,
    setPayment,

    //? bdt
    getBanks,
    getOTP,
    setBdTPayment,
    //setConformation,
  };
}

export default useNetsystemsService;
