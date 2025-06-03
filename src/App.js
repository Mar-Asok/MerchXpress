// App.js (Revised to pass cart to DashboardLayout)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import your components
import LoginForm from './COMPONENTS/LOGIN/LoginForm';
import SignupForm from './COMPONENTS/REGISTER/SignupForm';
import DashboardLayout from './COMPONENTS/DASHBOARD/Layout/DashboardLayout'; // Your layout component
import Home from './COMPONENTS/DASHBOARD/Pages/home';
import MyProfile from './COMPONENTS/DASHBOARD/Pages/myprofile';
import OrderStatus from './COMPONENTS/DASHBOARD/Pages/OrderStatus';
import Transaction from './COMPONENTS/DASHBOARD/Pages/Transaction';
import Review from './COMPONENTS/DASHBOARD/Pages/Review';
import Feedback from './COMPONENTS/DASHBOARD/Pages/Feedback';
import Market from './COMPONENTS/DASHBOARD/Pages/market';
import CartPage from './COMPONENTS/DASHBOARD/Pages/CartPage';
import CheckoutPage from './COMPONENTS/DASHBOARD/Pages/CheckoutPage';
import OrderConfirmationPage from './COMPONENTS/DASHBOARD/Pages/OrderConfirmationPage';

import MerchantHomePage from './COMPONENTS/MERCHANT/MerchantHomePage';
import MerchantProducts from './COMPONENTS/MERCHANT/MerchantProduct';
import MerchantSalesHistory from './COMPONENTS/MERCHANT/MerchantSalesHistory';
import MerchantRegistrationForm from './COMPONENTS/DASHBOARD/Pages/MerchantRegistrationForm';

// Configure Axios globally for CSRF token handling and credentials
axios.defaults.withCredentials = true;
const API_BASE_URL = 'http://localhost:8000'; // Your Laravel backend URL

function App() {
  // Global cart state, initialized from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // Effect to save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      console.log("App.js: Cart updated in localStorage:", cart); // Debugging
    } catch (error) {
      console.error("App.js: Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Cart management functions (Global)
  const addToCart = (product) => { /* ... (same as before) ... */
    console.log("App.js: addToCart called with product:", product);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => { /* ... (same as before) ... */
    console.log(`App.js: removeFromCart called for product ID: "${productId}"`);
    setCart(prevCart => {
      const newCart = prevCart.filter(item => {
        const keepItem = item.id !== productId;
        console.log(`  App.js: Filtering item ID: "${item.id}" (Matches requested ID: ${item.id === productId}) -> Keep: ${keepItem}`);
        return keepItem;
      });
      console.log("App.js: New cart state after removal:", newCart);
      return newCart;
    });
  };

  const updateCartQuantity = (productId, newQuantity) => { /* ... (same as before) ... */
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    console.log(`App.js: updateCartQuantity called for product ID: "${productId}" to quantity: ${quantity}`);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => { /* ... (same as before) ... */
    console.log("App.js: Clearing entire cart.");
    setCart([]);
  };

  const handleOrderComplete = (orderData) => { /* ... (same as before) ... */
    console.log('App.js: Order completed, received data:', orderData);
    clearCart();
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => { /* ... (same as before) ... */
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user`);
      setUser(response.data);
      setIsAuthenticated(true);
      console.log("App.js: Session authenticated. User:", response.data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.log("App.js: Session not authenticated or expired.");
    }
  };

  useEffect(() => { /* ... (same as before) ... */
    const fetchCsrfCookie = async () => {
      try {
        await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
        console.log("App.js: CSRF cookie fetched successfully.");
      } catch (error) {
        console.error("App.js: Failed to fetch CSRF cookie:", error);
      }
    };
    fetchCsrfCookie();
    checkAuthStatus();
  }, []);

  const handleLogin = (userData) => { /* ... (same as before) ... */
    setIsAuthenticated(true);
    setUser(userData);
    console.log("App.js: handleLogin called. User authenticated:", userData);
  };

  const handleLogout = async () => { /* ... (same as before) ... */
    try {
      await axios.post(`${API_BASE_URL}/api/logout`);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
      console.log("App.js: handleLogout called. User logged out.");
    } catch (error) {
      console.error("App.js: Logout failed:", error);
    }
  };

  // --- Protected Route Wrapper Component ---
  const ProtectedDashboardRoute = ({ children }) => { // onLogout is now handled by DashboardLayout directly
    return isAuthenticated ? (
      <DashboardLayout
        onLogout={handleLogout} // Pass the global handleLogout
        cart={cart} // Pass global cart
        addToCart={addToCart} // Pass global addToCart
        removeFromCart={removeFromCart} // Pass global removeFromCart
        updateCartQuantity={updateCartQuantity} // Pass global updateCartQuantity
      >
        {children}
      </DashboardLayout>
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/register" element={<MerchantRegistrationForm onClose={() => {}} onSubmit={() => {}} />} />

          {/* Dashboard Routes wrapped in ProtectedDashboardRoute */}
          <Route path="/dashboard" element={<ProtectedDashboardRoute><Home /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/home" element={<ProtectedDashboardRoute><Home /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/myprofile" element={<ProtectedDashboardRoute><MyProfile /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/order-status" element={<ProtectedDashboardRoute><OrderStatus /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/transactions" element={<ProtectedDashboardRoute><Transaction /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/reviews" element={<ProtectedDashboardRoute><Review /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/feedback" element={<ProtectedDashboardRoute><Feedback /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/register-merchant" element={<ProtectedDashboardRoute><MerchantRegistrationForm /></ProtectedDashboardRoute>} />

          {/* Market with cart functionality */}
          <Route
            path="/dashboard/market"
            element={
              <ProtectedDashboardRoute>
                <Market
                  cart={cart}
                  addToCart={addToCart}
                />
              </ProtectedDashboardRoute>
            }
          />

          {/* Cart page - Pass cart state and functions */}
          <Route
            path="/dashboard/cart"
            element={
              <ProtectedDashboardRoute>
                <CartPage
                  cart={cart}
                  removeItem={removeFromCart}
                  updateQuantity={updateCartQuantity}
                />
              </ProtectedDashboardRoute>
            }
          />

          {/* Checkout page */}
          <Route
            path="/dashboard/checkout"
            element={
              <ProtectedDashboardRoute>
                <CheckoutPage
                  onOrderComplete={handleOrderComplete}
                  cart={cart}
                  clearCart={clearCart}
                />
              </ProtectedDashboardRoute>
            }
          />

          {/* Order Confirmation page */}
          <Route
            path="/dashboard/order-confirmation"
            element={
              <ProtectedDashboardRoute>
                <OrderConfirmationPage />
              </ProtectedDashboardRoute>
            }
          />

          {/* Merchant Routes (assuming not protected by general dashboard auth for now) */}
          <Route path="/merchant-dashboard" element={<MerchantHomePage />} />
          <Route path="/merchant/products" element={<MerchantProducts />} />
          <Route path="/merchant/sales" element={<MerchantSalesHistory />} />

          {/* Fallback for unmatched routes */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;