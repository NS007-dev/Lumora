import React, { useState, useEffect, useRef } from "react";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    // Get entries from localStorage
    const savedEntries = localStorage.getItem("journalEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [newEntry, setNewEntry] = useState("");
  const entriesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new entries are added
    if (entriesContainerRef.current) {
      entriesContainerRef.current.scrollTop =
        entriesContainerRef.current.scrollHeight;
    }
  }, [entries]); // Run this effect when entries change

  const handleSaveEntry = () => {
    if (newEntry.trim() === "") return; // Don't save empty entries

    const entryDate = new Date().toLocaleString();
    const entry = { text: newEntry, date: entryDate };
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setNewEntry(""); // Clear the input field after saving
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  useEffect(() => {
    // Scroll to the top on page load or when entries are deleted
    if (entries.length === 0 && entriesContainerRef.current) {
      entriesContainerRef.current.scrollTop = 0;
    }
  }, [entries.length]); // This will trigger when entries change length

  return (
    <div className="journal">
      <h1>My Journal</h1>
      <textarea
        className="journal-textarea"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write something..."
      />
      <button className="save-entry-btn" onClick={handleSaveEntry}>
        Save Entry
      </button>

      <div ref={entriesContainerRef} className="entries-container">
        {entries.length === 0 ? (
          <p>No entries yet. Start by writing your first entry!</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="entry-card">
              <p className="entry-text">{entry.text}</p>
              <p className="entry-date">{entry.date}</p>
              <button
                className="delete-entry-btn"
                onClick={() => handleDeleteEntry(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
