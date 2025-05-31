import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function LoginForm({ onLogin, onNavigate }) {
  const [username, setUsername] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const navigate = useNavigate();

  // Configure Axios for CSRF token handling and credentials
  axios.defaults.withCredentials = true;
  const API_URL = 'http://localhost:8000'; // Replace with your Laravel backend URL

  useEffect(() => {
    // No need to load users from localStorage anymore, Laravel handles it
    // Clear any lingering localStorage prefill data
    localStorage.removeItem('lastSignedUpUsername');
    localStorage.removeItem('lastSignedUp(');
  }, []);

  const isValidPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);

  const handleLogin = async () => {
    setLoginStatus(''); // Clear previous status

    if (!username || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }

    if (!isValidPassword(password)) {
      setLoginStatus('Invalid password format'); // Or a more generic "Invalid credentials"
      return;
    }

    try {
      // 1. Get CSRF cookie first
      await axios.get(`${API_URL}/sanctum/csrf-cookie`);

      // 2. Send login data
      const response = await axios.post(`${API_URL}/api/login`, {
        username, // Sending 'username' which Laravel will attempt to match against username or email
        password,
      });

      if (response.status === 204) { // Laravel's default is 204 No Content on success
        // At this point, the user is authenticated via session cookie
        // You might want to fetch user details for display or context
        // >>>>>>>>>> FIX APPLIED HERE <<<<<<<<<<
        const userResponse = await axios.get(`${API_URL}/api/user`); // Corrected: Added /api/
        const userData = userResponse.data;
        setLoginStatus(`Welcome, ${userData.first_name || userData.username}!`);
        if (onLogin) onLogin(userData); // Pass user data to parent component if needed

        setTimeout(() => {
          if (onNavigate) {
            onNavigate('dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
      } else {
        setLoginStatus('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422 || error.response.status === 401) { // Validation or Unauthorized
          setLoginStatus('Invalid username or password');
        } else {
          setLoginStatus(`Error: ${error.response.data.message || 'Something went wrong.'}`);
        }
      } else if (error.request) {
        setLoginStatus('No response from server. Please check your network connection.');
      } else {
        setLoginStatus(`Error: ${error.message}`);
      }
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <style>{`
        /* Your existing CSS styles */
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
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
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 400px;
          position: relative;
          z-index: 10;
        }
        .form-container h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
          font-size: 28px;
          font-weight: bold;
        }
        .input-group {
          margin-bottom: 20px;
          position: relative;
        }
        .input-group input {
          width: 100%;
          padding: 15px;
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
        .account-text button {
          color: #667eea;
          text-decoration: none;
          font-weight: bold;
          background: none;
          border: none;
          cursor: pointer;
        }
        .account-text button:hover {
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
        }
        .action-button:hover {
          transform: translateY(-2px);
        }
        .status-message {
          text-align: center;
          margin-top: 15px;
          padding: 10px;
          border-radius: 5px;
          font-weight: bold;
          color: #e74c3c;
        }
      `}</style>

      <div className="login-page">
        {/* Decorative circles */}
        <div className="blue-circle top-right"></div>
        <div className="blue-circle bottom-left"></div>
        <div className="blue-circle-gradient bottom-left-large"></div>
        <div className="small-circle top-right-small"></div>
        <div className="small-circle bottom-right-small"></div>
        <div className="small-circle left-center"></div>

        {/* Login card */}
        <div className="form-container">
          <h1>MerchXpress</h1>

          <div className="input-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="account-text">
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                type="button"
              >
                SIGN UP
              </button>
            </p>
          </div>

          <button className="action-button" onClick={handleLogin} type="button">
            Login
          </button>

          {loginStatus && (
            <p
              className="status-message"
              style={{ color: loginStatus.includes('Welcome') ? '#27ae60' : '#e74c3c' }}
            >
              {loginStatus}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginForm;