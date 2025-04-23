// src/components/MoodTracker.js
import React, { useState } from "react";
import "./MoodTracker.css";

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = () => {
    if (mood.trim()) {
      setEntries([{ mood, date: new Date().toLocaleDateString() }, ...entries]);
      setMood("");
    }
  };

  return (
    <div className="page-container">
      <div className="mood-container">
        <h1>Track Your Mood</h1>
        <div className="mood-input">
          <input
            type="text"
            placeholder="How are you feeling today?"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <button onClick={handleSubmit}>Add Mood</button>
        </div>
        <ul className="mood-history">
          {entries.map((entry, i) => (
            <li key={i}>
              <strong>{entry.date}</strong>: {entry.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodTracker;
