// COMPONENTS/DASHBOARD/Layout/DashboardLayout.js
import React, { useState } from 'react';
import Sidebar from '../Sidebar/hamburger';
import Navbar from '../Navbar/Navbar';
import '../Style/home.css';

const DashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

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
        <Navbar cartCount={getCartItemCount()} />
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            cart: cartItems,
            addToCart: addToCart,
            updateCartItemQuantity: updateCartItemQuantity,
            removeFromCart: removeFromCart,
          })
        )}
        {/* Removed conditional rendering of CartPage */}
      </div>
    </div>
  );
};

export default DashboardLayout;