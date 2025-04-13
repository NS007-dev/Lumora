import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Homepage.css"; // Component-specific styling

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Affirmation App</h1>
      <p>
        Your journey to building confidence and mental wellness starts here.
      </p>
      <div className="button-container">
        {/* Link to Mood Tracker */}
        <Link to="/moodtracker">
          <button className="mood-tracker-button">Go to Mood Tracker</button>
        </Link>

        {/* Link to Screen Time Challenge */}
        <Link to="/screen-time">
          <button className="screen-time-button">
            Start Screen Time Challenge
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
