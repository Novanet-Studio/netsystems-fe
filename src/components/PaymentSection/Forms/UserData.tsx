import { useContext } from "react";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import type { App } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";

export const UserData = () => {
  const { nextStep, prevStep } = useContext(
    PaymentWrapperContext,
  ) as App.PayContextType;

  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__content}>
          <input className={style.input} value={"Contrac Nro 001"} disabled />

          <input className={style.input} value={"Pedro Perez"} disabled />

          <input className={style.input} value={"V0000000"} disabled />
        </span>

        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />
          <NextStep label="Siguiente" handler={() => nextStep()} />
        </span>
      </form>
    </>
  );
};
