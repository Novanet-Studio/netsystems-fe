import { createContext } from "react";
import type { Netsystems } from "../../env";

const PaymentWrapperContext = createContext<Netsystems.PayContextType | null>(
  null,
);

export default PaymentWrapperContext;
