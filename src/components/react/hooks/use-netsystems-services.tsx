import { useCallback } from "react";

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

  //? usd ves
  getUsdVesConvertion: () => Promise<any>;
  getFormatAmount: (amount: string, pretty: boolean) => any;

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

        const res = await response.text();

        return JSON.parse(res);
      } catch (error) {
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
      fetchData("/user/getClientDetails", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData]
  );

  const getInvoiceDebts = useCallback(
    async ({
      cedula,
    }: GetInvoiceDebtsParams): Promise<Netsystems.InvoiceDebtsResponse> =>
      fetchData("/user/getDebt", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData]
  );

  const setPayment = useCallback(
    async (body: SetPaymentParams): Promise<any> =>
      fetchData("/user/setPayment", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    [fetchData]
  );

  //? usd ves convertion
  const getUsdVesConvertion = useCallback(
    async (): Promise<any> =>
      fetchData("/usdVes/getUsdVesCurrent", {
        method: "GET",
      }),
    [fetchData]
  );

  const getFormatAmount = (amount: string, pretty = false) => {
    const [integer, decimal] = amount.split(".");
    const quote = `${integer}.${decimal.slice(0, 2)}`;

    if (pretty) {
      return quote.replace(".", ",");
    }

    return quote;
  };

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

  return {
    //? users
    getInvoiceDebts,
    getClientDetails,
    setPayment,

    //? usd ves
    getUsdVesConvertion,
    getFormatAmount,

    //? bdt
    getBanks,
    getOTP,
    setBdTPayment,
    //setConformation,
  };
}

export default useNetsystemsService;
