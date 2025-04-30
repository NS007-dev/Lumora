import React, { useState, useEffect } from "react";
import "./Affirmation.css";

const Affirmations = () => {
  const [affirmations, setAffirmations] = useState([]);
  const [newAffirmation, setNewAffirmation] = useState("");

  useEffect(() => {
    const savedAffirmations =
      JSON.parse(localStorage.getItem("affirmations")) || [];
    setAffirmations(savedAffirmations);
  }, []);

  useEffect(() => {
    localStorage.setItem("affirmations", JSON.stringify(affirmations));
  }, [affirmations]);

  const addAffirmation = () => {
    if (newAffirmation.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      text: newAffirmation.trim(),
      date: new Date().toISOString(),
    };
    setAffirmations([newEntry, ...affirmations]);
    setNewAffirmation("");
  };

  const deleteAffirmation = (id) => {
    setAffirmations(affirmations.filter((a) => a.id !== id));
  };

  const editAffirmation = (id) => {
    const updatedText = prompt("Edit your affirmation:");
    if (!updatedText) return;
    const updatedAffirmations = affirmations.map((a) =>
      a.id === id ? { ...a, text: updatedText } : a
    );
    setAffirmations(updatedAffirmations);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="affirmations-container">
      <h2>Your Affirmations</h2>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Write a new affirmation..."
          value={newAffirmation}
          onChange={(e) => setNewAffirmation(e.target.value)}
        />
        <button onClick={addAffirmation}>Add</button>
      </div>

      <ul className="affirmation-list">
        {affirmations.map((a) => (
          <li key={a.id} className="affirmation-item">
            <div className="affirmation-text">{a.text}</div>
            <div className="affirmation-meta">{formatDate(a.date)}</div>
            <div className="affirmation-actions">
              <button onClick={() => editAffirmation(a.id)}>Edit</button>
              <button onClick={() => deleteAffirmation(a.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Affirmations;
