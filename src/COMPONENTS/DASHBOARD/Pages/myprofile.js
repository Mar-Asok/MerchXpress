// COMPONENTS/DASHBOARD/Pages/MyProfile.js
import React, { useState, useEffect } from 'react';
import '../Style/myprofile.css';
import '../Style/Transaction.css'; // Import Transaction's CSS

const MyProfile = () => {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    dateOfBirth: '',
    gender: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('merchXpressUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser({
        username: userData.username || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        contact: userData.contact || '',
        email: userData.email || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    localStorage.setItem('merchXpressUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="dashboard-container transaction-container"> {/* Added transaction-container class */}
      {/* Background Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>
      <div className="bg-circle bg-circle-4"></div>

      <main className="main-content transaction-content"> {/* Using transaction-content for inner styling */}
        <h2 className="headline">
          <span role="img" aria-label="user">👤</span> My Profile
        </h2>
        <div className="profile-info">
          {/* ... rest of the form */}
          <div className="profile-row">
            <strong>Username:</strong>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Name:</strong>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="First Name"
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Last Name:</strong>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Contact:</strong>
            <input
              type="text"
              name="contact"
              value={user.contact}
              onChange={handleChange}
              placeholder="Contact"
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Date of Birth:</strong>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            />
          </div>
          <div className="profile-row">
            <strong>Gender:</strong>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              style={{ flex: 1, marginLeft: '10px', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '4px' }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;