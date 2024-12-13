import { useContext, useEffect } from "react";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import type { Netsystems } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";

export const UserData = () => {
  const { nextStep, prevStep, getUserData } = useContext(
    PaymentWrapperContext,
  ) as Netsystems.PayContextType;

  useEffect(() => {
    console.log(`<<< getUserData() >>>`, getUserData());
  }, []);

  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__content}>
          <input
            className={style.input}
            value={getUserData().currentContract}
            disabled
          />

          <input
            className={style.input}
            value={getUserData().datos[0].nombre}
            disabled
          />

          <input
            className={style.input}
            value={getUserData().datos[0].cedula}
            disabled
          />
        </span>

        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />
          <NextStep label="Siguiente" handler={() => nextStep()} />
        </span>
      </form>
    </>
  );
};
