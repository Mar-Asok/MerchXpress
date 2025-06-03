// COMPONENTS/DASHBOARD/Layout/DashboardLayout.js (Revised)
import React, { useState, useEffect } from 'react'; // Added useEffect for console logging
import Sidebar from '../Sidebar/hamburger';
import Navbar from '../Navbar/Navbar';
import '../Style/home.css';

// Accept onLogout and global cart props from App.js
const DashboardLayout = ({ children, onLogout, cart, addToCart, removeFromCart, updateCartQuantity }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // No need for local cartItems state and functions here anymore
  // as they are managed globally in App.js and passed down.

  // Use the global cart to get item count for Navbar
  const getGlobalCartItemCount = () => {
    return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  useEffect(() => {
    // Optional: Log the received cart to ensure it's coming from App.js
    console.log("DashboardLayout: Received global cart:", cart);
  }, [cart]);


  return (
    <div className="home-wrapper">
      {menuOpen && <Sidebar onClose={() => setMenuOpen(false)} />}

      {!menuOpen && (
        <div className="fixed-header-left">
          <button className="hamburger-icon" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
          <div className="logo-text">MerchXpress</div>
        </div>
      )}

      <div className={`home-container ${menuOpen ? 'menu-active' : ''}`}>
        {/* Pass onLogout and the global cart count to the Navbar component */}
        <Navbar cartCount={getGlobalCartItemCount()} onLogout={onLogout} />

        {/* Render the children (the actual page component like Home, Market, etc.) */}
        {/* Pass global cart functions to children if they need them (e.g., Market component) */}
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            // These props are now the global ones from App.js
            cart: cart,
            addToCart: addToCart,
            updateCartQuantity: updateCartQuantity, // Changed from updateCartItemQuantity to match App.js
            removeFromCart: removeFromCart,
          })
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;