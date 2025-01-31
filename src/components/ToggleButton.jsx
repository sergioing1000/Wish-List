import { useState } from "react";
import "./ToggleButton.css"; // Import CSS file

const ToggleButton = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <button
      className={`toggle-button ${isOn ? "on" : "off"}`}
      onClick={toggleButton}
    >
      {isOn ? "FAMILY" : "PRIVATE"}
    </button>
  );
};

export default ToggleButton;
