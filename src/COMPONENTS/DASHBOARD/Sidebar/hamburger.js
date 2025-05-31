import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import '../Style/hamburger.css';

function HamburgerMenu({ onClose, isNavbarVisible = true }) {
  const navigate = useNavigate();

  // Define your API URL consistently
  const API_URL = 'http://localhost:8000'; // Make sure this matches your backend URL

  const handleLogout = async () => { // Make function async
    try {
      // 1. Send request to Laravel backend to log out
      // Ensure axios.defaults.withCredentials is set elsewhere in your app (e.g., App.js)
      await axios.post(`${API_URL}/api/logout`);

      // 2. Clear client-side authentication tokens/data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userId');

      // Clear session storage as well
      sessionStorage.clear();

      console.log('Logged out successfully from both client and server.');

    } catch (error) {
      console.error('Error logging out:', error);
      // Even if there's an error on the server side (e.g., session already expired),
      // we should still clear client-side data for a consistent user experience.
      localStorage.removeItem('authToken');
      localStorage.removeItem('userToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userId');
      sessionStorage.clear();
    } finally {
      // Always close the hamburger menu and redirect
      onClose();
      navigate('/login', { replace: true });
      // Optional: Force page reload to clear any remaining state
      // window.location.reload();
    }
  };

  const handleMerchantMode = () => {
    onClose();
    navigate('/merchant-dashboard');
  };

  return (
    <div className="sidebar slide-in">
      <div className="sidebar-header">
        <span className="back-arrow" onClick={onClose}>←</span>
        {isNavbarVisible && <span className="sidebar-logo">MerchXpress</span>}
      </div>

      <ul className="menu-list">
        <li onClick={() => { navigate('/dashboard/profile'); onClose(); }}>👤 My Profile</li>
        <li onClick={() => { navigate('/dashboard/order-status'); onClose(); }}>🛒 Order Status</li>
        <li onClick={() => { navigate('/dashboard/transactions'); onClose(); }}>💳 Transactions</li>
        <li onClick={() => { navigate('/dashboard/reviews'); onClose(); }}>⭐ Reviews</li>
        <li onClick={() => { navigate('/dashboard/feedback'); onClose(); }}>📝 Feedback</li>
      </ul>

      <div className="sidebar-footer">
        <button className="btn black" onClick={handleMerchantMode}>
          Merchant Mode
        </button>
        <button className="btn black" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default HamburgerMenu;