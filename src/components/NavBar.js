import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Moon, Sun, Menu, X } from "lucide-react";

function Navbar({ isDarkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // close the menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">🌙 Lumora</span>
      </div>

      <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/affirmations" onClick={handleLinkClick}>
          Affirmations
        </Link>
        <Link to="/journal" onClick={handleLinkClick}>
          Journal
        </Link>
        <Link to="/mood" onClick={handleLinkClick}>
          Mood Tracker
        </Link>
        <Link to="/screentime" onClick={handleLinkClick}>
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
        <button
          className="theme-toggle-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
