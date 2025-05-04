import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const moods = ["default", "happy", "calm", "energetic", "sad"];

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="mood-select">
        <strong>Choose Mood Theme:</strong>
      </label>
      <select
        id="mood-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginLeft: "1rem",
        }}
      >
        {moods.map((m) => (
          <option key={m} value={m}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
