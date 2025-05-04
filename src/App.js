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
import AddAffirmation from "./components/AddAffirmation";
import ConfidenceGarden from "./components/ConfidenceGarden";
import OfflineEmergencyMode from "./components/OfflineEmergencyMode"; // Add the EmergencyMode component

// 🪄 Import ThemeProvider and theme styles
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/themes.css"; // Mood-based themes
import "./App.css";

function App() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Mood-based theme state
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("moodTheme") || "default";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("moodTheme", theme);
  }, [theme]);

  // Dark mode effects
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider>
      <Router>
        <Layout
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          theme={theme}
          setTheme={setTheme}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/affirmations" element={<Affirmation />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/moodtracker" element={<MoodTracker />} />
            <Route path="/screen-time" element={<ScreenTimeChallenge />} />
            <Route path="/positive-feed" element={<PositiveContentFeed />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-affirmation" element={<AddAffirmation />} />
            <Route path="/garden" element={<ConfidenceGarden />} />
            <Route path="/emergency" element={<OfflineEmergencyMode />} />{" "}
            {/* Add Emergency Mode route */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
