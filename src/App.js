import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import Affirmation from "./components/Affirmations";
import Journal from "./components/Journal";
import MoodTracker from "./components/MoodTracker";
import ScreenTimeChallenge from "./components/ScreenTimeChallenge";
import PositiveContentFeed from "./components/PositiveContentFeed";
import UserProfile from "./components/UserProfile";
import Layout from "./components/Layout";
import "./styles/theme.css";
import AddAffirmation from "./components/AddAffirmation";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/affirmations" element={<Affirmation />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/moodtracker" element={<MoodTracker />} />
          <Route path="/screen-time" element={<ScreenTimeChallenge />} />
          <Route path="/positive-feed" element={<PositiveContentFeed />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-affirmation" element={<AddAffirmation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
