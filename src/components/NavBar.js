import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Home,
  Smile,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Lumora</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <Home size={20} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/affirmations" onClick={() => setMenuOpen(false)}>
            <Star size={20} /> Affirmations
          </NavLink>
        </li>
        <li>
          <NavLink to="/journal" onClick={() => setMenuOpen(false)}>
            <BookOpen size={20} /> Journal
          </NavLink>
        </li>
        <li>
          <NavLink to="/moodtracker" onClick={() => setMenuOpen(false)}>
            <Smile size={20} /> Mood Tracker
          </NavLink>
        </li>
        <li>
          <NavLink to="/screen-time" onClick={() => setMenuOpen(false)}>
            <Clock size={20} /> Screen Time
          </NavLink>
        </li>
        <li>
          <NavLink to="/positive-feed" onClick={() => setMenuOpen(false)}>
            <Star size={20} /> Positive Feed
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
            <User size={20} /> Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
