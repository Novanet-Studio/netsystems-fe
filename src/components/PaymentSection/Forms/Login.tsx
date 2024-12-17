import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../PaymentWrapperContex";
import style from "../_styles.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { Netsystems } from "../../../env";

import { NextStep } from "../NextStep";
import useNetsystemsService from "../hooks/use-netsystems-services";

export const Login = () => {
  const { getClientDetails } = useNetsystemsService();

  const { nextStep, setUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const [usernameInfo, setUsernameInfo] = useState("");
  const [passwordInfo, setPasswordInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [sendingInfo, setSendingInfo] = useState(false);

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

  const onSubmit = async (data: { username: string; password: string }) => {
    setSendingInfo(true);

    try {
      const res: Netsystems.LoginResponse = await getClientDetails({
        cedula: data.password,
      });

      if (res.estado === "error") {
        switch (res.message) {
          case "No existe el cliente con el filtro indicado.":
            setUsernameInfo("Usuario no encontrado");

            break;

          default:
            setErrorInfo("Error desconocido");
            break;
        }

        return;
      }

      //? save user data on PaymentWrapperContext
      setUserData(res);

      nextStep();
    } catch (e) {
      console.log(`<<< e >>>`, e);
      setErrorInfo("🤕 Error de conexion con el servicio de pago");
    } finally {
      setSendingInfo(false);
    }
  };

  useEffect(() => {}, [null]);

  return (
    <>
      <form
        className={style.paymentSec__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={style.paymentSec__form__content}>
          <label htmlFor="login_username" className={style.label}>Usuario</label>
          <input
            id="login_username"
            className={
              errors.username?.type === "required" || usernameInfo
                ? [style.input, style.input_invalid].join(" ")
                : style.input
            }
            placeholder="Usuario"
            {...register("username", { required: true })}
          />

          {(errors.username?.type === "required" || usernameInfo) && (
            <p role="alert" className={style.input_error}>
              {usernameInfo || "Usuario requerido"}
            </p>
          )}

          <label htmlFor="login_password" className={style.label}>Contraseña</label>
          <input
            type="password"
            className={
              errors.password?.type === "required" || passwordInfo
                ? [style.input, style.input_invalid].join(" ")
                : style.input
            }
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />

          {(errors.password?.type === "required" || passwordInfo) && (
            <p role="alert" className={style.input_error}>
              {passwordInfo || "Contraseña requerida"}
            </p>
          )}

          {!sendingInfo && errorInfo && (
            <p role="alert" className={style.input_error}>
              {errorInfo}
            </p>
          )}

          {sendingInfo && (
            <p role="alert" className={style.form_message}>
              Enviando...
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
