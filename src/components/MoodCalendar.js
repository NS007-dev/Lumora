import React, { useState } from "react";
import "./MoodCalendar.css";

const moodStyles = {
  happy: { color: "#ffcc00", emoji: "😊" },
  neutral: { color: "#9e9e9e", emoji: "😐" },
  sad: { color: "#2196f3", emoji: "😔" },
  angry: { color: "#f44336", emoji: "😠" },
  stressed: { color: "#ff5722", emoji: "😫" },
};

const MoodCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getMoodForDay = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    return moodLogs.find((entry) => entry.date === dateStr);
  };

  const handleDayClick = (day) => {
    const moodEntry = getMoodForDay(day);
    if (moodEntry) {
      setSelectedDay({
        date: new Date(year, month, day).toDateString(),
        mood: moodEntry.mood,
      });
    }
  };

  return (
    <div className="modern-calendar">
      <div className="calendar-header">
        {today.toLocaleString("default", { month: "long" })} {year}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateObj = new Date(year, month, day);
          const moodEntry = getMoodForDay(day);
          const isToday = dateObj.toDateString() === today.toDateString();

          const mood = moodEntry?.mood;
          const moodData = mood && moodStyles[mood];

          return (
            <div
              key={day}
              className={`calendar-day ${isToday ? "today" : ""}`}
              title={mood ? `${moodData.emoji} ${mood}` : ""}
              onClick={() => handleDayClick(day)}
              style={{
                backgroundColor: mood ? moodData.color : "#f0f0fa",
                color: mood ? "#fff" : "#6a4c9c",
                border: isToday ? "2px solid #000" : "none",
                cursor: mood ? "pointer" : "default",
              }}
            >
              <div className="day-number">
                {day}
                {mood && (
                  <span style={{ fontSize: "1rem" }}> {moodData.emoji}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mood Detail Modal */}
      {selectedDay && (
        <div className="mood-modal">
          <div className="mood-modal-content">
            <h3>Mood Details</h3>
            <p>
              <strong>Date:</strong> {selectedDay.date}
            </p>
            <p>
              <strong>Mood:</strong> {moodStyles[selectedDay.mood].emoji}{" "}
              {selectedDay.mood}
            </p>
            <button onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodCalendar;
