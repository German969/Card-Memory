import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        data-testid="username-input"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" data-testid="login-btn">Login</button>
        <button type="button" onClick={handleRegisterRedirect}>
          Register
        </button>
      </div>
      <p style={{ color: 'red' }}>{error}</p>
    </form>
  );
};

export default Login;
