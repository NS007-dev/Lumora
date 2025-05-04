import React, { useState } from "react";
import "./BoostWheel.css";

const compliments = [
  "You are amazing!",
  "Keep up the great work!",
  "You’re doing awesome!",
  "Believe in yourself!",
  "Stay strong, you're unstoppable!",
  "You are so talented!",
  "Keep going, you’re amazing!",
  "You’ve got this!",
  "Never stop believing!",
  "You’re a star!",
  "Shine bright like a diamond!",
  "You are enough!",
];

const BoostWheel = () => {
  const [spin, setSpin] = useState(false);
  const [result, setResult] = useState("");

  const spinWheel = () => {
    setSpin(true);
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setResult(compliments[randomIndex]);

    // Reset wheel rotation after spin animation completes
    setTimeout(() => {
      setSpin(false);
    }, 4000); // Spin duration
  };

  // Calculate angle step based on number of compliments
  const angleStep = 360 / compliments.length;

  return (
    <div className="boost-wheel-container">
      <h1>Boost Wheel</h1>
      <div className={`wheel ${spin ? "spin" : ""}`}>
        <div className="wheel-inner">
          {compliments.map((compliment, index) => {
            const angle = index * angleStep; // Distribute compliments evenly
            return (
              <div
                className="wheel-option"
                style={{
                  transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
                }}
                key={index}
              >
                <span>{compliment}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spin-btn" onClick={spinWheel}>
        Spin
      </button>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default BoostWheel;
