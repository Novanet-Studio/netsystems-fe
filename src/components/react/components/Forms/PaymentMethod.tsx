import { useContext } from "react";
import PaymentWrapperContext from "../../PaymentWrapperContex";

import type { Netsystems } from "../../../../env";

import { NextStep } from "../NextStep";

export const PaymentMethod = () => {
  const { nextStep } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const paymentMethods: Netsystems.PaymentMethodItem[] = [
    {
      bank: "BdV",
      logoImage: "/images/payment-form/banks/bt.svg",
    },
  ];

  const selectPaymentMethod = (
    _event: any,
    _p: Netsystems.PaymentMethodItem
  ) => {
    _event.preventDefault();

    nextStep();
  };

  return (
    <>
      <form className="paymentSec__form">
        <span className="paymentSec__form__paymentMethods">
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
        <span className="paymentSec__form__buttons">
          <NextStep label="Continuar" handler={() => nextStep()} />
        </span>
      </form>
    </>
  );
};
