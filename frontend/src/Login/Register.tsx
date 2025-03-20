import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import backgroundGif from "../assets/images/play.gif";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env?.VITE_API_URL + '/api/users/register', formData); // Add base URL
      setMessage(response.data.message);
      setFormData({ username: '', password: '' });
    } catch (error: any) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the Register page
  };
  

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Register</h2>
          <div className="form-input-wrapper">
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="form-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" data-testid="register-btn" className="form-button">Register</button>
            <button type="button" onClick={handleLoginRedirect} className="secondary-form-button">
              Login
            </button>
          </div>
          <p className="form-message">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
