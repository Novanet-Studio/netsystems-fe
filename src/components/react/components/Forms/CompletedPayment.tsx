import { useContext } from "react";
import PaymentWrapperContext from "../../PaymentWrapperContex";
import style from "../../_styles.module.css";

import type { Netsystems } from "../../../../env";

export const CompletedPayment = () => {
  const { getPaymentResult } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__content}>
          <span className={style.message}>
            {getPaymentResult().status === "CONFIRMED_PAYMENT" ? (
              <>
                <span className={style.message__icon}>
                  <CheckIcon />
                </span>
                <h3>¡Exitoso!</h3>
                <p>Gracias por su pago</p>
              </>
            ) : (
              <>
                <span className={style.message__icon}>
                  <FailIcon />
                </span>
                <h3>Error</h3>
                <p>No se ha podido procesar el pago</p>
              </>
            )}
          </span>
        </span>
        <span className={style.paymentSec__form__buttons}>
          <a href="/" className="theme-btn btn-style-four">
            <span className="txt">Volver al inicio</span>
          </a>
        </span>
      </form>
    </>
  );
};

const CheckIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0b94b8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
};

const FailIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#df0b33"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
