import React, { useState, useEffect, useRef } from "react";
import "./PastelTimer.css";

function PastelTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // total seconds
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    const total = parseInt(minutes) * 60 + parseInt(seconds);
    if (total > 0) {
      setTimeLeft(total);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const displayMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const displaySeconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="pastel-timer">
      <h2>⏳ Custom Pastel Timer</h2>
      <p className="timer-description">
        Use this calming timer to take a self-care break, do a quick meditation,
        hydrate, or just breathe and reset. 💆‍♀️✨
      </p>

      {!isActive && (
        <div className="input-time">
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Min"
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="Sec"
          />
        </div>
      )}

      <div className="time-display">
        {displayMinutes}:{displaySeconds}
      </div>

      <div className="timer-buttons">
        {!isActive ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </div>
  );
}

export default PastelTimer;
