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
  const [affirmations, setAffirmations] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("affirmations")) || [];
    const sorted = saved.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAffirmations(sorted);
  }, []);

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

  const handleProfileSave = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("bio", bio);
    setEditing(false);
  };

  return (
    <div className="insta-profile-container">
      <div className="insta-header">
        <div className="insta-profile-pic">
          <label htmlFor="imageUpload">
            <img src={profileImage || "/default-profile.png"} alt="Profile" />
            <div className="edit-overlay">Edit</div>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="insta-user-info">
          {editing ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="edit-input username-input"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="edit-input bio-input"
              />
              <button
                onClick={handleProfileSave}
                className="edit-profile-button"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="insta-username">{username}</h2>
              <p className="insta-bio">{bio}</p>
              <button
                className="edit-profile-button"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="insta-posts">
        <h3>Saved Affirmations</h3>
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
          <p>No affirmations saved yet.</p>
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
