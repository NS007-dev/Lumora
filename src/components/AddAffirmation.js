import React, { useState } from "react";

const AddAffirmation = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newPost = {
      text: text.trim(),
      date: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("affirmations")) || [];
    const updated = [...saved, newPost];
    localStorage.setItem("affirmations", JSON.stringify(updated));

    window.location.href = "/profile";
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add a New Affirmation</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          placeholder="Write something empowering..."
          style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
        />
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "linear-gradient(to right, #6a9bf6, #b679f8)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Save Affirmation
        </button>
      </form>
    </div>
  );
};

export default AddAffirmation;
