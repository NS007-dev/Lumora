import React from "react";
import "./PositiveContentFeed.css";
import Layout from "./Layout";

const contentFeed = [
  {
    title: "How to Build Confidence",
    source: "YouTube - Psych2Go",
    link: "https://www.youtube.com/watch?v=somevideo",
  },
  {
    title: "10 Affirmations to Start Your Day",
    source: "Medium",
    link: "https://medium.com/@example/affirmations",
  },
  {
    title: "TED Talk: Power of Vulnerability",
    source: "TED",
    link: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
  },
];

const PositiveContentFeed = () => {
  return (
    <Layout>
      <div className="positive-content-feed">
        <h2>Positive Content Feed</h2>
        <ul>
          {contentFeed.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <strong>{item.title}</strong> - {item.source}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default PositiveContentFeed;
