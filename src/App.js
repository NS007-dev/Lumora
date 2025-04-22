import React from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Affirmation from "./components/Affirmations";
import Journal from "./components/Journal";
import MoodTracker from "./components/MoodTracker";
import ScreenTimeChallenge from "./components/ScreenTimeChallenge";
import PositiveContentFeed from "./components/PositiveContentFeed";
import UserProfile from "./components/UserProfile";
import Navigation from "./components/NavBar";
import ParticlesBackground from "./components/ParticlesBackground";
import "./styles/theme.css";
import Layout from "./components/Layout";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  useEffect(() => {
    // Optional: load saved dark mode from localStorage
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
    if (savedTheme) document.body.classList.add("dark-mode");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);
  return (
    <Router>
      <div className="App">
        <Layout
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        ></Layout>
        <ParticlesBackground />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/affirmations" element={<Affirmation />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/moodtracker" element={<MoodTracker />} />
          <Route path="/screen-time" element={<ScreenTimeChallenge />} />
          <Route path="/positive-feed" element={<PositiveContentFeed />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
