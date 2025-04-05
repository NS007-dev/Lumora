import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css"; // Add CSS for the homepage

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Affirmation App</h1>
      <p>
        Your journey to building confidence and mental wellness starts here.
      </p>
      <Link to="/moodtracker">
        <button className="navigate-button">Go to Mood Tracker</button>
      </Link>
    </div>
  );
};

export default HomePage;
