import React, { useState, useEffect } from 'react';
import StoreModal from './StoreModal'; // Ensure this path is correct
import axios from 'axios';
import '../Style/Market.css';
import '../Style/StoreModal.css'; // Make sure this CSS file exists for the modal

// Base URL for your Laravel API
// *** IMPORTANT: Adjust this to your actual Laravel API URL ***
const API_BASE_URL = 'http://localhost:8000/api';

export const categories = [
    'All',
    'Beverages',
    'Fashion',
    'Books',
    'General',
    'Food & Drink',
    'Electronics',
    'Plants',
    'Handmade',
    'Sports',
    'Bakery'
];

const Market = ({ addToCart }) => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null); // This holds the entire store object for the modal

    // Fetch stores from Laravel API on component mount
    useEffect(() => {
        const fetchStores = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/stores`);
                const mappedStores = response.data.map(store => ({
                    id: store.id,
                    name: store.name,
                    owner: store.owner || 'N/A', // CORRECTED: Use store.owner
                    avatar: store.avatar || 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Store', // CORRECTED: Use store.avatar
                    products_count: store.products ? store.products.length : 0,
                    rating: store.average_rating ? parseFloat(store.average_rating).toFixed(1) : 'N/A',
                    category: store.category || 'General',
                    description: store.description || 'No description available.',
                    isOpen: !!store.is_open,
                    featured: !!store.is_featured,
                    products: store.products || [],
                }));
                setStores(mappedStores);
            } catch (err) {
                console.error("Error fetching stores:", err);
                setError("Failed to load stores. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleAddToCart = (product, quantity) => {
        if (addToCart) {
            addToCart(product, quantity);
        } else {
            console.warn("addToCart function not provided to Market component.");
        }
    };

    const filteredStores = stores.filter(store => {
        const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
        const matchesFeatured = !showFeaturedOnly || store.featured;
        return matchesCategory && matchesFeatured;
    });

    if (loading) {
        return <div className="market-container"><p>Loading stores...</p></div>;
    }

    if (error) {
        return <div className="market-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="market-container">
            <h1 className="market-title">Discover Stores</h1>

            <div className="filter-section">
                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <label className="featured-toggle">
                    <input
                        type="checkbox"
                        checked={showFeaturedOnly}
                        onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    />
                    Show Featured Only
                </label>
            </div>

            <div className="stores-grid">
                {filteredStores.length > 0 ? (
                    filteredStores.map(store => (
                        <div
                            key={store.id}
                            className={`store-card ${!store.isOpen ? 'closed' : ''} ${store.featured ? 'featured' : ''}`}
                            onClick={() => {
                                console.log("Store card clicked:", store.name, store.id);
                                setSelectedStore(store);
                                // console.log("selectedStore state:", selectedStore); // This will show the previous state due to async nature
                            }}
                        >
                            <img src={store.avatar} alt={`${store.name} avatar`} className="store-avatar" />
                            <h2 className="store-name">{store.name}</h2>
                            <p className="store-category">{store.category}</p>
                            <div className="store-meta">
                                <span className="store-rating">⭐ {store.rating}</span>
                                <span className={`store-status ${store.isOpen ? 'open' : 'closed'}`}>
                                    {store.isOpen ? 'Open' : 'Closed'}
                                </span>
                            </div>
                            <p className="store-description">{store.description}</p>
                            <div className="store-actions">
                                <span className="product-count">{store.products_count} products</span>
                                <button className="visit-btn" onClick={(e) => {
                                    e.stopPropagation(); // Prevents click from bubbling up to the parent store-card's onClick
                                    console.log("Visit Store button clicked:", store.name, store.id);
                                    setSelectedStore(store);
                                    // console.log("selectedStore state (from button):", selectedStore); // Log the state *after* setting it
                                }}>
                                    Visit Store 🏪
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <span role="img" aria-label="open store">🏪</span>
                        <h3>No stores found</h3>
                        <p>Try adjusting your filters to see more stores.</p>
                        <button onClick={() => { setSelectedCategory('All'); setShowFeaturedOnly(false); }} className="category-btn active">Clear Filters</button>
                    </div>
                )}
            </div>

            {/* Store Modal will render here if selectedStore is not null */}
            {selectedStore && (
                <StoreModal
                    store={selectedStore} // Pass the entire store object, including its products
                    onClose={() => {
                        console.log("onClose triggered");
                        setSelectedStore(null);
                        // console.log("selectedStore state after onClose:", selectedStore); // This will show the previous state due to async nature
                    }}
                    onAddToCart={handleAddToCart} // Pass the handleAddToCart function
                />
            )}
        </div>
    );
};

export default Market;