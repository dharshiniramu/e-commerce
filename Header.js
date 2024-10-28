// client/src/Header.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from './context/CartContext';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => { // Add setIsLoggedIn as a prop
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate('/#contact'); // Navigate to home page with hash

    setTimeout(() => {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Allow navigation to home page before scrolling
  };

  const handleLogout = () => {
    // Update the login state when user clicks Logout
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="logo">MDP.in</div>
      <nav className="nav-links">
        <NavLink to="/" className="nav-link" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/shop" className="nav-link" activeClassName="active">
          Shop
        </NavLink>
        <NavLink to="/wishlist" className="nav-link" activeClassName="active">
          Wishlist
        </NavLink>
        <a href="#contact" className="nav-link" onClick={handleContactClick} style={{ cursor: 'pointer' }}>
          Contact
        </a>
      </nav>
      <div className="header-right">
        {!isLoggedIn ? ( // Conditional rendering based on isLoggedIn
          <div className="login-dropdown">
            <span className="login-signup">Login/Sign Up</span>
            <div className="dropdown-content">
              <NavLink to="/login-customer" className="dropdown-item">Customer</NavLink>
              <NavLink to="/vendorregistrationform" className="dropdown-item">Seller</NavLink>
            </div>
          </div>
        ) : (
          <div className="user-dropdown">
            <FaUser />
            <div className="dropdown-content">
              <NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink>
              <NavLink to="/orders" className="dropdown-item" activeClassName="active">Orders</NavLink>
              <span className="dropdown-item" onClick={handleLogout}>Logout</span> {/* Use a span for Logout */}
            </div>
          </div>
        )}
        <NavLink to="/cart" className="cart">
          <FaShoppingCart />
          <span className="cart-count">{getCartCount()}</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
