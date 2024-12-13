import { createContext } from "react";
import type { App } from "../../env";

const PaymentWrapperContext = createContext<App.PayContextType | null>(null);

export default PaymentWrapperContext;
