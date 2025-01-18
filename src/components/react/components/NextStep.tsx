export const NextStep = (props: { label: string; handler?: () => void }) => {
  const { label, handler } = props;

  function handlerButton(_event: any) {
    _event.preventDefault();

    if (handler) handler();
  }

  return (
    <button
      type="submit"
      className="button nextButton"
      onClick={(e) => handlerButton(e)}
    >
      {label}
      <span className="button__icon">
        <i className="lnr lnr-arrow-right"></i>
      </span>
    </button>
  );
};
