import { useContext, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PaymentWrapperContext from "../../PaymentWrapperContex";
import style from "../../_styles.module.css";

import type { Netsystems } from "../../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";
import { SelectInput } from "../Input";

type contract = {
  text: string;
  value: string;
};

export const Contract = () => {
  const { nextStep, prevStep, getUserData, setUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  let [contracts, setContracts] = useState<contract[]>([]);

  interface Form {
    nroContract: any;
  }

  const { register, handleSubmit } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (_data) => {
    if (_data.nroContract === "") _data.nroContract = contracts[0].value;

    setUserData({ ...getUserData(), currentContract: _data.nroContract });

    nextStep();
  };

  useEffect(() => {
    const data: Netsystems.LoginResponse = getUserData();

    let cAux: contract[] = [];

    console.log(`<<< data.datos >>>`, data.datos);

    data.datos?.forEach((i) => {
      if (i.estado === "ACTIVO") {
        i.servicios?.forEach((s) => {
          cAux.push({
            text: s.perfil,
            value: String(s.id),
          });
        });
      }
    });

    setContracts(cAux);
  }, [setContracts]);

  return (
    <>
      <form
        className={style.paymentSec__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={style.paymentSec__form__content}>
          <span className={style.input_wrapper}>
            <SelectInput
              id="contract_nroContract"
              label="Contracto de servicio"
              inputName="nroContract"
              defaultValue={contracts.length > 0 ? contracts[0].text : ""}
              source={contracts.map((c) => ({
                label: c.text,
                value: c.value,
              }))}
              register={register}
            />
          </span>
        </span>
        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />

          <NextStep label="Siguiente" handler={handleSubmit(onSubmit)} />
        </span>
      </form>
    </>
  );
};
