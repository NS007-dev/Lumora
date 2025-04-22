import React, { useState, useEffect } from "react";
import "./PositiveContentFeed.css";
import Layout from "./Layout";
import profilePlaceholder from "../assets/placeholder.jpg";

const contentFeed = [
  {
    id: "post-1",
    title: "How to Build Confidence",
    source: "YouTube - Psych2Go",
    link: "https://www.youtube.com/watch?v=somevideo",
    profilePic: profilePlaceholder,
  },
  {
    id: "post-2",
    title: "10 Affirmations to Start Your Day",
    source: "Medium",
    link: "https://medium.com/@example/affirmations",
    profilePic: profilePlaceholder,
  },
  {
    id: "post-3",
    title: "TED Talk: Power of Vulnerability",
    source: "TED",
    link: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
    profilePic: profilePlaceholder,
  },
];

const PositiveContentFeed = () => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  // Load from localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setLikes(storedLikes);
    setComments(storedComments);
  }, []);

  // Save to localStorage whenever likes/comments change
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Layout>
      <div className="positive-content-feed">
        <h2>Positive Content Feed</h2>
        {contentFeed.map((item) => (
          <div className="feed-card" key={item.id}>
            <div className="feed-header">
              <img
                src={item.profilePic}
                alt="Profile"
                className="profile-pic"
              />
              <a href={item.link} target="_blank" rel="noreferrer">
                <strong>{item.title}</strong>
              </a>
            </div>
            <p className="source">{item.source}</p>
            <div className="reactions">
              <button onClick={() => handleLike(item.id)}>
                ❤️ {likes[item.id] || 0}
              </button>
            </div>
            <div className="comments">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comments[item.id] || ""}
                onChange={(e) => handleCommentChange(item.id, e.target.value)}
              />
              {comments[item.id] && (
                <p className="comment-preview">💬 {comments[item.id]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PositiveContentFeed;
