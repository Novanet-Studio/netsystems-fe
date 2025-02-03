import { createContext } from "react";

const PaymentWrapperContext = createContext<Netsystems.PayContextType | null>(
  null,
);

export default PaymentWrapperContext;
