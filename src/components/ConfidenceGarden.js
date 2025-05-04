import React from "react";
import "./ConfidenceGarden.css"; // Add styles for the garden page

export default function ConfidenceGarden() {
  return (
    <div className="garden-container">
      <h1>Welcome to Your Confidence Garden</h1>
      <p>Your Confidence Tree will grow here as you make progress!</p>
      {/* Place your tree component here */}
      <div className="tree"></div> {/* This is just an example */}
    </div>
  );
}
