import { useContext, useEffect } from "react";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import type { Netsystems } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";

export const UserData = () => {
  const { nextStep, prevStep, getUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  useEffect(() => {
    console.log(`<<< getUserData() >>>`, getUserData());
  }, []);

  return (
    <>
      <form className={style.paymentSec__form}>
        <span className={style.paymentSec__form__content}>
          <label htmlFor="userData_nroContract" className={style.label}>
            Número de contrato
          </label>
          <input
            id="userData_nroContract"
            className={style.input}
            value={getUserData().currentContract}
            disabled
          />

          <label htmlFor="userData_name" className={style.label}>
            Nombre y apellido
          </label>
          <input
            id="userData_name"
            className={style.input}
            value={getUserData().datos[0].nombre}
            disabled
          />

          <label htmlFor="userData_ci" className={style.label}>
            Cédula de identidad
          </label>
          <input
            id="userData_ci"
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
