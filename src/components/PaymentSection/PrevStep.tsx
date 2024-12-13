import style from "./_styles.module.css";

export const PrevStep = (props: { label: string; handler: () => void }) => {
  const { label, handler } = props;

  function handlerButton(_event: any) {
    _event.preventDefault();

    handler();
  }

  return (
    <button
      className={[style.button, style.prevButton].join(" ")}
      onClick={(e) => handlerButton(e)}
    >
      <span className={style.button__icon}>
        <i className="lnr lnr-arrow-left"></i>
      </span>
      {label}
    </button>
  );
};
