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
import { Loading } from "../Loading";

export const PaymentReport = () => {
  const { getInvoiceDebts, getOTP, setBdTPayment, setPayment } =
    useNetsystemsService();
  const { getBcvUsd, getFormatAmount } = useUsdConvertion();

  const { nextStep, prevStep, setPaymentResult, getUserData } = useContext(
    PaymentWrapperContext
  ) as Netsystems.PayContextType;

  const [errorInfo, setErrorInfo] = useState("");
  const [formInfo, setFormInfo] = useState({
    phone: "",
    cedula: "",
    dynamicPass: "",
  });
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (!requestOTP) {
      getRequestOTP(data);

      return;
    }

    setSendingInfo(true);

    const payload = {
      celular: data.phone,
      banco: data.bankIssue,
      cedula: `${data.literal}${data.cedula}`,
      monto: getFormatAmount(String(getValues("debtAmount")), false),
      token: data.dynamicPass,
      nombre: getUserData().datos[0].nombre,
    };

    const res = await setBdTPayment(payload);

    setSendingInfo(false);

    if (res.codres !== "C2P0000") {
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

        default:
          setErrorInfo("Error desconocido con servicio de pago");
          break;
      }
    } else {
      const payment = {
        IDFactura: getValues("IDFactura")!,
        valor: getValues("debtAmount"),
        fecha: res.fecha.split("/").reverse().join("-"),
        secuencial: genSecuencial(),
      };

      const resPayment = await setPayment(payment);

      console.log(`<<< resPayment >>>`, resPayment);

      if (resPayment.code === "000") {
        setPaymentResult({
          status: "CONFIRMED_PAYMENT",
          message: "Pago registrado con exito",
        });

        nextStep();
      }
    }
  };

  const getRequestOTP = async (info: any) => {
    setSendingInfo(true);
    setErrorInfo("");

    const res = await getOTP({
      ci: `${info.literal}0${info.cedula}`,
    });

    if (res.codResp === "ERROR") {
      setErrorInfo("Error de comunicacion con Servicio de pago");

      setSendingInfo(false);

      return;
    }

    if (res.codResp === "P2P0041") {
      setErrorInfo("Cedula no asociada a un usuario");

      setFormInfo({
        dynamicPass: "",
        phone: "",
        cedula: "Ingreso invalido",
      });

      setSendingInfo(false);

      return;
    }

    if (res.codResp === "C2P0000") {
      setRequestOTP(true);

      setSendingInfo(false);

      console.log(`<<< res >>>`, res);
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
      console.log(`<<< e >>>`, e);
    }
  };

  const getVesUsd = async () => {
    try {
      const res: Netsystems.BcvUsdResponse = await getBcvUsd();

      setValue("convertionRate", Number(res.sources.BCV.quote));

      if (getValues("debtAmount")) setVesAmount();
    } catch (e) {
      setErrorInfo("Error de comunicacion con exchangedyn");
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
              inputInfo={formInfo.phone}
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
              style={style.paymentSec__form__error}
              show={
                errors.cedula?.type === "required" || formInfo.cedula !== ""
              }
            />
          </span>

          {/* ? payDate input | Fecha de pago */}
          <span className={style.input_wrapper}>
            <BaseInput
              id="reportPayment_payDate"
              label="Fecha del pago"
              placeholder="..."
              defaultValue={new Date().toISOString().substr(0, 10)}
              inputName="payDate"
              inputType="date"
              inputInfo={""}
              isDisabled={false}
              register={register}
              errors={errors}
            />
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

          {/* ? dynamicPass state | Clave dinamica  */}
          {requestOTP && (
            <span className={style.input_wrapper}>
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
            message={requestOTP ? "Enviando..." : "Solicitando clave..."}
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

function genSecuencial(): number {
  return Number(`${Date.now()}0`);
}
