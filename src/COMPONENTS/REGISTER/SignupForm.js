import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

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

  // Configure Axios for CSRF token handling and credentials
  axios.defaults.withCredentials = true;
  const API_URL = 'http://localhost:8000'; // Replace with your Laravel backend URL

  const isValidPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);

  const isValidEmail = (em) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleSignup = async () => {
    setSignupStatus(''); // Clear previous status

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

    try {
      // 1. Get CSRF cookie first (Laravel Sanctum requirement for SPAs)
      await axios.get(`${API_URL}/sanctum/csrf-cookie`);

      // 2. Send registration data
      const response = await axios.post(`${API_URL}/api/register`, {
        firstName,
        lastName,
        email,
        username,
        password,
        password_confirmation: confirmPassword, // Laravel requires password_confirmation
      });

      if (response.status === 204) { // Laravel's default is 204 No Content on success
        setSignupStatus(`Account created for ${firstName} ${lastName}! Redirecting...`);
        // Optionally, you might want to fetch user data after registration for display
        // await axios.get(`${API_URL}/user`); // Example: Fetch authenticated user
        setTimeout(() => {
          navigate('/dashboard'); // Navigate to dashboard or wherever your app goes after successful login
        }, 1500);
      } else {
        setSignupStatus('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 422) { // Validation errors
          const errors = error.response.data.errors;
          let errorMessage = '';
          for (const key in errors) {
            errorMessage += errors[key].join(' ') + ' ';
          }
          setSignupStatus(errorMessage.trim());
        } else {
          setSignupStatus(`Error: ${error.response.data.message || 'Something went wrong.'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setSignupStatus('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setSignupStatus(`Error: ${error.message}`);
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <style>{`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
        }
        .blue-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }
        .blue-circle.top-right {
          top: 50px;
          right: 50px;
          width: 200px;
          height: 200px;
        }
        .blue-circle.bottom-left {
          bottom: 50px;
          left: 50px;
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.05);
        }
        .blue-circle-gradient.bottom-left-large {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: 50%;
        }
        .small-circle {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }
        .small-circle.top-right-small {
          top: 100px;
          right: 200px;
        }
        .small-circle.bottom-right-small {
          bottom: 100px;
          right: 100px;
          width: 20px;
          height: 20px;
        }
        .small-circle.left-center {
          left: 100px;
          top: 50%;
          width: 15px;
          height: 15px;
        }
        .form-container {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 10;
          max-height: 90vh;
          overflow-y: auto;
        }
        .form-container h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
          font-size: 28px;
          font-weight: bold;
        }
        .input-group {
          margin-bottom: 15px;
          position: relative;
        }
        .input-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e1e1;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }
        .input-group input:focus {
          border-color: #667eea;
        }
        .password-group {
          position: relative;
        }
        .eye-button {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: #666;
        }
        .eye-button:hover {
          color: #333;
        }
        .account-text {
          text-align: center;
          margin-bottom: 20px;
        }
        .account-text p {
          color: #666;
          margin: 0;
        }
        .link-login {
          color: #667eea;
          text-decoration: none;
          font-weight: bold;
        }
        .link-login:hover {
          text-decoration: underline;
        }
        .action-button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s ease;
          margin-bottom: 15px;
        }
        .action-button:hover {
          transform: translateY(-2px);
        }
        .status-message {
          text-align: center;
          margin-top: 10px;
          padding: 10px;
          border-radius: 5px;
          font-weight: bold;
        }
        .status-message.error {
          color: #e74c3c;
        }
        .status-message.success {
          color: #27ae60;
        }
      `}</style>

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
    </>
  );
}

export default SignupForm;