import { useCallback } from "react";
import type { Netsystems } from "../../../env";

interface ApiOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

interface GetVesUsdConvertionParams {
  cedula: string;
}

interface UseUsdConvertion {
  getBcvUsd: () => Promise<any>;
  getFormatAmount: (amount: string, pretty: boolean) => string;
}

function useUsdConvertion(): UseUsdConvertion {
  const URL = import.meta.env.PUBLIC_EXG_API_URL;

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

  const getBcvUsd = useCallback(
    async (): Promise<Netsystems.BcvUsdResponse> =>
      fetchData("/usdves/bcv", {
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

  return {
    getBcvUsd,
    getFormatAmount,
  };
}

export default useUsdConvertion;
