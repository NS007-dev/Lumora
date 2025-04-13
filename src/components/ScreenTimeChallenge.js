import React, { useState, useEffect } from "react";
import "./ScreenTimeChallenge.css";

const ScreenTimeChallenge = () => {
  const [screenTimeLogs, setScreenTimeLogs] = useState([]);
  const [challengeTime, setChallengeTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [app, setApp] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  useEffect(() => {
    // Retrieve previous screen time logs from localStorage
    const savedLogs = JSON.parse(localStorage.getItem("screenTimeLogs")) || [];
    setScreenTimeLogs(savedLogs);
  }, []);

  const handleLogTime = () => {
    const newLog = { app, timeSpent: parseFloat(timeSpent) };
    const updatedLogs = [...screenTimeLogs, newLog];
    setScreenTimeLogs(updatedLogs);
    localStorage.setItem("screenTimeLogs", JSON.stringify(updatedLogs));
    setApp("");
    setTimeSpent("");
  };

  const handleSetChallenge = () => {
    setChallengeTime(parseFloat(currentTime));
  };

  const getChallengeProgress = () => {
    const totalTimeSpent = screenTimeLogs.reduce(
      (total, log) => total + log.timeSpent,
      0
    );
    return Math.min(totalTimeSpent, challengeTime);
  };

  return (
    <div className="screen-time-challenge">
      <h2>Screen Time Challenge</h2>
      <div className="set-challenge">
        <label>Set Your Daily Challenge (in hours):</label>
        <input
          type="number"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
          placeholder="e.g., 2 hours"
        />
        <button onClick={handleSetChallenge}>Set Challenge</button>
      </div>
      <div className="log-time">
        <label>Log Time for an App:</label>
        <input
          type="text"
          value={app}
          onChange={(e) => setApp(e.target.value)}
          placeholder="App name"
        />
        <input
          type="number"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="Time spent (in hours)"
        />
        <button onClick={handleLogTime}>Log Time</button>
      </div>
      <div className="progress">
        <h3>Challenge Progress</h3>
        <p>Challenge: {challengeTime} hours</p>
        <p>Time Logged: {getChallengeProgress()} hours</p>
        <p>
          Remaining: {Math.max(0, challengeTime - getChallengeProgress())} hours
        </p>
      </div>
      <div className="screen-time-log">
        <h3>Logged Screen Time</h3>
        <ul>
          {screenTimeLogs.map((log, index) => (
            <li key={index}>
              {log.app}: {log.timeSpent} hours
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScreenTimeChallenge;
