import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import type { App } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";

export const Contract = () => {
  const { nextStep, prevStep } = useContext(
    PaymentWrapperContext,
  ) as App.PayContextType;

  let contracts = ["Contract Nro 001", "Contract Nro 002"];

  interface Form {
    nroContract: any;
  }

  const { register, handleSubmit } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (_data) => {
    console.log(`<<< Siguiente paso >>>`, _data);

    nextStep();
  };

  return (
    <>
      <form
        className={style.paymentSec__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={style.paymentSec__form__content}>
          <select className={style.input} {...register("nroContract")}>
            {contracts.map((c, index) => (
              <option key={`opt_${index}`} value={c}>
                {c}
              </option>
            ))}
          </select>
        </span>
        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />

          <NextStep label="Siguiente" handler={handleSubmit(onSubmit)} />
        </span>
      </form>
    </>
  );
};
