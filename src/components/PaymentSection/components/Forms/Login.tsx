//? react
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//? utils and components
import useNetsystemsService from "../../hooks/use-netsystems-services";
import PaymentWrapperContext from "../../PaymentWrapperContex";
import { BaseInput, FormAlert } from "../Input";
import { NextStep } from "../NextStep";

//? others
import type { Netsystems } from "../../../../env";
import style from "../../_styles.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "../Loading";

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
          <BaseInput
            id="login_username"
            label="Usuario"
            placeholder="ej: V12345678"
            inputName="username"
            inputInfo={usernameInfo}
            inputRequiredMessage="Usuario requerido"
            register={register}
            errors={errors}
          />

          <BaseInput
            id="login_password"
            label="Contraseña"
            placeholder="..."
            inputName="password"
            inputType="password"
            inputInfo={passwordInfo}
            register={register}
            errors={errors}
          />

          {sendingInfo ? (
            <FormAlert
              message={"Enviando..."}
              style={style.paymentSec__form__message}
              show={true}
            >
              <Loading />
            </FormAlert>
          ) : (
            errorInfo !== "" && (
              <FormAlert
                message={errorInfo}
                style={style.paymentSec__form__error}
                show={true}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 9v4" />
                  <path d="M12 16v.01" />
                </svg>
              </FormAlert>
            )
          )}
        </span>

        <span className={style.paymentSec__form__buttons}>
          <NextStep label="Iniciar sesion" handler={handleSubmit(onSubmit)} />
        </span>
      </form>
    </>
  );
};
