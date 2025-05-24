import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/MerchantRegistrationForm.css'; // Create this CSS
import '../Style/RegNotification.css'; // For the notification styling

function MerchantRegistrationForm({ onClose, onSubmit }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event); // Call the onSubmit prop (if provided)

    // Display success notification
    setNotification('Registration submitted successfully!');
    setTimeout(() => {
      setNotification(null);
      navigate('/dashboard'); // Redirect to home page
    }, 3000);
  };

  return (
    <div className="merchant-registration-modal-overlay">
      <div className="merchant-registration-modal">
        <h2>MerchXpress Business Registration Form</h2>
        <p>
          Note: To start selling on MerchXpress, please complete the registration form
          below with accurate and up-to-date information. All submissions will be reviewed
          and verified to ensure a safe and trusted marketplace. Once approved, you'll
          gain access to your personal seller dashboard where you can upload products,
          manage orders, and track sales.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" placeholder="Business Type" />
            <input type="text" placeholder="Business Name" />
            <input type="text" placeholder="Merchant Name" />
            <input type="text" placeholder="Phone Number" />
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Market Address" className="full-width" />
          </div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              I agree to receive communication such as but not limited to status
              of my application, reminders, updates via MerchXpress approved third party
              communication platform.
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              By proceeding, I agree that MerchXpress can collect, use and disclose the
              information provided by me, on behalf of the applicant company,in accordance
              with MerchXpress Privacy Notice which which I have read and understand.
            </label>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <p className="terms">
            By submitting this form, I agree to MerchXpress <a href="#">terms and conditions</a>.
          </p>
        </form>
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      {notification && <div className="notification success">{notification}</div>}
    </div>
  );
}

export default MerchantRegistrationForm;