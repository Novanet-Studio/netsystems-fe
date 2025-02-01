import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaymentWrapperContext from "../../PaymentWrapperContex";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { banks } from "../../../../utils/banks";
import type { Netsystems } from "../../../../env";

import { NextStep } from "../NextStep";
import { PrevStep } from "../PrevStep";
import useNetsystemsService from "../../hooks/use-netsystems-services";

import { BaseInput, FormAlert, SelectInput } from "../Input";
import { Loading } from "../Loading";

export const PaymentReport = () => {
  const {
    getInvoiceDebts,
    getOTP,
    setBdTPayment,
    setPayment,
    getUsdVesConvertion,
    getFormatAmount,
  } = useNetsystemsService();

  const { nextStep, prevStep, setPaymentResult, getUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const [errorInfo, setErrorInfo] = useState("");
  const [formInfo, setFormInfo] = useState({
    phone: "",
    cedula: "",
    dynamicPass: "",
  });
  const [invalidForm, setInvalidForm] = useState(false);
  const [sendingInfo, setSendingInfo] = useState(false);
  const [requestOTP, setRequestOTP] = useState(false);
  const [debtAmountLabel, setDebtAmountLabel] = useState("");

  const schema = yup
    .object({
      phone: yup
        .string()
        .required()
        .test(
          "regex",
          "Formato de Telefono incorrecto",
          (item: any, _content: any) => {
            const rgx = /^(0412|0414|0424|0416|0426)\d{7}$/;

            return rgx.test(item);
          }
        ),
      literal: yup.string(),
      cedula: yup
        .string()
        .required()
        .test(
          "regex",
          "Formato de Cedula incorrecto",
          (item: any, _content: any) => {
            const rgx = watchFields.literal === "J" ? /^\d{9}$/ : /^\d{7,8}$/;

            return rgx.test(item);
          }
        ),
      bankIssue: yup.string().required(),
      payDate: yup.date(),
      debtAmount: yup.number().required(),
      debtAmountVES: yup.number().required(),
      convertionRate: yup.number().default(0),
      IDFactura: yup.number(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (!requestOTP && getValues("bankIssue") === "0163") {
      getRequestOTP(data);

      return;
    }

    if (invalidForm) return;

    setSendingInfo(true);

    const payload = {
      celular: data.phone,
      banco: data.bankIssue,
      cedula: `${data.literal}${data.cedula}`,
      monto: getFormatAmount(String(getValues("debtAmountVES")), false),
      token: data.dynamicPass,
      nombre: getUserData().datos[0].nombre,
    };

    try {
      const res = await setBdTPayment(payload);

      if (res.codres !== "C2P0000") {
        setSendingInfo(false);
        setErrorInfo("");

        switch (res.descRes) {
          case "CLIENTE DESTINO NO AFILIADO":
            setErrorInfo("Usuario no afiliado al servicio de pago");
            break;

          case "CLAVE DINAMICA ESTA VENCIDA":
            setErrorInfo("Error en la generacion de pago");

            setFormInfo({
              dynamicPass: "Clave dinamica invalida",
              phone: "",
              cedula: "",
            });

            break;

          case "TOKEN INVALIDA, INTENTE DE NUEVO":
            setErrorInfo("Error en la generacion de pago");

            setFormInfo({
              dynamicPass: "Clave dinamica invalida",
              phone: "",
              cedula: "",
            });
            break;

          case "TOKEN ESTA VENCIDO":
            setErrorInfo("Error en la generacion de pago");

            setFormInfo({
              dynamicPass: "Clave dinamica expirada",
              phone: "",
              cedula: "",
            });
            break;

          default:
            setErrorInfo("Error con el servicio de pago");
            break;
        }
      } else {
        const payment = {
          IDFactura: getValues("IDFactura")!,
          valor: getValues("debtAmount"),
          fecha: res.fecha.split("/").reverse().join("-"),
          secuencial: genSecuencial(),
        };

        try {
          const resPayment = await setPayment(payment);

          if (resPayment.code === "000") {
            setSendingInfo(false);

            setPaymentResult({
              status: "CONFIRMED_PAYMENT",
              message: "Pago registrado con exito",
            });

            nextStep();
          } else {
            setErrorInfo(
              "Su pago ha sido registrado, mas no procesado. Comuniquese con soporte para notificar su pago"
            );
          }
        } catch (error) {
          setSendingInfo(false);

          setErrorInfo(
            "Su pago ha sido registrado, mas no procesado. Comuniquese con soporte para notificar su pago"
          );
        }
      }
    } catch (error) {
      setErrorInfo("Error de comunicacion con el servicio de pago");

      setSendingInfo(false);
    }
  };

  const getRequestOTP = async (info: any) => {
    setSendingInfo(true);
    setErrorInfo("");

    try {
      const res = await getOTP({
        ci: `${info.literal}0${info.cedula}`,
      });

      console.log(`<<< BdT Otp >>>`, res);

      switch (res.codResp) {
        case "ERROR":
          setErrorInfo("Error de comunicacion con Servicio de pago");

          setSendingInfo(false);

          return;

        case "P2P0041":
          setErrorInfo("Cedula no asociada a un usuario");

          setFormInfo({
            dynamicPass: "",
            phone: "",
            cedula: "Ingreso invalido",
          });

          setSendingInfo(false);

          return;

        case "P2P0001":
          setErrorInfo("Servicio de pago C2P fuera de servicio");

          setSendingInfo(false);

          return;

        case "C2P0000":
          //> successfull case
          setRequestOTP(true);

          setSendingInfo(false);
          return;

        default:
          setErrorInfo("Error desconocido con Servicio de pago");

          setSendingInfo(false);
          break;
      }
    } catch (error) {
      setErrorInfo("Error al solicitar Clave Dinamica");

      setSendingInfo(false);
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
      setValue("IDFactura", Number(res.facturas[0].IDFactura));

      if (getValues("convertionRate")) setVesAmount();
    } catch (e) {
      setErrorInfo("No tienes facturas por pagar");
    }
  };

  const getVesUsd = async () => {
    try {
      const res: Netsystems.BcvUsdResponse = await getUsdVesConvertion();

      setValue("convertionRate", Number(res.rate));

      if (getValues("debtAmount")) setVesAmount();
    } catch (e) {
      setErrorInfo("Error obteniendo UsdVesConvertionRate");
    }
  };

  const setVesAmount = () => {
    setDebtAmountLabel(
      `Bs.S ${getFormatAmount(String(getValues("debtAmount") * getValues("convertionRate")), true)}`
    );

    setValue(
      "debtAmountVES",
      getValues("debtAmount") * getValues("convertionRate")
    );
  };

  const watchFields: any = watch();

  useEffect(() => {
    getDebts();
    getVesUsd();
  }, [null]);

  return (
    <>
      <form className="paymentSec__form">
        <span className="paymentSec__form__content paymentSec__form__content_twoColumns">
          {/* ? phone input | telefono */}
          <span className="input_wrapper">
            <BaseInput
              id="reportPayment_phone"
              label="Telefono"
              placeholder="ej: 04120000000"
              inputName="phone"
              inputInfo={formInfo.phone}
              inputRequiredMessage="Telefono requerido"
              register={register}
              errors={errors}
            />
          </span>

          {/* ? ci input | cedula */}
          <span className="input_wrapper">
            <label htmlFor="reportPayment_cedula" className="label">
              Cedula de identidad
            </label>
            <span
              className="input_wrapper_row"
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
                isInvalid={
                  errors.cedula?.type === "required" || formInfo.cedula !== ""
                }
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
                showInputErros={false}
                isInvalid={formInfo.cedula !== ""}
                register={register}
                errors={errors}
              />
            </span>

            <FormAlert
              message={formInfo.cedula || "Cedula requerida"}
              style="paymentSec__form__error"
              show={
                errors.cedula?.type === "required" || formInfo.cedula !== ""
              }
            />
          </span>

          {/* ? payDate input | Fecha de pago */}
          <span className="input_wrapper">
            <BaseInput
              id="reportPayment_payDate"
              label="Fecha del pago"
              placeholder="..."
              defaultValue={new Date().toISOString().substr(0, 10)}
              inputName="payDate"
              inputType="date"
              inputInfo={""}
              isDisabled={true}
              register={register}
              errors={errors}
            />
          </span>

          {/* ? bankIssue input | Banco emisor */}
          <span className="input_wrapper">
            <SelectInput
              id="reportPayment_backIssue"
              label="Banco emisor"
              inputName="bankIssue"
              source={banks.map((b: Netsystems.Bank) => ({
                label: b.name,
                value: b.code,
              }))}
              register={register}
            />
          </span>

          {/* ? debtAmount input | Monto a pagar  */}
          <span className="input_wrapper">
            <BaseInput
              id="reportPayment_debtAmount"
              label="Monto a pagar"
              inputName="reportPayment_debtAmount"
              defaultValue={debtAmountLabel}
              isDisabled={true}
            />
          </span>

          {/* ? dynamicPass state | Clave dinamica  */}
          {(requestOTP || watchFields.bankIssue !== "0163") && (
            <span className="input_wrapper">
              <BaseInput
                id="reportPayment_dynamicPass"
                label="Clave dinamica"
                placeholder="ej: 1234568"
                inputName="dynamicPass"
                inputInfo={formInfo.dynamicPass}
                register={register}
                errors={errors}
              />
            </span>
          )}
        </span>

        {sendingInfo ? (
          <FormAlert
            message={
              requestOTP || watchFields.bankIssue !== "0163"
                ? "Enviando..."
                : "Solicitando clave..."
            }
            style="paymentSec__form__message"
            show={true}
          >
            <Loading />
          </FormAlert>
        ) : (
          errorInfo !== "" && (
            <FormAlert
              message={errorInfo}
              style="paymentSec__form__error"
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

        {!sendingInfo && (
          <span className="paymentSec__form__buttons">
            <PrevStep label="Regresar" handler={() => prevStep()} />

            <NextStep
              label={
                requestOTP || watchFields.bankIssue !== "0163"
                  ? "Finalizar"
                  : "Solicitar clave"
              }
              handler={handleSubmit(onSubmit)}
            />
          </span>
        )}
      </form>
    </>
  );
};

function genSecuencial(): number {
  return Number(`${Date.now()}0`);
}
