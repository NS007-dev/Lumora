import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Moon, Sun } from "lucide-react";

function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">🌙 Lumora</span>
      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/affirmations">Affirmations</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/mood">Mood Tracker</Link>
        <Link to="/screentime">Screen Time</Link>
        <Link to="/positive-feed">Positive Feed</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="navbar-right">
        <button
          className="theme-toggle-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
