import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyAlert.css";

const EmergencyAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    setIsVisible(false);
    navigate("/offline-emergency");
  };

  if (!isVisible) return null;

  return (
    <div className="emergency-alert">
      <span className="emergency-message">🚨 Emergency Mode Activated 🚨</span>
      <button className="emergency-btn" onClick={handleEmergencyClick}>
        Get Help
      </button>
    </div>
  );
};

export default EmergencyAlert;
