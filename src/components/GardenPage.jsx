import React, { useState, useEffect } from "react";
import ConfidenceTree from "./ConfidenceTree";
import "./GardenPage.css"; 

const GardenPage = () => {
  const [userProgress, setUserProgress] = useState(50);

  return (
    <div className="garden-page">
      <h1 className="garden-title">Your Confidence Garden 🌳</h1>
      <div className="garden-container">
        <ConfidenceTree progress={userProgress} />
      </div>
      <div className="garden-message">
        <p>Keep growing your confidence and see your tree bloom!</p>
      </div>
    </div>
  );
};

export default GardenPage;
