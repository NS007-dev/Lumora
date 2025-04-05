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
  const [note, setNote] = useState(""); // State to hold the note

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleMoodSelection = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    if (entries.some((entry) => entry.date === today)) return; // Prevent multiple logs per day

    const newEntry = { date: today, mood, note }; // Include the note with the entry
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));
    setNote(""); // Reset note after saving
  };

  const getStreak = () => {
    let streak = 0;
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const today = new Date().toISOString().split("T")[0];

    for (let i = 0; i < sortedEntries.length; i++) {
      if (i === 0 && sortedEntries[i].date === today) streak++;
      else {
        const prevDate = new Date(sortedEntries[i - 1].date);
        prevDate.setDate(prevDate.getDate() - 1);
        if (sortedEntries[i].date === prevDate.toISOString().split("T")[0])
          streak++;
        else break;
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
            onClick={() => {
              setSelectedMood(mood.label); // Set the selected mood
            }}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* Show the input for note if a mood is selected */}
      {selectedMood && (
        <div className="note-section">
          <h3>Why do you feel this way?</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts..."
          />
          <button
            className="save-note-button"
            onClick={() => handleMoodSelection(selectedMood)}
          >
            Save Mood & Note
          </button>
        </div>
      )}

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
            <p>{entry.note}</p> {/* Display the note */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
