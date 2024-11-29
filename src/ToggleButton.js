function ToggleButton(props) {
  return (
    <button
      className={`toggle-option ${props.isGrid ? "active" : ""}`}
      onClick={props.onClick}
      role="switch" // Aria: Indicates this button is a toggle switch
      aria-checked={props.isGrid} // Aria: Tells screen readers if the switch is "on" or "off"
      tabIndex="0" // Tab key is used to switch between focusable elements
      onKeyDown={(e) => props.handleKeyDown(e, props.isGrid)} // When enter or space is pressed, the button is being pressed happens
    >
      {props.label}
    </button>
  );
}

export default ToggleButton;
