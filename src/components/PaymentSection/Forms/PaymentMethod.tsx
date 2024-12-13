import { useContext } from "react";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import type { App } from "../../../env";

import { NextStep } from "../NextStep";

export const PaymentMethod = () => {
  const { nextStep } = useContext(PaymentWrapperContext) as App.PayContextType;

  const paymentMethods: App.PaymentMethodItem[] = [
    {
      bank: "BdV",
      logoImage: "/images/payment-form/banks/BdV.png",
    },
  ];

  const selectPaymentMethod = (_event: any, _p: App.PaymentMethodItem) => {
    _event.preventDefault();

    nextStep();
  };

  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__paymentMethods}>
          {paymentMethods.map((p, index) => (
            <button
              key={`pm_${index}`}
              className={""}
              onClick={(e) => selectPaymentMethod(e, p)}
            >
              <img src={p.logoImage} alt={`pm_${p.bank}`} />
            </button>
          ))}
        </span>
        <span className={style.paymentSec__form__buttons}>
          <NextStep
            label="Continuar"
            handler={() => console.log("NextStep click on ContractForm")}
          />
        </span>
      </form>
    </>
  );
};
