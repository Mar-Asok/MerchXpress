import React, { useState, useEffect } from 'react';
import Market from './market'; // Assuming Market.js is in the same directory
import CartPage from './CartPage'; // Assuming CartPage.js is in the same directory

const Dashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activePage, setActivePage] = useState('market'); // 'market' or 'cart'

  useEffect(() => {
    console.log('Cart updated:', cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(currentCart =>
        currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      );
    } else {
      setCartItems(currentCart => [...currentCart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(currentCart =>
      currentCart.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const goToCart = () => {
    setActivePage('cart');
  };

  const goToMarket = () => {
    setActivePage('market');
  };

  return (
    <div className="dashboard-container">
      <nav>
        <button onClick={goToMarket} className={activePage === 'market' ? 'active' : ''}>Marketplace</button>
        <button onClick={goToCart} className={activePage === 'cart' ? 'active' : ''}>Cart ({cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)})</button>
      </nav>

      <main>
        {activePage === 'market' && (
          <Market addToCart={addToCart} />
        )}
        {activePage === 'cart' && (
          <CartPage
            cart={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        )}
      </main>

      <style>
        {`
          .dashboard-container {
            font-family: sans-serif;
            padding: 20px;
          }

          nav {
            margin-bottom: 20px;
          }

          nav button {
            padding: 10px 15px;
            margin-right: 10px;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
          }

          nav button.active {
            background-color: #f0f0f0;
            font-weight: bold;
          }

          main {
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;