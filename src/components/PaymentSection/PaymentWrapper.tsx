import { useEffect, useState } from "react";

import PaymentWrapperContex from "./PaymentWrapperContex";
import { Steps } from "./Steps";

import style from "./_styles.module.css";
import type { Netsystems } from "../../env";

//FORMS
import { Login } from "./Forms/Login";
import { PaymentMethod } from "./Forms/PaymentMethod";
import { UserData } from "./Forms/UserData";
import { Contract } from "./Forms/Contract";
import { PaymentReport } from "./Forms/ReportPayment";
import { CompletedPayment } from "./Forms/CompletedPayment";

const PaymentWrapper = () => {
  const steps: Netsystems.PaymentFormInfo[] = [
    {
      title: "Ingresa a tu cuenta",
      subtitle: "Coloca la información solicitada",
      bannerImage: "/images/payment-form/aside-1.png",
      form: <Login />,
    },
    {
      title: "Seleccione el metodo de pago",
      subtitle: "Puede elegir entre las siguientes opciones",
      bannerImage: "/images/payment-form/aside-2.png",
      form: <PaymentMethod />,
    },
    {
      title: "Confirmación de Pagos",
      subtitle: "Consulta datos del suscriptor",
      label: "paso 1",
      bannerImage: "/images/payment-form/aside-3.png",
      form: <Contract />,
      stepIndicator: <Steps currentStep={1} />,
    },
    {
      title: "Confirmación de Pagos",
      subtitle: "Datos del suscriptor",
      label: "paso 2",
      bannerImage: "/images/payment-form/aside-4.png",
      form: <UserData />,
      stepIndicator: <Steps currentStep={2} />,
    },
    {
      title: "Confirmación de Pagos",
      subtitle: "Reporte de pago",
      label: "paso 3",
      bannerImage: "/images/payment-form/aside-5.png",
      form: <PaymentReport />,
      stepIndicator: <Steps currentStep={3} />,
    },
    {
      title: "Confirmación de Pagos",
      subtitle: "Estatus de pago",
      label: "paso 4",
      bannerImage: "/images/payment-form/aside-6.png",
      form: <CompletedPayment />,
      stepIndicator: <Steps currentStep={4} />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    console.log(`<<< step in wrapper >>>`, step);

    setCurrentStep(step);
  };

  const getUserData = () => {
    return data;
  };

  const setUserData = (userData: any) => {
    setData(userData);
  };

  useEffect(() => {}, [null]);

  return (
    <PaymentWrapperContex.Provider
      value={{ nextStep, prevStep, goToStep, getUserData, setUserData }}
    >
      <FormWrapper stepInfo={steps[currentStep]} />
    </PaymentWrapperContex.Provider>
  );
};

export default PaymentWrapper;

/* > FORMS */
const FormWrapper = ({
  stepInfo,
}: {
  stepInfo: Netsystems.PaymentFormInfo;
}) => {
  const { label, title, subtitle, bannerImage, form } = stepInfo;

  return (
    <div className={style.paymentSec__wrapper}>
      <aside
        className={style.paymentSec__banner}
        style={{
          background: `url(${bannerImage}) center/cover`,
        }}
      >
        {stepInfo.stepIndicator}
      </aside>
      <div className={style.paymentSec__main}>
        <p>{label}</p>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>

        {form}
      </div>
    </div>
  );
};
