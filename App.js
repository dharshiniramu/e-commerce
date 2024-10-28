// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Profile from './Profile';
import Shop from './Shop';
import ProductList from './ProductList';
import Wishlist from './Wishlist';
import AuthForm from './AuthForm';
import VendorRegistrationForm from './VendorRegistrationForm';
import VendorProfile from './Vendorprofile';
import AddProductForm from './AddProductForm';
import { CartProvider } from './context/CartContext';
import './App.css';
import './Tailwind.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // State for user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <CartProvider>
      <Router>
        <Header user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn to Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/category/:categoryName" 
            element={<ProductList products={products.filter(product => product.category === window.location.pathname.split("/").pop())} />} 
          />
          <Route path="/wishlist" element={<Wishlist userId={user ? user._id : null} />} />
          <Route path="/profile" element={<Profile />} />
          <Route 
            path="/login-customer" 
            element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn to AuthForm 
          />
          <Route path="/vendorregistrationform" element={<VendorRegistrationForm />} />
          <Route path="/vendorprofile" element={<VendorProfile />} />
          <Route path="/addproductform" element={<AddProductForm />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
