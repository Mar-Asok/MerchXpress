import React, { useState, useRef, useEffect } from 'react';
import '../Style/Navbar.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Navbar = ({ cartCount }) => { // Receive cartCount as a prop
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order Placed',
      message: 'Your order #12345 has been confirmed',
      time: '2 min ago',
      isRead: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'Payment Successful',
      message: 'Payment of $99.99 processed successfully',
      time: '1 hour ago',
      isRead: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'Welcome!',
      message: 'Welcome to our platform. Get started now!',
      time: '2 hours ago',
      isRead: true,
      type: 'info'
    },
    {
      id: 4,
      title: 'Sale Alert',
      message: '50% off on selected items. Limited time offer!',
      time: '1 day ago',
      isRead: false,
      type: 'warning'
    }
  ]);

  const notificationRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll functionality to hide/show navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down and past threshold, hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
        // Also add class to sidebar if it exists
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.classList.add('navbar-hidden');
        }
      }
      // If scrolling up, show navbar
      else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
        // Remove class from sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.classList.remove('navbar-hidden');
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification =>
      ({ ...notification, isRead: true })
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  return (
    <header className={`header ${!isNavbarVisible ? 'navbar-hidden' : ''}`}>
      <nav className="nav-links">
        <Link to="/dashboard" className="nav-link active">Home</Link>
        <Link to="/market" className="nav-link">Market</Link>

        {/* Notification Dropdown */}
        <div className="notification-container" ref={notificationRef}>
          <button
            className="notification-trigger"
            onClick={toggleNotification}
            aria-label="Notifications"
          >
            Notification
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            <span className={`dropdown-arrow ${isNotificationOpen ? 'open' : ''}`}>▾</span>
          </button>

          {isNotificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <div className="notification-actions">
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="mark-all-read">
                      Mark all read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button onClick={clearAllNotifications} className="clear-all">
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <span>🔔</span>
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <div className="notification-content">
                        <div className="notification-top">
                          <span className={`notification-type ${notification.type}`}>
                            {notification.type === 'success' && '✓'}
                            {notification.type === 'warning' && '⚠'}
                            {notification.type === 'info' && 'ℹ'}
                          </span>
                          <h4>{notification.title}</h4>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="delete-notification"
                            aria-label="Delete notification"
                          >
                            ×
                          </button>
                        </div>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mark-read-btn"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/dashboard/cart" className="nav-link">
          Cart {cartCount !== undefined && cartCount > 0 ? `(${cartCount})` : ''}
        </Link>

        {/* Search Section */}
        <div className="search-form">
          <input
            type="text"
            placeholder="Search description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;