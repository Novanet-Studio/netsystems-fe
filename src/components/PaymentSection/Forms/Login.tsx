import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { App } from "../../../env";

import { NextStep } from "../NextStep";

export const Login = () => {
  const { nextStep } = useContext(PaymentWrapperContext) as App.PayContextType;

  const [auxMessage, setAuxMessage] = useState({
    username: "",
    password: "",
  });

  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
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
    console.log(`<<< Enviar datos a api/users >>>`, data);

    nextStep();
  };

  return (
    <>
      <form
        className={style.paymentSec__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={style.paymentSec__form__content}>
          <input
            className={
              errors.username?.type === "required" || auxMessage.username
                ? [style.input, style.input_invalid].join(" ")
                : style.input
            }
            placeholder="Usuario"
            {...register("username", { required: true })}
          />

          {(errors.username?.type === "required" || auxMessage.username) && (
            <p role="alert" className={style.input_error}>
              {auxMessage.username || "Usuario requerido"}
            </p>
          )}

          <input
            className={
              errors.password?.type === "required" || auxMessage.password
                ? [style.input, style.input_invalid].join(" ")
                : style.input
            }
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />

          {(errors.password?.type === "required" || auxMessage.password) && (
            <p role="alert" className={style.input_error}>
              {auxMessage.password || "Contraseña requerida"}
            </p>
          )}
        </span>

        <span className={style.paymentSec__form__buttons}>
          <NextStep label="Iniciar sesion" handler={handleSubmit(onSubmit)} />
        </span>
      </form>
    </>
  );
};
