import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupStatus, setSignupStatus] = useState('');

  const navigate = useNavigate();

  const isValidPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);

  const isValidEmail = (em) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleSignup = () => {
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setSignupStatus('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setSignupStatus('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      setSignupStatus('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      return;
    }

    if (password !== confirmPassword) {
      setSignupStatus('Passwords do not match!');
      return;
    }

    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('merchXpressUsers') || '[]');
    if (existingUsers.find(user => user.username === username)) {
      setSignupStatus('Username already exists. Please choose a different username.');
      return;
    }

    // Check if email already exists
    if (existingUsers.find(user => user.email === email)) {
      setSignupStatus('Email already registered. Please use a different email.');
      return;
    }

    const userData = { username, firstName, lastName, email, password };
    
    // Add new user to the users array
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('merchXpressUsers', JSON.stringify(updatedUsers));

    // Set autofill data for login page
    localStorage.setItem('lastSignedUpUsername', username);
    localStorage.setItem('lastSignedUpPassword', password);

    setSignupStatus(`Account created for ${firstName} ${lastName}!`);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="signup-page">
      {/* Decorative circles */}
      <div className="blue-circle top-right"></div>
      <div className="blue-circle bottom-left"></div>
      <div className="blue-circle-gradient bottom-left-large"></div>
      <div className="small-circle top-right-small"></div>
      <div className="small-circle bottom-right-small"></div>
      <div className="small-circle left-center"></div>

      {/* Signup form container */}
      <div className="form-container">
        <h1>MerchXpress</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        <div className="input-group password-group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            className="eye-button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        <div className="account-text">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link-login">
              LOGIN
            </Link>
          </p>
        </div>

        <button className="action-button" onClick={handleSignup} type="button">
          Signup
        </button>

        {signupStatus && (
          <p
            className={`status-message ${
              signupStatus.includes('created') ? 'success' : 'error'
            }`}
            role="alert"
          >
            {signupStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignupForm;