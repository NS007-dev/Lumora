import React, { useState, useEffect } from "react";
import quotesData from "../data/quotes.json";
import "./Affirmation.css";

const Affirmation = () => {
  const [quote, setQuote] = useState("");
  const [customQuotes, setCustomQuotes] = useState([]);
  const [newCustomQuote, setNewCustomQuote] = useState("");

  const getAllQuotes = () => {
    const savedCustom = JSON.parse(localStorage.getItem("customQuotes")) || [];
    return [...quotesData.map((q) => q.quote), ...savedCustom];
  };

  const getRandomQuote = (allQuotes) =>
    allQuotes[Math.floor(Math.random() * allQuotes.length)];

  useEffect(() => {
    const savedQuote = localStorage.getItem("lastQuote");
    const savedCustom = JSON.parse(localStorage.getItem("customQuotes")) || [];

    setCustomQuotes(savedCustom);
    setQuote(savedQuote || getRandomQuote(getAllQuotes()));
  }, []);

  useEffect(() => {
    localStorage.setItem("lastQuote", quote);
  }, [quote]);

  const handleNewQuote = () => {
    const allQuotes = getAllQuotes();
    let newQuote;
    do {
      newQuote = getRandomQuote(allQuotes);
    } while (newQuote === quote && allQuotes.length > 1);
    setQuote(newQuote);
  };

  const handleAddCustomQuote = () => {
    if (!newCustomQuote.trim()) return;

    const updatedCustomQuotes = [...customQuotes, newCustomQuote.trim()];
    setCustomQuotes(updatedCustomQuotes);
    localStorage.setItem("customQuotes", JSON.stringify(updatedCustomQuotes));
    setNewCustomQuote("");
  };

  return (
    <div className="affirmation-container">
      <div className="affirmation-card">
        <p className="affirmation-text">{quote}</p>

        <button className="affirmation-button" onClick={handleNewQuote}>
          New Affirmation
        </button>
      </div>

      <div className="add-affirmation">
        <h3>Add Your Own Affirmation</h3>
        <input
          type="text"
          value={newCustomQuote}
          onChange={(e) => setNewCustomQuote(e.target.value)}
          placeholder="Write your affirmation..."
        />
        <button onClick={handleAddCustomQuote}>Add</button>
      </div>
    </div>
  );
};

export default Affirmation;
