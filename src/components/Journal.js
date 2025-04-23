// src/components/Journal.js
import React, { useState } from "react";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");

  const handleAddEntry = () => {
    if (input.trim()) {
      setEntries([input, ...entries]);
      setInput("");
    }
  };

  return (
    <div className="page-container">
      <div className="journal-container">
        <h1>Self-Reflection Journal</h1>
        <div className="journal-input">
          <textarea
            placeholder="Write your thoughts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>
        <ul className="journal-entries">
          {entries.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Journal;
