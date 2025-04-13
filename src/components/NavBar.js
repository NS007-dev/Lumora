import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.body.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.classList.toggle("dark", newMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          Lumora
        </Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/affirmations">Affirmations</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/moodtracker">Mood Tracker</Link>
        <Link to="/screen-time">Screen Time</Link>
        <Link to="/positive-feed">Positive Feed</Link>
      </div>

      <div className="nav-icons">
        <button
          onClick={toggleDarkMode}
          className="icon-btn"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button
          onClick={toggleMenu}
          className="icon-btn mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
