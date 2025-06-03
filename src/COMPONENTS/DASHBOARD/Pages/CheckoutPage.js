// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/CheckoutPage.css';

const API_BASE_URL = 'http://localhost:8000/api'; // *** IMPORTANT: Adjust this to your actual Laravel API URL ***

// Configure axios defaults for CSRF (Laravel Sanctum will handle X-XSRF-TOKEN from cookie)
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const CheckoutPage = ({ onOrderComplete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemsToCheckout = location.state?.itemsToCheckout || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    zipCode: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
    gcashNumber: '',
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  // Remove csrfToken state and useEffect for fetching it, as Axios should handle it.
  // const [csrfToken, setCsrfToken] = useState(''); // REMOVE THIS LINE

  const cartTotal = itemsToCheckout.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50.00; // Example delivery fee
  const finalTotal = cartTotal + deliveryFee;

  // REMOVE THIS useEffect block completely
  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/csrf-token`);
  //       setCsrfToken(response.data.csrf_token);
  //       // Set the CSRF token in axios headers after fetching
  //       axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token;
  //     } catch (error) {
  //       console.error('Error fetching CSRF token:', error);
  //     }
  //   };
  //   fetchCsrfToken();
  // }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09|\+639)\d{9}$/; // Basic Philippine mobile number regex

    // Required fields for all payment methods
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid Philippine phone number format (e.g., 09xx-xxxxxxx or +639xx-xxxxxxx)';
    if (!formData.street.trim()) newErrors.street = 'Street Address is required';
    if (!formData.barangay.trim()) newErrors.barangay = 'Barangay is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip Code is required';

    // Specific validation for 'card' payment method
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card Number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card Number must be 16 digits';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry Date is required';
      else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Invalid expiry format (MM/YY)';
      if (!formData.cardCVC.trim()) newErrors.cardCVC = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCVC)) newErrors.cardCVC = 'CVC must be 3 or 4 digits';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on Card is required';
    }

    // Specific validation for 'gcash' payment method
    if (formData.paymentMethod === 'gcash') {
      if (!formData.gcashNumber.trim()) newErrors.gcashNumber = 'GCash Number is required';
      else if (!phoneRegex.test(formData.gcashNumber)) newErrors.gcashNumber = 'Invalid GCash phone number format (e.g., 09xx-xxxxxxx or +639xx-xxxxxxx)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please correct the errors in the form.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: itemsToCheckout.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        customerInfo: { // Ensure this matches Laravel's expected structure
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: { // Ensure this matches Laravel's expected structure
          street: formData.street,
          barangay: formData.barangay,
          city: formData.city,
          province: formData.province,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
        subtotal: cartTotal,
        deliveryFee: deliveryFee,
        totalAmount: finalTotal,
        orderNotes: formData.orderNotes,
      };

      // Add payment details based on method
      if (formData.paymentMethod === 'card') {
        orderData.card_number = formData.cardNumber;
        orderData.card_expiry = formData.cardExpiry;
        orderData.card_cvc = formData.cardCVC;
        orderData.card_name = formData.cardName;
      } else if (formData.paymentMethod === 'gcash') {
        orderData.gcash_number = formData.gcashNumber;
      }

      // NO NEED TO MANUALLY ADD X-CSRF-TOKEN IF AXIOS.DEFAULT.WITHCREDENTIALS IS TRUE AND SANCTUM IS SET UP
      // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken; // This line is likely redundant or causing issues

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);

      console.log('Order placed successfully:', response.data);
      alert('Order placed successfully!');
      onOrderComplete(response.data.order);
      navigate('/order-confirmation', { state: { order: response.data.order } });

    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);

        if (error.response.status === 419) {
          alert('Session expired. Please refresh the page and try again. (CSRF Token Mismatch)');
        } else if (error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors;
          let errorMessages = Object.values(apiErrors).flat().join('\n');
          alert('Validation Error:\n' + errorMessages);
        } else {
          alert('Failed to place order: ' + (error.response.data.message || 'An unexpected error occurred.'));
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        alert('Failed to place order: No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert('Failed to place order: ' + error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Your Order</h3>
          {itemsToCheckout.length === 0 ? (
            <p>No items in checkout. Please go back to the cart.</p>
          ) : (
            <>
              <ul>
                {itemsToCheckout.map(item => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} = ₱{(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="order-totals">
                <p>Subtotal: ₱{cartTotal.toFixed(2)}</p>
                <p>Delivery Fee: ₱{deliveryFee.toFixed(2)}</p>
                <h4>Total: ₱{finalTotal.toFixed(2)}</h4>
              </div>
            </>
          )}
        </div>

        <div className="checkout-form-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={errors.street ? 'error' : ''}
                />
                {errors.street && <span className="error-message">{errors.street}</span>}
              </div>
              <div className="form-group">
                <label>Barangay *</label>
                <input
                  type="text"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleInputChange}
                  className={errors.barangay ? 'error' : ''}
                />
                {errors.barangay && <span className="error-message">{errors.barangay}</span>}
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Province *</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className={errors.province ? 'error' : ''}
                />
                {errors.province && <span className="error-message">{errors.province}</span>}
              </div>
              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />{' '}
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="gcash"
                    checked={formData.paymentMethod === 'gcash'}
                    onChange={handleInputChange}
                  />{' '}
                  GCash
                </label>
              </div>
              {formData.paymentMethod === 'gcash' && (
                <div className="form-group indent">
                  <label>GCash Number *</label>
                  <input
                    type="text"
                    name="gcashNumber"
                    value={formData.gcashNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 09171234567"
                    className={errors.gcashNumber ? 'error' : ''}
                  />
                  {errors.gcashNumber && <span className="error-message">{errors.gcashNumber}</span>}
                </div>
              )}
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />{' '}
                  Credit/Debit Card
                </label>
              </div>
              {formData.paymentMethod === 'card' && (
                <div className="payment-details-card indent">
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="•••• •••• •••• ••••"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-group">
                    <label>Name on Card *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Full Name on Card"
                      className={errors.cardName ? 'error' : ''}
                    />
                    {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                  </div>
                  <div className="card-expiry-cvc">
                    <div className="form-group">
                      <label>Expiry Date (MM/YY) *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={errors.cardExpiry ? 'error' : ''}
                      />
                      {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                    </div>
                    <div className="form-group">
                      <label>CVC *</label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={errors.cardCVC ? 'error' : ''}
                      />
                      {errors.cardCVC && <span className="error-message">{errors.cardCVC}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="form-section">
              <h3>Order Notes (Optional)</h3>
              <div className="form-group">
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for your order..."
                  rows="3"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - ₱${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;