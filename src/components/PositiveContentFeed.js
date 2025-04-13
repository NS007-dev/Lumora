import React from "react";
import "./PositiveContentFeed.css"; // Importing the CSS file for styling

const contentFeed = [
  {
    title: "Empowering Women in Tech",
    description:
      "An article about the impact of women in the tech industry and how to get involved.",
    link: "https://www.example.com/article1",
  },
  {
    title: "Mental Health Awareness",
    description:
      "A video by mental health experts about managing stress and anxiety.",
    link: "https://www.example.com/video1",
  },
  {
    title: "Leadership Tips for Women",
    description:
      "An inspiring talk by a female CEO on leadership and personal growth.",
    link: "https://www.example.com/talk1",
  },
  {
    title: "Self-Care Practices",
    description:
      "An article about self-care techniques to maintain mental wellness.",
    link: "https://www.example.com/article2",
  },
];

const PositiveContentFeed = () => {
  return (
    <div className="content-feed-container">
      <h2>Positive Content Feed</h2>
      <div className="content-items">
        {contentFeed.map((content, index) => (
          <div className="content-item" key={index}>
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <a href={content.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositiveContentFeed;
