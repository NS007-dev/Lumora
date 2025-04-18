import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Daily Affirmations",
    description: "Boost confidence with personalized uplifting messages.",
  },
  {
    title: "Reflection Journal",
    description: "Track emotions, thoughts and personal growth privately.",
  },
  {
    title: "Mood Tracker",
    description: "Understand your emotions with visual patterns and notes.",
  },
  {
    title: "Screen Time Challenge",
    description: "Track phone usage and reduce time on toxic apps.",
  },
  {
    title: "Positive Content Feed",
    description: "See empowering stories, creators and mental health voices.",
  },
];

export default function Homepage() {
  return (
    <div className="homepage-container">
      <header className="hero">
        <h1>Welcome to Lumora</h1>
        <p>
          Empowering girls to build confidence, self-worth, and mental
          wellbeing.
        </p>
      </header>

      <section className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
