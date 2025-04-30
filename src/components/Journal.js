import React, { useState, useEffect } from "react";
import "./Journal.css";

const LOCAL_STORAGE_KEY = "journalEntries";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load saved entries from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      console.log("Loaded from localStorage:", saved);
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage:", entries); // Debugging log
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newEntry = {
      text,
      date: new Date().toLocaleString(),
    };

    console.log("Current Entries:", entries); // Debugging log

    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = newEntry;
      setEntries(updated);
      setEditingIndex(null);
    } else {
      setEntries([newEntry, ...entries]);
    }

    setText(""); // Clear the input field after submitting
  };

  const handleEdit = (index) => {
    setText(entries[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  return (
    <div className="journal-container">
      <h2>Self-Reflection Journal</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write about your thoughts..."
      />
      <button onClick={handleSubmit}>
        {editingIndex !== null ? "Update Entry" : "Save Entry"}
      </button>

      <div className="entries">
        {entries.length === 0 && <p className="no-entries">No entries yet</p>}
        {entries.map((entry, index) => (
          <div className="entry" key={index}>
            <p>{entry.text}</p>
            <p className="date">{entry.date}</p>
            <div className="actions">
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
