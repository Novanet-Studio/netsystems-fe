import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../../PaymentWrapperContex";
import style from "../../_styles.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { banks } from "../../../../utils/banks";
import type { Netsystems } from "../../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";
import useNetsystemsService from "../../hooks/use-netsystems-services";
import useUsdConvertion from "../../hooks/use-usd-convertion";
import { BaseInput, FormAlert, SelectInput } from "../Input";

export const PaymentReport = () => {
  const { getInvoiceDebts, getOTP } = useNetsystemsService();
  const { getBcvUsd, getFormatAmount } = useUsdConvertion();

  const { nextStep, prevStep, getUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const [errorInfo, setErrorInfo] = useState("");
  const [sendingInfo, setSendingInfo] = useState(false);

  const [requestOTP, setRequestOTP] = useState(false);

  const [debtAmountLabel, setDebtAmountLabel] = useState("");

  const schema = yup
    .object({
      phone: yup.string().required(),
      literal: yup.string(),
      cedula: yup.string().required(),
      bankIssue: yup.string(),
      payDate: yup.date().required(),
      // dynamicPass: yup.string().required(),
      convertionRate: yup.number().default(0),
      debtAmount: yup.number().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (!requestOTP) {
      getRequestOTP(data);

      return;
    }

    console.log(`<<< Enviar datos a api/BdV >>>`, data);

    // nextStep();
  };

  const getRequestOTP = async (info: any) => {
    if (!requestOTP) {
      const { data, error } = await getOTP({
        body: {
          celularDestino: `${info.literal}0${info.cedula}`,
        },
      });

      console.log(`<<< data >>>`, data);
      console.log(`<<< error >>>`, error);

      setRequestOTP(true);
    }
  };

  const getDebts = async () => {
    try {
      const res: Netsystems.InvoiceDebtsResponse = await getInvoiceDebts({
        cedula: getUserData().datos[0].cedula,
      });

      if (!res.code) {
        return;
      }

      if (res.code === "160") {
        setErrorInfo("No tienes facturas por pagar");
        return;
      }

      setValue("debtAmount", Number(res.facturas[0].valor));

      if (getValues("convertionRate")) setVesAmount();
    } catch (e) {
      console.log(`<<< e >>>`, e);
    }
  };

  const getVesUsd = async () => {
    try {
      const res: Netsystems.BcvUsdResponse = await getBcvUsd();

      setValue("convertionRate", Number(res.sources.BCV.quote));

      if (getValues("debtAmount")) setVesAmount();
    } catch (e) {
      setErrorInfo("😡 Error de comunicacion con exchangedyn");
    }
  };

  const setVesAmount = () => {
    setDebtAmountLabel(
      `Bs.S ${getFormatAmount(String(getValues("debtAmount") * getValues("convertionRate")), true)}`
    );

    setValue(
      "debtAmount",
      getValues("debtAmount") * getValues("convertionRate")
    );
  };

  useEffect(() => {
    getDebts();
    getVesUsd();
  }, [null]);

  return (
    <>
      <form className={style.paymentSec__form}>
        <span
          className={[
            style.paymentSec__form__content,
            style.paymentSec__form__content_twoColumns,
          ].join(" ")}
        >
          {/* ? phone input | telefono */}
          <span className={style.input_wrapper}>
            <BaseInput
              id="reportPayment_phone"
              label="Telefono"
              placeholder="ej: 04120000000"
              inputName="phone"
              inputInfo={""}
              inputRequiredMessage="Telefono requerido"
              register={register}
              errors={errors}
            />
          </span>

          {/* ? ci input | cedula */}
          <span className={style.input_wrapper}>
            <label htmlFor="reportPayment_cedula" className={style.label}>
              Cedula de identidad
            </label>
            <span
              className={style.input_wrapper_row}
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr",
                gap: ".5rem",
              }}
            >
              <SelectInput
                id="reportPayment_literal"
                inputName="literal"
                defaultValue={"V"}
                inputInfo={" "}
                isInvalid={errors.cedula?.type === "required"}
                source={[
                  {
                    label: "V",
                    value: "V",
                  },
                  {
                    label: "E",
                    value: "E",
                  },
                  {
                    label: "J",
                    value: "J",
                  },
                  {
                    label: "P",
                    value: "P",
                  },
                ]}
                register={register}
              />

              <BaseInput
                id="reportPayment_cedula"
                inputType="number"
                placeholder="ej: 10000000"
                inputName="cedula"
                defaultValue="11484286"
                showInputErros={false}
                register={register}
                errors={errors}
              />
            </span>

            <FormAlert
              message={"Cedula requerida"}
              style={style.input_error}
              show={errors.cedula?.type === "required"}
            />
          </span>

          {/* ? payDate input | Fecha de pago */}
          <span className={style.input_wrapper}>
            <label htmlFor="reportPayment_payDate" className={style.label}>
              Fecha del pago
            </label>
            <input
              id="reportPayment_payDate"
              type="date"
              className={
                errors.payDate?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              defaultValue={new Date().toISOString().substr(0, 10)}
              {...register("payDate", {
                valueAsDate: true,
              })}
            />

            {errors.payDate?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Fecha de pago invalid"}
              </p>
            )}
          </span>

          {/* ? bankIssue input | Banco emisor */}
          <span className={style.input_wrapper}>
            <SelectInput
              id="reportPayment_backIssue"
              label="Banco emisor"
              inputName="bankIssue"
              defaultValue="0163"
              source={banks.map((b: Netsystems.Bank) => ({
                label: b.name,
                value: b.code,
              }))}
              register={register}
            />
          </span>

          {/* ? debtAmount input | Monto a pagar  */}
          <span className={style.input_wrapper}>
            <BaseInput
              id="reportPayment_debtAmount"
              label="Monto a pagar"
              inputName="reportPayment_debtAmount"
              defaultValue={debtAmountLabel}
              isDisabled={true}
            />
          </span>

          {/* ? referenceNro input | Nro de referencia  */}
          {requestOTP && (
            <span className={style.input_wrapper}>
              <BaseInput
                id="reportPayment_dynamicPass"
                label="Clave dinamica"
                placeholder="ej: 123456"
                inputName="dynamicPass"
                inputRequiredMessage="Clave dinamica invalida"
                register={register}
                errors={errors}
              />
            </span>
          )}
        </span>

        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />

          <NextStep
            label={requestOTP ? "Finalizar" : "Solicitar clave"}
            handler={handleSubmit(onSubmit)}
          />
        </span>
      </form>
    </>
  );
};
