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
    showInputErros = true,
    errors,
    register,
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
          errors[inputName]?.type === "required" || inputInfo
            ? [style.input, style.input_invalid].join(" ")
            : style.input
        }
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={isDisabled}
        {...register(inputName, { required: true })}
      />

      {showInputErros && (
        <FormAlert
          message={inputInfo || inputRequiredMessage}
          style={style.input_error}
          show={errors[inputName]?.type === "required" || inputInfo !== ""}
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
}) => {
  const { message, style, show } = props;

  if (!show) return <></>;

  return (
    <p role="alert" className={style}>
      {message}
    </p>
  );
};
