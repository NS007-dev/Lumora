import React, { useState } from "react";
import "./SelfCareRecipe.css";

const activities = [
  "Drink a glass of water 💧",
  "Take 3 deep breaths 🌬️",
  "Write something kind to yourself 💌",
  "Do a 5-min stretch 🧘‍♀️",
  "Listen to a calming song 🎧",
  "Step outside for fresh air 🍃",
  "Doodle or draw something 🖊️",
  "Clean your space a little 🧹",
  "Put on your favorite cozy outfit 🧦",
  "Say one thing you're grateful for 🌈",
];

function getRandomRecipe() {
  const shuffled = [...activities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function SelfCareRecipe() {
  const [recipe, setRecipe] = useState([]);

  const generateRecipe = () => {
    const newRecipe = getRandomRecipe();
    setRecipe(newRecipe);
  };

  return (
    <div className="selfcare-notebook">
      <h1>📔 Self-Care Recipe Generator</h1>
      <p className="subtitle">
        Create a tiny care routine to boost your vibe ✨
      </p>
      <button onClick={generateRecipe} className="recipe-btn">
        Generate Recipe 🍵
      </button>

      {recipe.length > 0 && (
        <div className="recipe-list">
          <h2>🌸 Your Recipe:</h2>
          <ul>
            {recipe.map((item, index) => (
              <li key={index} className="recipe-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelfCareRecipe;
