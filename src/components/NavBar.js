import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./NavBar.css";
import ThemeToggle from "./ThemeToggle";

function Navbar({ isDarkMode, toggleDarkMode, theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
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
        <Link to="/self-care-recipe" onClick={handleLinkClick}>
          Self-Care Recipe
        </Link>
        <Link to="/timer" onClick={handleLinkClick}>
          Timer
        </Link>
        <Link to="/profile" onClick={handleLinkClick}>
          Profile
        </Link>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Theme Dropdown */}
        <ThemeToggle theme={theme} setTheme={setTheme} />

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
