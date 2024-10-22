// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ProductDetails from './ProductDetails';
import Cart from './Cart'; // Import Cart component
import Profile from './Profile';
import Shop from './Shop';
import ProductList from './ProductList'; // Import ProductList component
import Wishlist from './Wishlist'; // Import Wishlist component
 // Import RegistrationSuccess component

import AuthForm from './AuthForm';
import VendorRegistrationForm from './VendorRegistrationForm';
import VendorProfile from './Vendorprofile'; // Import VendorProfile component
import AddProductForm from './AddProductForm'; // Import AddProductForm component
import { CartProvider } from './context/CartContext'; // Import CartProvider
import './App.css';
import './Tailwind.css'; // Import Tailwind styles if needed

const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // State for user login status

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
    <CartProvider> {/* Wrap the app in CartProvider for cart functionality */}
      <Router>
        <Header user={user} setUser={setUser} /> {/* Pass user and setUser to Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/category/:categoryName" 
            element={<ProductList products={products.filter(product => product.category === window.location.pathname.split("/").pop())} />} 
          />
          <Route path="/wishlist" element={<Wishlist userId={user ? user._id : null} />} /> {/* Pass userId to Wishlist */}
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/login-customer" element={<AuthForm />} /> {/* Customer login route */}
          <Route path="/vendorregistrationform" element={<VendorRegistrationForm />} /> {/* Vendor registration form */}
          <Route path="/vendorprofile" element={<VendorProfile />} /> {/* Vendor profile */}
          <Route path="/addproductform" element={<AddProductForm />} /> {/* Vendor add product form */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;