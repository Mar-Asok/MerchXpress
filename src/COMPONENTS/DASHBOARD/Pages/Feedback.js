import React, { useState } from 'react';
import '../Style/Feedback.css';

const FeedbackSystem = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    email: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (type) => {
    console.log(`${type} feedback submitted:`, formData);
    // Reset form and go back to main page
    setFormData({ title: '', details: '', email: '' });
    setCurrentPage('main');
    alert('Thank you for your feedback!');
  };

  const MainPage = () => (
    <div className="feedback-container">
      {/* Background decorative elements */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      <div className="decoration decoration-3"></div>
      <div className="decoration decoration-4"></div>
      <div className="decoration decoration-5"></div>
      <div className="decoration decoration-6"></div>
      <div className="decoration decoration-7"></div>

      <div className="feedback-main-card">
        <div className="feedback-options">
          {/* Report a Bug */}
          <div className="feedback-section">
            <div className="feedback-header">
              <span className="feedback-icon">!</span>
              <h3 className="feedback-title">Report a Bug</h3>
            </div>
            <button
              onClick={() => setCurrentPage('bug')}
              className="feedback-button"
            >
              Let us know what's broken
            </button>
          </div>

          {/* Feature Request */}
          <div className="feedback-section">
            <div className="feedback-header">
              <span className="feedback-icon">💡</span>
              <h3 className="feedback-title">Feature Request</h3>
            </div>
            <button
              onClick={() => setCurrentPage('improve')}
              className="feedback-button"
            >
              Tell us how can we improve
            </button>
          </div>

          {/* Contact Us */}
          <div className="feedback-section">
            <div className="feedback-header">
              <span className="feedback-icon">💬</span>
              <h3 className="feedback-title">Contact Us</h3>
            </div>
            <button
              onClick={() => setCurrentPage('help')}
              className="feedback-button"
            >
              Tell us how we can help
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FeedbackForm = ({ title, type }) => (
    <div className="feedback-container">
      {/* Background decorative elements */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      <div className="decoration decoration-3"></div>
      <div className="decoration decoration-4"></div>
      <div className="decoration decoration-5"></div>
      <div className="decoration decoration-6"></div>
      <div className="decoration decoration-7"></div>

      <div className="feedback-form-card">
        {/* Header */}
        <div className="feedback-form-header">
          <h2 className="feedback-form-title">{title}</h2>
          <button
            onClick={() => setCurrentPage('main')}
            className="close-button"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="feedback-form-body">
          {/* Title Input */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Add a title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="form-input"
            />
          </div>

          {/* Details Textarea */}
          <div className="form-group">
            <textarea
              placeholder="Discuss in detail"
              value={formData.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              rows={6}
              className="form-textarea"
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="form-input"
            />
          </div>

          {/* Submit Button */}
          <div className="form-submit">
            <button
              onClick={() => handleSubmit(type)}
              className="submit-button"
            >
              <span>✓</span>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'bug':
        return <FeedbackForm title="Tell us what's broken" type="Bug Report" />;
      case 'improve':
        return <FeedbackForm title="Tell us how can we improve" type="Feature Request" />;
      case 'help':
        return <FeedbackForm title="Read help articles - FAQ's and More" type="Help Request" />;
      default:
        return <MainPage />;
    }
  };

  return renderCurrentPage();
};

export default FeedbackSystem;