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
      <h2 className="journal-title">💖 Self-Reflection Journal 💖</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Dear Diary... ✨"
        className="journal-textarea"
      />
      <button className="save-button" onClick={handleSubmit}>
        {editingIndex !== null ? "Update Entry" : "Save Entry"}
      </button>

      <div className="entries-wrapper">
        {entries.length === 0 && (
          <p className="no-entries">No entries yet 🌸</p>
        )}
        <div className="entries-scroll">
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
    </div>
  );
};

export default Journal;
