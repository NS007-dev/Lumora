// ThemeToggle.jsx ✅ Keep this one!
import React from "react";
import "./ThemeToggle.css";

const themes = ["default", "calm", "dreamy", "cheerful", "ocean"];

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <select
      className="theme-dropdown"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
}
