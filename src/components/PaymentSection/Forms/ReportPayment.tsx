import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { banks } from "../../../utils/banks";
import type { Netsystems } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";
import useNetsystemsService from "../hooks/use-netsystems-services";
import useUsdConvertion from "../hooks/use-usd-convertion";

export const PaymentReport = () => {
  const { getInvoiceDebts } = useNetsystemsService();
  const { getBcvUsd, getFormatAmount } = useUsdConvertion();

  const { nextStep, prevStep, getUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const [errorInfo, setErrorInfo] = useState("");
  const [sendingInfo, setSendingInfo] = useState(false);

  const schema = yup
    .object({
      phone: yup.string().required(),
      literal: yup.string(),
      cedula: yup.string().required(),
      bankIssue: yup.string(),
      payDate: yup.date().required(),
      dynamicPass: yup.string().required(),
      convertionRate: yup.number().default(0),
      debtAmount: yup.number().required(),
      debtAmountLabel: yup.string().required(),
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
    console.log(`<<< Enviar datos a api/BdV >>>`, data);

    nextStep();
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
    setValue(
      "debtAmountLabel",
      `Bs.S ${getFormatAmount(String(getValues("debtAmount") * getValues("convertionRate")), true)}`
    );
  };

  useEffect(() => {
    getDebts();
    getVesUsd();
  }, []);

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
            <label htmlFor="reportPayment_phone" className={style.label}>
              Telefono
            </label>
            <input
              id="reportPayment_phone"
              className={
                errors.phone?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              style={{ width: "100%" }}
              placeholder="ej: 04120000000"
              {...register("phone", { required: true })}
            />

            {errors.phone?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Telefono invalido"}
              </p>
            )}
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
              <select
                className={
                  errors.cedula?.type === "required"
                    ? [style.input, style.input_invalid].join(" ")
                    : style.input
                }
                style={{
                  appearance: "textfield",
                }}
                {...register("literal")}
                defaultValue="V"
              >
                <option value="V">V</option>
                <option value="E">E</option>
                <option value="J">J</option>
                <option value="P">P</option>
              </select>

              <input
                id="reportPayment_cedula"
                className={
                  errors.cedula?.type === "required"
                    ? [style.input, style.input_invalid].join(" ")
                    : style.input
                }
                style={{ width: "100%" }}
                placeholder="ej: 10000000"
                {...register("cedula", { required: true })}
              />
            </span>

            {errors.cedula?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Cedula invalida"}
              </p>
            )}
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
                required: true,
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
            <label htmlFor="reportPayment_backIssue" className={style.label}>
              Banco emisor
            </label>
            <select
              id="reportPayment_backIssue"
              className={
                errors.bankIssue?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              style={{ width: "100%" }}
              {...register("bankIssue")}
              defaultValue="0102"
            >
              {banks.map((b: Netsystems.Bank) => (
                <option key={b.code} value={b.code}>{`${b.name}`}</option>
                //* <option value={b.code}>{`${b.code} - ${b.name}`}</option>
              ))}
            </select>
          </span>

          {/* ? referenceNro input | Nro de referencia  */}
          <span className={style.input_wrapper}>
            <label htmlFor="reportPayment_dynamicPass" className={style.label}>
              Clave dinamica
            </label>
            <input
              className={
                errors.dynamicPass?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              placeholder="ej: 123456"
              {...register("dynamicPass", { required: true })}
            />

            {errors.dynamicPass?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Clave dinamica invalida"}
              </p>
            )}
          </span>

          {/* ? debtAmount input | Monto a pagar  */}
          <span className={style.input_wrapper}>
            <label htmlFor="reportPayment_debtAmount" className={style.label}>
              Monto a pagar
            </label>
            <input
              id="reportPayment_debtAmount"
              className={
                errors.debtAmountLabel?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              placeholder="Monto a pagar"
              disabled
              {...register("debtAmountLabel", { required: true })}
            />
          </span>
        </span>

        <span className={style.paymentSec__form__buttons}>
          <PrevStep label="Regresar" handler={() => prevStep()} />

          <NextStep label="Finalizar" handler={handleSubmit(onSubmit)} />
        </span>
      </form>
    </>
  );
};
