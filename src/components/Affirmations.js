// src/components/Affirmation.js
import React, { useState, useEffect } from "react";
import quotesData from "../data/quotes.json";
import "./Affirmation.css";

const Affirmation = () => {
  const getRandomQuote = () =>
    quotesData[Math.floor(Math.random() * quotesData.length)].quote;

  const savedQuote = localStorage.getItem("lastQuote") || getRandomQuote();
  const [quote, setQuote] = useState(savedQuote);

  useEffect(() => {
    localStorage.setItem("lastQuote", quote);
  }, [quote]);

  const handleNewQuote = () => {
    let newQuote;
    do {
      newQuote = getRandomQuote();
    } while (newQuote === quote);
    setQuote(newQuote);
  };

  return (
    <div className="page-container">
      <div className="affirmation-container">
        <div className="affirmation-card">
          <p className="affirmation-text">{quote}</p>
          <button className="affirmation-button" onClick={handleNewQuote}>
            New Affirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Affirmation;
