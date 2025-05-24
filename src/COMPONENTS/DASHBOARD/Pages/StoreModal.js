// StoreModal.js
import React, { useState, useEffect } from 'react';

const StoreModal = ({ store, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [localCart, setLocalCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  if (!store) return null;

  const products = Array.isArray(store.items) ? store.items : [];
  const productCount = Array.isArray(store.items) ? store.items.length : store.products; // Use store.items

  const addToLocalCart = (product) => {
    setLocalCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Immediately update the global cart as well
    onAddToCart(product);
  };

  const getLocalCartTotal = () => localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getLocalCartItemCount = () => localCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const displayProducts = products.length > 0 ? products : [
    { id: 1, name: "Featured Item 1", price: 299, stock: 15, image: "https://picsum.photos/200/200?random=1" },
    { id: 2, name: "Popular Item 2", price: 459, stock: 8, image: "https://picsum.photos/200/200?random=2" },
    { id: 3, name: "Best Seller 3", price: 199, stock: 22, image: "https://picsum.photos/200/200?random=3" },
    { id: 4, name: "New Arrival 4", price: 359, stock: 12, image: "https://picsum.photos/200/200?random=4" }
  ];

  const handleCheckout = () => {
    if (localCart.length > 0) {
      // Implement your checkout logic here
      console.log('Initiating checkout with items:', localCart, 'Total:', getLocalCartTotal());
      alert('Checkout initiated! (See console for details)');
      // Optionally clear the local cart after checkout
      setLocalCart([]);
    } else {
      alert('Your cart is empty.');
    }
    // You might want to navigate to a checkout page or show a summary
  };

  return (
    <div className={`store-modal ${isVisible ? 'visible' : ''}`} onClick={handleOverlayClick}>
      <div className={`store-modal-content ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">
            <span>×</span>
          </button>

          <div className="store-profile">
            <div className="store-avatar-container">
              <img
                src={store.avatar}
                alt={store.owner}
                className="store-avatar"
              />
              <div className={`status-dot ${store.isOpen ? 'online' : 'offline'}`} />
            </div>
            <div className="store-info">
              <h1>{store.name}</h1>
              <p className="store-owner">by {store.owner}</p>
              <div className="store-badges">
                <span className="category-badge">{store.category}</span>
                <span className={`status-badge ${store.isOpen ? 'open' : 'closed'}`}>
                  {store.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                </span>
              </div>
            </div>
          </div>

          <div className="store-stats-header">
            <div className="stat-item">
              <span className="stat-value">{store.rating}</span>
              <span className="stat-label">⭐ Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{productCount}</span>
              <span className="stat-label">📦 Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getLocalCartItemCount()}</span>
              <span className="stat-label">🛒 In Cart</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {[
            { key: 'products', label: 'Products' },
            { key: 'about', label: 'About' },
            { key: 'reviews', label: 'Reviews' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="modal-content-area">
          {activeTab === 'products' && (
            <div className="products-grid">
              {displayProducts.map((product, index) => (
                <div key={product.id || index} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.image || `https://picsum.photos/200/200?random=${index + 10}`}
                      alt={product.name}
                    />
                    {product.stock !== undefined && product.stock <= 0 && (
                      <div className="out-of-stock">Out of Stock</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      ₱{product.price || Math.floor(Math.random() * 500) + 100}
                    </p>
                    {product.stock !== undefined && (
                      <p className="text-sm text-gray-500 mb-1">Stock: {product.stock}</p>
                    )}
                    <button
                      onClick={() => addToLocalCart(product)}
                      disabled={product.stock !== undefined && product.stock <= 0}
                      className={`add-to-cart-btn ${product.stock !== undefined && product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {product.stock !== undefined && product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="about-card">
              <h3>About {store.name}</h3>
              <p className="store-description">{store.description}</p>

              <div className="store-details">
                {[
                  { icon: '👤', label: 'Owner', value: store.owner },
                  { icon: '🏷️', label: 'Category', value: store.category },
                  { icon: '📍', label: 'Location', value: 'MerchXpress Plaza' },
                  { icon: '🕒', label: 'Hours', value: store.isOpen ? '9AM - 9PM' : 'Currently Closed' }
                ].map((item, index) => (
                  <div key={index} className="detail-item">
                    <span className="detail-icon">{item.icon}</span>
                    <div>
                      <span className="detail-label">{item.label}</span>
                      <span className="detail-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-buttons">
                <button className="contact-btn primary">💬 Message</button>
                <button className="contact-btn secondary">📧 Email</button>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="reviews-header">
                <div className="rating-overview">
                  <div className="rating-big">4.{Math.floor(Math.random() * 9) + 1}</div>
                  <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                  <p>Based on customer reviews</p>
                </div>
              </div>

              <div className="reviews-list">
                {[
                  { name: 'John Doe', rating: 5, text: 'Amazing products and excellent customer service! Highly recommended.', date: '2 days ago' },
                  { name: 'Jane Smith', rating: 4, text: 'Good quality items, fast delivery. Will definitely order again!', date: '1 week ago' },
                  { name: 'Bob Wilson', rating: 5, text: 'Great store with unique finds. Love their collection!', date: '3 weeks ago' },
                ].map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-avatar">{review.name.charAt(0).toUpperCase()}</div>
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.name}</span>
                        <div className="review-rating">{'⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
                {/* Add "Load More Reviews" button if needed */}
              </div>
            </div>
          )}
        </div>

        {activeTab === 'products' && localCart.length > 0 && (
          <div className="cart-summary">
            <h4>🛒 Cart ({getLocalCartItemCount()})</h4>
            <ul className="cart-items">
              {localCart.map(item => (
                <li key={item.id} className="cart-item">
                  <span className="item-name">{item.name} x {item.quantity}</span>
                  <span className="item-price">₱{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">₱{getLocalCartTotal().toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button> {/* Functional Checkout Button */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreModal;