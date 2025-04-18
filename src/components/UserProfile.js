import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";
import Layout from "../components/Layout";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Noorin"
  );
  const [bio, setBio] = useState(localStorage.getItem("bio") || "Hi");
  const [successMessage, setSuccessMessage] = useState("");
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
        setSuccessMessage("Profile picture updated!");
        setTimeout(() => setSuccessMessage(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("bio", bio);
    setSuccessMessage("Profile updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="theme-toggle-wrapper">
          <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
        <h1>User Profile</h1>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-image" style={{ backgroundColor: "#eee" }} />
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
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Bio</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </Layout>
  );
};

export default UserProfile;
