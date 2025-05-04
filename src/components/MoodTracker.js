import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodCalendar from "./MoodCalendar"; // New calendar component

const moods = [
  { label: "😊 Happy", value: "happy", color: "#ffcc00" },
  { label: "😐 Neutral", value: "neutral", color: "#9e9e9e" },
  { label: "😔 Sad", value: "sad", color: "#2196f3" },
  { label: "😠 Angry", value: "angry", color: "#f44336" },
  { label: "😫 Stressed", value: "stressed", color: "#ff5722" },
];

const MoodTracker = () => {
  const [moodLogs, setMoodLogs] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastLoggedDate, setLastLoggedDate] = useState(null);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const storedStreak = parseInt(localStorage.getItem("moodStreak")) || 0;
    const storedLastDate = localStorage.getItem("lastLoggedDate");

    setMoodLogs(storedLogs);
    setCurrentStreak(storedStreak);
    setLastLoggedDate(storedLastDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
    localStorage.setItem("moodStreak", currentStreak.toString());
    if (lastLoggedDate) {
      localStorage.setItem("lastLoggedDate", lastLoggedDate);
    }
  }, [moodLogs, currentStreak, lastLoggedDate]);

  const handleMoodClick = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    if (lastLoggedDate === today) {
      alert("You've already logged your mood today!");
      return;
    }

    const newEntry = { date: today, mood: mood.value };
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const isConsecutive = lastLoggedDate === yesterdayStr;

    setMoodLogs((prev) => [...prev, newEntry]);
    setCurrentStreak((prev) => (isConsecutive ? prev + 1 : 1));
    setLastLoggedDate(today);
  };

  return (
    <div className="mood-tracker-container">
      <h2>How are you feeling today?</h2>

      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodClick(mood)}
            style={{ backgroundColor: mood.color }}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <div className="progress-bar-container">
        <strong>Current Streak: {currentStreak} Days</strong>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(currentStreak / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Modern Calendar */}
      <MoodCalendar />

      <div className="streak-display">
        🔥 <strong>{currentStreak}</strong> Day Streak
      </div>

      <div className="mood-history">
        <h3>Previous Moods</h3>
        {moodLogs.length === 0 ? (
          <p>No moods logged yet.</p>
        ) : (
          <ul>
            {moodLogs
              .slice()
              .reverse()
              .map((entry, index) => (
                <li key={index}>
                  <span>{entry.date}</span> –{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {entry.mood}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
