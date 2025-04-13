import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load user profile data from localStorage
    const savedProfileImage = localStorage.getItem("profileImage");
    const savedBio = localStorage.getItem("bio");
    const savedUsername = localStorage.getItem("username");
    const savedTheme = localStorage.getItem("theme");

    if (savedProfileImage) setProfileImage(savedProfileImage);
    if (savedBio) setBio(savedBio);
    if (savedUsername) setUsername(savedUsername);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleProfileImageChange = (e) => {
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

  const handleBioChange = (e) => setBio(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSave = () => {
    localStorage.setItem("bio", bio);
    localStorage.setItem("username", username);
    alert("Profile saved successfully!");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  const handleDeleteProfile = () => {
    setProfileImage(null);
    setBio("");
    setUsername("");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("bio");
    localStorage.removeItem("username");
    alert("Profile deleted!");
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-image-container">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(${profileImage || "/default-avatar.png"})`,
          }}
        ></div>
        <label
          htmlFor="profile-image-upload"
          className="profile-image-upload-label"
        >
          Change Profile Picture
        </label>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="profile-details">
        <div className="profile-input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="profile-input-group">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Write something about yourself"
          ></textarea>
        </div>
        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="delete-btn" onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      </div>
      <div className="theme-toggle">
        <button onClick={handleThemeToggle}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
