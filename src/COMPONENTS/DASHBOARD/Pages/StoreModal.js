import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/StoreModal.css';

const API_BASE_URL = 'http://localhost:8000/api';

const StoreModal = ({ store, onClose, onAddToCart }) => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState(null);
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const fetchProducts = async () => {
            if (!store || !store.id) {
                setProductsError("No store ID provided.");
                setLoadingProducts(false);
                return;
            }

            setLoadingProducts(true);
            setProductsError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/stores/${store.id}/products`);
                const mappedProducts = response.data.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: product.image || `https://via.placeholder.com/100/CCCCCC/FFFFFF?text=${product.name.charAt(0)}`,
                    stock: product.stock !== undefined ? product.stock : 999,
                    description: product.description || 'No description available.',
                    store_id: product.store_id
                }));
                setProducts(mappedProducts);
            } catch (err) {
                console.error(`Error fetching products for store ${store.id}:`, err);
                setProductsError("Failed to load products for this store. Please try again.");
            } finally {
                setLoadingProducts(false);
            }
        };

        if (store && store.id) {
            fetchProducts();
        }

    }, [store]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // MODIFIED: This function will now also navigate to the cart page
    const handleAddToCartClick = (product) => {
        if (onAddToCart) {
            onAddToCart(product, 1); // Assuming you add 1 quantity by default
            alert(`${product.name} added to cart!`);
            handleClose(); // Close the modal
            navigate('/dashboard/cart'); // Navigate to the cart page immediately
        } else {
            console.warn("onAddToCart function is not provided to StoreModal component.");
        }
    };

    const handleProceedToCart = () => {
        handleClose();
        navigate('/dashboard/cart');
    };

    // Dummy reviews data (replace with actual fetched data if available)
    const dummyReviews = [
        { id: 1, name: "Alice", rating: 5, date: "2024-05-15", text: "Amazing store with great products!" },
        { id: 2, name: "Bob", rating: 4, date: "2024-05-10", text: "Good selection, fast delivery." },
        { id: 3, name: "Charlie", rating: 3, date: "2024-05-01", text: "Decent products, but customer service could be better." },
    ];

    const getItemsInGlobalCartFromThisStore = () => {
        // This function would require the actual 'cart' state to be passed down as a prop
        // For now, it's a placeholder.
        return 0;
    };

    if (!store) {
        return null;
    }

    const productCount = products.length;

    return (
        <div className={`store-modal-backdrop ${isVisible ? 'visible' : ''}`} onClick={handleOverlayClick}>
            <div className={`store-modal-content ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <button onClick={handleClose} className="close-btn">
                        <span>&times;</span>
                    </button>

                    <div className="store-profile">
                        <div className="store-avatar-container">
                            <img
                                src={store.avatar}
                                alt={store.name}
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
                            <span className="stat-value">{getItemsInGlobalCartFromThisStore()}</span>
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

                {/* Content Area */}
                <div className="modal-content-area">
                    {activeTab === 'products' && (
                        <div className="products-grid">
                            {loadingProducts ? (
                                <div className="loading-message">Loading products...</div>
                            ) : productsError ? (
                                <div className="error-message">{productsError}</div>
                            ) : products.length > 0 ? (
                                products.map((product, index) => (
                                    <div key={product.id || `product-${index}`} className="product-card">
                                        <div className="product-image">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />
                                            {product.stock !== undefined && product.stock <= 0 && (
                                                <div className="out-of-stock-overlay">Out of Stock</div>
                                            )}
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-description">{product.description}</p>
                                            <p className="product-price">
                                                ₱{product.price.toFixed(2)}
                                            </p>
                                            {product.stock !== undefined && (
                                                <p className="product-stock">Stock: {product.stock}</p>
                                            )}
                                            <button
                                                onClick={() => handleAddToCartClick(product)} // This will now trigger navigation
                                                disabled={product.stock !== undefined && product.stock <= 0}
                                                className={`add-to-cart-btn ${product.stock !== undefined && product.stock <= 0 ? 'disabled' : ''}`}
                                            >
                                                {product.stock !== undefined && product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-products-message">No products available for this store.</div>
                            )}
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
                                    { icon: '📍', label: 'Location', value: store.address || 'MerchXpress Plaza' },
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
                                    <div className="rating-big">{store.rating}</div>
                                    <div className="rating-stars">{'⭐'.repeat(Math.round(parseFloat(store.rating)))}</div>
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
                            </div>
                        </div>
                    )}
                </div>

                <div className="cart-summary-footer">
                    <button className="checkout-btn" onClick={handleProceedToCart}>
                        View My Full Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreModal;