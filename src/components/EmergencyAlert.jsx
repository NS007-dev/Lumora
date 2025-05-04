import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyAlert.css"; // Make sure you have this CSS file

const EmergencyAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    setIsVisible(false); // Hide the alert bubble
    navigate("/offline-emergency"); // Navigate to the emergency mode page
  };

  if (!isVisible) return null; // Hide the bubble if it's not visible

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
