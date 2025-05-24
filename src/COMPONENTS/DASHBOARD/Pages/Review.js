// Review.js
import React, { useState } from 'react';
import '../Style/Review.css';

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      buyerName: "John Doe",
      productName: "Premium Soda Pack",
      total: "₱250",
      rating: 5,
      date: "25-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    },
    {
      id: 2,
      buyerName: "Jane Smith",
      productName: "Energy Drink Set",
      total: "₱180",
      rating: 3,
      date: "24-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    },
    {
      id: 3,
      buyerName: "Mike Johnson",
      productName: "Juice Collection",
      total: "₱320",
      rating: 4,
      date: "24-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    },
    {
      id: 4,
      buyerName: "Sarah Wilson",
      productName: "Soft Drink Bundle",
      total: "₱150",
      rating: 2,
      date: "24-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    },
    {
      id: 5,
      buyerName: "David Brown",
      productName: "Beverage Variety Pack",
      total: "₱200",
      rating: 5,
      date: "23-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    },
    {
      id: 6,
      buyerName: "Lisa Garcia",
      productName: "Health Drink Set",
      total: "₱280",
      rating: 4,
      date: "23-10-2025",
      review: "I had a very pleasant experience at [Retail Store Name] especially services provided by [Staff Name]"
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    name: '',
    email: '',
    review: ''
  });

  const [hoverRating, setHoverRating] = useState(0);

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingCounts = [1, 2, 3, 4, 5].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  const handleStarClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating && newReview.name && newReview.email && newReview.review) {
      const reviewToAdd = {
        id: reviews.length + 1,
        buyerName: newReview.name,
        productName: "New Product",
        total: "₱0",
        rating: newReview.rating,
        date: new Date().toLocaleDateString('en-GB'),
        review: newReview.review
      };
      
      setReviews(prev => [reviewToAdd, ...prev]);
      setNewReview({ rating: 0, name: '', email: '', review: '' });
      setHoverRating(0);
      alert('Review submitted successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const renderInteractiveStars = () => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`interactive-star ${
          index < (hoverRating || newReview.rating) ? 'active' : ''
        }`}
        onClick={() => handleStarClick(index + 1)}
        onMouseEnter={() => handleStarHover(index + 1)}
        onMouseLeave={() => setHoverRating(0)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="review-container">
      {/* Background Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>

      <div className="review-content">
        {/* Header */}
        <div className="review-header">
          <h1 className="review-title">Customer Reviews</h1>
        </div>

        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-label">Total Reviews</div>
            <div className="stat-value">10.0k+</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Average Rating</div>
            <div className="stat-value">4.7</div>
            <div className="star-rating">
              {renderStars(5)}
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Ratings</div>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="rating-bar">
                  <span className="rating-number">{rating}</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(ratingCounts[rating - 1] / totalReviews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="scrollable-content">
          {/* Reviews List */}
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-avatar"></div>
                <div className="review-details">
                  <div className="review-header-info">
                    <div className="buyer-info">
                      <div className="buyer-name">{review.buyerName}</div>
                      <div className="product-name">{review.productName}</div>
                      <div className="total-price">Total: {review.total}</div>
                    </div>
                    <div className="review-meta">
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <div className="review-text">{review.review}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Form */}
          <div className="submit-review-section">
            <h2 className="submit-title">Submit Your Review</h2>
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Add Your Rating <span className="required">*</span>
                </label>
                <div className="rating-input">
                  <div className="user-avatar"></div>
                  <div className="interactive-stars">
                    {renderInteractiveStars()}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newReview.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Write Your Review <span className="required">*</span>
                </label>
                <textarea
                  name="review"
                  value={newReview.review}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Write here"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                ✓ Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;