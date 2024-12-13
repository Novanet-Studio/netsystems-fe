import { useContext } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { banks } from "../../../utils/banks";
import type { App } from "../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";

export const PaymentReport = () => {
  const { nextStep, prevStep } = useContext(
    PaymentWrapperContext,
  ) as App.PayContextType;

  const schema = yup
    .object({
      phone: yup.string().required(),
      literal: yup.string(),
      cedula: yup.string().required(),
      bankIssue: yup.string(),
      payDate: yup.date().required(),
      referenceNro: yup.string().required(),
      debtAmount: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(`<<< Enviar datos a api/BdV >>>`, data);

    nextStep();
  };

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
            <input
              className={
                errors.phone?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              style={{ width: "100%" }}
              placeholder="Telefono"
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
                className={
                  errors.cedula?.type === "required"
                    ? [style.input, style.input_invalid].join(" ")
                    : style.input
                }
                style={{ width: "100%" }}
                placeholder="Cedula de identidad"
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
            <input
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
            <select
              className={
                errors.bankIssue?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              style={{ width: "100%" }}
              {...register("bankIssue")}
              defaultValue="0102"
            >
              {banks.map((b: App.Bank) => (
                <option value={b.code}>{`${b.name}`}</option>
                //* <option value={b.code}>{`${b.code} - ${b.name}`}</option>
              ))}
            </select>
          </span>

          {/* ? referenceNro input | Nro de referencia  */}
          <span className={style.input_wrapper}>
            <input
              className={
                errors.referenceNro?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              placeholder="Nro de referencia"
              {...register("referenceNro", { required: true })}
            />

            {errors.referenceNro?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Referencia invalida"}
              </p>
            )}
          </span>

          {/* ? debtAmount input | Monto a pagar  */}
          <span className={style.input_wrapper}>
            <input
              className={
                errors.debtAmount?.type === "required"
                  ? [style.input, style.input_invalid].join(" ")
                  : style.input
              }
              placeholder="Monto a pagar"
              {...register("debtAmount", { required: true })}
            />

            {errors.debtAmount?.type === "required" && (
              <p role="alert" className={style.input_error}>
                {"Monto invalido"}
              </p>
            )}
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
