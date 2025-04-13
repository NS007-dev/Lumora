import React from "react";
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

const App = () => {
  return (
    <Router>
      <div className="App">
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
