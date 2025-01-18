export const PrevStep = (props: { label: string; handler: () => void }) => {
  const { label, handler } = props;

  function handlerButton(_event: any) {
    _event.preventDefault();

    handler();
  }

  return (
    <button className="button prevButton" onClick={(e) => handlerButton(e)}>
      <span className="button__icon">
        <i className="lnr lnr-arrow-left"></i>
      </span>
      {label}
    </button>
  );
};
