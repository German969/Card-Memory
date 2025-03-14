import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env?.VITE_API_URL + '/api/users/register', formData); // Add base URL
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" data-testid="register-btn">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;
