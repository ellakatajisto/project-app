function ToggleButton(props) {
  return (
    <button
      className={`toggle-option ${props.isGrid ? "active" : ""}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default ToggleButton;
