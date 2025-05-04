import React, { useState, useEffect } from "react";
import "./OfflineEmergencyMode.css";

const affirmations = [
  "You are strong and capable.",
  "Everything will be okay.",
  "You are enough just as you are.",
  "You have the power to overcome this.",
  "Breathe deeply, and find your calm."
];

const breathingInstructions = [
  "Inhale for 4 counts",
  "Hold for 4 counts",
  "Exhale for 4 counts"
];

const journalPrompts = [
  "What are you grateful for today?",
  "How do you feel right now?",
  "Write down three things that make you happy."
];

const OfflineEmergencyMode = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingStage, setBreathingStage] = useState(0); // 0: inhale, 1: hold, 2: exhale
  const [journalPrompt, setJournalPrompt] = useState("");

  useEffect(() => {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(randomAffirmation);
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setJournalPrompt(randomPrompt);
  }, []);

  const startBreathingExercise = () => {
    setIsBreathing(true);
    let stage = 0;
    const breathingCycle = setInterval(() => {
      setBreathingStage(stage);
      stage = (stage + 1) % 3;
    }, 4000);

    setTimeout(() => {
      clearInterval(breathingCycle);
      setIsBreathing(false);
    }, 12000); // 12 seconds for a full cycle
  };

  return (
    <div className="offline-emergency-mode">
      <h1>Offline Emergency Mode</h1>
      <div className="affirmation">
        <p>{currentAffirmation}</p>
      </div>

      <div className="breathing-exercise">
        <h2>Breathing Exercise</h2>
        {isBreathing ? (
          <div className="breathing-stage">
            <p>{breathingInstructions[breathingStage]}</p>
          </div>
        ) : (
          <button onClick={startBreathingExercise}>Start Breathing Exercise</button>
        )}
      </div>

      <div className="journal">
        <h2>Journal Prompt</h2>
        <p>{journalPrompt}</p>
      </div>
    </div>
  );
};

export default OfflineEmergencyMode;
