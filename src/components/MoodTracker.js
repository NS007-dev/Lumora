import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./MoodTracker.css";
import MoodCalendar from "./MoodCalendar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date for logging mood

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
    setSelectedMood(mood); // Store the selected mood
  };

  const handleCalendarDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleLogMood = () => {
    if (!selectedMood) {
      alert("Please select a mood first!");
      return;
    }

    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    if (lastLoggedDate === selectedDateStr) {
      alert("You've already logged your mood today!");
      return;
    }

    const newEntry = { date: selectedDateStr, mood: selectedMood.value };
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const isConsecutive = lastLoggedDate === yesterdayStr;

    setMoodLogs((prev) => [...prev, newEntry]);
    setCurrentStreak((prev) => (isConsecutive ? prev + 1 : 1));
    setLastLoggedDate(selectedDateStr);
    localStorage.setItem("lastLoggedDate", selectedDateStr);
  };

  const moodData = moodLogs.map((log) => ({
    date: log.date,
    mood: log.mood,
  }));

  const moodChartData = {
    labels: moodData.map((data) => data.date),
    datasets: [
      {
        label: "Mood Trend",
        data: moodData.map((data) =>
          data.mood === "happy" ? 1 : data.mood === "neutral" ? 0 : -1
        ),
        fill: false,
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        borderWidth: 2,
      },
    ],
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

      {selectedMood && (
        <div>
          <p>You have selected: {selectedMood.label}</p>
          <button onClick={handleLogMood}>Log Mood for Selected Date</button>
        </div>
      )}

      <div className="progress-bar-container">
        <strong>Current Streak: {currentStreak} Days</strong>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(currentStreak / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Mood Chart */}
      <div className="mood-chart-container">
        <Line data={moodChartData} />
      </div>

      {/* Calendar */}
      <MoodCalendar
        onDateSelect={handleCalendarDateSelect}
        moodLogs={moodLogs}
      />

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
