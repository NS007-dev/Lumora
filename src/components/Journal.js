import React, { useState, useEffect, useRef } from "react";
import "./Journal.css";
import Layout from "./Layout";

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    const text = inputRef.current.value;
    if (text) {
      const newEntry = { id: Date.now(), text };
      setEntries([newEntry, ...entries]);
      inputRef.current.value = "";
    }
  };

  return (
    <Layout>
      <div className="journal-container">
        <h2>Self-Reflection Journal</h2>
        <textarea ref={inputRef} placeholder="Write your thoughts..." />
        <button onClick={addEntry}>Add Entry</button>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.text}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Journal;
