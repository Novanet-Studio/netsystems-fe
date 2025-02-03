import { useContext } from "react";
import PaymentWrapperContext from "./PaymentWrapperContex";

export const Steps = (props: { currentStep: number }) => {
  const { goToStep } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const { currentStep } = props;

  const STEPS = [
    { relativeStep: 1, ordinalStep: 2 },
    { relativeStep: 2, ordinalStep: 3 },
    { relativeStep: 3, ordinalStep: 4 },
    { relativeStep: 4, ordinalStep: 5 },
  ];

  const handlerStep = (
    _event: any,
    s: {
      relativeStep: number;
      ordinalStep: number;
    }
  ) => {
    _event.preventDefault();

    if (s.relativeStep < currentStep) goToStep(s.ordinalStep);
  };

  return (
    <span className="paymentSec__steppIndicator">
      {STEPS.map((s) => (
        <span
          key={`st_${s.relativeStep}`}
          className={`paymentSec__steppButton ${
            s.relativeStep <= currentStep
              ? "paymentSec__steppButtonActive"
              : "paymentSec__steppButtonCurren"
          }`}
          onClick={(e) => handlerStep(e, s)}
        >
          <button>{s.relativeStep}</button>
        </span>
      ))}
    </span>
  );
};
