import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Noorin"
  );
  const [bio, setBio] = useState(
    localStorage.getItem("bio") || "Hi, welcome to my profile!"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="profile-container">
      {/* Theme Toggle */}
      <div className="theme-toggle-wrapper">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-image-wrapper">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">No Image</div>
          )}
          <label htmlFor="imageUpload" className="upload-label">
            Change Profile Picture
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="profile-info">
          <h1 className="username">{username}</h1>
          <p className="bio">{bio}</p>

          {/* Stats */}
          <div className="profile-stats">
            <span>Posts: 50</span>
            <span>Followers: 1200</span>
            <span>Following: 180</span>
          </div>

          {/* Edit Profile Button */}
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>

      {/* User's Post Grid */}
      <div className="post-grid">
        {/* Placeholder posts, these can be dynamic */}
        <div className="post-item">Post 1</div>
        <div className="post-item">Post 2</div>
        <div className="post-item">Post 3</div>
        <div className="post-item">Post 4</div>
        <div className="post-item">Post 5</div>
        <div className="post-item">Post 6</div>
      </div>
    </div>
  );
};

export default UserProfile;
