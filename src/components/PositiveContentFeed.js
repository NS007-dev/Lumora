import React, { useState, useEffect } from "react";
import "./PositiveContentFeed.css";
import profilePlaceholder from "../assets/placeholder.jpg";
import { FaHeart, FaComment, FaShare, FaRegSmileBeam } from "react-icons/fa";

const contentFeed = [
  {
    id: "post-1",
    title: "How to Build Confidence",
    source: "YouTube - Psych2Go",
    link: "https://www.youtube.com/watch?v=somevideo",
    profilePic: profilePlaceholder,
    description: "This video will change the way you see yourself!",
  },
  {
    id: "post-2",
    title: "10 Affirmations to Start Your Day",
    source: "Medium",
    link: "https://medium.com/@example/affirmations",
    profilePic: profilePlaceholder,
    description: "Start your day with positivity! 🌞",
  },
  {
    id: "post-3",
    title: "TED Talk: Power of Vulnerability",
    source: "TED",
    link: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
    profilePic: profilePlaceholder,
    description: "Be vulnerable, be strong. 💪",
  },
];

const PositiveContentFeed = () => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setLikes(storedLikes);
    setComments(storedComments);
  }, []);

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
    <div className="positive-content-feed">
      <h2 className="feed-title">Positive Content Feed</h2>
      {contentFeed.map((item) => (
        <div className="feed-card" key={item.id}>
          <div className="feed-header">
            <img src={item.profilePic} alt="Profile" className="profile-pic" />
            <a href={item.link} target="_blank" rel="noreferrer">
              <strong>{item.title}</strong>
            </a>
          </div>
          <p className="source">{item.source}</p>
          <p className="description">{item.description}</p>
          <div className="reactions">
            <button onClick={() => handleLike(item.id)}>
              <FaHeart className="reaction-icon" />{" "}
              <span>{likes[item.id] || 0}</span>
            </button>
            <button>
              <FaComment className="reaction-icon" />{" "}
              <span>{comments[item.id] ? "Commented" : "Comment"}</span>
            </button>
            <button>
              <FaShare className="reaction-icon" /> Share
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
              <p className="comment-preview">
                <FaRegSmileBeam className="reaction-icon" /> {comments[item.id]}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PositiveContentFeed;
