import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import Layout from "./Layout";

const moods = [
  { label: "Happy", color: "#FFD700" },
  { label: "Sad", color: "#1E90FF" },
  { label: "Anxious", color: "#FF6347" },
  { label: "Calm", color: "#98FB98" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodHistory([
      { mood, date: new Date().toLocaleDateString() },
      ...moodHistory,
    ]);
  };

  return (
    <Layout>
      <div className="mood-tracker-container">
        <h2>Mood Tracker</h2>
        <div className="mood-options">
          {moods.map(({ label, color }) => (
            <button
              key={label}
              style={{ backgroundColor: color }}
              onClick={() => handleMoodSelect(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mood-history">
          <h3>Mood History</h3>
          <ul>
            {moodHistory.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.mood}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;
