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
  body: any;
}

//? bdt
interface GetBanksParams {
  body: any;
}

interface SetBdTPaymentParams {
  body: any;
}

interface SetConformationParams {
  body: any;
}

interface UseNetsystemsService {
  //? users
  getClientDetails: (params: GetClientDetailsParams) => Promise<any>;
  getInvoiceDebts: (params: GetInvoiceDebtsParams) => Promise<any>;
  setPayment: (params: SetPaymentParams) => Promise<any>;

  //? bdt
  getBanks: (params: GetBanksParams) => Promise<any>;
  setBdTPayment: (params: SetBdTPaymentParams) => Promise<any>;
  setConformation: (params: SetConformationParams) => Promise<any>;
}

function useNetsystemsService(): UseNetsystemsService {
  const URL = "http://localhost:1302/api/v1";

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
    async ({ body }: SetPaymentParams): Promise<any> =>
      fetchData("/user/registrar-pago", {
        method: "POST",
        body,
      }),
    [fetchData]
  );

  //? bdt
  const getBanks = useCallback(
    async ({ body }: GetBanksParams): Promise<any> =>
      fetchData("/bdt/bancos", {
        method: "POST",
        body,
      }),
    [fetchData]
  );

  const setBdTPayment = useCallback(
    async ({ body }: SetBdTPaymentParams): Promise<any> =>
      fetchData("/bdt/pago", {
        method: "POST",
        body,
      }),
    [fetchData]
  );

  const setConformation = useCallback(
    async ({ body }: SetConformationParams): Promise<any> =>
      fetchData("/bdt/conformacion", {
        method: "POST",
        body,
      }),
    [fetchData]
  );

  return {
    //? users
    getInvoiceDebts,
    getClientDetails,
    setPayment,

    //? bdt
    getBanks,
    setBdTPayment,
    setConformation,
  };
}

export default useNetsystemsService;
