import style from "../../_styles.module.css";

import { NextStep } from "../NextStep";

export const CompletedPayment = () => {
  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__content}>
          <span className={style.message}>
            <span className={style.message__icon}>
              <CheckIcon />
            </span>
            <h3>¡Exitoso!</h3>
            <p>Gracias por su pago</p>
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
      fill="currentColor"
      stroke="#df0b33"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" />
    </svg>
  );
};
