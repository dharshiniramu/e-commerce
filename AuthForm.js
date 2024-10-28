// client/src/AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const AuthForm = ({ setIsLoggedIn }) => { // Receive setIsLoggedIn as a prop
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        return "Email and password are required for login.";
      }
    } else {
      const { name, phone, password } = formData;
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        return "Invalid phone number. Please enter a valid 10-digit phone number.";
      }
      if (!name || !phone || !password) {
        return "Name, phone number, and password are required for signup.";
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return "Weak password. It must be at least 8 characters long, contain upper and lower case letters, a number, and a special character.";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await axios.post(url, formData);
      console.log(res.data);
      localStorage.setItem("userId", res.data.userId);

      // Show success message
      setSuccessMessage(isLogin ? "You have successfully logged in!" : "You have successfully registered! Login to continue");

      // Update login state on successful login
      if (isLogin) {
        setIsLoggedIn(true); // Set login state to true on successful login
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrorMessage(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  const handleToggle = (mode) => {
    setIsLogin(mode);
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="toggle-container">
        <div className={`toggle-switch ${isLogin ? "login" : "signup"}`}>
          <button onClick={() => handleToggle(true)} className="toggle-btn">Login</button>
          <button onClick={() => handleToggle(false)} className="toggle-btn">Signup</button>
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="form-container">
        {isLogin ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Ex. abc@xyz.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">LOGIN</button>
          </form>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email (optional)</label>
              <input
                type="email"
                name="email"
                placeholder="Ex. abc@xyz.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Phone No.</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">SIGNUP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
