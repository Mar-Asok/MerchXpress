import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/hamburger.css';

function HamburgerMenu({ onClose, isNavbarVisible = true }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens/data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Close the hamburger menu
    onClose();
    
    // Redirect to login page
    navigate('/login', { replace: true });
    
    // Optional: Force page reload to clear any remaining state
    // window.location.reload();
  };

  const handleMerchantMode = () => {
    // Close menu first
    onClose();
    // Navigate to merchant dashboard or toggle merchant mode
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