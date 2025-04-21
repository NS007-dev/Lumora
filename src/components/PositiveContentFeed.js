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
        <h2 className="feed-title">Positive Content Feed</h2>
        <div className="content-grid">
          {contentFeed.map((item, index) => (
            <div className="content-card" key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
              </a>
              <p>{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PositiveContentFeed;
