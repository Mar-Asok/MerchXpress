import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../DASHBOARD/Style/MerchantSidebar.css'; // Your sidebar CSS

function MerchantSidebar() {
  const navigate = useNavigate();

  return (
    <div className="merchant-sidebar-style"> {/* Use the new class */}
      <div className="sidebar-header">
        <span className="sidebar-logo">MerchXpress</span>
        <span className="merchant-label">Merchant</span>
      </div>
      <ul className="menu-list"> {/* Keep these class names if you want consistency */}
        <li onClick={() => navigate('/merchant-dashboard')}>🏠 Dashboard</li> {/* Homepage */}
        <li onClick={() => navigate('/merchant/products')}>💰 Your Products</li>
        <li onClick={() => navigate('/merchant/sales')}>📊 Sales History</li>
        {/* Add more merchant-specific navigation items here */}
      </ul>
      <div className="sidebar-footer"> {/* Keep these class names */}
        <button className="btn black" onClick={() => navigate('/dashboard')}>
          Buyer Mode
        </button>
        <button className="btn black" onClick={() => navigate('/login')}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default MerchantSidebar;