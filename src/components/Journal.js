import React, { useState, useEffect } from "react";
import "./Journal.css";

const LOCAL_STORAGE_KEY = "journalEntries";
const THEME_KEY = "journalTheme";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [theme, setTheme] = useState("pink");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setEntries(JSON.parse(saved));
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
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

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  return (
    <div className={`journal-container ${theme}`}>
      <h2 className="journal-title">💖 Self-Reflection Journal 💖</h2>

      <div className="theme-selector">
        <label htmlFor="theme">🎨 Theme:</label>
        <select id="theme" value={theme} onChange={handleThemeChange}>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="mint">Mint</option>
          <option value="peach">Peach</option>
        </select>
      </div>

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
