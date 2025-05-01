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
  const [affirmations, setAffirmations] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempBio, setTempBio] = useState(bio);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("affirmations")) || [];
    const sorted = saved.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAffirmations(sorted);
  }, []);

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

  const deleteAffirmation = (index) => {
    const updated = [...affirmations];
    updated.splice(index, 1);
    localStorage.setItem("affirmations", JSON.stringify(updated));
    setAffirmations(updated);
  };

  const editAffirmation = (index) => {
    const currentText = affirmations[index].text;
    const newText = prompt("Edit your affirmation:", currentText);
    if (newText && newText.trim()) {
      const updated = [...affirmations];
      updated[index].text = newText.trim();
      localStorage.setItem("affirmations", JSON.stringify(updated));
      setAffirmations(updated);
    }
  };

  const handleProfileEdit = () => {
    if (editingProfile) {
      setUsername(tempUsername.trim());
      setBio(tempBio.trim());
      localStorage.setItem("username", tempUsername.trim());
      localStorage.setItem("bio", tempBio.trim());
    }
    setEditingProfile(!editingProfile);
  };

  return (
    <div className="profile-container">
      <div className="theme-toggle-wrapper">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

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
          {editingProfile ? (
            <>
              <input
                className="edit-input"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
              />
              <textarea
                className="edit-textarea"
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
              />
            </>
          ) : (
            <>
              <h1 className="username">{username}</h1>
              <p className="bio">{bio}</p>
            </>
          )}

          <div className="profile-stats">
            <span>Posts: {affirmations.length}</span>
          </div>

          <button className="edit-profile-button" onClick={handleProfileEdit}>
            {editingProfile ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="profile-posts">
        {affirmations.length > 0 ? (
          affirmations.map((post, index) => (
            <div key={index} className="profile-post">
              <p className="affirmation-text">{post.text}</p>
              <small className="affirmation-date">
                {new Date(post.date).toLocaleString()}
              </small>
              <div className="post-actions">
                <button onClick={() => editAffirmation(index)}>Edit</button>
                <button onClick={() => deleteAffirmation(index)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="profile-post">No affirmations yet.</div>
        )}
      </div>

      <button
        className="floating-add-button"
        onClick={() => (window.location.href = "/add-affirmation")}
      >
        +
      </button>
    </div>
  );
};

export default UserProfile;
