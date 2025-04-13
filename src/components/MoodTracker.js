import React, { useState, useEffect } from "react";
import "./MoodTracker.css";

const moods = [
  { label: "Happy", color: "#FFD700" },
  { label: "Sad", color: "#4682B4" },
  { label: "Neutral", color: "#808080" },
  { label: "Anxious", color: "#FF4500" },
  { label: "Excited", color: "#32CD32" },
];

const MoodTracker = () => {
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState(""); // Track the note for the mood

  // Load saved entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
    setEntries(savedEntries);
  }, []);

  // Handle selecting a mood
  const handleMoodSelection = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    if (entries.some((entry) => entry.date === today)) return; // Prevent multiple logs per day

    const newEntry = { date: today, mood, note };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));

    setNote(""); // Clear the note after saving
  };

  // Get the current streak of consecutive days
  const getStreak = () => {
    if (entries.length === 0) return 0;

    let streak = 1;
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const today = new Date().toISOString().split("T")[0];

    if (sortedEntries[0].date !== today) streak = 0;

    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(sortedEntries[i - 1].date);
      const currentDate = new Date(sortedEntries[i].date);

      prevDate.setDate(prevDate.getDate() - 1);

      const prevStr = prevDate.toISOString().split("T")[0];
      const currStr = currentDate.toISOString().split("T")[0];

      if (currStr === prevStr) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <div className="mood-tracker-container">
      <h2>Mood Tracker</h2>
      <p>Current Streak: {getStreak()} days</p>

      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className="mood-button"
            style={{ backgroundColor: mood.color }}
            onClick={() => handleMoodSelection(mood.label)}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <div className="note-section">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (Optional)"
        />
      </div>

      <div className="streak-display">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="streak-box"
            style={{
              backgroundColor: moods.find((m) => m.label === entry.mood).color,
            }}
          >
            <p>{entry.mood}</p>
            <p>{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
