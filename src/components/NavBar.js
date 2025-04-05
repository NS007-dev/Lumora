// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./NavBar.css"; // Import the NavBar CSS

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/affirmations" className="nav-link">
            Affirmations
          </Link>
        </li>
        <li>
          <Link to="/journal" className="nav-link">
            Journal
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
