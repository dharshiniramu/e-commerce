// Header.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from './context/CartContext';
import './Header.css';

const Header = () => {
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
        <div className="login-dropdown">
          <span className="login-signup">Login/Sign Up</span>
          <div className="dropdown-content">
            <NavLink to="/login-customer" className="dropdown-item">Customer</NavLink>
            <NavLink to="/vendorregistrationform" className="dropdown-item">Seller</NavLink>
          </div>
        </div>
        <div className="user-dropdown">
          <FaUser />
          <div className="dropdown-content">
            <NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink>
            <NavLink to="/orders" className="dropdown-item" activeClassName="active">Orders</NavLink>
            <NavLink to="/logout" className="dropdown-item" activeClassName="active">Logout</NavLink>
          </div>
        </div>
        <NavLink to="/cart" className="cart">
          <FaShoppingCart />
          <span className="cart-count">{getCartCount()}</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
