import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Affirmation from "./components/Affirmations";
import Journal from "./components/Journal";
import MoodTracker from "./components/MoodTracker"; // Import MoodTracker component
import Navigation from "./components/NavBar";
import ParticlesBackground from "./components/ParticlesBackground"; // Floating particles effect
import "./styles/theme.css"; // Import the theme styling

const App = () => {
  return (
    <Router>
      <div className="App">
        <ParticlesBackground /> {/* Floating particles effect */}
        <Navigation /> {/* Navigation Menu */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/affirmations" element={<Affirmation />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/moodtracker" element={<MoodTracker />} />{" "}
          {/* Mood Tracker Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
