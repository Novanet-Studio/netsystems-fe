import { useCallback } from "react";
import type { Netsystems } from "../../../env";

interface ApiOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

interface GetClientDetailsParams {
  cedula: string;
}

interface GetInvoiceDebtsParams {
  cedula: string;
}

interface UseNetsystemsService {
  getClientDetails: (params: GetClientDetailsParams) => Promise<any>;
  getInvoiceDebts: (params: GetInvoiceDebtsParams) => Promise<any>;
}

function useNetsystemsService(): UseNetsystemsService {
  const URL = "http://localhost:1302/api/v1";

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
    [URL],
  );

  const getClientDetails = useCallback(
    async ({
      cedula,
    }: GetClientDetailsParams): Promise<Netsystems.LoginResponse> =>
      fetchData("/user/get-client-details", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData],
  );

  const getInvoiceDebts = useCallback(
    async ({
      cedula,
    }: GetInvoiceDebtsParams): Promise<Netsystems.InvoiceDebtsResponse> =>
      fetchData("/user/consulta-deuda", {
        method: "POST",
        body: JSON.stringify({ cedula: cedula }),
      }),
    [fetchData],
  );

  return {
    getInvoiceDebts,
    getClientDetails,
  };
}

export default useNetsystemsService;
