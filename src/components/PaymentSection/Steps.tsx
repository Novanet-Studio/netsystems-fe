import { useContext } from "react";
import PaymentWrapperContext from "./PaymentWrapperContex";
import style from "./_styles.module.css";

import type { App } from "../../env";

export const Steps = (props: { currentStep: number }) => {
  const { goToStep } = useContext(PaymentWrapperContext) as App.PayContextType;

  const { currentStep } = props;

  const STEPS = [
    { relativeStep: 1, ordinalStep: 2 },
    { relativeStep: 2, ordinalStep: 3 },
    { relativeStep: 3, ordinalStep: 4 },
    { relativeStep: 4, ordinalStep: 5 },
  ];

  const handlerStep = (_event: any, s: number) => {
    _event.preventDefault();

    goToStep(s);
  };

  return (
    <span className={style.paymentSec__steppIndicator}>
      {STEPS.map((s) => (
        <span
          key={`st_${s.relativeStep}`}
          className={
            s.relativeStep <= currentStep
              ? [
                  style.paymentSec__steppButton,
                  s.relativeStep === currentStep
                    ? style.paymentSec__steppButtonCurrent
                    : style.paymentSec__steppButtonActive,
                ].join(" ")
              : style.paymentSec__steppButton
          }
          onClick={(e) => handlerStep(e, s.ordinalStep)}
        >
          <button>{s.relativeStep}</button>
        </span>
      ))}
    </span>
  );
};
