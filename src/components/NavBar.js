import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">🌙 Lumora</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/affirmations">Affirmations</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/moodtracker">Mood Tracker</Link>
        <Link to="/screen-time">Screen Time</Link>
        <Link to="/positive-feed">Positive Feed</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="theme-toggle">
        <button>🌞</button>
      </div>
    </nav>
  );
};

export default Navbar;
