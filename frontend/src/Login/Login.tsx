import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundGif from "../assets/images/play.gif";
import "./Login.css";

interface LoginProps {
  onLogin: Function;
}

const Login = ({ onLogin }: LoginProps) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env?.VITE_API_URL + '/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID); // Save the userID
      onLogin();
      navigate('/play');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };
  

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the Register page
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
          <h2 className="form-title">Login</h2>
          <div className="form-input-wrapper">
            <input
              type="text"
              placeholder="Username"
              data-testid="username-input"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="form-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              data-testid="password-input"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" data-testid="login-btn" className="form-button">Login</button>
            <button type="button" onClick={handleRegisterRedirect} className="secondary-form-button">
              Register
            </button>
          </div>
          <p style={{ color: 'red' }}>{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
