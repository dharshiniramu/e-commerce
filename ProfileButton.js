// ProfileButton.js
import React, { useState } from 'react';
import './ProfileButton.css'; // Ensure CSS is included

const ProfileButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="profile-button">
      <button onClick={toggleDropdown}>Profile</button>
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <a href="/profile">View Profile</a>
          <a href="/settings">Settings</a>
          <a href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
