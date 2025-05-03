// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "../styles/Navbar.css";

const pastelThemes = {
  pink: {
    light: "pastel-pink",
    dark: "pastel-pink-dark",
  },
  blue: {
    light: "pastel-blue",
    dark: "pastel-blue-dark",
  },
  purple: {
    light: "pastel-purple",
    dark: "pastel-purple-dark",
  },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "pink"
  );
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  useEffect(() => {
    document.body.className = `${pastelThemes[themeColor][mode]}`;
    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("mode", mode);
  }, [themeColor, mode]);

  const handleThemeChange = (e) => {
    setThemeColor(e.target.value);
  };

  const toggleDarkMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleToggle = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`navbar ${mode === "dark" ? "dark" : ""}`}>
      <div className="navbar-left">
        <span className="logo">🌙 Lumora</span>
      </div>

      <div className={`navbar-center ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/affirmations" onClick={handleLinkClick}>
          Affirmations
        </Link>
        <Link to="/journal" onClick={handleLinkClick}>
          Journal
        </Link>
        <Link to="/moodtracker" onClick={handleLinkClick}>
          Mood Tracker
        </Link>
        <Link to="/screen-time" onClick={handleLinkClick}>
          Screen Time
        </Link>
        <Link to="/positive-feed" onClick={handleLinkClick}>
          Positive Feed
        </Link>
        <Link to="/profile" onClick={handleLinkClick}>
          Profile
        </Link>
      </div>

      <div className="navbar-right">
        <select
          value={themeColor}
          onChange={handleThemeChange}
          className="theme-dropdown-select"
        >
          <option value="pink">💗 Pink</option>
          <option value="blue">💙 Blue</option>
          <option value="purple">💜 Purple</option>
        </select>

        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={handleToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
