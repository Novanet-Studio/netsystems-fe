import { useContext, useEffect } from "react";
import PaymentWrapperContext from "../../PaymentWrapperContex";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";
import { BaseInput } from "../Input";

export const UserData = () => {
  const { nextStep, prevStep, getUserData } = useContext(
    PaymentWrapperContext,
  ) as Netsystems.PayContextType;

  useEffect(() => {}, []);

  return (
    <>
      <form className="paymentSec__form">
        <span className="paymentSec__form__content">
          <BaseInput
            id="userData_nroContract"
            label="Número de contrato"
            inputName="userData_nroContract"
            defaultValue={getUserData().currentContract}
            isDisabled={true}
          />

          <BaseInput
            id="userData_name"
            label="Nombre y apellido"
            inputName="userData_name"
            defaultValue={getUserData().datos[0].nombre}
            isDisabled={true}
          />

          <BaseInput
            id="userData_ci"
            label="Cédula de identidad"
            inputName="userData_ci"
            defaultValue={getUserData().datos[0].cedula}
            isDisabled={true}
          />
        </span>

        <span className="paymentSec__form__buttons">
          <PrevStep label="Regresar" handler={() => prevStep()} />
          <NextStep label="Siguiente" handler={() => nextStep()} />
        </span>
      </form>
    </>
  );
};
