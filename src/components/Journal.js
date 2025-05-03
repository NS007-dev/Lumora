import React, { useState, useEffect } from "react";
import "./Journal.css";

const LOCAL_STORAGE_KEY = "journalEntries";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newEntry = {
      text,
      date: new Date().toLocaleString(),
    };

    let updatedEntries;
    if (editingIndex !== null) {
      updatedEntries = [...entries];
      updatedEntries[editingIndex] = newEntry;
      setEditingIndex(null);
    } else {
      updatedEntries = [newEntry, ...entries];
    }

    setEntries(updatedEntries);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
    setText("");
  };

  const handleEdit = (index) => {
    setText(entries[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="journal-container">
      <h2 className="journal-title">My Journal</h2>
      <textarea
        className="journal-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind today?"
      />
      <button className="journal-button" onClick={handleSubmit}>
        {editingIndex !== null ? "Update Entry" : "Save Entry"}
      </button>

      <div className="entries">
        {entries.length === 0 && <p className="no-entries">No entries yet</p>}
        {entries.map((entry, index) => (
          <div className="entry-card" key={index}>
            <p className="entry-text">{entry.text}</p>
            <p className="entry-date">{entry.date}</p>
            <div className="entry-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
