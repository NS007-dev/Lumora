import React, { useState, useEffect } from "react";
import "./ScreenTimeChallenge.css";

const ScreenTimeChallenge = () => {
  const [screenTimeLogs, setScreenTimeLogs] = useState([]);
  const [inputTime, setInputTime] = useState("");
  const [goalTime, setGoalTime] = useState("");

  useEffect(() => {
    const storedLogs = localStorage.getItem("screenTimeLogs");
    if (storedLogs) {
      setScreenTimeLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("screenTimeLogs", JSON.stringify(screenTimeLogs));
  }, [screenTimeLogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTime || !goalTime) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      timeSpent: parseFloat(inputTime),
      goal: parseFloat(goalTime),
    };

    setScreenTimeLogs([newLog, ...screenTimeLogs]);
    setInputTime("");
    setGoalTime("");
  };

  const successCount = screenTimeLogs.filter(
    (log) => log.timeSpent <= log.goal
  ).length;

  return (
    <div className="screen-time-container">
      <h1>📵 Screen Time Challenge</h1>
      <form onSubmit={handleSubmit} className="screen-time-form">
        <input
          type="number"
          placeholder="Hours spent on screen today"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          min="0"
          step="0.1"
        />
        <input
          type="number"
          placeholder="Daily screen time goal (hours)"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
          min="0"
          step="0.1"
        />
        <button type="submit">Add Entry</button>
      </form>

      <div className="log-summary">
        <h3>
          ✅ Goal Achieved: {successCount} day
          {successCount !== 1 ? "s" : ""}
        </h3>
        <ul className="log-list">
          {screenTimeLogs.map((log) => (
            <li
              key={log.id}
              className={log.timeSpent <= log.goal ? "success" : "fail"}
            >
              <strong>{log.date}</strong> — You spent {log.timeSpent}h (Goal:{" "}
              {log.goal}h)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScreenTimeChallenge;
