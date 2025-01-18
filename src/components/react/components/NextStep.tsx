import style from "../_styles.module.css";

export const NextStep = (props: { label: string; handler?: () => void }) => {
  const { label, handler } = props;

  function handlerButton(_event: any) {
    _event.preventDefault();

    if (handler) handler();
  }

  return (
    <button
      type="submit"
      className={[style.button, style.nextButton].join(" ")}
      onClick={(e) => handlerButton(e)}
    >
      {label}
      <span className={style.button__icon}>
        <i className="lnr lnr-arrow-right"></i>
      </span>
    </button>
  );
};
