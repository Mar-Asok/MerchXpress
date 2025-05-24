// src\COMPONENTS\DASHBOARD\Pages\market.js
import React, { useState } from 'react';
import StoreModal from './StoreModal'; // Adjust the import path as needed
import '../Style/Market.css';
import '../Style/StoreModal.css'; // Import StoreModal's CSS

// Your existing stores data
export const storesData = [
  {
    id: 1,
    name: "Marielle's SodaHouse",
    owner: "Marielle",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763c43?w=150&h=150&fit=crop&crop=face",
    products: "5k",
    rating: "10k",
    category: "Beverages",
    description: "Premium sodas and refreshing drinks",
    isOpen: true,
    featured: true,
    items: [
      { id: 'ms1', name: 'Soda A', price: 2.50, image: 'https://via.placeholder.com/50', stock: 10 },
      { id: 'ms2', name: 'Soda B', price: 3.00, image: 'https://via.placeholder.com/50', stock: 5 },
    ],
  },
  {
    id: 2,
    name: "DenSlay Fits",
    owner: "Denzey",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    products: "1.5k",
    rating: "9.5k",
    category: "Fashion",
    description: "Trendy clothing and accessories",
    isOpen: true,
    featured: false,
    items: [
      { id: 'df1', name: 'Shirt X', price: 25.00, image: 'https://via.placeholder.com/50', stock: 20 },
      { id: 'df2', name: 'Pants Y', price: 40.00, image: 'https://via.placeholder.com/50', stock: 15 },
    ],
  },
  {
    id: 3,
    name: "Diana's Bookstore",
    owner: "Diana",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    products: "20k",
    rating: "10k",
    category: "Books",
    description: "Rare books and literary treasures",
    isOpen: true,
    featured: true,
    items: [
      { id: 'db1', name: 'Book 1', price: 15.00, image: 'https://via.placeholder.com/50', stock: 30 },
      { id: 'db2', name: 'Book 2', price: 20.00, image: 'https://via.placeholder.com/50', stock: 25 },
    ],
  },
  {
    id: 4,
    name: "Pierre's General Store",
    owner: "Pierre",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    products: "900",
    rating: "9.9k",
    category: "General",
    description: "Everything you need under one roof",
    isOpen: true,
    featured: false,
    items: [
      { id: 'pg1', name: 'Item A', price: 5.00, image: 'https://via.placeholder.com/50', stock: 50 },
      { id: 'pg2', name: 'Item B', price: 10.00, image: 'https://via.placeholder.com/50', stock: 40 },
    ],
  },
  {
    id: 5,
    name: "Stardrop Saloon",
    owner: "Gus",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    products: "950",
    rating: "10k",
    category: "Food & Drink",
    description: "Cozy atmosphere with great food",
    isOpen: true,
    featured: true,
    items: [
      { id: 'ss1', name: 'Dish 1', price: 12.00, image: 'https://via.placeholder.com/50', stock: 15 },
      { id: 'ss2', name: 'Drink 1', price: 4.00, image: 'https://via.placeholder.com/50', stock: 30 },
    ],
  },
  {
    id: 6,
    name: "TechZone Electronics",
    owner: "Alex",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    products: "3.2k",
    rating: "9.8k",
    category: "Electronics",
    description: "Latest gadgets and tech accessories",
    isOpen: true,
    featured: false,
    items: [
      { id: 'te1', name: 'Gadget X', price: 199.00, image: 'https://via.placeholder.com/50', stock: 10 },
      { id: 'te2', name: 'Accessory Y', price: 25.00, image: 'https://via.placeholder.com/50', stock: 25 },
    ],
  },
  {
    id: 7,
    name: "Green Thumb Garden",
    owner: "Maya",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    products: "2.1k",
    rating: "9.7k",
    category: "Plants",
    description: "Beautiful plants and gardening supplies",
    isOpen: false,
    featured: false,
    items: [
      { id: 'gt1', name: 'Plant A', price: 18.00, image: 'https://via.placeholder.com/50', stock: 20 },
      { id: 'gt2', name: 'Supply B', price: 8.00, image: 'https://via.placeholder.com/50', stock: 35 },
    ],
  },
  {
    id: 8,
    name: "Artisan Crafts Co.",
    owner: "Emma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    products: "1.8k",
    rating: "9.6k",
    category: "Handmade",
    description: "Unique handcrafted items and art",
    isOpen: true,
    featured: true,
    items: [
      { id: 'ac1', name: 'Craft 1', price: 35.00, image: 'https://via.placeholder.com/50', stock: 12 },
      { id: 'ac2', name: 'Art Piece 1', price: 75.00, image: 'https://via.placeholder.com/50', stock: 8 },
    ],
  },
  {
    id: 9,
    name: "Sports Central",
    owner: "Jake",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
    products: "4.5k",
    rating: "9.4k",
    category: "Sports",
    description: "Athletic gear and equipment",
    isOpen: true,
    featured: false,
    items: [
      { id: 'sc1', name: 'Gear A', price: 55.00, image: 'https://via.placeholder.com/50', stock: 18 },
      { id: 'sc2', name: 'Equipment B', price: 90.00, image: 'https://via.placeholder.com/50', stock: 10 },
    ],
  },
  {
    id: 10,
    name: "Sweet Dreams Bakery",
    owner: "Sophie",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    products: "850",
    rating: "9.9k",
    category: "Bakery",
    description: "Fresh baked goods and desserts",
    isOpen: true,
    featured: true,
    items: [
      { id: 'sdb1', name: 'Cake 1', price: 20.00, image: 'https://via.placeholder.com/50', stock: 25 },
      { id: 'sdb2', name: 'Pastry 1', price: 5.00, image: 'https://via.placeholder.com/50', stock: 40 },
    ],
  }
];

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

// Main Market Component
const Market = ({ addToCart }) => {
  const [stores, setStores] = useState(storesData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredStores = stores.filter(store => {
    const categoryMatch = selectedCategory === 'All' || store.category === selectedCategory;
    const featuredMatch = !showFeaturedOnly || store.featured;
    return categoryMatch && featuredMatch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`); // Simple feedback
  };

  return (
    <div className="market-container">
      {/* Market Header */}
      <div className="market-header">
        <h1>🏪 Marketplace</h1>
        <p>Discover amazing stores and connect with local businesses</p>
      </div>

      {/* Market Filters */}
      <div className="market-filters">
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
        <div className="filter-toggles">
          <label className="featured-toggle">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            />
            Featured Only ⭐
          </label>
        </div>
      </div>

      {/* Market Stats */}
      <div className="market-stats">
        <div className="stat-card">
          <span className="stat-number">{filteredStores.length}</span>
          <span className="stat-label">Active Stores</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredStores.filter(s => s.isOpen).length}</span>
          <span className="stat-label">Currently Open</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredStores.filter(s => s.featured).length}</span>
          <span className="stat-label">Featured</span>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="stores-grid">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className={`store-card ${!store.isOpen ? 'closed' : ''} ${store.featured ? 'featured' : ''}`}
            onClick={() => setSelectedStore(store)}
          >
            {store.featured && <div className="featured-badge">⭐ Featured</div>}
            {!store.isOpen && <div className="closed-badge">Closed</div>}

            {/* Store Header */}
            <div className="store-header">
              <div className="store-avatar">
                <img
                  src={store.avatar}
                  alt={store.owner}
                />
                <div className={`status-indicator ${store.isOpen ? 'online' : 'offline'}`}></div>
              </div>
              <div className="store-actions">
                <button className="action-btn favorite-btn" onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}>
                  ♡
                </button>
                <button className="action-btn contact-btn" onClick={(e) => { e.stopPropagation(); alert(`Contacting ${store.owner}`); }}>
                  💬
                </button>
              </div>
            </div>

            {/* Store Info */}
            <div className="store-info">
              <h3 className="store-name">{store.name}</h3>
              <p className="store-owner">by {store.owner}</p>
              <span className="store-category">{store.category}</span>
              <p className="store-description">{store.description}</p>
            </div>

            {/* Store Stats */}
            <div className="store-stats">
              <div className="stat-item">
                <div className="stat-icon products-icon">📦</div>
                <div className="stat-details">
                  <span className="stat-value">{store.products}</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon rating-icon">⭐</div>
                <div className="stat-details">
                  <span className="stat-value">{store.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>

            {/* Store Footer */}
            <div className="store-footer">
              <button className="visit-btn" onClick={(e) => { e.stopPropagation(); setSelectedStore(store); }}>
                Visit Store 🏪
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStores.length === 0 && (
        <div className="no-results">
          <span role="img" aria-label="open store">🏪</span>
          <h3>No stores found</h3>
          <p>Try adjusting your filters to see more stores.</p>
          <button onClick={() => { setSelectedCategory('All'); setShowFeaturedOnly(false); }} className="category-btn active">Clear Filters</button>
        </div>
      )}

      {/* Store Modal */}
      {selectedStore && (
        <div className="store-modal">
          <StoreModal
            store={selectedStore}
            onClose={() => setSelectedStore(null)}
            onAddToCart={handleAddToCart}
          />
        </div>
      )}
    </div>
  );
};

export default Market;  