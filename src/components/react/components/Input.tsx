import { Children } from "react";
import type { Netsystems } from "../../../env";
import style from "../_styles.module.css";

export const BaseInput = (props: Netsystems.Input) => {
  const {
    id,
    label = "",
    placeholder = "...",
    inputName,
    inputType = "text",
    inputInfo = "",
    defaultValue = "",
    inputRequiredMessage = "Campo requerido",
    isDisabled = false,
    isInvalid = false,
    showInputErros = true,
    errors,
    register,
    options = {},
  } = props;

  if (isDisabled)
    return (
      <>
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
        <input
          id={id}
          type={inputType}
          className={style.input}
          defaultValue={defaultValue}
          disabled
        />
      </>
    );

  return (
    <>
      {label !== "" && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={inputType}
        className={
          errors[inputName]?.type === "required" ||
          errors[inputName]?.message ||
          inputInfo ||
          isInvalid
            ? [style.input, style.input_invalid].join(" ")
            : style.input
        }
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={isDisabled}
        max={inputType === "date" ? new Date().toISOString().split("T")[0] : ""}
        {...register(inputName, options)}
      />

      {showInputErros && (
        <FormAlert
          message={
            inputInfo || errors[inputName]?.message || inputRequiredMessage
          }
          style={style.paymentSec__form__error}
          show={
            errors[inputName]?.type === "required" ||
            inputInfo !== "" ||
            errors[inputName]?.message
          }
        />
      )}
    </>
  );
};

export const SelectInput = (props: Netsystems.Input) => {
  const {
    id,
    label = "",
    inputName,
    defaultValue = "",
    isDisabled = false,
    isInvalid = false,
    source,
    register,
  } = props;

  return (
    <>
      {label !== "" && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}
      <select
        id={id}
        className={
          !isInvalid
            ? style.input
            : [style.input, style.input_invalid].join(" ")
        }
        style={{ width: "100%" }}
        {...register(inputName, { required: true })}
        disabled={isDisabled}
        defaultValue={defaultValue}
      >
        {source!.map((item, index) => (
          <option
            key={`${id}_${index}`}
            value={item.value}
          >{`${item.label}`}</option>
        ))}
      </select>
    </>
  );
};

export const FormAlert = (props: {
  message: string;
  style: string;
  show: boolean;
  children?: any;
}) => {
  const { message, style, show } = props;
  const { children } = props;

  if (!show) return <></>;

  return (
    <p role="alert" className={style}>
      {children}
      {message}
    </p>
  );
};
